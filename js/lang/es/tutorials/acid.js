/* Español · tutorial «Acid techno» (traduce js/tutorials/acid.js).
   Los pasos se emparejan por posición; el código no tiene comentarios, así que no se repite aquí. */

I18N.content('es', 'tutorials', { items: {

  acid: {
    title: 'Acid techno',
    desc: 'Un tema de acid techno construido pieza a pieza: una batería hecha con los segmentos de los breaks, la línea de la Roland TB-303 con su filtro que «chilla», y al final la forma del tema, con breakdown y drop.',
    steps: [
      {
        title: 'Qué es el acid',
        text: [
          'Chicago, 1987. Un grupo de chavales, **Phuture**, compra de segunda mano una **Roland TB-303**: una cajita pensada para hacer el bajo a los guitarristas, un fracaso que ya nadie quería. Girando sus botones al azar descubren un sonido nunca oído, un bajo que gorgotea y chilla. El tema se llama «Acid Tracks», y el sonido se convierte en **acid**.',
          'En los años \'90, en Inglaterra y en Berlín, ese sonido se encuentra con el techno, más rápido y más duro: es el **acid techno**. En este tutorial construimos un tema, pieza a pieza.',
          'Todo empieza por el **bombo**, un golpe en cada pulso. Lo sacamos del break `dnb1`: el segmento 0 es un bombo. `.speed(0.85)` lo toca un poco más lento, y por tanto más grave. `setcpm(132/4)` quiere decir 132 pulsos por minuto.',
        ],
        try: 'Prueba .speed(0.7) para un bombo más profundo, o .speed(1) para oírlo tal como es en el break.',
      },
      {
        title: 'Los hi-hats',
        text: [
          'Encima del bombo, dos capas de hi-hat. Cada una en su propia línea `$:`, así suenan todas juntas.',
          'La primera es el hi-hat **a contratiempo**: `[~ dnb1:4]*4` es «silencio, hi-hat» cuatro veces, es decir, un hi-hat justo entre un golpe de bombo y el siguiente. `.hpf(6000)` quita todo menos los agudos.',
          'La segunda corre en **semicorcheas** con el segmento 3 de `xbreak1`, un hi-hat ligero. `.gain("[0.4 0.8]*8")` los toca uno suave y uno fuerte: sin eso, parecerían una máquina de coser.',
        ],
      },
      {
        title: 'El clap',
        text: [
          'En el segundo y el cuarto pulso llega el golpe seco: el **clap**. Un truco de los productores es el **layering**: superponer dos sonidos para hacer uno solo, más lleno.',
          'En la mini-notación la coma dentro de los corchetes toca varias cosas **a la vez**: `[cp, xbreak1:2]` es el clap `cp` y, en el mismo instante, la caja del break. `.room(0.3)` le añade un poco de reverb.',
        ],
        try: 'Quita cp del corchete, luego vuelve a ponerlo y quita xbreak1:2: ¿oyes lo que aporta cada uno de los dos?',
      },
      {
        title: 'El break como «top loop»',
        text: [
          'Última capa de batería: el break `xbreak1` **entero**, sus 16 segmentos en fila con `run(16)`. Pero filtrado: `.hpf(3000)` quita los graves, así el bombo del break no molesta al nuestro y solo quedan hi-hats y ghost notes. Los DJ lo llaman **top loop**: una capa que hace vibrar la parte alta.',
          'El break está grabado a 85 bpm y nosotros vamos a 132: cada segmento duraría más que su hueco. `.cut(1)` lo corta cuando empieza el siguiente, y el break se vuelve seco y rápido.',
        ],
        try: 'Prueba .hpf(300): entra el break entero, y el ritmo se vuelve casi jungle.',
      },
      {
        title: 'La 303: las notas',
        text: [
          'Ahora la protagonista. Por un momento quitamos la batería y la escuchamos solo a ella.',
          'La 303 toca una onda **sawtooth** (de sierra), el sonido más rico y zumbante de los sintetizadores. Las notas son semicorcheas en **La menor**, casi todas en el La grave (`a1`), con algún salto: la octava de arriba (`a2`), el Do, el Sol, el Mi bemol. `~` es un silencio.',
          '`.release(0.1)` hace terminar cada nota enseguida: notas cortas y saltarinas. Escucha qué **áspera** suena así, sin filtro. En los próximos pasos la domamos.',
        ],
      },
      {
        title: 'El filtro low-pass',
        text: [
          'El botón más importante de la 303 es el **filtro low-pass** (paso bajo): deja pasar las frecuencias bajas y corta las altas, los agudos. El punto donde corta se llama **cutoff**: `.lpf(600)` pone el cutoff en 600 hercios.',
          'El sonido se vuelve oscuro y redondo, como si llegara a través de una pared.',
        ],
        try: 'Prueba .lpf(200) y .lpf(3000): ¿dónde te gusta más?',
      },
      {
        title: 'La resonance',
        text: [
          'Y aquí está el secreto del acid. El filtro tiene un segundo botón, la **resonance** (resonancia): hace «silbar» el sonido justo en el cutoff.',
          '`.lpq(20)` es una resonance muy alta. Escucha: cada nota tiene ahora dentro un pequeño silbido, un gorgoteo líquido. Es el sonido que Phuture descubrió por casualidad.',
        ],
        try: 'Prueba .lpq(0), luego 5, luego 30: oye cómo crece el silbido.',
      },
      {
        title: 'Girar el botón',
        text: [
          'Quien toca acid en directo nunca deja quieto el botón del cutoff: lo gira despacio, durante minutos. Es este movimiento lo que hace crecer la tensión en la pista.',
          'En lugar de la mano usamos una onda **sine**: `sine.range(300, 3000)` sube y baja entre 300 y 3000 hercios, y `.slow(16)` hace que una vuelta completa dure 16 compases, casi medio minuto.',
          'Déjalo sonar mucho rato: el sonido se abre, se vuelve cortante, y luego se vuelve a cerrar.',
        ],
        try: 'Prueba .slow(4): el botón gira rapidísimo, casi como un efecto.',
      },
      {
        title: 'El squelch',
        text: [
          'En la 303 el filtro no se mueve solo con el botón: en cada nota **salta** hacia arriba y enseguida vuelve a caer. Es el **squelch**, que da a cada nota un pequeño «uiu».',
          'En Strudel es la **filter envelope** (envolvente del filtro): `.lpenv(4)` dice cuánto se abre en cada nota, `.lpdecay(0.15)` en cuánto tiempo vuelve a caer (0,15 segundos), `.lpsustain(0)` que vuelve del todo abajo.',
        ],
        try: 'Prueba .lpenv(8) para un squelch enorme, o .lpdecay(0.05) para uno cortísimo.',
      },
      {
        title: 'Saltos y suciedad',
        text: [
          'Dos toques finales a la 303. El primero: `.sometimesBy(0.2, x => x.add(note(12)))` de vez en cuando hace saltar una nota **una octava arriba**. La línea sigue siendo la misma, pero nunca suena igual dos veces.',
          'El segundo: el acid techno la quiere **sucia**. `.shape(0.4)` añade **distortion** (distorsión), como un amplificador demasiado forzado. Y un **delay**: `.delay(0.3)` repite cada nota después de 0,34 segundos, una corchea con puntillo, así las repeticiones caen entre una nota y la siguiente.',
        ],
        try: 'Sube shape a 0.8: ¡cuidado con los oídos!',
      },
      {
        title: 'Todo junto',
        text: [
          'Batería y 303 juntas. Todas las líneas empiezan con `_$:`, es decir, **silenciadas**, menos el bombo.',
          'Tócalo como un DJ: quita el `_` de una línea cada vez y vuelve a ejecutar cada vez con Cmd+Enter. Un orden clásico: bombo, hi-hats, clap, top loop, y por último la 303. Cada capa que entra sube la energía.',
        ],
      },
      {
        title: 'Breakdown y drop',
        text: [
          'La última pieza es la **forma**. Un tema techno no cambia las notas: cambia lo que hay y lo que falta.',
          '`.mask("<1!6 0!2>")` es un interruptor que cambia en cada compás: seis compases encendido (`1!6`), dos apagado (`0!2`). Lo ponemos en el bombo, el hi-hat a contratiempo y el clap: cada ocho compases la batería desaparece y solo queda la 303, con el top loop que susurra. Es el **breakdown**. Luego vuelve el bombo: es el **drop**, y en la pista se levantan los brazos.',
          'El top loop, en cambio, hace lo contrario: `.hpf("<3000!6 300!2>")` abre el filtro justo en los dos compases de breakdown, y el break entra entero. Enhorabuena: ¡has construido un tema de acid techno! Llévalo al LAB con **→ EDITOR** y cambia la línea de la 303: bastan dos notas distintas para hacerla tuya.',
        ],
        try: 'Cambia 1!6 0!2 por 1!14 0!2: dieciséis compases en lugar de ocho, como en los temas de verdad. O pon mask también en la 303, con "<1!7 0>".',
      },
    ],
  },

} });
