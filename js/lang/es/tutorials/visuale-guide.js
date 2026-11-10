/* Español · js/tutorials/visuale-guide.js
   Las variables del código llevan su nombre en español (el mismo en
   todos los pasos y en los ejemplos, ver RENAME en test/i18n.test.js), y
   el texto las nombra igual; los comentarios están traducidos. */

I18N.content('es', 'tutorials', { items: {

/* ╔══ VISUAL · Texturas ═════════════════════════════════════════════ */
texture: {
  title: 'Texturas',
  desc: 'Rayas, anillos, lunares, tableros de ajedrez, manchas y vidrieras: los motivos que se repiten, construidos con osc, shape, noise y voronoi. Del capítulo «Textures» del libro de Hydra.',
  steps: [
    {
      title: 'Rayas nítidas: thresh',
      text: [
        '¡Hola! En este tutorial construimos **texturas**: motivos que se repiten, como la tela de una camiseta, los azulejos del baño o las manchas de una vaca.',
        'Siempre se empieza por las rayas de `osc()`. Pero sus rayas son **suaves**: se difuminan de lo claro a lo oscuro. `.thresh()` (de *threshold*, umbral) las vuelve **nítidas**: lo que es más claro que el umbral se vuelve blanco, el resto negro. Aquí tienes una cebra.',
      ],
      try: 'Prueba thresh(0.2) y thresh(0.8): cambia el grosor de las rayas blancas. Luego añade .modulate(noise(2, 0.05), 0.3) antes de .out(): las rayas se doblan como las de una cebra de verdad.',
    },
    {
      title: 'Escalones de color: posterize',
      text: [
        '`.posterize()` hace algo parecido, pero con los **colores**: en lugar de difuminarlos, los reduce a unos pocos escalones, como en un cartel impreso con pocas tintas.',
        'El primer número dice cuántos escalones hay para cada color. Con 3, las rayas de arcoíris se convierten en franjas planas.',
      ],
      try: 'Prueba posterize(2, 1) y posterize(8, 1). Con 2 solo quedan los colores más vivos.',
    },
    {
      title: 'Anillos: kaleid',
      text: [
        'En el tutorial Primeros pasos, `.kaleid()` doblaba la imagen en unos pocos gajos. Con **muchísimos** gajos pasa algo curioso: las rayas rectas se doblan en **círculos**, como los anillos de una diana o los de una piedra en un estanque.',
        'El centro de la diana está en el centro de la pantalla, debajo del panel: a la derecha ves los anillos más externos que se ensanchan.',
      ],
      try: 'Prueba kaleid(4): los anillos se convierten en cuadrados anidados. Con la velocidad a 0, osc(40, 0), la diana se detiene.',
    },
    {
      title: 'Lunares: shape y repeat',
      text: [
        'Un círculo (`shape` con muchos lados) repetido con `.repeat()` se convierte en un vestido de **lunares**.',
        'Pero míralos bien: son **óvalos**, aplastados. Hydra mide la pantalla de 0 a 1 tanto a lo ancho como a lo alto, y como la pantalla es más ancha que alta, cada celda de la cuadrícula es un rectángulo, y el círculo se ensancha con ella.',
      ],
      try: 'Prueba shape(4, 0.8, 0.01): los cuadrados casi se tocan y queda una cuadrícula de líneas finas, como las juntas entre los azulejos.',
    },
    {
      title: 'Círculos redondos',
      text: [
        'Para que vuelvan a ser redondos hay que **estrechar** toda la cuadrícula a lo ancho, en la misma proporción que la pantalla. `innerHeight / innerWidth` es la altura de la ventana dividida por su anchura: en una pantalla ancha sale más o menos 0.6.',
        '`.scale(1, …)` usa ese número solo para la anchura: las celdas se vuelven cuadradas y los lunares, círculos. Lo hemos puesto dentro de `() =>` para que siga siendo correcto aunque ensanches o estreches la ventana. En el tutorial JavaScript vemos mejor de dónde salen estos dos nombres.',
      ],
      try: 'Añade .scrollY(0, 0.05) antes de .out(): los lunares suben sin fin. Luego prueba a subir el tercer número de shape a 0.3: lunares difuminados.',
    },
    {
      title: 'El tablero de ajedrez: rayas por rayas',
      text: [
        '¿Qué pasa si cruzamos unas rayas verticales con unas rayas horizontales? El `diff` del tutorial Mezclar y deformar hace justo lo que hace falta: donde las dos imágenes son iguales (blanco con blanco, negro con negro) sale negro, donde son distintas sale blanco. Es un **tablero de ajedrez**.',
        'Las segundas rayas son las mismas, giradas un cuarto de vuelta con `rotate(1.57)`.',
      ],
      try: 'Cambia diff por mult: solo queda blanco donde se cruzan las rayas blancas, y el tablero se convierte en una cuadrícula de cuadraditos. Luego prueba rotate(0.8) en la segunda cadena: rombos.',
    },
    {
      title: 'La tela escocesa',
      text: [
        'El mismo cruce con rayas de **colores**, en lugar de blancas y negras, da un tejido: el **tartán** de las faldas escocesas. `posterize` hace las franjas de color planas, como hilos teñidos, y `blend(…, 0.5)` mezcla a partes iguales las franjas verticales con las horizontales: donde se cruzan, los colores se funden, como dos hilos entrelazados.',
      ],
      try: 'Cambia 20 por 8 en solo una de las dos cadenas: las franjas se vuelven anchas por un lado y finas por el otro, como en una camisa de cuadros.',
    },
    {
      title: 'Moiré: rayas sobre rayas',
      text: [
        '¿Alguna vez has visto aparecer unas ondas raras al mirar dos cortinas superpuestas, o una camisa de rayas en la tele? Es el efecto **moiré**: dos motivos casi iguales, superpuestos, dibujan un tercer motivo mucho más grande.',
        'Aquí la segunda cebra está girada muy poquito, y el ángulo oscila despacio: donde las rayas coinciden queda negro, donde se desfasan se enciende. Las franjas anchas y oblicuas que se mueven no las ha dibujado nadie: nacen del encuentro de las dos.',
        'Pasa también con el sonido: dos notas casi iguales tocadas juntas «baten», es decir, el volumen sube y baja lentamente. Son los mismos **batimientos**, hechos de luz.',
      ],
      try: 'Cambia 0.1 por 0.03: las dos cebras están casi rectas y las franjas del moiré se vuelven anchísimas. Con 0.3 se estrechan. Cuanto más cerca de la misma dirección están las rayas, más grande es el dibujo escondido.',
    },
    {
      title: 'Manchas: noise y thresh',
      text: [
        '`thresh` funciona con cualquier imagen. Sobre el humo de `noise()` da **manchas** de borde nítido, como las de una vaca o de un dálmata. El humo se mueve, y las manchas se deforman poco a poco.',
      ],
      try: 'Prueba thresh(0), thresh(0.5) y noise(10, 0.05). Luego añade .color(0.9, 0.6, 0.2): ¡una jirafa!',
    },
    {
      title: 'Vidrieras: voronoi',
      text: [
        '`voronoi()` tiene un tercer número: el **degradado** dentro de cada celda. A 0 cada celda es de un gris plano, distinto del de sus vecinas, como un mosaico o una vidriera. `.colorama()` convierte los grises en colores.',
      ],
      try: 'Prueba voronoi(6, 0.2, 2): cada celda se oscurece hacia el borde, como una burbuja.',
    },
    {
      title: 'Los bordes: una copia desplazada',
      text: [
        'Un truco de texturas: el **diff** de una imagen con una copia suya desplazada muy poquito. Dentro de las celdas las dos copias son iguales y el resultado es negro; solo en los **bordes**, donde cambia el color, quedan unas líneas finas. Luego `thresh` las vuelve blancas y nítidas.',
        'El resultado parece la tierra seca y agrietada del verano.',
      ],
      try: 'Cambia 0.003 por 0.01: las grietas se ensanchan. Luego prueba el truco con el humo: en lugar de voronoi(6, 0.2, 0), las dos veces, escribe noise(3, 0.1).posterize(6, 1). El posterize divide el humo en escalones, y los bordes de los escalones son las curvas de nivel de un mapa de montañas.',
    },
    {
      title: 'Todo junto',
      text: [
        'Las texturas se pueden mezclar entre sí como cualquier otra imagen. Aquí los lunares hacen de **molde** (`mask`) para un tablero de ajedrez muy fino, y debajo corren las manchas de colores.',
        'Enhorabuena: ¡ya sabes construir la tela de un vestido! Llévalo al LAB con **→ EDITOR** y cambia un motivo cada vez.',
      ],
      code: `// un tablero de ajedrez fino dentro de los lunares...
osc(150, 0)
  .thresh(0.5)
  .diff(osc(150, 0).thresh(0.5).rotate(1.57))
  .mask(shape(100, 0.4, 0.01).repeat(5, 5).scale(1, () => innerHeight / innerWidth))
  // ...sobre un fondo de manchas violeta
  .add(noise(3, 0.05).thresh(0.2).color(0.4, 0.1, 0.7))
  .out()`,
      try: 'En lugar del tablero prueba las rayas de la cebra, en lugar de las manchas las grietas: cada combinación es una tela nueva.',
    },
  ],
},

/* ╔══ VISUAL · JavaScript para las visuales ═════════════════════════ */
javascript: {
  title: 'JavaScript para las visuales',
  desc: 'Hydra se escribe en JavaScript, y un poco de JavaScript da superpoderes: variables, listas, funciones que construyen visuales, objetos y la caja de herramientas Math. De la guía «Javascript for Hydra users».',
  steps: [
    {
      title: 'Es JavaScript',
      text: [
        '¡Hola! El código que escribes para las visuales es **JavaScript**, el lenguaje de todas las páginas web. Hydra añade sus funciones (`osc`, `kaleid`, `out`…), pero todo lo demás viene de JavaScript, y lo podemos usar.',
        'Empecemos por algo que ya conoces, los comentarios, con una novedad: `/*` y `*/` hacen un comentario **de varias líneas**. Todo lo que queda en medio se salta. Aquí apaga dos funciones de una sola vez.',
      ],
      code: `/* Un comentario de varias líneas:
   Hydra se salta todo lo que está aquí dentro. */
osc(20, 0.1, 0.8)
  .kaleid(4)
  /* .pixelate(20, 20)
  .invert() */
  .out()`,
      try: 'Mueve el */ justo después de .pixelate(20, 20): ahora solo está apagado invert.',
    },
    {
      title: 'Variables: dar un nombre a un número',
      text: [
        'Una **variable** es un nombre que recuerda un valor. `gajos = 6` quiere decir: a partir de aquí, cuando escriba `gajos`, me refiero a 6.',
        'Las reglas para los nombres: nada de espacios, no se empieza con un número, y mejor evitar las tildes y la ñ. Y sobre todo **no uses los nombres que Hydra o Strudel ya usan**, como `osc`, `shape`, `time`, `speed` o `zoom`: `osc = 3` borraría el oscilador, y `speed = 0.1` frenaría todas las visuales. Con nombres en español casi siempre estás a salvo.',
      ],
      code: `gajos = 6
velocidad = 0.1

osc(20, velocidad, 0.8)
  .kaleid(gajos)
  .out()`,
      try: 'Cambia gajos = 6 por gajos = 3 y pulsa ▶.',
    },
    {
      title: 'Una variable, muchas cadenas',
      text: [
        'Las variables sirven sobre todo cuando el **mismo número** aparece en varios sitios. Aquí dos cuadrículas de formas usan el mismo número de lados (`lados`): basta con cambiarlo una sola vez, arriba, y cambian las dos.',
      ],
      code: `lados = 3

shape(lados, 0.5, 0.01).repeat(4, 3)
  .diff(shape(lados, 0.3, 0.01).repeat(4, 3).rotate(0, 0.2))
  .out()`,
      try: 'Prueba lados = 4, lados = 6 y lados = 100.',
    },
    {
      title: 'Listas: los arrays',
      text: [
        'Un **array** es una lista de valores entre corchetes. Cada valor tiene un número de posición, y se cuenta desde **cero**: `morado[0]` es el primero, `morado[1]` el segundo, `morado[2]` el tercero.',
        'Aquí una lista guarda los tres números de un color (rojo, verde, azul), así el color tiene un solo nombre: `morado` o `naranja`.',
        'En Primeros pasos ya usaste las listas de otra manera: `kaleid([3, 4, 6])` toma un valor tras otro en el tiempo. Es la misma lista, que Hydra lee como una **secuencia**.',
      ],
      code: `morado  = [0.7, 0.3, 1]
naranja = [1, 0.5, 0.1]

osc(20, 0.1)
  .color(morado[0], morado[1], morado[2])
  .out()`,
      try: 'Usa naranja en lugar de morado. Atajo: .color(...naranja) escribe solo los tres valores de la lista.',
    },
    {
      title: 'Funciones: una receta',
      text: [
        'Una **función** es una receta con ingredientes. `(lados, cuantas) => …` quiere decir: dame un número de lados y un número de copias, y yo te devuelvo una rejilla de formas.',
        'Una vez escrita, la receta se usa cuantas veces quieras, con ingredientes distintos: aquí una cuadrícula de triángulos y una de hexágonos, cruzadas con `diff`.',
      ],
      code: `rejilla = (lados, cuantas) => shape(lados, 0.4, 0.01).repeat(cuantas, cuantas)

rejilla(3, 4)
  .diff(rejilla(6, 2).rotate(0, 0.1))
  .out()`,
      try: 'Añade un tercer ingrediente, el tamaño, con un valor de reserva: rejilla = (lados, cuantas, grande = 0.4) => shape(lados, grande, 0.01).repeat(cuantas, cuantas). Ahora rejilla(3, 4, 0.6) hace triángulos más grandes, y rejilla(6, 2), sin el tercer número, usa 0.4. (Sin el «= 0.4», rejilla(6, 2) daría error.)',
    },
    {
      title: 'Funciones que hacen funciones',
      text: [
        'Ya conoces las funciones `() => …` que Hydra recalcula en cada fotograma. ¿Y si una receta **devolviera una de ellas**? Es una fábrica de movimientos.',
        '`onda(velocidad, min, max)` devuelve una onda que sube y baja entre `min` y `max`. Así no tienes que reescribir cada vez las cuentas con `Math.sin`: aquí el caleidoscopio va entre 3 y 8 gajos, despacio, y mientras tanto la visual respira entre 0.8 y 1.2, más deprisa.',
      ],
      code: `onda = (velocidad, min, max) =>
  () => min + (max - min) * (0.5 + 0.5 * Math.sin(time * velocidad))

osc(20, 0.1, 0.8)
  .kaleid(onda(0.3, 3, 8))
  .scale(onda(2, 0.8, 1.2))
  .out()`,
      try: 'Usa la fábrica también para el color: .colorama(onda(0.5, 0, 0.3)).',
    },
    {
      title: 'Math: la caja de herramientas',
      text: [
        '`Math` es una caja de herramientas para hacer cuentas. `Math.sin` ya la conoces. Aquí tienes otras tres herramientas:',
        '`Math.PI` es pi, 3.14159…: en radianes es **media vuelta**, así que `Math.PI / 4` es un octavo de vuelta. `Math.random()` saca un número **al azar** entre 0 y 1. `Math.floor()` corta la parte después de la coma: `Math.floor(4.7)` da 4.',
        'Aquí los números los elige el azar: **cada vez que pulsas ▶** sale una visual distinta.',
      ],
      try: 'Pulsa ▶ diez veces. Cuando encuentres una que te guste, cuidado: ¡al volver a ejecutar desaparece! Cópiala al LAB con → EDITOR y sustituye los Math.random por los números que quieras conservar.',
    },
    {
      title: 'Un filtro RGB con Math.PI',
      text: [
        'Mira muy de cerca la pantalla de un televisor antiguo: cada puntito está hecho de tres tiritas, una **roja**, una **verde** y una **azul**. Vamos a rehacerlo, con dos cuentas.',
        '`pixelate(cuadritos, cuadritos)` divide la imagen en cuadritos. Luego la multiplicamos por un `osc` con **una raya por cuadrito**: como una onda da una vuelta entera en `Math.PI * 2`, la frecuencia correcta es `Math.PI * 2 * cuadritos`.',
        'El tercer número de `osc` desplaza el rojo, el verde y el azul uno respecto al otro. Con un tercio de vuelta, `Math.PI * 2 / 3`, los tres colores se ponen en fila, uno por tirita.',
      ],
      code: `cuadritos = 40

voronoi(4, 0.3, 0)
  .colorama(0.5)
  .pixelate(cuadritos, cuadritos)
  .mult(osc(Math.PI * 2 * cuadritos, 0, Math.PI * 2 / 3))
  .out()`,
      try: 'Prueba cuadritos = 20: ves bien las tres tiritas en cada cuadrito. En lugar de las celdas puedes poner cualquier visual, incluso la webcam.',
    },
    {
      title: 'Objetos: el punto para entrar',
      text: [
        'Un **objeto** es una caja con cajones, cada uno con su nombre. Se escribe entre llaves: `tinte = { r: 1, g: 0.4, b: 0.8 }`. Para abrir un cajón se usa el **punto**: `tinte.r` es 1.',
        'Muchas cosas que usas son objetos. `window` es la ventana del navegador: `window.innerWidth` y `window.innerHeight` son su anchura y su altura, en píxeles (el `window.` también se puede dejar implícito, como en el tutorial Texturas). `mouse` también es un objeto: `mouse.x` y `mouse.y`. Y también `a`, el micrófono: `a.fft`.',
        'Con la proporción (`proporcion`) de la ventana, como en el tutorial Texturas, los cuadrados vuelven a ser cuadrados.',
      ],
      code: `tinte = { r: 1, g: 0.4, b: 0.8 }
proporcion = window.innerHeight / window.innerWidth

shape(4, 0.6, 0.01)
  .repeat(6, 6)
  .scale(1, proporcion)
  .color(tinte.r, tinte.g, tinte.b)
  .out()`,
      try: 'Pulsa ▶, luego estrecha la ventana del navegador: los cuadrados se deforman, porque la proporción se calculó una sola vez. Escribe .scale(1, () => window.innerHeight / window.innerWidth) y vuelve a probar.',
    },
    {
      title: 'Todo junto',
      text: [
        'Aquí está todo: los **ajustes** arriba, con nombres, luego las **recetas**, luego la cadena que las usa. Así se organiza una visual larga: cuando la tocas en directo, los números que hay que cambiar los encuentras enseguida, todos en el mismo sitio.',
        'Enhorabuena: ¡ya hablas un poco de JavaScript! Lleva la visual al LAB con **→ EDITOR** y cambia solo las tres primeras líneas.',
      ],
      code: `// ajustes
lados  = 6
tinte = { r: 1, g: 0.4, b: 0.8 }

// recetas
onda  = (velocidad, min, max) =>
  () => min + (max - min) * (0.5 + 0.5 * Math.sin(time * velocidad))
anillo = (cuantas) => shape(lados, 0.3, 0.01).repeat(cuantas, cuantas).rotate(0, 0.1)

// la visual
osc(30, 0.05, 1.2)
  .color(tinte.r, tinte.g, tinte.b)
  .mask(anillo(4))
  .diff(anillo(2).scale(onda(0.5, 0.8, 1.5)))
  .rotate(Math.PI / 8)
  .out()`,
      try: 'Añade un ajuste tuyo, por ejemplo vueltas = 0.1, y úsalo en la receta anillo en lugar del 0.1 de rotate.',
    },
  ],
},

/* ╔══ VISUAL · Visuales generativas ═════════════════════════════════ */
generative: {
  title: 'Visuales generativas',
  desc: 'Deja que el código escriba el código: con un bucle for diez formas se construyen en tres líneas, forEach convierte tu nombre en una visual, y con ? cada repetición hace algo distinto. De la guía «Iteration & generative patches».',
  steps: [
    {
      title: 'Repetir a mano',
      text: [
        '¡Hola! Esta visual cruza cuatro veces las mismas rayas, cada vez un poco más giradas. El resultado es bonito, pero mira el código: las líneas son **casi todas iguales**, solo cambia el número de `rotate`.',
        '¿Y si quisieras diez? ¿O cincuenta? Copiar a mano es aburrido, y basta un error para estropearlo todo. De las tareas repetitivas se encarga el equipo.',
      ],
    },
    {
      title: 'El bucle for',
      text: [
        'El **bucle `for`** repite un trozo de código. `for (let i = 1; i < 10; i++)` se lee así: empieza con `i` igual a 1; mientras `i` sea menor que 10, repite; después de cada vuelta suma 1 a `i` (`i++`). Así que `i` vale 1, 2, 3… hasta 9.',
        'La variable `imagen` hace de **acumulador**: empieza con un `osc`, y en cada vuelta se le añade otro cruce, girado `i * 0.4`. Al final la mandamos a la pantalla.',
        '¿Por qué empezar en 1 y no en 0? Con `i` igual a 0 la rotación sería 0: las rayas cruzadas **consigo mismas**, y el `diff` de una imagen consigo misma es todo negro.',
      ],
      code: `imagen = osc(30, 0.05)

for (let i = 1; i < 10; i++) {
  imagen = imagen.diff(osc(30, 0.05).rotate(i * 0.4))
}

imagen.out()`,
      try: 'Cambia 10 por 4: vuelves a la visual del paso anterior. Luego prueba 20. Cuidado con no pasarte: cada vuelta añade trabajo a la tarjeta gráfica, y a partir de unas cuantas decenas el equipo va más lento.',
    },
    {
      title: 'Dividir el círculo',
      text: [
        'Con un bucle podemos hacer las cuentas como es debido. Las rayas repiten el mismo dibujo tras **media vuelta**, es decir `Math.PI`: si la dividimos en `cuantas` partes iguales, las copias se reparten de forma regular, como los pétalos de una flor.',
        'La variable `cuantas` lo decide todo: el número de vueltas del bucle y el ángulo entre una copia y la siguiente. Las rayas son nítidas (`thresh`, del tutorial Texturas), así las puntas de la estrella se ven bien.',
        'Las copias giran alrededor del centro de la pantalla, que está debajo del panel: `.scroll(-0.3, 0)`, al final, lo desplaza todo hacia la derecha, y el centro de la estrella aparece en la parte descubierta.',
      ],
      code: `cuantas = 6
imagen = osc(15, 0.02).thresh(0.5)

for (let i = 1; i < cuantas; i++) {
  imagen = imagen.diff(osc(15, 0.02).thresh(0.5).rotate(i * Math.PI / cuantas))
}

imagen
  .scroll(-0.3, 0)
  .out()`,
      try: 'Prueba cuantas = 3, cuantas = 5 y cuantas = 12. Luego quita los dos .thresh(0.5): la estrella se vuelve de cristal.',
    },
    {
      title: 'Burbujas por capas',
      text: [
        'Dentro del bucle, `i` puede cambiarlo **todo**: el tamaño, la velocidad, el color. Aquí cada vuelta añade una cuadrícula de burbujas, cada vez más densa, más rápida y de otro color.',
        '`solid()` es una pantalla negra: el acumulador empieza vacío. `.add(…, 0.5)` añade la mitad de la luz de cada capa. Las burbujas grandes y lentas parecen cercanas, las pequeñas y rápidas lejanas: es el **paralaje**, como mirar por la ventanilla del tren.',
      ],
      code: `imagen = solid()

for (let i = 1; i <= 5; i++) {
  imagen = imagen.add(
    shape(100, 0.25, 0.01)
      .repeat(i * 2, i * 2)
      .scrollY(0, 0.02 * i)
      .color(1 / i, 0.4, i / 5),
    0.5
  )
}

imagen.out()`,
      try: 'Pon scrollX en lugar de scrollY. Luego cambia shape(100…) por shape(3…): una lluvia de triángulos.',
    },
    {
      title: 'Una visual a partir de tu nombre: forEach',
      text: [
        'Para el equipo cada letra es un **número**: la c es 99, la i es 105, la a es 97, la o es 111. `charCodeAt(0)` nos lo dice.',
        '`palabra.split(\'\')` divide la palabra en una lista de letras, y `.forEach()` hace algo con **cada una**, como un bucle. Aquí cada letra elige los lados de una forma (con `%`, el resto de la división, que da un número de 3 a 10) y su velocidad de rotación.',
        'Así cada palabra tiene **su** visual, siempre la misma.',
      ],
      code: `palabra = 'ciao'
imagen = solid()

palabra.split('').forEach((letra, i) => {
  const numero = letra.charCodeAt(0)
  imagen = imagen.diff(
    shape(numero % 8 + 3, 0.2 + i * 0.1, 0.01).rotate(numero, 0.02 * (i + 1))
  )
})

imagen
  .repeat(3, 3)
  .out()`,
      try: 'Escribe tu nombre en lugar de ciao. Y el de un amigo: ¿qué visual tiene?',
    },
    {
      title: 'map y reduce: listas de imágenes',
      text: [
        'Dos herramientas para las listas, que se usan a menudo juntas. `.map()` transforma cada elemento en otra cosa: aquí, de una lista de **números** (los lados) a una lista de **imágenes** (las formas que giran).',
        '`.reduce()` hace lo contrario que map: toma toda la lista y la **reduce** a una sola cosa, combinando los elementos de dos en dos. Aquí los cruza todos con `diff`, uno tras otro.',
      ],
      code: `lados = [3, 4, 5, 6]

// map: de números a imágenes
formas = lados.map(n => shape(n, 0.5, 0.01).rotate(0, n * 0.05))

// reduce: de muchas imágenes a una
formas
  .reduce((todas, forma) => todas.diff(forma))
  .repeat(3, 2)
  .out()`,
      try: 'Añade números a la lista: [3, 4, 5, 6, 8, 100]. Luego cambia diff por add, o por blend.',
    },
    {
      title: 'Si… si no: el signo de interrogación',
      text: [
        'Hasta ahora las visuales hacían siempre lo mismo. Con una **condición** pueden decidir. La forma más corta de escribirla es el signo de interrogación: `condición ? si sí : si no`.',
        '`time % 4` es el **resto** de la división entre 4: cuenta los segundos de 0 a 4 y luego vuelve a empezar desde 0, sin fin. Así que `time % 4 < 2` es verdadero durante dos segundos, luego falso durante dos, luego otra vez verdadero: el caleidoscopio pasa de 3 a 8 gajos y vuelta.',
      ],
      try: 'Prueba time % 1 < 0.5: cambia dos veces por segundo. Luego haz que decida también el color: .colorama(() => time % 4 < 2 ? 0 : 0.3).',
    },
    {
      title: 'Condiciones dentro del bucle',
      text: [
        'Condiciones y bucles juntos: cada vuelta puede hacer algo distinto. `i % 2 == 0` quiere decir «i es par» (el resto de la división entre 2 es cero).',
        'Aquí los cuadrados pares giran en el sentido de las agujas del reloj y los impares en sentido contrario: `sentido` vale 1 o -1, y multiplica la velocidad. Y cada cuadrado es más grande y más rápido que el anterior.',
      ],
      code: `imagen = solid()

for (let i = 1; i <= 6; i++) {
  const sentido = i % 2 == 0 ? 1 : -1
  imagen = imagen.diff(
    shape(4, i * 0.15, 0.01).rotate(0, sentido * 0.05 * i)
  )
}

imagen
  .repeat(2, 2)
  .out()`,
      try: 'Haz que la condición decida también la forma: shape(i % 2 == 0 ? 4 : 3, …).',
    },
    {
      title: 'Todo junto',
      text: [
        'Una visual **generativa**: el bucle construye las capas, el azar elige los ingredientes, las condiciones deciden cómo mezclarlos. Ni siquiera quien la ha escrito sabe cómo saldrá: cada vez que pulsas ▶ sale una composición nueva.',
        'Léela con calma: cada capa es un triángulo o unas celdas, al azar; las capas pares **deforman** la imagen, las impares la **cruzan**.',
        '¡Enhorabuena! Pulsa ▶ muchas veces, y cuando salga la buena llévala al LAB con **→ EDITOR**.',
      ],
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
      try: 'Añade una tercera posibilidad: en lugar de Math.random() < 0.5 ? … : … prueba con noise(i, 0.1) cuando i es 3.',
    },
  ],
},

/* ╔══ VISUAL · El tiempo preciso ════════════════════════════════════ */
tempo: {
  title: 'El tiempo preciso',
  desc: 'La función update, que Hydra llama antes de cada fotograma: contadores, eventos a intervalos regulares, el diente de sierra, los pasos al azar, una pelota que rebota y el metrónomo bpm. De la guía «Updating frames & precise timing».',
  steps: [
    {
      title: 'Sesenta veces por segundo: update',
      text: [
        '¡Hola! Una visual es como unos dibujos animados: muchos **fotogramas** quietos, uno tras otro, unos 60 por segundo. Antes de dibujar cada fotograma, Hydra mira si has escrito una función llamada `update`, y si existe la **ejecuta**.',
        'Dentro de `update` puedes cambiar tus variables como quieras, en cada fotograma. Aquí `lados` va de 3 a 8, uno más cada segundo, y luego vuelve a empezar: `Math.floor(time % 6)` cuenta 0, 1, 2, 3, 4, 5, 0, 1…',
        'La forma lee la variable con `() => lados`, así ve el valor nuevo en cada fotograma. **■ STOP** apaga también `update`.',
      ],
      code: `lados = 3

update = () => {
  lados = 3 + Math.floor(time % 6)
}

shape(() => lados, 0.4, 0.01)
  .repeat(4, 3)
  .out()`,
      try: 'Prueba time * 2 % 6: las formas cambian el doble de deprisa.',
    },
    {
      title: 'Contar los fotogramas',
      text: [
        'En `update` también se puede **contar**. `fotogramas++` suma 1 en cada fotograma: después de un segundo vale unos 60, después de un minuto 3600.',
        'Así podemos hacer algo cada cierto número de fotogramas. `if (…)` quiere decir «si»: si `fotogramas` es un múltiplo de 60 (el resto de la división es 0), es decir **una vez por segundo**, elegimos al azar un tono (`tinte`) nuevo.',
      ],
      code: `fotogramas = 0
tinte = 0

update = () => {
  fotogramas++
  if (fotogramas % 60 == 0) tinte = Math.random()
}

osc(20, 0.1, 0.8)
  .kaleid(4)
  .hue(() => tinte)
  .out()`,
      try: 'Prueba % 120 (cada dos segundos) y % 30 (dos veces por segundo). No vayas más rápido: un color que cambia en toda la pantalla más de tres veces por segundo puede hacer sentir mal a quien es sensible a las luces parpadeantes.',
    },
    {
      title: 'Un solo fotograma',
      text: [
        'Con el contador podemos hacer que algo pase **durante un solo fotograma**, una sesentava parte de segundo: demasiado poco para verlo. Pero con el **feedback** del tutorial Mezclar y deformar la imagen se queda, y se transforma.',
        'Aquí una cuadrícula de cuadrados aparece durante un solo fotograma por segundo (`add` con cantidad 1, si no 0). El eco la agranda y la desvanece: cada segundo, una **explosión** de cuadrados que vuela hacia los bordes.',
      ],
      code: `fotogramas = 0
update = () => { fotogramas++ }

src(o0)
  .scale(1.02)                  // el eco se ensancha...
  .color(0.97, 0.97, 0.97)      // ...y se desvanece
  .add(
    shape(4, 0.3, 0.01).repeat(3, 3).color(1, 0.5, 0.8),
    () => fotogramas % 60 == 0 ? 1 : 0
  )
  .out()`,
      try: 'Añade .rotate(0.02) después de .scale(1.02): las explosiones giran. O cambia 60 por 20.',
    },
    {
      title: 'De vez en cuando: time % cada < duración',
      text: [
        'Contar los fotogramas funciona, pero depende del equipo: uno lento hace 30 por segundo, y todo va a media velocidad. `time`, en cambio, son **segundos de verdad**.',
        'La receta de la guía de Hydra es `time % cada < duración`: verdadero durante `duración` segundos, una vez cada `cada` segundos. Aquí, durante medio segundo cada 3 segundos, las celdas se encienden de colores; `encendido` dice si lo están.',
      ],
      code: `encendido = false

update = () => {
  encendido = time % 3 < 0.5
}

voronoi(8, 0.3)
  .colorama(() => encendido ? 0.5 : 0)
  .out()`,
      try: 'Prueba time % 2 < 1: un segundo encendido y un segundo apagado, como el intermitente de un auto.',
    },
    {
      title: 'El diente de sierra',
      text: [
        '`Math.sin(time)` es una onda que sube y baja, suave. A veces hace falta otro movimiento: subir despacio y luego **volver a empezar** de golpe. Se llama **diente de sierra**, porque dibujado tiene justo esa forma.',
        'La receta es `time % duracion / duracion`: sube de 0 a 1 en `duracion` segundos, luego vuelve a 0. Aquí hace inflarse unas burbujas, que estallan y renacen cada 2 segundos.',
      ],
      code: `duracion = 2
fase = 0

update = () => {
  fase = time % duracion / duracion
}

shape(100, () => fase * 0.6, 0.01)
  .repeat(4, 3)
  .color(0.3, 0.8, 1)
  .out()`,
      try: 'Prueba (1 - fase) en lugar de fase: las burbujas nacen grandes y se desinflan. Es el movimiento de un golpe de bombo: fuerte al principio, luego se apaga.',
    },
    {
      title: 'Pasos al azar',
      text: [
        'Aquí tienes una luciérnaga que vuela como le da la gana. En cada fotograma, `update` le hace dar un **pasito al azar**: `Math.random() - 0.5` es un número entre -0.5 y 0.5, es decir, un poco a la izquierda o un poco a la derecha, un poco arriba o un poco abajo.',
        'Un solo paso no se nota, pero sumados uno tras otro dibujan un camino que nunca se sabe adónde va. Se llama **paseo aleatorio**. El eco (`add` con `src(o0)` que se desvanece) le deja una estela detrás.',
        'La luciérnaga sale a la derecha, en la parte descubierta de la pantalla: en `scroll`, los números negativos desplazan hacia la derecha.',
      ],
      try: 'Cambia 0.02 por 0.06: la luciérnaga se pone nerviosa. Si sale de la pantalla, vuelve a aparecer por el otro lado.',
    },
    {
      title: 'La pelota que rebota',
      text: [
        'Cuando las variables **dependen unas de otras**, `update` es el sitio adecuado para mantenerlas juntas. Una pelota tiene una posición (`x`, `y`) y una velocidad (`vx`, `vy`): en cada fotograma la posición cambia según la velocidad, y cuando la pelota toca un borde la velocidad **cambia de signo**, y la pelota vuelve atrás.',
        'Los bordes son los de la parte descubierta de la pantalla, a la derecha del panel.',
      ],
      code: `x = -0.3;  y = 0          // dónde está la pelota
vx = 0.003; vy = 0.007    // cuánto se mueve en cada fotograma

update = () => {
  x += vx
  y += vy
  if (x < -0.45 || x > -0.25) vx = -vx    // bordes derecho e izquierdo
  if (y < -0.45 || y > 0.45) vy = -vy     // bordes de abajo y de arriba
}

shape(100, 0.05, 0.01)
  .color(0.3, 1, 0.8)
  .scroll(() => x, () => y)
  .add(src(o0).brightness(-0.03))
  .out()`,
      try: 'Añade la gravedad: en update, antes de y += vy, escribe vy -= 0.0003. Ahora la pelota cae y rebota en el suelo.',
    },
    {
      title: 'El metrónomo: bpm y speed',
      text: [
        'Hydra tiene dos mandos globales para el tiempo. `speed` es la velocidad de **todo** el tiempo de Hydra: 2 va al doble, 0.5 a la mitad.',
        '`bpm` son los pulsos por minuto, como el metrónomo de la música. Decide lo deprisa que las **listas** pasan de un valor al siguiente: uno en cada pulso. Normalmente es 30; aquí lo ponemos a 120, el tempo de los tutoriales de Strudel, así el caleidoscopio cambia en cada golpe de bombo (a tempo, pero no exactamente a la vez: para eso está el micrófono).',
      ],
      code: `bpm = 120      // un valor de la lista en cada pulso
speed = 1      // la velocidad de todo el tiempo de Hydra

osc(20, 0.1, 0.8)
  .kaleid([3, 4, 6, 8])
  .rotate(0, 0.2)
  .out()`,
      try: 'Prueba speed = 0.25: todo se ralentiza, también la rotación y las rayas. ■ STOP devuelve speed y bpm a sus valores iniciales.',
    },
    {
      title: 'Todo junto',
      text: [
        'Todo a tempo: `update` calcula en qué punto del pulso estamos (`fase`, un diente de sierra que vuelve a empezar en cada pulso) y, en cada pulso nuevo (`ultimoPulso`), elige al azar un tono.',
        'Los cuadrados se inflan al principio de cada pulso y se desinflan hasta el siguiente, como un bombo. Con `bpm = 120` va a tempo con la música de los tutoriales de Strudel.',
        'Enhorabuena: ¡ya sabes usar el reloj de Hydra fotograma a fotograma! Llévala al LAB con **→ EDITOR**.',
      ],
      code: `bpm = 120
ultimoPulso = 0
fase = 0
tinte = 0

update = () => {
  const pulsos = time * bpm / 60        // cuántos pulsos han pasado
  fase = pulsos % 1                     // de 0 a 1 en cada pulso
  if (Math.floor(pulsos) != ultimoPulso) {  // ¿ha empezado un pulso nuevo?
    ultimoPulso = Math.floor(pulsos)
    tinte = Math.random()
  }
}

shape(4, () => 0.2 + (1 - fase) * 0.3, 0.01)
  .repeat(4, 3)
  .diff(osc(20, 0.1, 1).hue(() => tinte))
  .out()`,
      try: 'Prueba bpm = 60 y bpm = 170, el tempo del drum and bass.',
    },
  ],
},

/* ╔══ VISUAL · Clic y teclado ═══════════════════════════════════════ */
interazione: {
  title: 'Clic y teclado',
  desc: 'La visual se toca con las manos: el mouse, los clics y las teclas se convierten en mandos. Los escuchadores de eventos de JavaScript, desde el primer interruptor hasta una visual para tocar con el teclado. De la guía «Using clicks & keyboard presses».',
  steps: [
    {
      title: 'El mouse: mouse.x y mouse.y',
      text: [
        '¡Hola! En este tutorial la visual reacciona a **ti**. Empecemos por el mouse: `mouse.x` y `mouse.y` dicen dónde está el puntero, en píxeles, desde la izquierda y desde arriba.',
        'Dividido por la anchura de la ventana, `mouse.x / innerWidth` se convierte en un número de 0 (todo a la izquierda) a 1 (todo a la derecha). Aquí decide cuántas rayas hay; y `mouse.y` decide el color.',
        'Pulsa ▶ y **mueve el mouse sobre la visual**, a la derecha.',
      ],
      try: 'Usa el mouse también para girar: añade .rotate(() => mouse.y / innerHeight * 3).',
    },
    {
      title: 'Un interruptor: el clic',
      text: [
        'Cada vez que pasa algo (un clic, una tecla, la ventana que cambia de tamaño), el navegador envía un **evento**. Si escribes una función con el nombre adecuado, el navegador la llama cuando llega el evento: es un **escuchador**.',
        '`onpointerup` escucha cuando **sueltas** el botón del mouse (o el dedo, en una tableta). Aquí cada clic invierte `encendido`: `!` quiere decir «lo contrario», así que verdadero se vuelve falso y falso se vuelve verdadero. Es un **interruptor**.',
        'El clic cuenta en cualquier punto de la página, también sobre el texto del tutorial: haz clic sobre la visual, a la derecha. **■ STOP** apaga también los escuchadores.',
      ],
      code: `encendido = false
onpointerup = () => { encendido = !encendido }

osc(20, 0.1, () => encendido ? 1 : 0)
  .kaleid(() => encendido ? 6 : 2)
  .out()`,
      try: 'Haz que se invierta también el sentido de rotación: .rotate(0, () => encendido ? 0.2 : -0.2).',
    },
    {
      title: 'Mientras mantienes pulsado',
      text: [
        'Dos escuchadores juntos: `onpointerdown` cuando **pulsas**, `onpointerup` cuando **sueltas**. Así la visual sabe si el botón está pulsado (`pulsado`) en este momento.',
        'Mantén pulsado sobre la visual: la imagen se derrite. Suelta: vuelve a su sitio.',
      ],
      code: `pulsado = false
onpointerdown = () => { pulsado = true }
onpointerup = () => { pulsado = false }

osc(20, 0.1, 0.8)
  .modulate(noise(3, 0.2), () => pulsado ? 0.5 : 0)
  .out()`,
      try: 'En lugar de modulate, prueba .pixelate(() => pulsado ? 20 : 2000, () => pulsado ? 20 : 2000).',
    },
    {
      title: 'Contar los clics',
      text: [
        '`clic++` suma 1 en cada clic. Con `%`, el resto de la división, el número de lados va de 3 a 10 y luego vuelve a empezar: `clic % 8` va de 0 a 7, más 3 da de 3 a 10.',
        'Cuidado con `() =>`: sin él, Hydra leería `clic` **una sola vez**, cuando pulsas ▶, y luego ya no se enteraría de nada. Es el error más común con los eventos.',
      ],
      try: 'Quita el () => delante de clic % 8 + 3, pulsa ▶ y haz clic: no cambia nada. Vuelve a ponerlo.',
    },
    {
      title: 'Un mando para girar',
      text: [
        'Una idea de la guía de Hydra: mientras mantienes pulsado, un número **crece**. Cuando sueltas, se queda donde está. Es como girar un mando: cuanto más tiempo mantienes pulsado, más giras.',
        '`angulo += pulsado ? 0.02 : 0` quiere decir: suma 0.02 al ángulo (`angulo`) si está pulsado, si no nada. Como está dentro de `() =>`, pasa en cada fotograma.',
      ],
      code: `pulsado = false
onpointerdown = () => { pulsado = true }
onpointerup = () => { pulsado = false }
angulo = 0

osc(15, 0.1, 1)
  .kaleid(5)
  .rotate(() => angulo += pulsado ? 0.02 : 0)
  .out()`,
      try: 'Haz que el mando vuelva solo a cero cuando sueltas: angulo = pulsado ? angulo + 0.02 : angulo * 0.95.',
    },
    {
      title: 'Un clic, una visual nueva',
      text: [
        'Un escuchador puede hacer **cualquier cosa**, incluso construir una visual entera. Aquí la receta `nueva` inventa una visual al azar y la manda a la pantalla; la llamamos enseguida una vez, luego se la damos a `onpointerup`, así cada clic hace otra.',
        'Fíjate: `onpointerup = nueva`, **sin** paréntesis. Con paréntesis, `nueva()`, la receta se ejecutaría enseguida; sin ellos, se la entregamos al navegador para que la ejecute él, en el momento adecuado.',
      ],
      code: `nueva = () => {
  osc(Math.random() * 40, 0.1, Math.random() * 2)
    .kaleid(Math.floor(Math.random() * 6) + 2)
    .rotate(Math.random() * Math.PI, 0.1)
    .out()
}

nueva()
onpointerup = nueva`,
      try: 'Añade a la receta .modulate(noise(Math.random() * 5, 0.1), Math.random() * 0.3).',
    },
    {
      title: 'Las flechas',
      text: [
        'Ahora el teclado. `onkeydown` escucha cuando **pulsas una tecla**, y recibe un `evento` que dice cuál: `evento.key` es el nombre de la tecla, por ejemplo `\'ArrowLeft\'`, la flecha izquierda.',
        'El centro del caleidoscopio está debajo del panel: llévalo con las flechas a la parte descubierta. **Primero haz clic sobre la visual**, luego usa las flechas: si el cursor sigue en el recuadro del código, las flechas también lo mueven a él.',
        'Los signos parecen al revés (flecha derecha, `x` disminuye) porque `scroll` desplaza la imagen hacia la izquierda cuando el número crece.',
      ],
      try: 'Haz que el caleidoscopio haga zoom con las teclas + y -: escala = 1, luego if (evento.key === \'+\') escala *= 1.1, y .scale(() => escala) antes de .scroll.',
    },
    {
      title: 'Cada tecla, una forma',
      text: [
        'Cada tecla tiene también un **número**: `evento.keyCode`. La A es 65, la B 66, la barra espaciadora 32. Aquí la última tecla (`tecla`) pulsada elige los lados de las formas y su color.',
        'Haz clic sobre la visual y escribe una palabra: cada letra es una forma. (¡Si escribes en el recuadro del código, la visual te escucha igualmente!)',
      ],
      code: `tecla = 65
onkeydown = (evento) => { tecla = evento.keyCode }

shape(() => tecla % 8 + 3, 0.4, 0.01)
  .repeat(4, 3)
  .color(() => tecla % 3 / 2, 0.5, () => tecla % 5 / 4)
  .out()`,
      try: 'Haz que la tecla decida también la velocidad: .rotate(0, () => (tecla % 10) / 20).',
    },
    {
      title: 'Todo junto: una visual para tocar',
      text: [
        'Aquí tienes un **instrumento**. Un objeto, `formas`, dice qué tecla hace qué forma: A, S, D, F y G están en la misma fila del teclado, como las teclas de un piano. La E enciende y apaga el eco (`eco`), y el mouse, de izquierda a derecha, cambia el color.',
        '`formas[evento.key]` abre el cajón con el nombre de la tecla: si el cajón existe, esa es la forma nueva. Una tecla que no está (una Z) no hace nada.',
        '¡Haz clic sobre la visual y toca! Con una música de Strudel debajo, intenta ir a tempo. Enhorabuena: has construido un instrumento visual.',
      ],
      code: `// A S D F G: las formas · E: el eco · el mouse: el color
formas = { a: 3, s: 4, d: 5, f: 6, g: 100 }
lados = 4
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
      try: 'Añade al cajón otras formas: h: 8, j: 12. Luego una tecla que haga girar al revés.',
    },
  ],
},

/* ╔══ JUNTOS · El sonido bajo la lupa ═══════════════════════════════ */
lente: {
  title: 'El sonido bajo la lupa',
  desc: 'Las herramientas del micrófono: ver lo que oye, dividir el sonido en más bandas, calmar el parpadeo, ajustar la sensibilidad y contar los golpes de bombo. De la guía «Audio-reactivity explained».',
  steps: [
    {
      title: 'La música',
      text: [
        '¡Hola! Este tutorial continúa **Visuales que escuchan**: allí viste `a.fft`, aquí aprendemos a ajustarlo.',
        'Primero la música: bombo, caja, platillos y un bajo, así todas las bandas, de los graves a los agudos, tienen algo que oír. Pulsa ▶ y déjala sonar, con los **altavoces encendidos** (con auriculares el micrófono no oye nada).',
      ],
    },
    {
      title: 'Ver lo que oye: a.show()',
      text: [
        '`a.show()` muestra, abajo a la derecha, las **barras** del micrófono: una por banda, de los graves a la izquierda a los agudos a la derecha. Cuanto más alta es una barra, más sonido hay en esa banda.',
        'Mira las barras mientras suena la música: la primera salta con el bombo, la última vibra con los platillos. Estos son los números que acaban en `a.fft[0]`, `a.fft[1]`… y que aquí colorean las rayas.',
      ],
      try: 'Da palmas cerca del equipo: ¿qué barra salta más?',
    },
    {
      title: 'Más bandas: a.setBins',
      text: [
        'Normalmente las bandas son 4. `a.setBins(8)` divide el sonido en **8** bandas, más estrechas: ahora puedes distinguir mejor el bajo del bombo, o la caja de los platillos. `a.fft` se convierte en una lista de 8 números, de `a.fft[0]` a `a.fft[7]`.',
        'Y con 8 bandas podemos construir un **ecualizador**, con el bucle `for` de Visuales generativas: una columna por banda, tan alta como su volumen. Las columnas (`barras`) están en la parte descubierta, a la derecha.',
      ],
      code: `a.setBins(8)
a.show()

barras = solid()
for (let i = 0; i < 8; i++) {
  barras = barras.add(
    shape(4, 1, 0.001)
      .scale(1, 0.02, () => 0.01 + a.fft[i])   // estrecha, y tan alta como la banda i
      .scrollX(-0.25 - i * 0.03)          // su columna
      .color(1 - i / 8, 0.4, i / 8)
  )
}
barras.out()`,
      try: 'Prueba a.setBins(16), con 16 columnas: en el bucle cambia 8 por 16 y 0.03 por 0.015.',
    },
    {
      title: 'Menos nerviosa: a.setSmooth',
      text: [
        'Los números del micrófono saltan sin parar, y la visual **tiembla**. `a.setSmooth()` los suaviza: va de 0 (ninguna calma, cada fotograma por su cuenta) a casi 1 (lentísimo, la visual solo sigue los cambios grandes).',
        'Aquí los círculos siguen los graves con mucha calma (0.9). Cambia el número y mira cómo cambia el carácter de la visual.',
      ],
      try: 'Prueba a.setSmooth(0): los círculos dan un salto con cada golpe. Y a.setSmooth(0.98): respiran despacio, como si durmieran.',
    },
    {
      title: 'La sensibilidad: setCutoff y setScale',
      text: [
        'Cada sala es distinta: en una está el ruido del aire acondicionado, en otra la música está baja. Dos ajustes lo arreglan.',
        '`a.setCutoff()` es el **suelo**: todo el sonido por debajo de ese nivel cuenta como cero. Súbelo si la visual se mueve incluso cuando nadie toca. `a.setScale()` decide dónde está el **techo**: cuánto sonido hace falta, por encima del suelo, para llegar a 1. Bájalo si la música suena flojo y la visual se mueve poco.',
        'En `a.show()`, encima de cada barra, hay dos **líneas finas**: la de abajo es el suelo, la de arriba el techo. Las barras muestran el sonido tal como es, y no cambian; cambian las líneas. Ajusta hasta que, con la música, las barras suban y bajen **entre las dos líneas**.',
      ],
      code: `a.setCutoff(4)    // el suelo: por debajo, cero
a.setScale(6)     // el techo: cuánto hace falta para llegar a 1
a.show()

voronoi(8, 0.3)
  .modulateScale(osc(10, 0.1), () => a.fft[1] * 2)
  .colorama(() => a.fft[2] * 0.5)
  .out()`,
      try: 'Apaga la música (■ STOP en el primer recuadro) y sube el cutoff hasta que la visual se quede quieta. Luego vuelve a encenderla: ahora solo se mueve con la música.',
    },
    {
      title: 'Contar los golpes',
      text: [
        'El `update` del tutorial El tiempo preciso y el micrófono juntos: un **detector de golpes**. Cuando los graves superan el umbral (0.6) y justo antes estaban por debajo, ha llegado un golpe de bombo: `golpes++`.',
        '`encima` recuerda cómo estaba el fotograma anterior. Sin él, un golpe que dura diez fotogramas se contaría diez veces.',
        'Cada golpe cambia la forma y la hace girar un paso: la visual va **a tempo**, a saltos, como una coreografía.',
      ],
      code: `a.setSmooth(0.5)
golpes = 0
encima = false

update = () => {
  if (a.fft[0] > 0.6 && !encima) golpes++
  encima = a.fft[0] > 0.6
}

shape(() => golpes % 5 + 3, 0.4, 0.01)
  .repeat(4, 3)
  .rotate(() => golpes * 0.3)
  .out()`,
      try: 'Si los golpes no se cuentan, baja 0.6 (las dos veces). Hydra también tiene su propio detector: a.onBeat = () => { golpes++ } en lugar de update, pero es menos fácil de ajustar.',
    },
    {
      title: 'Todo junto',
      text: [
        'Todo junto: seis bandas, un poco de calma, y cada banda con su tarea. Los graves inflan los círculos, los golpes cambian el tono, los medios deforman, los agudos encienden el eco.',
        '¡Enhorabuena! Ya sabes ajustar los oídos de tus visuales. Con **+ TIMELINE** pon la música y la visual en sus pistas, y antes del espectáculo ajusta cutoff y scale en la sala de verdad.',
      ],
      code: `a.setBins(6)
a.setSmooth(0.7)
golpes = 0
encima = false

update = () => {
  if (a.fft[0] > 0.6 && !encima) golpes++
  encima = a.fft[0] > 0.6
}

shape(100, () => 0.15 + a.fft[0] * 0.3, 0.02)
  .repeat(4, 3)
  .color(1, 0.4, 0.7)
  .hue(() => golpes * 0.1)
  .modulate(noise(3, 0.1), () => a.fft[2] * 0.3)
  .add(src(o0).scale(1.01).brightness(-0.04), () => a.fft[5] * 2)
  .out()`,
    },
  ],
},

} });
