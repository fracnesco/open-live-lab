/* ════════════════════════════════════════════════════════════════════════
   ASSISTANT — LLM locale via Ollama (http://localhost:11434)

   Tre difese contro il codice inventato:
   1. un system prompt con la lista ESATTA delle funzioni disponibili
      (estratta dai bundle vendorizzati, non dalla memoria del modello);
   2. esempi few-shot presi dalla libreria didattica, scelti in base
      alla domanda;
   3. VALIDAZIONE REALE di ogni blocco proposto (Engines.validate) e
      auto-correzione: se il codice non passa, l'errore torna al modello
      che riprova (max 2 volte). Ogni blocco mostra l'esito.
   ════════════════════════════════════════════════════════════════════════ */

const Assistant = (() => {

  /* Ollama è un programma che gira sul computer di chi usa l'app. Nella
     versione online degli studenti non c'è: config.assistant.enabled è
     false e l'assistente si spegne con un messaggio, invece di lasciare
     una connessione fallita e un errore rosso incomprensibile. */
  const AI = () => LIVELAB.config.assistant;
  const MAX_AUTOFIX = 2;

  /* ── system prompt: regole + API di riferimento ────────────────────── */
  /* Le altre lingue hanno il loro prompt (js/lang/<l>/ui/assistant.js):
     stesse regole, ma il modello risponde e commenta nella lingua scelta. */
  const SYSTEM_PROMPT = (I18N.get('assistant') || {}).system || `Sei l'assistente di Open Live Lab, un laboratorio didattico di live coding. Aiuti studenti alle prime armi. Rispondi SEMPRE in italiano, breve e incoraggiante.

REGOLA ASSOLUTA: puoi usare SOLO le funzioni elencate qui sotto. Se una funzione non è nell'elenco, NON esiste in questa app, anche se l'hai vista altrove. Non inventare mai nomi.

════ HYDRA (visuali) — blocchi marcati \`\`\`hydra ════
(elenco ESATTO estratto dal motore: 52 funzioni, queste e nessun'altra)
Sorgenti (iniziano la catena): osc(frequency=60, sync=0.1, offset=0), noise(scale=10, offset=0.1), voronoi(scale=5, speed=0.3, blending=0.3), shape(sides=3, radius=0.3, smoothing=0.01), gradient(speed=0), solid(r=0, g=0, b=0, a=1), src(o0)
Geometria: .rotate(angle=10, speed=0), .scale(amount=1.5, xMult=1, yMult=1), .pixelate(pixelX=20, pixelY=20), .repeat(repeatX=3, repeatY=3), .repeatX(reps=3, offset=0), .repeatY(reps=3, offset=0), .kaleid(nSides=4), .scroll(scrollX=0.5, scrollY=0.5, speedX=0, speedY=0), .scrollX(scrollX=0.5, speed=0), .scrollY(scrollY=0.5, speed=0)
Colore: .color(r=1, g=1, b=1, a=1), .colorama(amount=0.005), .contrast(amount=1.6), .brightness(amount=0.4), .luma(threshold=0.5, tolerance=0.1), .thresh(threshold=0.5, tolerance=0.04), .invert(amount=1), .saturate(amount=2), .hue(hue=0.4), .posterize(bins=3, gamma=0.6), .shift(r=0.5, g=0, b=0, a=0)
Combinazioni (il PRIMO argomento è un'altra sorgente): .add(src, amount=1), .sub(src, amount=1), .mult(src, amount=1), .blend(src, amount=0.5), .diff(src), .layer(src), .mask(src)
Modulazioni (il PRIMO argomento è un'altra sorgente): .modulate(src, amount=0.1), .modulateRotate(src, multiple=1, offset=0), .modulateScale(src, multiple=1, offset=1), .modulateScrollX(src, scrollX=0.5, speed=0), .modulateScrollY(src, scrollY=0.5, speed=0), .modulatePixelate(src, multiple=10, offset=3), .modulateKaleid(src, nSides=4), .modulateHue(src, amount=1), .modulateRepeat(src, repeatX=3, repeatY=3)
Uscita: ogni catena DEVE finire con .out()
Animazione: un parametro numerico può essere una funzione: () => time * 0.1 · () => Math.sin(time) * 0.5 (deve restituire un NUMERO)
Webcam e schermo: s0.initCam() accende la webcam, s0.initScreen() cattura una finestra; poi si usano con src(s0). Il browser chiede il permesso. Usali SOLO se lo studente li chiede esplicitamente.
Microfono: se lo studente ha acceso 🎤 MIC, i parametri possono reagire al suono con a.fft[0] (bassi), a.fft[1], a.fft[2], a.fft[3] (acuti), valori circa 0-1. Esempio: .rotate(() => a.fft[0] * 3). Proponilo solo se la richiesta parla di suono, musica o reattività.
VIETATO: initVideo, initImage, render(o1), o1/o2/o3 (usa solo la catena → .out()).

════ STRUDEL (musica) — blocchi marcati \`\`\`strudel ════
(segue il workshop ufficiale di Strudel, adattato a ciò che esiste DAVVERO in questa app)
Partenza: sound("bd hh sd hh") suona campioni · note("c4 e4 g4") suona note · n("0 2 4").scale("C:minor") suona i gradi di una scala · n("0 1 3").sound("jazz") sceglie le varianti di un campione. Usa SEMPRE le virgolette doppie "…".
Tempo: setcpm(…) su una riga sua, in cima. ATTENZIONE: conta i CICLI al minuto, NON i bpm. Per N bpm si scrive setcpm(N/4): 120 bpm → setcpm(120/4), 90 bpm → setcpm(90/4). Il default è 30 (= 120 bpm). MAI setcpm(120): sarebbero 480 bpm.
note() e n() NON sono intercambiabili: note("c3 eb3 g3") vuole NOMI di note (o numeri MIDI fra 36 e 84); n("0 2 4") vuole NUMERI piccoli, i gradi della scala, e per una melodia va SEMPRE seguito da .scale("C:minor"). Mai nomi di note dentro n(…), mai numeri piccoli dentro note(…).

PIÙ PATTERN INSIEME — la regola più importante. In un blocco suona UN SOLO pattern: l'ultimo. Due pattern scritti su righe separate NON suonano insieme: il primo viene ignorato in silenzio. Per farli suonare insieme scrivi $: davanti a OGNI pattern (tutti, nessuno escluso):
$: sound("bd*2, ~ sd")
$: sound("hh*8").gain("[.25 1]*4")
$: note("c2 ~ eb2 g1").sound("sawtooth").lpf(400)
Con _$: al posto di $: quella voce tace. Se lo studente chiede di AGGIUNGERE una voce al suo codice, riscrivi tutto il blocco: il suo pattern con $: davanti, più quello nuovo con $: davanti. Alternative: stack(p1, p2, …) sovrappone pattern separati da virgole; dentro un solo sound("…") la virgola sovrappone sequenze: sound("bd*2, hh*8"). Uno dopo l'altro nel tempo: cat(p1, p2, …).

Suoni per sound(): campioni bd sd sn hh cp lt mt ht perc casio jazz arpy tabla east space crow xbreak1 (xbreak1 = un break di batteria tagliato in 16 segmenti, xbreak1:0 … xbreak1:15: in ordine, uno per sedicesimo, ricompongono il ritmo, che torna a tempo con setcpm(85/4) — es. n("0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15").s("xbreak1"), e mescolando i numeri si inventano ritmi nuovi) dnb1 (un altro break, drum'n'bass, anch'esso in 16 segmenti e a tempo con setcpm(85/4)) sax (note di sassofono lunghe 4 secondi, una per file: sax:0 la, sax:2 si, sax:5 do, sax:9 re, sax:10 mi, sax:14 fa, sax:18 sol; per tagliarle alla durata della nota aggiungi .clip(1)) — sintetizzatori sine triangle sawtooth square supersaw pulse — rumori white pink brown crackle. NESSUN ALTRO: piano, gm_*, oh, rim, rd, cr, metal, insect, wind, numbers, misc qui NON esistono, e .bank(…) NON funziona (nessuna drum machine caricata). Al posto del piano usa triangle; per un basso sawtooth con .lpf(400); per un tappeto supersaw con .attack(0.3). Senza .sound() il suono di default è triangle.

Mini-notazione dentro le virgolette: spazio = sequenza (tutto sta in un ciclo: più elementi = più veloci) · ~ oppure - pausa · [a b] sotto-sequenza in un solo battito, annidabile: [a [b c]] · a*2 più veloce, anche sui gruppi: [a b]*2 · a/2 più lento: [c a f e]/2 dura due cicli · <a b c> uno per ciclo; <a b c d>*4 tiene la velocità fissa anche se aggiungi elementi · virgola = insieme: "hh*8, bd sd", accordi [c3,e3,g3] · a:2 variante 2 del campione · a@3 dura il triplo · a!3 ripete 3 volte senza accelerare · a(3,8) ritmo euclideo · per andare a capo dentro un pattern usa gli apici rovesci al posto delle virgolette. Ogni [ < ( aperta va chiusa.

Note: lettere inglesi con ottava ("c2 e3 g4 b5"), # diesis e b bemolle ("c#4 eb4"), oppure numeri MIDI ("48 52 55 59"). n() + .scale(…) per non sbagliare mai nota; anche la scala può essere un pattern: .scale("<C:major D:mixolydian>/4").
Nomi di scala — SOLO questi, in inglese, e se sono di due parole vanno separate dai DUE PUNTI: major · minor · dorian · phrygian · lydian · mixolydian · locrian · major:pentatonic · minor:pentatonic · harmonic:minor · melodic:minor · major:blues · minor:blues. Si scrivono così: .scale("C:minor"), .scale("A2:minor:pentatonic"), .scale("F:major:blues"). MAI attaccate in una parola sola e MAI in italiano: "minorPentatonic" e "minore" non esistono e lascerebbero la voce MUTA senza dare errore.

Effetti — ogni valore può essere un numero, un pattern fra virgolette o un segnale: .gain(0-1) · .pan(0-1) · .lpf(hz) · .hpf(hz) · .vowel("<a e i o>") · .room(0-2) riverbero · .delay(0-1) eco, oppure .delay("volume:tempo:feedback") es. ".8:.125:.5" · .speed(rate; negativo = al contrario) · .crush(bit) · .chop(n). Con un pattern: .lpf("200 1000 200 1000") · .gain("[.25 1]*4") per gli accenti · .speed("<1 2 -1 -2>").
Inviluppo: .attack(s) .decay(s) .sustain(0-1) .release(s), oppure tutto insieme .adsr(".1:.1:.5:.2").
Segnali continui, scritti SENZA parentesi e SENZA virgolette: sine saw square tri rand perlin — oscillano fra 0 e 1; .range(min, max) li riscala, .slow(n) e .fast(n) ne cambiano la velocità. Esempi: .lpf(sine.range(200, 2000).slow(4)) · .gain(sine) · .pan(rand).

Trasformazioni del pattern: .fast(n) .slow(n), anche con un pattern: .fast("<1 [2 4]>") · .rev() al contrario · .jux(rev) a sinistra l'originale, a destra il modificato · .ply(2) ripete ogni evento · .off(1/8, x => x.…) aggiunge una copia spostata nel tempo e modificata · .sometimes(x => x.…) .often(…) .rarely(…) .every(4, x => x.…) .degrade() .struct("x ~ x x") .euclid(3,8)
Sommare alle note — ATTENZIONE: .add(7) scritto DOPO note(…) o n(…) non fa nulla. Si somma DENTRO la parentesi, sulla stringa: note("c2 [eb3,g3]".add("<0 1 -1>")) · n("0 2 4".add("<0 [0,2,4]>")).scale("C:minor") · n("0 [4 2] 3".off(1/8, x => x.add(4))).scale("C:minor") — oppure, fuori, con .add(note(7)) / .add(n(2)) / .transpose(7).
Armonia: chord("<C Am F G>") scrive gli accordi per sigla (C, Am, G7, Dm7, C^7) e va SEMPRE seguito da .voicing() (l'accordo) oppure .rootNotes(2) (il basso); .arp("0 1 2 1") arpeggia un accordo; .transpose(semitoni) traspone; chord("…").layer(x => x.voicing(), x => x.rootNotes(2)) ricava accordi e basso dalle stesse sigle.
Dentro gli effetti ci vanno NUMERI, mai parole: .gain(0.5) o .gain("0.25 1"), .lpf(800), .delay("0.5:0.125:0.75"). Scritture come .gain("forte"), .lpf("basso"), .delay("volume:0.5:0.75") non danno errore ma l'effetto non si sente.
I DUE MOTORI NON SI MESCOLANO. In un blocco \`\`\`strudel non esistono .out(), osc(), shape(), noise(), src(), kaleid(), modulate(): sono di Hydra, e .out() in un pattern musicale lo rende MUTO. Un pattern Strudel finisce con l'ultimo effetto, senza .out(). Se la richiesta è di suono, scrivi SOLO Strudel; se è di immagine, SOLO Hydra.
VIETATO: samples(), initStrudel(), evaluate(), hush(), import, .bank(), .out(), più pattern su righe separate senza $:, funzioni non in elenco.

FORMATO RISPOSTA: 1-2 frasi di introduzione, poi UN SOLO blocco di codice completo ed eseguibile (max 14 righe, commenti in italiano), poi al massimo 2 frasi sulle righe chiave. Per una richiesta di sola spiegazione, spiega riga per riga senza riscrivere il codice. Se ricevi un messaggio che inizia con [ERRORE], il tuo codice precedente non ha superato la verifica: leggi che cosa dice l'errore, correggi SOLO quello usando le funzioni dell'elenco, e rimanda il blocco completo.`;

  /* few-shot: mostra al modello il formato giusto una volta per motore */
  const FEW_SHOT = (I18N.get('assistant') || {}).fewShot || [
    { role: 'user', content: 'Crea un esempio visuale semplice con delle forme che ruotano.' },
    { role: 'assistant', content: 'Ecco tre forme in rotazione continua, moltiplicate a specchio:\n\n```hydra\n// shape(lati, dimensione, sfocatura)\nshape(3, 0.35, 0.01)\n  .repeat(3, 2)\n  .rotate(() => time * 0.2)   // gira nel tempo\n  .kaleid(4)\n  .out()\n```\n\nProva a cambiare il 3 di `shape()` per avere quadrati o cerchi (numeri alti = cerchio).' },
    { role: 'user', content: 'Fammi un ritmo con basso e batteria.' },
    { role: 'assistant', content: 'Un groove minimale su tre voci, ognuna con il suo `$:` davanti:\n\n```strudel\nsetcpm(30)\n$: sound("bd*2, ~ sd")                // cassa e rullante\n$: sound("hh*8").gain("[.25 1]*4")    // charleston con gli accenti\n$: note("c2 ~ eb2 g1")                // basso\n  .sound("sawtooth").lpf(400)\n```\n\n`$:` fa suonare i pattern insieme: senza, suonerebbe solo l\'ultimo. Prova `_$:` per zittire una voce; `.lpf(400)` scurisce il basso tagliando gli acuti.' },
    /* il caso che sbagliava sempre: aggiungere una voce a codice già scritto */
    { role: 'user', content: 'Aggiungi una melodia a questo codice:\n```strudel\nsound("bd*2, ~ sd")\n```' },
    { role: 'assistant', content: 'Due pattern suonano insieme solo se ognuno ha `$:` davanti, anche quello che avevi già:\n\n```strudel\n$: sound("bd*2, ~ sd")               // il tuo ritmo\n$: n("0 2 4 <7 6>")                  // la melodia nuova\n  .scale("C:minor").sound("triangle")\n  .room(0.4)\n```\n\nCon `n()` e `.scale()` ogni numero è una nota giusta della scala: cambiali a piacere.' },
  ];

  /* ── stato ─────────────────────────────────────────────────────────── */
  let history = [];          // [{role, content}] senza system né few-shot
  let online = false;
  let streaming = null;      // AbortController durante lo streaming
  let autofixLeft = 0;       // tentativi di auto-correzione rimasti

  const drawer   = document.getElementById('ai-drawer');
  const msgsEl   = document.getElementById('ai-messages');
  const inputEl  = document.getElementById('ai-input');
  const sendBtn  = document.getElementById('ai-send');
  const modelSel = document.getElementById('ai-model');
  const dot      = document.getElementById('ai-status-dot');

  /* ── stato server / modelli ────────────────────────────────────────── */
  async function refreshStatus() {
    if (!AI().enabled) {
      inputEl.disabled = true;
      sendBtn.disabled = true;
      inputEl.placeholder = _t('assistente non disponibile in questa versione');
      /* Solo il pallino spento: la spiegazione la dà welcome(), che deve
         parlare per primo (setOffline con un messaggio riempirebbe il
         pannello e welcome() si tirerebbe indietro, vedendolo già pieno).
         E non è un errore da mandare in console: è così per disegno. */
      setOffline();
      welcome();
      return;
    }
    try {
      const r = await fetch(AI().url + '/api/tags', { signal: AbortSignal.timeout(2500) });
      const { models } = await r.json();
      online = true;
      dot.classList.add('online');
      const prev = modelSel.value || localStorage.getItem('livelab-ai-model') || '';
      modelSel.innerHTML = '';
      for (const m of models) {
        const opt = document.createElement('option');
        opt.value = m.name;
        opt.textContent = `${m.name} (${m.details && m.details.parameter_size || '?'})`;
        modelSel.appendChild(opt);
      }
      if (prev && [...modelSel.options].some(o => o.value === prev)) modelSel.value = prev;
      if (!models.length) setOffline(_t('Nessun modello installato: esegui «ollama pull gemma3»'));
    } catch (_) {
      setOffline(_t('Ollama non raggiungibile: apri l\'app Ollama o esegui «ollama serve»'));
    }
  }

  function setOffline(msg) {
    online = false;
    dot.classList.remove('online');
    if (msg && !msgsEl.querySelector('.ai-offline')) {
      const div = document.createElement('div');
      div.className = 'ai-msg bot ai-offline';
      div.textContent = '⚠ ' + msg;
      msgsEl.appendChild(div);
      AppConsole.log('assistente', 'warn', msg);
    }
  }

  modelSel.addEventListener('change', () =>
    localStorage.setItem('livelab-ai-model', modelSel.value));

  /* ── esempi pertinenti dalla libreria (RAG leggero) ────────────────── */
  function relevantSnippets(query) {
    const q = query.toLowerCase();
    const words = q.split(/\W+/).filter(w => w.length > 3);
    const scored = SNIPPETS.map(sn => {
      let score = 0;
      const hay = (sn.title + ' ' + sn.desc + ' ' + sn.code).toLowerCase();
      for (const w of words) if (hay.includes(w)) score++;
      if (/(visual|immagin|imag|hydra|forma|shape|color|caleid|kaleid|calid)/.test(q) && sn.engine === 'hydra') score += 0.5;
      if (/(suon|sound|sonid|music|músic|ritm|rhythm|beat|batter|drum|bater|melod|nota|note|strudel|bass|bajo)/.test(q) && sn.engine === 'strudel') score += 0.5;
      return { sn, score };
    }).filter(x => x.score > 0.5).sort((a, b) => b.score - a.score).slice(0, 3);
    if (!scored.length) return '';
    return '\n\n[' + _t('Esempi di riferimento GIÀ FUNZIONANTI in questa app — usali come modello:') + '\n' +
      scored.map(({ sn }) =>
        `— ${sn.title} (${sn.engine}):\n${sn.code}`).join('\n') + '\n]';
  }

  /* ── rendering dei messaggi ────────────────────────────────────────── */
  function addUserMsg(text) {
    const div = document.createElement('div');
    div.className = 'ai-msg user';
    div.textContent = text;
    msgsEl.appendChild(div);
    scrollDown();
  }

  function addFixNote(text) {
    const div = document.createElement('div');
    div.className = 'ai-msg bot ai-fixnote';
    div.textContent = text;
    msgsEl.appendChild(div);
    scrollDown();
  }

  /* Marcatori che esistono in UN motore solo: servono a correggere l'etichetta
     del blocco quando il modello sbaglia linguaggio. Un modello piccolo scrive
     pattern musicali marcandoli \`\`\`hydra e infilandoci .out(): validati come
     Hydra davano errori di Hydra («sine is not a function»), e l'auto-correzione
     spingeva la risposta ancora più lontano dalla musica. */
  const ONLY_STRUDEL = /^\s*_?\$\s*:|\b(?:setcpm|setcps|sound|note|stack|chord)\s*\(|\.(?:scale|sound|gain|lpf|room|struct|euclid)\s*\(/;
  const ONLY_HYDRA   = /\b(?:osc|voronoi|shape|gradient|solid|src|noise)\s*\([^)]*\)\s*[\s\S]*\.out\s*\(|\b(?:initCam|initScreen|kaleid|modulate|colorama)\b/;

  function detectEngine(lang, code) {
    const tagged = /hydra/i.test(lang) ? 'hydra' : /strudel/i.test(lang) ? 'strudel' : null;
    const strudelish = ONLY_STRUDEL.test(code);
    const hydraish = ONLY_HYDRA.test(code);
    // l'etichetta vale solo se il contenuto non la smentisce
    if (tagged === 'hydra' && strudelish && !hydraish) return 'strudel';
    if (tagged === 'strudel' && hydraish && !strudelish) return 'hydra';
    if (tagged) return tagged;
    if (hydraish) return 'hydra';
    if (strudelish) return 'strudel';
    if (/\.out\s*\(/.test(code)) return 'hydra';
    if (/\b(sound|s|note|n|chord|stack|cat|setcpm)\s*\(/.test(code)) return 'strudel';
    return Editors.lastFocused;
  }

  function extractBlocks(text) {
    const blocks = [];
    const re = /```(\w*)\n?([\s\S]*?)(?:```|$)/g;
    let m;
    while ((m = re.exec(text))) {
      const code = m[2].replace(/\s+$/, '');
      if (code.trim()) blocks.push({ lang: m[1] || '', code, engine: detectEngine(m[1] || '', code) });
    }
    return blocks;
  }

  /** trasforma il testo del modello in DOM: paragrafi + blocchi codice.
      Ritorna i blocchi con il loro badge di verifica da riempire. */
  function renderBotText(container, text) {
    container.innerHTML = '';
    const rendered = [];
    const parts = text.split(/```(\w*)\n?([\s\S]*?)(?:```|$)/g);
    for (let i = 0; i < parts.length; i++) {
      if (i % 3 === 0) {
        const t = parts[i].trim();
        if (t) {
          for (const para of t.split(/\n{2,}/)) {
            const p = document.createElement('p');
            p.textContent = para.replace(/\*\*(.+?)\*\*/g, '$1');
            container.appendChild(p);
          }
        }
      } else if (i % 3 === 2) {
        const code = parts[i].replace(/\s+$/, '');
        if (!code.trim()) continue;
        const engine = detectEngine(parts[i - 1] || '', code);
        const box = document.createElement('div');
        box.className = 'ai-code';
        const pre = document.createElement('pre');
        pre.textContent = code;
        const bar = document.createElement('div');
        bar.className = 'ai-code-bar';
        const lab = document.createElement('span');
        lab.className = 'label-txt';
        lab.textContent = engine === 'hydra' ? _t('visuale · hydra') : _t('suono · strudel');
        const verify = document.createElement('span');
        verify.className = 'ai-verify';
        verify.dataset.help = _t('Verifica|Open Live Lab prova davvero ogni codice proposto dall\'assistente: ✓ significa che gira senza errori, ✕ che la correzione automatica non è bastata.');
        const tryBtn = document.createElement('button');
        tryBtn.className = 'btn btn-mini';
        tryBtn.textContent = _t('▶ PROVA');
        tryBtn.dataset.help = _t('Prova|Esegue subito questo codice, senza toccare i tuoi editor.');
        tryBtn.addEventListener('click', async () => {
          const res = await Engines.run(engine, code);
          tryBtn.textContent = res.ok ? _t('▶ OK!') : _t('✕ ERRORE');
          if (!res.ok) {
            tryBtn.title = res.error;
            AppConsole.log('assistente', 'err', res.error);
          }
          setTimeout(() => { tryBtn.textContent = _t('▶ PROVA'); }, 1600);
        });
        const insBtn = document.createElement('button');
        insBtn.className = 'btn btn-mini';
        insBtn.textContent = _t('INSERISCI');
        insBtn.dataset.help = _t('Inserisci|Copia questo codice nell\'editor corrispondente del LAB, così puoi modificarlo.');
        insBtn.addEventListener('click', () => {
          Editors.insert(engine, code);
          insBtn.textContent = _t('✓ FATTO');
          setTimeout(() => { insBtn.textContent = _t('INSERISCI'); }, 1600);
        });
        const spacer = document.createElement('span');
        spacer.className = 'editor-spacer';
        bar.append(lab, verify, spacer, tryBtn, insBtn);
        box.append(pre, bar);
        container.appendChild(box);
        rendered.push({ engine, code, verify });
      }
    }
    return rendered;
  }

  function scrollDown() { msgsEl.scrollTop = msgsEl.scrollHeight; }

  /* ── invio, streaming, validazione, auto-correzione ────────────────── */
  async function send(promptText, opts = {}) {
    const text = (promptText || inputEl.value).trim();
    if (!text || streaming) return;
    /* anche il «? SPIEGA» della console passa di qui, e non è un bottone
       che possiamo disabilitare: la guardia va messa sull'invio. */
    if (!AI().enabled) { refreshStatus(); return; }
    if (!opts.silentUser) {
      inputEl.value = '';
      addUserMsg(text);
      autofixLeft = MAX_AUTOFIX;      // nuova richiesta → nuovi tentativi
    }
    history.push({ role: 'user', content: text });
    if (history.length > 16) history = history.slice(-16);

    const botDiv = document.createElement('div');
    botDiv.className = 'ai-msg bot';
    botDiv.innerHTML = '<span class="ai-thinking"></span>';
    botDiv.firstChild.textContent = _t('l\'assistente scrive…');
    msgsEl.appendChild(botDiv);
    scrollDown();

    streaming = new AbortController();
    sendBtn.textContent = _t('FERMA');
    sendBtn.classList.add('active-visual');

    /* contesto: esempi pertinenti agganciati all'ULTIMO messaggio utente */
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...FEW_SHOT,
      ...history.slice(0, -1),
      { role: 'user', content: text + (opts.silentUser ? '' : relevantSnippets(text)) },
    ];

    let full = '';
    let aborted = false;
    try {
      const res = await fetch(AI().url + '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: streaming.signal,
        body: JSON.stringify({
          model: modelSel.value || AI().model,
          stream: true,
          options: { temperature: 0.4, num_ctx: 8192 },
          messages,
        }),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = '';
      let lastPaint = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop();
        for (const line of lines) {
          if (!line.trim()) continue;
          const o = JSON.parse(line);
          if (o.message && o.message.content) full += o.message.content;
          if (o.done) buf = '';
        }
        const now = performance.now();
        if (now - lastPaint > 120) {
          botDiv.textContent = full;    // durante lo streaming: testo grezzo
          scrollDown();
          lastPaint = now;
        }
      }
      history.push({ role: 'assistant', content: full });
    } catch (e) {
      if (e.name === 'AbortError') {
        aborted = true;
        if (full) history.push({ role: 'assistant', content: full });
      } else {
        full += (full ? '\n\n' : '') + '⚠ ' + _t('Errore di connessione a Ollama: {msg}', { msg: e.message });
        AppConsole.log('assistente', 'err', _t('connessione a Ollama fallita: {msg}', { msg: e.message }));
        setOffline();
        refreshStatus();
      }
    } finally {
      streaming = null;
      sendBtn.textContent = _t('INVIA');
      sendBtn.classList.remove('active-visual');
    }

    const rendered = renderBotText(botDiv, full || '⚠ ' + _t('nessuna risposta'));
    scrollDown();
    if (aborted) return;

    /* ── verifica reale dei blocchi + auto-correzione ─────────────────── */
    let firstError = null;
    for (const b of rendered) {
      const check = await Engines.validate(b.engine, b.code);
      if (check.ok) {
        b.verify.textContent = '✓ ' + _t('verificato');
        b.verify.classList.add('ok');
      } else {
        b.verify.textContent = '✕ ' + (autofixLeft > 0 ? _t('correggo…') : _t('non verificato'));
        b.verify.classList.add('err');
        b.verify.title = check.error;
        if (!firstError) firstError = { block: b, error: check.error };
      }
    }

    if (firstError && autofixLeft > 0) {
      autofixLeft--;
      AppConsole.log('assistente', 'warn',
        _t('codice proposto non valido ({error}) — correzione automatica in corso', { error: firstError.error }));
      addFixNote('⚙ ' + _t('Ho verificato il codice: c\'è un errore, chiedo subito la correzione…'));
      /* il marcatore [ERRORE] resta uguale in tutte le lingue: il system
         prompt (anche quelli tradotti) lo cita alla lettera */
      await send(
        '[ERRORE] ' + _t('Il codice {engine} che hai proposto non funziona: {error}. Ricontrolla l\'elenco delle funzioni disponibili nel tuo ruolo e rimanda il blocco completo corretto.',
          { engine: firstError.block.engine, error: firstError.error }),
        { silentUser: true });
    } else if (firstError) {
      AppConsole.log('assistente', 'err',
        _t('codice dell\'assistente non verificato: {error}', { error: firstError.error }),
        _t('Puoi comunque premere ▶ PROVA, o chiedere all\'assistente di riprovare con parole diverse.'));
    }
  }

  sendBtn.addEventListener('click', () => {
    if (streaming) { streaming.abort(); return; }
    send();
  });
  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });

  /* chip di suggerimento */
  document.querySelectorAll('.ai-chip').forEach(chip => {
    chip.addEventListener('click', async () => {
      let p = chip.dataset.prompt;
      if (p === '__EXPLAIN__') {
        const engine = Editors.lastFocused;
        const code = Editors.getCode(engine);
        const name = engine === 'hydra' ? 'Hydra' : 'Strudel';
        /* prima di spiegare, verifica che il codice funzioni davvero */
        const check = await Engines.validate(engine, code);
        if (check.ok) {
          p = _t('Ho verificato questo codice {name}: funziona. Spiegalo riga per riga, in modo semplice:', { name }) +
            `\n\`\`\`${engine}\n${code}\n\`\`\``;
        } else {
          AppConsole.log('assistente', 'warn',
            _t('il codice {engine} da spiegare contiene un errore: {error}', { engine, error: check.error }));
          p = _t('Ho verificato questo codice {name} e NON funziona. L\'errore è: "{error}".', { name, error: check.error }) +
            `\n\`\`\`${engine}\n${code}\n\`\`\`\n` +
            _t('Spiega in modo semplice dove sta il problema e perché, poi mostra il blocco completo corretto.');
        }
      }
      send(p);
    });
  });

  /* ── "? SPIEGA" dalla console: spiega un errore con il suo contesto ── */
  function explainConsoleError({ source, text, hint, engine, code }) {
    if (streaming) {
      AppConsole.log('assistente', 'warn', _t('sto ancora rispondendo: riprova tra un attimo'));
      return;
    }
    /* se il log non porta il codice ma sappiamo il motore, prendi
       quello attualmente nell'editor corrispondente */
    if (!code && engine) code = Editors.getCode(engine);
    let p = _t('Nella console di Open Live Lab è apparso questo errore (sezione {section}):',
      { section: source ? source.toUpperCase() : _t('sconosciuta') }) + `\n"${text}"`;
    if (hint) p += '\n(' + _t('La console suggerisce: {hint}', { hint }) + ')';
    if (code) p += '\n\n' + _t('Il codice era:') + `\n\`\`\`${engine}\n${code}\n\`\`\``;
    p += '\n\n' + _t('Spiega a uno studente, in modo semplice: che cosa significa l\'errore, qual è la causa probabile e come si corregge.') +
      (code ? ' ' + _t('Mostra il blocco completo corretto.') : '');
    send(p);
  }

  /* messaggio di benvenuto */
  function welcome() {
    if (msgsEl.childElementCount) return;
    const div = document.createElement('div');
    div.className = 'ai-msg bot';
    renderBotText(div, AI().enabled
      ? _t(`Ciao! Sono l'assistente di Open Live Lab e giro interamente su questo computer, con Ollama.
        Chiedimi un esempio («crea un caleidoscopio blu», «fai un ritmo veloce»), una variazione del tuo codice, o una spiegazione.
        Verifico davvero ogni codice che ti propongo: cerca il segno ✓ accanto ai blocchi.`).replace(/\s+/g, ' ')
      : _t(`L'assistente AI gira su Ollama, un programma che sta sul computer di chi tiene il laboratorio:
        in questa versione online non è disponibile.
        Trovi comunque una libreria di esempi commentati in ESEMPI, e la CONSOLE ti spiega gli errori in italiano.`).replace(/\s+/g, ' '));
    msgsEl.appendChild(div);
  }

  return {
    open() {
      drawer.hidden = false;
      welcome();
      refreshStatus();
      inputEl.focus();
    },
    close() { drawer.hidden = true; },
    get isOpen() { return !drawer.hidden; },
    refreshStatus,
    explainConsoleError,
  };
})();
