/* ════════════════════════════════════════════════════════════════════════
   CONSOLE — pannello che raccoglie e SPIEGA gli errori, nella lingua scelta

   Cattura quattro sorgenti:
   1. esiti di Engines.run (errori di valutazione)
   2. errori a runtime non catturati (window error / unhandledrejection):
      è qui che finiscono gli errori delle arrow function Hydra, che
      esplodono a ogni frame DOPO che l'eval è già riuscita
   3. il logger interno di Strudel (CustomEvent) — es. suoni inesistenti
   4. messaggi dell'app (timeline, assistente, sistema)

   Gli errori identici ravvicinati vengono accorpati (×N), altrimenti un
   errore per frame riempirebbe il pannello in un secondo.
   ════════════════════════════════════════════════════════════════════════ */

const AppConsole = (() => {

  const MAX_ROWS = 200;

  const panel  = document.getElementById('console-panel');
  const rowsEl = document.getElementById('console-rows');
  const badge  = document.getElementById('console-badge');
  const lastEl = document.getElementById('console-last');
  const barEl  = document.getElementById('console-bar');

  let open = false;
  let errCount = 0;
  let lastRow = null;    // { key, el, count, countEl, at }

  /* ── spiegazioni didattiche degli errori più comuni ────────────────── */
  const EXPLAINERS = [
    { re: /(['"`]?)([A-Za-z_$][\w$]*)\1 is not defined/,
      hint: m => _t('«{name}» non esiste: controlla come è scritto. I nomi validi sono nella libreria ESEMPI, oppure chiedi all\'assistente.', { name: m[2] }) },
    { re: /\.?([A-Za-z_$][\w$]*) is not a function/,
      hint: m => _t('«{name}» non è una funzione che questo oggetto conosce: forse è di Hydra ma la stai usando in Strudel (o viceversa), o è scritta male.', { name: m[1] }) },
    { re: /Unexpected end of input/,
      hint: () => _t('Manca qualcosa alla fine: probabilmente una parentesi ) o } non chiusa.') },
    { re: /Unexpected token(?:\s*[:']?\s*(.+?))?$/,
      hint: () => _t('C\'è un simbolo fuori posto: controlla parentesi, virgole e punti della catena (ogni .funzione() si aggancia alla precedente).') },
    { re: /Cannot read propert(?:y|ies) of undefined(?: \(reading '([^']+)'\))?/,
      hint: m => m[1]
        ? _t('La catena si interrompe prima di «.{name}»: la parte precedente non ha prodotto nulla. Controlla la riga sopra.', { name: m[1] })
        : _t('La catena si interrompe prima di questo punto: la parte precedente non ha prodotto nulla. Controlla la riga sopra.') },
    { re: /sound "?([\w:-]+)"? not found/i,
      hint: m => _t('Il suono «{name}» non esiste qui. Suoni disponibili: bd sd sn hh cp lt mt ht perc casio jazz arpy tabla east space crow xbreak1 dnb1 sax, oppure i sintetizzatori sine triangle sawtooth square supersaw, e gli strumenti guitar epiano organ bell.', { name: m[1] }) },
    { re: /got "?undefined"? instead of pattern/i,
      hint: () => _t('Una parte del pattern è vuota o scritta male: controlla le virgolette e la mini-notazione.') },
    { re: /\[mini\] parse error(?:.*line (\d+))?/i,
      hint: m => m[1]
        ? _t('La mini-notazione dentro le virgolette (riga {line}) ha un simbolo fuori posto: controlla parentesi quadre [ ], asterischi e virgole.', { line: m[1] })
        : _t('La mini-notazione dentro le virgolette ha un simbolo fuori posto: controlla parentesi quadre [ ], asterischi e virgole.') },
    { re: /Invalid regular expression|invalid syntax/i,
      hint: () => _t('Sintassi non valida: rileggi la riga indicata cercando simboli mancanti o di troppo.') },
  ];

  function explain(text) {
    for (const ex of EXPLAINERS) {
      const m = String(text).match(ex.re);
      if (m) { try { return ex.hint(m); } catch (_) { return null; } }
    }
    return null;
  }

  /* ── pannello ──────────────────────────────────────────────────────── */
  function setOpen(v) {
    open = v;
    panel.classList.toggle('open', v);
    /* le viste scorrono in su: la console non copre mai gli editor */
    document.body.classList.toggle('console-open', v);
    setTimeout(() => {
      if (typeof Editors !== 'undefined') Editors.refresh();
    }, 60);
    if (v) {
      errCount = 0;
      badge.hidden = true;
      rowsEl.scrollTop = rowsEl.scrollHeight;
    }
  }

  barEl.addEventListener('click', () => setOpen(!open));
  document.getElementById('console-clear').addEventListener('click', e => {
    e.stopPropagation();
    rowsEl.innerHTML = '';
    lastRow = null;
    lastEl.textContent = _t('console pulita');
    lastEl.className = 'c-last';
  });
  document.getElementById('console-close').addEventListener('click', e => {
    e.stopPropagation();
    setOpen(false);
  });

  const SOURCE_LABEL = {
    visuale: _t('VISUALE'), suono: _t('SUONO'), timeline: 'TIMELINE',
    assistente: _t('ASSISTENTE'), sistema: _t('SISTEMA'), esecuzione: _t('ESECUZIONE'),
    suoni: _t('SUONI'), lavagna: _t('LAVAGNA'),
  };

  /**
   * Registra un messaggio.
   * @param source source visuale|suono|timeline|assistente|sistema|esecuzione
   * @param level  err|warn|ok|info
   * @param ctx    opzionale {engine, code}: da dove viene il codice incriminato
   *               (usato dal bottone "? SPIEGA" per dare contesto all'assistente)
   */
  function log(source, level, text, hintOverride, ctx) {
    text = String(text).trim();
    if (!text) return;
    const now = performance.now();
    const key = source + '|' + level + '|' + text;

    /* accorpa i duplicati ravvicinati (errori per-frame di Hydra) */
    if (lastRow && lastRow.key === key && now - lastRow.at < 4000) {
      lastRow.count++;
      lastRow.at = now;
      lastRow.countEl.textContent = '×' + lastRow.count;
      lastRow.countEl.hidden = false;
      return;
    }

    const hint = hintOverride !== undefined ? hintOverride : explain(text);

    const row = document.createElement('div');
    row.className = 'c-row ' + level;
    const head = document.createElement('div');
    head.className = 'c-head';
    const t = new Date();
    head.innerHTML =
      `<span class="c-time">${String(t.getHours()).padStart(2, '0')}:${String(t.getMinutes()).padStart(2, '0')}:${String(t.getSeconds()).padStart(2, '0')}</span>` +
      `<span class="c-src">${SOURCE_LABEL[source] || source}</span>`;
    const countEl = document.createElement('span');
    countEl.className = 'c-count';
    countEl.hidden = true;
    head.appendChild(countEl);
    /* errori e avvisi: bottone che chiede all'assistente di spiegare */
    if (level === 'err' || level === 'warn') {
      const ask = document.createElement('button');
      ask.className = 'btn btn-mini c-ask';
      ask.textContent = _t('? SPIEGA');
      ask.dataset.help = _t('Spiega errore|Manda questo errore all\'assistente AI, insieme al codice che lo ha causato: ti spiega cosa significa e come correggerlo.');
      ask.addEventListener('click', ev => {
        ev.stopPropagation();
        if (typeof Assistant === 'undefined') return;
        if (!Assistant.isOpen) document.getElementById('ai-btn').click();
        Assistant.explainConsoleError({
          source, text,
          hint: hint || null,
          engine: ctx && ctx.engine,
          code: ctx && ctx.code,
        });
      });
      head.appendChild(ask);
    }
    const msg = document.createElement('div');
    msg.className = 'c-msg';
    msg.textContent = text;
    row.append(head, msg);
    if (hint) {
      const h = document.createElement('div');
      h.className = 'c-hint';
      h.textContent = '→ ' + hint;
      row.appendChild(h);
    }
    rowsEl.appendChild(row);
    while (rowsEl.childElementCount > MAX_ROWS) rowsEl.firstElementChild.remove();
    rowsEl.scrollTop = rowsEl.scrollHeight;

    lastRow = { key, el: row, count: 1, countEl, at: now };

    /* barra di stato + apertura automatica sugli errori */
    lastEl.textContent = (SOURCE_LABEL[source] || source) + ' · ' + text;
    lastEl.className = 'c-last ' + level;
    if (level === 'err') {
      if (!open) {
        errCount++;
        badge.textContent = errCount;
        badge.hidden = false;
        setOpen(true);
      }
    }
  }

  /* ── 2a. errori che Hydra INGOIA: i parametri-funzione falliti finiscono
         in console.warn('ERROR', e) con fallback al valore di default, e
         gli shader rotti in console.log('shader could not compile', e).
         Senza questa intercettazione "non appare nulla". ──────────────── */
  const origWarn = console.warn.bind(console);
  console.warn = (...args) => {
    origWarn(...args);
    try {
      if (args[0] === 'ERROR' && args[1]) {
        const msg = args[1].message || String(args[1]);
        log('visuale', 'err', msg,
          explain(msg) || _t('Errore in una funzione () => … del codice visuale: viene rivalutata a ogni frame e intanto Hydra usa il valore di default (per questo l\'immagine sembra ferma o strana).'),
          { engine: 'hydra' });
      } else if (args[0] === 'function does not return a number') {
        log('visuale', 'warn', _t('una funzione () => … non restituisce un numero'),
          _t('I parametri-funzione devono restituire un numero, es. () => time * 0.1 oppure () => Math.sin(time).'),
          { engine: 'hydra' });
      }
    } catch (_) {}
  };
  const origLog = console.log.bind(console);
  console.log = (...args) => {
    origLog(...args);
    try {
      if (args[0] === 'shader could not compile') {
        const msg = (args[1] && args[1].message) || String(args[1] || '');
        log('visuale', 'err', _t('lo shader non compila: {error}', { error: msg }),
          _t('Di solito è un valore del tipo sbagliato dentro la catena: controlla i parametri passati alle funzioni.'),
          { engine: 'hydra' });
      }
    } catch (_) {}
  };

  /* ── 2b. errori a runtime non catturati ────────────────────────────── */
  window.addEventListener('error', e => {
    const msg = e.message || (e.error && e.error.message) || _t('errore sconosciuto');
    if (/ResizeObserver|Script error\.$/.test(msg)) return;   // rumore noto
    log('esecuzione', 'err', msg,
      explain(msg) || _t('Errore mentre il codice era in esecuzione: se la visuale è sparita, controlla le funzioni () => … che vengono eseguite a ogni frame.'));
  });
  window.addEventListener('unhandledrejection', e => {
    const msg = (e.reason && (e.reason.message || String(e.reason))) || _t('errore sconosciuto');
    log('esecuzione', 'err', msg);
  });

  /* ── 3. logger interno di Strudel: CustomEvent "strudel.log" con
         detail = { message, type, data } ─────────────────────────────── */
  document.addEventListener('strudel.log', e => {
    const d = e.detail || {};
    const text = d.message || '';
    if (!text) return;
    if (/^\[eval\] error/.test(text)) return;      // già riportato da Engines.run
    const isErr = /error/i.test(d.type || '') || /error/i.test(text);
    const isWarn = /warn/i.test(d.type || '') || /not found/i.test(text);
    if (!isErr && !isWarn) return;                 // gli info restano in devtools
    log('suono', isErr ? 'err' : 'warn', text, undefined, { engine: 'strudel' });
  });

  return { log, open: () => setOpen(true), explain };
})();
