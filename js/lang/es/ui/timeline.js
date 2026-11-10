/* Frasi dell'interfaccia — spagnolo: js/timeline.js (tracce, clip, inviluppi,
   finestra della clip, trasporto, import). Chiave = la frase italiana. */

I18N.add('es', {
  "VISUALE": "VISUAL",
  "SUONO {n}": "SONIDO {n}",
  "SUONO": "SONIDO",

  /* la performance di esempio */
  "onda colorata": "onda de colores",
  "caleidoscopio": "caleidoscopio",
  "liquido": "líquido",
  "ritmo a sorpresa": "ritmo sorpresa",
  "batteria piena": "batería completa",
  "ritmo + basso": "ritmo + bajo",
  "melodia (in sync)": "melodía (en sincronía)",

  /* aiuto: righello, clip, inviluppi, tracce */
  "Righello|Mostra i secondi. Clicca (o trascina) qui per spostare la linea del tempo in un punto preciso.":
    "Regla|Muestra los segundos. Haz clic (o arrastra) aquí para mover la línea de tiempo a un punto preciso.",
  "Clip «{label}»|Codice visuale (Hydra): parte al secondo {start}.":
    "Clip «{label}»|Código visual (Hydra): empieza en el segundo {start}.",
  "Clip «{label}»|Codice sonoro (Strudel): parte al secondo {start}.":
    "Clip «{label}»|Código sonoro (Strudel): empieza en el segundo {start}.",
  "Contiene {n} varianti: a ogni passaggio ne suona una in sequenza.":
    "Contiene {n} variantes: en cada pasada suena una, en orden.",
  "Contiene {n} varianti: a ogni passaggio ne suona una a caso.":
    "Contiene {n} variantes: en cada pasada suena una al azar.",
  "Ha una variabile (∿ {names}): i loro inviluppi sono nelle corsie sotto la traccia.":
    "Tiene una variable (∿ {names}): su envolvente está en el carril bajo la pista.",
  "Ha {n} variabili (∿ {names}): i loro inviluppi sono nelle corsie sotto la traccia.":
    "Tiene {n} variables (∿ {names}): sus envolventes están en los carriles bajo la pista.",
  "Trascina per spostarla, Alt+trascina per duplicarla, tira i bordi per la durata, doppio clic per modificare il codice. Cmd+C / Cmd+V per copiarla e incollarla alla linea del tempo.":
    "Arrastra para moverlo, Alt+arrastrar para duplicarlo, tira de los bordes para la duración, doble clic para editar el código. Cmd+C / Cmd+V para copiarlo y pegarlo en la línea de tiempo.",
  "Inviluppo «{name}»|Come cambia la variabile {name} durante la clip «{label}»: in alto vale {max}, in basso {min}.":
    "Envolvente «{name}»|Cómo cambia la variable {name} durante el clip «{label}»: arriba vale {max}, abajo {min}.",
  "Clic in un punto vuoto = nuovo punto (e trascinalo) · trascina un punto = spostalo · clic su un punto = cancellalo · trascina la linea = alzala o abbassala. Cmd+Z annulla.":
    "Clic en un sitio vacío = punto nuevo (y arrástralo) · arrastra un punto = muévelo · clic en un punto = bórralo · arrastra la línea = súbela o bájala. Cmd+Z deshace.",
  "Corsia «{name}»|Sotto ogni clip di {track} che ha la variabile {name} c'è il suo inviluppo: la linea dice quanto vale, istante per istante.":
    "Carril «{name}»|Bajo cada clip de {track} que tiene la variable {name} está su envolvente: la línea dice cuánto vale, instante a instante.",
  "Il numero è il valore dove sta la linea del tempo. Le variabili si creano nella finestra della clip (doppio clic). La rotellina qui sui nomi fa scorrere su e giù.":
    "El número es el valor donde está la línea de tiempo. Las variables se crean en la ventana del clip (doble clic). La rueda del ratón aquí sobre los nombres desplaza arriba y abajo.",
  "Traccia VISUALE|Le clip su questa traccia contengono codice Hydra: quando la linea del tempo le attraversa, le immagini cambiano.":
    "Pista VISUAL|Los clips de esta pista contienen código Hydra: cuando la línea de tiempo los cruza, las imágenes cambian.",
  "Traccia {track}|Le clip su questa traccia contengono pattern Strudel. Le tracce suono suonano insieme, sempre a tempo tra loro: condividono lo stesso orologio musicale.":
    "Pista {track}|Los clips de esta pista contienen patterns Strudel. Las pistas de sonido suenan juntas, siempre a tempo entre sí: comparten el mismo reloj musical.",
  "Inviluppi|Apre le corsie degli inviluppi di questa traccia: una per ogni variabile delle sue clip ({n}).":
    "Envolventes|Abre los carriles de envolvente de esta pista: uno por cada variable de sus clips ({n}).",
  "Inviluppi|Chiude le corsie degli inviluppi di questa traccia: una per ogni variabile delle sue clip ({n}).":
    "Envolventes|Cierra los carriles de envolvente de esta pista: uno por cada variable de sus clips ({n}).",
  "Rimuovi traccia|Elimina questa traccia sonora (con le sue clip). Puoi annullare con Cmd+Z.":
    "Quitar pista|Elimina esta pista de sonido (con sus clips). Puedes deshacer con Cmd+Z.",
  "La traccia {track} contiene {n} clip: eliminarla comunque?":
    "La pista {track} contiene {n} clips: ¿eliminarla de todos modos?",
  "nuova clip": "clip nuevo",
  "Variante {n}|Mostra e modifica il codice della variante {n}.":
    "Variante {n}|Muestra y edita el código de la variante {n}.",

  /* variabili nella finestra della clip */
  "dai un nome alla variabile": "ponle un nombre a la variable",
  "«{name}»: il nome può avere solo lettere senza accenti, numeri e _ (niente spazi), e non può cominciare con un numero":
    "«{name}»: el nombre solo puede tener letras sin tildes, números y _ (sin espacios), y no puede empezar por un número",
  "«{name}» è una parola riservata di JavaScript: scegli un altro nome":
    "«{name}» es una palabra reservada de JavaScript: elige otro nombre",
  "c'è già una variabile «{name}» in questa clip":
    "ya hay una variable «{name}» en este clip",
  "«{name}» è già il nome di qualcosa che esiste (in Hydra, in Strudel o nel browser): scegline un altro, per esempio «mio_{name}»":
    "«{name}» ya es el nombre de algo que existe (en Hydra, en Strudel o en el navegador): elige otro, por ejemplo «mi_{name}»",
  "Nome della variabile|Il nome da scrivere nel codice. Solo lettere senza accenti, numeri e _, senza spazi.":
    "Nombre de la variable|El nombre que se escribe en el código. Solo letras sin tildes, números y _, sin espacios.",
  "da": "de",
  "a": "a",
  "Valore più basso|Quanto vale la variabile quando l'inviluppo è in fondo alla corsia.":
    "Valor más bajo|Cuánto vale la variable cuando la envolvente está abajo del todo en el carril.",
  "Valore più alto|Quanto vale la variabile quando l'inviluppo è in cima alla corsia.":
    "Valor más alto|Cuánto vale la variable cuando la envolvente está arriba del todo en el carril.",
  "Nel codice|Scrive il nome della variabile nel codice, dove sta il cursore.":
    "En el código|Escribe el nombre de la variable en el código, donde está el cursor.",
  "↳ NEL CODICE": "↳ AL CÓDIGO",
  "Elimina variabile|Toglie la variabile e il suo inviluppo. Se il codice la usa ancora, darà errore.":
    "Eliminar variable|Quita la variable y su envolvente. Si el código todavía la usa, dará error.",
  "numeri che cambiano nel tempo, disegnati sotto la clip":
    "números que cambian con el tiempo, dibujados bajo el clip",
  "nel codice: osc(10, 0.1, {n}) · per fare conti: () => {n}() * 2":
    "en el código: osc(10, 0.1, {n}) · para hacer cuentas: () => {n}() * 2",
  "nel codice: .lpf({n}) · .gain({n}) · per fare conti: {n}.mul(2)":
    "en el código: .lpf({n}) · .gain({n}) · para hacer cuentas: {n}.mul(2)",
  "«{name}»: dopo «da» ci va un numero": "«{name}»: después de «de» va un número",
  "«{name}»: dopo «a» ci va un numero": "«{name}»: después de «a» va un número",
  "clip visuale · hydra": "clip visual · hydra",
  "clip sonora · strudel · {track}": "clip sonoro · strudel · {track}",

  /* prova, trasporto, console, import */
  "▶ OK!": "▶ ¡OK!",
  "✕ ERRORE": "✕ ERROR",
  "prova clip: {error}": "prueba del clip: {error}",
  "▶ PROVA": "▶ PROBAR",
  "⏸ PAUSA": "⏸ PAUSA",
  "▶ PLAY": "▶ PLAY",
  "▶ clip «{label}» ({track}) — variante {which}/{n}": "▶ clip «{label}» ({track}) — variante {which}/{n}",
  "▶ clip «{label}» ({track})": "▶ clip «{label}» ({track})",
  "clip «{label}»: {error}": "clip «{label}»: {error}",
  "tracce suono: {error}": "pistas de sonido: {error}",
  "File non valido: manca l'elenco delle clip.": "Archivo no válido: falta la lista de clips.",
  "File non leggibile: {error}": "Archivo ilegible: {error}",
});
