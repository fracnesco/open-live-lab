/* Español · los tutoriales de Hydra y «Visuales que escuchan» (traduce js/tutorials/visuale.js).
   Los pasos se emparejan por posición; el código se repite solo donde el italiano tiene comentarios. */

I18N.content('es', 'tutorials', { items: {

  /* ── VISUAL · Primeros pasos ─────────────────────────────────────── */
  'primi-passi': {
    title: 'Primeros pasos',
    desc: 'De la primera línea de código a una visual que se mueve: las fuentes, las transformaciones en cadena, los colores, los comentarios, el tiempo.',
    steps: [
      {
        title: 'La primera línea',
        text: [
          '¡Hola! Aquí no se toca música: se **pinta con código**. El motor de las visuales se llama **Hydra**, y está construido como un sintetizador. Solo que, en lugar de ondas sonoras, genera ondas de luz y color.',
          'Pulsa **▶ EJECUTAR** aquí abajo, o Cmd+Enter dentro del recuadro. La visual aparece **en el fondo**, en la parte de la pantalla a la derecha del tutorial.',
          '`osc()` es un **oscilador**: dibuja franjas que se desplazan. `.out()` manda la imagen a la pantalla. Sin `.out()` el código se ejecuta pero no se ve nada: es el olvido más común.',
        ],
        try: 'Pulsa ■ STOP para volver al negro y luego inténtalo de nuevo. Puedes cambiar el código todo lo que quieras: con ↺ ORIGINAL siempre vuelves al punto de partida.',
      },
      {
        title: 'Los tres números de osc',
        text: [
          'Entre los paréntesis de `osc()` se pueden escribir **tres números**, separados por comas. Si no los escribes, Hydra usa los suyos.',
          'El primero es la **frecuencia**: cuántas franjas hay. El segundo es la **velocidad** a la que se desplazan. El tercero es el **color**: en 0 las franjas son grises; al subirlo, el rojo, el verde y el azul se separan y aparece el arcoíris.',
        ],
        try: 'Prueba osc(5, 0.1, 0.8) y osc(80, 0.1, 0.8). Luego pon la velocidad en 0: la imagen se detiene. ¿Y con -0.1?',
      },
      {
        title: 'Girar: rotate',
        text: [
          'Ahora transformemos la imagen. Como en Strudel, las **funciones** se enganchan con un punto: `.rotate()` hace girar todo lo que viene antes.',
          'El ángulo se mide en **radianes**: 3.14 (pi) es media vuelta, 0.8 es más o menos un octavo de vuelta. Las franjas verticales se vuelven oblicuas.',
          'Escribimos una función por línea: es el mismo código, solo que más fácil de leer. `.out()` siempre queda al final: primero se construye la imagen y luego se manda a la pantalla.',
        ],
        try: 'Prueba rotate(1.57): un cuarto de vuelta, y las franjas se vuelven horizontales.',
      },
      {
        title: 'Cuadraditos: pixelate',
        text: [
          '`.pixelate(20, 30)` reduce la imagen a una cuadrícula de **cuadraditos**: 20 en horizontal y 30 en vertical, como en un videojuego antiguo.',
          'Fíjate en que los cuadraditos están derechos aunque las franjas sean oblicuas: `pixelate` trabaja sobre la imagen que le llega, es decir, la que **ya está girada**.',
        ],
        try: 'Prueba números pequeños, pixelate(4, 4), y números grandes, pixelate(200, 200).',
      },
      {
        title: 'El caleidoscopio: kaleid',
        text: [
          '`.kaleid(4)` pliega la imagen como un **caleidoscopio**: la divide en gajos alrededor del centro y los refleja. El número dice cuántos gajos.',
          'Mira los cuadraditos: el caleidoscopio los ha plegado junto con todo lo demás, y también se han convertido en gajos.',
        ],
        try: 'Prueba kaleid(3), kaleid(6), kaleid(50). Con muchos gajos salen círculos.',
      },
      {
        title: 'El orden importa',
        text: [
          'Las funciones trabajan **una después de otra**, de arriba abajo: cada una transforma el resultado de la de arriba. Por eso el orden cambia el resultado.',
          'Aquí están las mismas funciones del paso anterior, pero `kaleid` va **antes** de `pixelate`. Ahora el caleidoscopio se forma primero, y los cuadraditos vuelven a ser una cuadrícula derecha, encima de todo.',
        ],
        try: 'Mueve la línea .rotate(0.8) al final, justo antes de .out(): ahora gira todo el caleidoscopio, cuadraditos incluidos.',
      },
      {
        title: 'Como un sintetizador modular',
        text: [
          'Hydra se inspira en los **sintetizadores modulares**: muchos módulos conectados por cables, donde la señal pasa de uno a otro. Aquí los cables son los puntos.',
          'Cada cadena tiene la misma forma: una **fuente** que crea la imagen (como `osc`), luego las funciones de **geometría**, que deciden dónde están las cosas (`rotate`, `pixelate`, `kaleid`…), luego las de **color**, y al final `.out()`.',
          'Aquí está la primera función de color: `.color(1, 0.4, 0.8)` ajusta el **rojo, el verde y el azul**. 1 deja el canal como está, 0 lo apaga del todo: quitando bastante verde, todo vira al violeta.',
        ],
        try: 'Prueba color(0, 1, 1): sin el rojo queda un mundo celeste y verde.',
      },
      {
        title: 'Otras fuentes: shape',
        text: [
          '`osc` no es la única fuente. `shape()` dibuja un **polígono**: el primer número es cuántos lados, el segundo qué tan grande es, el tercero qué tan **difuminado** está el borde.',
          'Aquí, un triángulo (3 lados), de tamaño 0.5, con el borde nítido. Las formas pasan por las mismas funciones de antes: `.repeat(3, 3)` lo repite en una cuadrícula de 3 por 3.',
          '¿Por qué repetirlo? Una forma nace en el **centro** de la pantalla, que aquí queda debajo del panel del tutorial. En una cuadrícula, en cambio, las copias llegan hasta la parte descubierta, a la derecha.',
        ],
        try: 'Prueba shape(4) para un cuadrado y shape(100) para un círculo. Luego sube el tercer número a 0.3: el borde se convierte en una nube.',
      },
      {
        title: 'Nubes: noise',
        text: [
          '`noise()` genera un **ruido** suave que se mueve, como humo o nubes. El primer número es el **grano**: cuanto más alto, más pequeñas son las manchas. El segundo es la velocidad.',
          'El ruido es gris, así que lo coloreamos con `.color()`: un humo azul.',
        ],
        try: 'Prueba noise(30, 0.1): el grano se vuelve tan fino como la nieve de un televisor antiguo. O gradient(1), un degradado de colores que cambia con el tiempo.',
      },
      {
        title: 'Celdas y colores: voronoi y colorama',
        text: [
          '`voronoi()` divide la pantalla en **celdas** que se mueven, como la piel de una jirafa o las pompas de jabón. El primer número es cuántas celdas, el segundo la velocidad.',
          '`.colorama()` **hace rotar todos los colores** de la imagen: hasta un número pequeño convierte el gris en un arcoíris psicodélico.',
        ],
        try: 'Añade .invert() antes de .out(): el negativo, como en las películas fotográficas antiguas. Luego prueba .posterize(3), que reduce los colores a unos pocos, como en un cartel.',
      },
      {
        title: 'Comentarios y errores',
        text: [
          'Como en el sonido, dos barras `//` convierten una línea en un **comentario**: Hydra la salta. Sirven para escribir notas para ti, o para **apagar** una función sin borrarla. Aquí `.pixelate()` está apagado: quita las `//` y vuelve a ejecutar.',
          '¿Y si te equivocas en algo? Debajo del recuadro aparece un mensaje con la **✕** y la pantalla se queda en negro hasta que lo corrijas. Los errores más comunes: un paréntesis olvidado, un punto que falta, un nombre mal escrito (`rotat` en lugar de `rotate`). No te preocupes, le pasa a todo el mundo.',
        ],
        code: `// una visual con comentarios
osc(30, 0.1, 1.2)
  .kaleid(5)
  // .pixelate(16, 16)
  .color(0.9, 0.5, 1)
  .out()`,
        try: 'Borra a propósito un paréntesis y pulsa ▶: lee el mensaje de error y luego vuelve a dejarlo todo como estaba con ↺ ORIGINAL.',
      },
      {
        title: 'Girar sin parar',
        text: [
          'Hasta ahora las imágenes se desplazaban, pero se quedaban quietas en su sitio. Muchas funciones de geometría tienen un número más para la **velocidad**: `.rotate(0, 0.1)` parte del ángulo 0 y **gira** sin parar, despacio.',
        ],
        try: 'Prueba rotate(0, -0.5): más rápido, y al revés. También .scrollX(0, 0.1) tiene una velocidad: desplaza la imagen de lado.',
      },
      {
        title: 'El tiempo: () => time',
        text: [
          'Para hacer que se mueva **cualquier** número hay un truco: en lugar del número se escribe una pequeña función, `() => …`, que Hydra recalcula en cada fotograma, unas 60 veces por segundo.',
          '`time` son los **segundos** pasados desde el inicio. `Math.sin(time)` es una onda que sube y baja entre -1 y 1, como `sine` en Strudel. Aquí la usamos para hacer **respirar** el caleidoscopio: `.scale()` agranda y achica la imagen, entre 0.7 y 1.3.',
        ],
        try: 'Prueba Math.sin(time * 3): la respiración se vuelve agitada. También puedes poner una función dentro de osc: osc(() => 10 + Math.sin(time) * 5, 0.1, 0.8).',
      },
      {
        title: 'Secuencias: una lista de valores',
        text: [
          'Otra forma de hacer que un número cambie: una **lista** entre corchetes. Con `[3, 4, 6, 8]` kaleid toma un valor cada cierto tiempo, uno tras otro y luego desde el principio, como los `< >` en la mini-notación de Strudel.',
          '`.fast(2)` recorre la lista el doble de rápido. Atención: aquí los corchetes no dividen el tiempo como en Strudel, son solo una lista de números.',
        ],
        try: 'Añade .smooth() después de .fast(2): en lugar de saltar, los valores se deslizan uno en otro.',
      },
      {
        title: 'Todo junto',
        text: [
          'Aquí tienes una visual con todo lo que has aprendido: una fuente, la geometría, el color y el movimiento. Léela de arriba abajo, una línea a la vez.',
          '¡Felicidades: has construido tu primera visual! Pulsa **→ EDITOR** para llevarla al LAB y seguir modificándola, o **+ TIMELINE** para usarla en tu performance.',
        ],
        try: 'Pon // delante de una línea a la vez y mira qué cambia. Luego inventa una combinación tuya.',
      },
    ],
  },

  /* ── VISUAL · Mezclar y deformar ─────────────────────────────────── */
  mescolare: {
    title: 'Mezclar y deformar',
    desc: 'Varias imágenes juntas: las cuatro salidas de Hydra, las formas de fundirlas (blend, diff, mask), la modulación que deforma una imagen con otra y el feedback, el eco visual.',
    steps: [
      {
        title: 'Cuatro pantallas',
        text: [
          '¡Hola de nuevo! Hasta ahora siempre hemos escrito `.out()`. En realidad Hydra tiene **cuatro salidas**, como cuatro pantallas: se llaman `o0`, `o1`, `o2` y `o3`. `.out()` sin nada entre los paréntesis quiere decir `.out(o0)`.',
          'Aquí mandamos cuatro imágenes distintas a las cuatro salidas, y `render()` las muestra **todas juntas**: `o0` arriba a la izquierda, `o1` arriba a la derecha, `o2` abajo a la izquierda, `o3` abajo a la derecha.',
          'El panel del tutorial cubre la parte izquierda de la pantalla, así que `o0` y `o2` quedan en gran parte debajo: se ven bien `o1` y `o3`.',
        ],
        try: 'Sustituye render() por render(o2): la pantalla muestra solo la tercera salida, el ruido.',
      },
      {
        title: 'Leer una salida: src',
        text: [
          'Normalmente no se miran las cuatro: `render(o0)` muestra **solo** `o0`. Las otras siguen trabajando, como las pistas de una mesa de mezclas con el volumen bajado, listas para usarse.',
          '¿Y cómo se usan? `src()` **lee** una salida y la convierte en una fuente, como `osc` o `shape`. Aquí en `o1` hay un cuadrado que gira, y `o0` lo lee y lo repite en una cuadrícula.',
        ],
        try: 'Cambia la primera línea: en lugar de la forma, manda a o1 un osc(20, 0.1, 0.8). La cuadrícula de o0 cambia sola.',
      },
      {
        title: 'Mezclar: blend',
        text: [
          'Ahora viene lo bueno: **fundir** dos imágenes. `.blend()` mezcla la imagen de la cadena con la que está entre paréntesis, como un **fundido cruzado** entre dos cámaras. Dentro de los paréntesis basta con escribir el nombre de la salida.',
          'El segundo número dice cuánto: 0 es toda la primera imagen, 1 toda la segunda, 0.5 mitad y mitad.',
        ],
        try: 'Prueba 0.2 y 0.8. Luego cambia render(o0) por render(): ves juntas las dos imágenes de partida y el resultado.',
      },
      {
        title: 'Una cadena dentro de otra',
        text: [
          'Las salidas son prácticas cuando una imagen se usa varias veces. Pero entre los paréntesis también puedes escribir **directamente** otra cadena, con sus funciones.',
          'El resultado es el mismo del paso anterior, en una sola cadena. Cuidado con los paréntesis: el de `shape(…)` se cierra enseguida, antes de `.repeat`, y el de `blend(…)` solo al final, después del 0.5.',
        ],
        try: 'Dentro de blend pon noise(3, 0.1) en lugar de la forma.',
      },
      {
        title: 'Diferencia: diff',
        text: [
          '`.blend()` no es la única forma de mezclar. `.diff()` calcula la **diferencia** entre las dos imágenes: donde son iguales se vuelve negro, donde son distintas se enciende.',
          'Aquí dos cuadrados giran en sentidos opuestos, un poco como el movimiento contrario del tutorial Contrapunto: donde se superponen se apagan, y nacen estrellas y encajes siempre nuevos.',
        ],
        try: 'Sustituye diff por add, que suma las luces, y luego por mult, que las multiplica: queda encendido solo donde las dos imágenes son claras.',
      },
      {
        title: 'Recortar: mask',
        text: [
          '`.mask()` usa la segunda imagen como un **molde**: donde es clara se ve la primera, donde es oscura queda negro. Es como mirar las franjas de colores a través de los agujeros hexagonales de un panal.',
        ],
        try: 'Usa voronoi(8, 0.3) como molde: las franjas se ven solo dentro de las partes claras de las celdas.',
      },
      {
        title: 'Modular: deformar con otra imagen',
        text: [
          'Y aquí está la función más famosa de Hydra: `.modulate()`. No mezcla los colores: usa la luz de la segunda imagen para **mover los píxeles** de la primera. El resultado parece líquido, como mirar a través del agua.',
          'El nombre viene de los sintetizadores: la **modulación** es cuando un oscilador hace ondular a otro. El segundo número dice cuánto: 0 no hace nada, cuanto más sube, más se deforma la imagen.',
        ],
        try: 'Prueba 0.05 y 1. Luego, en lugar del ruido, usa una forma: modulate(shape(4, 0.5), 0.3).',
      },
      {
        title: 'Modular la geometría',
        text: [
          'Muchas funciones de geometría tienen una versión «modulada». `.modulateRotate()` hace girar **cada zona** de la imagen un ángulo distinto, según lo clara que sea la segunda imagen en ese punto.',
          'Del mismo modo, `.modulateScale()` agranda cada zona de forma distinta, y `.modulateKaleid()` la pliega en caleidoscopio.',
        ],
        try: 'Sustituye modulateRotate por modulateScale, luego prueba modulateKaleid(voronoi(5, 0.3), 4).',
      },
      {
        title: 'El feedback: un eco visual',
        text: [
          '¿Y si una salida se leyera **a sí misma**? `src(o0)` dentro de la cadena que termina en `o0` toma la imagen del fotograma anterior y la mezcla con la nueva. El resultado es un **eco visual**: todo deja una huella.',
          'Es un poco como la reverb del tutorial Paisaje sonoro ambient, donde el sonido continúa después de que la fuente se ha detenido. Aquí `.scale(1.02)` agranda el eco en cada fotograma, y `diff` lo cruza con el cuadrado nuevo: las copias se expanden hacia los bordes como ondas en un estanque, hasta llenar la pantalla.',
        ],
        try: 'Añade .rotate(0.02) justo después de .scale(1.02): el túnel gira. Luego cambia 1.02 por 0.98: las ondas van hacia el centro.',
      },
      {
        title: 'Todo junto',
        text: [
          'Mezclar y modular se pueden encadenar todo lo que quieras: cada función añade un ingrediente. Aquí un oscilador es deformado por el ruido, cruzado con un triángulo en caleidoscopio y dejado deslizarse en el feedback.',
          '¡Felicidades! Lleva la visual al LAB con **→ EDITOR** y cambia un ingrediente a la vez, o ponla en la timeline con **+ TIMELINE**.',
        ],
        try: 'Sustituye diff por mask, o noise por voronoi. Cada cambio transforma el carácter de toda la visual.',
      },
    ],
  },

  /* ── VISUAL · La webcam ──────────────────────────────────────────── */
  webcam: {
    title: 'La webcam',
    desc: 'Tu imagen como fuente: la webcam pasa por todas las funciones que conoces, de los cuadraditos al pop art, hasta un ejemplo avanzado con cuatro salidas y una estela que cambia de color.',
    steps: [
      {
        title: 'Encender la webcam',
        text: [
          '¡Hola! Además de `osc`, `shape` y `noise`, Hydra puede usar imágenes que vienen **de fuera**: la webcam, una pantalla compartida, un video. Para ellas están las fuentes externas `s0`, `s1`, `s2` y `s3`.',
          '`s0.initCam()` enciende la webcam dentro de `s0`, y `src(s0)` la lleva a la cadena, igual que `src(o1)` hacía con las salidas.',
          'La primera vez el **navegador te pide permiso**: pulsa Permitir. Las imágenes se quedan en este equipo, no se graban ni se envían a nadie. Si no tienes webcam, o has negado el permiso, la pantalla se queda en negro.',
        ],
        try: 'Si el equipo tiene más de una webcam, s0.initCam(1) usa la segunda.',
      },
      {
        title: 'Transformar la webcam',
        text: [
          'De aquí en adelante la webcam es una fuente como las demás: todas las funciones que has aprendido valen también para ella.',
          'Aquí la reducimos a cuadraditos con `.pixelate(40, 30)`: 40 en horizontal y 30 en vertical. Muévete delante de la cámara: ¡te has convertido en un personaje de videojuego!',
        ],
        try: 'Prueba pixelate(10, 8): pocos cuadraditos enormes, y apenas te reconoces. Luego pixelate(160, 120), casi nítido, y pixelate(80, 4), que te convierte en franjas.',
      },
      {
        title: 'Blanco y negro: thresh',
        text: [
          '`.thresh()` es un **umbral**: lo que es más claro que cierto valor se vuelve blanco, el resto negro. La cara se convierte en un dibujo a tinta, como una fotocopia.',
          'El número va de 0 a 1: cuanto más bajo, más blanco hay. Depende mucho de la luz de la habitación, así que prueba a ajustarlo.',
        ],
        try: 'Añade .color(1, 0.2, 0.4) después de thresh: el blanco se vuelve del color que quieras.',
      },
      {
        title: 'Pop art',
        text: [
          'En los años 60 **Andy Warhol** imprimía la misma foto varias veces, cada una con colores planos y distintos. Probemos nosotros también.',
          '`.saturate(3)` hace los colores más vivos, `.posterize(3)` los reduce a pocos niveles, como en un cartel, y `.repeat(2, 2)` hace cuatro copias.',
          'La última línea parece complicada, pero léela por partes: `gradient(1)` es un degradado de colores que cambia con el tiempo, y `.pixelate(2, 2)` lo reduce a **cuatro bloques** de color plano, uno por copia. `diff` los combina con la webcam: cada copia tiene sus propios colores.',
        ],
        try: 'Prueba repeat(3, 3) y pixelate(3, 3): nueve copias, nueve colores.',
      },
      {
        title: 'La webcam que se derrite',
        text: [
          'También la webcam se puede deformar con `.modulate()`. Aquí el ruido la hace ondular como un reflejo en el agua.',
        ],
        try: 'Ahora al revés: deja la primera línea y escribe osc(20, 0.1, 0.8).modulate(src(s0), 0.3).out(). Es la webcam la que deforma las franjas: al moverte, las desplazas.',
      },
      {
        title: 'La estela',
        text: [
          'El feedback del tutorial anterior funciona de maravilla con la webcam. Aquí el eco se mezcla con `blend` en lugar de con `diff`: se desvanece poco a poco, y cada movimiento deja una **estela**, como una foto de larga exposición.',
          'Mueve despacio una mano delante de la cámara. Cuanto más cerca de 1 esté el número de `blend`, más larga es la estela.',
        ],
        try: 'Añade .scale(1.02) después de src(o0): la estela estalla hacia los bordes.',
      },
      {
        title: 'Un ejemplo avanzado: la silueta y el humo',
        text: [
          'Para terminar, un ejemplo avanzado. Parece largo, pero está hecho de piezas que ya conoces: **cuatro cadenas**, una por cada salida, que se pasan la imagen como en una cadena de montaje. Pulsa ▶, ponte delante de la cámara y muévete. Luego léelo una salida a la vez.',
          '**o0, el espejo.** `src(s0).scale(1, -1)` toma la webcam y la voltea de derecha a izquierda. El segundo número de `scale` estira solo el ancho, y un número negativo quiere decir «al revés». Ahora la pantalla hace de espejo: si levantas la mano derecha, se levanta la de la derecha.',
          '**o1, la silueta.** `.thresh(0.6, 0.01)` vuelve blanco todo lo que es más claro que 0.6 y negro el resto. El segundo número, pequeñísimo, hace el borde nítido. `.invert()` luego intercambia blanco y negro: ahora son blancas las partes **oscuras** de la imagen. Si estás delante de una pared clara, eres tú.',
          '**o2, el recorte.** `mult` multiplica el espejo por la silueta: donde la silueta es blanca la webcam se queda, donde es negra desaparece.',
          '**o3, el humo.** Aquí está la magia. `.blend(src(o3), 0.995)` es un feedback, como en el paso La estela, pero mucho más largo: o3 se lee a sí misma, conserva el 99,5% de la imagen anterior y añade solo el 0,5% de la nueva. Cada movimiento se queda en la pantalla durante segundos.',
          '`.colorama(0.0025)` desplaza los colores muy poquito, pero lo hace en cada fotograma, y el feedback lo acumula: la estela recorre poco a poco todo el arcoíris. `.modulateHue(o3, 40)` mueve cada píxel en una dirección que depende de su **color**: cada tono se desliza por su cuenta, y la estela empieza a chorrear como humo de colores.',
          'Al final `src(o2).mask(src(o1))` hace transparente el recorte donde la silueta es negra, y `.layer()` lo coloca **encima** de todo. `render(o3)` muestra solo el resultado: tu figura viva delante, nítida, y el humo de colores detrás.',
          '¡Felicidades: esto es live coding visual de verdad! Lleva el ejemplo al LAB con **→ EDITOR** y sigue los dos comentarios del código: son los primeros números que hay que cambiar.',
        ],
        code: `s0.initCam(0)

src(s0).scale(1, -1).out()

// cambia el primer valor de thresh
src(o0).thresh(0.6, 0.01).invert()
  .out(o1)

src(o0).mult(src(o1)).out(o2)

// cambia colorama
src(o2)
  .blend(src(o3), 0.995)
  .colorama(0.0025)
  .modulateHue(o3, 40)
  .layer(src(o2).mask(src(o1)))
  .out(o3)

render(o3)`,
        try: 'Cambia render(o3) por render(o1) para ver la silueta: si es toda blanca o toda negra, ajusta el primer número de thresh hasta que te recorte bien, y luego vuelve a render(o3). Con render() ves las cuatro salidas juntas (o0 y o2 quedan debajo del panel).',
      },
    ],
  },

  /* ── JUNTOS · Visuales que escuchan ──────────────────────────────── */
  ascolto: {
    title: 'Visuales que escuchan',
    desc: 'Sonido y visual juntos: el micrófono divide la música en bandas, de los graves a los agudos, y cada banda mueve un número de la visual.',
    steps: [
      {
        title: 'Primero, un poco de música',
        text: [
          '¡Hola! En este tutorial el sonido y la visual trabajan **juntos**: la visual escucha la música y se mueve a tiempo.',
          'Empecemos por la música. Este es un recuadro **SONIDO**: pulsa ▶ y déjalo sonar. Sigue encendido durante todo el tutorial, debajo de las visuales.',
        ],
        try: 'Mantenlo simple: la visual reacciona mejor a un ritmo con un bombo bien claro.',
      },
      {
        title: 'La visual escucha: a.fft',
        text: [
          'Hydra no recibe la música de Strudel directamente: la **escucha con el micrófono**, desde los altavoces del equipo. Hacen falta los altavoces encendidos, no los auriculares. También funciona con la voz, o dando palmas.',
          'Al pulsar ▶ el micrófono se enciende solo y el navegador te pide permiso: el sonido se queda en este equipo. Lo apagas con 🎤 MIC, arriba.',
          'Hydra divide el sonido en cuatro **bandas**, de los graves a los agudos: `a.fft[0]` es el volumen de los graves, `a.fft[3]` el de los agudos. Son números que cambian todo el tiempo, por eso van dentro de `() =>`, como `time`. Aquí el tamaño de los círculos sigue a los graves: laten con el bombo.',
        ],
        try: 'Cambia a.fft[0] por a.fft[3]: ahora los círculos siguen a los hi-hats, más agudos y más rápidos.',
      },
      {
        title: 'Cambiar la música',
        text: [
          'La visual sigue funcionando mientras cambias la música: escucha cualquier cosa que salga de los altavoces. Aquí añadimos el bajo del tutorial Ritmo, que enciende sobre todo la banda de los medios.',
          'Pulsa ▶ y vuelve a mirar la visual del último paso que ejecutaste: reacciona sola al nuevo ritmo.',
        ],
        try: 'Prueba también un groove del tutorial Ritmo o de Beat IDM: con los redobles rapidísimos, la visual se vuelve loca.',
      },
      {
        title: 'Todo junto',
        text: [
          'Para terminar, el túnel de feedback del tutorial Mezclar y deformar, que respira con la música: el cuadrado se hincha con el bombo, los agudos encienden el azul y los medios hacen girar las ondas del eco.',
          '¡Felicidades: has construido una performance audiovisual! Con **+ TIMELINE** pones tanto la música como la visual en sus pistas, y la pieza está lista para el público.',
        ],
      },
    ],
  },

} });
