<?php
/* ══════════════════════════════════════════════════════════════════════════
   LAVAGNA — il docente appende schede di codice, gli studenti le vedono e
   possono mandargli i propri esempi.

   Un solo file, nessun database, nessun servizio esterno: su un hosting
   condiviso con cPanel questo è tutto ciò che serve.

   Lo stato sta in un unico JSON riscritto in modo ATOMICO (si scrive un file
   temporaneo e poi lo si rinomina: su Linux rename() è atomico). Così non
   servono lock, che su filesystem di rete sono inaffidabili, e non ci sono
   scritture a metà.

   Azioni:
     GET  ?action=get&since=N     lavagna (e, per il docente, gli invii)
     POST action=post             il docente appende una scheda
     POST action=del              il docente toglie una scheda
     POST action=send             uno studente manda il proprio codice
   ══════════════════════════════════════════════════════════════════════════ */

declare(strict_types=1);

/* Scritto per PHP 7.2+: niente «never», «mixed», str_starts_with, né arrow
   function «fn» (7.4). La versione PHP su cPanel la decide l'hosting — qui è
   7.2 — e un errore di sintassi darebbe 500 su tutta la lavagna. */

const DATA_DIR   = __DIR__ . '/../data';

/* Il file dei dati si chiama .php e comincia con «<?php exit;» apposta:
   se per qualsiasi motivo l'.htaccess di data/ non venisse applicato — su un
   hosting condiviso capita — chiedere questo file al server lo farebbe
   ESEGUIRE, e uscirebbe subito senza mostrare niente. Con un .json normale
   verrebbe invece servito in chiaro, codice degli studenti compreso.
   Il contenuto vero comincia dopo la prima riga. */
const BOARD_FILE = DATA_DIR . '/board.json.php';
const GUARD      = "<?php exit; ?>\n";
const MAX_CODE   = 16384;   // 16 KB: molto più di qualsiasi esempio didattico
const MAX_NAME   = 40;
const MAX_CARDS  = 60;      // oltre, le più vecchie escono
const MAX_SEND_PER_MIN = 20;
const MAX_SUBS   = 200;     // invii conservati: oltre, i più vecchi escono.
                            // send è aperta (niente login studenti): senza un
                            // tetto, chi conosce l'URL potrebbe gonfiare il file.

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

/* CORS. La versione locale del docente (start.sh su http://localhost:8765,
   che serve solo file e non esegue PHP) usa QUESTA lavagna. Il browser, da
   un'origine diversa, chiede il permesso al server: lo diamo solo alle
   origini di loopback — un'app che gira sul computer di chi la usa — e a
   nessun altro sito. Non è la sicurezza della lavagna (quella è la password):
   è solo il permesso del browser a fare la chiamata. */
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (preg_match('#^https?://(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$#', $origin)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400');
}
/* Il preflight (OPTIONS) precede ogni POST JSON cross-origin: risponde
   vuoto, senza toccare i dati. */
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/* ── utilità ───────────────────────────────────────────────────────────── */

function fail(int $code, string $msg): void {
    http_response_code($code);
    echo json_encode(['error' => $msg], JSON_UNESCAPED_UNICODE);
    exit;
}

