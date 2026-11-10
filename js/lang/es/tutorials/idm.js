/* Español · tutorial «Beat IDM» (traduce js/tutorials/idm.js).
   Los pasos se emparejan por posición; el código no tiene comentarios, así que no se repite aquí. */

I18N.content('es', 'tutorials', { items: {

  idm: {
    title: 'Beat IDM',
    desc: 'Un beat nervioso al estilo de la IDM de los años \'90, a lo Aphex Twin: se toma un break de batería, se corta en segmentos y se vuelve a montar, con redobles rapidísimos, glitches, un bajo acid y un pad melancólico.',
    steps: [
      {
        title: 'Qué es la IDM',
        text: [
          '¡Hola! **IDM** (Intelligent Dance Music) es el nombre, un poco en broma, que se dio en los años \'90 a la música electrónica de artistas como **Aphex Twin**: ritmos de baile desmontados y vueltos a montar, llenos de detalles minúsculos y redobles de batería rapidísimos, con melodías dulces y melancólicas por encima.',
          'El truco de base es tan viejo como el hip hop: se toma un **break**, un trocito de batería tocado por un batería de verdad, y se corta en **segmentos**. Luego los segmentos se vuelven a poner en un orden nuevo.',
          'En Open Live Lab el break se llama **xbreak1** y ya está cortado en **16 segmentos** iguales, numerados del 0 al 15. Aquí abajo los tocamos en fila: `n()` elige el número del segmento, `.s("xbreak1")` dice de qué carpeta tomarlo. Escucha: es el break original.',
        ],
        try: '85/4 es el tempo del break: a 85 bpm los segmentos encajan perfectamente. Prueba 70/4 y escucha qué pasa cuando ya no encajan.',
      },
      {
        title: 'Conocer los segmentos',
        text: [
          'Para volver a montar un break hay que saber qué hay dentro de cada segmento. En el nuestro:',
          '**Bombo**: segmentos 0, 5, 8, 11, 13. **Caja**: segmentos 2, 7, 10, 14. **Platillos y golpes ligeros**: segmentos 1, 3, 4, 6, 9, 12, 15.',
          'Aquí abajo tocamos tres, bien separados: un bombo, una caja, un platillo.',
        ],
        try: 'Cambia los números por otros segmentos y escúchalos uno por uno. ¿Distingues el bombo de la caja?',
      },
      {
        title: 'Un atajo: run',
        text: [
          'Escribir los números del 0 al 15 es largo. `run(16)` hace lo mismo: produce los números 0, 1, 2… hasta el 15, uno por semicorchea.',
          'El resultado es idéntico al del primer paso, pero el código es más corto. Nos servirá dentro de poco.',
        ],
      },
      {
        title: 'Volver a montar el break',
        text: [
          'Ahora lo bueno: cambiamos **el orden** de los segmentos. Aquí la primera mitad repite dos veces el principio (0 1 2 3), y hacia el final el bombo 13 se duplica.',
          'El sonido sigue siendo el del batería, pero el ritmo ahora es nuestro.',
        ],
        try: 'Inventa tu propio orden. Un consejo: pon un bombo (0, 5, 8…) al principio, así el ritmo tiene un punto de apoyo.',
      },
      {
        title: 'Los redobles',
        text: [
          'La seña de identidad de este estilo son los **redobles**: un segmento que de repente se repite 4, 8, 16 veces, rapidísimo, como una ametralladora.',
          'Con la mini-notación basta el asterisco: `7*4` son cuatro cajas en el tiempo de una, `14*8` ocho.',
          '`.cut(1)` es importante: cuando empieza un segmento nuevo, **corta** el que todavía estaba sonando. Sin él, los segmentos se superponen y el redoble se vuelve un amasijo.',
        ],
        try: 'Quita .cut(1) y escucha la diferencia. Luego prueba 14*16.',
      },
      {
        title: 'Redobles que suben',
        text: [
          'Un truco de IDM de verdad: el redoble **cambia de altura** mientras suena, como si acelerara.',
          'Fíjate también en el tempo: de aquí en adelante es `setcpm(170/4)`, el doble del break, la velocidad de la IDM más frenética. Cada segmento tiene solo la mitad del tiempo que necesitaría, y `.cut(1)` lo recorta: el break se vuelve seco y nervioso.',
          'Aquí `[14*16]@4` es un redoble de 16 cajas que ocupa el último cuarto del ciclo (el `@4` le da el peso de 4 posiciones). Y `.speed("1 1 1 [1 1.25 1.5 2]")` hace sonar el último cuarto cada vez más rápido, y por tanto más agudo: el redoble sube como una sirena.',
        ],
        try: 'Prueba speed con valores que bajan: [1 0.8 0.6 0.4].',
      },
      {
        title: 'El glitch',
        text: [
          'Ahora rompemos el groove, pero con control. Tres funciones:',
          '`.sometimesBy(0.2, x => x.speed(-1))` a veces toca un segmento **al revés**. `.sometimesBy(0.15, x => x.ply(4))` a veces lo multiplica por cuatro, un pequeño **tartamudeo**. `.someCyclesBy(0.25, x => x.scramble(16))` en más o menos un ciclo de cada cuatro **revuelve** todos los segmentos al azar.',
          'El resultado parece un CD que salta, pero siempre va a tempo.',
        ],
        try: 'Sube los números a 0.5: más caos. Bájalos a 0.05: solo alguna sorpresa.',
      },
      {
        title: 'Platillos nerviosos',
        text: [
          'Añadimos una **capa** de platillos sacados del break, encima de la batería. En la mini-notación la barra vertical `|` quiere decir «o bien»: `[1|3|6|9]` elige al azar uno de los cuatro segmentos de platillos, y con `*16` lo hace dieciséis veces por ciclo. El `?` final, como en el tutorial Ritmo, hace desaparecer algunos.',
          '`rand` (un número al azar, distinto para cada golpe) cambia el **volumen** con `.gain(rand.range(0.2, 0.6))` y la **posición** entre derecha e izquierda con `.pan(rand)`.',
          'Cada capa va en su propia línea `$:`, como en el tutorial Ritmo. La segunda capa usa `.cut(2)`: así los platillos se cortan entre sí, pero no cortan la batería. Escucha con auriculares.',
        ],
      },
      {
        title: 'El bajo acid',
        text: [
          'Debajo de la batería, un bajo **acid**: el sonido de la máquina Roland TB-303, muy querida en la música electrónica. Es una onda de sierra con un filtro muy **resonante** (`.lpq(15)`) que se abre y se cierra.',
          '`.sometimesBy(0.25, x => x.add(note(12)))` a veces hace saltar una nota una octava arriba: son los quiebros típicos de la 303. El release corto hace las notas secas y saltarinas.',
        ],
      },
      {
        title: 'El pad melancólico',
        text: [
          'El contraste es el secreto de este estilo: por encima del caos rítmico flota algo **dulce y lento**. Acordes largos, un ataque suave (`.attack(0.8)`), un release larguísimo (`.release(3)`) y mucha reverberación.',
          '`Am7` y `F^7` son dos acordes de séptima, de sonido suspendido y un poco nostálgico. `.slow(4)` hace durar cada acorde cuatro ciclos: a 170 bpm los ciclos vuelan, y el pad tiene que quedarse tranquilo.',
          'Para hacerlo **apagado**, como si llegara desde otra habitación, usamos el filtro paso bajo del tutorial Melodía: `.lpf(700)` corta los agudos. Y la reverberación es enorme: `.room(0.95)` es casi todo reverberación, y `.roomsize(10)` es la catedral del tutorial Paisaje sonoro ambient.',
        ],
        try: 'Prueba lpf(300): el pad parece llegar desde debajo del agua. Luego lpf(3000) para oír la diferencia.',
      },
      {
        title: 'Todo junto',
        text: [
          'Aquí está el tema completo, una capa por línea `$:`. La batería es la del **glitch**: el break con los redobles, que de vez en cuando suena al revés, tartamudea o se revuelve. Todas las voces siguen a tempo entre sí, aunque cada una haga su propio caos.',
          'Tócalo en directo como lo haría un productor: empieza solo con el pad, luego quita el `_` de las otras líneas una a una y vuelve a ejecutar cada vez con Cmd+Enter.',
        ],
        try: 'Cuando suenen todas las voces, prueba a cambiar setcpm(170/4) por setcpm(85/4): el mismo tema, a mitad de velocidad, se vuelve casi trip hop.',
      },
      {
        title: 'Un break que nunca se repite',
        text: [
          'Un último paso, para un tema que cambia sin parar. En este tutorial has construido **cuatro maneras** de tocar el break: los segmentos en fila con `run(16)`, el break vuelto a montar, el de los redobles y el del redoble que sube.',
          '`randcat()` los junta todos y en cada ciclo **elige uno al azar**. Dentro de los paréntesis los patterns se separan con comas, igual que en `stack`. Solo que `stack` los toca todos en el mismo momento, y `randcat` de uno en uno.',
          'El redoble que sube se lleva consigo su `.speed()`, porque está dentro del paréntesis. En cambio `.s("xbreak1")`, el glitch y `.cut(1)`, escritos después del paréntesis de cierre, valen para los cuatro.',
          'En cada ciclo la batería cambia de cara, el glitch añade sorpresas, y debajo el bajo y el pad mantienen el hilo. Déjalo sonar mucho rato: nunca oirás dos minutos iguales. ¡Enhorabuena! Lleva el tema al LAB con **→ EDITOR** y hazlo tuyo.',
        ],
        try: 'Añade dentro de randcat un quinto pattern inventado por ti, por ejemplo n("0 0 2 0 5 5 7 7*4 8 8 10 11 13 13 14*8 15"). Acuérdate de la coma después del anterior.',
      },
    ],
  },

} });
