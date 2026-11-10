/* Frasi dell'interfaccia — inglese: js/timeline.js (tracce, clip, inviluppi,
   finestra della clip, trasporto, import). Chiave = la frase italiana. */

I18N.add('en', {
  "VISUALE": "VISUAL",
  "SUONO {n}": "SOUND {n}",
  "SUONO": "SOUND",

  /* la performance di esempio */
  "onda colorata": "colour wave",
  "caleidoscopio": "kaleidoscope",
  "liquido": "liquid",
  "ritmo a sorpresa": "surprise rhythm",
  "batteria piena": "full drums",
  "ritmo + basso": "rhythm + bass",
  "melodia (in sync)": "melody (in sync)",

  /* aiuto: righello, clip, inviluppi, tracce */
  "Righello|Mostra i secondi. Clicca (o trascina) qui per spostare la linea del tempo in un punto preciso.":
    "Ruler|Shows the seconds. Click (or drag) here to move the time line to an exact point.",
  "Clip «{label}»|Codice visuale (Hydra): parte al secondo {start}.":
    "Clip “{label}”|Visual code (Hydra): starts at second {start}.",
  "Clip «{label}»|Codice sonoro (Strudel): parte al secondo {start}.":
    "Clip “{label}”|Sound code (Strudel): starts at second {start}.",
  "Contiene {n} varianti: a ogni passaggio ne suona una in sequenza.":
    "It holds {n} variants: each time through, the next one in order plays.",
  "Contiene {n} varianti: a ogni passaggio ne suona una a caso.":
    "It holds {n} variants: each time through, a random one plays.",
  "Ha una variabile (∿ {names}): i loro inviluppi sono nelle corsie sotto la traccia.":
    "It has one variable (∿ {names}): its envelope is in the lane below the track.",
  "Ha {n} variabili (∿ {names}): i loro inviluppi sono nelle corsie sotto la traccia.":
    "It has {n} variables (∿ {names}): their envelopes are in the lanes below the track.",
  "Trascina per spostarla, Alt+trascina per duplicarla, tira i bordi per la durata, doppio clic per modificare il codice. Cmd+C / Cmd+V per copiarla e incollarla alla linea del tempo.":
    "Drag to move it, Alt+drag to duplicate it, pull the edges to change its length, double-click to edit the code. Cmd+C / Cmd+V to copy it and paste it at the time line.",
  "Inviluppo «{name}»|Come cambia la variabile {name} durante la clip «{label}»: in alto vale {max}, in basso {min}.":
    "Envelope “{name}”|How the variable {name} changes during the clip “{label}”: at the top it is {max}, at the bottom {min}.",
  "Clic in un punto vuoto = nuovo punto (e trascinalo) · trascina un punto = spostalo · clic su un punto = cancellalo · trascina la linea = alzala o abbassala. Cmd+Z annulla.":
    "Click an empty spot = new point (and drag it) · drag a point = move it · click a point = delete it · drag the line = raise or lower it. Cmd+Z undoes.",
  "Corsia «{name}»|Sotto ogni clip di {track} che ha la variabile {name} c'è il suo inviluppo: la linea dice quanto vale, istante per istante.":
    "Lane “{name}”|Under every clip of {track} that has the variable {name} there is its envelope: the line tells its value, moment by moment.",
  "Il numero è il valore dove sta la linea del tempo. Le variabili si creano nella finestra della clip (doppio clic). La rotellina qui sui nomi fa scorrere su e giù.":
    "The number is the value at the time line. Variables are created in the clip window (double-click). The mouse wheel here on the names scrolls up and down.",
  "Traccia VISUALE|Le clip su questa traccia contengono codice Hydra: quando la linea del tempo le attraversa, le immagini cambiano.":
    "VISUAL track|The clips on this track hold Hydra code: when the time line crosses them, the images change.",
  "Traccia {track}|Le clip su questa traccia contengono pattern Strudel. Le tracce suono suonano insieme, sempre a tempo tra loro: condividono lo stesso orologio musicale.":
    "Track {track}|The clips on this track hold Strudel patterns. Sound tracks play together, always in time with each other: they share the same musical clock.",
  "Inviluppi|Apre le corsie degli inviluppi di questa traccia: una per ogni variabile delle sue clip ({n}).":
    "Envelopes|Opens this track's envelope lanes: one for each variable of its clips ({n}).",
  "Inviluppi|Chiude le corsie degli inviluppi di questa traccia: una per ogni variabile delle sue clip ({n}).":
    "Envelopes|Closes this track's envelope lanes: one for each variable of its clips ({n}).",
  "Rimuovi traccia|Elimina questa traccia sonora (con le sue clip). Puoi annullare con Cmd+Z.":
    "Remove track|Deletes this sound track (with its clips). You can undo with Cmd+Z.",
  "La traccia {track} contiene {n} clip: eliminarla comunque?":
    "Track {track} contains {n} clips: delete it anyway?",
  "nuova clip": "new clip",
  "Variante {n}|Mostra e modifica il codice della variante {n}.":
    "Variant {n}|Shows and edits the code of variant {n}.",

  /* variabili nella finestra della clip */
  "dai un nome alla variabile": "give the variable a name",
  "«{name}»: il nome può avere solo lettere senza accenti, numeri e _ (niente spazi), e non può cominciare con un numero":
    "“{name}”: the name can only have letters without accents, numbers and _ (no spaces), and cannot start with a number",
  "«{name}» è una parola riservata di JavaScript: scegli un altro nome":
    "“{name}” is a reserved word in JavaScript: choose another name",
  "c'è già una variabile «{name}» in questa clip":
    "there is already a variable “{name}” in this clip",
  "«{name}» è già il nome di qualcosa che esiste (in Hydra, in Strudel o nel browser): scegline un altro, per esempio «mio_{name}»":
    "“{name}” is already the name of something that exists (in Hydra, in Strudel or in the browser): choose another one, for example “my_{name}”",
  "Nome della variabile|Il nome da scrivere nel codice. Solo lettere senza accenti, numeri e _, senza spazi.":
    "Variable name|The name to write in the code. Only letters without accents, numbers and _, no spaces.",
  "da": "from",
  "a": "to",
  "Valore più basso|Quanto vale la variabile quando l'inviluppo è in fondo alla corsia.":
    "Lowest value|The variable's value when the envelope is at the bottom of the lane.",
  "Valore più alto|Quanto vale la variabile quando l'inviluppo è in cima alla corsia.":
    "Highest value|The variable's value when the envelope is at the top of the lane.",
  "Nel codice|Scrive il nome della variabile nel codice, dove sta il cursore.":
    "Into the code|Writes the variable's name into the code, at the cursor.",
  "↳ NEL CODICE": "↳ INTO CODE",
  "Elimina variabile|Toglie la variabile e il suo inviluppo. Se il codice la usa ancora, darà errore.":
    "Delete variable|Removes the variable and its envelope. If the code still uses it, it will give an error.",
  "numeri che cambiano nel tempo, disegnati sotto la clip":
    "numbers that change over time, drawn under the clip",
  "nel codice: osc(10, 0.1, {n}) · per fare conti: () => {n}() * 2":
    "in the code: osc(10, 0.1, {n}) · to do maths: () => {n}() * 2",
  "nel codice: .lpf({n}) · .gain({n}) · per fare conti: {n}.mul(2)":
    "in the code: .lpf({n}) · .gain({n}) · to do maths: {n}.mul(2)",
  "«{name}»: dopo «da» ci va un numero": "“{name}”: a number goes after “from”",
  "«{name}»: dopo «a» ci va un numero": "“{name}”: a number goes after “to”",
  "clip visuale · hydra": "visual clip · hydra",
  "clip sonora · strudel · {track}": "sound clip · strudel · {track}",

  /* prova, trasporto, console, import */
  "▶ OK!": "▶ OK!",
  "✕ ERRORE": "✕ ERROR",
  "prova clip: {error}": "clip test: {error}",
  "▶ PROVA": "▶ TRY",
  "⏸ PAUSA": "⏸ PAUSE",
  "▶ PLAY": "▶ PLAY",
  "▶ clip «{label}» ({track}) — variante {which}/{n}": "▶ clip “{label}” ({track}) — variant {which}/{n}",
  "▶ clip «{label}» ({track})": "▶ clip “{label}” ({track})",
  "clip «{label}»: {error}": "clip “{label}”: {error}",
  "tracce suono: {error}": "sound tracks: {error}",
  "File non valido: manca l'elenco delle clip.": "Invalid file: the list of clips is missing.",
  "File non leggibile: {error}": "Unreadable file: {error}",
});
