/* ════════════════════════════════════════════════════════════════════════
   LAVAGNA — schede di codice condivise fra docente e studenti

   Il docente appende schede; gli studenti le vedono comparire e possono
   caricarle nell'editor. Gli studenti mandano al docente i propri esempi;
   il docente può promuoverne uno a scheda visibile a tutta la classe.

   Interroga il server ogni pochi secondi passando l'ultimo numero di
   sequenza visto: se non è cambiato niente la risposta è di pochi byte.
   Non usiamo SSE: su hosting condiviso ogni connessione aperta occupa un
   processo PHP, e 25 studenti collegati in permanenza possono mettere
   offline l'intero sito.

   REGOLA: il codice che arriva dalla lavagna si CARICA nell'editor, non si
   esegue mai da solo. L'app valuta JavaScript senza sandbox, e sulla lavagna
   può finire anche il codice di uno studente (via promozione di un invio).
   Caricare invece di eseguire non costa niente: basta non passare andRun.
   ════════════════════════════════════════════════════════════════════════ */

const Board = (() => {

  const cfg = LIVELAB.config.board;

  const K_ID   = 'livelab-board-id';      // identificativo anonimo di questo browser
  const K_NAME = 'livelab-board-name';    // nome scelto dallo studente
  const K_PASS = 'livelab-board-pass';    // password docente (solo per la sessione)

  let seq = -1;
  let subseq = -1;          // contatore separato per gli invii (solo docente)
  let cards = [];
  let submissions = [];
  let notice = '';
  let timer = null;
  let lastError = null;
  /* Il server, a chi non ha la password giusta, semplicemente NON manda gli
     invii — non risponde con un errore. Senza tenerne traccia, il docente
     che sbaglia o chiude il prompt vedrebbe un pannello vuoto e penserebbe
     che la classe non ha ancora consegnato niente. */
  let authOk = true;

  /* ── identità ──────────────────────────────────────────────────────── */

  function myId() {
    let id = localStorage.getItem(K_ID);
    if (!id) {
      id = [...crypto.getRandomValues(new Uint8Array(8))]
        .map(b => b.toString(16).padStart(2, '0')).join('');
      localStorage.setItem(K_ID, id);
    }
    return id;
  }

  function myName() { return localStorage.getItem(K_NAME) || ''; }
  function setMyName(n) { localStorage.setItem(K_NAME, String(n || '').slice(0, 40)); }

  /* La password del docente sta in sessionStorage e non in localStorage:
     dura quanto la scheda del browser, non quanto il computer. */
  function pass() { return sessionStorage.getItem(K_PASS) || ''; }
  function setPass(p) { sessionStorage.setItem(K_PASS, String(p || '')); }

  const isTeacher = () => LIVELAB.config.isTeacher;

  /* ── rete ──────────────────────────────────────────────────────────── */

  /* api/board.php risponde con errori in italiano. Il PHP resta com'è: le
     frasi note si traducono qui, al momento di mostrarle; una frase che non
     è nella lista arriva com'è. */
  const SERVER_ERRORS = {
    'cartella dati non creabile': _t('cartella dati non creabile'),
    'scrittura fallita': _t('scrittura fallita'),
    'salvataggio fallito': _t('salvataggio fallito'),
    'password docente non configurata: crea api/secret.php': _t('password docente non configurata: crea api/secret.php'),
    'password docente errata': _t('password docente errata'),
    'metodo non consentito': _t('metodo non consentito'),
    'codice vuoto': _t('codice vuoto'),
    'identificativo mancante': _t('identificativo mancante'),
    'troppi invii in un minuto, riprova fra poco': _t('troppi invii in un minuto, riprova fra poco'),
    'azione sconosciuta': _t('azione sconosciuta'),
  };
  const serverError = msg => (Object.hasOwn(SERVER_ERRORS, msg) ? SERVER_ERRORS[msg] : msg);

  async function api(action, body) {
    const url = new URL(cfg.apiUrl);
    if (!body) {
      url.searchParams.set('action', action);
      url.searchParams.set('since', String(seq));
      if (isTeacher() && pass()) {
        url.searchParams.set('pass', pass());
        /* Senza questo il server risponderebbe «niente di nuovo» finché la
           lavagna non cambia, e gli invii degli studenti non arriverebbero
           mai al docente. */
        url.searchParams.set('subsince', String(subseq));
      }
    }
    const res = await fetch(url, body ? {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, pass: pass(), ...body }),
    } : { cache: 'no-store' });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error ? serverError(data.error) : 'HTTP ' + res.status);
    return data;
  }

  async function poll() {
    try {
      const d = await api('get');
      lastError = null;
      if (!d.unchanged) {
        authOk = !isTeacher() || Array.isArray(d.submissions);
        seq = d.seq;
        subseq = d.subseq ?? subseq;
        cards = d.cards || [];
        notice = d.notice || '';
        if (d.submissions) submissions = d.submissions;
        render();
      }
      badge();
    } catch (e) {
      /* Una lavagna irraggiungibile non deve riempire la console di rosso a
         ogni interrogazione: si annota una volta e si continua a riprovare. */
      const msg = e && e.message ? e.message : String(e);
      if (msg !== lastError) {
        lastError = msg;
        AppConsole.log('lavagna', 'warn', _t('lavagna non raggiungibile: {err}', { err: msg }),
          _t('Le schede già ricevute restano visibili. Riprovo da solo.'));
      }
    }
  }

  function start() {
    if (timer) return;
    poll();
    timer = setInterval(() => {
      /* A scheda nascosta si rallenta: nessuno sta guardando. */
      if (document.visibilityState === 'hidden') return;
      poll();
    }, cfg.pollMs);
  }

  /* ── azioni ────────────────────────────────────────────────────────── */

  async function postCard(engine, code, title) {
    const d = await api('post', {
      engine, code,
      title: title || _t('senza titolo'),
      author: myName() || _t('docente'),
    });
    seq = d.seq; cards = d.cards; render();
  }

  async function removeCard(id) {
    const d = await api('del', { id });
    seq = d.seq; cards = d.cards; render();
  }

  async function send(engine, code, title) {
    if (!myName()) throw new Error(_t('scrivi prima il tuo nome'));
    await api('send', {
      engine, code, title: title || '',
      who: myId(), name: myName(),
    });
  }

  /* ── interfaccia ───────────────────────────────────────────────────── */

  const view      = document.getElementById('view-board');
  const listEl    = document.getElementById('board-list');
  const inboxEl   = document.getElementById('board-inbox');
  const inboxWrap = document.getElementById('board-inbox-wrap');
  const nameEl    = document.getElementById('board-name');
  const noticeEl  = document.getElementById('board-notice');
  const btnEl     = document.getElementById('view-board-btn');

  function badge() {
    if (!btnEl) return;
    const n = isTeacher() ? submissions.length : cards.length;
    btnEl.textContent = n ? _t('LAVAGNA {n}', { n }) : _t('LAVAGNA');
  }

  function codeBox(text) {
    const pre = document.createElement('pre');
    pre.className = 'board-code';
    pre.textContent = text;          // MAI innerHTML: è codice, non markup
    return pre;
  }

  /** Una scheda. `kind` è 'card' (dalla lavagna) o 'sub' (invio ricevuto). */
  function cardEl(item, kind) {
    const box = document.createElement('article');
    box.className = 'board-card ' + (item.engine === 'strudel' ? 'is-sound' : 'is-visual');

    const head = document.createElement('div');
    head.className = 'board-card-head';

    const tag = document.createElement('span');
    tag.className = 'board-tag';
    tag.textContent = item.engine === 'strudel' ? _t('SUONO') : _t('VISUALE');

    const title = document.createElement('span');
    title.className = 'board-title';
    title.textContent = item.title || (kind === 'sub' ? _t('senza titolo') : '—');

    const who = document.createElement('span');
    who.className = 'board-who';
    who.textContent = kind === 'sub' ? (item.name || _t('anonimo')) : (item.author || '');

    head.append(tag, title, who);
    box.append(head, codeBox(item.code));

    const bar = document.createElement('div');
    bar.className = 'board-actions';

    const load = document.createElement('button');
    load.className = 'btn btn-mini';
    load.textContent = _t('CARICA NELL\'EDITOR');
    load.dataset.help = _t('Carica|Mette questo codice nel tuo editor. Non parte da solo: lo esegui tu con ▶ ESEGUI, dopo averlo letto.');
    load.addEventListener('click', () => {
      Editors.insert(item.engine, item.code, false);   // ← mai andRun
      showView('lab');
      AppConsole.log('lavagna', 'info', item.engine === 'strudel'
        ? _t('codice caricato nell\'editor SUONO — premi ▶ ESEGUI per provarlo')
        : _t('codice caricato nell\'editor VISUALE — premi ▶ ESEGUI per provarlo'));
    });

    const toTl = document.createElement('button');
    toTl.className = 'btn btn-mini';
    toTl.textContent = '+ TIMELINE';
    toTl.dataset.help = _t('Aggiungi alla timeline|Accoda questo codice come clip alla traccia giusta.');
    toTl.addEventListener('click', () => Timeline.addFromLab(item.engine, item.code));

    bar.append(load, toTl);

    if (isTeacher()) {
      if (kind === 'sub') {
        const promote = document.createElement('button');
        promote.className = 'btn btn-mini';
        promote.textContent = _t('→ METTI IN LAVAGNA');
        promote.dataset.help = _t('Metti in lavagna|Rende questo lavoro visibile a tutta la classe.');
        promote.addEventListener('click', async () => {
          try {
            await postCard(item.engine, item.code,
              (item.title || _t('esempio')) + ' — ' + (item.name || _t('anonimo')));
            AppConsole.log('lavagna', 'info', _t('«{name}» è ora in lavagna per tutti', { name: item.name }));
          } catch (e) { AppConsole.log('lavagna', 'err', e.message); }
        });
        bar.append(promote);
      } else {
        const del = document.createElement('button');
        del.className = 'btn btn-mini';
        del.textContent = '🗑';
        del.dataset.help = _t('Togli|Rimuove la scheda dalla lavagna di tutti.');
        del.addEventListener('click', () => removeCard(item.id).catch(
          e => AppConsole.log('lavagna', 'err', e.message)));
        bar.append(del);
      }
    }

    box.append(bar);
    return box;
  }

  function render() {
    if (!listEl) return;

    if (noticeEl) {
      noticeEl.textContent = notice;
      noticeEl.hidden = !notice;
    }

    listEl.innerHTML = '';
    if (!cards.length) {
      const p = document.createElement('p');
      p.className = 'board-empty';
      p.textContent = isTeacher()
        ? _t('La lavagna è vuota. Nel LAB, premi → LAVAGNA per appenderci il codice che hai davanti.')
        : _t('La lavagna è vuota per ora. Quando chi tiene il laboratorio ci appende qualcosa, comparirà qui da solo.');
      listEl.append(p);
    } else {
      cards.forEach(c => listEl.append(cardEl(c, 'card')));
    }

    if (inboxWrap) inboxWrap.hidden = !isTeacher();
    if (isTeacher() && inboxEl) {
      inboxEl.innerHTML = '';
      if (!authOk) {
        const p = document.createElement('p');
        p.className = 'board-empty';
        p.textContent = _t('Per vedere gli invii della classe serve la password docente.');
        const b = document.createElement('button');
        b.className = 'btn btn-mini';
        b.textContent = _t('INSERISCI LA PASSWORD');
        b.addEventListener('click', () => {
          const v = prompt(_t('Password docente per la lavagna:'));
          if (!v) return;
          setPass(v);
          seq = -1; subseq = -1;      // forza una lettura completa
          poll();
        });
        p.append(document.createElement('br'), b);
        inboxEl.append(p);
      } else if (!submissions.length) {
        const p = document.createElement('p');
        p.className = 'board-empty';
        p.textContent = _t('Nessun invio. Gli studenti usano INVIA VISUALE o INVIA SUONO dalla lavagna.');
        inboxEl.append(p);
      } else {
        [...submissions].sort((a, b) => b.at - a.at)
          .forEach(s => inboxEl.append(cardEl(s, 'sub')));
      }
    }
    badge();
    /* I data-help delle schede nuove funzionano da soli: la modalità aiuto
       ascolta su document e cerca con closest(), quindi non c'è niente da
       registrare per gli elementi creati adesso. */
  }

  /* ── avvio ─────────────────────────────────────────────────────────── */

  function init(showViewFn) {
    showView = showViewFn;
    if (nameEl) {
      nameEl.value = myName();
      nameEl.addEventListener('change', () => setMyName(nameEl.value));
    }
    render();
    start();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') poll();
    });
  }

  let showView = () => {};

  return {
    init,
    poll,
    postCard,
    send,
    setPass,
    hasPass: () => !!pass(),
    myName,
    setMyName,
    get isTeacher() { return isTeacher(); },
    get cards() { return cards; },
  };
})();
