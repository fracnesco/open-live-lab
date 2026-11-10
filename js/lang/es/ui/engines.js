/* Frasi dell'interfaccia — Español.
   Sorgenti: js/engines.js, js/instruments.js, js/highlight.js
   (instruments.js e highlight.js non hanno frasi per l'utente).
   I messaggi di verifica di Strudel tornano anche all'assistente AI per
   l'auto-correzione: i nomi di funzioni, suoni e scale restano come sono. */

I18N.add('es', {
  'Il browser sta per chiederti il permesso di usare la webcam.':
    'El navegador está a punto de pedirte permiso para usar la webcam.',
  'Il browser sta per chiederti quale schermo o finestra condividere.':
    'El navegador está a punto de preguntarte qué pantalla o ventana compartir.',
  'Serve al codice per usarla come sorgente della visuale. Le immagini restano su questo computer: non vengono registrate né inviate a nessuno.':
    'El código la necesita como fuente de la visual. Las imágenes se quedan en este ordenador: no se graban ni se envían a nadie.',
  'campioni audio non caricati (bd, sd, hh… non suoneranno)':
    'muestras de audio no cargadas (bd, sd, hh… no sonarán)',
  'Avvia l\'app con ./start.sh: i campioni hanno bisogno del server locale.':
    'Inicia la app con ./start.sh: las muestras necesitan el servidor local.',
  'Ricarica la pagina; se il problema resta, la cartella samples/ non è stata caricata sul server.':
    'Recarga la página; si el problema continúa, la carpeta samples/ no se ha subido al servidor.',
  'Strudel non inizializzato: {error}':
    'Strudel no inicializado: {error}',
  'una funzione () => … non restituisce un numero':
    'una función () => … no devuelve un número',
  'Scrivi $: davanti a OGNI pattern, ognuno sulla sua riga (esempio: «$: sound("bd*4")» e, a capo, «$: note("c2 g2")»), oppure uniscili in un solo stack(p1, p2)':
    'Escribe $: delante de CADA pattern, cada uno en su línea (ejemplo: «$: sound("bd*4")» y, en otra línea, «$: note("c2 g2")»), o únelos en un solo stack(p1, p2)',
  'il pattern «{head}…» non ha $: davanti: quando nel codice c\'è almeno un $:, i pattern senza $: non suonano. {fix}':
    'el pattern «{head}…» no tiene $: delante: cuando en el código hay al menos un $:, los patterns sin $: no suenan. {fix}',
  'ci sono {n} pattern separati senza $: — così suona solo l\'ultimo e gli altri vengono ignorati in silenzio. {fix}':
    'hay {n} patterns separados sin $: — así solo suena el último y los demás se ignoran en silencio. {fix}',
  'mini-notazione non valida in "{str}"{found}: controlla che ogni [ < ( sia chiusa e che non ci siano simboli fuori posto':
    'mini-notación no válida en "{str}"{found}: comprueba que cada [ < ( esté cerrada y que no haya símbolos fuera de lugar',
  '(trovato {what} dove non ci va)':
    '(se encontró {what} donde no corresponde)',
  'la scala "{str}" non esiste: la voce resterebbe muta, senza errori. I nomi vanno scritti in minuscolo e separati dai due punti — {hint}. Esempi giusti: .scale("C:minor"), .scale("A2:minor:pentatonic"), .scale("D:dorian")':
    'la escala "{str}" no existe: la voz quedaría muda, sin errores. Los nombres se escriben en minúscula y separados por dos puntos — {hint}. Ejemplos correctos: .scale("C:minor"), .scale("A2:minor:pentatonic"), .scale("D:dorian")',
  '.{fx}("{str}") contiene parole ({words}) dove ci vanno NUMERI: l\'effetto non si sentirebbe. Scrivi dei numeri, es. .{fx}(0.5) oppure .{fx}("0.25 1")':
    '.{fx}("{str}") contiene palabras ({words}) donde van NÚMEROS: el efecto no se oiría. Escribe números, p. ej. .{fx}(0.5) o .{fx}("0.25 1")',
  'in .delay("a:b:c") a=volume b=tempo c=feedback, tutti numeri: .delay("0.5:0.125:0.75")':
    'en .delay("a:b:c") a=volumen b=tiempo c=feedback, todos números: .delay("0.5:0.125:0.75")',
  'setcpm({n}) sono {cycles} CICLI al minuto, cioè {bpm} bpm: troppo veloce. setcpm NON conta i bpm: per N bpm si scrive setcpm(N/4), es. setcpm(120/4)':
    'setcpm({n}) son {cycles} CICLOS por minuto, es decir {bpm} bpm: demasiado rápido. setcpm NO cuenta bpm: para N bpm se escribe setcpm(N/4), p. ej. setcpm(120/4)',
  'n("{str}") contiene nomi di note ({names}): n() vuole NUMERI, i gradi della scala — n("0 2 4").scale("C:minor"). Per i nomi delle note si usa note("{names}")':
    'n("{str}") contiene nombres de notas ({names}): n() quiere NÚMEROS, los grados de la escala — n("0 2 4").scale("C:minor"). Para los nombres de las notas se usa note("{names}")',
  'n("{str}") senza .scale(…) non cambia l\'altezza: suonerebbe sempre la stessa nota. Aggiungi .scale("C:minor") subito dopo n(…), oppure usa note("c3 e3 g3")':
    'n("{str}") sin .scale(…) no cambia la altura: sonaría siempre la misma nota. Añade .scale("C:minor") justo después de n(…), o usa note("c3 e3 g3")',
  'note("{str}") contiene numeri piccoli ({nums}): in note() i numeri sono note MIDI (48 = c3, 60 = c4) e sotto 12 non si sentono. Per i gradi della scala si usa n("{nums}").scale("C:minor"); altrimenti scrivi i nomi: note("c2 eb2 g2")':
    'note("{str}") contiene números pequeños ({nums}): en note() los números son notas MIDI (48 = c3, 60 = c4) y por debajo de 12 no se oyen. Para los grados de la escala se usa n("{nums}").scale("C:minor"); si no, escribe los nombres: note("c2 eb2 g2")',
  '.out() è di Hydra (le visuali), non di Strudel: in un pattern musicale non serve e lo rende muto. Toglilo e lascia che la catena finisca con l\'ultimo effetto':
    '.out() es de Hydra (las visuales), no de Strudel: en un pattern musical no sirve y lo deja mudo. Quítalo y deja que la cadena termine con el último efecto',
  '.bank() non è disponibile in Open Live Lab (nessuna drum machine caricata): toglilo, i suoni bd sd hh cp… suonano già senza':
    '.bank() no está disponible en Open Live Lab (ninguna drum machine cargada): quítalo, los sonidos bd sd hh cp… ya suenan sin él',
  '"{name}" non esiste in Strudel':
    '"{name}" no existe en Strudel',
  '"{name}" esiste in Strudel ma NON come .{name}() applicato a un pattern: così non funziona':
    '"{name}" existe en Strudel pero NO como .{name}() aplicado a un pattern: así no funciona',
  '".{name}()" non esiste in Strudel':
    '".{name}()" no existe en Strudel',
  'suoni inesistenti: {bad} — disponibili: bd sd sn hh cp lt mt ht perc casio jazz arpy tabla east space crow xbreak1 dnb1 sax + sine triangle sawtooth square supersaw pulse + white pink brown crackle + {instruments}':
    'sonidos inexistentes: {bad} — disponibles: bd sd sn hh cp lt mt ht perc casio jazz arpy tabla east space crow xbreak1 dnb1 sax + sine triangle sawtooth square supersaw pulse + white pink brown crackle + {instruments}',
});
