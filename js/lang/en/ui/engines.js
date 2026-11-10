/* Frasi dell'interfaccia — English.
   Sorgenti: js/engines.js, js/instruments.js, js/highlight.js
   (instruments.js e highlight.js non hanno frasi per l'utente).
   I messaggi di verifica di Strudel tornano anche all'assistente AI per
   l'auto-correzione: i nomi di funzioni, suoni e scale restano come sono. */

I18N.add('en', {
  'Il browser sta per chiederti il permesso di usare la webcam.':
    'Your browser is about to ask for permission to use the webcam.',
  'Il browser sta per chiederti quale schermo o finestra condividere.':
    'Your browser is about to ask which screen or window to share.',
  'Serve al codice per usarla come sorgente della visuale. Le immagini restano su questo computer: non vengono registrate né inviate a nessuno.':
    'The code needs it as a source for the visual. The images stay on this computer: they are not recorded or sent to anyone.',
  'campioni audio non caricati (bd, sd, hh… non suoneranno)':
    'audio samples not loaded (bd, sd, hh… will not play)',
  'Avvia l\'app con ./start.sh: i campioni hanno bisogno del server locale.':
    'Start the app with ./start.sh: the samples need the local server.',
  'Ricarica la pagina; se il problema resta, la cartella samples/ non è stata caricata sul server.':
    'Reload the page; if the problem persists, the samples/ folder was not uploaded to the server.',
  'Strudel non inizializzato: {error}':
    'Strudel not initialized: {error}',
  'una funzione () => … non restituisce un numero':
    'a () => … function does not return a number',
  'Scrivi $: davanti a OGNI pattern, ognuno sulla sua riga (esempio: «$: sound("bd*4")» e, a capo, «$: note("c2 g2")»), oppure uniscili in un solo stack(p1, p2)':
    'Write $: in front of EVERY pattern, each on its own line (example: “$: sound("bd*4")” and, on a new line, “$: note("c2 g2")”), or combine them into a single stack(p1, p2)',
  'il pattern «{head}…» non ha $: davanti: quando nel codice c\'è almeno un $:, i pattern senza $: non suonano. {fix}':
    'the pattern “{head}…” has no $: in front: when the code contains at least one $:, patterns without $: do not play. {fix}',
  'ci sono {n} pattern separati senza $: — così suona solo l\'ultimo e gli altri vengono ignorati in silenzio. {fix}':
    'there are {n} separate patterns without $: — this way only the last one plays and the others are silently ignored. {fix}',
  'mini-notazione non valida in "{str}"{found}: controlla che ogni [ < ( sia chiusa e che non ci siano simboli fuori posto':
    'invalid mini-notation in "{str}"{found}: check that every [ < ( is closed and that there are no stray symbols',
  '(trovato {what} dove non ci va)':
    '(found {what} where it does not belong)',
  'la scala "{str}" non esiste: la voce resterebbe muta, senza errori. I nomi vanno scritti in minuscolo e separati dai due punti — {hint}. Esempi giusti: .scale("C:minor"), .scale("A2:minor:pentatonic"), .scale("D:dorian")':
    'the scale "{str}" does not exist: the voice would stay silent, with no error. Names are written in lowercase and separated by colons — {hint}. Correct examples: .scale("C:minor"), .scale("A2:minor:pentatonic"), .scale("D:dorian")',
  '.{fx}("{str}") contiene parole ({words}) dove ci vanno NUMERI: l\'effetto non si sentirebbe. Scrivi dei numeri, es. .{fx}(0.5) oppure .{fx}("0.25 1")':
    '.{fx}("{str}") contains words ({words}) where NUMBERS belong: the effect would not be heard. Write numbers, e.g. .{fx}(0.5) or .{fx}("0.25 1")',
  'in .delay("a:b:c") a=volume b=tempo c=feedback, tutti numeri: .delay("0.5:0.125:0.75")':
    'in .delay("a:b:c") a=volume b=time c=feedback, all numbers: .delay("0.5:0.125:0.75")',
  'setcpm({n}) sono {cycles} CICLI al minuto, cioè {bpm} bpm: troppo veloce. setcpm NON conta i bpm: per N bpm si scrive setcpm(N/4), es. setcpm(120/4)':
    'setcpm({n}) is {cycles} CYCLES per minute, i.e. {bpm} bpm: too fast. setcpm does NOT count bpm: for N bpm write setcpm(N/4), e.g. setcpm(120/4)',
  'n("{str}") contiene nomi di note ({names}): n() vuole NUMERI, i gradi della scala — n("0 2 4").scale("C:minor"). Per i nomi delle note si usa note("{names}")':
    'n("{str}") contains note names ({names}): n() wants NUMBERS, the scale degrees — n("0 2 4").scale("C:minor"). For note names use note("{names}")',
  'n("{str}") senza .scale(…) non cambia l\'altezza: suonerebbe sempre la stessa nota. Aggiungi .scale("C:minor") subito dopo n(…), oppure usa note("c3 e3 g3")':
    'n("{str}") without .scale(…) does not change the pitch: it would always play the same note. Add .scale("C:minor") right after n(…), or use note("c3 e3 g3")',
  'note("{str}") contiene numeri piccoli ({nums}): in note() i numeri sono note MIDI (48 = c3, 60 = c4) e sotto 12 non si sentono. Per i gradi della scala si usa n("{nums}").scale("C:minor"); altrimenti scrivi i nomi: note("c2 eb2 g2")':
    'note("{str}") contains small numbers ({nums}): in note() numbers are MIDI notes (48 = c3, 60 = c4) and below 12 they are inaudible. For scale degrees use n("{nums}").scale("C:minor"); otherwise write the names: note("c2 eb2 g2")',
  '.out() è di Hydra (le visuali), non di Strudel: in un pattern musicale non serve e lo rende muto. Toglilo e lascia che la catena finisca con l\'ultimo effetto':
    '.out() belongs to Hydra (the visuals), not Strudel: in a musical pattern it is not needed and makes it silent. Remove it and let the chain end with the last effect',
  '.bank() non è disponibile in Open Live Lab (nessuna drum machine caricata): toglilo, i suoni bd sd hh cp… suonano già senza':
    '.bank() is not available in Open Live Lab (no drum machine loaded): remove it, the sounds bd sd hh cp… already play without it',
  '"{name}" non esiste in Strudel':
    '"{name}" does not exist in Strudel',
  '"{name}" esiste in Strudel ma NON come .{name}() applicato a un pattern: così non funziona':
    '"{name}" exists in Strudel but NOT as .{name}() applied to a pattern: it does not work this way',
  '".{name}()" non esiste in Strudel':
    '".{name}()" does not exist in Strudel',
  'suoni inesistenti: {bad} — disponibili: bd sd sn hh cp lt mt ht perc casio jazz arpy tabla east space crow xbreak1 dnb1 sax + sine triangle sawtooth square supersaw pulse + white pink brown crackle + {instruments}':
    'unknown sounds: {bad} — available: bd sd sn hh cp lt mt ht perc casio jazz arpy tabla east space crow xbreak1 dnb1 sax + sine triangle sawtooth square supersaw pulse + white pink brown crackle + {instruments}',
});
