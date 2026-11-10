/* ════════════════════════════════════════════════════════════════════════
   EDITOR — due CodeMirror (VISUALE / SUONO) + esecuzione e stato
   ════════════════════════════════════════════════════════════════════════ */

const Editors = (() => {

  const DEFAULT_CODE = {
    hydra: _t('// VISUALE · Hydra — premi ▶ ESEGUI (o Cmd+Invio)') + `
osc(10, 0.1, 1.4)
  .kaleid(4)
  .rotate(() => time * 0.1)
  .out()`,
    strudel: _t('// SUONO · Strudel — premi ▶ ESEGUI (o Cmd+Invio)') + `
sound("bd hh sd hh")`,
  };

  const cms = {};       // engine -> CodeMirror
  const statusEls = {
    hydra:   document.getElementById('status-hydra'),
    strudel: document.getElementById('status-strudel'),
  };
  let lastFocused = 'hydra';   // per "spiega il mio codice"

  function makeCM(hostId, engine, initialCode) {
    const cm = CodeMirror(document.getElementById(hostId), {
      value: initialCode,
      mode: 'javascript',
      lineNumbers: true,
      lineWrapping: true,
      autoCloseBrackets: true,
      matchBrackets: true,
      viewportMargin: Infinity,
      extraKeys: {
        'Cmd-Enter':  () => runEditor(engine),
        'Ctrl-Enter': () => runEditor(engine),
        'Cmd-.':      () => stopEditor(engine),
        'Ctrl-.':     () => stopEditor(engine),
        'Cmd-/':      'toggleComment',
        'Ctrl-/':     'toggleComment',
      },
    });
    cm.on('focus', () => { lastFocused = engine; });
    cm.on('change', () => saveSoon());
    return cm;
  }

  function setStatus(engine, text, cls) {
    const el = statusEls[engine];
    if (!el) return;
    el.textContent = text;
    el.className = 'editor-status' + (cls ? ' ' + cls : '');
  }

  function flash(engine) {
    // breve lampo sull'editor per confermare l'esecuzione
    const card = document.getElementById('card-' + engine);
    if (!card) return;
    card.style.transition = 'none';
    card.style.boxShadow = engine === 'hydra' ? 'var(--glow-visual)' : 'var(--glow-sound)';
    requestAnimationFrame(() => {
      card.style.transition = 'box-shadow 0.5s var(--ease)';
      card.style.boxShadow = 'none';
    });
  }

  async function runEditor(engine) {
    const code = cms[engine].getValue();
    const source = engine === 'hydra' ? 'visuale' : 'suono';
    setStatus(engine, _t('eseguo…'));
    const res = await Engines.run(engine, code);
    if (res.ok) {
      setStatus(engine, engine === 'hydra' ? _t('● in esecuzione') : _t('● in riproduzione'), 'ok');
      AppConsole.log(source, 'ok', _t('▶ codice eseguito'));
      flash(engine);
      // chi vuole seguire ciò che suona (lo spartito) ascolta questo evento
      document.dispatchEvent(new CustomEvent('livelab:run', { detail: { engine, code } }));
    } else {
      setStatus(engine, '✕ ' + res.error, 'err');
      AppConsole.log(source, 'err', res.error, undefined, { engine, code });
    }
    return res;
  }

  function stopEditor(engine) {
    Engines.stop(engine);
    setStatus(engine, _t('■ fermo'));
  }

  /* autosalvataggio del contenuto degli editor */
  let saveTimer = null;
  function saveNow() {
    clearTimeout(saveTimer);
    try {
      localStorage.setItem('livelab-editors-v1', JSON.stringify({
        hydra: cms.hydra.getValue(),
        strudel: cms.strudel.getValue(),
      }));
    } catch (_) {}
  }
  function saveSoon() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveNow, 400);
  }
  /* cambiando lingua la pagina si ricarica: l'ultima riga scritta non deve
     perdersi nei 400 ms dell'attesa */
  document.addEventListener('livelab:lang', saveNow);

  function loadSaved() {
    try {
      const raw = localStorage.getItem('livelab-editors-v1');
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (_) { return null; }
  }

  /* ── init ──────────────────────────────────────────────────────────── */
  const saved = loadSaved();
  cms.hydra   = makeCM('cm-hydra', 'hydra',   (saved && saved.hydra)   || DEFAULT_CODE.hydra);
  cms.strudel = makeCM('cm-strudel', 'strudel', (saved && saved.strudel) || DEFAULT_CODE.strudel);

  document.getElementById('run-hydra').addEventListener('click', () => runEditor('hydra'));
  document.getElementById('stop-hydra').addEventListener('click', () => stopEditor('hydra'));
  document.getElementById('run-strudel').addEventListener('click', () => runEditor('strudel'));
  document.getElementById('stop-strudel').addEventListener('click', () => stopEditor('strudel'));

  return {
    /** Inserisce codice nell'editor del motore e (opzionale) lo esegue. */
    insert(engine, code, andRun = false) {
      cms[engine].setValue(code);
      saveSoon();
      if (andRun) runEditor(engine);
    },
    getCode: engine => cms[engine].getValue(),
    get lastFocused() { return lastFocused; },
    run: runEditor,
    stop: stopEditor,
    setStatus,
    refresh() { Object.values(cms).forEach(cm => cm.refresh()); },
  };
})();
