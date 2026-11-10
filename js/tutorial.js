/* ════════════════════════════════════════════════════════════════════════
   TUTORIAL — la vista dei percorsi passo passo

   A sinistra l'indice dei tutorial (dati in js/tutorials.js), a destra il
   tutorial aperto: testo, e per ogni passo un riquadro di codice con un
   CodeMirror vero, che si modifica e si esegue sul posto. Da ogni riquadro
   il codice si porta nell'editor del LAB (→ EDITOR) o nella timeline.

   Un passo è «fatto» (✓) quando il suo codice è stato eseguito senza
   errori almeno una volta. Il progresso e l'ultimo tutorial aperto restano
   in localStorage; le modifiche al codice dei riquadri restano solo per
   la sessione (↺ ORIGINALE le annulla comunque).

   Il codice dei tutorial viene dal repository, non da fuori: eseguirlo
   quando lo studente preme ▶ è sicuro quanto eseguire un esempio.
   ════════════════════════════════════════════════════════════════════════ */

const Tutorial = (() => {

  const K_STATE = 'livelab-tutorial-v1';

  const indexEl = document.getElementById('tut-index');
  const mainEl  = document.getElementById('tut-main');

  const ENGINE_LABEL = { strudel: _t('SUONO'), hydra: _t('VISUALE') };
  const SOURCE = { strudel: 'suono', hydra: 'visuale' };

  let showView = () => {};
  let current = null;       // il tutorial aperto
  let boxes = [];           // { engine, step, index, cm, statusEl, el }
  const edits = {};         // "id:passo" → codice modificato (solo sessione)

  /* ── stato persistente ─────────────────────────────────────────────── */

  function loadState() {
    try {
      const s = JSON.parse(localStorage.getItem(K_STATE) || '{}');
      return { current: s.current || null, done: s.done || {} };
    } catch (_) { return { current: null, done: {} }; }
  }
  const state = loadState();

  function saveState() {
    try { localStorage.setItem(K_STATE, JSON.stringify(state)); } catch (_) {}
  }

  const doneSet = id => new Set(state.done[id] || []);

  function markDone(tut, index) {
    const s = doneSet(tut.id);
    if (s.has(index)) return;
    s.add(index);
    state.done[tut.id] = [...s].sort((a, b) => a - b);
    saveState();
    renderIndex();
    renderProgress();
  }

  /* Solo i passi con codice si possono «fare»: quelli di solo testo non
     contano, altrimenti il 100% sarebbe irraggiungibile. */
  const doable = tut => tut.steps.filter(s => s.code).length;
  const doneCount = tut => {
    const s = doneSet(tut.id);
    return tut.steps.filter((st, i) => st.code && s.has(i)).length;
  };

  /* ── testo: escape, poi `codice` e **grassetto** ───────────────────── */

  const escapeHtml = s => String(s).replace(/[&<>"']/g,
    ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));

  function inline(text) {
    return escapeHtml(text)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  }

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function btn(label, help, onClick) {
    const b = el('button', 'btn btn-mini');
    b.textContent = label;
    b.dataset.help = help;
    b.addEventListener('click', onClick);
    return b;
  }

  /* ── indice ────────────────────────────────────────────────────────── */

  function renderIndex() {
    indexEl.innerHTML = '';
    indexEl.append(el('div', 'tut-index-h', escapeHtml(_t('tutorial'))));
    for (const g of TUTORIAL_GROUPS) {
      const list = TUTORIALS.filter(t => t.engine === g.engine);
      if (!list.length) continue;
      indexEl.append(el('div', 'ex-cat', escapeHtml(g.label)));
      for (const t of list) {
        const item = el('button', 'tut-item' + (current && current.id === t.id ? ' is-on' : ''));
        const n = doable(t), d = doneCount(t);
        item.innerHTML =
          `<span class="engine-dot ${dotClass(t.engine)}"></span>` +
          `<span class="tut-item-title">${escapeHtml(t.title)}</span>` +
          `<span class="tut-item-count">${d === n && n ? '✓' : `${d}/${n}`}</span>`;
        item.dataset.help = `${t.title}|${t.desc} ` + _t('{n} passi.', { n: t.steps.length });
        item.addEventListener('click', () => open(t.id));
        indexEl.append(item);
      }
    }
  }

  const dotClass = engine =>
    engine === 'hydra' ? 'dot-hydra' : engine === 'strudel' ? 'dot-strudel' : 'dot-mix';

  /* ── riquadro di codice ────────────────────────────────────────────── */

  function codeBox(tut, step, index) {
    const engine = step.engine || tut.engine;
    const key = tut.id + ':' + index;

    const box = el('div', 'tut-code ' + (engine === 'hydra' ? 'is-visual' : 'is-sound'));
    box.dataset.engine = engine;

    const head = el('div', 'tut-code-head');
    head.append(
      el('span', 'engine-dot ' + dotClass(engine)),
      el('span', 'tut-code-label', ENGINE_LABEL[engine]),
      el('span', 'editor-spacer'));

    const body = el('div', 'tut-code-body');
    body.dataset.help = _t('Codice del passo|Puoi modificarlo quanto vuoi e rieseguirlo con ▶ (o Cmd+Invio). ↺ ORIGINALE lo riporta com\'era.');
    const status = el('div', 'editor-status');
    status.textContent = _t('modificalo e premi ▶ ESEGUI');

    const b = { engine, step, index, key, tut, statusEl: status, el: box, cm: null };

    head.append(
      btn(_t('▶ ESEGUI'),
        engine === 'hydra'
          ? _t('Esegui|Fa partire questo codice: la visuale compare sullo sfondo. Scorciatoia: Cmd+Invio dentro il riquadro.')
          : _t('Esegui|Fa partire questo codice. Scorciatoia: Cmd+Invio dentro il riquadro.'),
        () => run(b)),
      btn('■ STOP',
        engine === 'hydra' ? _t('Ferma|Ferma la visuale e riporta lo sfondo al nero.')
                           : _t('Ferma|Ferma la musica.'),
        () => stop(b)),
      btn(_t('↺ ORIGINALE'),
        _t('Originale|Rimette il codice com\'era all\'inizio di questo passo, cancellando le tue modifiche.'),
        () => { b.cm.setValue(step.code); delete edits[key]; setStatus(b, _t('codice originale ripristinato')); }),
      btn('→ EDITOR',
        _t('Porta nell\'editor|Copia questo codice nell\'editor {engine} del LAB, al posto di quello che c\'è, e ti porta lì. Non parte da solo: lo esegui tu.', { engine: ENGINE_LABEL[engine] }),
        () => toEditor(b)),
      btn('+ TIMELINE',
        _t('Aggiungi alla timeline|Accoda questo codice come clip alla traccia {engine} della timeline.', { engine: ENGINE_LABEL[engine] }),
        () => toTimeline(b)));

    box.append(head, body, status);

    b.cm = CodeMirror(body, {
      value: edits[key] !== undefined ? edits[key] : step.code,
      mode: 'javascript',
      lineNumbers: true,
      lineWrapping: true,
      autoCloseBrackets: true,
      matchBrackets: true,
      viewportMargin: Infinity,     // alto quanto il codice: niente scroll interno
      extraKeys: {
        'Cmd-Enter':  () => run(b),
        'Ctrl-Enter': () => run(b),
        'Cmd-.':      () => stop(b),
        'Ctrl-.':     () => stop(b),
        'Cmd-/':      'toggleComment',
        'Ctrl-/':     'toggleComment',
      },
    });
    b.cm.on('change', () => {
      const v = b.cm.getValue();
      if (v === step.code) delete edits[key]; else edits[key] = v;
    });
    boxes.push(b);
    return box;
  }

  function setStatus(b, text, cls) {
    b.statusEl.textContent = text;
    b.statusEl.className = 'editor-status' + (cls ? ' ' + cls : '');
  }

  /* Un motore suona una cosa sola alla volta: quando parte un riquadro, gli
     altri dello stesso motore tornano «fermi», o sembrerebbero suonare
     ancora. */
  function clearPlaying(engine, except) {
    for (const o of boxes) {
      if (o !== except && o.engine === engine && o.el.classList.contains('is-playing')) {
        o.el.classList.remove('is-playing');
        setStatus(o, _t('■ fermo'));
      }
    }
  }

  async function run(b) {
    const code = b.cm.getValue();
    if (!code.trim()) return;
    /* a.fft esiste solo col microfono acceso: senza, il codice darebbe un
       errore a ogni fotogramma. Lo si accende qui, avvisando, invece di
       lasciar scoprire allo studente che doveva premere 🎤 MIC. */
    if (b.step.mic && b.engine === 'hydra' && !Engines.micOn) {
      Engines.setMic(true);
      document.getElementById('mic-btn').classList.add('active-ok');
      AppConsole.log('visuale', 'info',
        _t('Microfono acceso per questo passo: il browser ti chiederà il permesso.'),
        _t('Il suono resta su questo computer. Lo spegni con 🎤 MIC in alto.'));
    }
    /* Ogni riquadro visuale parte da schermo pulito. Hydra, rieseguendo,
       tiene tutto: le uscite o1…o3 di un passo precedente, la webcam in s0,
       lo schermo diviso di render(). Un passo si deve poter fare da solo,
       nell'ordine che si vuole: hush() azzera tutto (e torna a render(o0)). */
    if (b.engine === 'hydra') {
      Engines.stop('hydra');
      clearPlaying('hydra', b);
    }
    setStatus(b, _t('eseguo…'));
    const res = await Engines.run(b.engine, code);
    if (res.ok) {
      clearPlaying(b.engine, b);
      b.el.classList.add('is-playing');
      setStatus(b, b.engine === 'hydra' ? _t('● in esecuzione') : _t('● in riproduzione'), 'ok');
      /* anche il LAB deve sapere che il suo motore ora esegue altro */
      Editors.setStatus(b.engine, _t('● esegue il codice del tutorial'), 'ok');
      AppConsole.log(SOURCE[b.engine], 'ok',
        _t('▶ tutorial «{title}», passo {n}', { title: b.tut.title, n: b.index + 1 }));
      /* stesso evento dell'editor: lo spartito disegna ciò che suona qui */
      document.dispatchEvent(new CustomEvent('livelab:run', { detail: {
        engine: b.engine, code, from: 'tutorial',
        label: _t('{title} · passo {n}', { title: b.tut.title.toLowerCase(), n: b.index + 1 }),
      } }));
      markDone(b.tut, b.index);
      stepEl(b.index)?.classList.add('is-done');
    } else {
      b.el.classList.remove('is-playing');
      setStatus(b, '✕ ' + res.error, 'err');
      AppConsole.log(SOURCE[b.engine], 'err', res.error, undefined,
        { engine: b.engine, code });
    }
  }

  function stop(b) {
    Engines.stop(b.engine);
    clearPlaying(b.engine);
    b.el.classList.remove('is-playing');
    setStatus(b, _t('■ fermo'));
    Editors.setStatus(b.engine, _t('■ fermo'));
  }

  function toEditor(b) {
    Editors.insert(b.engine, b.cm.getValue(), false);   // si carica, non si esegue
    showView('lab');
    AppConsole.log(SOURCE[b.engine], 'info',
      _t('codice del tutorial nell\'editor {engine} — premi ▶ ESEGUI per sentirlo', { engine: ENGINE_LABEL[b.engine] }),
      _t('Per tornare al tutorial premi TUTORIAL in alto: lo ritrovi al passo dove eri.'));
  }

  function toTimeline(b) {
    Timeline.addFromLab(b.engine, b.cm.getValue(),
      `${b.tut.title} ${b.index + 1}`);
    setStatus(b, _t('✓ aggiunto alla timeline'), 'ok');
    const tlBtn = document.getElementById('view-tl-btn');
    tlBtn.classList.add('active-accent');
    setTimeout(() => tlBtn.classList.remove('active-accent'), 700);
  }

  /* ── tutorial aperto ───────────────────────────────────────────────── */

  const stepEl = i => mainEl.querySelector(`.tut-step[data-index="${i}"]`);

  function renderProgress() {
    const bar = mainEl.querySelector('.tut-progress');
    if (!bar || !current) return;
    const n = doable(current), d = doneCount(current);
    bar.querySelector('.tut-progress-fill').style.width = (n ? (100 * d / n) : 0) + '%';
    bar.querySelector('.tut-progress-txt').textContent =
      d === n && n ? _t('completato ✓') : _t('{done} di {total} passi provati', { done: d, total: n });
  }

  function render() {
    boxes = [];
    mainEl.innerHTML = '';
    const tut = current;
    if (!tut) {
      mainEl.append(el('p', 'tut-empty', escapeHtml(_t('Scegli un tutorial dall\'elenco.'))));
      return;
    }

    const head = el('header', 'tut-head');
    const group = TUTORIAL_GROUPS.find(g => g.engine === tut.engine);
    head.append(
      el('div', 'label-txt', escapeHtml(_t('{group} · tutorial', { group: group ? group.label : '' }))),
      el('h1', 'tut-title', escapeHtml(tut.title)),
      el('p', 'tut-desc', inline(tut.desc)));
    const prog = el('div', 'tut-progress',
      '<div class="tut-progress-bar"><div class="tut-progress-fill"></div></div>' +
      '<span class="tut-progress-txt"></span>');
    prog.dataset.help = _t('Progresso|Un passo si segna ✓ quando esegui il suo codice senza errori. Resta salvato su questo computer.');
    const reset = btn(_t('AZZERA'), _t('Azzera|Toglie tutti i ✓ di questo tutorial, per rifarlo da capo.'), () => {
      if (!confirm(_t('Azzerare il progresso di «{title}»?', { title: tut.title }))) return;
      delete state.done[tut.id];
      saveState();
      mainEl.querySelectorAll('.tut-step.is-done').forEach(s => s.classList.remove('is-done'));
      renderIndex();
      renderProgress();
    });
    prog.append(reset);
    head.append(prog);
    mainEl.append(head);

    const done = doneSet(tut.id);
    tut.steps.forEach((step, i) => {
      const sec = el('section', 'tut-step' + (step.code && done.has(i) ? ' is-done' : ''));
      sec.dataset.index = i;
      const h = el('h2', 'tut-step-h');
      h.append(el('span', 'tut-step-n', String(i + 1)), el('span', '', escapeHtml(step.title)));
      sec.append(h);
      for (const p of step.text || []) sec.append(el('p', 'tut-p', inline(p)));
      if (step.code) sec.append(codeBox(tut, step, i));
      if (step.try) {
        const t = el('p', 'tut-try', `<span class="tut-try-h">${escapeHtml(_t('prova tu'))}</span>` + inline(step.try));
        sec.append(t);
      }
      mainEl.append(sec);
    });

    /* in fondo: il tutorial successivo, così il percorso non si interrompe */
    const idx = TUTORIALS.indexOf(tut);
    const next = TUTORIALS[idx + 1];
    const foot = el('footer', 'tut-foot');
    if (next) {
      foot.append(el('span', 'label-txt', escapeHtml(_t('prossimo'))),
        btn(`${next.title} →`, _t('Prossimo tutorial') + `|${next.desc}`, () => open(next.id)));
    } else {
      foot.append(el('span', 'label-txt', escapeHtml(_t('fine del percorso: altri tutorial in arrivo'))));
    }
    mainEl.append(foot);

    /* Ogni CodeMirror è nato dentro un riquadro non ancora in pagina, quindi
       ha misurato zero e non ha disegnato nessuna riga: restava vuoto finché
       un clic non lo costringeva a rimisurarsi. Ora che è tutto in pagina, si
       ridisegnano. (A vista nascosta non basta: ci pensa showView.) */
    boxes.forEach(b => b.cm.refresh());

    renderProgress();
    mainEl.scrollTop = 0;
  }

  function open(id) {
    const t = TUTORIALS.find(x => x.id === id) || TUTORIALS[0];
    if (!t) return;
    current = t;
    state.current = t.id;
    saveState();
    renderIndex();
    render();
  }

  /* ── avvio ─────────────────────────────────────────────────────────── */

  function init(showViewFn) {
    showView = showViewFn;
    open(state.current);
  }

  return {
    init,
    open,
    /** CodeMirror creati a vista nascosta hanno misure sbagliate: la vista,
        quando compare, li fa ridisegnare. */
    refresh() { boxes.forEach(b => b.cm.refresh()); },
  };
})();
