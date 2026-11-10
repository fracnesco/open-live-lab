/* ════════════════════════════════════════════════════════════════════════
   ENGINES — Hydra (visuale) + Strudel (suono)

   Ordine dei globali (voluto e deterministico):
   1. initStrudel() parte al boot e riversa le sue funzioni su globalThis.
   2. Hydra viene creata pigramente alla prima esecuzione visuale
      (makeGlobal: true) e vince le collisioni (time, hush, speed, shape…).
   Per questo il CONTROLLO dei motori non passa mai dai globali:
   Strudel via il namespace `strudel.*`, Hydra via `hydra.synth.*`.
   ════════════════════════════════════════════════════════════════════════ */

const Engines = (() => {

  /* ── HYDRA ─────────────────────────────────────────────────────────── */
  let hydra = null;
  const canvas = document.getElementById('hydra-canvas');

  /* Microfono: se acceso, Hydra nasce con detectAudio e mette a disposizione
     `a` (a.fft[0], a.fft[1]…) per far reagire le visuali al suono.
     È un interruttore e non il valore di default perché detectAudio fa
     chiedere il permesso microfono appena Hydra viene creata — cioè al primo
     ▶ ESEGUI, a chiunque, anche a chi non gli serve. */
  let micWanted = false;
  let resizeBound = false;

  function ensureHydra() {
    if (hydra) return hydra;
    // backing store in pixel CSS (niente DPR: costo di fill contenuto)
    canvas.width  = Math.max(2, Math.round(window.innerWidth));
    canvas.height = Math.max(2, Math.round(window.innerHeight));
    hydra = new Hydra({
      canvas,
      detectAudio: micWanted,
      makeGlobal: true,
      width: canvas.width,
      height: canvas.height,
    });
    /* a.show() disegna le barre del microfono in un canvas suo, in basso a
       destra: lì starebbe sotto la barra della console. Lo alziamo. */
    const meter = hydra.synth.a && hydra.synth.a.canvas;
    // pointer-events: il canvas esiste (trasparente) anche prima di a.show(),
    // e sopra i pannelli si prenderebbe i clic dell'angolo in basso a destra
    if (meter) Object.assign(meter.style, { position: 'fixed', bottom: '44px', right: '12px', zIndex: 21, pointerEvents: 'none' });
    if (!resizeBound) {           // l'istanza si può ricreare: un listener basta
      resizeBound = true;
      window.addEventListener('resize', () => {
        if (!hydra) return;
        try {
          hydra.setResolution(
            Math.max(2, Math.round(window.innerWidth)),
            Math.max(2, Math.round(window.innerHeight)));
        } catch (_) {}
      });
    }
    return hydra;
  }

  /** Accende o spegne il microfono. detectAudio si decide alla nascita
      dell'istanza, quindi l'unico modo di cambiarlo è ricrearla: è
      accettabile perché Hydra viene creata pigramente e non tiene stato
      che valga la pena conservare (il codice lo rilancia il chiamante). */
  function setMic(on) {
    if (micWanted === on) return micWanted;
    micWanted = on;
    if (hydra) {
      try { hydra.synth.hush(); } catch (_) {}
      try { hydra.canvas && hydra.synth && hydra.synth.a && hydra.synth.a.stop && hydra.synth.a.stop(); } catch (_) {}
      try { hydra.synth.a && hydra.synth.a.canvas && hydra.synth.a.canvas.remove(); } catch (_) {}
      hydra = null;               // la prossima esecuzione la ricrea
    }
    return micWanted;
  }

  function runHydra(code) {
    try {
      /* Avvisare PRIMA che il browser chieda il permesso: uno studente che si
         vede comparire una richiesta di webcam dal nulla la nega per
         riflesso, e poi non capisce perché lo schermo resta nero. */
      if (needsPermission(code)) {
        const cam = /\binitCam\b/.test(code);
        AppConsole.log('visuale', 'info',
          cam ? _t('Il browser sta per chiederti il permesso di usare la webcam.')
              : _t('Il browser sta per chiederti quale schermo o finestra condividere.'),
          _t('Serve al codice per usarla come sorgente della visuale. Le immagini restano su questo computer: non vengono registrate né inviate a nessuno.'));
      }
      ensureHydra();
      (0, eval)(code);          // eval globale indiretto: i globali Hydra sono su window
      return { ok: true };
    } catch (e) {
      return { ok: false, error: (e && e.message) ? e.message : String(e) };
    }
  }

  /* Quello che il codice dello studente può lasciare acceso e che hush() non
     spegne (hush azzera solo uscite, sorgenti e update): gli ascoltatori di
     clic e tasti messi su window, il tempo globale, le regolazioni del
     microfono. Senza questo, un onkeydown di un passo continuerebbe a
     muovere la visuale del passo dopo. L'app non usa mai window.onX. */
  const HANDLERS = ['onpointerdown', 'onpointerup', 'onpointermove', 'onclick',
    'onmousedown', 'onmouseup', 'onmousemove', 'onkeydown', 'onkeyup', 'onwheel'];

  function stopHydra() {
    for (const h of HANDLERS) { try { window[h] = null; } catch (_) {} }
    if (!hydra) return;
    try { hydra.synth.hush(); } catch (_) {}   // tutte le uscite a nero
    window.speed = 1; window.bpm = 30;         // i valori di partenza di Hydra
    const a = hydra.synth.a;
    if (a) {
      try {
        a.onBeat = () => {};
        a.hide();
        a.setBins(4); a.setSmooth(0.4); a.setCutoff(2); a.setScale(10);
      } catch (_) {}
    }
  }

  /* ── STRUDEL ───────────────────────────────────────────────────────── */
  let strudelReady = false;
  let strudelError = null;
  let samplesLoaded = false;
  let mainRepl = null;         // la repl che suona (vedi strudelBoot)
  let soundCode = null;        // il codice che sta suonando, o null

  /** Annuncia cosa sta suonando: lo ascolta lo spartito, per sapere se il
      puntatore ha senso (suona proprio il codice disegnato?). */
  function announceSound() {
    document.dispatchEvent(new CustomEvent('livelab:sound', { detail: { code: soundCode } }));
  }

  const strudelBoot = (async () => {
    try {
      // initStrudel restituisce la repl che suona: la teniamo, perché il suo
      // scheduler è l'unico orologio affidabile di «a che punto siamo».
      mainRepl = await strudel.initStrudel({
        // il prebake di default (synth + globali) gira comunque; qui
        // aggiungiamo i campioni locali serviti da start.sh
        prebake: async () => {
          // guitar, epiano, organ, bell (js/instruments.js): accanto ai synth di Strudel
          try { Instruments.register(); }
          catch (e) { console.warn('[strudel] strumenti non registrati:', e); }
          try {
            /* I campioni vanno caricati con una base ASSOLUTA e con lo slash
               finale, altrimenti l'app si rompe appena non sta nella radice
               del sito (es. /livelab/).

               Perché non basta passare l'URL del JSON e lasciar fare a
               Strudel: senza la chiave "_base" il suo fallback ricava una
               base senza slash finale e poi concatena, producendo
               «…/samplesbd/BT0A0A7.wav» — 404. E una "_base" scritta nel
               JSON sarebbe un percorso fisso, cioè di nuovo il problema di
               partenza. Quindi: leggiamo la mappa e le mettiamo noi la base
               giusta, calcolata dall'indirizzo da cui la pagina è servita. */
            const url = LIVELAB.config.samplesUrl;
            const map = await (await fetch(url)).json();
            map._base = new URL('.', url).href;
            await strudel.samples(map);
            samplesLoaded = true;
          } catch (e) {
            console.warn('[strudel] campioni locali non caricati:', e);
            AppConsole.log('suono', 'warn',
              _t('campioni audio non caricati (bd, sd, hh… non suoneranno)'),
              LIVELAB.config.isLocal
                ? _t('Avvia l\'app con ./start.sh: i campioni hanno bisogno del server locale.')
                : _t('Ricarica la pagina; se il problema resta, la cartella samples/ non è stata caricata sul server.'));
          }
        },
      });
      strudelReady = true;
    } catch (e) {
      strudelError = (e && e.message) ? e.message : String(e);
      console.error('[strudel] init fallita:', e);
      AppConsole.log('suono', 'err', _t('Strudel non inizializzato: {error}', { error: strudelError }));
    }
  })();

  async function runStrudel(code) {
    await strudelBoot;
    if (!strudelReady) return { ok: false, error: _t('Strudel non inizializzato: {error}', { error: strudelError }) };
    /* strudel.evaluate NON rilancia gli errori: li logga come "[eval] error"
       sull'evento strudel.log. Li ascoltiamo durante la valutazione, così
       un pattern rotto risulta davvero fallito (e non "in riproduzione"). */
    let evalErr = null;
    const onLog = e => {
      const m = (e.detail && e.detail.message) || '';
      if (/^\[eval\] error/.test(m)) evalErr = m.replace(/^\[eval\] error:\s*/, '');
    };
    document.addEventListener('strudel.log', onLog);
    try {
      await strudel.evaluate(code);
    } catch (e) {
      return { ok: false, error: (e && e.message) ? e.message : String(e) };
    } finally {
      document.removeEventListener('strudel.log', onLog);
    }
    if (evalErr) return { ok: false, error: evalErr };
    soundCode = code; announceSound();
    return { ok: true };
  }

  function stopStrudel() {
    try { strudel.hush(); } catch (_) {}
    soundCode = null; announceSound();
  }

  /* ── VALIDAZIONE (per l'assistente AI: nessun effetto udibile/visibile) ─ */

  /* Hydra: istanza nascosta 8×8 senza loop — esegue il codice per davvero
     (compreso un tick, che valuta anche le funzioni () => …) ma non tocca
     né lo schermo né i globali. */
  let hydraCheck = null;
  function ensureHydraCheck() {
    if (hydraCheck) return hydraCheck;
    const c = document.createElement('canvas');
    c.width = 8; c.height = 8;
    hydraCheck = new Hydra({
      canvas: c, detectAudio: false, makeGlobal: false,
      autoLoop: false, width: 8, height: 8,
    });
    return hydraCheck;
  }

  /* Sorgenti esterne (webcam, schermo, video, immagini). Funzionano, e sono
     fra le cose più belle di Hydra — ma NON vanno eseguite in verifica:
     validateHydra esegue il codice davvero, quindi validare uno snippet con
     initCam() farebbe comparire la richiesta di permesso webcam durante un
     semplice controllo, senza che nessuno abbia premuto ▶.
     Per questi casi ci si ferma alla sintassi. */
  const HYDRA_STATIC_ONLY = /\b(initCam|initScreen|initVideo|initImage)\b/;

  function needsPermission(code) {
    return /\b(initCam|initScreen)\b/.test(String(code || ''));
  }

  function validateHydra(code) {
    if (HYDRA_STATIC_ONLY.test(code)) {
      try { new Function(code); return { ok: true, staticOnly: true }; }
      catch (e) { return { ok: false, error: e.message }; }
    }
    let h;
    try { h = ensureHydraCheck(); }
    catch (_) {
      // niente WebGL di riserva: ripiega sul solo controllo di sintassi
      try { new Function(code); return { ok: true }; }
      catch (e) { return { ok: false, error: e.message }; }
    }
    /* Hydra ingoia gli errori dei parametri-funzione (console.warn('ERROR', e)
       + valore di default): durante il tick di verifica li catturiamo noi,
       in silenzio, e li trattiamo come errori veri. */
    let swallowed = null;
    const prevWarn = console.warn;
    console.warn = (...args) => {
      if (args[0] === 'ERROR' && args[1]) {
        if (!swallowed) swallowed = args[1].message || String(args[1]);
        return;                          // niente rumore in console per la verifica
      }
      if (args[0] === 'function does not return a number') {
        if (!swallowed) swallowed = _t('una funzione () => … non restituisce un numero');
        return;
      }
      prevWarn.apply(console, args);
    };
    /* `a` (il microfono) esiste solo in un'istanza nata con detectAudio, e
       quella di verifica nasce senza — per non far chiedere il permesso
       durante un controllo. Senza questo sostituto ogni visuale reattiva
       (a.fft[0]…, che il prompt dell'assistente insegna) veniva bocciata con
       «a is not defined» e poi «corretta» togliendole il microfono. */
    const micStub = { fft: [0, 0, 0, 0], setBins() {}, setSmooth() {}, setCutoff() {}, setScale() {}, show() {}, hide() {} };
    /* Il codice gira davvero: un `onkeydown = …` (fuori da synth, quindi su
       window) resterebbe acceso come se lo studente l'avesse eseguito. */
    const savedHandlers = HANDLERS.map(h => window[h]);
    try {
      new Function('synth', 'a', 'with (synth) {\n' + code + '\n}')(h.synth, micStub);
      h.tick(16);
    } catch (e) {
      return { ok: false, error: (e && e.message) ? e.message : String(e) };
    } finally {
      console.warn = prevWarn;
      HANDLERS.forEach((h, i) => { try { window[h] = savedHandlers[i]; } catch (_) {} });
    }
    if (swallowed) return { ok: false, error: swallowed };
    return { ok: true };
  }

  /* Strudel: controlli statici — sintassi JS, pattern «orfani» (più pattern
     senza `$:`: suonerebbe solo l'ultimo), .bank(), nomi di funzione esistenti
     (introspezione del namespace reale e di Pattern.prototype), suoni
     esistenti nei pattern di sound()/s(), mini-notazione (strudel.mini).
     Zero effetti sullo scheduler. */
  const JS_GLOBALS = new Set(['Math', 'console', 'JSON', 'Array', 'Object',
    'Number', 'String', 'Boolean', 'parseInt', 'parseFloat', 'isNaN',
    // parole chiave che possono precedere una parentesi: non sono chiamate
    'if', 'for', 'while', 'switch', 'return', 'function', 'catch', 'typeof', 'await']);
  const STRUDEL_EXTRAS = new Set(['setcpm', 'setcps', 'setCpm', 'setCps', 'hush']);

  /* Due insiemi separati, non uno solo: `rotate` sta nel namespace ma NON su
     Pattern.prototype, quindi `sound("bd").rotate(…)` esplode a runtime
     (verificato). Con i nomi tutti in un mucchio passava la verifica, e
     l'assistente consegnava allo studente un blocco ✓ che poi non suonava.
     Le funzioni «nude» si cercano nel namespace, i metodi `.x()` sul
     prototipo: tutti i metodi che l'app insegna stanno lì. */
  let strudelNames = null;
  function getStrudelNames() {
    if (strudelNames) return strudelNames;
    const fns = new Set(), methods = new Set();
    try { Object.keys(strudel).forEach(k => fns.add(k)); } catch (_) {}
    try {
      if (strudel.Pattern && strudel.Pattern.prototype) {
        Object.getOwnPropertyNames(strudel.Pattern.prototype).forEach(k => methods.add(k));
      }
    } catch (_) {}
    STRUDEL_EXTRAS.forEach(k => fns.add(k));
    const names = { fns, methods, size: Math.min(fns.size, methods.size) };
    if (names.size > 50) strudelNames = names;   // cache solo se l'introspezione ha funzionato
    return names;
  }

  /* verificato sul bundle (strudel.soundMap a runtime): registerSynthSounds
     registra triangle, square, sawtooth, sine (+ alias tri/sqr/saw/sin),
     supersaw, pulse, sbd, bytebeat e i rumori white, pink, brown, crackle */
  const KNOWN_SOUNDS = new Set([
    // campioni locali (samples/strudel.json)
    'bd', 'sd', 'sn', 'hh', 'cp', 'lt', 'mt', 'ht', 'perc', 'casio', 'jazz',
    'arpy', 'tabla', 'east', 'space', 'crow', 'xbreak1', 'dnb1', 'sax',
    // sintetizzatori registrati da @strudel/web
    'sine', 'triangle', 'sawtooth', 'square', 'supersaw', 'pulse', 'sbd',
    'sin', 'tri', 'saw', 'sqr',
    'white', 'pink', 'brown', 'crackle',
    // strumenti fatti qui (js/instruments.js)
    ...Instruments.NAMES,
  ]);

  function soundTokens(code) {
    const out = [];
    const re = /\b(?:sound|s)\s*\(\s*(["'`])([\s\S]*?)\1/g;
    let m;
    while ((m = re.exec(code))) {
      for (const tok of m[2].split(/[\s\[\]<>{}(),*!/@~|]+/)) {
        const name = tok.split(':')[0].trim();
        if (name && /^[a-z_][\w-]*$/i.test(name) && isNaN(name)) out.push(name);
      }
    }
    return out;
  }

  /* Una sola passata sul codice, che distingue commenti e stringhe dal resto
     e raccoglie quello che le regex da sole sbagliano:
     · `starts`  — dove comincia ogni istruzione di PRIMO livello (profondità
       zero di parentesi; una riga che continua la precedente — inizia con
       un punto, o segue un operatore — non è un inizio);
     · `strings` — le stringhe che il transpiler di Strudel tratterà come
       mini-notazione: virgolette doppie e apici rovesci;
     · `plain`   — il codice senza commenti (dove cercare i nomi dei suoni);
     · `bones`   — senza commenti E con le stringhe svuotate: dove cercare i
       nomi di funzione. Sul codice grezzo l'euclideo "bd(3,8)" diventava
       «"bd" non esiste in Strudel», e un commento «// note in sequenza
       (nomi inglesi…)» diventava «"sequenza" non esiste»: codice giusto
       bocciato, e l'auto-correzione lo rovinava. */
  function scanStrudel(code) {
    const src = String(code || '');
    const starts = [], strings = [], cuts = [];   // cuts: gli stessi inizi, ma dentro `plain`
    let plain = '', bones = '';
    let depth = 0, prev = '', fresh = true;       // fresh: può iniziare un'istruzione
    for (let i = 0; i < src.length;) {
      const c = src[i], d = src[i + 1];
      if (c === '/' && d === '/') { while (i < src.length && src[i] !== '\n') i++; continue; }
      if (c === '/' && d === '*') {
        const j = src.indexOf('*/', i + 2);
        i = j < 0 ? src.length : j + 2;
        plain += ' '; bones += ' ';
        continue;
      }
      if (/\s/.test(c)) {
        if (c === '\n') fresh = true;
        plain += c; bones += c; i++;
        continue;
      }
      if (fresh) {
        fresh = false;
        if (depth === 0 && c !== '.' && !/[=,(\[{+\-*/%&|?:!~<>^.]/.test(prev)) {
          starts.push(i); cuts.push(plain.length);
        }
      }
      if (c === '"' || c === "'" || c === '`') {
        let j = i + 1;
        while (j < src.length && src[j] !== c) j += src[j] === '\\' ? 2 : 1;
        if (c !== "'") strings.push(src.slice(i + 1, j));
        plain += src.slice(i, j + 1); bones += c + c;
        i = j + 1; prev = c;
        continue;
      }
      if (c === '(' || c === '[' || c === '{') depth++;
      else if (c === ')' || c === ']' || c === '}') depth = Math.max(0, depth - 1);
      else if (c === ';' && depth === 0) fresh = true;
      plain += c; bones += c; prev = c; i++;
    }
    // una voce per pezzo: nel codice con `$:` ogni istruzione è un pattern a sé
    const chunks = cuts.length ? cuts.map((at, k) => plain.slice(at, cuts[k + 1])) : [plain];
    return { src, starts, strings, plain, bones, chunks };
  }

  /* In un `evaluate` suona UN solo pattern: l'ultima espressione. Due pattern
     su righe separate → il primo sparisce in silenzio; e appena c'è un `$:`,
     spariscono TUTTI quelli senza etichetta (verificato sul bundle). È
     l'errore più frequente dell'assistente, e a orecchio non si distingue da
     «funziona»: va fermato qui, con un messaggio che dica come si corregge. */
  const LABEL_START = /^[A-Za-z_$][\w$]*\s*:(?!:)/;
  const PATTERN_START = /^(?:(?:sound|s|note|n|chord|freq|stack|cat|seq|sequence|slowcat|fastcat|arrange|polymeter|polyrhythm|timecat|stepcat)\s*\(|["`])/;

  function orphanPatterns({ src, starts }) {
    let labeled = 0;
    const bare = [];
    for (const i of starts) {
      const head = src.slice(i, i + 80);
      if (LABEL_START.test(head)) labeled++;
      else if (PATTERN_START.test(head)) bare.push(head.split('\n')[0].slice(0, 28).trim());
    }
    const fix = _t('Scrivi $: davanti a OGNI pattern, ognuno sulla sua riga (esempio: «$: sound("bd*4")» e, a capo, «$: note("c2 g2")»), oppure uniscili in un solo stack(p1, p2)');
    if (labeled && bare.length) {
      return _t(`il pattern «{head}…» non ha $: davanti: quando nel codice c'è almeno un $:, i pattern senza $: non suonano. {fix}`, { head: bare[0], fix });
    }
    if (bare.length > 1) {
      return _t(`ci sono {n} pattern separati senza $: — così suona solo l'ultimo e gli altri vengono ignorati in silenzio. {fix}`, { n: bare.length, fix });
    }
    return null;
  }

  /* Le stringhe fra virgolette doppie diventano mini-notazione: una parentesi
     non chiusa è un errore a runtime che `new Function` non vede. strudel.mini
     è il parser vero, ed è puro: non tocca lo scheduler. */
  function miniError({ strings }) {
    if (typeof strudel.mini !== 'function') return null;
    for (const str of strings) {
      if (!str.trim() || /\\|\$\{/.test(str)) continue;     // escape e ${…}: non giudicabili da qui
      try { strudel.mini(str); }
      catch (e) {
        const found = /but (.+?) found/.exec(String(e && e.message) || '');
        return _t('mini-notazione non valida in "{str}"{found}: controlla che ogni [ < ( sia chiusa e che non ci siano simboli fuori posto', {
          str: str.replace(/\s+/g, ' ').slice(0, 40),
          found: found ? ' ' + _t('(trovato {what} dove non ci va)', { what: found[1] }) : '',
        });
      }
    }
    return null;
  }

  /* Codice che GIRA ma suona sbagliato: nessun errore, e quindi nessuna
     auto-correzione, se non lo si ferma qui. Sono le tre confusioni viste
     davvero nelle risposte del modello (tutte verificate sul bundle):
     · setcpm(120) inteso come bpm → sono 120 CICLI al minuto, cioè 480 bpm;
     · n("e4 g4") → n() con nomi di note non dà nessuna altezza: nota fissa;
     · n("0 2 4") senza .scale() su un sintetizzatore → idem, nota fissa;
     · note("c2 0 2 3") → in note() i numeri sono MIDI: 0-11 non si sentono.
     I controlli guardano un pezzo (= una voce) alla volta e, nel dubbio,
     lasciano passare: la libreria tocca al massimo setcpm(40), il workshop 60. */
  const SYNTHS = new Set(['sine', 'triangle', 'sawtooth', 'square', 'supersaw', 'pulse',
    'sin', 'tri', 'saw', 'sqr', 'white', 'pink', 'brown', 'crackle', ...Instruments.NAMES]);
  const MINI_SPLIT = /[\s\[\]<>{}(),|?~]+/;
  const firstStrings = (chunk, fn) => {       // la stringa passata a fn("…") o .fn("…")
    const out = [], re = new RegExp('(?:^|[^\\w$])' + fn + '\\s*\\(\\s*(["`])([\\s\\S]*?)\\1', 'g');
    let m;
    while ((m = re.exec(chunk))) out.push(m[2]);
    return out;
  };
  // via i numeri che NON sono valori: a@3  a*2  a/2  a!3  a:2  a(3,8)
  const bareTokens = str => str.replace(/[@*/!:]\s*-?[\d.]+/g, ' ').replace(/\(\s*\d+\s*,[^)]*\)/g, ' ').split(MINI_SPLIT).filter(Boolean);

  /* Un nome di scala sbagliato non dà errore: dà ZERO eventi, cioè una voce
     che sparisce dal brano senza che nessuno se ne accorga (verificato:
     "C5:minorPentatonic", "C:minore" e "C:inventata" suonano tutti il vuoto,
     mentre la forma giusta è "C:minor:pentatonic"). Qui il nome si prova sul
     motore vero — `n(0).scale(nome)` interrogato per qualche ciclo — perché
     una lista scritta a mano invecchierebbe col bundle. La prova è PURA:
     costruisce un pattern e lo interroga, senza scheduler e senza audio. */
  const SCALE_HINT = 'major, minor, dorian, phrygian, lydian, mixolydian, locrian, ' +
    'major:pentatonic, minor:pentatonic, harmonic:minor, melodic:minor, major:blues, minor:blues';
  function badScale(chunks) {
    if (typeof strudel.n !== 'function') return null;
    for (const chunk of chunks) {
      for (const str of firstStrings(chunk, 'scale')) {
        if (!str.trim() || /\\|\$\{/.test(str)) continue;
        let empty = false;
        try { empty = strudel.n(0).scale(str).queryArc(0, 4).length === 0; }
        catch (_) { empty = true; }
        if (empty) {
          return _t('la scala "{str}" non esiste: la voce resterebbe muta, senza errori. I nomi vanno scritti in minuscolo e separati dai due punti — {hint}. Esempi giusti: .scale("C:minor"), .scale("A2:minor:pentatonic"), .scale("D:dorian")',
            { str: str.slice(0, 30), hint: SCALE_HINT });
        }
      }
    }
    return null;
  }

  /* Valori a parole dentro un effetto numerico: .gain("forte"), .lpf("basso"),
     .delay("volume:0.5:0.75"). Non danno errore — il valore arriva al motore
     audio come stringa e l'effetto non si sente. */
  const NUMERIC_FX = ['gain', 'pan', 'lpf', 'hpf', 'cutoff', 'room', 'delay', 'speed',
    'crush', 'chop', 'attack', 'decay', 'sustain', 'release', 'adsr', 'ply', 'fast',
    'slow', 'legato', 'clip', 'coarse', 'size', 'velocity', 'degradeBy'];
  function wordyEffect(chunks) {
    for (const chunk of chunks) {
      for (const fx of NUMERIC_FX) {
        for (const str of firstStrings(chunk, fx)) {
          const words = bareTokens(str).filter(t => /^[a-z]{2,}$/i.test(t));
          if (words.length) {
            return _t(`.{fx}("{str}") contiene parole ({words}) dove ci vanno NUMERI: l'effetto non si sentirebbe. Scrivi dei numeri, es. .{fx}(0.5) oppure .{fx}("0.25 1")`,
              { fx, str: str.slice(0, 30), words: words.slice(0, 3).join(' ') }) +
              (fx === 'delay' ? ' · ' + _t('in .delay("a:b:c") a=volume b=tempo c=feedback, tutti numeri: .delay("0.5:0.125:0.75")') : '');
          }
        }
      }
    }
    return null;
  }

  function soundsWrong({ plain, chunks }) {
    const cpm = /\bsetcpm\s*\(\s*([\d.]+)\s*(?:\/\s*([\d.]+))?\s*\)/i.exec(plain);
    if (cpm) {
      const v = Number(cpm[1]) / (cpm[2] ? Number(cpm[2]) : 1);
      if (v > 70) {
        const n = cpm[2] ? `${cpm[1]}/${cpm[2]}` : cpm[1];
        return _t('setcpm({n}) sono {cycles} CICLI al minuto, cioè {bpm} bpm: troppo veloce. setcpm NON conta i bpm: per N bpm si scrive setcpm(N/4), es. setcpm(120/4)',
          { n, cycles: Math.round(v), bpm: Math.round(v * 4) });
      }
    }
    for (const chunk of chunks) {
      const moved = /\.(?:add|scale|transpose|scaleTranspose)\s*\(/.test(chunk);
      for (const str of firstStrings(chunk, 'n')) {
        const names = bareTokens(str).filter(t => /^[a-g][#bs]?-?\d$/i.test(t));
        if (names.length) {
          return _t('n("{str}") contiene nomi di note ({names}): n() vuole NUMERI, i gradi della scala — n("0 2 4").scale("C:minor"). Per i nomi delle note si usa note("{names}")',
            { str: str.slice(0, 30), names: names.slice(0, 3).join(' ') });
        }
        const hasSample = soundTokens(chunk).some(t => KNOWN_SOUNDS.has(t) && !SYNTHS.has(t));
        const stored = /^(?:const|let|var)\b/.test(chunk);   // la .scale() può arrivare dopo, altrove
        if (!moved && !hasSample && !stored && !/\.(?:voicing|arp|rootNotes)\s*\(/.test(chunk)) {
          return _t(`n("{str}") senza .scale(…) non cambia l'altezza: suonerebbe sempre la stessa nota. Aggiungi .scale("C:minor") subito dopo n(…), oppure usa note("c3 e3 g3")`,
            { str: str.slice(0, 30) });
        }
      }
      if (moved) continue;
      for (const str of firstStrings(chunk, 'note')) {
        const tiny = bareTokens(str).filter(t => /^\d+$/.test(t) && Number(t) < 12);
        if (tiny.length) {
          return _t('note("{str}") contiene numeri piccoli ({nums}): in note() i numeri sono note MIDI (48 = c3, 60 = c4) e sotto 12 non si sentono. Per i gradi della scala si usa n("{nums}").scale("C:minor"); altrimenti scrivi i nomi: note("c2 eb2 g2")',
            { str: str.slice(0, 30), nums: tiny.slice(0, 4).join(' ') });
        }
      }
    }
    return null;
  }

  function validateStrudel(code) {
    // `$:` è un'etichetta JS valida: anche il codice a più voci passa da tutti i controlli
    try { new Function(code); }
    catch (e) { return { ok: false, error: e.message } ; }

    const scan = scanStrudel(code);
    const orphan = orphanPatterns(scan);
    if (orphan) return { ok: false, error: orphan };

    /* `.out()` è di Hydra. In Strudel non dà errore: restituisce un pattern
       vuoto, cioè silenzio. Capita quando il modello confonde i due motori. */
    if (/\.out\s*\(/.test(scan.bones)) {
      return { ok: false, error: _t('.out() è di Hydra (le visuali), non di Strudel: in un pattern musicale non serve e lo rende muto. Toglilo e lascia che la catena finisca con l\'ultimo effetto') };
    }

    /* .bank() cerca campioni tipo «RolandTR909_bd»: qui non ci sono, e il
       risultato sarebbe silenzio con un errore solo in console. */
    if (/\.bank\s*\(/.test(scan.bones)) {
      return { ok: false, error: _t('.bank() non è disponibile in Open Live Lab (nessuna drum machine caricata): toglilo, i suoni bd sd hh cp… suonano già senza') };
    }

    const names = getStrudelNames();
    if (names.size > 50) {
      const calls = new Set(), meths = new Set(), local = new Set();
      const fnRe = /(?:^|[^.\w])([a-zA-Z_$][\w$]*)\s*\(/g;
      const methRe = /\.([a-zA-Z_$][\w$]*)\s*\(/g;
      const declRe = /\b(?:const|let|var|function)\s+([a-zA-Z_$][\w$]*)/g;
      let m;
      while ((m = fnRe.exec(scan.bones))) calls.add(m[1]);
      while ((m = methRe.exec(scan.bones))) meths.add(m[1]);
      while ((m = declRe.exec(scan.bones))) local.add(m[1]);   // nomi definiti dallo studente
      for (const name of calls) {
        if (!names.fns.has(name) && !JS_GLOBALS.has(name) && !local.has(name)) {
          return { ok: false, error: _t('"{name}" non esiste in Strudel', { name }) };
        }
      }
      for (const name of meths) {
        if (!names.methods.has(name) && !local.has(name)) {
          return { ok: false, error: names.fns.has(name)
            ? _t('"{name}" esiste in Strudel ma NON come .{name}() applicato a un pattern: così non funziona', { name })
            : _t('".{name}()" non esiste in Strudel', { name }) };
        }
      }
    }

    const badSounds = soundTokens(scan.plain).filter(t => !KNOWN_SOUNDS.has(t));
    if (badSounds.length) {
      return { ok: false, error: _t('suoni inesistenti: {bad} — disponibili: bd sd sn hh cp lt mt ht perc casio jazz arpy tabla east space crow xbreak1 dnb1 sax + sine triangle sawtooth square supersaw pulse + white pink brown crackle + {instruments}',
        { bad: [...new Set(badSounds)].join(', '), instruments: Instruments.NAMES.join(' ') }) };
    }

    const mini = miniError(scan);
    if (mini) return { ok: false, error: mini };

    const wrong = soundsWrong(scan);
    if (wrong) return { ok: false, error: wrong };

    const scale = badScale(scan.chunks);
    if (scale) return { ok: false, error: scale };

    const wordy = wordyEffect(scan.chunks);
    if (wordy) return { ok: false, error: wordy };
    return { ok: true };
  }

  /* ── API unificata ─────────────────────────────────────────────────── */
  return {
    /** Esegue `code` sul motore indicato. Ritorna {ok, error?} (Promise). */
    async run(engine, code) {
      return engine === 'hydra' ? runHydra(code) : runStrudel(code);
    },
    /** Ferma il motore indicato (o entrambi senza argomento). */
    stop(engine) {
      if (!engine || engine === 'hydra')   stopHydra();
      if (!engine || engine === 'strudel') stopStrudel();
    },
    /** Verifica `code` SENZA effetti visibili/udibili. Ritorna {ok, error?}. */
    async validate(engine, code) {
      if (engine === 'hydra') return validateHydra(code);
      await strudelBoot;
      return validateStrudel(code);
    },
    get samplesLoaded() { return samplesLoaded; },
    /** Il codice che sta suonando (editor o timeline), o null se c'è silenzio. */
    get soundCode() { return soundCode; },
    /** Posizione dello scheduler in cicli (frazionaria), o null se è fermo. */
    soundCycle() {
      try {
        const sch = mainRepl && mainRepl.scheduler;
        return sch && sch.started ? Number(sch.now()) : null;
      } catch (_) { return null; }
    },
    /** Dove stanno, nel codice che suona, i pezzi di mini-notazione: coppie
        [inizio, fine] in caratteri, calcolate dal transpiler a ogni evaluate.
        [] se è fermo o se la repl ha valutato altro. Per js/highlight.js. */
    soundLocations() {
      try {
        const st = mainRepl && mainRepl.state;
        return st && soundCode != null && st.activeCode === soundCode ? (st.miniLocations || []) : [];
      } catch (_) { return []; }
    },
    /** Gli eventi del pattern che suona fra i cicli `begin` ed `end`, o [] se
        è fermo. Solo un'interrogazione: lo scheduler non se ne accorge. */
    soundHaps(begin, end) {
      try {
        const sch = mainRepl && mainRepl.scheduler;
        if (!sch || !sch.started || !sch.pattern || soundCode == null) return [];
        return sch.pattern.queryArc(begin, end, { _cps: sch.cps });
      } catch (_) { return []; }
    },
    /** Ogni `evaluate` — anche di una repl muta — punta l'orologio globale di
        Strudel (getTime) sul PROPRIO scheduler. Chi valuta in silenzio deve
        chiamare questo subito dopo, o `time` nei pattern che suonano si ferma. */
    restoreClock() {
      try { if (mainRepl) strudel.setTime(() => mainRepl.scheduler.now()); } catch (_) {}
    },
    /** Promise che si risolve (true/false) quando Strudel ha finito il boot.
        Serve a chi valuta pattern senza suonarli (js/scoreview.js). */
    get strudelReady() { return strudelBoot.then(() => strudelReady); },
    get strudelReady()  { return strudelReady; },
    /** Microfono per le visuali reattive (a.fft). Ricrea l'istanza Hydra:
        chi chiama deve rilanciare il codice. Ritorna lo stato nuovo. */
    setMic,
    get micOn() { return micWanted; },
    /** true se il codice farà chiedere al browser webcam o schermo. */
    needsPermission,
    ensureHydra,
  };
})();
