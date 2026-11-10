/* ════════════════════════════════════════════════════════════════════════
   MAIN — viste, drawer, libreria esempi, scorciatoie, boot
   ════════════════════════════════════════════════════════════════════════ */

(() => {

  /* ── viste ─────────────────────────────────────────────────────────── */
  const views = {
    lab: document.getElementById('view-lab'),
    timeline: document.getElementById('view-timeline'),
    board: document.getElementById('view-board'),
    tutorial: document.getElementById('view-tutorial'),
  };
  let currentView = 'lab';

  function showView(name) {
    currentView = name;
    for (const [k, el] of Object.entries(views)) el.hidden = (k !== name);
    document.querySelectorAll('.view-btn').forEach(b =>
      b.classList.toggle('active-accent', b.dataset.view === name));
    if (name === 'timeline') Timeline.render();   // il canvas ha larghezza solo da visibile
    if (name === 'lab') Editors.refresh();
    if (name === 'board') Board.poll();           // aggiorna subito, non al prossimo giro
    if (name === 'tutorial') Tutorial.refresh();  // CodeMirror creati a vista nascosta
  }

  document.querySelectorAll('.view-btn').forEach(b =>
    b.addEventListener('click', () => showView(b.dataset.view)));

  /* ── drawer esempi ─────────────────────────────────────────────────── */
  const exDrawer = document.getElementById('examples-drawer');
  const exList = document.getElementById('examples-list');
  let exEngine = 'hydra';

  const escapeHtml = s => String(s).replace(/[&<>"']/g,
    ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));

  function exItem(sn, isUser) {
    const item = document.createElement('div');
    item.className = 'ex-item';
    item.dataset.help = `${sn.title}|${sn.desc} ` + (exEngine === 'hydra'
      ? _t('Clicca per caricarlo nell\'editor VISUALE.')
      : _t('Clicca per caricarlo nell\'editor SUONO.'));
    item.innerHTML =
      `<div class="ex-title"><span class="engine-dot ${exEngine === 'hydra' ? 'dot-hydra' : 'dot-strudel'}"></span>${escapeHtml(sn.title)}</div>` +
      `<div class="ex-desc">${escapeHtml(sn.desc)}</div>` +
      (sn.tags && sn.tags.length ? `<div class="ex-tags">${escapeHtml(sn.tags.join(' · '))}</div>` : '') +
      `<div class="ex-actions"></div>`;
    const actions = item.querySelector('.ex-actions');

    const loadBtn = document.createElement('button');
    loadBtn.className = 'btn btn-mini';
    loadBtn.textContent = _t('CARICA');
    loadBtn.dataset.help = _t('Carica|Copia l\'esempio nell\'editor, senza eseguirlo: leggilo, modificalo, poi premi ESEGUI.');
    loadBtn.addEventListener('click', e => {
      e.stopPropagation();
      Editors.insert(sn.engine, sn.code);
      showView('lab');
    });

    const tryBtn = document.createElement('button');
    tryBtn.className = 'btn btn-mini';
    tryBtn.textContent = _t('▶ PROVA');
    tryBtn.dataset.help = _t('Prova|Carica l\'esempio nell\'editor e lo esegue subito.');
    tryBtn.addEventListener('click', e => {
      e.stopPropagation();
      Editors.insert(sn.engine, sn.code, true);
      showView('lab');
    });

    const tlBtn = document.createElement('button');
    tlBtn.className = 'btn btn-mini';
    tlBtn.textContent = '+ TIMELINE';
    tlBtn.dataset.help = sn.engine === 'hydra'
      ? _t('Aggiungi alla timeline|Aggiunge questo esempio come clip in coda alla traccia VISUALE della timeline.')
      : _t('Aggiungi alla timeline|Aggiunge questo esempio come clip in coda alla traccia SUONO della timeline.');
    tlBtn.addEventListener('click', e => {
      e.stopPropagation();
      Timeline.addFromLab(sn.engine, sn.code, sn.title);
      pulse(document.getElementById('view-tl-btn'));
    });

    actions.append(loadBtn, tryBtn, tlBtn);

    if (isUser) {
      const delBtn = document.createElement('button');
      delBtn.className = 'btn btn-mini';
      delBtn.textContent = '🗑';
      delBtn.dataset.help = _t('Elimina|Cancella questo esempio salvato dalla libreria.');
      delBtn.addEventListener('click', e => {
        e.stopPropagation();
        if (!confirm(_t('Eliminare l\'esempio «{title}»?', { title: sn.title }))) return;
        UserSnippets.remove(sn.id);
        renderExamples();
      });
      actions.append(delBtn);
    }

    item.addEventListener('click', () => {
      Editors.insert(sn.engine, sn.code);
      showView('lab');
    });
    return item;
  }

  /* etichette: come nel pannello SUONI, accese insieme valgono tutte (E, non O).
     Una scelta per motore: passando da VISUALE a SUONO e ritorno resta com'era. */
  const exTagsEl = document.getElementById('examples-tags');
  const exSelected = { hydra: new Set(), strudel: new Set() };
  const hasTags = (sn, tags) => [...tags].every(t => (sn.tags || []).includes(t));

  function renderExTags() {
    const selected = exSelected[exEngine];
    const pool = SNIPPETS.filter(s => s.engine === exEngine);
    exTagsEl.classList.toggle('is-visual', exEngine === 'hydra');
    exTagsEl.innerHTML = '';
    for (const [tag, help] of SNIPPET_TAGS[exEngine]) {
      const on = selected.has(tag);
      // quanti esempi restano accendendo anche questa: 0 = bottone spento
      const n = pool.filter(s => hasTags(s, new Set([...selected, tag]))).length;
      if (!n && !pool.some(s => hasTags(s, [tag]))) continue;   // etichetta senza esempi
      const b = document.createElement('button');
      b.className = 'lib-tag' + (on ? ' is-on' : '');
      b.disabled = !on && !n;
      b.setAttribute('aria-pressed', on);
      b.dataset.help = `${tag}|${help} ` + _t('Clicca per mostrare solo questi esempi; accendendo più etichette restano gli esempi che le hanno tutte.');
      b.innerHTML = `${escapeHtml(tag)} <span class="lib-tag-n">${n}</span>`;
      b.addEventListener('click', () => {
        if (on) selected.delete(tag); else selected.add(tag);
        renderExamples();
      });
      exTagsEl.appendChild(b);
    }
    if (selected.size) {
      const all = document.createElement('button');
      all.className = 'lib-tag lib-tag-reset';
      all.textContent = _t('✕ tutte');
      all.dataset.help = _t('Tutte|Spegne le etichette e torna a mostrare tutti gli esempi.');
      all.addEventListener('click', () => { selected.clear(); renderExamples(); });
      exTagsEl.appendChild(all);
    }
  }

  function renderExamples() {
    document.querySelectorAll('.engine-tab').forEach(t => {
      const on = t.dataset.engine === exEngine;
      t.classList.toggle('active-visual', on && exEngine === 'hydra');
      t.classList.toggle('active', on && exEngine === 'strudel');
    });
    renderExTags();
    exList.innerHTML = '';
    const selected = exSelected[exEngine];

    // gli esempi salvati non hanno etichette: con un filtro acceso non c'entrano
    const mine = selected.size ? [] : UserSnippets.list(exEngine);
    if (mine.length) {
      const h = document.createElement('div');
      h.className = 'ex-cat';
      h.textContent = _t('I tuoi esempi');
      exList.appendChild(h);
      for (const sn of mine) exList.appendChild(exItem(sn, true));
    }

    for (const cat of SNIPPET_CATS[exEngine]) {
      const items = SNIPPETS.filter(s => s.engine === exEngine && s.cat === cat && hasTags(s, selected));
      if (!items.length) continue;
      const h = document.createElement('div');
      h.className = 'ex-cat';
      h.textContent = cat;
      exList.appendChild(h);
      for (const sn of items) exList.appendChild(exItem(sn, false));
    }
  }

  document.querySelectorAll('.engine-tab').forEach(t =>
    t.addEventListener('click', () => { exEngine = t.dataset.engine; renderExamples(); }));

  document.getElementById('examples-btn').addEventListener('click', () => {
    const opening = exDrawer.hidden;
    exDrawer.hidden = !opening;
    if (opening) {
      document.getElementById('ai-drawer').hidden = true;
      ScoreView.close();
      Library.close();
      renderExamples();
    }
    syncDrawerBtns();
  });
  document.getElementById('examples-close').addEventListener('click', () => {
    exDrawer.hidden = true; syncDrawerBtns();
  });

  /* ── drawer assistente ─────────────────────────────────────────────── */
  document.getElementById('ai-btn').addEventListener('click', () => {
    if (Assistant.isOpen) Assistant.close();
    else { exDrawer.hidden = true; ScoreView.close(); Library.close(); Assistant.open(); }
    syncDrawerBtns();
  });
  document.getElementById('ai-close').addEventListener('click', () => {
    Assistant.close(); syncDrawerBtns();
  });

  /* ── drawer spartito ───────────────────────────────────────────────── */
  document.getElementById('score-btn').addEventListener('click', () => {
    if (ScoreView.isOpen) ScoreView.close();
    else { exDrawer.hidden = true; Assistant.close(); Library.close(); ScoreView.open(); }
    syncDrawerBtns();
  });
  document.getElementById('score-close').addEventListener('click', () => {
    ScoreView.close(); syncDrawerBtns();
  });

  /* ── drawer suoni ──────────────────────────────────────────────────── */
  document.getElementById('library-btn').addEventListener('click', () => {
    if (Library.isOpen) Library.close();
    else { exDrawer.hidden = true; Assistant.close(); ScoreView.close(); Library.open(); }
    syncDrawerBtns();
  });
  document.getElementById('library-close').addEventListener('click', () => {
    Library.close(); syncDrawerBtns();
  });

  function syncDrawerBtns() {
    document.getElementById('score-btn').classList.toggle('active-accent', ScoreView.isOpen);
    document.getElementById('library-btn').classList.toggle('active-accent', Library.isOpen);
    document.getElementById('examples-btn').classList.toggle('active-accent', !exDrawer.hidden);
    document.getElementById('ai-btn').classList.toggle('active-accent', Assistant.isOpen);
  }

  /* ── microfono per le visuali reattive ─────────────────────────────── */
  const micBtn = document.getElementById('mic-btn');
  micBtn.addEventListener('click', async () => {
    const on = Engines.setMic(!Engines.micOn);
    micBtn.classList.toggle('active-ok', on);
    if (on) {
      AppConsole.log('visuale', 'info',
        _t('Microfono acceso: il browser ti chiederà il permesso alla prossima esecuzione.'),
        _t('Nel codice Hydra usa a.fft[0] (bassi) … a.fft[3] (acuti). Esempio: osc(20).rotate(() => a.fft[0] * 3).out()'));
    } else {
      AppConsole.log('visuale', 'info', _t('Microfono spento.'));
    }
    /* setMic ricrea l'istanza Hydra: senza rilanciare, lo schermo resta al
       fotogramma precedente e sembra che il comando non abbia fatto nulla. */
    const code = Editors.getCode('hydra');
    if (code.trim()) await Editors.run('hydra');
  });

  /* ── LAB → esempi (salva negli esempi personali) ───────────────────── */
  function saveAsExample(engine) {
    const code = Editors.getCode(engine);
    if (!code.trim()) return;
    const line = code.split('\n')[0].replace(/^\/\/\s*/, '').trim();
    const suggested = line.length > 26 ? line.slice(0, 26) + '…' : line;
    const title = prompt(_t('Nome dell\'esempio:'), suggested);
    if (title === null) return;   // annullato
    UserSnippets.add(engine, code, title.trim() || _t('senza titolo'));
    Editors.setStatus(engine, _t('★ salvato negli esempi'), 'ok');
    if (!exDrawer.hidden) renderExamples();
    const exBtn = document.getElementById('examples-btn');
    exBtn.classList.add('active-accent');
    setTimeout(syncDrawerBtns, 700);
  }
  document.getElementById('save-hydra').addEventListener('click', () => saveAsExample('hydra'));
  document.getElementById('save-strudel').addEventListener('click', () => saveAsExample('strudel'));

  /* ── LAB → timeline ────────────────────────────────────────────────── */
  function pulse(el) {
    el.classList.add('active-accent');
    setTimeout(() => {
      if (currentView !== 'timeline') el.classList.remove('active-accent');
    }, 700);
  }
  document.getElementById('tl-add-hydra').addEventListener('click', () => {
    Timeline.addFromLab('hydra', Editors.getCode('hydra'));
    pulse(document.getElementById('view-tl-btn'));
  });
  document.getElementById('tl-add-strudel').addEventListener('click', () => {
    Timeline.addFromLab('strudel', Editors.getCode('strudel'));
    pulse(document.getElementById('view-tl-btn'));
  });

  /* ── scorciatoie globali (tabella, alla Brera) ─────────────────────── */
  const inField = e =>
    !!e.target.closest('input, textarea, select, .CodeMirror');
  const modalOpen = () =>
    !document.getElementById('clip-modal-back').hidden;
  const onTimeline = e =>
    currentView === 'timeline' && !inField(e) && !modalOpen();
  const cmd = (e, key) =>
    (e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === key;
  // del testo selezionato (console, aiuto…) si copia come sempre, non la clip
  const noTextSelected = () => window.getSelection().isCollapsed;

  const SHORTCUTS = [
    { match: e => e.key === ' ' && onTimeline(e),
      run: e => { e.preventDefault(); Timeline.play(); } },
    { match: e => cmd(e, 'z') && onTimeline(e),
      run: e => { e.preventDefault(); Timeline.undo(); } },
    { match: e => (e.key === 'Delete' || e.key === 'Backspace')
        && onTimeline(e) && Timeline.hasSelection,
      run: e => { e.preventDefault(); Timeline.removeSelected(); } },
    { match: e => cmd(e, 'c') && onTimeline(e) && Timeline.hasSelection && noTextSelected(),
      run: e => { e.preventDefault(); Timeline.copy(); } },
    { match: e => cmd(e, 'x') && onTimeline(e) && Timeline.hasSelection && noTextSelected(),
      run: e => { e.preventDefault(); Timeline.cut(); } },
    { match: e => cmd(e, 'v') && onTimeline(e) && Timeline.canPaste,
      run: e => { e.preventDefault(); Timeline.paste(); } },
    { match: e => e.key === 'Escape',
      run: () => {
        if (!document.getElementById('clip-modal-back').hidden) return; // gestita dalla modale
        exDrawer.hidden = true;
        Assistant.close();
        ScoreView.close();
        Library.close();
        syncDrawerBtns();
      } },
  ];

  document.addEventListener('keydown', e => {
    for (const s of SHORTCUTS) {
      if (s.match(e)) { s.run(e); return; }
    }
  });

  /* ── boot ──────────────────────────────────────────────────────────── */
  if (location.protocol === 'file:') {
    alert(_t('Open Live Lab va servito da un piccolo server locale, non aperto come file.\nAvvialo con:  ./start.sh   (poi apri http://localhost:8765)'));
  } else if (!LIVELAB.config.isLocal && location.protocol !== 'https:') {
    /* Gli AudioWorklet di Strudel esistono solo in un secure context: senza
       HTTPS il suono non parte affatto, e senza avviso sembra un guasto. */
    AppConsole.log('sistema', 'err',
      _t('La pagina non è servita in HTTPS: il suono non può funzionare.'),
      _t('Apri lo stesso indirizzo con https:// all\'inizio.'));
  }

  const sourceLink = document.getElementById('source-link');
  sourceLink.href = LIVELAB.config.sourceUrl;
  // sta nella barra della console, che al clic si apre e si chiude: non qui
  sourceLink.addEventListener('click', e => e.stopPropagation());

  /* ── lavagna ───────────────────────────────────────────────────────── */
  /* La password va chiesta PRIMA di Board.init: init avvia subito la prima
     interrogazione, e senza password quella tornerebbe senza gli invii. */
  if (Board.isTeacher) {
    document.querySelectorAll('.board-only').forEach(b => { b.hidden = false; });
    /* Sta in sessionStorage: si chiede una volta per scheda del browser,
       non a ogni azione, e non resta sul computer dopo. */
    if (!Board.hasPass()) {
      const p = prompt(_t('Password docente per la lavagna:'));
      if (p) Board.setPass(p);
    }
  }
  Board.init(showView);

  async function appendToBoard(engine) {
    const code = Editors.getCode(engine);
    if (!code.trim()) return;
    const title = prompt(_t('Titolo della scheda (lo vedono gli studenti):'),
      engine === 'strudel' ? _t('esempio suono') : _t('esempio visuale'));
    if (title === null) return;
    try {
      await Board.postCard(engine, code, title);
      AppConsole.log('lavagna', 'info', _t('«{title}» è ora sulla lavagna di tutta la classe', { title }));
      showView('board');
    } catch (e) {
      AppConsole.log('lavagna', 'err', _t('non sono riuscito ad appendere: {error}', { error: e.message }),
        /password/i.test(e.message)
          ? _t('Ricarica la pagina per reinserire la password docente.')
          : _t('Controlla che api/board.php sia stato caricato sul server.'));
    }
  }
  document.getElementById('board-add-hydra')
    .addEventListener('click', () => appendToBoard('hydra'));
  document.getElementById('board-add-strudel')
    .addEventListener('click', () => appendToBoard('strudel'));

  async function sendToTeacher(engine) {
    const code = Editors.getCode(engine);
    if (!code.trim()) {
      AppConsole.log('lavagna', 'warn', _t('non c\'è niente da inviare: l\'editor è vuoto'));
      return;
    }
    if (!Board.myName()) {
      const n = prompt(_t('Come ti chiami? (serve solo perché si sappia di chi è)'));
      if (!n) return;
      Board.setMyName(n);
      document.getElementById('board-name').value = Board.myName();
    }
    try {
      await Board.send(engine, code, '');
      AppConsole.log('lavagna', 'info', _t('inviato ✓ — puoi rimandarlo quando vuoi, sostituisce il precedente'));
    } catch (e) {
      AppConsole.log('lavagna', 'err', _t('invio non riuscito: {error}', { error: e.message }));
    }
  }
  document.getElementById('board-send-hydra')
    .addEventListener('click', () => sendToTeacher('hydra'));
  document.getElementById('board-send-strudel')
    .addEventListener('click', () => sendToTeacher('strudel'));

  Tutorial.init(showView);

  /* Cambiare lingua ricarica la pagina (js/i18n.js): si riapre la vista in
     cui si era, invece di ripartire dal LAB. Vale per quella volta sola. */
  const K_VIEW = 'livelab-view-after-lang';
  document.addEventListener('livelab:lang', () => {
    try { sessionStorage.setItem(K_VIEW, currentView); } catch (_) {}
  });
  let startView = 'lab';
  try {
    const v = sessionStorage.getItem(K_VIEW);
    sessionStorage.removeItem(K_VIEW);
    if (v && views[v]) startView = v;
  } catch (_) {}

  showView(startView);
  Assistant.refreshStatus();   // scalda lista modelli e pallino di stato
})();
