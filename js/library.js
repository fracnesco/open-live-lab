/* ════════════════════════════════════════════════════════════════════════
   LIBRARY — il pannello SUONI: tutti i campioni e i sintetizzatori

   L'elenco viene da samples/strudel.json, la stessa mappa che carica
   Strudel: un campione aggiunto lì compare qui da solo (senza etichette,
   finché non gliele si dà in BANKS). Le etichette invece sono scritte a
   mano: nessun calcolo sa che "jazz:1" è un campanaccio.

   Tre gesti:
   · passare sopra (o arrivarci col Tab) → la forma d'onda. Il file si
     scarica e si decodifica solo allora, una volta sola: aprire il pannello
     non costa 3 MB di campioni a ogni studente della classe.
   · clic → lo si sente, così com'è. Un secondo clic lo ferma.
   · le etichette in alto filtrano; accese insieme valgono tutte (E, non O).

   L'ascolto usa il contesto audio di Strudel ma NON il suo scheduler: non
   tocca il pattern che sta suonando, non ne cambia il tempo, e se il
   browser non ha ancora sbloccato l'audio lo sblocca il clic stesso.

   In coda ai campioni, i suoni SINTETICI (SYNTHS): nessun file, li genera
   Strudel al momento. Il clic suona una nota con superdough, cioè lo
   stesso motore di s("sawtooth") nel pattern: si sente esattamente quello
   che si otterrà. Al posto della forma d'onda di un file, il riquadro
   disegna qualche periodo dell'onda calcolata: sine, square e sawtooth si
   distinguono proprio da lì.
   ════════════════════════════════════════════════════════════════════════ */

