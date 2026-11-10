/* ════════════════════════════════════════════════════════════════════════
   I18N — la lingua dell'app: italiano, inglese, spagnolo

   L'italiano è la lingua in cui l'app è scritta: index.html, i moduli e i
   file di dati restano in italiano, e sono la fonte. Le altre lingue sono
   «pacchetti» in js/lang/<lingua>/, che si caricano solo per la lingua
   scelta. Due tipi di traduzione:

   · FRASI DELL'INTERFACCIA — alla gettext: la chiave è la frase italiana.
       _t('pronto')                        → 'ready'
       _t('{n} di {tot} passi', { n, tot }) → '3 of 7 steps'
     I pacchetti le registrano con I18N.add('en', { 'pronto': 'ready' }).
     Una frase senza traduzione resta in italiano (e finisce in
     I18N.missing, da guardare nella console del browser). Il testo fisso di
     index.html (testi, data-help, placeholder, title) si traduce con le
     stesse chiavi, percorrendo la pagina una volta sola: vedi apply().

   · CONTENUTI — tutorial, esempi, glossario: troppo lunghi per usare la
     frase come chiave. Il pacchetto li registra per id, con la stessa forma
     del file italiano (I18N.content('en', 'tutorials', { items: {…} })), e
     apply() li sostituisce nei dati prima che l'app parta.

   Cambiare lingua RICARICA la pagina: ogni modulo disegna una volta sola,
   nella lingua giusta. Prima di ricaricare parte l'evento livelab:lang, e
   chi ha qualcosa da salvare (il testo degli editor, la vista aperta) lo
   salva lì.

   Precedenza, come per il tema:
     1. ?lang=en nell'indirizzo — per dare alla classe un link già in una
        lingua (non viene ricordato);
     2. l'ultima lingua scelta dal menu, ricordata in localStorage;
     3. l'italiano.

   Si carica nell'<head>, prima di theme.js: i pacchetti devono esserci
   quando i moduli partono. _t è globale apposta: la usano tutti i moduli.
   ════════════════════════════════════════════════════════════════════════ */

window.LIVELAB = window.LIVELAB || {};