function ok(array $data): void {
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/* Due contatori separati, non uno.
   `seq` cambia quando cambia la lavagna: la vedono tutti, quindi ogni
   variazione costa un aggiornamento a 25 studenti.
   `subseq` cambia quando arriva un invio: lo vede solo il docente. Tenendoli
   distinti, le consegne della classe non fanno riscaricare la lavagna a
   tutti — e soprattutto il docente si accorge degli invii, che altrimenti
   resterebbero nascosti dietro un «niente di nuovo». */
function emptyBoard(): array {
    return ['seq' => 0, 'subseq' => 0, 'cards' => [], 'submissions' => [], 'notice' => ''];
}

function readBoard(): array {
    if (!is_file(BOARD_FILE)) return emptyBoard();
    $raw = @file_get_contents(BOARD_FILE);
    if ($raw === false || $raw === '') return emptyBoard();
    if (strncmp($raw, '<?php', 5) === 0) {
        $nl = strpos($raw, "\n");
        $raw = $nl === false ? '' : substr($raw, $nl + 1);
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data + emptyBoard() : emptyBoard();
}

/** Scrittura atomica: file temporaneo + rename. Niente flock. */
function writeBoard(array $board): void {
    if (!is_dir(DATA_DIR) && !@mkdir(DATA_DIR, 0775, true) && !is_dir(DATA_DIR)) {
        fail(500, 'cartella dati non creabile');
    }
    $tmp = DATA_DIR . '/.board.' . bin2hex(random_bytes(6)) . '.tmp';
    $json = json_encode($board, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    if (@file_put_contents($tmp, GUARD . $json) === false) fail(500, 'scrittura fallita');
    if (!@rename($tmp, BOARD_FILE)) { @unlink($tmp); fail(500, 'salvataggio fallito'); }
}

function teacherHash(): ?string {
    $f = __DIR__ . '/secret.php';
    if (!is_file($f)) return null;
    $h = require $f;
    return is_string($h) && $h !== '' ? $h : null;
}

function requireTeacher(array $in): void {
    $hash = teacherHash();
    if ($hash === null) fail(500, 'password docente non configurata: crea api/secret.php');
    $pass = (string)($in['pass'] ?? '');
    /* password_verify è a tempo costante e non serve altro: qui non si
       protegge un conto in banca, si evita che uno studente cancelli la
       lavagna per scherzo. */
    if (!password_verify($pass, $hash)) fail(403, 'password docente errata');
}

function clean(string $s, int $max): string {
    $s = str_replace("\0", '', $s);
    if (function_exists('mb_substr')) return trim(mb_substr($s, 0, $max));
    return trim(substr($s, 0, $max));
}

function engineOf($v): string {
    return $v === 'strudel' ? 'strudel' : 'hydra';
}

function input(): array {
    $raw = file_get_contents('php://input');
    $in = json_decode((string)$raw, true);
    return is_array($in) ? $in : [];
}

/* ── azioni ────────────────────────────────────────────────────────────── */

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$in     = $method === 'POST' ? input() : $_GET;
$action = (string)($in['action'] ?? $_GET['action'] ?? 'get');

if ($action === 'get') {
    $board = readBoard();
    $since    = (int)($_GET['since'] ?? -1);
    $subsince = (int)($_GET['subsince'] ?? -1);

    /* Gli invii degli studenti li vede solo il docente: sono i lavori dei
       ragazzi, non materiale da lasciare in giro a tutta la classe. */
    $hash = teacherHash();
    $isTeacher = $hash !== null && password_verify((string)($_GET['pass'] ?? ''), $hash);

    /* Il client passa l'ultimo numero di sequenza visto: se non è cambiato
       niente si risponde con pochi byte. Con 25 studenti che interrogano
       ogni 4 secondi, è la differenza fra un carico trascurabile e uno no.
       Per il docente conta anche subseq, o gli invii non arriverebbero mai. */
    $fresh = $since === $board['seq']
          && (!$isTeacher || $subsince === $board['subseq']);
    if ($fresh) {
        ok(['seq' => $board['seq'], 'subseq' => $board['subseq'], 'unchanged' => true]);
    }

    $out = [
        'seq'    => $board['seq'],
        'subseq' => $board['subseq'],
        'cards'  => array_values($board['cards']),
        'notice' => $board['notice'],
    ];
    if ($isTeacher) $out['submissions'] = array_values($board['submissions']);
    ok($out);
}

if ($method !== 'POST') fail(405, 'metodo non consentito');

if ($action === 'post') {
    requireTeacher($in);
    $code = clean((string)($in['code'] ?? ''), MAX_CODE);
    if ($code === '') fail(400, 'codice vuoto');

    $board = readBoard();
    $board['seq']++;
    array_unshift($board['cards'], [
        'id'     => bin2hex(random_bytes(8)),
        'engine' => engineOf($in['engine'] ?? ''),
        'title'  => clean((string)($in['title'] ?? 'senza titolo'), 80),
        'author' => clean((string)($in['author'] ?? 'docente'), MAX_NAME),
        'code'   => $code,
        'at'     => time(),
    ]);
    $board['cards'] = array_slice($board['cards'], 0, MAX_CARDS);
    writeBoard($board);
    ok(['seq' => $board['seq'], 'cards' => array_values($board['cards'])]);
}

if ($action === 'del') {
    requireTeacher($in);
    $id = (string)($in['id'] ?? '');
    $board = readBoard();
    $before = count($board['cards']);
    $board['cards'] = array_values(array_filter(
        $board['cards'],
        function ($c) use ($id) { return ($c['id'] ?? '') !== $id; }));
    if (count($board['cards']) !== $before) {
        $board['seq']++;
        writeBoard($board);
    }
    ok(['seq' => $board['seq'], 'cards' => array_values($board['cards'])]);
}

if ($action === 'delsub') {
    requireTeacher($in);
    $id = (string)($in['id'] ?? '');
    $board = readBoard();
    unset($board['submissions'][$id]);
    $board['subseq']++;
    writeBoard($board);
    ok(['ok' => true]);
}

if ($action === 'notice') {
    requireTeacher($in);
    $board = readBoard();
    $board['notice'] = clean((string)($in['notice'] ?? ''), 200);
    $board['seq']++;
    writeBoard($board);
    ok(['seq' => $board['seq'], 'notice' => $board['notice']]);
}

if ($action === 'send') {
    $code = clean((string)($in['code'] ?? ''), MAX_CODE);
    if ($code === '') fail(400, 'codice vuoto');
    $who = (string)($in['who'] ?? '');
    if (!preg_match('/^[a-f0-9]{8,32}$/', $who)) fail(400, 'identificativo mancante');

    $board = readBoard();

    /* Freno d'emergenza: se qualcuno tiene premuto, non si riempie il disco.
       Non conta i singoli studenti — conta gli invii recenti in totale. */
    $recent = 0;
    foreach ($board['submissions'] as $s) {
        if (time() - (int)($s['at'] ?? 0) < 60) $recent++;
    }
    if ($recent > MAX_SEND_PER_MIN) fail(429, 'troppi invii in un minuto, riprova fra poco');

    /* Un invio per studente, che sovrascrive il precedente: il file non
       cresce all'infinito e non serve nessuna pulizia. */
    $board['submissions'][$who] = [
        'id'     => $who,
        'engine' => engineOf($in['engine'] ?? ''),
        'name'   => clean((string)($in['name'] ?? 'anonimo'), MAX_NAME),
        'title'  => clean((string)($in['title'] ?? ''), 80),
        'code'   => $code,
        'at'     => time(),
    ];
    if (count($board['submissions']) > MAX_SUBS) {
        uasort($board['submissions'], function ($a, $b) {
            return ($b['at'] ?? 0) <=> ($a['at'] ?? 0);      // più recenti prima
        });
        $board['submissions'] = array_slice($board['submissions'], 0, MAX_SUBS, true);
    }
    $board['subseq']++;
    writeBoard($board);
    ok(['ok' => true, 'at' => $board['submissions'][$who]['at']]);
}

fail(400, 'azione sconosciuta');
