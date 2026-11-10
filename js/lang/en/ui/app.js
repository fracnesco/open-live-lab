/* Frasi dell'interfaccia — English.
   Sorgenti: index.html (testi, data-help, placeholder, title, aria-label,
   data-prompt), js/theme.js, js/main.js, js/help.js, js/editor.js,
   js/tutorial.js, js/console.js.
   I data-prompt dei bottoni rapidi dell'assistente sono richieste mandate
   all'AI: sono tradotti come richieste in inglese. */

I18N.add('en', {
  /* ── index.html: barra in alto e viste ─────────────────────────────── */
  'Open Live Lab — Laboratorio di Live Coding': 'Open Live Lab — Live Coding Lab',
  'live coding · didattica': 'live coding · education',
  'LAVAGNA': 'BOARD',
  '🎤 MIC': '🎤 MIC',
  '♪ SPARTITO': '♪ SCORE',
  'ESEMPI': 'EXAMPLES',
  '♫ SUONI': '♫ SOUNDS',
  'ASSISTENTE': 'ASSISTANT',
  '? AIUTO': '? HELP',
  '◐ TEMA ▾': '◐ THEME ▾',
  '▶ ESEGUI': '▶ RUN',
  '■ STOP': '■ STOP',
  '★ SALVA': '★ SAVE',
  '→ LAVAGNA': '→ BOARD',
  '+ TIMELINE': '+ TIMELINE',
  'pronto': 'ready',
  '⟲ LOOP': '⟲ LOOP',
  'zoom': 'zoom',
  '⬇ SALVA': '⬇ SAVE',
  '⬆ APRI': '⬆ OPEN',
  '+ SUONO': '+ SOUND',
  'doppio clic su una traccia = nuova clip · doppio clic su una clip = codice, varianti 🎲 e variabili ∿ · trascina = sposta (anche su/giù tra tracce suono) · alt+trascina = duplica · cmd+C / cmd+V = copia e incolla · bordi = allunga/accorcia · clic sul righello = sposta la linea del tempo · ∿ inviluppo: clic = nuovo punto, clic su un punto = cancella':
    'double-click a track = new clip · double-click a clip = code, variants 🎲 and variables ∿ · drag = move (also up/down between sound tracks) · alt+drag = duplicate · cmd+C / cmd+V = copy and paste · edges = lengthen/shorten · click the ruler = move the time line · ∿ envelope: click = new point, click a point = delete',
  'lavagna della classe': 'class board',
  'il tuo nome': 'your name',
  'INVIA VISUALE': 'SEND VISUAL',
  'INVIA SUONO': 'SEND SOUND',
  'schede': 'cards',
  'ricevuti': 'received',
  'spartito · suono': 'score · sound',
  'battute': 'bars',
  '↻ AGGIORNA': '↻ REFRESH',
  'notazione ABC (testo)': 'ABC notation (text)',
  'libreria esempi': 'example library',
  'libreria suoni': 'sound library',
  'assistente ai': 'ai assistant',
  '✦ esempio visuale': '✦ visual example',
  '♪ esempio ritmo': '♪ rhythm example',
  '? spiega il mio codice': '? explain my code',
  'INVIA': 'SEND',
  'pronta — qui compaiono esecuzioni ed errori spiegati': 'ready — runs and explained errors show up here',
  'sorgente': 'source',
  'PULISCI': 'CLEAR',
  'MODALITÀ AIUTO ATTIVA — passa il mouse sugli elementi · seleziona una funzione nel codice per scoprire cosa fa · ESC per uscire':
    'HELP MODE ON — hover over the elements · select a function in the code to find out what it does · ESC to exit',
  'varianti': 'variants',
  '+ VARIANTE': '+ VARIANT',
  '🎲 una a caso': '🎲 one at random',
  '🔁 in sequenza': '🔁 in sequence',
  'variabili': 'variables',
  '+ VARIABILE': '+ VARIABLE',
  '■ FERMA': '■ STOP',
  '🗑 ELIMINA': '🗑 DELETE',
  'FATTO': 'DONE',

  /* ── index.html: data-help ─────────────────────────────────────────── */
  'Open Live Lab|Laboratorio di live coding: crea visuali con Hydra e musica con Strudel, scrivendo codice dal vivo.':
    'Open Live Lab|A live coding lab: create visuals with Hydra and music with Strudel, writing code live.',
  'Viste|Passa dai TUTORIAL (per imparare passo passo) al LAB (dove scrivi ed esegui il codice) alla TIMELINE (dove organizzi i codici nel tempo) alla LAVAGNA (dove la classe si scambia il codice).':
    'Views|Switch between TUTORIAL (to learn step by step), LAB (where you write and run code), TIMELINE (where you arrange your code over time) and BOARD (where the class shares code).',
  'Vista TUTORIAL|Percorsi passo passo: ogni passo spiega un\'idea e ha un riquadro di codice da eseguire e modificare sul posto. Da lì il codice si porta nel LAB o nella timeline.':
    'TUTORIAL view|Step-by-step paths: each step explains an idea and has a code box to run and edit right there. From there you can take the code to the LAB or the timeline.',
  'Vista LAB|La sala prove: due editor di codice, uno per le visuali e uno per il suono. Scrivi e premi ESEGUI.':
    'LAB view|The rehearsal room: two code editors, one for visuals and one for sound. Write and press RUN.',
  'Vista TIMELINE|Il palcoscenico: disponi i tuoi codici su due tracce nel tempo e premi PLAY per la performance completa.':
    'TIMELINE view|The stage: arrange your code on two tracks over time and press PLAY for the full performance.',
  'Vista LAVAGNA|La bacheca della classe: qui compaiono gli esempi appesi da chi tiene il laboratorio, e da qui puoi mandargli i tuoi.':
    'BOARD view|The class bulletin board: examples posted by whoever runs the workshop show up here, and from here you can send them yours.',
  'Microfono|Accendendolo, le visuali possono reagire al suono: nel codice Hydra usi a.fft[0] (bassi), a.fft[1], a.fft[2], a.fft[3] (acuti). Il browser ti chiederà il permesso. Il suono resta su questo computer: non viene registrato né inviato.':
    'Microphone|Turn it on and the visuals can react to sound: in Hydra code you use a.fft[0] (lows), a.fft[1], a.fft[2], a.fft[3] (highs). Your browser will ask for permission. The sound stays on this computer: it is not recorded or sent.',
  'Spartito|Mostra il pattern SUONO (dell\'editor, o del riquadro del tutorial che hai appena fatto partire) come uno spartito in notazione tradizionale: ogni ciclo di Strudel diventa una battuta in 4/4. Non fa partire né cambia la musica: serve a leggere il ritmo e le note.':
    'Score|Shows the SOUND pattern (from the editor, or from the tutorial box you just started) as a score in traditional notation: each Strudel cycle becomes a bar in 4/4. It does not start or change the music: it helps you read the rhythm and the notes.',
  'Esempi|Apre la libreria di esempi pronti: cliccane uno per caricarlo nell\'editor e capire come funziona.':
    'Examples|Opens the library of ready-made examples: click one to load it into the editor and see how it works.',
  'Suoni|Apre la libreria di tutti i suoni che puoi usare con s("…"): i campioni registrati e, in fondo, i sintetizzatori e i rumori. Passa sopra a un suono per vederne la forma d\'onda, cliccalo per ascoltarlo. Le etichette in alto aiutano a trovare quello che cerchi.':
    'Sounds|Opens the library of all the sounds you can use with s("…"): the recorded samples and, at the bottom, the synths and noises. Hover over a sound to see its waveform, click it to listen. The tags at the top help you find what you are looking for.',
  'Assistente AI|Apre l\'assistente basato su Ollama: chiedigli di creare esempi di codice o di spiegarti quello che hai scritto. Gira tutto sul tuo computer.':
    'AI assistant|Opens the assistant powered by Ollama: ask it to create code examples or to explain what you wrote. Everything runs on your computer.',
  'Modalità aiuto|È questa! Quando è attiva, passa il mouse su qualsiasi elemento per una spiegazione, oppure seleziona una funzione nel codice per scoprire cosa fa. Premi ESC o riclicca per uscire.':
    'Help mode|This is it! When it is on, hover over any element for an explanation, or select a function in the code to find out what it does. Press ESC or click again to exit.',
  'Tema|Cambia i colori e i caratteri dell\'interfaccia: apri il menu e scegli un tema. In fondo al menu, lo slider OPACITÀ PANNELLI rende i pannelli trasparenti per vedere la visuale sotto. Le scelte vengono ricordate su questo computer. Il codice e la musica non cambiano.':
    'Theme|Changes the colors and fonts of the interface: open the menu and pick a theme. At the bottom of the menu, the PANEL OPACITY slider makes the panels transparent so you can see the visual underneath. Your choices are remembered on this computer. The code and the music do not change.',
  'Lingua|Cambia la lingua dell\'app: italiano, inglese o spagnolo. Si traducono l\'interfaccia, i tutorial, gli esempi e i commenti nel loro codice. La pagina si ricarica: il codice negli editor e la timeline restano. La scelta viene ricordata su questo computer.':
    'Language|Changes the language of the app: Italian, English or Spanish. The interface, the tutorials, the examples and the comments in their code get translated. The page reloads: the code in the editors and the timeline stay. Your choice is remembered on this computer.',
  'Editor VISUALE|Qui scrivi il codice Hydra che genera le immagini. Il risultato appare sullo sfondo, dietro i pannelli. Suggerimento: seleziona il nome di una funzione (es. osc, kaleid) per farti spiegare cosa fa.':
    'VISUAL editor|Here you write the Hydra code that generates the images. The result appears in the background, behind the panels. Tip: select the name of a function (e.g. osc, kaleid) to get an explanation of what it does.',
  'Esegui visuale|Fa partire il codice Hydra scritto qui sotto. Scorciatoia: Cmd+Invio dentro l\'editor.':
    'Run visual|Starts the Hydra code written below. Shortcut: Cmd+Enter inside the editor.',
  'Ferma visuale|Ferma le immagini e riporta lo sfondo al nero.':
    'Stop visual|Stops the images and turns the background back to black.',
  'Salva negli esempi|Salva questo codice nella libreria ESEMPI, nella sezione \'I tuoi esempi\': lo ritroverai anche alle prossime sessioni.':
    'Save to examples|Saves this code in the EXAMPLES library, in the \'Your examples\' section: you will find it there in future sessions too.',
  'Appendi alla lavagna|Mette questo codice sulla lavagna della classe: lo vedranno tutti gli studenti.':
    'Post to the board|Puts this code on the class board: all the students will see it.',
  'Aggiungi alla timeline|Salva questo codice come clip sulla traccia VISUALE della timeline, per usarlo nella performance.':
    'Add to timeline|Saves this code as a clip on the VISUAL track of the timeline, to use it in the performance.',
  'Stato visuale|Qui compaiono i messaggi: verde se il codice funziona, rosso se c\'è un errore (con la spiegazione).':
    'Visual status|Messages show up here: green if the code works, red if there is an error (with the explanation).',
  'Editor SUONO|Qui scrivi i pattern Strudel che generano la musica: note, ritmi e suoni si scrivono come piccole frasi di testo. Suggerimento: seleziona il nome di una funzione (es. sound, fast) o di un suono (es. bd) per farti spiegare cosa fa.':
    'SOUND editor|Here you write the Strudel patterns that generate the music: notes, rhythms and sounds are written as short lines of text. Tip: select the name of a function (e.g. sound, fast) or of a sound (e.g. bd) to get an explanation of what it does.',
  'Esegui suono|Fa partire il pattern musicale scritto qui sotto. Scorciatoia: Cmd+Invio dentro l\'editor.':
    'Run sound|Starts the music pattern written below. Shortcut: Cmd+Enter inside the editor.',
  'Ferma suono|Ferma la musica (in Strudel si chiama \'hush\', cioè \'silenzio\').':
    'Stop sound|Stops the music (in Strudel it is called \'hush\').',
  'Salva negli esempi|Salva questo pattern nella libreria ESEMPI, nella sezione \'I tuoi esempi\': lo ritroverai anche alle prossime sessioni.':
    'Save to examples|Saves this pattern in the EXAMPLES library, in the \'Your examples\' section: you will find it there in future sessions too.',
  'Aggiungi alla timeline|Salva questo pattern come clip sulla traccia SUONO della timeline, per usarlo nella performance.':
    'Add to timeline|Saves this pattern as a clip on the SOUND track of the timeline, to use it in the performance.',
  'Stato suono|Qui compaiono i messaggi: verde se il pattern suona, rosso se c\'è un errore (con la spiegazione).':
    'Sound status|Messages show up here: green if the pattern plays, red if there is an error (with the explanation).',
  'Play|Fa partire la performance: ogni clip esegue il suo codice quando la linea del tempo la raggiunge. Scorciatoia: barra spaziatrice.':
    'Play|Starts the performance: each clip runs its code when the time line reaches it. Shortcut: space bar.',
  'Stop|Ferma la performance e riporta la linea del tempo all\'inizio.':
    'Stop|Stops the performance and brings the time line back to the start.',
  'Loop|Quando è acceso, arrivata alla fine la performance ricomincia da capo, all\'infinito.':
    'Loop|When it is on, the performance starts over from the beginning when it reaches the end, forever.',
  'Tempo|Il punto esatto in cui si trova la performance: secondi trascorsi / durata totale.':
    'Time|The exact point the performance has reached: seconds elapsed / total length.',
  'Zoom|Allarga o restringe la timeline: utile per lavorare con precisione o vedere tutta la performance. Puoi anche usare la rotellina del mouse sulla timeline.':
    'Zoom|Widens or narrows the timeline: useful for precise work or to see the whole performance. You can also use the mouse wheel on the timeline.',
  'Esporta|Scarica la performance come file .json: puoi portarla su un altro computer o conservarla.':
    'Export|Downloads the performance as a .json file: you can take it to another computer or keep it.',
  'Importa|Carica una performance salvata in precedenza da un file .json.':
    'Import|Loads a previously saved performance from a .json file.',
  'Nuova traccia suono|Aggiunge un\'altra traccia SUONO (fino a 8). I pattern delle tracce suonano insieme e restano sempre a tempo tra loro: condividono lo stesso orologio musicale.':
    'New sound track|Adds another SOUND track (up to 8). The patterns of the tracks play together and always stay in time with each other: they share the same musical clock.',
  'Timeline|Il tempo scorre da sinistra a destra. Trascina le clip per spostarle (Alt+trascina per duplicarle), tira i bordi per allungarle, doppio clic per modificarne il codice, doppio clic su uno spazio vuoto per creare una clip nuova. Cmd+C / Cmd+V copiano e incollano la clip selezionata alla linea del tempo.':
    'Timeline|Time flows from left to right. Drag clips to move them (Alt+drag to duplicate them), pull their edges to lengthen them, double-click to edit their code, double-click an empty space to create a new clip. Cmd+C / Cmd+V copy the selected clip and paste it at the time line.',
  'Lavagna|Il posto dove chi tiene il laboratorio appende esempi di codice per tutti, e dove tu puoi mandargli i tuoi.':
    'Board|The place where whoever runs the workshop posts code examples for everyone, and where you can send them yours.',
  'come ti chiami': 'what is your name',
  'Il tuo nome|Serve solo perché chi riceve il tuo esempio sappia di chi è. Resta su questo computer.':
    'Your name|It is only there so whoever receives your example knows who it is from. It stays on this computer.',
  'Invia la visuale|Manda il codice del tuo editor VISUALE a chi tiene il laboratorio.':
    'Send the visual|Sends the code in your VISUAL editor to whoever runs the workshop.',
  'Invia il suono|Manda il codice del tuo editor SUONO a chi tiene il laboratorio.':
    'Send the sound|Sends the code in your SOUND editor to whoever runs the workshop.',
  'Elenco dei tutorial|Scegli un percorso. Il numero a destra dice quanti passi hai già provato; ✓ vuol dire completato.':
    'Tutorial list|Pick a path. The number on the right tells you how many steps you have already tried; ✓ means completed.',
  'Da dove viene|Lo spartito mostra l\'ultimo codice SUONO che hai fatto partire con ▶: quello dell\'editor SUONO del LAB, oppure quello di un riquadro dei TUTORIAL.':
    'Where it comes from|The score shows the last SOUND code you started with ▶: the one in the LAB\'s SOUND editor, or the one in a TUTORIAL box.',
  'Battute|Quante battute mostrare. Un ciclo di Strudel è una battuta. Con AUTO lo spartito si ferma quando il pattern comincia a ripetersi: "<c4 e4> g4" ne occupa due, perché alterna a ogni ciclo.':
    'Bars|How many bars to show. One Strudel cycle is one bar. With AUTO the score stops when the pattern starts repeating: "<c4 e4> g4" takes two, because it alternates every cycle.',
  'Aggiorna spartito|Rilegge il codice e ridisegna lo spartito: quello dell\'editor SUONO, o quello del tutorial se l\'ultimo ▶ l\'hai premuto lì. Succede da solo ogni volta che premi ▶ ESEGUI.':
    'Refresh score|Reads the code again and redraws the score: the one in the SOUND editor, or the tutorial one if you pressed the last ▶ there. It happens on its own every time you press ▶ RUN.',
  'Chiudi|Chiude lo spartito.': 'Close|Closes the score.',
  'Spartito|Ogni battuta è un ciclo del pattern. Le note con un\'altezza stanno sul pentagramma; i suoni di batteria sul rigo di percussioni, con il nome scritto sopra la prima volta che compaiono. Il numero sopra un gruppo di note (3, 5, 7) indica una terzina, una quintina, una settimina: tante note in parti uguali dove normalmente ce ne starebbero 2 o 4.':
    'Score|Each bar is one cycle of the pattern. Pitched notes sit on the staff; drum sounds on the percussion line, with their name written above the first time they appear. The number above a group of notes (3, 5, 7) marks a triplet, a quintuplet, a septuplet: that many notes in equal parts where there would normally be 2 or 4.',
  'Puntatore|Quando il suono che senti è proprio quello scritto su questo spartito, una linea azzurra scorre sulle note a tempo con la musica e accende quelle che stanno suonando. Se cambi il codice senza premere ▶ ESEGUI, o se sta suonando la timeline, il puntatore si nasconde: spartito e musica non coincidono più.':
    'Pointer|When the sound you hear is exactly what is written on this score, a light blue line moves over the notes in time with the music and lights up the ones that are playing. If you change the code without pressing ▶ RUN, or if the timeline is playing, the pointer hides: score and music no longer match.',
  'Notazione ABC|Lo stesso spartito scritto come testo, nel formato ABC: C D E sono le note, il numero è la durata in semicrome, z è una pausa, | è la stanghetta. È un altro modo ancora di scrivere la musica con le lettere — come fa Strudel.':
    'ABC notation|The same score written as text, in ABC format: C D E are the notes, the number is the length in sixteenth notes, z is a rest, | is the bar line. It is yet another way of writing music with letters — just like Strudel does.',
  'Chiudi|Chiude la libreria degli esempi.': 'Close|Closes the example library.',
  'Esempi visuali|Mostra gli esempi per Hydra: immagini, forme, colori e deformazioni.':
    'Visual examples|Shows the examples for Hydra: images, shapes, colors and distortions.',
  'Esempi sonori|Mostra gli esempi per Strudel: note, ritmi, melodie e strutture musicali.':
    'Sound examples|Shows the examples for Strudel: notes, rhythms, melodies and musical structures.',
  'Etichette|Raggruppano gli esempi per argomento. Accendendone più di una restano solo gli esempi che le hanno tutte; il numero dice quanti ne resterebbero.':
    'Tags|They group the examples by topic. If you turn on more than one, only the examples that have all of them remain; the number tells you how many would remain.',
  'Chiudi|Chiude la libreria dei suoni.': 'Close|Closes the sound library.',
  'Etichette|Filtrano i suoni per tipo. Accendendone più di una restano solo i suoni che le hanno tutte; il numero dice quanti ne resterebbero.':
    'Tags|They filter the sounds by type. If you turn on more than one, only the sounds that have all of them remain; the number tells you how many would remain.',
  'stato di Ollama': 'Ollama status',
  'Stato Ollama|Verde: Ollama è attivo su questo computer e l\'assistente funziona. Rosso: apri l\'app Ollama o esegui \'ollama serve\' nel terminale.':
    'Ollama status|Green: Ollama is running on this computer and the assistant works. Red: open the Ollama app or run \'ollama serve\' in the terminal.',
  'Modello|Il modello di linguaggio da usare, tra quelli installati con Ollama. I modelli più grandi rispondono meglio ma più lentamente.':
    'Model|The language model to use, among those installed with Ollama. Bigger models give better answers but more slowly.',
  'Chiudi|Chiude l\'assistente AI.': 'Close|Closes the AI assistant.',
  'Conversazione|Le risposte dell\'assistente compaiono qui. Sui blocchi di codice trovi due bottoni: PROVA lo esegue subito, INSERISCI lo copia nell\'editor.':
    'Conversation|The assistant\'s answers show up here. On code blocks you will find two buttons: TRY runs it right away, INSERT copies it into the editor.',
  'Crea un semplice esempio visuale con Hydra: qualcosa di colorato e in movimento. Spiega ogni riga.':
    'Create a simple visual example with Hydra: something colorful and moving. Explain every line.',
  'Idea rapida|Chiede all\'assistente un esempio visuale Hydra già pronto, con la spiegazione riga per riga.':
    'Quick idea|Asks the assistant for a ready-made Hydra visual example, explained line by line.',
  'Crea un semplice pattern ritmico con Strudel usando cassa, rullante e charleston. Spiega la sintassi.':
    'Create a simple rhythm pattern with Strudel using kick, snare and hi-hat. Explain the syntax.',
  'Idea rapida|Chiede all\'assistente un ritmo Strudel già pronto, con la spiegazione della sintassi.':
    'Quick idea|Asks the assistant for a ready-made Strudel rhythm, with the syntax explained.',
  'Spiega il mio codice|Prima VERIFICA il codice dell\'editor attivo: se funziona, l\'assistente lo spiega riga per riga; se contiene un errore, ti spiega dove sta il problema e come correggerlo.':
    'Explain my code|First it CHECKS the code in the active editor: if it works, the assistant explains it line by line; if it contains an error, it explains where the problem is and how to fix it.',
  'Chiedi un esempio, una variazione, una spiegazione…': 'Ask for an example, a variation, an explanation…',
  'La tua domanda|Scrivi qui cosa vuoi: \'crea un caleidoscopio verde\', \'rendi questo ritmo più veloce\', \'perché non funziona?\'. Invio per mandare.':
    'Your question|Write what you want here: \'make a green kaleidoscope\', \'make this rhythm faster\', \'why doesn\'t it work?\'. Enter to send.',
  'Invia|Manda la domanda all\'assistente. Mentre risponde diventa FERMA, per interrompere una risposta troppo lunga.':
    'Send|Sends the question to the assistant. While it answers it becomes STOP, to interrupt an answer that is too long.',
  'Console|Il diario di bordo dell\'app: registra ogni esecuzione e soprattutto SPIEGA gli errori in italiano. Si apre da sola quando qualcosa va storto.':
    'Console|The app\'s logbook: it records every run and above all EXPLAINS errors in plain English. It opens on its own when something goes wrong.',
  'Errori|Quanti errori sono arrivati da quando la console è chiusa.':
    'Errors|How many errors have come in since the console was closed.',
  'Codice sorgente|Open Live Lab è costruito su Strudel e Hydra, che sono software libero (AGPL): il codice di questa app è pubblico e puoi leggerlo.':
    'Source code|Open Live Lab is built on Strudel and Hydra, which are free software (AGPL): the code of this app is public and you can read it.',
  'Pulisci|Svuota la console: utile per ripartire da zero prima di un nuovo tentativo.':
    'Clear|Empties the console: useful to start fresh before a new attempt.',
  'Chiudi|Riduce la console alla sola barra: si riaprirà da sola al prossimo errore.':
    'Close|Shrinks the console to just its bar: it will open again on its own at the next error.',
  'Messaggi|Ogni riga: ora, da dove arriva (VISUALE, SUONO, TIMELINE…), il messaggio e — per gli errori — una spiegazione con la freccia →. Gli errori ripetuti si accorpano con ×N.':
    'Messages|Each line: time, where it comes from (VISUAL, SOUND, TIMELINE…), the message and — for errors — an explanation with the arrow →. Repeated errors are grouped with ×N.',
  'Chiudi|Chiude la finestra salvando le modifiche alla clip.':
    'Close|Closes the window, saving the changes to the clip.',
  'nome della clip': 'clip name',
  'Nome clip|Il nome che compare sul blocco nella timeline: scegli qualcosa che ti aiuti a ricordare cosa fa.':
    'Clip name|The name shown on the block in the timeline: pick something that helps you remember what it does.',
  'Varianti|Una clip può contenere più versioni alternative del suo codice. Quando la linea del tempo la raggiunge, ne viene scelta una: a caso 🎲 o in sequenza 🔁.':
    'Variants|A clip can hold several alternative versions of its code. When the time line reaches it, one of them is picked: at random 🎲 or in sequence 🔁.',
  'Nuova variante|Aggiunge una variante: parte da una copia del codice attuale, poi modificala. A ogni passaggio della timeline la clip ne sceglierà una.':
    'New variant|Adds a variant: it starts as a copy of the current code, then you edit it. On every pass of the timeline the clip will pick one.',
  'Elimina variante|Cancella la variante mostrata in questo momento.':
    'Delete variant|Deletes the variant shown right now.',
  'Come scegliere|🎲 una a caso: a ogni passaggio la clip pesca una variante a sorte. 🔁 in sequenza: le varianti si alternano in ordine, un passaggio ciascuna.':
    'How to pick|🎲 one at random: on every pass the clip draws a variant by chance. 🔁 in sequence: the variants take turns in order, one pass each.',
  'Codice della clip|Il codice che verrà eseguito quando la performance raggiunge questa clip. Modificalo e premi PROVA per sentire/vedere subito il risultato.':
    'Clip code|The code that will run when the performance reaches this clip. Edit it and press TRY to hear/see the result right away.',
  'Variabili|Numeri che cambiano nel tempo mentre la clip suona. Ognuna ha un nome e un range (da… a…); il suo inviluppo, nella corsia sotto la traccia, dice quanto vale istante per istante. Nel codice si scrive il nome al posto di un numero.':
    'Variables|Numbers that change over time while the clip plays. Each one has a name and a range (from… to…); its envelope, in the lane below the track, tells its value moment by moment. In the code you write the name instead of a number.',
  'Nuova variabile|Aggiunge una variabile alla clip: dagli un nome, scegli da quanto a quanto può andare, poi usala nel codice. Chiusa la finestra, disegna il suo inviluppo nella corsia sotto la traccia.':
    'New variable|Adds a variable to the clip: give it a name, choose how low and how high it can go, then use it in the code. Once the window is closed, draw its envelope in the lane below the track.',
  'Prova|Esegue subito il codice della clip, senza aspettare la timeline: così controlli che funzioni.':
    'Try|Runs the clip\'s code right away, without waiting for the timeline: so you can check that it works.',
  'Ferma prova|Ferma l\'esecuzione di prova.': 'Stop try|Stops the test run.',
  'Elimina|Cancella questa clip dalla timeline. Puoi annullare con Cmd+Z.':
    'Delete|Deletes this clip from the timeline. You can undo with Cmd+Z.',
  'Fatto|Salva le modifiche e chiude la finestra.': 'Done|Saves the changes and closes the window.',

  /* ── js/theme.js ───────────────────────────────────────────────────── */
  'Notte': 'Night',
  'Brace': 'Embers',
  'Aurora': 'Aurora',
  'Tema: {name}': 'Theme: {name}',
  'Opacità dei pannelli|Sposta a sinistra per rendere i pannelli trasparenti e vedere la visuale sotto il codice e i tutorial. 100% è com\'erano. La scelta viene ricordata su questo computer.':
    'Panel opacity|Slide left to make the panels transparent and see the visual under the code and the tutorials. 100% is how they were. Your choice is remembered on this computer.',
  'opacità pannelli': 'panel opacity',
  'Opacità dei pannelli': 'Panel opacity',
  'Evidenzia ciò che suona|Mentre la musica suona, nel codice si illuminano le note e i suoni che si stanno sentendo in quel momento, come sul sito di Strudel. Toglilo se ti distrae. La scelta viene ricordata su questo computer.':
    'Highlight what plays|While the music plays, the notes and sounds you are hearing at that moment light up in the code, like on the Strudel website. Turn it off if it distracts you. Your choice is remembered on this computer.',
  'evidenzia ciò che suona': 'highlight what plays',

  /* ── js/main.js ────────────────────────────────────────────────────── */
  'Clicca per caricarlo nell\'editor VISUALE.': 'Click to load it into the VISUAL editor.',
  'Clicca per caricarlo nell\'editor SUONO.': 'Click to load it into the SOUND editor.',
  'CARICA': 'LOAD',
  'Carica|Copia l\'esempio nell\'editor, senza eseguirlo: leggilo, modificalo, poi premi ESEGUI.':
    'Load|Copies the example into the editor without running it: read it, edit it, then press RUN.',
  'Prova|Carica l\'esempio nell\'editor e lo esegue subito.':
    'Try|Loads the example into the editor and runs it right away.',
  'Aggiungi alla timeline|Aggiunge questo esempio come clip in coda alla traccia VISUALE della timeline.':
    'Add to timeline|Adds this example as a clip at the end of the VISUAL track of the timeline.',
  'Aggiungi alla timeline|Aggiunge questo esempio come clip in coda alla traccia SUONO della timeline.':
    'Add to timeline|Adds this example as a clip at the end of the SOUND track of the timeline.',
  'Elimina|Cancella questo esempio salvato dalla libreria.':
    'Delete|Deletes this saved example from the library.',
  'Eliminare l\'esempio «{title}»?': 'Delete the example “{title}”?',
  'Clicca per mostrare solo questi esempi; accendendo più etichette restano gli esempi che le hanno tutte.':
    'Click to show only these examples; if you turn on more tags, the examples that have all of them remain.',
  '✕ tutte': '✕ all',
  'Tutte|Spegne le etichette e torna a mostrare tutti gli esempi.':
    'All|Turns off the tags and shows all the examples again.',
  'I tuoi esempi': 'Your examples',
  'Microfono acceso: il browser ti chiederà il permesso alla prossima esecuzione.':
    'Microphone on: your browser will ask for permission on the next run.',
  'Nel codice Hydra usa a.fft[0] (bassi) … a.fft[3] (acuti). Esempio: osc(20).rotate(() => a.fft[0] * 3).out()':
    'In Hydra code use a.fft[0] (lows) … a.fft[3] (highs). Example: osc(20).rotate(() => a.fft[0] * 3).out()',
  'Microfono spento.': 'Microphone off.',
  'Nome dell\'esempio:': 'Example name:',
  'senza titolo': 'untitled',
  '★ salvato negli esempi': '★ saved to examples',
  'Open Live Lab va servito da un piccolo server locale, non aperto come file. Avvialo con: ./start.sh (poi apri http://localhost:8765)':
    'Open Live Lab must be served by a small local server, not opened as a file. Start it with: ./start.sh (then open http://localhost:8765)',
  'La pagina non è servita in HTTPS: il suono non può funzionare.':
    'The page is not served over HTTPS: sound cannot work.',
  'Apri lo stesso indirizzo con https:// all\'inizio.': 'Open the same address with https:// at the start.',
  'Password docente per la lavagna:': 'Teacher password for the board:',
  'Titolo della scheda (lo vedono gli studenti):': 'Card title (the students will see it):',
  'esempio suono': 'sound example',
  'esempio visuale': 'visual example',
  '«{title}» è ora sulla lavagna di tutta la classe': '“{title}” is now on the board for the whole class',
  'non sono riuscito ad appendere: {error}': 'could not post: {error}',
  'Ricarica la pagina per reinserire la password docente.': 'Reload the page to enter the teacher password again.',
  'Controlla che api/board.php sia stato caricato sul server.': 'Check that api/board.php was uploaded to the server.',
  'non c\'è niente da inviare: l\'editor è vuoto': 'there is nothing to send: the editor is empty',
  'Come ti chiami? (serve solo perché si sappia di chi è)': 'What is your name? (it is only so they know who it is from)',
  'inviato ✓ — puoi rimandarlo quando vuoi, sostituisce il precedente':
    'sent ✓ — you can send it again whenever you want, it replaces the previous one',
  'invio non riuscito: {error}': 'sending failed: {error}',

  /* ── js/help.js ────────────────────────────────────────────────────── */
  'Questa parola non è nel glossario. Prova a chiederlo all\'ASSISTENTE: "cosa fa {word}?"':
    'This word is not in the glossary. Try asking the ASSISTANT: "what does {word} do?"',

  /* ── js/editor.js ──────────────────────────────────────────────────── */
  '// VISUALE · Hydra — premi ▶ ESEGUI (o Cmd+Invio)': '// VISUAL · Hydra — press ▶ RUN (or Cmd+Enter)',
  '// SUONO · Strudel — premi ▶ ESEGUI (o Cmd+Invio)': '// SOUND · Strudel — press ▶ RUN (or Cmd+Enter)',
  'eseguo…': 'running…',
  '● in esecuzione': '● running',
  '● in riproduzione': '● playing',
  '▶ codice eseguito': '▶ code run',
  '■ fermo': '■ stopped',

  /* ── js/tutorial.js ────────────────────────────────────────────────── */
  'tutorial': 'tutorials',
  '{n} passi.': '{n} steps.',
  'Codice del passo|Puoi modificarlo quanto vuoi e rieseguirlo con ▶ (o Cmd+Invio). ↺ ORIGINALE lo riporta com\'era.':
    'Step code|You can edit it as much as you like and run it again with ▶ (or Cmd+Enter). ↺ ORIGINAL puts it back the way it was.',
  'modificalo e premi ▶ ESEGUI': 'edit it and press ▶ RUN',
  'Esegui|Fa partire questo codice: la visuale compare sullo sfondo. Scorciatoia: Cmd+Invio dentro il riquadro.':
    'Run|Starts this code: the visual appears in the background. Shortcut: Cmd+Enter inside the box.',
  'Esegui|Fa partire questo codice. Scorciatoia: Cmd+Invio dentro il riquadro.':
    'Run|Starts this code. Shortcut: Cmd+Enter inside the box.',
  'Ferma|Ferma la visuale e riporta lo sfondo al nero.': 'Stop|Stops the visual and turns the background back to black.',
  'Ferma|Ferma la musica.': 'Stop|Stops the music.',
  '↺ ORIGINALE': '↺ ORIGINAL',
  'Originale|Rimette il codice com\'era all\'inizio di questo passo, cancellando le tue modifiche.':
    'Original|Puts the code back the way it was at the start of this step, erasing your changes.',
  'codice originale ripristinato': 'original code restored',
  'Porta nell\'editor|Copia questo codice nell\'editor {engine} del LAB, al posto di quello che c\'è, e ti porta lì. Non parte da solo: lo esegui tu.':
    'Take to the editor|Copies this code into the LAB\'s {engine} editor, replacing what is there, and takes you there. It does not start on its own: you run it.',
  'Aggiungi alla timeline|Accoda questo codice come clip alla traccia {engine} della timeline.':
    'Add to timeline|Adds this code as a clip at the end of the {engine} track of the timeline.',
  'Microfono acceso per questo passo: il browser ti chiederà il permesso.':
    'Microphone on for this step: your browser will ask for permission.',
  'Il suono resta su questo computer. Lo spegni con 🎤 MIC in alto.':
    'The sound stays on this computer. Turn it off with 🎤 MIC at the top.',
  '● esegue il codice del tutorial': '● running the tutorial code',
  '▶ tutorial «{title}», passo {n}': '▶ tutorial “{title}”, step {n}',
  '{title} · passo {n}': '{title} · step {n}',
  'codice del tutorial nell\'editor {engine} — premi ▶ ESEGUI per sentirlo':
    'tutorial code in the {engine} editor — press ▶ RUN to hear it',
  'Per tornare al tutorial premi TUTORIAL in alto: lo ritrovi al passo dove eri.':
    'To go back to the tutorial press TUTORIAL at the top: you will find it at the step where you were.',
  '✓ aggiunto alla timeline': '✓ added to the timeline',
  'completato ✓': 'completed ✓',
  '{done} di {total} passi provati': '{done} of {total} steps tried',
  'Scegli un tutorial dall\'elenco.': 'Pick a tutorial from the list.',
  'Progresso|Un passo si segna ✓ quando esegui il suo codice senza errori. Resta salvato su questo computer.':
    'Progress|A step gets a ✓ when you run its code without errors. It stays saved on this computer.',
  'AZZERA': 'RESET',
  'Azzera|Toglie tutti i ✓ di questo tutorial, per rifarlo da capo.':
    'Reset|Removes all the ✓ from this tutorial, so you can do it again from the start.',
  'Azzerare il progresso di «{title}»?': 'Reset the progress of “{title}”?',
  'prova tu': 'try it',
  'prossimo': 'next',
  'Prossimo tutorial': 'Next tutorial',
  'fine del percorso: altri tutorial in arrivo': 'end of the path: more tutorials coming soon',

  /* ── js/console.js ─────────────────────────────────────────────────── */
  '«{name}» non esiste: controlla come è scritto. I nomi validi sono nella libreria ESEMPI, oppure chiedi all\'assistente.':
    '“{name}” does not exist: check how it is spelled. Valid names are in the EXAMPLES library, or ask the assistant.',
  '«{name}» non è una funzione che questo oggetto conosce: forse è di Hydra ma la stai usando in Strudel (o viceversa), o è scritta male.':
    '“{name}” is not a function this object knows: maybe it belongs to Hydra but you are using it in Strudel (or the other way around), or it is misspelled.',
  'Manca qualcosa alla fine: probabilmente una parentesi ) o } non chiusa.':
    'Something is missing at the end: probably a ) or } that was not closed.',
  'C\'è un simbolo fuori posto: controlla parentesi, virgole e punti della catena (ogni .funzione() si aggancia alla precedente).':
    'There is a symbol out of place: check parentheses, commas and the dots of the chain (each .function() hooks onto the previous one).',
  'La catena si interrompe prima di «.{name}»: la parte precedente non ha prodotto nulla. Controlla la riga sopra.':
    'The chain breaks before “.{name}”: the part before it produced nothing. Check the line above.',
  'La catena si interrompe prima di questo punto: la parte precedente non ha prodotto nulla. Controlla la riga sopra.':
    'The chain breaks before this point: the part before it produced nothing. Check the line above.',
  'Il suono «{name}» non esiste qui. Suoni disponibili: bd sd sn hh cp lt mt ht perc casio jazz arpy tabla east space crow xbreak1 dnb1 sax, oppure i sintetizzatori sine triangle sawtooth square supersaw, e gli strumenti guitar epiano organ bell.':
    'The sound “{name}” does not exist here. Available sounds: bd sd sn hh cp lt mt ht perc casio jazz arpy tabla east space crow xbreak1 dnb1 sax, or the synths sine triangle sawtooth square supersaw, and the instruments guitar epiano organ bell.',
  'Una parte del pattern è vuota o scritta male: controlla le virgolette e la mini-notazione.':
    'Part of the pattern is empty or badly written: check the quotes and the mini-notation.',
  'La mini-notazione dentro le virgolette (riga {line}) ha un simbolo fuori posto: controlla parentesi quadre [ ], asterischi e virgole.':
    'The mini-notation inside the quotes (line {line}) has a symbol out of place: check square brackets [ ], asterisks and commas.',
  'La mini-notazione dentro le virgolette ha un simbolo fuori posto: controlla parentesi quadre [ ], asterischi e virgole.':
    'The mini-notation inside the quotes has a symbol out of place: check square brackets [ ], asterisks and commas.',
  'Sintassi non valida: rileggi la riga indicata cercando simboli mancanti o di troppo.':
    'Invalid syntax: reread the line shown, looking for missing or extra symbols.',
  'console pulita': 'console cleared',
  'SISTEMA': 'SYSTEM',
  'ESECUZIONE': 'RUN',
  'SUONI': 'SOUNDS',
  '? SPIEGA': '? EXPLAIN',
  'Spiega errore|Manda questo errore all\'assistente AI, insieme al codice che lo ha causato: ti spiega cosa significa e come correggerlo.':
    'Explain error|Sends this error to the AI assistant, together with the code that caused it: it explains what it means and how to fix it.',
  'Errore in una funzione () => … del codice visuale: viene rivalutata a ogni frame e intanto Hydra usa il valore di default (per questo l\'immagine sembra ferma o strana).':
    'Error in a () => … function of the visual code: it is evaluated again on every frame and meanwhile Hydra uses the default value (that is why the image looks frozen or strange).',
  'I parametri-funzione devono restituire un numero, es. () => time * 0.1 oppure () => Math.sin(time).':
    'Function parameters must return a number, e.g. () => time * 0.1 or () => Math.sin(time).',
  'lo shader non compila: {error}': 'the shader does not compile: {error}',
  'Di solito è un valore del tipo sbagliato dentro la catena: controlla i parametri passati alle funzioni.':
    'Usually it is a value of the wrong type inside the chain: check the parameters passed to the functions.',
  'errore sconosciuto': 'unknown error',
  'Errore mentre il codice era in esecuzione: se la visuale è sparita, controlla le funzioni () => … che vengono eseguite a ogni frame.':
    'Error while the code was running: if the visual disappeared, check the () => … functions that run on every frame.',
  '{group} · tutorial': '{group} · tutorial',
});
