/* Frasi dell'interfaccia — spagnolo: i pannelli. js/score.js e
   js/scoreview.js (SPARTITO), js/library.js (SUONI: etichette, banchi,
   sintetici), js/board.js (LAVAGNA, con gli errori di api/board.php).
   Chiave = la frase italiana. */

I18N.add('es', {
  /* js/score.js — avvisi dello spartito */
  "n(…) da solo non ha un'altezza: aggiungi .scale(\"C:major\") per trasformare i numeri in note.":
    "n(…) por sí solo no tiene altura: añade .scale(\"C:major\") para convertir los números en notas.",
  "Alcune altezze non sono semitoni esatti: sono arrotondate alla nota più vicina.":
    "Algunas alturas no son semitonos exactos: se redondean a la nota más cercana.",
  "{n} eventi senza nota né suono non sono rappresentati.":
    "{n} eventos sin nota ni sonido no se representan.",
  "Troppe note sovrapposte: {n} eventi non entrano nelle {max} voci rappresentabili.":
    "Demasiadas notas superpuestas: {n} eventos no caben en las {max} voces representables.",
  "Battuta {n}: ritmo troppo fitto per essere scritto esattamente — approssimato alla semicroma.":
    "Compás {n}: ritmo demasiado denso para escribirlo con exactitud — aproximado a la semicorchea.",

  /* js/scoreview.js — il pannello SPARTITO */
  "Strudel non è partito: ricarica la pagina.": "Strudel no ha arrancado: recarga la página.",
  "il codice non produce un pattern": "el código no produce un pattern",
  "Lo spartito non si può disegnare: {err}": "No se puede dibujar la partitura: {err}",
  "spartito · {label}": "partitura · {label}",
  "spartito · suono": "partitura · sonido",
  "Scrivi un pattern nell'editor SUONO — per esempio note(\"c4 e4 g4 b4\") — e premi ↻ AGGIORNA.":
    "Escribe un pattern en el editor SONIDO — por ejemplo note(\"c4 e4 g4 b4\") — y pulsa ↻ ACTUALIZAR.",
  "leggo il pattern…": "leyendo el pattern…",
  "Strudel non risponde: premi ▶ ESEGUI una volta (il browser attiva l'audio solo dopo un clic) e riprova.":
    "Strudel no responde: pulsa ▶ EJECUTAR una vez (el navegador solo activa el audio después de un clic) y vuelve a intentarlo.",
  "Il codice ha un errore, quindi lo spartito non è aggiornato: {err}":
    "El código tiene un error, así que la partitura no está actualizada: {err}",
  "Il pattern produce {n} eventi in {cycles} cicli: troppo fitto per uno spartito leggibile.":
    "El pattern produce {n} eventos en {cycles} ciclos: demasiado denso para una partitura legible.",
  "La libreria dello spartito (abcjs) non si è caricata.":
    "La biblioteca de la partitura (abcjs) no se ha cargado.",
  "Il pattern non produce eventi nei primi cicli: non c'è niente da scrivere.":
    "El pattern no produce eventos en los primeros ciclos: no hay nada que escribir.",
  "1 battuta = 1 ciclo": "1 compás = 1 ciclo",
  "{n} battute = {n} cicli": "{n} compases = {n} ciclos",
  "ciclo {n}": "ciclo {n}",
  "cicli {from}–{to}": "ciclos {from}–{to}",
  "percussioni: {list}": "percusión: {list}",
  "■ fermo — premi ▶ ESEGUI sul suono e il puntatore segue la musica":
    "■ detenido — pulsa ▶ EJECUTAR en el sonido y el puntero sigue la música",
  "sta suonando un codice diverso da questo spartito — premi ▶ ESEGUI per riallinearli":
    "está sonando un código distinto de esta partitura — pulsa ▶ EJECUTAR para volver a alinearlos",
  "▶ cicli {from}–{to}: il pattern qui tace — lo spartito mostra la pagina di prima":
    "▶ ciclos {from}–{to}: aquí el pattern calla — la partitura muestra la página anterior",
  "▶ battuta {n} di {tot}": "▶ compás {n} de {tot}",

  /* js/library.js — il pannello SUONI: etichette */
  "batteria": "batería",
  "I pezzi di una batteria: cassa, rullante, piatti, tom, mani.":
    "Las piezas de una batería: bombo, caja, platillos, toms, palmas.",
  "cassa": "bombo",
  "Il colpo grave che tiene il battito: di solito sui tempi forti.":
    "El golpe grave que marca el pulso: normalmente en los tiempos fuertes.",
  "rullante": "caja",
  "Il colpo secco che risponde alla cassa, di solito sul 2 e sul 4.":
    "El golpe seco que responde al bombo, normalmente en el 2 y el 4.",
  "piatti": "platillos",
  "Suoni metallici: il charleston che scandisce il tempo, il crash per gli accenti.":
    "Sonidos metálicos: el hi-hat que marca el tiempo, el crash para los acentos.",
  "tom": "toms",
  "Tamburi intonati della batteria: grave, medio, acuto. Perfetti per i passaggi (fill).":
    "Tambores afinados de la batería: grave, medio, agudo. Perfectos para los pasajes (fill).",
  "mani": "palmas",
  "Il battito di mani.": "Una palmada.",
  "percussioni": "percusión",
  "Colpi di legno, pelle e metallo fuori dalla batteria classica.":
    "Golpes de madera, parche y metal fuera de la batería clásica.",
  "mondo": "mundo",
  "Strumenti di altre tradizioni: la tabla indiana, le percussioni giapponesi.":
    "Instrumentos de otras tradiciones: la tabla india, la percusión japonesa.",
  "intonato": "afinado",
  "Ha un'altezza precisa, quindi si presta alle melodie. Un campione sale di un'ottava con .speed(2); un sintetizzatore suona la nota che gli dai con note().":
    "Tiene una altura precisa, así que sirve para melodías. Una muestra sube una octava con .speed(2); un sintetizador toca la nota que le das con note().",
  "elettronico": "electrónico",
  "Suoni nati da circuiti e tastierine, non da uno strumento acustico.":
    "Sonidos nacidos de circuitos y teclados pequeños, no de un instrumento acústico.",
  "effetti": "efectos",
  "Rumori e suoni strani: per colorare, non per tenere il tempo.":
    "Ruidos y sonidos raros: para dar color, no para llevar el tiempo.",
  "animali": "animales",
  "Versi di animali.": "Sonidos de animales.",
  "lungo": "largo",
  "Risuona a lungo (quasi un secondo, o più): con colpi ravvicinati i suoni si sovrappongono.":
    "Resuena mucho tiempo (casi un segundo, o más): con golpes seguidos los sonidos se superponen.",
  "break": "break",
  "Un ritmo di batteria registrato e tagliato in segmenti: rimessi in fila ricompongono il ritmo, mescolati ne inventano di nuovi.":
    "Un ritmo de batería grabado y cortado en segmentos: puestos en orden recomponen el ritmo, mezclados inventan otros nuevos.",
  "sintetizzatore": "sintetizador",
  "Nessuna registrazione: il suono lo genera al momento un oscillatore. Dura quanto la nota e si intona con note().":
    "Ninguna grabación: el sonido lo genera al momento un oscilador. Dura lo que la nota y se afina con note().",
  "rumore": "ruido",
  "Un fruscio senza altezza. Corto e filtrato (.hpf, .lpf) diventa un charleston o un rullante sintetico.":
    "Un siseo sin altura. Corto y filtrado (.hpf, .lpf) se convierte en un hi-hat o una caja sintéticos.",

  /* js/library.js — i nomi delle note del sax */
  "la": "la",
  "si": "si",
  "si♭": "si♭",
  "do": "do",
  "do♯": "do♯",
  "re": "re",
  "mi": "mi",
  "mi♭": "mi♭",
  "fa": "fa",
  "fa♯": "fa♯",
  "sol": "sol",
  "sol♯": "sol♯",

  /* js/library.js — i banchi di campioni */
  "La cassa: il colpo grave, il battito del ritmo.":
    "El bombo: el golpe grave, el pulso del ritmo.",
  "Il rullante: il colpo secco che risponde alla cassa.":
    "La caja: el golpe seco que responde al bombo.",
  "Un altro rullante, più corto e asciutto.": "Otra caja, más corta y seca.",
  "Piatti: il charleston chiuso (hh:0), un crash e due colpi che risuonano.":
    "Platillos: el hi-hat cerrado (hh:0), un crash y dos golpes que resuenan.",
  "Il tom grave.": "El tom grave.",
  "Il tom medio.": "El tom medio.",
  "Il tom acuto.": "El tom agudo.",
  "Piccole percussioni per arricchire il ritmo.":
    "Pequeña percusión para enriquecer el ritmo.",
  "Una tastierina Casio: nota acuta, nota grave, rumore.":
    "Un tecladito Casio: nota aguda, nota grave, ruido.",
  "Una batteria jazz: cassa, campanaccio, un effetto, charleston.":
    "Una batería de jazz: bombo, cencerro, un efecto, hi-hat.",
  "Una nota pizzicata, in quattro altezze diverse.":
    "Una nota pulsada, en cuatro alturas distintas.",
  "La tabla indiana: colpi gravi che risuonano a lungo.":
    "La tabla india: golpes graves que resuenan largo tiempo.",
  "Percussioni giapponesi: un blocco di legno e il tamburo ohkawa.":
    "Percusión japonesa: un bloque de madera y el tambor ohkawa.",
  "Suoni spaziali, elettronici.": "Sonidos espaciales, electrónicos.",
  "Il verso di un corvo.": "El graznido de un cuervo.",
  "Un break di batteria in 16 segmenti. In ordine, uno per sedicesimo, ricompongono il ritmo: n(\"0 1 2 … 15\").s(\"xbreak1\") con setcpm(85/4). Mescola i numeri per inventarne uno nuovo.":
    "Un break de batería en 16 segmentos. En orden, uno por semicorchea, recomponen el ritmo: n(\"0 1 2 … 15\").s(\"xbreak1\") con setcpm(85/4). Mezcla los números para inventar uno nuevo.",
  "Un break drum'n'bass in 16 segmenti, come xbreak1: in ordine con setcpm(85/4) ricompone il ritmo. A setcpm(170/4) bastano i primi 8 per una battuta: n(\"0 1 2 3 4 5 6 7\").s(\"dnb1\") è il two-step.":
    "Un break de drum'n'bass en 16 segmentos, como xbreak1: en orden con setcpm(85/4) recompone el ritmo. A setcpm(170/4) bastan los 8 primeros para un compás: n(\"0 1 2 3 4 5 6 7\").s(\"dnb1\") es el two-step.",
  "Note di sassofono, una per file, lunghe 4 secondi: .clip(1) le taglia alla durata della nota. I file con il 2 sono una seconda ripresa della stessa nota.":
    "Notas de saxofón, una por archivo, de 4 segundos: .clip(1) las corta a la duración de la nota. Los archivos con el 2 son una segunda toma de la misma nota.",

  /* js/library.js — i suoni sintetici */
  "puro, morbido": "puro, suave",
  "L'onda sinusoidale: un solo suono puro, senza armonici. Morbida, quasi un fischio; in basso diventa un sub-basso. Si scrive anche \"sin\".":
    "La onda sinusoidal: un solo sonido puro, sin armónicos. Suave, casi un silbido; en el grave se convierte en un subgrave. También se escribe \"sin\".",
  "dolce": "dulce",
  "L'onda triangolare: pochi armonici, un suono dolce che ricorda un flauto. È il suono di Strudel quando non scrivi .s(). Si scrive anche \"tri\".":
    "La onda triangular: pocos armónicos, un sonido dulce que recuerda a una flauta. Es el sonido de Strudel cuando no escribes .s(). También se escribe \"tri\".",
  "brillante": "brillante",
  "L'onda a dente di sega: piena di armonici, brillante e ronzante. Con .lpf() si scurisce: è il classico basso e il suono acid. Si scrive anche \"saw\".":
    "La onda de diente de sierra: llena de armónicos, brillante y zumbona. Con .lpf() se oscurece: es el bajo clásico y el sonido acid. También se escribe \"saw\".",
  "da videogioco": "de videojuego",
  "L'onda quadra: salta fra due valori. Un suono vuoto e nasale, quello dei vecchi videogiochi. Si scrive anche \"sqr\".":
    "La onda cuadrada: salta entre dos valores. Un sonido hueco y nasal, el de los videojuegos antiguos. También se escribe \"sqr\".",
  "quadra con .pw()": "cuadrada con .pw()",
  "L'onda a impulsi: di base è una quadra, ma .pw() cambia quanto resta in alto (fra 0 e 1). Con .pw(0.1) diventa sottile e nasale.":
    "La onda de pulsos: en principio es una cuadrada, pero .pw() cambia cuánto se queda arriba (entre 0 y 1). Con .pw(0.1) se vuelve fina y nasal.",
  "grosso, largo": "gordo, ancho",
  "Cinque denti di sega leggermente stonati fra loro, suonati insieme: un suono largo e grosso, da tappeto o da accordi. .detune() li allontana, .unison() ne cambia il numero.":
    "Cinco dientes de sierra ligeramente desafinados entre sí, tocados juntos: un sonido ancho y gordo, para colchones o acordes. .detune() los separa, .unison() cambia cuántos son.",
  "cassa sintetica": "bombo sintético",
  "Una cassa fatta al momento: un'onda che parte acuta e precipita verso il grave. .decay() la allunga, .penv() cambia quanto parte in alto.":
    "Un bombo hecho al momento: una onda que empieza aguda y cae hacia el grave. .decay() lo alarga, .penv() cambia lo alto que empieza.",
  "tutte le frequenze": "todas las frecuencias",
  "Il rumore bianco: tutte le frequenze alla stessa forza, un soffio aspro. Corto e filtrato, s(\"white\").decay(0.05).sustain(0).hpf(8000), fa un charleston.":
    "El ruido blanco: todas las frecuencias con la misma fuerza, un soplido áspero. Corto y filtrado, s(\"white\").decay(0.05).sustain(0).hpf(8000) hace un hi-hat.",
  "più morbido": "más suave",
  "Il rumore rosa: più forte sui gravi, quindi meno aspro del bianco. Somiglia alla pioggia.":
    "El ruido rosa: más fuerte en los graves, así que menos áspero que el blanco. Se parece a la lluvia.",
  "cupo, come il mare": "oscuro, como el mar",
  "Il rumore marrone: quasi solo gravi, un brontolio cupo come il mare o il vento.":
    "El ruido marrón: casi solo graves, un rumor oscuro como el mar o el viento.",
  "scoppiettii": "chasquidos",
  "Scoppiettii sparsi, come un disco in vinile o il fuoco. .density() ne cambia il numero.":
    "Chasquidos sueltos, como un disco de vinilo o el fuego. .density() cambia cuántos hay.",
  "sintetizzatori": "sintetizadores",
  "Sintetizzatori: nessun file, il suono lo genera un oscillatore. Durano quanto la nota; .attack() e .release() lo fanno entrare e uscire piano.":
    "Sintetizadores: ningún archivo, el sonido lo genera un oscilador. Duran lo que la nota; .attack() y .release() lo hacen entrar y salir suavemente.",
  "rumori": "ruidos",
  "Rumori: niente altezza, solo fruscio. Con un inviluppo corto, .decay(0.05).sustain(0), e un filtro diventano percussioni.":
    "Ruidos: sin altura, solo siseo. Con una envolvente corta, .decay(0.05).sustain(0), y un filtro se convierten en percusión.",

  /* js/library.js — il pannello */
  "non trovato": "no encontrado",
  "il campione {id} non si carica ({err})": "la muestra {id} no se carga ({err})",
  "Se succede con tutti i campioni, la cartella samples/ non è raggiungibile.":
    "Si pasa con todas las muestras, la carpeta samples/ no es accesible.",
  "il sintetizzatore {id} non suona ({err})": "el sintetizador {id} no suena ({err})",
  "Ricarica la pagina: i sintetizzatori li prepara Strudel all'avvio.":
    "Recarga la página: Strudel prepara los sintetizadores al arrancar.",
  "Clicca per mostrare solo questi suoni; accendendo più etichette restano i suoni che le hanno tutte.":
    "Haz clic para mostrar solo estos sonidos; si activas varias etiquetas, quedan los sonidos que las tienen todas.",
  "✕ tutte": "✕ todas",
  "Tutte|Spegne le etichette e torna a mostrare tutti i suoni.":
    "Todas|Apaga las etiquetas y vuelve a mostrar todos los sonidos.",
  "Passa sopra per vedere la forma dell'onda, clicca per sentirne una nota. Nel codice: {code}.":
    "Pasa por encima para ver la forma de la onda, haz clic para oír una nota. En el código: {code}.",
  "Passa sopra per vedere la forma d'onda, clicca per ascoltarlo (un altro clic lo ferma).":
    "Pasa por encima para ver la forma de onda, haz clic para escucharla (otro clic la detiene).",
  "Nel codice: s(\"{id}\") oppure s(\"{bank}\"). File: {file}.":
    "En el código: s(\"{id}\") o s(\"{bank}\"). Archivo: {file}.",
  "Nel codice: s(\"{id}\"). File: {file}.": "En el código: s(\"{id}\"). Archivo: {file}.",
  "Nel codice al posto dei puntini va il nome, es. {example}.":
    "En el código el nombre va en lugar de los puntos, p. ej. {example}.",
  "Un banco di campioni.": "Un banco de muestras.",
  "Nel codice si scrive s(\"{bank}\"); con i due punti scegli quale: s(\"{bank}:1\") è il secondo.":
    "En el código se escribe s(\"{bank}\"); con los dos puntos eliges cuál: s(\"{bank}:1\") es la segunda.",
  "{n} di {tot} suoni": "{n} de {tot} sonidos",
  "{files} campioni in {banks} banchi · {synths} sintetici":
    "{files} muestras en {banks} bancos · {synths} sintéticos",
  "carico l'elenco…": "cargando la lista…",
  "elenco dei campioni non disponibile": "lista de muestras no disponible",
  "non riesco a leggere samples/strudel.json: {err}":
    "no puedo leer samples/strudel.json: {err}",
  "Avvia l'app con ./start.sh.": "Inicia la app con ./start.sh.",
  "Ricarica la pagina.": "Recarga la página.",

  /* js/board.js — errori di api/board.php, tradotti per mostrarli */
  "cartella dati non creabile": "no se puede crear la carpeta de datos",
  "scrittura fallita": "error de escritura",
  "salvataggio fallito": "error al guardar",
  "password docente non configurata: crea api/secret.php":
    "contraseña del docente no configurada: crea api/secret.php",
  "password docente errata": "contraseña del docente incorrecta",
  "metodo non consentito": "método no permitido",
  "codice vuoto": "código vacío",
  "identificativo mancante": "falta el identificador",
  "troppi invii in un minuto, riprova fra poco":
    "demasiados envíos en un minuto, vuelve a intentarlo en un rato",
  "azione sconosciuta": "acción desconocida",

  /* js/board.js — la LAVAGNA */
  "lavagna non raggiungibile: {err}": "pizarra no accesible: {err}",
  "Le schede già ricevute restano visibili. Riprovo da solo.":
    "Las tarjetas ya recibidas siguen visibles. Lo vuelvo a intentar solo.",
  "senza titolo": "sin título",
  "docente": "docente",
  "scrivi prima il tuo nome": "escribe primero tu nombre",
  "LAVAGNA {n}": "PIZARRA {n}",
  "LAVAGNA": "PIZARRA",
  "SUONO": "SONIDO",
  "VISUALE": "VISUAL",
  "anonimo": "anónimo",
  "CARICA NELL'EDITOR": "CARGAR EN EL EDITOR",
  "Carica|Mette questo codice nel tuo editor. Non parte da solo: lo esegui tu con ▶ ESEGUI, dopo averlo letto.":
    "Cargar|Pone este código en tu editor. No arranca solo: lo ejecutas tú con ▶ EJECUTAR, después de leerlo.",
  "codice caricato nell'editor SUONO — premi ▶ ESEGUI per provarlo":
    "código cargado en el editor SONIDO — pulsa ▶ EJECUTAR para probarlo",
  "codice caricato nell'editor VISUALE — premi ▶ ESEGUI per provarlo":
    "código cargado en el editor VISUAL — pulsa ▶ EJECUTAR para probarlo",
  "Aggiungi alla timeline|Accoda questo codice come clip alla traccia giusta.":
    "Añadir a la timeline|Añade este código como clip al final de la pista adecuada.",
  "→ METTI IN LAVAGNA": "→ PONER EN LA PIZARRA",
  "Metti in lavagna|Rende questo lavoro visibile a tutta la classe.":
    "Poner en la pizarra|Hace visible este trabajo a toda la clase.",
  "esempio": "ejemplo",
  "«{name}» è ora in lavagna per tutti": "«{name}» ya está en la pizarra para todos",
  "Togli|Rimuove la scheda dalla lavagna di tutti.":
    "Quitar|Elimina la tarjeta de la pizarra de todos.",
  "La lavagna è vuota. Nel LAB, premi → LAVAGNA per appenderci il codice che hai davanti.":
    "La pizarra está vacía. En el LAB, pulsa → PIZARRA para colgar el código que tienes delante.",
  "La lavagna è vuota per ora. Quando chi tiene il laboratorio ci appende qualcosa, comparirà qui da solo.":
    "La pizarra está vacía por ahora. Cuando quien dirige el taller cuelgue algo, aparecerá aquí solo.",
  "Per vedere gli invii della classe serve la password docente.":
    "Para ver los envíos de la clase hace falta la contraseña del docente.",
  "INSERISCI LA PASSWORD": "INTRODUCE LA CONTRASEÑA",
  "Password docente per la lavagna:": "Contraseña del docente para la pizarra:",
  "Nessun invio. Gli studenti usano INVIA VISUALE o INVIA SUONO dalla lavagna.":
    "Ningún envío. Los estudiantes usan ENVIAR VISUAL o ENVIAR SONIDO desde la pizarra.",
  'Il pattern non si lascia leggere: {error}': 'No se puede leer el pattern: {error}',
  // nomi dei righi dello spartito (js/score.js)
  'Melodia': 'Melodía',
  'Mel.': 'Mel.',
  'Accompagnamento': 'Acompañamiento',
  'Acc.': 'Acomp.',
  'Basso': 'Bajo',
  'B.': 'B.',
  'Batteria': 'Batería',
  'Batt.': 'Bat.',
});
