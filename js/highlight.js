/* ════════════════════════════════════════════════════════════════════════
   HIGHLIGHT — nel codice che suona si accende ciò che si sta sentendo

   Come su strudel.cc. Il transpiler di Strudel riscrive ogni stringa "…"
   del codice in mini-notazione e annota ogni evento («hap») con la
   posizione nel codice dell'atomo che l'ha prodotto:
   hap.context.locations = [{ start, end }], in caratteri dal primo del
   codice passato a evaluate. Quindi, a ogni fotogramma: quali eventi
   suonano ADESSO (l'orologio della repl che suona, Engines.soundCycle, lo
   stesso del puntatore dello spartito) → quali pezzi di codice → un
   riquadro attorno a quelli.

   Tre cose da sapere prima di toccarlo:

   1. Quale editor. Si cercano tutti i CodeMirror in pagina (LAB, riquadri
      dei tutorial, finestra della clip) e si evidenzia quello il cui testo è
      IDENTICO al codice appena eseguito. Così nessun modulo deve
      registrarsi, e la timeline — che suona un codice composto, diverso da
      qualunque editor — non accende niente.
   2. Il codice si modifica anche mentre suona. Gli offset di Strudel valgono
      per il testo com'era quando è partito: per questo, appena parte il
      suono, ogni posizione diventa un segnaposto di CodeMirror (un markText
      senza stile), che CodeMirror sposta da solo quando si scrive prima o
      dentro. Un pezzo cancellato perde il segnaposto e non si accende più.
   3. Si spegne dal menu ◐ TEMA (LIVELAB.theme.highlight). I segnaposto si
      creano comunque: riaccendendolo a musica in corso, riparte subito.
   ════════════════════════════════════════════════════════════════════════ */

const CodeHighlight = (() => {

  const WINDOW = 0.25;     // cicli interrogati in una volta; poi si filtra per fotogramma

  // { cm, anchors: Map<'inizio:fine', TextMarker>, lit: TextMarker[], litKey }
  let targets = [];
  let cache = null;        // { begin, end, haps }
  let rafId = null;

  const isOn = () => !(window.LIVELAB && LIVELAB.theme) || LIVELAB.theme.highlight !== false;

  function unlight(t) {
    if (!t.lit.length) { t.litKey = ''; return; }
    t.cm.operation(() => t.lit.forEach(m => m.clear()));
    t.lit = []; t.litKey = '';
  }

  function release() {
    for (const t of targets) {
      unlight(t);
      t.cm.operation(() => t.anchors.forEach(m => m.clear()));
    }
    targets = []; cache = null;
  }

  /** È partito `code` (o si è fermato tutto, con null): nuovi segnaposto. */
  function follow(code) {
    release();
    if (code == null) return;
    const locs = Engines.soundLocations()
      .map(l => Array.isArray(l) ? l : [l.start, l.end])
      .filter(([a, b]) => b > a);
    if (!locs.length) return;
    for (const el of document.querySelectorAll('.CodeMirror')) {
      const cm = el.CodeMirror;
      if (!cm || cm.getValue() !== code) continue;
      const anchors = new Map();
      cm.operation(() => {
        for (const [a, b] of locs) {
          const key = a + ':' + b;
          if (!anchors.has(key)) anchors.set(key, cm.markText(cm.posFromIndex(a), cm.posFromIndex(b)));
        }
      });
      targets.push({ cm, anchors, lit: [], litKey: '' });
    }
    start();
  }

  /* Un .color("…") nel pattern colora anche il riquadro, come su
     strudel.cc. Il valore finisce in uno style: si accettano solo nomi,
     #esadecimali e funzioni di colore. */
  function colorOf(value) {
    const c = value && typeof value === 'object' ? value.color : null;
    return typeof c === 'string' && /^[#\w(),.%\s-]{1,40}$/.test(c) ? c.trim() : '';
  }

  /** I pezzi di codice che suonano all'istante `now`: 'inizio:fine' → colore. */
  function activeAt(now) {
    if (!cache || now < cache.begin || now >= cache.end) {
      cache = { begin: now, end: now + WINDOW, haps: Engines.soundHaps(now, now + WINDOW) };
    }
    const out = new Map();
    for (const h of cache.haps) {
      const w = h.whole;
      if (!w || !(Number(w.begin) <= now && now < Number(w.end))) continue;
      const locs = h.context && h.context.locations;
      if (!locs) continue;
      const color = colorOf(h.value);
      for (const l of locs) out.set(l.start + ':' + l.end, color);
    }
    return out;
  }

  function paint(t, active, key) {
    if (key === t.litKey) return;           // lo stesso istante di prima: niente da rifare
    const cm = t.cm;
    cm.operation(() => {
      t.lit.forEach(m => m.clear());
      t.lit = [];
      for (const [k, color] of active) {
        const anchor = t.anchors.get(k);
        const r = anchor && anchor.find();
        if (!r) continue;
        t.lit.push(cm.markText(r.from, r.to,
          color ? { className: 'cm-playing', css: '--hl: ' + color } : { className: 'cm-playing' }));
      }
    });
    t.litKey = key;
  }

  function frame() {
    rafId = null;
    if (!targets.length) return;
    if (!isOn()) { targets.forEach(unlight); return; }
    rafId = requestAnimationFrame(frame);
    const now = Engines.soundCycle();
    const active = now == null ? new Map() : activeAt(now);
    const key = [...active].map(([k, c]) => k + '=' + c).sort().join(' ');
    for (const t of targets) {
      // un editor nascosto (vista non aperta) non si ridisegna: lo farà quando ricompare
      if (t.cm.getWrapperElement().offsetParent === null) continue;
      paint(t, active, key);
    }
  }

  function start() {
    if (rafId == null && targets.length && isOn()) rafId = requestAnimationFrame(frame);
  }

  document.addEventListener('livelab:sound', e => follow(e.detail ? e.detail.code : null));
  document.addEventListener('livelab:highlight', start);

  return {
    /** Quanti editor stanno seguendo il suono (per le verifiche). */
    get following() { return targets.length; },
  };
})();
