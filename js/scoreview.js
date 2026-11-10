/* ════════════════════════════════════════════════════════════════════════
   SCOREVIEW — il pannello SPARTITO

   Prende il codice dell'editor SUONO, lo valuta IN SILENZIO, interroga il
   pattern per qualche ciclo, e fa scrivere lo spartito a js/score.js
   (eventi → testo ABC) e disegnare ad abcjs (testo ABC → SVG).

   Tre cose da sapere prima di toccarlo:

   1. La valutazione silenziosa usa una `strudel.repl` NUOVA a ogni giro,
      con l'uscita muta. Non si usa mai `strudel.evaluate` (la repl che
      suona): anche con autostart=false sostituirebbe il pattern in
      riproduzione. Una repl nuova ha anche il registro dei blocchi `$:`
      pulito — riusarla mescolerebbe lo spartito di prima con quello di ora.
   2. Le righe setcpm()/setcps() si tolgono prima di valutare: cambierebbero
      il tempo di ciò che sta suonando. Il numero si legge a parte, per
      scrivere il metronomo.
   3. Valutare è comunque ESEGUIRE codice. Quindi lo spartito si aggiorna
      solo su un gesto dello studente (aprire il pannello, ↻ AGGIORNA,
      ▶ ESEGUI), mai mentre scrive e mai da solo su codice arrivato dalla
      lavagna: è la stessa regola del resto dell'app.

   4. Il PUNTATORE segue l'orologio della repl che suona (Engines.soundCycle),
      non un timer proprio: così non va mai alla deriva. La posizione sullo
      spartito viene dalle tabelle di abcjs (TimingCallbacks.noteTimings: per
      ogni istante, la x e l'altezza del sistema), perché la spaziatura non è
      lineare — una battuta con una terzina è più larga dove ci sono più
      note. Il puntatore compare solo se sta suonando PROPRIO il codice
      disegnato: se suona la timeline, o lo studente ha cambiato il codice
      senza rieseguirlo, sparisce e una riga dice perché.
   5. Lo spartito è una PAGINA: i cicli da `page` a `page + bars`. Il caso di
      Strudel (rand, choose, degrade, sometimes…) non è casuale ma dipende
      dal ciclo: il ciclo 37 suona sempre le stesse note, ma diverse dal
      ciclo 0. Quindi mentre suona, a ogni giro di `bars` cicli il puntatore
      volta pagina e si reinterroga il pattern GIÀ valutato (niente codice
      nuovo eseguito): si ridisegna solo se le note sono cambiate. Da fermo
      si mostra la pagina che parte dal ciclo 0.

   abcjs (472 KB) si carica alla prima apertura del pannello, non al boot.
   ════════════════════════════════════════════════════════════════════════ */

