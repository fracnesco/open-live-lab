/* ════════════════════════════════════════════════════════════════════════
   HELP — modalità aiuto: tooltip su ogni elemento con data-help
   Formato attributo:  data-help="Titolo|Spiegazione sintetica."
   In più: selezionando una parola nel codice, il tooltip spiega la funzione
   (glossario in funcdocs.js). Il tooltip resta fisso finché non clicchi altrove.
   ════════════════════════════════════════════════════════════════════════ */

const Help = (() => {
  let active = false;
  let hovered = null;
  let pinned = false;   // tooltip fissato su una selezione di codice

  const btn    = document.getElementById('help-btn');
  const banner = document.getElementById('help-banner');
  const tip    = document.getElementById('help-tip');
  const tipT   = document.getElementById('help-tip-title');
  const tipB   = document.getElementById('help-tip-body');

  function setActive(on) {
    active = on;
    document.body.classList.toggle('help-mode', on);
    btn.classList.toggle('active-accent', on);
    banner.hidden = !on;
    if (!on) clearHover();
  }

  function clearHover() {
    if (hovered) hovered.classList.remove('help-hover');
    hovered = null;
    pinned = false;
    tip.hidden = true;
    tip.classList.remove('func');
  }

  function positionTip(x, y) {
    const pad = 16;
    tip.style.left = '0px'; tip.style.top = '0px';   // reset per misurare
    const w = tip.offsetWidth, h = tip.offsetHeight;
    let left = x + pad, top = y + pad;
    if (left + w > window.innerWidth - 8)  left = x - w - pad;
    if (top + h > window.innerHeight - 8)  top = y - h - pad;
    tip.style.left = Math.max(8, left) + 'px';
    tip.style.top  = Math.max(8, top) + 'px';
  }

  document.addEventListener('mousemove', e => {
    if (!active || pinned) return;
    const target = e.target.closest('[data-help]');
    if (target !== hovered) {
      if (hovered) hovered.classList.remove('help-hover');
      hovered = target;
      if (hovered) {
        hovered.classList.add('help-hover');
        const [title, ...rest] = (hovered.dataset.help || '').split('|');
        tipT.textContent = title.trim();
        tipB.textContent = rest.join('|').trim();
        tip.classList.remove('func');
        tip.hidden = false;
      } else {
        tip.hidden = true;
      }
    }
    if (hovered && !tip.hidden) positionTip(e.clientX, e.clientY);
  }, true);

  /* ── selezione nel codice: spiega la funzione ─────────────────────────
     Al rilascio del mouse dentro un editor, la parola selezionata viene
     cercata nel glossario (FuncDocs) e spiegata nel tooltip, che resta
     fisso finché non si clicca da un'altra parte. */

  function engineForCM(wrap) {
    if (wrap.closest('#cm-hydra'))   return 'hydra';
    if (wrap.closest('#cm-strudel')) return 'strudel';
    const tut = wrap.closest('.tut-code');   // riquadri dei tutorial
    if (tut) return tut.dataset.engine;
    if (wrap.closest('#cm-clip')) {   // modale clip: il motore lo dice il pallino
      const dot = document.getElementById('clip-modal-dot');
      return dot && dot.classList.contains('dot-hydra') ? 'hydra' : 'strudel';
    }
    return null;
  }

  function explainSelection(cm, engine) {
    const sel = cm.getSelection().trim();
    if (!sel || sel.length > 80 || sel.includes('\n')) return false;
    const words = sel.match(/[A-Za-z_$][A-Za-z0-9_$]*/g) || [];
    if (!words.length) return false;
    let doc = null;
    for (const w of words) {
      doc = FuncDocs.lookup(engine, w);
      if (doc) break;
    }
    if (!doc) {
      doc = {
        title: words[0],
        body: _t('Questa parola non è nel glossario. Prova a chiederlo all\'ASSISTENTE: "cosa fa {word}?"', { word: words[0] }),
      };
    }
    tipT.textContent = doc.title;
    tipB.textContent = doc.body;
    tip.classList.add('func');
    tip.hidden = false;
    const c = cm.cursorCoords(false, 'window');   // fine della selezione
    positionTip(c.left, c.bottom);
    pinned = true;
    return true;
  }

  document.addEventListener('mouseup', e => {
    if (!active) return;
    // aspetta che CodeMirror aggiorni la selezione
    setTimeout(() => {
      const wrap = e.target instanceof Element && e.target.closest('.CodeMirror');
      const cm = wrap && wrap.CodeMirror;
      if (cm && cm.somethingSelected() && explainSelection(cm, engineForCM(wrap))) return;
      if (pinned) clearHover();   // clic altrove: sblocca e torna alla modalità hover
    }, 0);
  }, true);

  /* in modalità aiuto i clic NON attivano i controlli: si esplora e basta.
     Restano attivi solo il bottone AIUTO stesso (per uscire) e i cambi vista. */
  document.addEventListener('click', e => {
    if (!active) return;
    const allowed = e.target.closest('#help-btn, .view-btn');
    if (allowed) return;
    e.preventDefault();
    e.stopPropagation();
  }, true);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && active) setActive(false);
  });

  btn.addEventListener('click', () => setActive(!active));

  return {
    get active() { return active; },
    toggle: () => setActive(!active),
  };
})();
