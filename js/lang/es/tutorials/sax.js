/* Español · tutorial «Ambient con saxo» (traduce js/tutorials/sax.js).
   Los pasos se emparejan por posición; el código no tiene comentarios, así que no se repite aquí. */

I18N.content('es', 'tutorials', { items: {

  'ambient-sax': {
    title: 'Ambient con saxo',
    desc: 'Un paisaje sonoro hecho de notas de saxofón: lentísimas, elegidas al azar entre las que suenan bien juntas, tocadas al revés y sumergidas en una reverberación enorme.',
    steps: [
      {
        title: 'Una nota larga',
        text: [
          'En la música ambient los sonidos no corren: se ensanchan, se superponen, llenan el espacio. Empezamos con una nota de **saxofón**.',
          'La carpeta `sax` contiene una nota por archivo, cada una de más de 4 segundos. `sax:9` es un **re**. Un ciclo dura unos 2 segundos, así que cada nota todavía no ha terminado cuando empieza la siguiente: las repeticiones se solapan.',
          '`s()` es un atajo de `sound()`: hacen exactamente lo mismo.',
        ],
        try: 'Escucha también sax:0 (la), sax:5 (do) y sax:18 (sol). En ♫ SONIDOS encontrarás el nombre de cada nota.',
      },
      {
        title: 'Una melodía lentísima',
        text: [
          'Ahora hagamos una pequeña melodía. `n()` elige el **número** del archivo y `.s("sax")` la carpeta: `n("9").s("sax")` es lo mismo que `s("sax:9")`.',
          'Los paréntesis `< >` tocan **una nota por ciclo**, por turnos: re, do, la, mi. Con `.slow(2)` cada nota dura dos ciclos, unos 4 segundos, justo lo que dura la muestra: termina una y empieza la otra.',
        ],
      },
      {
        title: 'Notas al azar, pero afinadas',
        text: [
          'En lugar de decidir nosotros el orden, dejamos que elija el azar. En la mini-notación la barra `|` quiere decir **«una de estas, al azar»**: en cada vuelta Strudel elige una.',
          'Las cinco notas son la, do, re, mi, sol: la **escala pentatónica** de la menor. Es una escala sin notas «incómodas»: salga el orden que salga, suena bien.',
        ],
        try: 'Añade 1 u 11 a la lista: son otra vez la y mi, pero de una segunda toma, tocada un poco distinta.',
      },
      {
        title: 'Más grave, y al revés',
        text: [
          'Con la tabla el pitch era totalmente al azar, con `rand`. Pero el saxo es **afinado**: un pitch cualquiera lo desafinaría. Elegimos solo velocidades que se quedan en la misma nota.',
          '`.speed(1)` es el sonido normal. `0.5` va a mitad de velocidad: la misma nota **una octava más grave**, el doble de larga. `-0.5` es lo mismo pero **al revés**: la nota crece de la nada en lugar de atacar, como una respiración.',
          'Otra vez `|` elige al azar, cada vez una de las tres.',
        ],
        try: 'Prueba .speed(2): una octava más aguda, y la mitad de corta. Luego prueba .speed(0.7) y oye cómo desafina.',
      },
      {
        title: 'Una reverberación enorme',
        text: [
          'Ahora la **reverberación**: `.room(0.9)` es cuánta reverberación añadir (de 0 a 1), `.roomsize(10)` el tamaño de la sala. Con 10 estamos en una catedral, y cada nota se arrastra durante muchos segundos.',
          '`.pan(rand)` pone cada nota en un punto distinto entre el altavoz izquierdo y el derecho: el sonido se ensancha en el espacio. `.gain(0.7)` baja el volumen, porque todas esas colas se suman.',
        ],
        try: 'Escucha con auriculares: las notas llegan desde puntos distintos.',
      },
      {
        title: 'El bordón',
        text: [
          'Debajo de la melodía ponemos un **bordón**: una nota grave que no cambia nunca, como en las gaitas o en la música india. Mantiene unido todo lo demás.',
          'Es el re (`sax:9`) tocado a `.speed(0.25)`: dos octavas más abajo y cuatro veces más largo, casi 18 segundos. Con `.slow(4)` vuelve a empezar cada 8 segundos, así que las notas se superponen y el sonido no se interrumpe nunca. `.lpf(800)` lo oscurece todavía más.',
          'Las dos capas tienen tiempos distintos (`.slow(2)` y `.slow(4)`) y la melodía es siempre distinta: el paisaje nunca se repite igual.',
        ],
        try: 'Cambia el bordón por sax:0 (la) y escucha cómo cambia el color. Luego añade una tercera capa: el platillo hh:1 del otro tutorial ambient le va de maravilla.',
      },
    ],
  },

} });