const ScoreView = (() => {

  const QUERY_BARS = 8;          // cicli interrogati (servono a trovare il periodo)
  const MAX_HAPS = 3000;         // oltre, il pattern è troppo fitto per uno spartito
  const EVAL_TIMEOUT = 5000;

  const drawer  = document.getElementById('score-drawer');
  const paper   = document.getElementById('score-paper');
  const msgEl   = document.getElementById('score-msg');
  const warnEl  = document.getElementById('score-warn');
  const legendEl = document.getElementById('score-legend');
  const abcEl   = document.getElementById('score-abc');
  const abcWrap = document.getElementById('score-abc-wrap');
  const barsSel = document.getElementById('score-bars');
  const syncEl  = document.getElementById('score-sync');

  /* ── abcjs, caricato una volta sola ────────────────────────────────── */
  let abcjsLoading = null;
  function loadAbcjs() {
    if (window.ABCJS) return Promise.resolve(true);
    if (!abcjsLoading) abcjsLoading = new Promise(resolve => {
      const s = document.createElement('script');
      s.src = LIVELAB.config.baseUrl + 'vendor/abcjs-basic-min.js';
      s.onload = () => resolve(!!window.ABCJS);
      s.onerror = () => { abcjsLoading = null; resolve(false); };
      document.head.appendChild(s);
    });
    return abcjsLoading;
  }

  /* ── tempo: setcpm / setcps → battiti al minuto ────────────────────── */
  function num(expr) {                     // "30", "120/4", "0.5"
    const m = /^\s*([0-9.]+)\s*(?:\/\s*([0-9.]+))?\s*$/.exec(expr);
    if (!m) return null;
    const v = Number(m[1]) / (m[2] ? Number(m[2]) : 1);
    return Number.isFinite(v) && v > 0 ? v : null;
  }
  /** Toglie le righe di tempo e ne ricava i bpm (1 ciclo = 4 battiti). */
  function splitTempo(code) {
    let bpm = 120;                         // il default di Strudel: 0.5 cicli al secondo
    const rest = [];
    for (const line of String(code || '').split('\n')) {
      const m = /^\s*set(cpm|cps)\s*\(([^)]*)\)\s*;?\s*$/i.exec(line);
      if (!m) { rest.push(line); continue; }
      const v = num(m[2]);
      if (v) bpm = m[1].toLowerCase() === 'cpm' ? v * 4 : v * 60 * 4;
    }
    return { code: rest.join('\n'), bpm };
  }
  const onlyComments = code => !code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '').trim();

  /* ── valutazione silenziosa ────────────────────────────────────────── */
  async function silentPattern(code) {
    const ready = await Engines.strudelReady;
    if (!ready) throw new Error(_t('Strudel non è partito: ricarica la pagina.'));
    let evalError = null;
    const repl = strudel.repl({
      defaultOutput: () => {},             // muta
      getTime: () => 0,
      transpiler: strudel.transpiler,
      onEvalError: e => { evalError = e; },
    });
    const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('TIMEOUT')), EVAL_TIMEOUT));
    let pattern;
    try { pattern = await Promise.race([repl.evaluate(code, false, false), timeout]); }
    finally { Engines.restoreClock(); }    // evaluate ha puntato l'orologio globale sulla repl muta
    if (evalError) throw evalError;
    if (!pattern || typeof pattern.queryArc !== 'function') throw new Error(_t('il codice non produce un pattern'));
    return pattern;
  }

  /* ── stato del pannello ────────────────────────────────────────────── */
  function say(text, kind) {
    msgEl.textContent = text || '';
    msgEl.className = 'score-msg' + (kind ? ' ' + kind : '');
    msgEl.hidden = !text;
  }
  function clearPaper() {
    drawn = null;
    paper.innerHTML = ''; warnEl.innerHTML = ''; legendEl.innerHTML = '';
    abcEl.textContent = ''; abcWrap.hidden = true;
  }

  let busy = false, again = false;
  async function refresh() {
    if (busy) { again = true; return; }
    busy = true;
    try { await draw(); }
    catch (e) { clearPaper(); say(_t('Lo spartito non si può disegnare: {err}', { err: e && e.message || e }), 'err'); }
    busy = false;
    if (again) { again = false; refresh(); }
  }

  /* ── da dove viene il codice ───────────────────────────────────────────
     Di solito dall'editor SUONO. Ma se l'ultimo ▶ sul suono è stato premuto
     in un riquadro dei TUTORIAL, lo spartito mostra quello: è la musica che
     lo studente sta ascoltando. Vale finché nel LAB non si esegue di nuovo
     (vedi l'ascoltatore di livelab:run in fondo). */
  const sourceEl = document.getElementById('score-source');
  let tutSource = null;              // { code, label } o null = editor SUONO

  function currentSource() {
    if (tutSource) return tutSource;
    return { code: Editors.getCode('strudel'), label: null };
  }

  async function draw() {
    const src = currentSource();
    sourceEl.textContent = src.label ? _t('spartito · {label}', { label: src.label }) : _t('spartito · suono');
    const rawCode = src.code;
    const { code, bpm } = splitTempo(rawCode);
    if (onlyComments(code)) {
      clearPaper();
      say(_t('Scrivi un pattern nell\'editor SUONO — per esempio note("c4 e4 g4 b4") — e premi ↻ AGGIORNA.'));
      return;
    }
    say(_t('leggo il pattern…'));

    let pattern;
    try { pattern = await silentPattern(code); }
    catch (e) {
      // Il codice non è valido: si tiene lo spartito di prima, con un avviso.
      const m = e && e.message === 'TIMEOUT'
        ? _t('Strudel non risponde: premi ▶ ESEGUI una volta (il browser attiva l\'audio solo dopo un clic) e riprova.')
        : _t('Il codice ha un errore, quindi lo spartito non è aggiornato: {err}', { err: e && e.message || e });
      say(m, 'err');
      return;
    }

    let haps;
    try { haps = pattern.queryArc(0, QUERY_BARS); }
    catch (e) { say(_t('Il pattern non si lascia leggere: {error}', { error: e && e.message || e }), 'err'); return; }
    if (haps.length > MAX_HAPS) {
      clearPaper();
      say(_t('Il pattern produce {n} eventi in {cycles} cicli: troppo fitto per uno spartito leggibile.', { n: haps.length, cycles: QUERY_BARS }), 'warn');
      return;
    }

    const bars = barsSel.value === 'auto' ? Math.min(4, Score.period(haps, QUERY_BARS)) : Number(barsSel.value);
    if (!(await loadAbcjs())) { say(_t('La libreria dello spartito (abcjs) non si è caricata.'), 'err'); return; }
    // Se sta già suonando proprio questo codice, si parte dalla pagina che si sente.
    const cycle = Engines.soundCode === rawCode ? Engines.soundCycle() : null;
    const page = cycle == null ? 0 : Math.floor(cycle / bars) * bars;
    const ctx = { pattern, rawCode, code, bars, bpm };
    if (!paint(ctx, page)) {
      clearPaper();
      say(ctx.empty || _t('Il pattern non produce eventi nei primi cicli: non c\'è niente da scrivere.'), 'warn');
    }
  }

  /** Scrive la pagina che parte dal ciclo `page`. Ritorna false se è vuota.
      Se le note sono le stesse della pagina già disegnata, non ridisegna
      (così un pattern che si ripete non sfarfalla a ogni giro). */
  function paint(ctx, page) {
    const { pattern, rawCode, code, bars, bpm } = ctx;
    let haps;
    try { haps = page ? pattern.early(page).queryArc(0, bars) : pattern.queryArc(0, bars); }
    catch (e) { say(_t('Il pattern non si lascia leggere: {error}', { error: e && e.message || e }), 'err'); return true; }
    if (haps.length > MAX_HAPS) {
      say(_t('Il pattern produce {n} eventi in {cycles} cicli: troppo fitto per uno spartito leggibile.', { n: haps.length, cycles: bars }), 'warn');
      return true;
    }
    // code: lo stesso valutato (senza setcpm), perché le posizioni degli eventi si riferiscono a quello
    const res = Score.toAbc(haps, { bars, bpm, barsPerLine: 2, code });
    if (res.empty) { ctx.empty = res.warnings[0]; return false; }

    if (drawn && drawn.pattern === pattern && drawn.abc === res.abc) {
      drawn.page = page; showLegend(res, bars, bpm, page);
      return true;
    }
    hideCursor();
    paper.innerHTML = '';
    const tunes = ABCJS.renderAbc(paper, res.abc, {
      responsive: 'resize', foregroundColor: 'currentColor', add_classes: true,
      paddingtop: 6, paddingbottom: 6, paddingleft: 0, paddingright: 0,
      staffwidth: 560,
    });
    const cursor = buildCursor(tunes && tunes[0], bars, bpm);
    drawn = { pattern, rawCode, bars, bpm, page, abc: res.abc, segs: [], line: null, glow: null, cur: null, ...cursor };
    const abcWarnings = (tunes && tunes[0] && tunes[0].warnings) || [];
    if (abcWarnings.length) console.warn('[spartito] abcjs:', abcWarnings);

    say('');
    abcEl.textContent = res.abc; abcWrap.hidden = false;
    warnEl.innerHTML = '';
    for (const w of res.warnings) {
      const p = document.createElement('p'); p.textContent = '⚠ ' + w; warnEl.appendChild(p);
    }
    showLegend(res, bars, bpm, page);
    return true;
  }

  function showLegend(res, bars, bpm, page) {
    legendEl.textContent = [
      bars === 1 ? _t('1 battuta = 1 ciclo') : _t('{n} battute = {n} cicli', { n: bars }),
      !page ? '' : bars === 1 ? _t('ciclo {n}', { n: page + 1 }) : _t('cicli {from}–{to}', { from: page + 1, to: page + bars }),
      `♩ = ${Math.round(bpm)}`,
      res.legend.length ? _t('percussioni: {list}', { list: res.legend.join(' · ') }) : '',
    ].filter(Boolean).join('   ·   ');
  }

  /* ── puntatore ─────────────────────────────────────────────────────── */
  // { pattern, rawCode, bars, bpm, page, abc, segs:[{c0,c1,x0,x1,top,h,els}], line, glow, cur }
  let drawn = null;

  /** Dalle tabelle di abcjs ai segmenti «da ciclo c0 a c1 → da x0 a x1». */
  function buildCursor(tune, bars, bpm) {
    const svg = paper.querySelector('svg');
    if (!tune || !svg || !ABCJS.TimingCallbacks) return null;
    let timings;
    try { timings = new ABCJS.TimingCallbacks(tune, { qpm: bpm }).noteTimings || []; }
    catch (_) { return null; }
    const barMs = 4 * 60000 / bpm;                       // una battuta = 4 movimenti
    const evs = timings.filter(e => e.type === 'event' && e.left != null);
    const segs = evs.map((e, i) => {
      const next = evs[i + 1];
      const sameLine = next && next.line === e.line;
      return {
        c0: e.milliseconds / barMs,
        c1: next ? next.milliseconds / barMs : bars,
        x0: e.left,
        x1: sameLine ? next.left : (e.endX != null ? e.endX : e.left + (e.width || 10) + 24),
        top: e.top, h: e.height,
        els: (e.elements || []).flat().filter(Boolean),
      };
    });
    if (!segs.length) return null;
    const NS = 'http://www.w3.org/2000/svg';
    const glow = document.createElementNS(NS, 'rect');
    glow.setAttribute('class', 'score-cursor-glow'); glow.setAttribute('width', 10);
    const line = document.createElementNS(NS, 'line');
    line.setAttribute('class', 'score-cursor');
    svg.appendChild(glow); svg.appendChild(line);
    glow.style.display = line.style.display = 'none';
    return { segs, line, glow };
  }

  function hideCursor() {
    if (!drawn || !drawn.line) return;
    drawn.line.style.display = drawn.glow.style.display = 'none';
    if (drawn.cur) drawn.cur.els.forEach(el => el.classList.remove('score-now'));
    drawn.cur = null;
  }

  function sync(text) { if (syncEl.textContent !== text) syncEl.textContent = text; }

  function tick() {
    if (drawer.hidden) { rafId = null; return; }
    rafId = requestAnimationFrame(tick);
    if (!drawn) { sync(''); return; }
    const playing = Engines.soundCode;
    const cycle = playing == null ? null : Engines.soundCycle();
    if (cycle == null) { hideCursor(); sync(_t('■ fermo — premi ▶ ESEGUI sul suono e il puntatore segue la musica')); return; }
    if (playing !== drawn.rawCode) {
      hideCursor();
      sync(_t('sta suonando un codice diverso da questo spartito — premi ▶ ESEGUI per riallinearli'));
      return;
    }
    const page = Math.floor(cycle / drawn.bars) * drawn.bars;
    if (page !== drawn.page && !busy) {                   // volta pagina (vedi punto 5)
      let blank = false;
      try { blank = !paint(drawn, page); } catch (e) { console.warn('[spartito] pagina:', e); }
      drawn.page = page;                                  // anche se è fallita: non si riprova a ogni frame
      drawn.blank = blank;
    }
    if (drawn.blank) {
      hideCursor();
      sync(_t('▶ cicli {from}–{to}: il pattern qui tace — lo spartito mostra la pagina di prima', { from: page + 1, to: page + drawn.bars }));
      return;
    }
    if (!drawn.line) { sync(''); return; }
    const pos = ((cycle % drawn.bars) + drawn.bars) % drawn.bars;
    let seg = drawn.segs[0];
    for (const s of drawn.segs) { if (s.c0 <= pos) seg = s; else break; }
    const f = seg.c1 > seg.c0 ? Math.min(1, Math.max(0, (pos - seg.c0) / (seg.c1 - seg.c0))) : 0;
    const x = seg.x0 + (seg.x1 - seg.x0) * f;
    const { line, glow } = drawn;
    line.setAttribute('x1', x); line.setAttribute('x2', x);
    line.setAttribute('y1', seg.top); line.setAttribute('y2', seg.top + seg.h);
    glow.setAttribute('x', x - 5); glow.setAttribute('y', seg.top); glow.setAttribute('height', seg.h);
    line.style.display = glow.style.display = '';
    if (drawn.cur !== seg) {                              // accende le note dell'istante
      if (drawn.cur) drawn.cur.els.forEach(el => el.classList.remove('score-now'));
      seg.els.forEach(el => el.classList.add('score-now'));
      drawn.cur = seg;
    }
    sync(_t('▶ battuta {n} di {tot}', { n: Math.floor(pos) + 1, tot: drawn.bars }));
  }
  let rafId = null;
  const startTick = () => { if (rafId == null) rafId = requestAnimationFrame(tick); };

  /* ── eventi ────────────────────────────────────────────────────────── */
  document.getElementById('score-refresh').addEventListener('click', refresh);
  barsSel.addEventListener('change', refresh);
  // ▶ ESEGUI sul suono: lo studente ha scelto di eseguire, lo spartito segue.
  // Il codice lo si ricorda anche a pannello chiuso: aprendolo dopo, deve
  // mostrare ciò che suona, anche se è partito da un tutorial.
  document.addEventListener('livelab:run', e => {
    const d = e.detail || {};
    if (d.engine !== 'strudel') return;
    tutSource = d.from === 'tutorial' ? { code: d.code, label: d.label || 'tutorial' } : null;
    if (!drawer.hidden) refresh();
  });

  return {
    open()  { drawer.hidden = false; refresh(); startTick(); },
    close() { drawer.hidden = true; hideCursor(); },
    get isOpen() { return !drawer.hidden; },
    refresh,
  };
})();