const I18N = (() => {

  /* Il nome di ogni lingua è scritto nella lingua stessa: chi non capisce
     l'italiano deve riconoscere la propria. */
  const LANGS = [
    { id: 'it', code: 'IT', label: 'Italiano' },
    { id: 'en', code: 'EN', label: 'English'  },
    { id: 'es', code: 'ES', label: 'Español'  },
  ];
  const SOURCE = 'it';            // la lingua in cui è scritta l'app
  const KEY = 'livelab-lang';

  /* I file di un pacchetto. Le frasi dell'interfaccia stanno in ui/, divise
     per gruppi di moduli (vedi l'intestazione di ciascun file); i contenuti
     hanno gli stessi nomi dei file italiani che traducono. Un file nuovo di
     tutorial o di esempi va aggiunto qui e in tutte e due le cartelle
     (js/lang/en/, js/lang/es/). */
  const PACK = [
    'ui/app', 'ui/engines', 'ui/timeline', 'ui/assistant', 'ui/panels',
    'funcdocs',
    'snippets', 'snippets/visuale-guide',
    'tutorials', 'tutorials/idm', 'tutorials/acid', 'tutorials/sax',
    'tutorials/visuale', 'tutorials/visuale-guide',
  ];

  const exists = id => LANGS.some(l => l.id === id);

  function stored() {
    try { return localStorage.getItem(KEY); } catch (_) { return null; }
  }

  const fromUrl = new URLSearchParams(location.search).get('lang');
  const lang = exists(fromUrl) ? fromUrl : exists(stored()) ? stored() : SOURCE;
  document.documentElement.lang = lang;

  /* ── pacchetti ─────────────────────────────────────────────────────── */

  const dict = {};           // frase italiana (spazi compattati) → traduzione
  const store = {};          // nome del contenuto → dati tradotti
  const missing = new Set();

  /* Stessa frase, a capo o indentata in modo diverso (index.html, template
     su più righe): stessa chiave. */
  const norm = s => String(s).replace(/\s+/g, ' ').trim();

  function add(l, entries) {
    if (l !== lang) return;
    for (const [k, v] of Object.entries(entries)) dict[norm(k)] = v;
  }

  /* Oggetti fusi in profondità: tutorials.js e tutorials/idm.js registrano
     tutti e due dentro 'tutorials'. Liste e testi si sostituiscono. */
  function merge(into, from) {
    for (const [k, v] of Object.entries(from)) {
      const plain = v && typeof v === 'object' && !Array.isArray(v);
      if (plain && into[k] && typeof into[k] === 'object') merge(into[k], v);
      else into[k] = v;
    }
  }

  function content(l, name, data) {
    if (l !== lang) return;
    merge(store[name] || (store[name] = {}), data);
  }

  /* Solo i file della lingua scelta: l'italiano non ha pacchetto. Scritti
     nell'<head> mentre la pagina si legge, partono in ordine e prima di
     tutto il resto, come se fossero nell'HTML. */
  if (lang !== SOURCE) {
    for (const f of PACK) document.write(`<script src="js/lang/${lang}/${f}.js"><\/script>`);
  }

  /* ── tradurre ──────────────────────────────────────────────────────── */

  function fill(s, params) {
    return params ? s.replace(/\{(\w+)\}/g, (m, k) => (k in params ? params[k] : m)) : s;
  }

  /** La frase italiana `it` nella lingua attiva; {nome} prende params.nome. */
  function t(it, params) {
    it = String(it);
    if (lang === SOURCE) return fill(it, params);
    const hit = dict[norm(it)];
    if (hit === undefined) { missing.add(it); return fill(it, params); }
    return fill(hit, params);
  }

  /* Il testo fisso della pagina: nodi di testo e gli attributi che l'utente
     legge. Si traduce solo ciò che è nel pacchetto; il resto (Open Live Lab,
     hydra, i numeri) resta com'è. Mai dentro il codice degli editor. */
  const ATTRS = ['data-help', 'placeholder', 'title', 'aria-label', 'data-prompt'];

  function translate(root) {
    if (lang === SOURCE) return;
    const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
      if (n.parentElement && n.parentElement.closest('script, style, pre, .CodeMirror')) continue;
      const hit = dict[norm(n.nodeValue)];
      if (hit === undefined) continue;
      const [, lead, , trail] = n.nodeValue.match(/^(\s*)([\s\S]*?)(\s*)$/);
      n.nodeValue = lead + hit + trail;
    }
    for (const a of ATTRS) {
      root.querySelectorAll(`[${a}]`).forEach(el => {
        const hit = dict[norm(el.getAttribute(a))];
        if (hit !== undefined) el.setAttribute(a, hit);
      });
    }
  }

  /* ── contenuti ─────────────────────────────────────────────────────── */

  function pick(target, from, fields) {
    for (const f of fields) if (from[f] !== undefined) target[f] = from[f];
  }

  /* Le categorie e le etichette sono anche chiavi (raggruppano, filtrano):
     si traducono ovunque compaiano, così restano uguali fra loro. */
  function localizeSnippets() {
    const c = store.snippets;
    if (!c || typeof SNIPPETS === 'undefined') return;
    const items = c.items || {}, cats = c.cats || {}, tags = c.tags || {};
    const cat = name => cats[name] || name;
    const tag = (engine, name) => ((tags[engine] || {})[name] || [name])[0];
    for (const sn of SNIPPETS) {
      if (items[sn.id]) pick(sn, items[sn.id], ['title', 'desc', 'code']);
      sn.cat = cat(sn.cat);
      if (sn.tags) sn.tags = sn.tags.map(name => tag(sn.engine, name));
    }
    for (const engine of Object.keys(SNIPPET_CATS)) {
      SNIPPET_CATS[engine] = SNIPPET_CATS[engine].map(cat);
    }
    for (const engine of Object.keys(SNIPPET_TAGS)) {
      SNIPPET_TAGS[engine] = SNIPPET_TAGS[engine].map(([name, help]) => {
        const tr = (tags[engine] || {})[name];
        return tr ? [tr[0], tr[1] || help] : [name, help];
      });
    }
  }

  /* I passi si abbinano per posizione: il test (test/i18n.test.js)
     controlla che siano tanti quanti in italiano e che il codice sia lo
     stesso, commenti a parte. */
  function localizeTutorials() {
    const c = store.tutorials;
    if (!c || typeof TUTORIALS === 'undefined') return;
    const items = c.items || {}, groups = c.groups || {};
    for (const g of TUTORIAL_GROUPS) g.label = groups[g.label] || g.label;
    for (const tut of TUTORIALS) {
      const tr = items[tut.id];
      if (!tr) continue;
      pick(tut, tr, ['title', 'desc']);
      (tr.steps || []).forEach((st, i) => {
        if (st && tut.steps[i]) pick(tut.steps[i], st, ['title', 'text', 'code', 'try']);
      });
    }
  }

  /** Da chiamare una volta, dopo i file di dati e prima dei moduli
      (vedi index.html): traduce i contenuti e il testo della pagina. */
  function apply() {
    if (lang === SOURCE) return;
    localizeSnippets();
    localizeTutorials();
    document.title = t(document.title);
    translate(document.body);
  }

  /* ── cambiare lingua ───────────────────────────────────────────────── */

  function set(id) {
    if (!exists(id) || id === lang) return;
    let saved = false;
    try { localStorage.setItem(KEY, id); saved = localStorage.getItem(KEY) === id; } catch (_) {}
    document.dispatchEvent(new CustomEvent('livelab:lang', { detail: { lang: id } }));
    /* via ?lang= dall'indirizzo, o vincerebbe sulla scelta appena fatta;
       se il browser non lascia ricordare (navigazione privata bloccata), la
       lingua viaggia invece nell'indirizzo, o ricaricando tornerebbe quella
       di prima */
    const url = new URL(location.href);
    if (saved) url.searchParams.delete('lang');
    else url.searchParams.set('lang', id);
    if (url.href === location.href) location.reload();
    else location.replace(url.href);
  }

  /* ── menu a tendina, come quello dei temi ──────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    const wrap = document.getElementById('lang-wrap');
    const btn  = document.getElementById('lang-btn');
    const menu = document.getElementById('lang-menu');
    if (!wrap || !btn || !menu) return;

    const cur = LANGS.find(l => l.id === lang);
    btn.textContent = `🌐 ${cur.code} ▾`;
    btn.title = cur.label;

    function setOpen(on) {
      menu.hidden = !on;
      btn.setAttribute('aria-expanded', String(on));
      btn.classList.toggle('active-accent', on);
    }

    for (const l of LANGS) {
      const item = document.createElement('button');
      item.className = 'lang-item';
      item.setAttribute('role', 'menuitemradio');
      item.setAttribute('aria-checked', String(l.id === lang));
      item.lang = l.id;
      const code = document.createElement('span');
      code.className = 'lang-code';
      code.textContent = l.code;
      item.append(code, l.label);
      item.addEventListener('click', () => { setOpen(false); set(l.id); });
      menu.appendChild(item);
    }

    btn.addEventListener('click', () => setOpen(menu.hidden));
    document.addEventListener('click', e => {
      if (!menu.hidden && !wrap.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !menu.hidden) { setOpen(false); btn.focus(); }
    });
  });

  return {
    lang,
    list: LANGS,
    t,
    add,
    content,
    /** I contenuti tradotti registrati sotto `name`, o null in italiano. */
    get: name => store[name] || null,
    apply,
    translate,
    set,
    /** Frasi chieste a _t() senza traduzione nel pacchetto: per chi mantiene. */
    missing,
  };
})();

/** Traduce una frase dell'interfaccia: vedi I18N.t. */
function _t(it, params) { return I18N.t(it, params); }
