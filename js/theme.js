/* ════════════════════════════════════════════════════════════════════════
   THEME — quale tema è attivo, e il menu per cambiarlo

   I temi veri stanno in css/theme.css: ognuno è un blocco di variabili sotto
   [data-theme="…"]. Qui c'è solo il loro elenco e la scelta di quale
   applicare, cioè quale nome scrivere in <html data-theme="…">.

   Ordine di precedenza:
     1. ?tema=brace nell'indirizzo — per dare alla classe un link con un tema
        già scelto (non viene ricordato: vale per quella apertura);
     2. l'ultimo tema scelto dal menu ◐ TEMA, ricordato in localStorage;
     3. DEFAULT.

   Si carica nell'<head>, prima del <body>: così il tema è già deciso quando
   il browser disegna la pagina, e non si vede il lampo del tema
   predefinito. Dipende solo da js/i18n.js (caricato subito prima), per i
   nomi dei temi e del menu nella lingua scelta.
   ════════════════════════════════════════════════════════════════════════ */

window.LIVELAB = window.LIVELAB || {};

LIVELAB.theme = (() => {

  /* Un tema nuovo: un blocco in css/theme.css + una riga qui. */
  const THEMES = [
    { id: 'notte',  label: _t('Notte')  },
    { id: 'brace',  label: _t('Brace')  },
    { id: 'aurora', label: _t('Aurora') },
  ];
  const DEFAULT = 'notte';
  const KEY = 'livelab-theme';

  const exists = id => THEMES.some(t => t.id === id);

  function stored() {
    try { return localStorage.getItem(KEY); } catch (_) { return null; }
  }

  let current = DEFAULT;

  function apply(id, remember) {
    if (!exists(id)) id = DEFAULT;
    current = id;
    document.documentElement.dataset.theme = id;
    if (remember) { try { localStorage.setItem(KEY, id); } catch (_) {} }
    syncMenu();
  }

  /* segna nel menu la voce del tema attivo (il menu esiste solo a DOM pronto) */
  function syncMenu() {
    const btn = document.getElementById('theme-btn');
    if (!btn) return;
    btn.title = _t('Tema: {name}', { name: THEMES.find(t => t.id === current).label });
    document.querySelectorAll('.theme-item').forEach(it =>
      it.setAttribute('aria-checked', String(it.dataset.theme === current)));
  }

  const fromUrl = new URLSearchParams(location.search).get('tema');
  apply(exists(fromUrl) ? fromUrl : stored(), false);

  /* ── opacità dei pannelli ──────────────────────────────────────────────
     Lo slider del menu scrive --panel-alpha (0…1) su <html>; in app.css i
     pannelli che stanno sopra la visuale moltiplicano per lei il loro
     sfondo. 100% = pannelli come disegnati, 0% = si vede tutta la visuale
     sotto il testo. Qui nell'head come il tema: niente lampo all'avvio. */
  const K_ALPHA = 'livelab-panel-alpha';
  let alpha = 100;

  function applyAlpha(pct, remember) {
    pct = Math.round(Number(pct));
    if (!Number.isFinite(pct)) pct = 100;
    alpha = Math.min(100, Math.max(0, pct));
    document.documentElement.style.setProperty('--panel-alpha', String(alpha / 100));
    if (remember) { try { localStorage.setItem(K_ALPHA, String(alpha)); } catch (_) {} }
  }
  try { const v = localStorage.getItem(K_ALPHA); if (v !== null) applyAlpha(v, false); } catch (_) {}

  /* ── evidenziare il codice che suona ───────────────────────────────────
     Come su strudel.cc: mentre un pattern suona, nel suo editor si
     accendono i pezzi che si stanno sentendo (js/highlight.js). Acceso di
     default; dal menu si spegne, per chi il lampeggio distrae. Lo stato
     sta qui con le altre scelte del menu; chi disegna ascolta
     livelab:highlight. */
  const K_HL = 'livelab-highlight';
  let highlight = true;
  try { highlight = localStorage.getItem(K_HL) !== 'off'; } catch (_) {}

  function applyHighlight(on, remember) {
    highlight = !!on;
    if (remember) { try { localStorage.setItem(K_HL, highlight ? 'on' : 'off'); } catch (_) {} }
    document.dispatchEvent(new CustomEvent('livelab:highlight', { detail: { on: highlight } }));
  }

  /* ── menu a tendina ────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    const wrap = document.getElementById('theme-wrap');
    const btn  = document.getElementById('theme-btn');
    const menu = document.getElementById('theme-menu');
    if (!wrap || !btn || !menu) return;

    function setOpen(on) {
      menu.hidden = !on;
      btn.setAttribute('aria-expanded', String(on));
      btn.classList.toggle('active-accent', on);
    }

    for (const t of THEMES) {
      const item = document.createElement('button');
      item.className = 'theme-item';
      item.setAttribute('role', 'menuitemradio');
      item.dataset.theme = t.id;      // dentro la voce valgono i colori di QUEL tema
      const swatch = document.createElement('span');
      swatch.className = 'theme-swatch';
      item.append(swatch, t.label);
      item.addEventListener('click', () => { apply(t.id, true); setOpen(false); });
      menu.appendChild(item);
    }
    syncMenu();

    /* in fondo al menu, sotto i temi: lo slider dell'opacità */
    const box = document.createElement('label');
    box.className = 'theme-alpha';
    box.dataset.help = _t('Opacità dei pannelli|Sposta a sinistra per rendere i pannelli trasparenti e vedere la visuale sotto il codice e i tutorial. 100% è com\'erano. La scelta viene ricordata su questo computer.');
    const head = document.createElement('span');
    head.className = 'theme-alpha-h';
    const val = document.createElement('output');
    head.append(_t('opacità pannelli'), val);
    const range = document.createElement('input');
    range.type = 'range';
    range.min = '0'; range.max = '100'; range.step = '5';
    range.value = String(alpha);
    range.setAttribute('aria-label', _t('Opacità dei pannelli'));
    const show = () => { val.textContent = alpha + '%'; };
    range.addEventListener('input', () => { applyAlpha(range.value, true); show(); });
    show();
    box.append(head, range);
    menu.appendChild(box);

    /* e sotto lo slider: l'interruttore dell'evidenziazione */
    const hl = document.createElement('label');
    hl.className = 'theme-check';
    hl.dataset.help = _t('Evidenzia ciò che suona|Mentre la musica suona, nel codice si illuminano le note e i suoni che si stanno sentendo in quel momento, come sul sito di Strudel. Toglilo se ti distrae. La scelta viene ricordata su questo computer.');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = highlight;
    cb.addEventListener('change', () => applyHighlight(cb.checked, true));
    document.addEventListener('livelab:highlight', e => { cb.checked = e.detail.on; });
    hl.append(cb, _t('evidenzia ciò che suona'));
    menu.appendChild(hl);

    btn.addEventListener('click', () => setOpen(menu.hidden));
    document.addEventListener('click', e => {
      if (!menu.hidden && !wrap.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !menu.hidden) { setOpen(false); btn.focus(); }
    });
  });

  return {
    list: THEMES,
    get current() { return current; },
    set: id => apply(id, true),
    /** Opacità dei pannelli in percentuale (0…100). */
    get panelAlpha() { return alpha; },
    setPanelAlpha: pct => applyAlpha(pct, true),
    /** true se il codice che suona va evidenziato (js/highlight.js). */
    get highlight() { return highlight; },
    setHighlight: on => applyHighlight(on, true),
  };
})();
