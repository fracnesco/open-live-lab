/* Pacchetto spagnolo — esempi (traduce js/snippets.js).
   Stessa forma del file italiano, per id. «code» c'è solo dove il codice ha
   commenti: il codice resta identico, cambiano solo i commenti. */

I18N.content('es', 'snippets', {

  /* Le categorie sono anche chiavi: stessa traduzione per tutti e due i motori */
  cats: {
    'Base':            'Base',
    'Trasformazioni':  'Transformaciones',
    'Colore':          'Color',
    'Combinazioni':    'Combinaciones',
    'Feedback':        'Feedback',
    'Camera e suono':  'Cámara y sonido',
    'Ritmo':           'Ritmo',
    'Melodia':         'Melodía',
    'Suono':           'Sonido',
    'Struttura':       'Estructura',
    'Teoria':          'Teoría',
    'Giri di accordi': 'Progresiones de acordes',
    'Cover':           'Cover',
    'Italo disco':     'Italo disco',
    'Techno':          'Techno',
    'Tech house':      'Tech house',
    'Drum and bass':   'Drum and bass',
    'IDM':             'IDM',
  },

  tags: {
    hydra: {
      'primi passi': ['primeros pasos', 'Los ejemplos por los que empezar: una sola fuente, pocos números que cambiar.'],
      'forme':       ['formas',         'Polígonos y círculos dibujados con shape().'],
      'onde':        ['ondas',          'Franjas de color que se desplazan, generadas con osc().'],
      'colore':      ['color',          'Tonos, canales rojo-verde-azul, negativos y arcoíris.'],
      'movimento':   ['movimiento',     'La imagen se mueve sola: gira, se desplaza, cambia con el tiempo.'],
      'organico':    ['orgánico',       'Formas suaves e irregulares, como nubes, humo o líquidos.'],
      'simmetria':   ['simetría',       'Espejos y repeticiones: caleidoscopios y cuadrículas de copias.'],
      'deformare':   ['deformar',       'La imagen se dobla, se pixela o se desplaza píxel a píxel.'],
      'mescolare':   ['mezclar',        'Dos fuentes combinadas en una: fundidas, restadas, recortadas.'],
      'eco':         ['eco',            'Feedback: la salida vuelve a entrar en la cadena y deja estelas, túneles, fractales.'],
      'webcam':      ['webcam',         'Usa la webcam: el navegador pide permiso la primera vez.'],
      'microfono':   ['micrófono',      'Reacciona al sonido: hace falta 🎤 MIC encendido en la barra superior.'],
      'schermo':     ['pantalla',       'Captura una ventana del equipo y la usa como imagen.'],
      'mouse':       ['mouse',          'Se dibuja moviendo el mouse por la pantalla.'],
    },
    strudel: {
      'primi passi': ['primeros pasos', 'Los ejemplos por los que empezar: una sola línea, una sola idea.'],
      'batteria':    ['batería',        'Ritmos con las muestras de batería: bombo, caja, hi-hat, clap.'],
      'ritmo':       ['ritmo',          'Cómo se dividen y se repiten los pulsos.'],
      'melodia':     ['melodía',        'Una línea de notas para cantar.'],
      'scale':       ['escalas',        'Las notas entre las que elegir: mayor, menor, pentatónica, modos.'],
      'accordi':     ['acordes',        'Varias notas tocadas a la vez, y cómo se suceden.'],
      'arpeggio':    ['arpegio',        'Las notas de un acorde tocadas de una en una.'],
      'basso':       ['bajo',           'La línea grave que sostiene la armonía.'],
      'strati':      ['capas',          'Varias partes que suenan juntas: batería, bajo, acordes, melodía.'],
      'timbro':      ['timbre',         'Cómo suena una nota: filtro, envelope, reverb, delay, volumen.'],
      'variazione':  ['variación',      'El pattern cambia de un ciclo a otro.'],
      'casuale':     ['aleatorio',      'Una parte la decide el azar: cada escucha es un poco distinta.'],
      'break':       ['break',          'Un break de batería cortado en segmentos (xbreak1, dnb1) y vuelto a montar.'],
      'pop':         ['pop',            'Las progresiones de acordes de la música pop.'],
      'rock':        ['rock',           'El ritmo básico del rock.'],
      'blues':       ['blues',          'El blues y sus escalas.'],
      'jazz':        ['jazz',           'Acordes de séptima y cadencias del jazz.'],
      'classica':    ['clásica',        'Obras y armonías de la música clásica.'],
      'popolare':    ['popular',        'Cantos tradicionales y músicas populares.'],
      'elettronica': ['electrónica',    'Todos los géneros de la música electrónica juntos: del italo disco a la IDM.'],
      'italo disco': ['italo disco',    'La música dance italiana de principios de los 80: bajos en octavas, arpegios, synth melancólicos.'],
      'house':       ['house',          'Bombo a negras y clap: house y tech house, de los clubes de Chicago en adelante.'],
      'techno':      ['techno',         'Detroit y Berlín: bombo a negras, repetición, máquinas.'],
      'acid':        ['acid',           'El sonido de la Roland TB-303: una bassline con tanta resonance que «chilla».'],
      'drum and bass': ['drum and bass', 'Breaks rapidísimos a 170 bpm y bajos profundos, jungle incluida.'],
      'idm':         ['idm',            'La IDM al estilo de Aphex Twin: breaks desmontados, rolls, caos controlado, melodías frágiles.'],
    },
  },

  items: {

    /* ── HYDRA · base ─────────────────────────────────────────────────── */
    'h-osc': {
      title: 'Onda de colores',
      desc: 'osc() genera ondas que se desplazan: frecuencia, velocidad y cantidad de color.',
      code: `// osc(frecuencia, velocidad, color)
osc(10, 0.1, 1.5)
  .out()`,
    },
    'h-shape': {
      title: 'Forma geométrica',
      desc: 'shape() dibuja un polígono: número de lados, tamaño, difuminado del borde.',
      code: `// shape(lados, tamaño, difuminado)
shape(3, 0.4, 0.01)
  .out()`,
    },
    'h-gradient': {
      title: 'Degradado animado',
      desc: 'gradient() crea un degradado de colores que cambia con el tiempo.',
      code: `// gradient(velocidad)
gradient(0.3)
  .out()`,
    },
    'h-noise': {
      title: 'Ruido orgánico',
      desc: 'noise() genera manchas en movimiento, como nubes o humo.',
      code: `// noise(escala, velocidad)
noise(4, 0.2)
  .out()`,
    },

    /* ── HYDRA · trasformazioni ───────────────────────────────────────── */
    'h-kaleid': {
      title: 'Caleidoscopio',
      desc: 'kaleid() multiplica la imagen en espejo, como un caleidoscopio.',
      code: `osc(8, 0.1, 1)
  .kaleid(6)     // 6 espejos
  .out()`,
    },
    'h-rotate': {
      title: 'Rotación continua',
      desc: 'rotate() hace girar la imagen; con () => time la rotación es continua.',
      code: `shape(4, 0.5)
  .rotate(() => time * 0.5)  // gira con el tiempo
  .out()`,
    },
    'h-repeat': {
      title: 'Cuadrícula de copias',
      desc: 'repeat() repite la imagen en una cuadrícula de filas y columnas.',
      code: `shape(3, 0.3)
  .repeat(4, 3)   // 4 columnas, 3 filas
  .out()`,
    },
    'h-pixel': {
      title: 'Píxeles gigantes',
      desc: 'pixelate() reduce la resolución: efecto de videojuego de los años 80.',
    },

    /* ── HYDRA · colore ───────────────────────────────────────────────── */
    'h-color': {
      title: 'Cambiar los colores',
      desc: 'color() multiplica los canales rojo, verde y azul de la imagen.',
      code: `osc(10, 0.1)
  .color(1.2, 0.3, 0.8)  // r, g, b
  .out()`,
    },
    'h-invert': {
      title: 'Negativo',
      desc: 'invert() invierte los colores, como el negativo de una foto.',
    },
    'h-hue': {
      title: 'Arcoíris giratorio',
      desc: 'hue() gira el tono de los colores; animado con () => time.',
    },

    /* ── HYDRA · combinazioni ─────────────────────────────────────────── */
    'h-blend': {
      title: 'Fundir dos fuentes',
      desc: 'blend() mezcla dos imágenes, como un fundido encadenado.',
    },
    'h-diff': {
      title: 'Diferencia',
      desc: 'diff() muestra la diferencia entre dos imágenes: bordes y contrastes fuertes.',
    },
    'h-mask': {
      title: 'Recorte (máscara)',
      desc: 'mask() recorta una imagen usando la forma de otra.',
    },
    'h-modulate': {
      title: 'Deformar (modulate)',
      desc: 'modulate() usa una imagen para deformar otra: efecto líquido.',
    },

    /* ── HYDRA · feedback ─────────────────────────────────────────────── */
    'h-feedback': {
      title: 'Feedback (eco visual)',
      desc: 'src(o0) vuelve a leer la salida: la imagen se acumula como un eco visual.',
    },
    'h-fb-comet': {
      title: 'Estela de un cometa',
      desc: 'El círculo se mueve y el eco se queda atrás. brightness(-0.02) oscurece el eco en cada fotograma: la estela se apaga sola.',
      code: `shape(40, 0.08, 0.01)
  .color(1, 0.6, 0.2)
  .scrollX(() => Math.sin(time) * 0.3)
  .scrollY(() => Math.sin(time * 1.7) * 0.3)
  // el eco se desvanece un poco en cada fotograma
  .add( src(o0).brightness(-0.02) )
  .out()`,
    },
    'h-fb-tunnel': {
      title: 'Túnel arcoíris',
      desc: 'El eco se agranda, gira y cambia de tono; layer() le pone encima el cuadrado. Cada copia sale un poco más grande y de otro color.',
      code: `src(o0)
  .scale(1.03)     // el eco se agranda...
  .rotate(0.02)    // ...gira...
  .hue(0.01)       // ...y cambia de color
  .layer(
    shape(4, 0.15, 0.01)
      .color(1, 0.3, 0.5)
      .hue(() => time * 0.2)   // sin esto, a los pocos segundos el túnel se detiene
      .luma(0.1)
  )
  .out()`,
    },
    'h-fb-corridor': {
      title: 'Pasillo infinito',
      desc: 'Un marco en el borde de la pantalla; el eco se encoge (scale por debajo de 1) y lo arrastra hacia el centro, como dos espejos uno frente al otro.',
      code: `src(o0)
  .scale(0.92)      // el eco se encoge
  .rotate(0.02)
  .layer(
    osc(10, 0.1, 1.5)
      // un marco: la pantalla entera menos un rectángulo
      .mask( shape(4, 1, 0.01).diff(shape(4, 0.9, 0.01)) )
  )
  .out()`,
    },
    'h-fb-smoke': {
      title: 'Humo que sube',
      desc: 'El eco sube un poco (scrollY) y el ruido lo deforma en cada fotograma: la mancha de abajo se convierte en humo.',
      code: `shape(50, 0.15, 0.3)
  .color(0.6, 0.4, 1)
  .scrollY(-0.3)             // la fuente está abajo
  .blend(
    src(o0)
      .scrollY(0.008)        // el eco sube...
      .modulate(noise(3, 0.2), 0.006)   // ...se deforma...
      .brightness(-0.003),   // ...y se desvanece
    0.97
  )
  .out()`,
    },
    'h-fb-selfmod': {
      title: 'El eco que deforma',
      desc: 'modulate() con o0: son los colores del fotograma anterior los que desplazan los píxeles del nuevo. El caleidoscopio se enrosca en una espiral.',
      code: `osc(15, 0.05, 1.2)
  .kaleid(4)
  // la salida anterior, un poco girada, deforma la nueva
  .modulate( src(o0).rotate(0.2), 0.15 )
  .out()`,
    },
    'h-fb-brush': {
      title: 'Pincel con el mouse',
      desc: 'Mueve el mouse por la pantalla y dibujas. mouse.x y mouse.y dicen dónde está el puntero; el eco conserva el dibujo y brightness() lo desvanece despacio.',
      code: `// mueve el mouse por la pantalla
src(o0)
  .brightness(-0.004)      // el dibujo viejo se desvanece despacio
  .layer(
    shape(30, 0.04, 0.02)
      .color(1, 0.4, 0.7)
      .hue(() => time * 0.1)   // el color cambia con el tiempo
      .scrollX(() => 0.5 - mouse.x / width)
      .scrollY(() => mouse.y / height - 0.5)
      .luma(0.1)
  )
  .out()`,
    },
    'h-fb-zoomwave': {
      title: 'Zoom infinito que ondula',
      desc: 'scale(1.02) agranda el eco en cada fotograma: un zoom que no termina nunca. modulate() con el ruido lo hace ondular, como un túnel de goma.',
      code: `src(o0)
  .scale(1.02)                       // zoom infinito
  .modulate( noise(3, 0.1), 0.003 )  // el ruido hace ondular el túnel
  .hue(0.01)
  .layer(
    shape(4, 0.15, 0.01)
      .color(1, 0.3, 0.5)
      .hue(() => time * 0.2)
      .luma(0.1)
  )
  .out()`,
    },
    'h-fb-galaxy': {
      title: 'Galaxia',
      desc: 'Zoom infinito más modulateRotate(): el círculo difuminado hace girar el eco más en el centro que en los bordes, y las copias salen en espiral como los brazos de una galaxia.',
      code: `src(o0)
  .scale(1.02)    // el eco sale hacia los bordes...
  // ...girando más en el centro que en los bordes
  .modulateRotate( shape(99, 0.5, 0.8), -0.05 )
  .hue(0.01)
  .layer(
    shape(4, 0.15, 0.01)
      .rotate(() => time * 0.5)
      .color(1, 0.3, 0.5)
      .luma(0.1)
  )
  .out()`,
    },
    'h-fb-vortex': {
      title: 'Vórtice',
      desc: 'Lo contrario de la galaxia: scale por debajo de 1 absorbe el eco hacia el centro y modulateRotate() lo retuerce. El marco de ondas del borde se convierte en un remolino.',
      code: `src(o0)
  .scale(0.98)    // el eco es absorbido hacia el centro...
  // ...y gira más en el centro que en los bordes
  .modulateRotate( shape(99, 0.5, 0.8), 0.1 )
  .layer(
    osc(10, 0.1, 1.5)
      // un marco fino en el borde de la pantalla
      .mask( shape(4, 1, 0.01).diff(shape(4, 0.95, 0.01)) )
  )
  .out()`,
    },
    'h-fb-lava': {
      title: 'Lava que sube',
      desc: 'El eco sube muy poquito en cada fotograma y el ruido lo dobla: los colores del marco gotean hacia arriba como la lava de una lámpara.',
      code: `src(o0)
  .scrollY(0.003)                     // el eco sube despacio...
  .modulate( noise(6, 0.1), 0.003 )   // ...y se dobla como un líquido
  .layer(
    osc(20, 0.1, 1.5)
      // un marco ancho, desplazado un poco hacia abajo
      .mask( shape(4, 1, 0.01).diff(shape(4, 0.8, 0.01)).scrollY(-0.1) )
  )
  .out()`,
    },
    'h-fb-marble': {
      title: 'Mármol líquido',
      desc: 'colorama() desplaza muy poquito los colores del eco en cada fotograma; modulateHue(o0, 40) mueve cada píxel en una dirección que depende de su color. Cada tono se desliza por su cuenta, como colores disueltos en el agua.',
      code: `osc(10, 0.1, 1.5).kaleid(4)
  // el eco se queda al 95% y cambia de tono en cada fotograma
  .blend( src(o0).colorama(0.003), 0.95 )
  // cada píxel se desliza en una dirección que depende de su color
  .modulateHue(o0, 40)
  .out()`,
    },
    'h-fb-liquidpaint': {
      title: 'Pintura líquida',
      desc: 'Un pincel en el líquido: el círculo sigue al mouse y modulateHue(o0, 40) arrastra el trazo, cada tono en su dirección. El fondo es un gradient(): con modulateHue hace falta un fondo que ya tenga color.',
      code: `// mueve el mouse por la pantalla
gradient(0.1)
  .blend( src(o0), 0.97 )
  .modulateHue(o0, 40)
  // el pincel: un círculo que cambia de color y sigue al mouse
  .layer(
    shape(30, 0.05, 0.02)
      .color(1, 0.3, 0.6)
      .hue(() => time * 0.1)
      .scrollX(() => 0.5 - mouse.x / width)
      .scrollY(() => mouse.y / height - 0.5)
      .luma(0.1)
  )
  .out()`,
    },
    'h-fb-mic': {
      title: 'Túnel que respira',
      desc: 'Enciende 🎤 MIC: con los graves (a.fft[0]) el cuadrado se hincha y el zoom del eco se acelera. Con la música de STRUDEL el túnel late a tempo.',
      code: `// hace falta 🎤 MIC encendido en la barra superior
src(o0)
  .scale(() => 1.01 + a.fft[0] * 0.05)   // los graves aceleran el zoom
  .hue(0.005)
  .layer(
    shape(4, () => 0.1 + a.fft[0] * 0.2, 0.01)   // e hinchan el cuadrado
      .color(1, 0.5, 0.2)
      .hue(() => time * 0.1)
      .luma(0.1)
  )
  .out()`,
    },
    'h-fb-twoout': {
      title: 'Dos salidas que se persiguen',
      desc: 'El feedback puede pasar por otra salida: o0 lee o1 y o1 vuelve a leer o0 cambiándole el color. render(o0) muestra el resultado.',
      code: `// o0: las ondas en el cuadrado, más el eco que llega de o1
osc(10, 0.1, 1)
  .mult( shape(4, 0.3, 0.2) )
  .blend( src(o1).scale(1.02).rotate(0.03), 0.8 )
  .out(o0)

// o1: vuelve a leer o0 y le desplaza el tono
src(o0).hue(0.05)
  .out(o1)

render(o0)`,
    },

    /* ── HYDRA · camera e suono ───────────────────────────────────────── */
    'h-cam': {
      title: 'Webcam',
      desc: 'initCam() enciende la webcam; src(s0) la lleva a la cadena. El navegador pide permiso: es normal.',
      code: `// la primera vez el navegador pide permiso
s0.initCam()

src(s0)
  .out()`,
    },
    'h-cam-kaleid': {
      title: 'Webcam caleidoscópica',
      desc: 'La webcam tratada como cualquier otra fuente: se puede girar, reflejar, colorear.',
    },
    'h-cam-feedback': {
      title: 'Webcam con eco',
      desc: 'Feedback sobre la webcam: los movimientos dejan una estela que se agranda.',
    },
    'h-mic': {
      title: 'Visual que escucha',
      desc: 'Enciende 🎤 MIC en la barra superior: a.fft[0] son los graves, a.fft[3] los agudos. Prueba a dar palmas.',
      code: `// hace falta 🎤 MIC encendido en la barra superior
osc(20, 0.1, 1)
  .rotate(() => a.fft[0] * 3)
  .scale(() => 1 + a.fft[2])
  .out()`,
    },
    'h-mic-shape': {
      title: 'Forma que late con el sonido',
      desc: 'El círculo se hincha con los graves. Con la música de STRUDEL sonando, va a tempo solo.',
      code: `// hace falta 🎤 MIC encendido en la barra superior
shape(100, 0.1, 0.3)
  .scale(() => 0.5 + a.fft[0] * 4)
  .color(0.9, 0.5, 0.3)
  .out()`,
    },
    'h-screen': {
      title: 'Pantalla compartida',
      desc: 'initScreen() captura una ventana y la usa como imagen. El navegador pregunta cuál compartir.',
      code: `// el navegador pregunta qué ventana compartir
s0.initScreen()

src(s0)
  .pixelate(60, 40)
  .out()`,
    },

    /* ── STRUDEL · base ───────────────────────────────────────────────── */
    's-note': {
      title: 'Primeras notas',
      desc: 'note() toca notas musicales en secuencia, una por pulso.',
      code: `// notas en secuencia (nombres en inglés: c=do, d=re, e=mi...)
note("c4 e4 g4 b4")
  .sound("triangle")`,
    },
    's-rest': {
      title: 'Notas y silencios',
      desc: 'La virgulilla ~ es un silencio; los [ ] agrupan notas más rápidas.',
    },
    's-drums': {
      title: 'Batería',
      desc: 'sound() toca muestras: bd=bombo, sd=caja, hh=hi-hat. (Hacen falta las muestras: la primera vez hay que cargarlas online.)',
    },
    's-tempo': {
      title: 'Cambiar la velocidad',
      desc: 'setcpm() fija los ciclos por minuto: más alto = más rápido.',
    },

    /* ── STRUDEL · ritmo ──────────────────────────────────────────────── */
    's-sub': {
      title: 'Subdivisiones',
      desc: 'Los corchetes [ ] dividen un pulso en partes más rápidas.',
    },
    's-star': {
      title: 'Repeticiones con *',
      desc: 'El asterisco repite un evento: hh*4 = cuatro hi-hats en un pulso.',
    },
    's-euclid': {
      title: 'Ritmos euclidianos',
      desc: '(3,8) reparte 3 golpes en 8 pasos: ritmos de todo el mundo con dos números.',
    },
    's-poly': {
      title: 'Varios instrumentos a la vez',
      desc: 'La coma superpone patterns que suenan al mismo tiempo.',
    },
    's-rock': {
      title: 'Ritmo rock',
      desc: 'El ritmo rock básico: bombo y caja que se alternan, hi-hat en corcheas. setcpm cuenta ciclos, no bpm: para 100 bpm se escribe 100/4.',
      code: `// 100 bpm: un ciclo = 4 pulsos, así que 100/4
setcpm(100/4)
sound("[bd sd]*2, hh*8")`,
    },
    's-house': {
      title: 'Ritmo house',
      desc: 'Bombo a negras, clap en el 2 y el 4, hi-hat a contratiempo: la base del house y el techno. Se parece mucho al rock: muchos ritmos se reutilizan entre géneros.',
      code: `// 124 bpm
setcpm(124/4)
sound("bd*4, [~ cp]*2, [~ hh]*4")`,
    },

    /* ── STRUDEL · melodia ────────────────────────────────────────────── */
    's-scale': {
      title: 'Escalas musicales',
      desc: 'n() elige los grados de la escala fijada con scale(): nunca una nota equivocada.',
    },
    's-chords': {
      title: 'Acordes',
      desc: 'Las notas entre [ , ] suenan a la vez: un acorde.',
    },
    's-arp': {
      title: 'Arpegio rápido',
      desc: 'fast() acelera el pattern; off() añade una copia retrasada y transpuesta.',
    },

    /* ── STRUDEL · suono ──────────────────────────────────────────────── */
    's-filter': {
      title: 'Filtro que se mueve',
      desc: 'lpf() corta los agudos; sine.range() lo hace oscilar lentamente.',
    },
    's-adsr': {
      title: 'Envelope (attack/release)',
      desc: 'attack y release esculpen cómo nace y muere el sonido.',
    },
    's-fx': {
      title: 'Reverb y delay',
      desc: 'room() añade la reverb, delay() el delay: el sonido se repite a tempo, como un eco.',
    },
    's-gain': {
      title: 'Dinámica (volumen)',
      desc: 'gain() con un pattern crea acentos: fuerte, suave, suave, fuerte...',
    },

    /* ── STRUDEL · struttura ──────────────────────────────────────────── */
    's-dollar': {
      title: 'Varios patterns a la vez con $:',
      desc: 'Sin $: solo suena el último pattern del código; los demás se ignoran. Con $: delante de cada uno suenan todos a la vez: batería, bajo y melodía, cada uno en su línea.',
      code: `// $: delante de CADA pattern → suenan todos a la vez
$: sound("bd*2, ~ sd")
$: sound("hh*8").gain("[.25 1]*4")
$: note("c2 ~ eb2 g2").sound("sawtooth").lpf(500)
// prueba a escribir _$: en lugar de $: para silenciar una voz`,
    },
    's-stack': {
      title: 'Pieza en capas',
      desc: 'stack() superpone varios patterns completos: una pequeña pieza.',
    },
    's-cat': {
      title: 'Secciones alternas',
      desc: 'cat() alterna patterns, un ciclo cada uno: estrofa, estribillo...',
    },
    's-sometimes': {
      title: 'Variaciones aleatorias',
      desc: 'sometimes() aplica un cambio solo a veces: el pattern respira.',
    },

    /* ── STRUDEL · teoria ─────────────────────────────────────────────── */
    't-semitoni': {
      title: 'Tonos y semitonos',
      desc: 'El semitono es el paso más pequeño: de una tecla del piano a la de al lado. # es el sostenido (medio paso arriba), b el bemol (medio paso abajo). Dos semitonos forman un tono.',
      code: `// la escala cromática: 12 semitonos, todas las teclas de Do a Si
note("c4 c#4 d4 d#4 e4 f4 f#4 g4 g#4 a4 a#4 b4")
  .sound("triangle")`,
    },
    't-scala': {
      title: 'La escala mayor',
      desc: 'Una escala es una selección de 7 notas entre las 12. La mayor sigue siempre la misma receta de tonos (T) y semitonos (S): T T S T T T S.',
      code: `// do re mi fa sol la si do — los semitonos son mi-fa y si-do
note("c4 d4 e4 f4 g4 a4 b4 c5")
  .sound("triangle")`,
    },
    't-magg-min': {
      title: 'Mayor y menor',
      desc: 'Los mismos grados en dos escalas: un ciclo en mayor (luminoso), otro en menor (melancólico). Cambian el tercer, el sexto y el séptimo grado.',
      code: `// <a b> alterna: un ciclo Do mayor, un ciclo Do menor
n("0 1 2 3 4 5 6 7")
  .scale("<C4:major C4:minor>")
  .sound("triangle")`,
    },
    't-durate': {
      title: 'Duraciones: notas largas y cortas',
      desc: 'La arroba @ alarga una nota: c4@3 dura el triple que d4. Si los pesos suman 8, cada unidad es una corchea: @2 una negra, @4 una blanca. Abre ♪ PARTITURA para verlo escrito.',
      code: `// 3 + 1 + 2 + 2 = 8 corcheas: negra con puntillo, corchea, dos negras
note("c4@3 d4 e4@2 g4@2")
  .sound("triangle")`,
    },
    't-intervalli': {
      title: 'Intervalos',
      desc: 'El intervalo es la distancia entre dos notas. Tocadas a la vez, algunas distancias «chirrían» (la segunda) y otras reposan (tercera, quinta, octava).',
      code: `// Do junto con Re, Mi, Sol, Do: segunda, tercera, quinta, octava
note("[c4,d4] [c4,e4] [c4,g4] [c4,c5]")
  .sound("triangle")
  .slow(2)`,
    },
    't-triade': {
      title: 'Construir un acorde',
      desc: 'Un acorde (tríada) se construye tomando una nota sí y otra no de la escala: grados 0, 2, 4 — fundamental, tercera, quinta. Primero de una en una, luego juntas.',
      code: `// tres notas de la escala, luego las mismas tres a la vez
n("0 2 4 [0,2,4]")
  .scale("C4:major")
  .sound("triangle")`,
    },
    't-accordo-mm': {
      title: 'Acorde mayor y menor',
      desc: 'Entre el acorde mayor y el menor cambia una sola nota, la del medio (la tercera), un semitono: Mi se convierte en Mi bemol.',
      code: `// Do mayor, luego Do menor: solo cambia e4 → eb4
note("[c4,e4,g4] [c4,eb4,g4]")
  .sound("sawtooth")
  .lpf(900)
  .slow(2)`,
    },
    't-gradi': {
      title: 'Los acordes de la escala',
      desc: 'La misma forma (0, 2, 4) desplazada sobre cada grado de la escala da siete acordes: I IV V mayores, ii iii vi menores, vii disminuido. Todas las canciones en Do sacan de aquí sus acordes.',
      code: `// add() sube la tríada un grado en cada ciclo
n("[0,2,4]")
  .add(n("<0 1 2 3 4 5 6 7>"))
  .scale("C4:major")
  .sound("sawtooth")
  .lpf(900)`,
    },
    't-sigle': {
      title: 'Acordes por su nombre',
      desc: 'chord() lee los cifrados como en un cancionero: C D E F G A B = Do Re Mi Fa Sol La Si; la «m» quiere decir menor. voicing() elige las notas y las coloca bien.',
      code: `// Do, La menor, Fa, Sol — un acorde por ciclo
chord("<C Am F G>")
  .voicing()
  .sound("sawtooth")
  .lpf(900)`,
    },
    't-cadenza': {
      title: 'Tensión y reposo',
      desc: 'El acorde sobre el quinto grado (dominante, aquí G7) crea tensión; el del primero (tónica, C) la resuelve. Este movimiento, la cadencia, es el motor de la armonía.',
      code: `// G7 pregunta, C responde
chord("<G7 C>")
  .voicing()
  .sound("sawtooth")
  .lpf(900)`,
    },
    't-arpeggio': {
      title: 'Arpegio',
      desc: 'Arpegiar quiere decir tocar las notas de un acorde de una en una. arp() las elige por posición: 0 es la más grave.',
      code: `// los mismos cuatro acordes, desgranados arriba y abajo
chord("<C Am F G>")
  .voicing()
  .arp("0 1 2 3 4 3 2 1")
  .sound("triangle")`,
    },
    't-settime': {
      title: 'Acordes de séptima',
      desc: 'Al añadir una cuarta nota (la séptima) el acorde se colorea: es el sonido del jazz y de la bossa nova. ^7 es la séptima mayor, m7 la menor, 7 la de dominante.',
      code: `// prueba a quitar los 7 y escucha la diferencia
chord("<C^7 Am7 Dm7 G7>")
  .voicing()
  .sound("sawtooth")
  .lpf(900)`,
    },
    't-strati': {
      title: 'Bajo, acordes, melodía',
      desc: 'Casi toda pieza está hecha de tres capas: la melodía (lo que cantas), los acordes (el color) y el bajo, que toca la nota que da nombre al acorde (rootNotes).',
      code: `setcpm(30)
stack(
  // melodía: grados de la escala de Do
  n("<[4 2 0 2] [4 4 4@2] [3 1 ~ 1] [2 0 0@2]>")
    .scale("C5:major").sound("triangle"),
  // acordes
  chord("<C C G7 C>").voicing()
    .sound("sawtooth").lpf(700).gain(0.3),
  // bajo: la fundamental de cada acorde
  chord("<C C G7 C>").rootNotes(2)
    .sound("sawtooth").lpf(300)
)`,
    },
    't-pentatonica': {
      title: 'Escala pentatónica',
      desc: 'Cinco notas sin semitonos: suenan bien juntas en cualquier orden. Por eso es la escala de la improvisación, del blues a la música china. Aquí las notas salen al azar, y nunca desafinan.',
      code: `// irand(10) saca un grado al azar, 8 veces por ciclo
n(irand(10).segment(8))
  .scale("C4:pentatonic")
  .sound("triangle")
  .room(0.4)`,
    },
    't-modi': {
      title: 'Otras escalas, otros colores',
      desc: 'Los modos son escalas construidas con las mismas notas pero empezando desde un grado distinto: dórico (folk, funk), frigio (flamenco), lidio (soñador), mixolidio (rock).',
      code: `// la misma subida desde Re, un modo distinto en cada ciclo
n("0 1 2 3 4 5 6 7")
  .scale("<D4:dorian D4:phrygian D4:lydian D4:mixolydian>")
  .sound("triangle")`,
    },
    't-trasporre': {
      title: 'Transportar',
      desc: 'Transportar quiere decir desplazarlo todo el mismo número de semitonos: la melodía sigue siendo reconocible, cambia la tonalidad. Los cantantes lo hacen para adaptar una canción a su voz.',
      code: `// la misma figura en Do, luego 5 y 7 semitonos más arriba: Fa y Sol
note("c4 e4 g4 e4")
  .transpose("<0 5 7 5>")
  .sound("triangle")`,
    },

    /* ── STRUDEL · giri di accordi ────────────────────────────────────── */
    'g-pop': {
      title: 'I–V–vi–IV: la progresión del pop',
      desc: 'Do, Sol, La menor, Fa: la progresión más usada de los últimos cincuenta años («Let It Be», «No Woman No Cry», «With or Without You»). Los números romanos son los grados de la escala: minúscula = acorde menor.',
      code: `setcpm(30)
// una línea de cifrados, dos capas: acordes y bajo
chord("<C G Am F>").layer(
  x => x.voicing().sound("sawtooth").lpf(900).gain(0.4),
  x => x.rootNotes(2).struct("x*4").sound("sawtooth").lpf(300)
)`,
    },
    'g-giro-di-do': {
      title: 'I–vi–IV–V: la progresión de los 50',
      desc: 'Do, La menor, Fa, Sol: la progresión de cientos de canciones de los años 50 y 60 (en italiano, el «giro di Do»). Los mismos acordes que la progresión pop, en otro orden. El arpegio en tresillos da el balanceo de baile lento.',
      code: `setcpm(25)
chord("<C Am F G>").layer(
  // [1 2 3]*4 = cuatro tresillos sobre las notas centrales del acorde
  x => x.voicing().arp("[1 2 3]*4").sound("triangle"),
  x => x.rootNotes(2).sound("sawtooth").lpf(300)
)`,
    },
    'g-minore': {
      title: 'vi–IV–I–V: la progresión en menor',
      desc: 'Otra vez los mismos cuatro acordes, pero empezando por La menor: el ambiente se vuelve más oscuro («Zombie» y «Despacito» usan esta progresión en otras tonalidades). El ritmo 3+3+2 es el tresillo cubano.',
    },
    'g-blues': {
      title: 'Blues de 12 compases',
      desc: 'Tres acordes de séptima (I, IV, V) repartidos en 12 compases: es la estructura del blues y del rock’n’roll. El ritmo «largo-corto» [x ~ x] es el shuffle.',
      code: `setcpm(28)
// 4 compases de C7 · 2 de F7, 2 de C7 · G7, F7, C7, G7
chord("<C7!4 F7!2 C7!2 G7 F7 C7 G7>").layer(
  x => x.voicing().struct("[x ~ x]*4")
    .sound("sawtooth").lpf(1000).gain(0.35),
  x => x.rootNotes(2).struct("[x ~ x]*4")
    .sound("sawtooth").lpf(300)
)`,
    },
    'g-jazz': {
      title: 'ii–V–I: la cadencia del jazz',
      desc: 'Re menor séptima, Sol séptima, Do séptima mayor: dos acordes de tensión que caen sobre la tónica. Es el ladrillo con el que están construidos casi todos los estándares de jazz.',
      code: `setcpm(28)
chord("<Dm7 G7 C^7!2>").layer(
  // acordes a contratiempo, como un pianista de jazz
  x => x.voicing().struct("~ x ~ x")
    .sound("sawtooth").lpf(1000).gain(0.35),
  x => x.rootNotes(2).struct("x*4").sound("triangle")
)`,
    },
    'g-andalusa': {
      title: 'Cadencia andaluza',
      desc: 'La menor, Sol, Fa, Mi: cuatro acordes que bajan por grados. Es el sonido del flamenco, y la progresión de «Hit the Road Jack». El último acorde, Mi mayor, quiere volver a La menor.',
    },
    'g-pachelbel': {
      title: 'El Canon de Pachelbel',
      desc: 'Ocho acordes, dos por compás, escritos hacia 1680 y reutilizados desde entonces en decenas de canciones. Encima, la línea que baja por grados. Aquí en Do (el original está en Re).',
      code: `setcpm(20)
stack(
  // la melodía baja una nota por acorde
  note("<[e5 d5] [c5 b4] [a4 g4] [a4 b4]>").sound("triangle"),
  chord("<[C G] [Am Em] [F C] [F G]>").layer(
    x => x.voicing().sound("sawtooth").lpf(800).gain(0.3),
    x => x.rootNotes(2).sound("sawtooth").lpf(300)
  )
)`,
    },
    'g-quinte': {
      title: 'El círculo de quintas',
      desc: 'Cada acorde baja una quinta hacia el siguiente: La, Re, Sol, Do, Fa, Si, Mi, La. Es la progresión de «Autumn Leaves» y de «I Will Survive»: una cadena de tensiones que se resuelven una en la otra.',
    },

    /* ── STRUDEL · cover ──────────────────────────────────────────────── */
    'c-gioia': {
      title: 'Himno de la alegría (Beethoven)',
      desc: 'La melodía se mueve casi solo por grados vecinos, por eso se canta tan bien. Debajo bastan dos acordes: tónica (C) y dominante (G).',
      code: `setcpm(30)
stack(
  // melodía: un compás por cada [ ]
  note(\`<
    [e5 e5 f5 g5] [g5 f5 e5 d5] [c5 c5 d5 e5] [e5@3 d5 d5@4]
    [e5 e5 f5 g5] [g5 f5 e5 d5] [c5 c5 d5 e5] [d5@3 c5 c5@4]
  >\`).sound("triangle"),
  // armonía: un acorde por compás
  chord("<C G C G C G C [G C]>").layer(
    x => x.voicing().sound("sawtooth").lpf(700).gain(0.3),
    x => x.rootNotes(2).sound("sawtooth").lpf(300)
  )
)`,
    },
    'c-martino': {
      title: 'Martinillo (canon)',
      desc: 'Un canon es una melodía que se acompaña a sí misma: una segunda voz canta las mismas notas, pero con retraso. off(2, …) la hace entrar dos compases después, una octava más arriba.',
      code: `setcpm(30)
// !2 repite el compás dos veces
note(\`<
  [c4 d4 e4 c4]!2
  [e4 f4 g4@2]!2
  [[g4 a4] [g4 f4] e4 c4]!2
  [c4 g3 c4@2]!2
>\`)
  .off(2, x => x.transpose(12))   // la segunda voz
  .sound("triangle")`,
    },
    'c-stellina': {
      title: 'Estrellita, ¿dónde estás?',
      desc: 'La melodía francesa sobre la que Mozart escribió doce variaciones. Se acompaña con los tres acordes principales de la tonalidad: I (C), IV (F) y V (G).',
      code: `setcpm(25)
stack(
  note(\`<
    [c5 c5 g5 g5] [a5 a5 g5@2]
    [f5 f5 e5 e5] [d5 d5 c5@2]
  >\`).sound("triangle"),
  // [F C] = dos acordes en el mismo compás
  chord("<C [F C] [F C] [G C]>").layer(
    x => x.voicing().sound("sawtooth").lpf(700).gain(0.3),
    x => x.rootNotes(2).sound("sawtooth").lpf(300)
  )
)`,
    },
    'c-korobeiniki': {
      title: 'Korobeiniki (el tema de Tetris)',
      desc: 'Una canción popular rusa del siglo XIX, que se hizo famosa como música de Tetris. Está en La menor, pero el acorde de Mi es mayor: ese Sol# «tira» hacia el La (escala menor armónica).',
      code: `setcpm(35)
stack(
  note(\`<
    [e4@3 g#4 b4@2 g#4 e4] [a4@3 c5 e5@2 d5 c5]
    [b4@3 c5 d5@2 e5@2]    [c5@2 a4@2 a4@4]
    [f5@3 g5 a5@2 g5 f5]   [e5@3 f5 e5@2 d5 c5]
    [b4@3 c5 d5@2 e5@2]    [c5@2 a4@2 a4@4]
  >\`).sound("square").lpf(2500).gain(0.6),
  // bajo: la fundamental, saltando una octava
  chord("<E Am E Am Dm Am E Am>").rootNotes(2)
    .struct("x*8").transpose("[0 12]*4")
    .sound("triangle")
)`,
    },
    'c-bella-ciao': {
      title: 'Bella ciao',
      desc: 'Canto popular italiano. La melodía empieza «a contratiempo» (en anacrusa): las tres notas de entrada (mi la si) están al final del compás anterior, aquí al final de la vuelta. Debajo, el bajo en los tiempos fuertes y los acordes a contratiempo.',
    },
    'c-elisa': {
      title: 'Para Elisa (Beethoven)',
      desc: 'Todo el tema oscila entre dos acordes arpegiados por la mano izquierda: La menor (tónica) y Mi mayor (dominante). Está en 3/8: cada ciclo es un compás de seis notas rápidas.',
      code: `setcpm(40)
stack(
  // mano derecha
  note(\`<
    [e5 d#5 e5 b4 d5 c5] [a4@2 ~ c4 e4 a4]
    [b4@2 ~ e4 g#4 b4]   [c5@2 ~ e4 e5 d#5]
    [e5 d#5 e5 b4 d5 c5] [a4@2 ~ c4 e4 a4]
    [b4@2 ~ e4 c5 b4]    [a4@2 ~ ~ e5 d#5]
  >\`).sound("triangle"),
  // mano izquierda: La menor, Mi mayor, La menor
  note(\`<
    ~ [a2 e3 a3 ~ ~ ~] [e2 e3 g#3 ~ ~ ~] [a2 e3 a3 ~ ~ ~]
    ~ [a2 e3 a3 ~ ~ ~] [e2 e3 g#3 ~ ~ ~] [a2 e3 a3 ~ ~ ~]
  >\`).sound("triangle")
).room(0.4)`,
    },
    'c-bach': {
      title: 'Preludio en Do (Bach)',
      desc: 'Aquí no hay melodía: solo acordes, uno por compás, tocados nota a nota. Es la propia armonía la que cuenta — escucha cómo cada acorde tiende hacia el siguiente.',
      code: `setcpm(18)
// cada [ , , ] es un acorde de cinco notas
note(\`<
  [c4,e4,g4,c5,e5] [c4,d4,a4,d5,f5]
  [b3,d4,g4,d5,f5] [c4,e4,g4,c5,e5]
  [c4,e4,a4,e5,a5] [c4,d4,f#4,a4,d5]
  [b3,d4,g4,d5,g5] [b3,c4,e4,g4,c5]
>\`)
  .arp("[0 1 2 3 4 2 3 4]*2")   // el orden en que Bach las desgrana
  .sound("triangle")
  .room(0.5)`,
    },
    'c-grieg': {
      title: 'En la gruta del rey de la montaña (Grieg)',
      desc: 'Un tema en Si menor que sube por grados y vuelve a caer, sobre un bajo que alterna fundamental y quinta. clip(0.5) acorta las notas como un pizzicato. En el original acelera sin parar: ¡sube setcpm en cada interpretación!',
      code: `setcpm(30)
stack(
  note(\`<
    [b3 c#4 d4 e4 f#4 d4 f#4@2]  [f4 c#4 f4@2 e4 c4 e4@2]
    [b3 c#4 d4 e4 f#4 d4 f#4 b4] [a4 f#4 d4 f#4 a4@2 ~@2]
  >\`).clip(0.5).sound("sawtooth").lpf(1500),
  // bajo: Si–Fa# (fundamental y quinta), luego Re–La
  note("<[b1 f#2 b1 f#2]!3 [d2 a2 d2 a2]>")
    .clip(0.5).sound("triangle")
)`,
    },

    /* ── STRUDEL · generi elettronici ─────────────────────────────────── */
    'it-batteria': {
      title: 'Batería italo con los segmentos',
      desc: 'El italo disco es la música dance italiana de principios de los 80: drum machine, bajos que rebotan, synth melancólicos. Aquí la batería se construye sacando segmentos de los dos breaks: el bombo de dnb1, caja y hi-hat de xbreak1.',
      code: `setcpm(118/4)
// bombo a negras · caja en el 2 y el 4 · hi-hat a contratiempo
s("dnb1:0*4, [~ xbreak1:2]*2, [~ xbreak1:1]*4")`,
    },
    'it-basso': {
      title: 'El bajo en octavas',
      desc: 'La seña de identidad del italo: el bajo toca semicorcheas sin parar, saltando entre la nota y la misma nota una octava más arriba. Las notas vienen de la progresión La menor, Fa, Do, Sol: rootNotes toma la fundamental de cada acorde.',
      code: `setcpm(118/4)
chord("<Am F C G>").rootNotes(1)
  .struct("x*16")              // semicorcheas
  .add(note("[0 12]*8"))       // una sí y otra no, una octava más arriba
  .sound("sawtooth")
  .lpf(800)
  .release(0.1)`,
    },
    'it-arpeggio': {
      title: 'Arpeggiator con delay',
      desc: 'Los mismos acordes desgranados en semicorcheas, como hacía el arpeggiator de los synth de la época. El delay repite cada nota tras una corchea con puntillo (0,38 segundos a 118 bpm): las repeticiones caen fuera de la rejilla y el arpegio parece perseguirse a sí mismo.',
      code: `setcpm(118/4)
chord("<Am F C G>")
  .voicing()
  .arp("[0 1 2 3]*4")
  .sound("square")
  .lpf(2000)
  .delay(0.4)
  .delaytime(0.38)       // una corchea con puntillo
  .delayfeedback(0.45)
  .gain(0.5)`,
    },
    'it-brano': {
      title: 'Una pieza de italo disco',
      desc: 'Todo junto: batería por segmentos, bajo en octavas, arpegio, un pad de supersaw y la melodía. Cada cuatro compases xbreak1 regala un roll de cuatro cajas distintas (los segmentos 2, 7, 10, 14). off() dobla la melodía una octava más arriba, una semicorchea después: un eco que brilla.',
      code: `setcpm(118/4)
stack(
  s("dnb1:0*4, [~ xbreak1:2]*2, [~ xbreak1:1]*4"),
  // el roll al final del cuarto compás
  n("<~ ~ ~ [~@3 [2 7 10 14]]>").s("xbreak1"),
  chord("<Am F C G>").layer(
    x => x.rootNotes(1).struct("x*16").add(note("[0 12]*8"))
      .sound("sawtooth").lpf(800).release(0.1),
    x => x.voicing().arp("[0 1 2 3]*4").sound("square")
      .lpf(2000).delay(0.4).delaytime(0.38).gain(0.3),
    x => x.voicing().sound("supersaw").attack(0.3)
      .lpf(1500).gain(0.2)
  ),
  note(\`<
    [e5@2 d5 c5 a4@2 c5 d5] [c5@2 a4@2 ~ a4 c5 f5]
    [e5@2 d5 c5 g4@2 c5 d5] [d5@3 b4 g4@2 ~@2]
  >\`).sound("square").lpf(3000).gain(0.4)
    .off(1/16, x => x.add(note(12)).gain(0.15))
)`,
    },

    'dnb-break': {
      title: 'El two-step a 170',
      desc: 'El drum and bass nace en Inglaterra a principios de los 90: breaks rapidísimos (170 bpm) y bajos profundísimos. Con setcpm(170/4) un ciclo es un compás y los primeros 8 segmentos de dnb1 lo llenan exacto: bombo, bombo, caja… es el two-step, el ritmo básico del género.',
      code: `setcpm(170/4)
// bombo 0 1 5 · caja 2 6 · hi-hat 3 4 7
n("0 1 2 3 4 5 6 7")
  .s("dnb1")`,
    },
    'dnb-due-break': {
      title: 'Dos baterías frente a frente',
      desc: 'Cada break dura dos compases: 8 segmentos el primero, 8 el segundo. Aquí se alternan los dos breaks que tenemos, dos compases cada uno. Mismo tempo, dos baterías distintos: xbreak1 es más sincopado, con el bombo que se adelanta.',
    },
    'dnb-edit': {
      title: 'Volver a montar el break',
      desc: 'Los productores de drum and bass nunca dejan el break tal cual: repiten un segmento en semicorcheas, mueven un bombo, añaden un roll al final. Los < > cambian la última corchea en cada compás. cut(1) hace callar el segmento viejo cuando empieza el nuevo.',
    },
    'dnb-jungle': {
      title: 'Jungle',
      desc: 'El jungle es la madre del drum and bass: breaks troceados como en el tutorial Beat IDM, sobre una bassline lenta que viene del reggae. Cuatro compases de xbreak1 vuelto a montar, con algún segmento que al azar tartamudea (ply) o suena al revés.',
      code: `setcpm(170/4)
stack(
  n(\`<
    [0 1 2 3 4 5 6 7]    [8 9 10 11 12 13 [14 14] 15]
    [0 1 2 3 0 1 2 [7 7]] [8 9 10 11 13 12 [14*4]@2]
  >\`).s("xbreak1")
    .sometimesBy(0.15, x => x.ply(2))
    .sometimesBy(0.1, x => x.speed(-1))
    .cut(1),
  // la bassline: una nota larga, luego dos cortas
  note("<[d2@3 ~] [d2@3 f2] [c2@3 ~] [a1@2 c2@2]>")
    .sound("triangle")
)`,
    },
    'dnb-reese': {
      title: 'El reese bass',
      desc: 'El bajo más famoso del drum and bass: dos ondas sawtooth casi iguales, una apenas más aguda (0,2 semitonos). Tocadas juntas «baten» y el sonido ondula, como un motor. El filtro que se abre y se cierra lo hace gruñir.',
      code: `setcpm(170/4)
note("<d2!3 [f2 c2]>")
  .add(note("0,0.2"))      // dos notas casi iguales, a la vez
  .sound("sawtooth")
  .lpf(sine.range(200, 1200).slow(4))
  .lpq(6)
  .gain(0.6)`,
    },
    'dnb-liquid': {
      title: 'Una pieza liquid',
      desc: 'El liquid es el drum and bass más suave: el break corre a 170 bpm, pero acordes y bajo se mueven lentos, un acorde cada dos compases. Sobre el break de dnb1, una capa de hi-hats sacados al azar de las dos carpetas.',
      code: `setcpm(170/4)
stack(
  n("0 1 2 [3 3] 4 5 6 <7 [7 7]>").s("dnb1").cut(1),
  // hi-hats al azar: | elige, ? a veces calla
  s("[dnb1:3|dnb1:11|xbreak1:1|xbreak1:9]*16?")
    .hpf(4000).gain(rand.range(0.1, 0.4)).pan(rand).cut(2),
  chord("<Dm9 Bb^7 Gm9 A7>").slow(2).layer(
    x => x.voicing().sound("triangle").attack(0.4).release(2)
      .room(0.7).gain(0.4),
    x => x.rootNotes(2).struct("x ~ ~ ~ ~ ~ x ~")
      .sound("sawtooth").lpf(300)
  )
)`,
    },

    'tk-cassa': {
      title: 'Bombo a negras',
      desc: 'El techno nace en Detroit en los años 80 y explota en Berlín en los 90: máquinas, repetición, hipnosis. Todo parte del bombo en cada pulso. Aquí es el segmento 0 de dnb1, tocado un poco más lento para que suene más grave. Encima, un hi-hat a contratiempo y las semicorcheas de xbreak1.',
      code: `setcpm(130/4)
stack(
  s("dnb1:0*4").speed(0.85),            // bombo
  s("[~ dnb1:4]*4").hpf(6000),          // hi-hat a contratiempo
  s("xbreak1:3*16").gain("[0.5 1]*8")   // semicorcheas, una suave y una fuerte
)`,
    },
    'tk-toploop': {
      title: 'El break como «top loop»',
      desc: 'Un truco de los DJ de techno: encima del bombo se pone un break entero, filtrado. hpf(3000) quita los graves del break, así su bombo no molesta al nuestro y quedan solo hi-hats y ghost notes. A 130 bpm cada segmento dura más que su sitio en el ciclo: cut(1) lo corta y el break se vuelve seco.',
    },
    'tk-acid': {
      title: 'Acid techno',
      desc: 'La bassline acid: el sonido de la Roland TB-303, una onda sawtooth con el filtro a una resonance altísima (lpq). Aquí el cutoff se abre lentísimo, en 16 compases: es la tensión que en la pista hace levantar los brazos. shape() la ensucia un poco.',
    },
    'tk-dub': {
      title: 'Dub techno',
      desc: 'Un solo acorde, tocado a contratiempo y ahogado en el delay: es el dub techno nacido en Berlín en los años 90. El delay (una corchea con puntillo, 0,36 s a 124 bpm) lo repite hasta el infinito, mientras el cutoff se abre y se cierra muy despacio.',
    },
    'tk-industriale': {
      title: 'Techno industrial',
      desc: 'El techno más duro: bombo distorsionado (shape) y un break reducido a ruido. crush(4) deja al sonido solo 4 bits, como una consola de hace cuarenta años: desaparece el detalle, queda el grano. De vez en cuando un segmento se duplica (ply).',
    },
    'tk-brano': {
      title: 'Una pieza de techno',
      desc: 'Bombo, hi-hat, top loop, bassline acid. En el techno la pieza cambia muy poco: cada ocho compases el filtro del top loop se abre (hpf de 3000 a 200) y xbreak1 entra entero, luego vuelve a quedarse fino. Déjalo sonar mucho rato: el filtro de la 303 hace el resto.',
    },

    'th-groove': {
      title: 'El groove tech house',
      desc: 'El tech house está a medio camino: el bombo recto del techno, el clap y el shuffle del house. swingBy(1/3, 8) retrasa un poco cada semicorchea a contratiempo: los hi-hats dejan de marchar y empiezan a bailar.',
      code: `setcpm(125/4)
stack(
  s("dnb1:0*4").speed(0.85),          // bombo
  s("~ cp ~ cp"),                     // clap en el 2 y el 4
  s("[~ dnb1:4]*4").hpf(6000),        // hi-hat a contratiempo
  s("xbreak1:3*16")                   // semicorcheas…
    .gain("[0.4 0.8]*8")
    .swingBy(1/3, 8)                  // …en shuffle
)`,
    },
    'th-basso': {
      title: 'El rolling bass',
      desc: 'La bassline del tech house casi nunca toca el pulso: suena entre un golpe de bombo y el siguiente, así los dos no se pisan. Notas cortas (release), el cutoff bajo y el mismo shuffle de los hi-hats.',
    },
    'th-perc': {
      title: 'Percusiones del break',
      desc: 'Del break se toman solo hi-hats y ghost notes (los segmentos ligeros de xbreak1), sacados al azar y filtrados: se convierten en un shaker que nunca se repite igual. degradeBy(0.4) silencia casi la mitad. Debajo, dos golpes de perc que hacen de bongós.',
    },
    'th-stab': {
      title: 'El stab',
      desc: 'Un «stab» es un acorde cortísimo, una puñalada. Aquí La menor novena, en dos ritmos que se alternan compás a compás, con un poco de delay (una corchea con puntillo: 0,36 s a 125 bpm) y de reverb.',
    },
    'th-brano': {
      title: 'Una pieza de tech house',
      desc: 'Groove, bajo, percusiones y stab juntos. mask("<1!7 0>") apaga bombo y bajo en el octavo compás: un breakdown relámpago que hace desear el drop, cuando el bombo vuelve a entrar en el compás siguiente. Es el truco más viejo de la pista.',
    },

    'idm-dadi': {
      title: 'El break a los dados',
      desc: 'irand(16) tira un dado de 16 caras: cada semicorchea suena un segmento al azar de xbreak1. Pero el azar puro no tiene forma. ribbon(7, 2) toma dos compases de azar y los repite en loop: el ritmo se convierte en un dibujo reconocible. Cambia el 7 para sacar otros dos.',
    },
    'idm-drill': {
      title: 'Drill ’n’ bass',
      desc: 'A mediados de los 90 Aphex Twin y Squarepusher toman el drum and bass y lo exageran: rolls de 8 y 16 golpes dentro de una sola corchea. ply() repite cada segmento tantas veces como dice el número, y el número cambia en cada compás. En el último el roll también sube de tono.',
    },
    'idm-poliritmo': {
      title: 'Tres vueltas que no se encuentran',
      desc: 'Tres voces sobre una rejilla de 16 semicorcheas, pero cada una gira sobre su propia longitud: el bombo cada 5 pasos, la caja cada 7, los hi-hats cada 3. Las llaves { }%16 hacen justo eso. Las tres vueltas no vuelven a alinearse hasta pasados 105 pasos: el ritmo parece cambiar siempre, aunque ninguna voz cambie nunca.',
      code: `setcpm(95/4)
stack(
  n("{0 ~ ~ 8 ~}%16").s("xbreak1"),          // bombo: vuelta de 5
  n("{~ ~ 2 ~ ~ ~ 10}%16").s("dnb1"),        // caja: vuelta de 7
  n("{3 6 9}%16").s("xbreak1")               // hi-hat: vuelta de 3
    .gain(0.5).pan(sine.slow(4))
)`,
    },
    'idm-nastro': {
      title: 'Cinta gastada',
      desc: 'La otra cara de la IDM, la de Boards of Canada: lenta, nostálgica, como una cinta de casete vieja. El break a su tempo original, oscurecido (lpf) y granulado (crush). El pad ondula de altura con vib y vibmod: es el «wow» de una cinta que se frena y vuelve a arrancar.',
      code: `setcpm(85/4)
stack(
  n(run(16)).s("xbreak1")
    .lpf(2000)
    .crush(8),
  chord("<F^7 Em7>").slow(2).voicing()
    .sound("sawtooth")
    .attack(0.5).release(2)
    .lpf(900)
    .vib(0.7).vibmod(0.2)     // la altura ondula despacio
    .room(0.6)
    .gain(0.4)
)`,
    },
    'idm-acid': {
      title: 'Acid al azar',
      desc: 'Una 303 que improvisa: irand(8) elige las notas entre las de la pentatónica de La menor, así que nunca desafina. perlin es un azar «suave», que se desliza en vez de saltar: mueve el cutoff como una mano sobre el potenciómetro. Debajo, dnb1 con un roll en el último compás.',
    },
  },
});
