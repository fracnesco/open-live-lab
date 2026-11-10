/* Español · ejemplos de las guías de Hydra (traduce js/snippets/visuale-guide.js).
   «code» se repite donde el italiano tiene comentarios o variables con
   nombre propio: las variables llevan su nombre en español (el mismo en
   los tutoriales, ver RENAME en test/i18n.test.js). */

I18N.content('es', 'snippets', {

  cats: {
    'Texture':         'Texturas',
    'Generative':      'Generativas',
    'Tempo':           'Tiempo',
    'Clic e tastiera': 'Clic y teclado',
  },

  tags: { hydra: {
    'texture':      ['textura',       'Motivos que se repiten: rayas, lunares, tableros de ajedrez, manchas, vidrieras.'],
    'generativo':   ['generativo',    'El código construye la visual: bucles, listas, condiciones.'],
    'casuale':      ['aleatorio',     'Una parte la decide el azar: cada ▶ es un poco distinto.'],
    'clic e tasti': ['clic y teclas', 'Reacciona a los clics y a las teclas: la visual se toca con las manos.'],
  } },

  items: {

    /* ── HYDRA · texturas ── */
    'h-tx-zebra': {
      title: 'Cebra',
      desc: 'thresh() vuelve nítidas las rayas de osc(); el ruido las curva como las de una cebra de verdad.',
      code: `osc(30, 0.02)
  .thresh(0.5)                       // rayas nítidas, blancas y negras
  .modulate(noise(2, 0.05), 0.3)     // curvadas por el ruido
  .out()`,
    },
    'h-tx-target': {
      title: 'Dianas',
      desc: 'Con muchísimos gajos, kaleid() curva las rayas en círculos: los anillos de una diana, repetidos en cuadrícula.',
      code: `osc(40, 0.05)
  .thresh(0.5)
  .kaleid(200)          // muchos gajos: las rayas se vuelven anillos
  .repeat(3, 3)
  .out()`,
    },
    'h-tx-dots': {
      title: 'Lunares redondos',
      desc: 'La pantalla es más ancha que alta, y los círculos repetidos salen ovalados. scale(1, alto / ancho) estrecha la cuadrícula y los vuelve redondos.',
      code: `shape(100, 0.3, 0.01)
  .repeat(8, 8)
  // estrecha a lo ancho tanto como es ancha la pantalla: círculos redondos
  .scale(1, () => innerHeight / innerWidth)
  .scrollY(0, 0.05)
  .color(1, 0.3, 0.5)
  .out()`,
    },
    'h-tx-checker': {
      title: 'Tablero de ajedrez',
      desc: 'Rayas verticales diff rayas horizontales: donde son iguales, negro; donde son distintas, blanco. Es un tablero de ajedrez; las segundas giran despacio y lo deforman.',
      code: `osc(60, 0)
  .thresh(0.5)
  .diff(
    osc(60, 0).thresh(0.5)
      .rotate(1.57, 0.02)     // un cuarto de vuelta, y luego poco a poco
  )
  .out()`,
    },
    'h-tx-tartan': {
      title: 'Tela escocesa',
      desc: 'Franjas de color planas (posterize) en vertical, mezcladas a medias con las mismas franjas en horizontal: donde se cruzan los colores se funden, como hilos entretejidos.',
    },
    'h-tx-moire': {
      title: 'Moiré',
      desc: 'Dos cebras iguales, la segunda girada muy poquito: de su encuentro nacen franjas anchas que nadie ha dibujado. Son los batimientos, hechos de luz.',
    },
    'h-tx-stained': {
      title: 'Vidriera',
      desc: 'voronoi() con el tercer número a 0: cada celda de un gris plano. colorama() las convierte en vidrios de colores.',
      code: `voronoi(6, 0.2, 0)      // celdas planas, sin degradado
  .colorama(0.6)
  .out()`,
    },
    'h-tx-cracks': {
      title: 'Tierra agrietada',
      desc: 'diff de una imagen con una copia suya desplazada muy poquito: dentro de las celdas queda negro, en los bordes nacen las grietas.',
      code: `voronoi(6, 0.2, 0)
  .diff(voronoi(6, 0.2, 0).scroll(0.003, 0.003))   // una copia desplazada
  .thresh(0.01)                                     // los bordes, en blanco
  .color(0.9, 0.7, 0.5)
  .out()`,
    },
    'h-tx-rgb': {
      title: 'Filtro RGB',
      desc: 'Como la pantalla de un televisor viejo visto de cerca: cada cuadradito dividido en tres franjitas, roja, verde y azul. osc con una franja por cuadradito y los colores desfasados un tercio de vuelta.',
      code: `cuadritos = 40     // cuadritos: los cuadraditos

voronoi(4, 0.3, 0)
  .colorama(0.5)
  .pixelate(cuadritos, cuadritos)
  // una vuelta de onda (2π) por cuadradito, los colores desfasados un tercio
  .mult(osc(Math.PI * 2 * cuadritos, 0, Math.PI * 2 / 3))
  .out()`,
    },

    /* ── HYDRA · generativas ── */
    'h-gen-rosette': {
      title: 'Rosetón',
      desc: 'Un bucle for cruza las mismas rayas nítidas muchas veces, giradas media vuelta dividida entre cuantas: una estrella. scroll la mueve a la derecha, fuera del editor. Cambia cuantas.',
      code: `cuantas = 7               // cuantas: cuántas
imagen = osc(15, 0.02).thresh(0.5)     // imagen: la imagen

for (let i = 1; i < cuantas; i++) {
  imagen = imagen.diff(osc(15, 0.02).thresh(0.5).rotate(i * Math.PI / cuantas))
}

imagen
  .scroll(-0.25, 0)       // el centro de la estrella, a la derecha
  .out()`,
    },
    'h-gen-name': {
      title: 'Tu nombre',
      desc: 'Cada letra es un número (charCodeAt): forEach hace de ella una forma, con los lados y la velocidad que decide la letra. Cada palabra tiene su visual.',
      code: `palabra = 'livelab'     // escribe tu nombre (palabra: palabra)
imagen = solid()

palabra.split('').forEach((letra, i) => {
  const numero = letra.charCodeAt(0)
  imagen = imagen.diff(
    shape(numero % 8 + 3, 0.15 + i * 0.07, 0.01).rotate(numero, 0.02 * (i + 1))
  )
})

imagen.repeat(3, 3).out()`,
    },
    'h-gen-bubbles': {
      title: 'Burbujas en capas',
      desc: 'Cinco capas de burbujas construidas por un bucle: cada capa más densa, más rápida y de otro color. Parecen lejanas y cercanas, como desde la ventanilla del tren.',
      code: `imagen = solid()

for (let i = 1; i <= 5; i++) {
  imagen = imagen.add(
    shape(100, 0.25, 0.01)
      .repeat(i * 2, i * 2)
      .scrollY(0, 0.02 * i)      // las capas densas van más rápido
      .color(1 / i, 0.4, i / 5),
    0.5
  )
}

imagen.out()`,
    },
    'h-gen-surprise': {
      title: 'Cada ▶ una sorpresa',
      desc: 'El bucle construye cinco capas, el azar elige triángulos o celdas (forma), las pares deforman y las impares se cruzan. Pulsa ▶ muchas veces: cada composición es nueva.',
      code: `imagen = osc(20, 0.05, 1)

for (let i = 1; i <= 5; i++) {
  const forma = Math.random() < 0.5
    ? shape(3, 0.5, 0.01).repeat(i, i)
    : voronoi(i * 2, 0.3)
  imagen = i % 2 == 0
    ? imagen.modulate(forma, 0.1)
    : imagen.diff(forma.rotate(i, 0.05 * i))
}

imagen.out()`,
    },
    'h-gen-reduce': {
      title: 'Desde una lista de formas',
      desc: 'map() transforma una lista de números (lados) en una lista de formas que giran; reduce() las cruza todas en una sola imagen.',
      code: `lados = [3, 4, 5, 6, 8]

lados
  .map(n => shape(n, 0.5, 0.01).rotate(0, n * 0.04))    // números → formas
  .reduce((todas, forma) => todas.diff(forma))         // formas → una
  .repeat(3, 2)
  .out()`,
    },

    /* ── HYDRA · tiempo ── */
    'h-tm-pop': {
      title: 'Burbujas que revientan',
      desc: 'El diente de sierra, time % duracion / duracion: sube de 0 a 1 y vuelve a empezar de golpe. Las burbujas se hinchan y revientan cada dos segundos.',
      code: `duracion = 2
fase = 0

update = () => {
  fase = time % duracion / duracion     // de 0 a 1, y otra vez 0
}

shape(100, () => fase * 0.6, 0.01)
  .repeat(4, 3)
  .color(0.3, 0.8, 1)
  .out()`,
    },
    'h-tm-bursts': {
      title: 'Explosiones a tiempo',
      desc: 'Una cuadrícula de cuadrados aparece durante un solo fotograma, una vez por segundo; el feedback la agranda y la desvanece.',
      code: `fotogramas = 0
update = () => { fotogramas++ }     // fotogramas: fotogramas

src(o0)
  .scale(1.015)
  .rotate(0.01)
  .color(0.985, 0.985, 0.985)    // el eco se desvanece
  .add(
    shape(4, 0.3, 0.01).repeat(3, 3).color(1, 0.5, 0.8),
    () => fotogramas % 60 == 0 ? 1 : 0    // un fotograma de cada 60
  )
  .out()`,
    },
    'h-tm-firefly': {
      title: 'Luciérnaga',
      desc: 'Un paseo aleatorio: en cada fotograma, un pasito al azar. El eco deja la estela. Si sale de la pantalla, vuelve a entrar por el otro lado.',
    },
    'h-tm-bounce': {
      title: 'Pelota que rebota',
      desc: 'Posición y velocidad en update: cuando la pelota toca un borde, la velocidad cambia de signo. Con la gravedad (vy -= …) cae y rebota.',
      code: `x = -0.3;  y = 0
vx = 0.003; vy = 0.007

update = () => {
  vy -= 0.0002                              // la gravedad
  x += vx
  y += vy
  if (x < -0.45 || x > -0.25) vx = -vx
  if (y < -0.45) { y = -0.45; vy = -vy }    // el suelo
}

shape(100, 0.05, 0.01)
  .color(0.3, 1, 0.8)
  .scroll(() => x, () => y)
  .add(src(o0).brightness(-0.03))
  .out()`,
    },
    'h-tm-beat': {
      title: 'Al ritmo de la música',
      desc: 'update calcula la fase del pulso a 120 bpm: los cuadrados se hinchan al comienzo de cada pulso, como un bombo, y en cada pulso cambia el tono (tinte).',
      code: `bpm = 120
ultimoPulso = 0
fase = 0
tinte = 0

update = () => {
  const pulsos = time * bpm / 60
  fase = pulsos % 1
  if (Math.floor(pulsos) != ultimoPulso) {
    ultimoPulso = Math.floor(pulsos)
    tinte = Math.random()
  }
}

shape(4, () => 0.2 + (1 - fase) * 0.3, 0.01)
  .repeat(4, 3)
  .diff(osc(20, 0.1, 1).hue(() => tinte))
  .out()`,
    },

    /* ── HYDRA · clic y teclado ── */
    'h-in-knobs': {
      title: 'El mouse como perillas',
      desc: 'mouse.x / innerWidth va de 0 a 1, de izquierda a derecha: decide las rayas. mouse.y decide el color y la rotación.',
      code: `// mueve el mouse sobre la visual
osc(() => mouse.x / innerWidth * 60, 0.1, () => mouse.y / innerHeight * 2)
  .rotate(() => mouse.y / innerHeight * 3)
  .kaleid(4)
  .out()`,
    },
    'h-in-melt': {
      title: 'Mantén pulsado y se derrite',
      desc: 'onpointerdown y onpointerup: mientras mantienes pulsado, pulsado vale true y el ruido derrite la imagen. Suelta, y vuelve a su sitio.',
      code: `pulsado = false
onpointerdown = () => { pulsado = true }
onpointerup = () => { pulsado = false }

osc(20, 0.1, 0.8)
  .kaleid(5)
  .modulate(noise(3, 0.2), () => pulsado ? 0.5 : 0)
  .out()`,
    },
    'h-in-newpatch': {
      title: 'Un clic, una visual',
      desc: 'La receta nueva() inventa una visual al azar; onpointerup = nueva la rehace con cada clic.',
      code: `nueva = () => {
  osc(Math.random() * 40, 0.1, Math.random() * 2)
    .kaleid(Math.floor(Math.random() * 6) + 2)
    .rotate(Math.random() * Math.PI, 0.1)
    .modulate(noise(Math.random() * 5, 0.1), Math.random() * 0.3)
    .out()
}

nueva()
onpointerup = nueva     // sin paréntesis: la llama el navegador, al hacer clic`,
    },
    'h-in-keys': {
      title: 'Teclado para tocar',
      desc: 'A S D F G cambian la forma, E enciende y apaga el eco, el mouse cambia el color. Primero haz clic en la visual, luego toca.',
      code: `// A S D F G: las formas · E: el eco · el mouse: el color
formas = { a: 3, s: 4, d: 5, f: 6, g: 100 }     // formas: formas
lados = 4                                       // lados: lados
eco = true

onkeydown = (evento) => {
  if (formas[evento.key]) lados = formas[evento.key]
  if (evento.key === 'e') eco = !eco
}

shape(() => lados, 0.3, 0.01)
  .repeat(4, 3)
  .rotate(0, 0.1)
  .color(() => mouse.x / innerWidth, 0.5, 1)
  .add(src(o0).scale(1.02).brightness(-0.05), () => eco ? 1 : 0)
  .out()`,
    },
    'h-in-arrows': {
      title: 'Caleidoscopio con las flechas',
      desc: 'Las flechas mueven el centro del caleidoscopio, + y - lo agrandan y lo achican. evento.key dice qué tecla has pulsado.',
      code: `// (no «zoom»: ya es el nombre de una función de Strudel)
x = 0; y = 0; escala = 1
onkeydown = (evento) => {
  if (evento.key === 'ArrowRight') x -= 0.05
  if (evento.key === 'ArrowLeft')  x += 0.05
  if (evento.key === 'ArrowUp')    y -= 0.05
  if (evento.key === 'ArrowDown')  y += 0.05
  if (evento.key === '+') escala *= 1.1
  if (evento.key === '-') escala /= 1.1
}

osc(20, 0.1, 1)
  .kaleid(6)
  .scale(() => escala)
  .scroll(() => x, () => y)
  .out()`,
    },

    /* ── HYDRA · micrófono (Cámara y sonido) ── */
    'h-mic-eq': {
      title: 'Ecualizador',
      desc: 'a.setBins(8) divide el sonido en ocho bandas; un bucle for dibuja una columna por banda, tan alta como su volumen. a.show() muestra las barras del micrófono.',
      code: `// hace falta 🎤 MIC encendido en la barra de arriba
a.setBins(8)
a.show()

barras = solid()     // barras: las barras
for (let i = 0; i < 8; i++) {
  barras = barras.add(
    shape(4, 1, 0.001)
      .scale(1, 0.02, () => 0.01 + a.fft[i])
      .scrollX(-0.25 - i * 0.03)
      .color(1 - i / 8, 0.4, i / 8)
  )
}
barras.out()`,
    },
    'h-mic-count': {
      title: 'Cuenta los golpes de bombo',
      desc: 'Un detector de golpes en update: cuando los graves superan 0.6 y un instante antes estaban por debajo, golpes++. Cada golpe cambia la forma y la gira un paso.',
      code: `// hace falta 🎤 MIC encendido en la barra de arriba
a.setSmooth(0.5)
golpes = 0
encima = false     // encima: por encima del umbral

update = () => {
  if (a.fft[0] > 0.6 && !encima) golpes++    // baja 0.6 si no cuenta
  encima = a.fft[0] > 0.6
}

shape(() => golpes % 5 + 3, 0.4, 0.01)
  .repeat(4, 3)
  .rotate(() => golpes * 0.3)
  .out()`,
    },
  },
});
