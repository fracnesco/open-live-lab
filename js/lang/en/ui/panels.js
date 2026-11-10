/* Frasi dell'interfaccia — inglese: i pannelli. js/score.js e
   js/scoreview.js (SPARTITO), js/library.js (SUONI: etichette, banchi,
   sintetici), js/board.js (LAVAGNA, con gli errori di api/board.php).
   Chiave = la frase italiana. */

I18N.add('en', {
  /* js/score.js — avvisi dello spartito */
  "n(…) da solo non ha un'altezza: aggiungi .scale(\"C:major\") per trasformare i numeri in note.":
    "n(…) on its own has no pitch: add .scale(\"C:major\") to turn the numbers into notes.",
  "Alcune altezze non sono semitoni esatti: sono arrotondate alla nota più vicina.":
    "Some pitches are not exact semitones: they are rounded to the nearest note.",
  "{n} eventi senza nota né suono non sono rappresentati.":
    "{n} events with neither a note nor a sound are not shown.",
  "Troppe note sovrapposte: {n} eventi non entrano nelle {max} voci rappresentabili.":
    "Too many overlapping notes: {n} events don't fit in the {max} voices that can be shown.",
  "Battuta {n}: ritmo troppo fitto per essere scritto esattamente — approssimato alla semicroma.":
    "Bar {n}: rhythm too dense to write exactly — rounded to the sixteenth note.",

  /* js/scoreview.js — il pannello SPARTITO */
  "Strudel non è partito: ricarica la pagina.": "Strudel didn't start: reload the page.",
  "il codice non produce un pattern": "the code doesn't produce a pattern",
  "Lo spartito non si può disegnare: {err}": "The score can't be drawn: {err}",
  "spartito · {label}": "score · {label}",
  "spartito · suono": "score · sound",
  "Scrivi un pattern nell'editor SUONO — per esempio note(\"c4 e4 g4 b4\") — e premi ↻ AGGIORNA.":
    "Write a pattern in the SOUND editor — for example note(\"c4 e4 g4 b4\") — and press ↻ REFRESH.",
  "leggo il pattern…": "reading the pattern…",
  "Strudel non risponde: premi ▶ ESEGUI una volta (il browser attiva l'audio solo dopo un clic) e riprova.":
    "Strudel isn't responding: press ▶ RUN once (the browser only enables audio after a click) and try again.",
  "Il codice ha un errore, quindi lo spartito non è aggiornato: {err}":
    "The code has an error, so the score is not up to date: {err}",
  "Il pattern produce {n} eventi in {cycles} cicli: troppo fitto per uno spartito leggibile.":
    "The pattern produces {n} events in {cycles} cycles: too dense for a readable score.",
  "La libreria dello spartito (abcjs) non si è caricata.":
    "The score library (abcjs) didn't load.",
  "Il pattern non produce eventi nei primi cicli: non c'è niente da scrivere.":
    "The pattern produces no events in the first cycles: there is nothing to write.",
  "1 battuta = 1 ciclo": "1 bar = 1 cycle",
  "{n} battute = {n} cicli": "{n} bars = {n} cycles",
  "ciclo {n}": "cycle {n}",
  "cicli {from}–{to}": "cycles {from}–{to}",
  "percussioni: {list}": "percussion: {list}",
  "■ fermo — premi ▶ ESEGUI sul suono e il puntatore segue la musica":
    "■ stopped — press ▶ RUN on the sound and the cursor follows the music",
  "sta suonando un codice diverso da questo spartito — premi ▶ ESEGUI per riallinearli":
    "the code playing is different from this score — press ▶ RUN to bring them back in line",
  "▶ cicli {from}–{to}: il pattern qui tace — lo spartito mostra la pagina di prima":
    "▶ cycles {from}–{to}: the pattern is silent here — the score shows the previous page",
  "▶ battuta {n} di {tot}": "▶ bar {n} of {tot}",

  /* js/library.js — il pannello SUONI: etichette */
  "batteria": "drums",
  "I pezzi di una batteria: cassa, rullante, piatti, tom, mani.":
    "The pieces of a drum kit: kick, snare, cymbals, toms, claps.",
  "cassa": "kick",
  "Il colpo grave che tiene il battito: di solito sui tempi forti.":
    "The low hit that keeps the beat: usually on the strong beats.",
  "rullante": "snare",
  "Il colpo secco che risponde alla cassa, di solito sul 2 e sul 4.":
    "The sharp hit that answers the kick, usually on 2 and 4.",
  "piatti": "cymbals",
  "Suoni metallici: il charleston che scandisce il tempo, il crash per gli accenti.":
    "Metallic sounds: the hi-hat that marks time, the crash for accents.",
  "tom": "toms",
  "Tamburi intonati della batteria: grave, medio, acuto. Perfetti per i passaggi (fill).":
    "The tuned drums of the kit: low, mid, high. Perfect for fills.",
  "mani": "claps",
  "Il battito di mani.": "A hand clap.",
  "percussioni": "percussion",
  "Colpi di legno, pelle e metallo fuori dalla batteria classica.":
    "Hits of wood, skin and metal from outside the standard drum kit.",
  "mondo": "world",
  "Strumenti di altre tradizioni: la tabla indiana, le percussioni giapponesi.":
    "Instruments from other traditions: the Indian tabla, Japanese percussion.",
  "intonato": "pitched",
  "Ha un'altezza precisa, quindi si presta alle melodie. Un campione sale di un'ottava con .speed(2); un sintetizzatore suona la nota che gli dai con note().":
    "Has a definite pitch, so it works for melodies. A sample goes up an octave with .speed(2); a synth plays the note you give it with note().",
  "elettronico": "electronic",
  "Suoni nati da circuiti e tastierine, non da uno strumento acustico.":
    "Sounds born from circuits and toy keyboards, not from an acoustic instrument.",
  "effetti": "effects",
  "Rumori e suoni strani: per colorare, non per tenere il tempo.":
    "Noises and odd sounds: for color, not for keeping time.",
  "animali": "animals",
  "Versi di animali.": "Animal calls.",
  "lungo": "long",
  "Risuona a lungo (quasi un secondo, o più): con colpi ravvicinati i suoni si sovrappongono.":
    "Rings for a long time (almost a second, or more): with hits close together the sounds overlap.",
  "break": "break",
  "Un ritmo di batteria registrato e tagliato in segmenti: rimessi in fila ricompongono il ritmo, mescolati ne inventano di nuovi.":
    "A recorded drum rhythm cut into segments: put back in order they rebuild the rhythm, shuffled they invent new ones.",
  "sintetizzatore": "synth",
  "Nessuna registrazione: il suono lo genera al momento un oscillatore. Dura quanto la nota e si intona con note().":
    "No recording: an oscillator generates the sound on the spot. It lasts as long as the note and is tuned with note().",
  "rumore": "noise",
  "Un fruscio senza altezza. Corto e filtrato (.hpf, .lpf) diventa un charleston o un rullante sintetico.":
    "A hiss with no pitch. Short and filtered (.hpf, .lpf) it becomes a synthetic hi-hat or snare.",

  /* js/library.js — i nomi delle note del sax */
  "la": "A",
  "si": "B",
  "si♭": "B♭",
  "do": "C",
  "do♯": "C♯",
  "re": "D",
  "mi": "E",
  "mi♭": "E♭",
  "fa": "F",
  "fa♯": "F♯",
  "sol": "G",
  "sol♯": "G♯",

  /* js/library.js — i banchi di campioni */
  "La cassa: il colpo grave, il battito del ritmo.":
    "The kick: the low hit, the beat of the rhythm.",
  "Il rullante: il colpo secco che risponde alla cassa.":
    "The snare: the sharp hit that answers the kick.",
  "Un altro rullante, più corto e asciutto.": "Another snare, shorter and drier.",
  "Piatti: il charleston chiuso (hh:0), un crash e due colpi che risuonano.":
    "Cymbals: the closed hi-hat (hh:0), a crash and two ringing hits.",
  "Il tom grave.": "The low tom.",
  "Il tom medio.": "The mid tom.",
  "Il tom acuto.": "The high tom.",
  "Piccole percussioni per arricchire il ritmo.": "Small percussion to enrich the rhythm.",
  "Una tastierina Casio: nota acuta, nota grave, rumore.":
    "A little Casio keyboard: high note, low note, noise.",
  "Una batteria jazz: cassa, campanaccio, un effetto, charleston.":
    "A jazz kit: kick, cowbell, an effect, hi-hat.",
  "Una nota pizzicata, in quattro altezze diverse.":
    "A plucked note, at four different pitches.",
  "La tabla indiana: colpi gravi che risuonano a lungo.":
    "The Indian tabla: low hits that ring for a long time.",
  "Percussioni giapponesi: un blocco di legno e il tamburo ohkawa.":
    "Japanese percussion: a wood block and the ohkawa drum.",
  "Suoni spaziali, elettronici.": "Spacey, electronic sounds.",
  "Il verso di un corvo.": "A crow's caw.",
  "Un break di batteria in 16 segmenti. In ordine, uno per sedicesimo, ricompongono il ritmo: n(\"0 1 2 … 15\").s(\"xbreak1\") con setcpm(85/4). Mescola i numeri per inventarne uno nuovo.":
    "A drum break in 16 segments. In order, one per sixteenth, they rebuild the rhythm: n(\"0 1 2 … 15\").s(\"xbreak1\") with setcpm(85/4). Shuffle the numbers to invent a new one.",
  "Un break drum'n'bass in 16 segmenti, come xbreak1: in ordine con setcpm(85/4) ricompone il ritmo. A setcpm(170/4) bastano i primi 8 per una battuta: n(\"0 1 2 3 4 5 6 7\").s(\"dnb1\") è il two-step.":
    "A drum'n'bass break in 16 segments, like xbreak1: in order with setcpm(85/4) it rebuilds the rhythm. At setcpm(170/4) the first 8 fill a bar: n(\"0 1 2 3 4 5 6 7\").s(\"dnb1\") is the two-step.",
  "Note di sassofono, una per file, lunghe 4 secondi: .clip(1) le taglia alla durata della nota. I file con il 2 sono una seconda ripresa della stessa nota.":
    "Saxophone notes, one per file, 4 seconds long: .clip(1) cuts them to the length of the note. The files with a 2 are a second take of the same note.",

  /* js/library.js — i suoni sintetici */
  "puro, morbido": "pure, soft",
  "L'onda sinusoidale: un solo suono puro, senza armonici. Morbida, quasi un fischio; in basso diventa un sub-basso. Si scrive anche \"sin\".":
    "The sine wave: a single pure tone, no harmonics. Soft, almost a whistle; down low it becomes a sub-bass. Can also be written \"sin\".",
  "dolce": "gentle",
  "L'onda triangolare: pochi armonici, un suono dolce che ricorda un flauto. È il suono di Strudel quando non scrivi .s(). Si scrive anche \"tri\".":
    "The triangle wave: few harmonics, a gentle sound like a flute. It's Strudel's sound when you don't write .s(). Can also be written \"tri\".",
  "brillante": "bright",
  "L'onda a dente di sega: piena di armonici, brillante e ronzante. Con .lpf() si scurisce: è il classico basso e il suono acid. Si scrive anche \"saw\".":
    "The sawtooth wave: full of harmonics, bright and buzzy. With .lpf() it gets darker: it's the classic bass and the acid sound. Can also be written \"saw\".",
  "da videogioco": "video-game",
  "L'onda quadra: salta fra due valori. Un suono vuoto e nasale, quello dei vecchi videogiochi. Si scrive anche \"sqr\".":
    "The square wave: it jumps between two values. A hollow, nasal sound, the one from old video games. Can also be written \"sqr\".",
  "quadra con .pw()": "square with .pw()",
  "L'onda a impulsi: di base è una quadra, ma .pw() cambia quanto resta in alto (fra 0 e 1). Con .pw(0.1) diventa sottile e nasale.":
    "The pulse wave: basically a square, but .pw() changes how long it stays high (between 0 and 1). With .pw(0.1) it becomes thin and nasal.",
  "grosso, largo": "big, wide",
  "Cinque denti di sega leggermente stonati fra loro, suonati insieme: un suono largo e grosso, da tappeto o da accordi. .detune() li allontana, .unison() ne cambia il numero.":
    "Five sawtooths slightly out of tune with each other, played together: a wide, big sound for pads or chords. .detune() spreads them apart, .unison() changes how many.",
  "cassa sintetica": "synth kick",
  "Una cassa fatta al momento: un'onda che parte acuta e precipita verso il grave. .decay() la allunga, .penv() cambia quanto parte in alto.":
    "A kick made on the spot: a wave that starts high and drops towards the low end. .decay() makes it longer, .penv() changes how high it starts.",
  "tutte le frequenze": "all frequencies",
  "Il rumore bianco: tutte le frequenze alla stessa forza, un soffio aspro. Corto e filtrato, s(\"white\").decay(0.05).sustain(0).hpf(8000), fa un charleston.":
    "White noise: all frequencies at the same strength, a harsh hiss. Short and filtered, s(\"white\").decay(0.05).sustain(0).hpf(8000) makes a hi-hat.",
  "più morbido": "softer",
  "Il rumore rosa: più forte sui gravi, quindi meno aspro del bianco. Somiglia alla pioggia.":
    "Pink noise: stronger in the low end, so less harsh than white. It sounds like rain.",
  "cupo, come il mare": "dark, like the sea",
  "Il rumore marrone: quasi solo gravi, un brontolio cupo come il mare o il vento.":
    "Brown noise: almost only low end, a dark rumble like the sea or the wind.",
  "scoppiettii": "crackles",
  "Scoppiettii sparsi, come un disco in vinile o il fuoco. .density() ne cambia il numero.":
    "Scattered crackles, like a vinyl record or a fire. .density() changes how many.",
  "sintetizzatori": "synths",
  "Sintetizzatori: nessun file, il suono lo genera un oscillatore. Durano quanto la nota; .attack() e .release() lo fanno entrare e uscire piano.":
    "Synths: no file, an oscillator generates the sound. They last as long as the note; .attack() and .release() fade it in and out.",
  "rumori": "noises",
  "Rumori: niente altezza, solo fruscio. Con un inviluppo corto, .decay(0.05).sustain(0), e un filtro diventano percussioni.":
    "Noises: no pitch, just hiss. With a short envelope, .decay(0.05).sustain(0), and a filter they become percussion.",

  /* js/library.js — il pannello */
  "non trovato": "not found",
  "il campione {id} non si carica ({err})": "the sample {id} won't load ({err})",
  "Se succede con tutti i campioni, la cartella samples/ non è raggiungibile.":
    "If it happens with every sample, the samples/ folder can't be reached.",
  "il sintetizzatore {id} non suona ({err})": "the synth {id} won't play ({err})",
  "Ricarica la pagina: i sintetizzatori li prepara Strudel all'avvio.":
    "Reload the page: Strudel sets up the synths at startup.",
  "Clicca per mostrare solo questi suoni; accendendo più etichette restano i suoni che le hanno tutte.":
    "Click to show only these sounds; with several tags on, only the sounds that have all of them remain.",
  "✕ tutte": "✕ all",
  "Tutte|Spegne le etichette e torna a mostrare tutti i suoni.":
    "All|Turns the tags off and shows every sound again.",
  "Passa sopra per vedere la forma dell'onda, clicca per sentirne una nota. Nel codice: {code}.":
    "Hover to see the shape of the wave, click to hear a note. In code: {code}.",
  "Passa sopra per vedere la forma d'onda, clicca per ascoltarlo (un altro clic lo ferma).":
    "Hover to see the waveform, click to listen (another click stops it).",
  "Nel codice: s(\"{id}\") oppure s(\"{bank}\"). File: {file}.":
    "In code: s(\"{id}\") or s(\"{bank}\"). File: {file}.",
  "Nel codice: s(\"{id}\"). File: {file}.": "In code: s(\"{id}\"). File: {file}.",
  "Nel codice al posto dei puntini va il nome, es. {example}.":
    "In code the name goes in place of the dots, e.g. {example}.",
  "Un banco di campioni.": "A sample bank.",
  "Nel codice si scrive s(\"{bank}\"); con i due punti scegli quale: s(\"{bank}:1\") è il secondo.":
    "In code you write s(\"{bank}\"); the colon picks which one: s(\"{bank}:1\") is the second.",
  "{n} di {tot} suoni": "{n} of {tot} sounds",
  "{files} campioni in {banks} banchi · {synths} sintetici":
    "{files} samples in {banks} banks · {synths} synthetic",
  "carico l'elenco…": "loading the list…",
  "elenco dei campioni non disponibile": "sample list not available",
  "non riesco a leggere samples/strudel.json: {err}": "can't read samples/strudel.json: {err}",
  "Avvia l'app con ./start.sh.": "Start the app with ./start.sh.",
  "Ricarica la pagina.": "Reload the page.",

  /* js/board.js — errori di api/board.php, tradotti per mostrarli */
  "cartella dati non creabile": "data folder can't be created",
  "scrittura fallita": "write failed",
  "salvataggio fallito": "save failed",
  "password docente non configurata: crea api/secret.php":
    "teacher password not set up: create api/secret.php",
  "password docente errata": "wrong teacher password",
  "metodo non consentito": "method not allowed",
  "codice vuoto": "empty code",
  "identificativo mancante": "missing identifier",
  "troppi invii in un minuto, riprova fra poco":
    "too many submissions in a minute, try again shortly",
  "azione sconosciuta": "unknown action",

  /* js/board.js — la LAVAGNA */
  "lavagna non raggiungibile: {err}": "board unreachable: {err}",
  "Le schede già ricevute restano visibili. Riprovo da solo.":
    "Cards already received stay visible. I'll keep retrying.",
  "senza titolo": "untitled",
  "docente": "teacher",
  "scrivi prima il tuo nome": "write your name first",
  "LAVAGNA {n}": "BOARD {n}",
  "LAVAGNA": "BOARD",
  "SUONO": "SOUND",
  "VISUALE": "VISUAL",
  "anonimo": "anonymous",
  "CARICA NELL'EDITOR": "LOAD INTO EDITOR",
  "Carica|Mette questo codice nel tuo editor. Non parte da solo: lo esegui tu con ▶ ESEGUI, dopo averlo letto.":
    "Load|Puts this code in your editor. It doesn't start by itself: you run it with ▶ RUN, after reading it.",
  "codice caricato nell'editor SUONO — premi ▶ ESEGUI per provarlo":
    "code loaded into the SOUND editor — press ▶ RUN to try it",
  "codice caricato nell'editor VISUALE — premi ▶ ESEGUI per provarlo":
    "code loaded into the VISUAL editor — press ▶ RUN to try it",
  "Aggiungi alla timeline|Accoda questo codice come clip alla traccia giusta.":
    "Add to timeline|Appends this code as a clip to the right track.",
  "→ METTI IN LAVAGNA": "→ PUT ON BOARD",
  "Metti in lavagna|Rende questo lavoro visibile a tutta la classe.":
    "Put on board|Makes this work visible to the whole class.",
  "esempio": "example",
  "«{name}» è ora in lavagna per tutti": "“{name}” is now on the board for everyone",
  "Togli|Rimuove la scheda dalla lavagna di tutti.":
    "Remove|Takes the card off everyone's board.",
  "La lavagna è vuota. Nel LAB, premi → LAVAGNA per appenderci il codice che hai davanti.":
    "The board is empty. In the LAB, press → BOARD to pin up the code in front of you.",
  "La lavagna è vuota per ora. Quando chi tiene il laboratorio ci appende qualcosa, comparirà qui da solo.":
    "The board is empty for now. When whoever runs the workshop pins something up, it will appear here by itself.",
  "Per vedere gli invii della classe serve la password docente.":
    "You need the teacher password to see the class's submissions.",
  "INSERISCI LA PASSWORD": "ENTER THE PASSWORD",
  "Password docente per la lavagna:": "Teacher password for the board:",
  "Nessun invio. Gli studenti usano INVIA VISUALE o INVIA SUONO dalla lavagna.":
    "No submissions. Students use SEND VISUAL or SEND SOUND from the board.",
  'Il pattern non si lascia leggere: {error}': 'The pattern can\'t be read: {error}',
  // nomi dei righi dello spartito (js/score.js)
  'Melodia': 'Melody',
  'Mel.': 'Mel.',
  'Accompagnamento': 'Accompaniment',
  'Acc.': 'Acc.',
  'Basso': 'Bass',
  'B.': 'B.',
  'Batteria': 'Drums',
  'Batt.': 'Dr.',
});