const Library = (() => {

  /* ── etichette ─────────────────────────────────────────────────────── */
  /* Ordine = ordine dei bottoni. [chiave, nome mostrato, spiegazione nel
     data-help]. La chiave resta in italiano anche nelle altre lingue: è
     quella scritta in BANKS, SYNTHS e SYNTH_GROUPS, e abbina i suoni ai
     filtri. Si mostra sempre il nome, tradotto (vedi tagName). */
  const TAGS = [
    ['batteria', _t('batteria'), _t('I pezzi di una batteria: cassa, rullante, piatti, tom, mani.')],
    ['cassa', _t('cassa'), _t('Il colpo grave che tiene il battito: di solito sui tempi forti.')],
    ['rullante', _t('rullante'), _t('Il colpo secco che risponde alla cassa, di solito sul 2 e sul 4.')],
    ['piatti', _t('piatti'), _t('Suoni metallici: il charleston che scandisce il tempo, il crash per gli accenti.')],
    ['tom', _t('tom'), _t('Tamburi intonati della batteria: grave, medio, acuto. Perfetti per i passaggi (fill).')],
    ['mani', _t('mani'), _t('Il battito di mani.')],
    ['percussioni', _t('percussioni'), _t('Colpi di legno, pelle e metallo fuori dalla batteria classica.')],
    ['mondo', _t('mondo'), _t('Strumenti di altre tradizioni: la tabla indiana, le percussioni giapponesi.')],
    ['intonato', _t('intonato'), _t('Ha un\'altezza precisa, quindi si presta alle melodie. Un campione sale di un\'ottava con .speed(2); un sintetizzatore suona la nota che gli dai con note().')],
    ['elettronico', _t('elettronico'), _t('Suoni nati da circuiti e tastierine, non da uno strumento acustico.')],
    ['effetti', _t('effetti'), _t('Rumori e suoni strani: per colorare, non per tenere il tempo.')],
    ['animali', _t('animali'), _t('Versi di animali.')],
    ['lungo', _t('lungo'), _t('Risuona a lungo (quasi un secondo, o più): con colpi ravvicinati i suoni si sovrappongono.')],
    ['break', _t('break'), _t('Un ritmo di batteria registrato e tagliato in segmenti: rimessi in fila ricompongono il ritmo, mescolati ne inventano di nuovi.')],
    ['sintetizzatore', _t('sintetizzatore'), _t('Nessuna registrazione: il suono lo genera al momento un oscillatore. Dura quanto la nota e si intona con note().')],
    ['rumore', _t('rumore'), _t('Un fruscio senza altezza. Corto e filtrato (.hpf, .lpf) diventa un charleston o un rullante sintetico.')],
  ];
  const TAG_NAMES = new Map(TAGS.map(([key, name]) => [key, name]));
  const tagName = key => TAG_NAMES.get(key) || key;

  /* Per banco: descrizione, etichette di tutto il banco, e — dove i file
     sono diversi fra loro — etichette in più per posizione (files[i] vale
     per "nome:i"). `labels[i]` è solo un nome da mostrare sul riquadro (la
     nota del sax): non diventa un filtro. */
  /* I nomi delle note del sax, nella notazione della lingua (la → A). */
  const [LA, SI, SIb, DO, DOd, RE, MI, MIb, FA, FAd, SOL, SOLd] = [
    _t('la'), _t('si'), _t('si♭'), _t('do'), _t('do♯'), _t('re'),
    _t('mi'), _t('mi♭'), _t('fa'), _t('fa♯'), _t('sol'), _t('sol♯')];

  const BANKS = {
    bd:    { desc: _t('La cassa: il colpo grave, il battito del ritmo.'), tags: ['batteria', 'cassa'] },
    sd:    { desc: _t('Il rullante: il colpo secco che risponde alla cassa.'), tags: ['batteria', 'rullante'] },
    sn:    { desc: _t('Un altro rullante, più corto e asciutto.'), tags: ['batteria', 'rullante'] },
    hh:    { desc: _t('Piatti: il charleston chiuso (hh:0), un crash e due colpi che risuonano.'), tags: ['batteria', 'piatti', 'lungo'] },
    cp:    { desc: _t('Il battito di mani.'), tags: ['batteria', 'mani'] },
    lt:    { desc: _t('Il tom grave.'), tags: ['batteria', 'tom'] },
    mt:    { desc: _t('Il tom medio.'), tags: ['batteria', 'tom'] },
    ht:    { desc: _t('Il tom acuto.'), tags: ['batteria', 'tom'] },
    perc:  { desc: _t('Piccole percussioni per arricchire il ritmo.'), tags: ['percussioni'] },
    casio: { desc: _t('Una tastierina Casio: nota acuta, nota grave, rumore.'), tags: ['elettronico'],
             files: [['intonato'], ['intonato'], ['effetti']] },
    jazz:  { desc: _t('Una batteria jazz: cassa, campanaccio, un effetto, charleston.'), tags: ['batteria'],
             files: [['cassa'], ['percussioni'], ['effetti', 'lungo'], ['piatti']] },
    arpy:  { desc: _t('Una nota pizzicata, in quattro altezze diverse.'), tags: ['intonato'] },
    tabla: { desc: _t('La tabla indiana: colpi gravi che risuonano a lungo.'), tags: ['mondo', 'percussioni', 'lungo'] },
    east:  { desc: _t('Percussioni giapponesi: un blocco di legno e il tamburo ohkawa.'), tags: ['mondo', 'percussioni'] },
    space: { desc: _t('Suoni spaziali, elettronici.'), tags: ['elettronico', 'effetti'] },
    crow:  { desc: _t('Il verso di un corvo.'), tags: ['effetti', 'animali'] },
    // 16 segmenti uguali (0,176 s): in fila fanno 2,82 s, un ciclo esatto a setcpm(85/4)
    xbreak1: { desc: _t('Un break di batteria in 16 segmenti. In ordine, uno per sedicesimo, ricompongono il ritmo: n("0 1 2 … 15").s("xbreak1") con setcpm(85/4). Mescola i numeri per inventarne uno nuovo.'),
               tags: ['batteria', 'break'] },
    // i segmenti arrivavano con nomi-timestamp: l'ordine è ricostruito dai raccordi fra un segmento e l'altro
    // cassa 0 1 5 8 9 13 · rullante 2 6 10 14 · piatti 3 4 7 11 12 15 (misurato come per xbreak1)
    dnb1:  { desc: _t('Un break drum\'n\'bass in 16 segmenti, come xbreak1: in ordine con setcpm(85/4) ricompone il ritmo. A setcpm(170/4) bastano i primi 8 per una battuta: n("0 1 2 3 4 5 6 7").s("dnb1") è il two-step.'),
             tags: ['batteria', 'break'] },
    sax:   { desc: _t('Note di sassofono, una per file, lunghe 4 secondi: .clip(1) le taglia alla durata della nota. I file con il 2 sono una seconda ripresa della stessa nota.'),
             tags: ['intonato', 'lungo'],
             labels: [LA, LA, SI, SIb, SIb, DO, DO, DOd, DOd, RE, MI, MI,
                      MIb, MIb, FA, FA, FAd, FAd, SOL, SOL, SOLd, SOLd] },
  };

  /* ── suoni sintetici ───────────────────────────────────────────────── */
  /* I nomi sono quelli che registerSynthSounds registra nel bundle (vedi
     KNOWN_SOUNDS in engines.js); bytebeat resta fuori, senza codice tace.
     `play` è la nota che si sente al clic — i parametri di default di
     Strudel, solo un'altezza e una durata: niente ritocchi, altrimenti il
     riquadro mentirebbe su come suona s("…") nel pattern. `wave` riempie
     un array di punti fra -1 e 1: è solo il disegno. */
  const TAU = 2 * Math.PI;
  const periodic = f => n => Float32Array.from({ length: n }, (_, i) => f((i / n * 3) % 1));  // 3 periodi
  const normalize = a => { const top = Math.max(...a.map(Math.abs)) || 1; return a.map(v => v / top); };
  /** Casuale ma sempre uguale (mulberry32): il fruscio non cambia a ogni passaggio. */
  const seeded = seed => () => {
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
  /** Rumore bianco passato per `step(campione, stato)`: il rosa e il marrone sono filtri. */
  const noise = (step, seed) => n => {
    const r = seeded(seed), st = [0, 0, 0];
    return normalize(Float32Array.from({ length: n }, () => step(r() * 2 - 1, st)));
  };

  const SYNTHS = [
    { id: 'sine', group: 'synth', tags: ['intonato'], label: _t('puro, morbido'),
      desc: _t('L\'onda sinusoidale: un solo suono puro, senza armonici. Morbida, quasi un fischio; in basso diventa un sub-basso. Si scrive anche "sin".'),
      play: { note: 'c4' }, duration: 1, wave: periodic(p => Math.sin(TAU * p)) },
    { id: 'triangle', group: 'synth', tags: ['intonato'], label: _t('dolce'),
      desc: _t('L\'onda triangolare: pochi armonici, un suono dolce che ricorda un flauto. È il suono di Strudel quando non scrivi .s(). Si scrive anche "tri".'),
      play: { note: 'c4' }, duration: 1, wave: periodic(p => 1 - 4 * Math.abs(p - 0.5)) },
    { id: 'sawtooth', group: 'synth', tags: ['intonato'], label: _t('brillante'),
      desc: _t('L\'onda a dente di sega: piena di armonici, brillante e ronzante. Con .lpf() si scurisce: è il classico basso e il suono acid. Si scrive anche "saw".'),
      play: { note: 'c4' }, duration: 1, wave: periodic(p => 2 * p - 1) },
    { id: 'square', group: 'synth', tags: ['intonato'], label: _t('da videogioco'),
      desc: _t('L\'onda quadra: salta fra due valori. Un suono vuoto e nasale, quello dei vecchi videogiochi. Si scrive anche "sqr".'),
      play: { note: 'c4' }, duration: 1, wave: periodic(p => p < 0.5 ? 1 : -1) },
    { id: 'pulse', group: 'synth', tags: ['intonato'], label: _t('quadra con .pw()'),
      desc: _t('L\'onda a impulsi: di base è una quadra, ma .pw() cambia quanto resta in alto (fra 0 e 1). Con .pw(0.1) diventa sottile e nasale.'),
      play: { note: 'c4' }, duration: 1, wave: periodic(p => p < 0.5 ? 1 : -1) },
    { id: 'supersaw', group: 'synth', tags: ['intonato'], label: _t('grosso, largo'),
      desc: _t('Cinque denti di sega leggermente stonati fra loro, suonati insieme: un suono largo e grosso, da tappeto o da accordi. .detune() li allontana, .unison() ne cambia il numero.'),
      play: { note: 'c4' }, duration: 1,
      wave: n => {
        const r = seeded(7), voices = [-0.18, -0.09, 0, 0.09, 0.18].map(d => [2 ** (d / 12), r()]);
        return normalize(Float32Array.from({ length: n }, (_, i) => voices.reduce(
          (sum, [ratio, phase]) => sum + 2 * ((i / n * 6 * ratio + phase) % 1) - 1, 0)));
      } },
    { id: 'sbd', group: 'synth', tags: ['batteria', 'cassa'], label: _t('cassa sintetica'),
      desc: _t('Una cassa fatta al momento: un\'onda che parte acuta e precipita verso il grave. .decay() la allunga, .penv() cambia quanto parte in alto.'),
      play: {}, duration: 0.5,
      wave: n => { let ph = 0; return Float32Array.from({ length: n }, (_, i) => {
        const t = i / n; ph += (2 + 40 * Math.exp(-t * 14)) / n; return Math.sin(TAU * ph) * Math.exp(-t * 4); }); } },
    { id: 'white', group: 'noise', tags: [], label: _t('tutte le frequenze'),
      desc: _t('Il rumore bianco: tutte le frequenze alla stessa forza, un soffio aspro. Corto e filtrato, s("white").decay(0.05).sustain(0).hpf(8000), fa un charleston.'),
      play: {}, duration: 0.6, wave: noise(w => w, 1) },
    { id: 'pink', group: 'noise', tags: [], label: _t('più morbido'),
      desc: _t('Il rumore rosa: più forte sui gravi, quindi meno aspro del bianco. Somiglia alla pioggia.'),
      play: {}, duration: 0.6,
      wave: noise((w, b) => {          // filtro di Paul Kellet, versione corta
        b[0] = 0.99765 * b[0] + w * 0.0990460; b[1] = 0.963 * b[1] + w * 0.2965164; b[2] = 0.57 * b[2] + w * 1.0526913;
        return b[0] + b[1] + b[2] + w * 0.1848; }, 2) },
    { id: 'brown', group: 'noise', tags: [], label: _t('cupo, come il mare'),
      desc: _t('Il rumore marrone: quasi solo gravi, un brontolio cupo come il mare o il vento.'),
      play: {}, duration: 0.6, wave: noise((w, b) => (b[0] = 0.97 * b[0] + w * 0.3), 3) },
    { id: 'crackle', group: 'noise', tags: [], label: _t('scoppiettii'),
      desc: _t('Scoppiettii sparsi, come un disco in vinile o il fuoco. .density() ne cambia il numero.'),
      play: {}, duration: 1, wave: noise(w => Math.abs(w) > 0.94 ? w : 0, 4) },
  ];

  /* Le intestazioni dei due gruppi, al posto di BANKS. */
  const SYNTH_GROUPS = {
    synth: { name: _t('sintetizzatori'), code: 'note("c4").s("…")', example: 'note("c4").s("sawtooth")',
      tags: ['sintetizzatore', 'elettronico'],
      desc: _t('Sintetizzatori: nessun file, il suono lo genera un oscillatore. Durano quanto la nota; .attack() e .release() lo fanno entrare e uscire piano.') },
    noise: { name: _t('rumori'), code: 's("…")', example: 's("pink")',
      tags: ['rumore', 'elettronico'],
      desc: _t('Rumori: niente altezza, solo fruscio. Con un inviluppo corto, .decay(0.05).sustain(0), e un filtro diventano percussioni.') },
  };

  const PEAKS = 160;             // colonne della forma d'onda (poi si stira sul canvas)

  const drawer  = document.getElementById('library-drawer');
  const tagsEl  = document.getElementById('library-tags');
  const listEl  = document.getElementById('library-list');
  const countEl = document.getElementById('library-count');

  let samples = null;            // [{ id:"bd:0", bank, index, path, tags:Set, own:[] }] + i SYNTHS, con `synth`
  let loading = null;
  const selected = new Set();    // etichette accese

  /* ── la mappa dei campioni ─────────────────────────────────────────── */
  function loadMap() {
    if (!loading) loading = (async () => {
      const map = await (await fetch(LIVELAB.config.samplesUrl)).json();
      const out = [];
      for (const [bank, files] of Object.entries(map)) {
        if (bank.startsWith('_') || !Array.isArray(files)) continue;
        const info = BANKS[bank] || { tags: [] };
        files.forEach((path, index) => {
          const own = (info.files && info.files[index]) || [];
          out.push({ id: `${bank}:${index}`, bank, index, path,
            tags: new Set([...info.tags, ...own]), own,
            label: (info.labels && info.labels[index]) || '' });
        });
      }
      for (const synth of SYNTHS) {
        out.push({ id: synth.id, bank: synth.group, synth, own: [], label: synth.label,
          tags: new Set([...SYNTH_GROUPS[synth.group].tags, ...synth.tags]) });
      }
      samples = out;
    })().catch(e => { loading = null; throw e; });
    return loading;
  }

  /* ── audio: decodifica pigra + ascolto ─────────────────────────────── */
  let ownCtx = null;
  function audioCtx() {
    try { if (typeof strudel.getAudioContext === 'function') return strudel.getAudioContext(); }
    catch (_) {}
    return ownCtx || (ownCtx = new (window.AudioContext || window.webkitAudioContext)());
  }

  const decoded = new Map();     // id → Promise<{ buffer, peaks }>
  function decode(s) {
    if (!decoded.has(s.id)) {
      const p = (async () => {
        const res = await fetch(LIVELAB.config.url('samples/' + s.path));
        if (!res.ok) throw new Error(`${s.path}: ${res.status}`);
        const buffer = await audioCtx().decodeAudioData(await res.arrayBuffer());
        return { buffer, peaks: peaksOf(buffer) };
      })();
      p.catch(() => decoded.delete(s.id));     // al prossimo passaggio si riprova
      decoded.set(s.id, p);
    }
    return decoded.get(s.id);
  }

  /** Minimo e massimo per colonna, su tutti i canali, normalizzati: un
      campione registrato piano deve avere una forma leggibile quanto gli altri. */
  function peaksOf(buffer) {
    const chans = [];
    for (let c = 0; c < buffer.numberOfChannels; c++) chans.push(buffer.getChannelData(c));
    const len = buffer.length, lo = new Float32Array(PEAKS), hi = new Float32Array(PEAKS);
    let top = 0;
    for (let i = 0; i < PEAKS; i++) {
      const a = Math.floor(i * len / PEAKS), b = Math.max(a + 1, Math.floor((i + 1) * len / PEAKS));
      let mn = 0, mx = 0;
      for (const d of chans) for (let j = a; j < b && j < len; j++) {
        if (d[j] < mn) mn = d[j]; else if (d[j] > mx) mx = d[j];
      }
      lo[i] = mn; hi[i] = mx;
      top = Math.max(top, -mn, mx);
    }
    const k = top > 0 ? Math.min(1 / top, 8) : 1;
    for (let i = 0; i < PEAKS; i++) { lo[i] *= k; hi[i] *= k; }
    return { lo, hi };
  }

  /** Il colore lo decide il CSS (color del canvas): così segue il tema. Si
      ridisegna a ogni passaggio, quindi anche dopo un cambio di tema. */
  function canvasOf(tile) {
    const cv = tile.querySelector('.lib-wave');
    const w = cv.clientWidth, h = cv.clientHeight;
    if (!w || !h) return null;
    const dpr = window.devicePixelRatio || 1;
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    const g = cv.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = g.strokeStyle = getComputedStyle(cv).color;
    return { g, w, h, mid: h / 2, amp: h * 0.42 };
  }

  function drawWave(tile, peaks) {
    const c = canvasOf(tile);
    if (!c) return;
    for (let x = 0; x < c.w; x++) {
      const i = Math.min(PEAKS - 1, Math.floor(x / c.w * PEAKS));
      const y0 = c.mid - peaks.hi[i] * c.amp, y1 = c.mid - peaks.lo[i] * c.amp;
      c.g.fillRect(x, y0, 1, Math.max(1, y1 - y0));
    }
  }

  /** Un sintetico non ha un file da riassumere: si disegna l'onda stessa,
      come linea, calcolata una volta sola. */
  const SHAPE_POINTS = 240;
  const shapes = new Map();      // id → Float32Array
  function drawShape(tile, s) {
    const c = canvasOf(tile);
    if (!c) return;
    if (!shapes.has(s.id)) shapes.set(s.id, s.synth.wave(SHAPE_POINTS));
    const pts = shapes.get(s.id);
    c.g.lineWidth = 1.5;
    c.g.lineJoin = 'round';
    c.g.beginPath();
    pts.forEach((v, i) => c.g.lineTo(i / (pts.length - 1) * c.w, c.mid - v * c.amp));
    c.g.stroke();
  }

  const fmtDur = sec => sec < 1 ? `${Math.round(sec * 1000)} ms` : `${sec.toFixed(1)} s`;

  async function showWave(tile, s) {
    tile.classList.add('is-loading');
    try {
      const { buffer, peaks } = await decode(s);
      tile.querySelector('.lib-dur').textContent = fmtDur(buffer.duration);
      drawWave(tile, peaks);
      return buffer;
    } catch (e) {
      tile.classList.add('is-broken');
      tile.querySelector('.lib-dur').textContent = _t('non trovato');
      AppConsole.log('suoni', 'warn', _t('il campione {id} non si carica ({err})', { id: s.id, err: e && e.message || e }),
        _t('Se succede con tutti i campioni, la cartella samples/ non è raggiungibile.'));
      return null;
    } finally {
      tile.classList.remove('is-loading');
    }
  }

  let playing = null;            // { tile, src, anim }
  let playToken = 0;

  function stopPreview() {
    playToken++;
    if (!playing) return;
    const { tile, src, anim } = playing;
    playing = null;
    if (src) try { src.onended = null; src.stop(); } catch (_) {}
    if (anim) anim.cancel();
    tile.classList.remove('is-playing');
  }

  /* Un sintetico non si può fermare: superdough non restituisce la nota che
     suona. Per questo la nota è corta e un secondo clic la RIsuona, invece
     di fingere di fermarla. */
  async function play(tile, s) {
    if (playing && playing.tile === tile && !s.synth) { stopPreview(); return; }
    stopPreview();
    const token = playToken;
    const ctx = audioCtx();
    // subito, dentro il clic: il browser sblocca l'audio solo su un gesto
    if (ctx.state !== 'running') ctx.resume().catch(() => {});
    if (s.synth) return playSynth(tile, s, token, ctx);
    const buffer = await showWave(tile, s);
    if (!buffer || token !== playToken) return;   // fermato o cambiato nel frattempo
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(ctx.destination);
    src.start();
    tile.classList.add('is-playing');
    const anim = tile.querySelector('.lib-head').animate(
      [{ left: '0%' }, { left: '100%' }],
      { duration: buffer.duration * 1000, easing: 'linear' });
    playing = { tile, src, anim };
    src.onended = () => { if (playing && playing.src === src) stopPreview(); };
  }

  async function playSynth(tile, s, token, ctx) {
    drawShape(tile, s);
    /* supersaw e pulse sono AudioWorklet: esistono solo dopo initAudio, che
       Strudel lancia al primo mousedown sulla pagina — con il clic c'è già
       stato, e qui si aspetta che finisca. Da tastiera il mousedown può non
       esserci mai: dopo un attimo si prova comunque. */
    await Promise.race([strudel.initAudioOnFirstClick(), new Promise(r => setTimeout(r, 1500))]);
    if (token !== playToken) return;
    const { play: value, duration } = s.synth;
    try {
      await strudel.superdough({ s: s.id, ...value }, ctx.currentTime + 0.05, duration);
    } catch (e) {
      AppConsole.log('suoni', 'warn', _t('il sintetizzatore {id} non suona ({err})', { id: s.id, err: e && e.message || e }),
        _t('Ricarica la pagina: i sintetizzatori li prepara Strudel all\'avvio.'));
      return;
    }
    if (token !== playToken) return;
    tile.classList.add('is-playing');
    const anim = tile.querySelector('.lib-head').animate(
      [{ left: '0%' }, { left: '100%' }],
      { duration: duration * 1000, easing: 'linear' });
    playing = { tile, src: null, anim };
    anim.onfinish = () => { if (playing && playing.anim === anim) stopPreview(); };
  }

  /* ── disegno del pannello ──────────────────────────────────────────── */
  const matches = (s, tags) => [...tags].every(t => s.tags.has(t));

  function renderTags() {
    tagsEl.innerHTML = '';
    for (const [tag, name, help] of TAGS) {
      const on = selected.has(tag);
      // quanti campioni restano accendendo anche questa: 0 = bottone spento
      const n = samples.filter(s => matches(s, new Set([...selected, tag]))).length;
      if (!n && !samples.some(s => s.tags.has(tag))) continue;   // etichetta senza campioni
      const b = document.createElement('button');
      b.className = 'lib-tag' + (on ? ' is-on' : '');
      b.disabled = !on && !n;
      b.setAttribute('aria-pressed', on);
      b.dataset.help = `${name}|${help} ` + _t('Clicca per mostrare solo questi suoni; accendendo più etichette restano i suoni che le hanno tutte.');
      b.innerHTML = `${name} <span class="lib-tag-n">${n}</span>`;
      b.addEventListener('click', () => {
        if (on) selected.delete(tag); else selected.add(tag);
        render();
      });
      tagsEl.appendChild(b);
    }
    if (selected.size) {
      const all = document.createElement('button');
      all.className = 'lib-tag lib-tag-reset';
      all.textContent = _t('✕ tutte');
      all.dataset.help = _t('Tutte|Spegne le etichette e torna a mostrare tutti i suoni.');
      all.addEventListener('click', () => { selected.clear(); render(); });
      tagsEl.appendChild(all);
    }
  }

  function tileFor(s) {
    const tile = document.createElement('button');
    tile.className = 'lib-tile';
    if (s.synth) {
      const code = s.synth.play.note ? `note("c4 e4 g4").s("${s.id}")` : `s("${s.id}")`;
      tile.dataset.help = `${s.id}${s.label ? ' · ' + s.label : ''}|${s.synth.desc} ` +
        _t('Passa sopra per vedere la forma dell\'onda, clicca per sentirne una nota. Nel codice: {code}.', { code });
    } else {
      const file = s.path.split('/').pop();
      tile.dataset.help = `${s.id}${s.label ? ' · ' + s.label : ''}|` +
        _t('Passa sopra per vedere la forma d\'onda, clicca per ascoltarlo (un altro clic lo ferma).') + ' ' +
        (s.index === 0
          ? _t('Nel codice: s("{id}") oppure s("{bank}"). File: {file}.', { id: s.id, bank: s.bank, file })
          : _t('Nel codice: s("{id}"). File: {file}.', { id: s.id, file }));
    }
    tile.innerHTML =
      '<canvas class="lib-wave"></canvas><span class="lib-head"></span>' +
      `<span class="lib-name">${s.id}</span>` +
      `<span class="lib-meta"><span class="lib-own">${[s.label, ...s.own.map(tagName)].filter(Boolean).join(' · ')}</span><span class="lib-dur"></span></span>`;
    const hover = () => {
      if (s.synth) drawShape(tile, s);
      else if (!tile.classList.contains('is-broken')) showWave(tile, s);
    };
    tile.addEventListener('pointerenter', hover);
    tile.addEventListener('focus', hover);
    tile.addEventListener('click', () => play(tile, s));
    return tile;
  }

  function render() {
    stopPreview();
    renderTags();
    listEl.innerHTML = '';
    const shown = samples.filter(s => matches(s, selected));
    const banks = [...new Set(shown.map(s => s.bank))];
    for (const bank of banks) {
      const synths = SYNTH_GROUPS[bank];
      const info = synths || BANKS[bank] || { desc: '', tags: [] };
      const group = document.createElement('section');
      group.className = 'lib-group';
      const head = document.createElement('div');
      head.className = 'lib-group-head';
      head.dataset.help = synths
        ? `${synths.name}|${synths.desc} ` + _t('Nel codice al posto dei puntini va il nome, es. {example}.', { example: synths.example })
        : `${bank}|${info.desc || _t('Un banco di campioni.')} ` +
          _t('Nel codice si scrive s("{bank}"); con i due punti scegli quale: s("{bank}:1") è il secondo.', { bank });
      head.innerHTML = `<code class="lib-code">${synths ? synths.code : `s("${bank}")`}</code>` +
        `<span class="lib-desc"></span>` +
        `<span class="lib-bank-tags">${info.tags.map(tagName).join(' · ')}</span>`;
      head.querySelector('.lib-desc').textContent = info.desc || '';
      const grid = document.createElement('div');
      grid.className = 'lib-grid';
      for (const s of shown) if (s.bank === bank) grid.appendChild(tileFor(s));
      group.append(head, grid);
      listEl.appendChild(group);
    }
    const files = samples.filter(s => !s.synth);
    countEl.textContent = selected.size
      ? _t('{n} di {tot} suoni', { n: shown.length, tot: samples.length })
      : _t('{files} campioni in {banks} banchi · {synths} sintetici',
          { files: files.length, banks: new Set(files.map(s => s.bank)).size, synths: SYNTHS.length });
  }

  async function open() {
    drawer.hidden = false;
    if (samples) return;
    countEl.textContent = _t('carico l\'elenco…');
    try { await loadMap(); render(); }
    catch (e) {
      countEl.textContent = _t('elenco dei campioni non disponibile');
      AppConsole.log('suoni', 'err', _t('non riesco a leggere samples/strudel.json: {err}', { err: e && e.message || e }),
        LIVELAB.config.isLocal ? _t('Avvia l\'app con ./start.sh.') : _t('Ricarica la pagina.'));
    }
  }

  return {
    open,
    close() { drawer.hidden = true; stopPreview(); },
    get isOpen() { return !drawer.hidden; },
  };
})();
