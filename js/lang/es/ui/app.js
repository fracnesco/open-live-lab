/* Frasi dell'interfaccia — Español.
   Sorgenti: index.html (testi, data-help, placeholder, title, aria-label,
   data-prompt), js/theme.js, js/main.js, js/help.js, js/editor.js,
   js/tutorial.js, js/console.js.
   I data-prompt dei bottoni rapidi dell'assistente sono richieste mandate
   all'AI: sono tradotti come richieste in spagnolo. */

I18N.add('es', {
  /* ── index.html: barra in alto e viste ─────────────────────────────── */
  'Open Live Lab — Laboratorio di Live Coding': 'Open Live Lab — Laboratorio de Live Coding',
  'live coding · didattica': 'live coding · didáctica',
  'LAVAGNA': 'PIZARRA',
  '🎤 MIC': '🎤 MIC',
  '♪ SPARTITO': '♪ PARTITURA',
  'ESEMPI': 'EJEMPLOS',
  '♫ SUONI': '♫ SONIDOS',
  'ASSISTENTE': 'ASISTENTE',
  '? AIUTO': '? AYUDA',
  '◐ TEMA ▾': '◐ TEMA ▾',
  '▶ ESEGUI': '▶ EJECUTAR',
  '■ STOP': '■ STOP',
  '★ SALVA': '★ GUARDAR',
  '→ LAVAGNA': '→ PIZARRA',
  '+ TIMELINE': '+ TIMELINE',
  'pronto': 'listo',
  '⟲ LOOP': '⟲ LOOP',
  'zoom': 'zoom',
  '⬇ SALVA': '⬇ GUARDAR',
  '⬆ APRI': '⬆ ABRIR',
  '+ SUONO': '+ SONIDO',
  'doppio clic su una traccia = nuova clip · doppio clic su una clip = codice, varianti 🎲 e variabili ∿ · trascina = sposta (anche su/giù tra tracce suono) · alt+trascina = duplica · cmd+C / cmd+V = copia e incolla · bordi = allunga/accorcia · clic sul righello = sposta la linea del tempo · ∿ inviluppo: clic = nuovo punto, clic su un punto = cancella':
    'doble clic en una pista = nuevo clip · doble clic en un clip = código, variantes 🎲 y variables ∿ · arrastrar = mover (también arriba/abajo entre pistas de sonido) · alt+arrastrar = duplicar · cmd+C / cmd+V = copiar y pegar · bordes = alargar/acortar · clic en la regla = mover la línea de tiempo · ∿ envolvente: clic = nuevo punto, clic en un punto = borrar',
  'lavagna della classe': 'pizarra de la clase',
  'il tuo nome': 'tu nombre',
  'INVIA VISUALE': 'ENVIAR VISUAL',
  'INVIA SUONO': 'ENVIAR SONIDO',
  'schede': 'fichas',
  'ricevuti': 'recibidos',
  'spartito · suono': 'partitura · sonido',
  'battute': 'compases',
  '↻ AGGIORNA': '↻ ACTUALIZAR',
  'notazione ABC (testo)': 'notación ABC (texto)',
  'libreria esempi': 'biblioteca de ejemplos',
  'libreria suoni': 'biblioteca de sonidos',
  'assistente ai': 'asistente ia',
  '✦ esempio visuale': '✦ ejemplo visual',
  '♪ esempio ritmo': '♪ ejemplo de ritmo',
  '? spiega il mio codice': '? explica mi código',
  'INVIA': 'ENVIAR',
  'pronta — qui compaiono esecuzioni ed errori spiegati': 'lista — aquí aparecen las ejecuciones y los errores explicados',
  'sorgente': 'código fuente',
  'PULISCI': 'LIMPIAR',
  'MODALITÀ AIUTO ATTIVA — passa il mouse sugli elementi · seleziona una funzione nel codice per scoprire cosa fa · ESC per uscire':
    'MODO AYUDA ACTIVO — pasa el mouse sobre los elementos · selecciona una función en el código para descubrir qué hace · ESC para salir',
  'varianti': 'variantes',
  '+ VARIANTE': '+ VARIANTE',
  '🎲 una a caso': '🎲 una al azar',
  '🔁 in sequenza': '🔁 en secuencia',
  'variabili': 'variables',
  '+ VARIABILE': '+ VARIABLE',
  '■ FERMA': '■ DETENER',
  '🗑 ELIMINA': '🗑 ELIMINAR',
  'FATTO': 'LISTO',

  /* ── index.html: data-help ─────────────────────────────────────────── */
  'Open Live Lab|Laboratorio di live coding: crea visuali con Hydra e musica con Strudel, scrivendo codice dal vivo.':
    'Open Live Lab|Laboratorio de live coding: crea visuales con Hydra y música con Strudel, escribiendo código en vivo.',
  'Viste|Passa dai TUTORIAL (per imparare passo passo) al LAB (dove scrivi ed esegui il codice) alla TIMELINE (dove organizzi i codici nel tempo) alla LAVAGNA (dove la classe si scambia il codice).':
    'Vistas|Pasa del TUTORIAL (para aprender paso a paso) al LAB (donde escribes y ejecutas el código), a la TIMELINE (donde organizas los códigos en el tiempo) y a la PIZARRA (donde la clase intercambia código).',
  'Vista TUTORIAL|Percorsi passo passo: ogni passo spiega un\'idea e ha un riquadro di codice da eseguire e modificare sul posto. Da lì il codice si porta nel LAB o nella timeline.':
    'Vista TUTORIAL|Recorridos paso a paso: cada paso explica una idea y tiene un recuadro de código para ejecutar y modificar ahí mismo. Desde ahí el código se lleva al LAB o a la timeline.',
  'Vista LAB|La sala prove: due editor di codice, uno per le visuali e uno per il suono. Scrivi e premi ESEGUI.':
    'Vista LAB|La sala de ensayo: dos editores de código, uno para las visuales y otro para el sonido. Escribe y pulsa EJECUTAR.',
  'Vista TIMELINE|Il palcoscenico: disponi i tuoi codici su due tracce nel tempo e premi PLAY per la performance completa.':
    'Vista TIMELINE|El escenario: coloca tus códigos en dos pistas a lo largo del tiempo y pulsa PLAY para la performance completa.',
  'Vista LAVAGNA|La bacheca della classe: qui compaiono gli esempi appesi da chi tiene il laboratorio, e da qui puoi mandargli i tuoi.':
    'Vista PIZARRA|El tablón de la clase: aquí aparecen los ejemplos que publica quien dirige el taller, y desde aquí puedes enviarle los tuyos.',
  'Microfono|Accendendolo, le visuali possono reagire al suono: nel codice Hydra usi a.fft[0] (bassi), a.fft[1], a.fft[2], a.fft[3] (acuti). Il browser ti chiederà il permesso. Il suono resta su questo computer: non viene registrato né inviato.':
    'Micrófono|Al encenderlo, las visuales pueden reaccionar al sonido: en el código Hydra usas a.fft[0] (graves), a.fft[1], a.fft[2], a.fft[3] (agudos). El navegador te pedirá permiso. El sonido se queda en este equipo: no se graba ni se envía.',
  'Spartito|Mostra il pattern SUONO (dell\'editor, o del riquadro del tutorial che hai appena fatto partire) come uno spartito in notazione tradizionale: ogni ciclo di Strudel diventa una battuta in 4/4. Non fa partire né cambia la musica: serve a leggere il ritmo e le note.':
    'Partitura|Muestra el pattern SONIDO (del editor, o del recuadro del tutorial que acabas de poner en marcha) como una partitura en notación tradicional: cada ciclo de Strudel se convierte en un compás de 4/4. No pone en marcha ni cambia la música: sirve para leer el ritmo y las notas.',
  'Esempi|Apre la libreria di esempi pronti: cliccane uno per caricarlo nell\'editor e capire come funziona.':
    'Ejemplos|Abre la biblioteca de ejemplos listos: haz clic en uno para cargarlo en el editor y entender cómo funciona.',
  'Suoni|Apre la libreria di tutti i suoni che puoi usare con s("…"): i campioni registrati e, in fondo, i sintetizzatori e i rumori. Passa sopra a un suono per vederne la forma d\'onda, cliccalo per ascoltarlo. Le etichette in alto aiutano a trovare quello che cerchi.':
    'Sonidos|Abre la biblioteca de todos los sonidos que puedes usar con s("…"): las muestras grabadas y, al final, los sintetizadores y los ruidos. Pasa por encima de un sonido para ver su forma de onda, haz clic para escucharlo. Las etiquetas de arriba te ayudan a encontrar lo que buscas.',
  'Assistente AI|Apre l\'assistente basato su Ollama: chiedigli di creare esempi di codice o di spiegarti quello che hai scritto. Gira tutto sul tuo computer.':
    'Asistente IA|Abre el asistente basado en Ollama: pídele que cree ejemplos de código o que te explique lo que has escrito. Todo funciona en tu equipo.',
  'Modalità aiuto|È questa! Quando è attiva, passa il mouse su qualsiasi elemento per una spiegazione, oppure seleziona una funzione nel codice per scoprire cosa fa. Premi ESC o riclicca per uscire.':
    'Modo ayuda|¡Es este! Cuando está activo, pasa el mouse sobre cualquier elemento para ver una explicación, o selecciona una función en el código para descubrir qué hace. Pulsa ESC o vuelve a hacer clic para salir.',
  'Tema|Cambia i colori e i caratteri dell\'interfaccia: apri il menu e scegli un tema. In fondo al menu, lo slider OPACITÀ PANNELLI rende i pannelli trasparenti per vedere la visuale sotto. Le scelte vengono ricordate su questo computer. Il codice e la musica non cambiano.':
    'Tema|Cambia los colores y las fuentes de la interfaz: abre el menú y elige un tema. Al final del menú, el control OPACIDAD DE LOS PANELES vuelve transparentes los paneles para ver la visual debajo. Tus elecciones se recuerdan en este equipo. El código y la música no cambian.',
  'Lingua|Cambia la lingua dell\'app: italiano, inglese o spagnolo. Si traducono l\'interfaccia, i tutorial, gli esempi e i commenti nel loro codice. La pagina si ricarica: il codice negli editor e la timeline restano. La scelta viene ricordata su questo computer.':
    'Idioma|Cambia el idioma de la app: italiano, inglés o español. Se traducen la interfaz, los tutoriales, los ejemplos y los comentarios de su código. La página se recarga: el código de los editores y la timeline se mantienen. Tu elección se recuerda en este equipo.',
  'Editor VISUALE|Qui scrivi il codice Hydra che genera le immagini. Il risultato appare sullo sfondo, dietro i pannelli. Suggerimento: seleziona il nome di una funzione (es. osc, kaleid) per farti spiegare cosa fa.':
    'Editor VISUAL|Aquí escribes el código Hydra que genera las imágenes. El resultado aparece en el fondo, detrás de los paneles. Consejo: selecciona el nombre de una función (p. ej. osc, kaleid) para que te expliquen qué hace.',
  'Esegui visuale|Fa partire il codice Hydra scritto qui sotto. Scorciatoia: Cmd+Invio dentro l\'editor.':
    'Ejecutar visual|Pone en marcha el código Hydra escrito aquí abajo. Atajo: Cmd+Enter dentro del editor.',
  'Ferma visuale|Ferma le immagini e riporta lo sfondo al nero.':
    'Detener visual|Detiene las imágenes y devuelve el fondo a negro.',
  'Salva negli esempi|Salva questo codice nella libreria ESEMPI, nella sezione \'I tuoi esempi\': lo ritroverai anche alle prossime sessioni.':
    'Guardar en ejemplos|Guarda este código en la biblioteca EJEMPLOS, en la sección \'Tus ejemplos\': lo encontrarás también en las próximas sesiones.',
  'Appendi alla lavagna|Mette questo codice sulla lavagna della classe: lo vedranno tutti gli studenti.':
    'Publicar en la pizarra|Pone este código en la pizarra de la clase: lo verán todos los estudiantes.',
  'Aggiungi alla timeline|Salva questo codice come clip sulla traccia VISUALE della timeline, per usarlo nella performance.':
    'Añadir a la timeline|Guarda este código como clip en la pista VISUAL de la timeline, para usarlo en la performance.',
  'Stato visuale|Qui compaiono i messaggi: verde se il codice funziona, rosso se c\'è un errore (con la spiegazione).':
    'Estado visual|Aquí aparecen los mensajes: verde si el código funciona, rojo si hay un error (con la explicación).',
  'Editor SUONO|Qui scrivi i pattern Strudel che generano la musica: note, ritmi e suoni si scrivono come piccole frasi di testo. Suggerimento: seleziona il nome di una funzione (es. sound, fast) o di un suono (es. bd) per farti spiegare cosa fa.':
    'Editor SONIDO|Aquí escribes los pattern de Strudel que generan la música: notas, ritmos y sonidos se escriben como pequeñas frases de texto. Consejo: selecciona el nombre de una función (p. ej. sound, fast) o de un sonido (p. ej. bd) para que te expliquen qué hace.',
  'Esegui suono|Fa partire il pattern musicale scritto qui sotto. Scorciatoia: Cmd+Invio dentro l\'editor.':
    'Ejecutar sonido|Pone en marcha el pattern musical escrito aquí abajo. Atajo: Cmd+Enter dentro del editor.',
  'Ferma suono|Ferma la musica (in Strudel si chiama \'hush\', cioè \'silenzio\').':
    'Detener sonido|Detiene la música (en Strudel se llama \'hush\', es decir, \'silencio\').',
  'Salva negli esempi|Salva questo pattern nella libreria ESEMPI, nella sezione \'I tuoi esempi\': lo ritroverai anche alle prossime sessioni.':
    'Guardar en ejemplos|Guarda este pattern en la biblioteca EJEMPLOS, en la sección \'Tus ejemplos\': lo encontrarás también en las próximas sesiones.',
  'Aggiungi alla timeline|Salva questo pattern come clip sulla traccia SUONO della timeline, per usarlo nella performance.':
    'Añadir a la timeline|Guarda este pattern como clip en la pista SONIDO de la timeline, para usarlo en la performance.',
  'Stato suono|Qui compaiono i messaggi: verde se il pattern suona, rosso se c\'è un errore (con la spiegazione).':
    'Estado del sonido|Aquí aparecen los mensajes: verde si el pattern suena, rojo si hay un error (con la explicación).',
  'Play|Fa partire la performance: ogni clip esegue il suo codice quando la linea del tempo la raggiunge. Scorciatoia: barra spaziatrice.':
    'Play|Pone en marcha la performance: cada clip ejecuta su código cuando la línea de tiempo lo alcanza. Atajo: barra espaciadora.',
  'Stop|Ferma la performance e riporta la linea del tempo all\'inizio.':
    'Stop|Detiene la performance y lleva la línea de tiempo al principio.',
  'Loop|Quando è acceso, arrivata alla fine la performance ricomincia da capo, all\'infinito.':
    'Loop|Cuando está encendido, al llegar al final la performance vuelve a empezar desde el principio, sin fin.',
  'Tempo|Il punto esatto in cui si trova la performance: secondi trascorsi / durata totale.':
    'Tiempo|El punto exacto en el que está la performance: segundos transcurridos / duración total.',
  'Zoom|Allarga o restringe la timeline: utile per lavorare con precisione o vedere tutta la performance. Puoi anche usare la rotellina del mouse sulla timeline.':
    'Zoom|Ensancha o estrecha la timeline: útil para trabajar con precisión o ver toda la performance. También puedes usar la rueda del mouse sobre la timeline.',
  'Esporta|Scarica la performance come file .json: puoi portarla su un altro computer o conservarla.':
    'Exportar|Descarga la performance como archivo .json: puedes llevarla a otro equipo o conservarla.',
  'Importa|Carica una performance salvata in precedenza da un file .json.':
    'Importar|Carga una performance guardada antes desde un archivo .json.',
  'Nuova traccia suono|Aggiunge un\'altra traccia SUONO (fino a 8). I pattern delle tracce suonano insieme e restano sempre a tempo tra loro: condividono lo stesso orologio musicale.':
    'Nueva pista de sonido|Añade otra pista SONIDO (hasta 8). Los pattern de las pistas suenan juntos y siempre van a tempo entre sí: comparten el mismo reloj musical.',
  'Timeline|Il tempo scorre da sinistra a destra. Trascina le clip per spostarle (Alt+trascina per duplicarle), tira i bordi per allungarle, doppio clic per modificarne il codice, doppio clic su uno spazio vuoto per creare una clip nuova. Cmd+C / Cmd+V copiano e incollano la clip selezionata alla linea del tempo.':
    'Timeline|El tiempo corre de izquierda a derecha. Arrastra los clips para moverlos (Alt+arrastrar para duplicarlos), estira los bordes para alargarlos, doble clic para modificar su código, doble clic en un espacio vacío para crear un clip nuevo. Cmd+C / Cmd+V copian el clip seleccionado y lo pegan en la línea de tiempo.',
  'Lavagna|Il posto dove chi tiene il laboratorio appende esempi di codice per tutti, e dove tu puoi mandargli i tuoi.':
    'Pizarra|El lugar donde quien dirige el taller publica ejemplos de código para todos, y donde tú puedes enviarle los tuyos.',
  'come ti chiami': 'cómo te llamas',
  'Il tuo nome|Serve solo perché chi riceve il tuo esempio sappia di chi è. Resta su questo computer.':
    'Tu nombre|Solo sirve para que quien recibe tu ejemplo sepa de quién es. Se queda en este equipo.',
  'Invia la visuale|Manda il codice del tuo editor VISUALE a chi tiene il laboratorio.':
    'Enviar la visual|Envía el código de tu editor VISUAL a quien dirige el taller.',
  'Invia il suono|Manda il codice del tuo editor SUONO a chi tiene il laboratorio.':
    'Enviar el sonido|Envía el código de tu editor SONIDO a quien dirige el taller.',
  'Elenco dei tutorial|Scegli un percorso. Il numero a destra dice quanti passi hai già provato; ✓ vuol dire completato.':
    'Lista de tutoriales|Elige un recorrido. El número de la derecha indica cuántos pasos ya has probado; ✓ quiere decir completado.',
  'Da dove viene|Lo spartito mostra l\'ultimo codice SUONO che hai fatto partire con ▶: quello dell\'editor SUONO del LAB, oppure quello di un riquadro dei TUTORIAL.':
    'De dónde viene|La partitura muestra el último código SONIDO que pusiste en marcha con ▶: el del editor SONIDO del LAB, o el de un recuadro de los TUTORIAL.',
  'Battute|Quante battute mostrare. Un ciclo di Strudel è una battuta. Con AUTO lo spartito si ferma quando il pattern comincia a ripetersi: "<c4 e4> g4" ne occupa due, perché alterna a ogni ciclo.':
    'Compases|Cuántos compases mostrar. Un ciclo de Strudel es un compás. Con AUTO la partitura se detiene cuando el pattern empieza a repetirse: "<c4 e4> g4" ocupa dos, porque alterna en cada ciclo.',
  'Aggiorna spartito|Rilegge il codice e ridisegna lo spartito: quello dell\'editor SUONO, o quello del tutorial se l\'ultimo ▶ l\'hai premuto lì. Succede da solo ogni volta che premi ▶ ESEGUI.':
    'Actualizar partitura|Vuelve a leer el código y redibuja la partitura: la del editor SONIDO, o la del tutorial si el último ▶ lo pulsaste ahí. Ocurre solo cada vez que pulsas ▶ EJECUTAR.',
  'Chiudi|Chiude lo spartito.': 'Cerrar|Cierra la partitura.',
  'Spartito|Ogni battuta è un ciclo del pattern. Le note con un\'altezza stanno sul pentagramma; i suoni di batteria sul rigo di percussioni, con il nome scritto sopra la prima volta che compaiono. Il numero sopra un gruppo di note (3, 5, 7) indica una terzina, una quintina, una settimina: tante note in parti uguali dove normalmente ce ne starebbero 2 o 4.':
    'Partitura|Cada compás es un ciclo del pattern. Las notas con altura están en el pentagrama; los sonidos de batería en la línea de percusión, con el nombre escrito encima la primera vez que aparecen. El número sobre un grupo de notas (3, 5, 7) indica un tresillo, un quintillo, un septillo: esas notas en partes iguales donde normalmente cabrían 2 o 4.',
  'Puntatore|Quando il suono che senti è proprio quello scritto su questo spartito, una linea azzurra scorre sulle note a tempo con la musica e accende quelle che stanno suonando. Se cambi il codice senza premere ▶ ESEGUI, o se sta suonando la timeline, il puntatore si nasconde: spartito e musica non coincidono più.':
    'Puntero|Cuando el sonido que oyes es justo el que está escrito en esta partitura, una línea celeste recorre las notas a tempo con la música e ilumina las que están sonando. Si cambias el código sin pulsar ▶ EJECUTAR, o si está sonando la timeline, el puntero se oculta: partitura y música ya no coinciden.',
  'Notazione ABC|Lo stesso spartito scritto come testo, nel formato ABC: C D E sono le note, il numero è la durata in semicrome, z è una pausa, | è la stanghetta. È un altro modo ancora di scrivere la musica con le lettere — come fa Strudel.':
    'Notación ABC|La misma partitura escrita como texto, en formato ABC: C D E son las notas, el número es la duración en semicorcheas, z es un silencio, | es la barra de compás. Es otra forma más de escribir la música con letras — como hace Strudel.',
  'Chiudi|Chiude la libreria degli esempi.': 'Cerrar|Cierra la biblioteca de ejemplos.',
  'Esempi visuali|Mostra gli esempi per Hydra: immagini, forme, colori e deformazioni.':
    'Ejemplos visuales|Muestra los ejemplos para Hydra: imágenes, formas, colores y deformaciones.',
  'Esempi sonori|Mostra gli esempi per Strudel: note, ritmi, melodie e strutture musicali.':
    'Ejemplos sonoros|Muestra los ejemplos para Strudel: notas, ritmos, melodías y estructuras musicales.',
  'Etichette|Raggruppano gli esempi per argomento. Accendendone più di una restano solo gli esempi che le hanno tutte; il numero dice quanti ne resterebbero.':
    'Etiquetas|Agrupan los ejemplos por tema. Si enciendes más de una, quedan solo los ejemplos que las tienen todas; el número indica cuántos quedarían.',
  'Chiudi|Chiude la libreria dei suoni.': 'Cerrar|Cierra la biblioteca de sonidos.',
  'Etichette|Filtrano i suoni per tipo. Accendendone più di una restano solo i suoni che le hanno tutte; il numero dice quanti ne resterebbero.':
    'Etiquetas|Filtran los sonidos por tipo. Si enciendes más de una, quedan solo los sonidos que las tienen todas; el número indica cuántos quedarían.',
  'stato di Ollama': 'estado de Ollama',
  'Stato Ollama|Verde: Ollama è attivo su questo computer e l\'assistente funziona. Rosso: apri l\'app Ollama o esegui \'ollama serve\' nel terminale.':
    'Estado de Ollama|Verde: Ollama está activo en este equipo y el asistente funciona. Rojo: abre la app Ollama o ejecuta \'ollama serve\' en la terminal.',
  'Modello|Il modello di linguaggio da usare, tra quelli installati con Ollama. I modelli più grandi rispondono meglio ma più lentamente.':
    'Modelo|El modelo de lenguaje que se usa, entre los instalados con Ollama. Los modelos más grandes responden mejor pero más despacio.',
  'Chiudi|Chiude l\'assistente AI.': 'Cerrar|Cierra el asistente IA.',
  'Conversazione|Le risposte dell\'assistente compaiono qui. Sui blocchi di codice trovi due bottoni: PROVA lo esegue subito, INSERISCI lo copia nell\'editor.':
    'Conversación|Las respuestas del asistente aparecen aquí. En los bloques de código encontrarás dos botones: PROBAR lo ejecuta enseguida, INSERTAR lo copia en el editor.',
  'Crea un semplice esempio visuale con Hydra: qualcosa di colorato e in movimento. Spiega ogni riga.':
    'Crea un ejemplo visual sencillo con Hydra: algo colorido y en movimiento. Explica cada línea.',
  'Idea rapida|Chiede all\'assistente un esempio visuale Hydra già pronto, con la spiegazione riga per riga.':
    'Idea rápida|Pide al asistente un ejemplo visual de Hydra listo para usar, explicado línea por línea.',
  'Crea un semplice pattern ritmico con Strudel usando cassa, rullante e charleston. Spiega la sintassi.':
    'Crea un pattern rítmico sencillo con Strudel usando bombo, caja y hi-hat. Explica la sintaxis.',
  'Idea rapida|Chiede all\'assistente un ritmo Strudel già pronto, con la spiegazione della sintassi.':
    'Idea rápida|Pide al asistente un ritmo de Strudel listo para usar, con la explicación de la sintaxis.',
  'Spiega il mio codice|Prima VERIFICA il codice dell\'editor attivo: se funziona, l\'assistente lo spiega riga per riga; se contiene un errore, ti spiega dove sta il problema e come correggerlo.':
    'Explica mi código|Primero VERIFICA el código del editor activo: si funciona, el asistente lo explica línea por línea; si contiene un error, te explica dónde está el problema y cómo corregirlo.',
  'Chiedi un esempio, una variazione, una spiegazione…': 'Pide un ejemplo, una variación, una explicación…',
  'La tua domanda|Scrivi qui cosa vuoi: \'crea un caleidoscopio verde\', \'rendi questo ritmo più veloce\', \'perché non funziona?\'. Invio per mandare.':
    'Tu pregunta|Escribe aquí lo que quieres: \'crea un caleidoscopio verde\', \'haz este ritmo más rápido\', \'¿por qué no funciona?\'. Enter para enviar.',
  'Invia|Manda la domanda all\'assistente. Mentre risponde diventa FERMA, per interrompere una risposta troppo lunga.':
    'Enviar|Envía la pregunta al asistente. Mientras responde se convierte en DETENER, para interrumpir una respuesta demasiado larga.',
  'Console|Il diario di bordo dell\'app: registra ogni esecuzione e soprattutto SPIEGA gli errori in italiano. Si apre da sola quando qualcosa va storto.':
    'Consola|El cuaderno de bitácora de la app: registra cada ejecución y sobre todo EXPLICA los errores en español. Se abre sola cuando algo sale mal.',
  'Errori|Quanti errori sono arrivati da quando la console è chiusa.':
    'Errores|Cuántos errores han llegado desde que la consola está cerrada.',
  'Codice sorgente|Open Live Lab è costruito su Strudel e Hydra, che sono software libero (AGPL): il codice di questa app è pubblico e puoi leggerlo.':
    'Código fuente|Open Live Lab está construido sobre Strudel y Hydra, que son software libre (AGPL): el código de esta app es público y puedes leerlo.',
  'Pulisci|Svuota la console: utile per ripartire da zero prima di un nuovo tentativo.':
    'Limpiar|Vacía la consola: útil para empezar de cero antes de un nuevo intento.',
  'Chiudi|Riduce la console alla sola barra: si riaprirà da sola al prossimo errore.':
    'Cerrar|Reduce la consola a su barra: se volverá a abrir sola con el próximo error.',
  'Messaggi|Ogni riga: ora, da dove arriva (VISUALE, SUONO, TIMELINE…), il messaggio e — per gli errori — una spiegazione con la freccia →. Gli errori ripetuti si accorpano con ×N.':
    'Mensajes|Cada línea: hora, de dónde viene (VISUAL, SONIDO, TIMELINE…), el mensaje y — para los errores — una explicación con la flecha →. Los errores repetidos se agrupan con ×N.',
  'Chiudi|Chiude la finestra salvando le modifiche alla clip.':
    'Cerrar|Cierra la ventana guardando los cambios del clip.',
  'nome della clip': 'nombre del clip',
  'Nome clip|Il nome che compare sul blocco nella timeline: scegli qualcosa che ti aiuti a ricordare cosa fa.':
    'Nombre del clip|El nombre que aparece en el bloque de la timeline: elige algo que te ayude a recordar qué hace.',
  'Varianti|Una clip può contenere più versioni alternative del suo codice. Quando la linea del tempo la raggiunge, ne viene scelta una: a caso 🎲 o in sequenza 🔁.':
    'Variantes|Un clip puede contener varias versiones alternativas de su código. Cuando la línea de tiempo lo alcanza, se elige una: al azar 🎲 o en secuencia 🔁.',
  'Nuova variante|Aggiunge una variante: parte da una copia del codice attuale, poi modificala. A ogni passaggio della timeline la clip ne sceglierà una.':
    'Nueva variante|Añade una variante: parte de una copia del código actual, luego modifícala. En cada pasada de la timeline el clip elegirá una.',
  'Elimina variante|Cancella la variante mostrata in questo momento.':
    'Eliminar variante|Borra la variante que se muestra en este momento.',
  'Come scegliere|🎲 una a caso: a ogni passaggio la clip pesca una variante a sorte. 🔁 in sequenza: le varianti si alternano in ordine, un passaggio ciascuna.':
    'Cómo elegir|🎲 una al azar: en cada pasada el clip saca una variante a suerte. 🔁 en secuencia: las variantes se turnan en orden, una pasada cada una.',
  'Codice della clip|Il codice che verrà eseguito quando la performance raggiunge questa clip. Modificalo e premi PROVA per sentire/vedere subito il risultato.':
    'Código del clip|El código que se ejecutará cuando la performance alcance este clip. Modifícalo y pulsa PROBAR para oír/ver el resultado enseguida.',
  'Variabili|Numeri che cambiano nel tempo mentre la clip suona. Ognuna ha un nome e un range (da… a…); il suo inviluppo, nella corsia sotto la traccia, dice quanto vale istante per istante. Nel codice si scrive il nome al posto di un numero.':
    'Variables|Números que cambian con el tiempo mientras suena el clip. Cada una tiene un nombre y un rango (de… a…); su envolvente, en el carril bajo la pista, indica cuánto vale en cada instante. En el código se escribe el nombre en lugar de un número.',
  'Nuova variabile|Aggiunge una variabile alla clip: dagli un nome, scegli da quanto a quanto può andare, poi usala nel codice. Chiusa la finestra, disegna il suo inviluppo nella corsia sotto la traccia.':
    'Nueva variable|Añade una variable al clip: ponle un nombre, elige desde cuánto hasta cuánto puede ir y luego úsala en el código. Al cerrar la ventana, dibuja su envolvente en el carril bajo la pista.',
  'Prova|Esegue subito il codice della clip, senza aspettare la timeline: così controlli che funzioni.':
    'Probar|Ejecuta enseguida el código del clip, sin esperar a la timeline: así compruebas que funciona.',
  'Ferma prova|Ferma l\'esecuzione di prova.': 'Detener prueba|Detiene la ejecución de prueba.',
  'Elimina|Cancella questa clip dalla timeline. Puoi annullare con Cmd+Z.':
    'Eliminar|Borra este clip de la timeline. Puedes deshacerlo con Cmd+Z.',
  'Fatto|Salva le modifiche e chiude la finestra.': 'Listo|Guarda los cambios y cierra la ventana.',

  /* ── js/theme.js ───────────────────────────────────────────────────── */
  'Notte': 'Noche',
  'Brace': 'Brasas',
  'Aurora': 'Aurora',
  'Tema: {name}': 'Tema: {name}',
  'Opacità dei pannelli|Sposta a sinistra per rendere i pannelli trasparenti e vedere la visuale sotto il codice e i tutorial. 100% è com\'erano. La scelta viene ricordata su questo computer.':
    'Opacidad de los paneles|Desliza a la izquierda para volver transparentes los paneles y ver la visual debajo del código y los tutoriales. 100% es como estaban. Tu elección se recuerda en este equipo.',
  'opacità pannelli': 'opacidad de los paneles',
  'Opacità dei pannelli': 'Opacidad de los paneles',
  'Evidenzia ciò che suona|Mentre la musica suona, nel codice si illuminano le note e i suoni che si stanno sentendo in quel momento, come sul sito di Strudel. Toglilo se ti distrae. La scelta viene ricordata su questo computer.':
    'Resaltar lo que suena|Mientras suena la música, en el código se iluminan las notas y los sonidos que se oyen en ese momento, como en el sitio de Strudel. Desactívalo si te distrae. Tu elección se recuerda en este equipo.',
  'evidenzia ciò che suona': 'resaltar lo que suena',

  /* ── js/main.js ────────────────────────────────────────────────────── */
  'Clicca per caricarlo nell\'editor VISUALE.': 'Haz clic para cargarlo en el editor VISUAL.',
  'Clicca per caricarlo nell\'editor SUONO.': 'Haz clic para cargarlo en el editor SONIDO.',
  'CARICA': 'CARGAR',
  'Carica|Copia l\'esempio nell\'editor, senza eseguirlo: leggilo, modificalo, poi premi ESEGUI.':
    'Cargar|Copia el ejemplo en el editor sin ejecutarlo: léelo, modifícalo y luego pulsa EJECUTAR.',
  'Prova|Carica l\'esempio nell\'editor e lo esegue subito.':
    'Probar|Carga el ejemplo en el editor y lo ejecuta enseguida.',
  'Aggiungi alla timeline|Aggiunge questo esempio come clip in coda alla traccia VISUALE della timeline.':
    'Añadir a la timeline|Añade este ejemplo como clip al final de la pista VISUAL de la timeline.',
  'Aggiungi alla timeline|Aggiunge questo esempio come clip in coda alla traccia SUONO della timeline.':
    'Añadir a la timeline|Añade este ejemplo como clip al final de la pista SONIDO de la timeline.',
  'Elimina|Cancella questo esempio salvato dalla libreria.':
    'Eliminar|Borra este ejemplo guardado de la biblioteca.',
  'Eliminare l\'esempio «{title}»?': '¿Eliminar el ejemplo «{title}»?',
  'Clicca per mostrare solo questi esempi; accendendo più etichette restano gli esempi che le hanno tutte.':
    'Haz clic para mostrar solo estos ejemplos; si enciendes más etiquetas, quedan los ejemplos que las tienen todas.',
  '✕ tutte': '✕ todas',
  'Tutte|Spegne le etichette e torna a mostrare tutti gli esempi.':
    'Todas|Apaga las etiquetas y vuelve a mostrar todos los ejemplos.',
  'I tuoi esempi': 'Tus ejemplos',
  'Microfono acceso: il browser ti chiederà il permesso alla prossima esecuzione.':
    'Micrófono encendido: el navegador te pedirá permiso en la próxima ejecución.',
  'Nel codice Hydra usa a.fft[0] (bassi) … a.fft[3] (acuti). Esempio: osc(20).rotate(() => a.fft[0] * 3).out()':
    'En el código Hydra usa a.fft[0] (graves) … a.fft[3] (agudos). Ejemplo: osc(20).rotate(() => a.fft[0] * 3).out()',
  'Microfono spento.': 'Micrófono apagado.',
  'Nome dell\'esempio:': 'Nombre del ejemplo:',
  'senza titolo': 'sin título',
  '★ salvato negli esempi': '★ guardado en ejemplos',
  'Open Live Lab va servito da un piccolo server locale, non aperto come file. Avvialo con: ./start.sh (poi apri http://localhost:8765)':
    'Open Live Lab debe servirse desde un pequeño servidor local, no abrirse como archivo. Inícialo con: ./start.sh (luego abre http://localhost:8765)',
  'La pagina non è servita in HTTPS: il suono non può funzionare.':
    'La página no se sirve por HTTPS: el sonido no puede funcionar.',
  'Apri lo stesso indirizzo con https:// all\'inizio.': 'Abre la misma dirección con https:// al principio.',
  'Password docente per la lavagna:': 'Contraseña del docente para la pizarra:',
  'Titolo della scheda (lo vedono gli studenti):': 'Título de la ficha (lo ven los estudiantes):',
  'esempio suono': 'ejemplo de sonido',
  'esempio visuale': 'ejemplo visual',
  '«{title}» è ora sulla lavagna di tutta la classe': '«{title}» ya está en la pizarra de toda la clase',
  'non sono riuscito ad appendere: {error}': 'no se pudo publicar: {error}',
  'Ricarica la pagina per reinserire la password docente.': 'Recarga la página para volver a introducir la contraseña docente.',
  'Controlla che api/board.php sia stato caricato sul server.': 'Comprueba que api/board.php se haya subido al servidor.',
  'non c\'è niente da inviare: l\'editor è vuoto': 'no hay nada que enviar: el editor está vacío',
  'Come ti chiami? (serve solo perché si sappia di chi è)': '¿Cómo te llamas? (solo sirve para que se sepa de quién es)',
  'inviato ✓ — puoi rimandarlo quando vuoi, sostituisce il precedente':
    'enviado ✓ — puedes volver a enviarlo cuando quieras, reemplaza al anterior',
  'invio non riuscito: {error}': 'no se pudo enviar: {error}',

  /* ── js/help.js ────────────────────────────────────────────────────── */
  'Questa parola non è nel glossario. Prova a chiederlo all\'ASSISTENTE: "cosa fa {word}?"':
    'Esta palabra no está en el glosario. Prueba a preguntárselo al ASISTENTE: "¿qué hace {word}?"',

  /* ── js/editor.js ──────────────────────────────────────────────────── */
  '// VISUALE · Hydra — premi ▶ ESEGUI (o Cmd+Invio)': '// VISUAL · Hydra — pulsa ▶ EJECUTAR (o Cmd+Enter)',
  '// SUONO · Strudel — premi ▶ ESEGUI (o Cmd+Invio)': '// SONIDO · Strudel — pulsa ▶ EJECUTAR (o Cmd+Enter)',
  'eseguo…': 'ejecutando…',
  '● in esecuzione': '● en ejecución',
  '● in riproduzione': '● sonando',
  '▶ codice eseguito': '▶ código ejecutado',
  '■ fermo': '■ detenido',

  /* ── js/tutorial.js ────────────────────────────────────────────────── */
  'tutorial': 'tutoriales',
  '{n} passi.': '{n} pasos.',
  'Codice del passo|Puoi modificarlo quanto vuoi e rieseguirlo con ▶ (o Cmd+Invio). ↺ ORIGINALE lo riporta com\'era.':
    'Código del paso|Puedes modificarlo todo lo que quieras y volver a ejecutarlo con ▶ (o Cmd+Enter). ↺ ORIGINAL lo deja como estaba.',
  'modificalo e premi ▶ ESEGUI': 'modifícalo y pulsa ▶ EJECUTAR',
  'Esegui|Fa partire questo codice: la visuale compare sullo sfondo. Scorciatoia: Cmd+Invio dentro il riquadro.':
    'Ejecutar|Pone en marcha este código: la visual aparece en el fondo. Atajo: Cmd+Enter dentro del recuadro.',
  'Esegui|Fa partire questo codice. Scorciatoia: Cmd+Invio dentro il riquadro.':
    'Ejecutar|Pone en marcha este código. Atajo: Cmd+Enter dentro del recuadro.',
  'Ferma|Ferma la visuale e riporta lo sfondo al nero.': 'Detener|Detiene la visual y devuelve el fondo a negro.',
  'Ferma|Ferma la musica.': 'Detener|Detiene la música.',
  '↺ ORIGINALE': '↺ ORIGINAL',
  'Originale|Rimette il codice com\'era all\'inizio di questo passo, cancellando le tue modifiche.':
    'Original|Deja el código como estaba al principio de este paso y borra tus cambios.',
  'codice originale ripristinato': 'código original restaurado',
  'Porta nell\'editor|Copia questo codice nell\'editor {engine} del LAB, al posto di quello che c\'è, e ti porta lì. Non parte da solo: lo esegui tu.':
    'Llevar al editor|Copia este código en el editor {engine} del LAB, en lugar del que hay, y te lleva allí. No arranca solo: lo ejecutas tú.',
  'Aggiungi alla timeline|Accoda questo codice come clip alla traccia {engine} della timeline.':
    'Añadir a la timeline|Añade este código como clip al final de la pista {engine} de la timeline.',
  'Microfono acceso per questo passo: il browser ti chiederà il permesso.':
    'Micrófono encendido para este paso: el navegador te pedirá permiso.',
  'Il suono resta su questo computer. Lo spegni con 🎤 MIC in alto.':
    'El sonido se queda en este equipo. Lo apagas con 🎤 MIC arriba.',
  '● esegue il codice del tutorial': '● ejecuta el código del tutorial',
  '▶ tutorial «{title}», passo {n}': '▶ tutorial «{title}», paso {n}',
  '{title} · passo {n}': '{title} · paso {n}',
  'codice del tutorial nell\'editor {engine} — premi ▶ ESEGUI per sentirlo':
    'código del tutorial en el editor {engine} — pulsa ▶ EJECUTAR para oírlo',
  'Per tornare al tutorial premi TUTORIAL in alto: lo ritrovi al passo dove eri.':
    'Para volver al tutorial pulsa TUTORIAL arriba: lo encontrarás en el paso donde estabas.',
  '✓ aggiunto alla timeline': '✓ añadido a la timeline',
  'completato ✓': 'completado ✓',
  '{done} di {total} passi provati': '{done} de {total} pasos probados',
  'Scegli un tutorial dall\'elenco.': 'Elige un tutorial de la lista.',
  'Progresso|Un passo si segna ✓ quando esegui il suo codice senza errori. Resta salvato su questo computer.':
    'Progreso|Un paso se marca con ✓ cuando ejecutas su código sin errores. Queda guardado en este equipo.',
  'AZZERA': 'REINICIAR',
  'Azzera|Toglie tutti i ✓ di questo tutorial, per rifarlo da capo.':
    'Reiniciar|Quita todos los ✓ de este tutorial, para hacerlo de nuevo desde el principio.',
  'Azzerare il progresso di «{title}»?': '¿Reiniciar el progreso de «{title}»?',
  'prova tu': 'pruébalo',
  'prossimo': 'siguiente',
  'Prossimo tutorial': 'Siguiente tutorial',
  'fine del percorso: altri tutorial in arrivo': 'fin del recorrido: pronto llegarán más tutoriales',

  /* ── js/console.js ─────────────────────────────────────────────────── */
  '«{name}» non esiste: controlla come è scritto. I nomi validi sono nella libreria ESEMPI, oppure chiedi all\'assistente.':
    '«{name}» no existe: comprueba cómo está escrito. Los nombres válidos están en la biblioteca EJEMPLOS, o pregúntale al asistente.',
  '«{name}» non è una funzione che questo oggetto conosce: forse è di Hydra ma la stai usando in Strudel (o viceversa), o è scritta male.':
    '«{name}» no es una función que este objeto conozca: quizá es de Hydra pero la estás usando en Strudel (o al revés), o está mal escrita.',
  'Manca qualcosa alla fine: probabilmente una parentesi ) o } non chiusa.':
    'Falta algo al final: probablemente un paréntesis ) o una llave } sin cerrar.',
  'C\'è un simbolo fuori posto: controlla parentesi, virgole e punti della catena (ogni .funzione() si aggancia alla precedente).':
    'Hay un símbolo fuera de lugar: revisa paréntesis, comas y puntos de la cadena (cada .función() se engancha a la anterior).',
  'La catena si interrompe prima di «.{name}»: la parte precedente non ha prodotto nulla. Controlla la riga sopra.':
    'La cadena se interrumpe antes de «.{name}»: la parte anterior no produjo nada. Revisa la línea de arriba.',
  'La catena si interrompe prima di questo punto: la parte precedente non ha prodotto nulla. Controlla la riga sopra.':
    'La cadena se interrumpe antes de este punto: la parte anterior no produjo nada. Revisa la línea de arriba.',
  'Il suono «{name}» non esiste qui. Suoni disponibili: bd sd sn hh cp lt mt ht perc casio jazz arpy tabla east space crow xbreak1 dnb1 sax, oppure i sintetizzatori sine triangle sawtooth square supersaw, e gli strumenti guitar epiano organ bell.':
    'El sonido «{name}» no existe aquí. Sonidos disponibles: bd sd sn hh cp lt mt ht perc casio jazz arpy tabla east space crow xbreak1 dnb1 sax, o los sintetizadores sine triangle sawtooth square supersaw, y los instrumentos guitar epiano organ bell.',
  'Una parte del pattern è vuota o scritta male: controlla le virgolette e la mini-notazione.':
    'Una parte del pattern está vacía o mal escrita: revisa las comillas y la mini-notación.',
  'La mini-notazione dentro le virgolette (riga {line}) ha un simbolo fuori posto: controlla parentesi quadre [ ], asterischi e virgole.':
    'La mini-notación entre comillas (línea {line}) tiene un símbolo fuera de lugar: revisa corchetes [ ], asteriscos y comas.',
  'La mini-notazione dentro le virgolette ha un simbolo fuori posto: controlla parentesi quadre [ ], asterischi e virgole.':
    'La mini-notación entre comillas tiene un símbolo fuera de lugar: revisa corchetes [ ], asteriscos y comas.',
  'Sintassi non valida: rileggi la riga indicata cercando simboli mancanti o di troppo.':
    'Sintaxis no válida: vuelve a leer la línea indicada buscando símbolos que falten o sobren.',
  'console pulita': 'consola limpia',
  'SISTEMA': 'SISTEMA',
  'ESECUZIONE': 'EJECUCIÓN',
  'SUONI': 'SONIDOS',
  '? SPIEGA': '? EXPLICAR',
  'Spiega errore|Manda questo errore all\'assistente AI, insieme al codice che lo ha causato: ti spiega cosa significa e come correggerlo.':
    'Explicar error|Envía este error al asistente IA, junto con el código que lo causó: te explica qué significa y cómo corregirlo.',
  'Errore in una funzione () => … del codice visuale: viene rivalutata a ogni frame e intanto Hydra usa il valore di default (per questo l\'immagine sembra ferma o strana).':
    'Error en una función () => … del código visual: se vuelve a evaluar en cada frame y mientras tanto Hydra usa el valor por defecto (por eso la imagen parece quieta o rara).',
  'I parametri-funzione devono restituire un numero, es. () => time * 0.1 oppure () => Math.sin(time).':
    'Los parámetros-función deben devolver un número, p. ej. () => time * 0.1 o () => Math.sin(time).',
  'lo shader non compila: {error}': 'el shader no compila: {error}',
  'Di solito è un valore del tipo sbagliato dentro la catena: controlla i parametri passati alle funzioni.':
    'Normalmente es un valor del tipo equivocado dentro de la cadena: revisa los parámetros que pasas a las funciones.',
  'errore sconosciuto': 'error desconocido',
  'Errore mentre il codice era in esecuzione: se la visuale è sparita, controlla le funzioni () => … che vengono eseguite a ogni frame.':
    'Error mientras el código se ejecutaba: si la visual ha desaparecido, revisa las funciones () => … que se ejecutan en cada frame.',
  '{group} · tutorial': '{group} · tutorial',
});
