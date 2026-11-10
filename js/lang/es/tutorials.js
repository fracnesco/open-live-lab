/* Traducción al español de js/tutorials.js (las etiquetas de TUTORIAL_GROUPS
   y los tutoriales definidos allí). Los pasos coinciden con el italiano por
   posición; el código es el mismo que en italiano, así que no se repite. */

I18N.content('es', 'tutorials', {
  groups: {
    'Suono': 'Sonido',
    'Visuale': 'Visual',
    'Insieme': 'Juntos',
  },
  items: {

    /* ── SONIDO · Ritmo ─────────────────────────────────────────────── */
    ritmo: {
      title: 'Ritmo',
      desc: 'Del primer bombo y caja a un groove completo con bajo: mini-notación, funciones que transforman el ritmo, varios patterns a la vez y stack.',
      steps: [
        {
          title: 'Bombo y caja',
          text: [
            '¡Hola! Empecemos por el corazón de todo ritmo: el **bombo** y la **caja**. En Strudel se llaman `bd` (bass drum) y `sd` (snare drum).',
            'Pulsa **▶ EJECUTAR** aquí abajo, o Cmd+Enter dentro del recuadro. ¿Lo oyes? Bum, chas, bum, chas… sin parar.',
            'Lo que has escrito entre comillas se llama **mini-notación**: un pequeño lenguaje hecho a propósito para escribir ritmos. Strudel lo toca en un **ciclo**, un compás que vuelve a empezar sin detenerse nunca.',
          ],
          try: 'Pulsa ■ STOP para parar y vuelve a probar. Puedes cambiar el código todo lo que quieras: con ↺ ORIGINAL siempre vuelves al punto de partida.',
        },
        {
          title: 'Cuatro tiempos',
          text: [
            'Si escribes más sonidos, el ciclo se divide en **partes iguales**. Con cuatro sonidos tienes cuatro tiempos, como en la mayoría de las canciones.',
            'El ciclo dura siempre lo mismo: si añades sonidos no se alarga, se vuelve más denso.',
          ],
          try: 'Prueba "bd bd sd bd": basta mover un golpe para cambiar el carácter del ritmo.',
        },
        {
          title: 'El silencio cuenta',
          text: [
            'La tilde `~` es un **silencio**: ocupa su lugar en el ciclo, pero no suena.',
            'Aquí el bombo suena en el primer y el tercer tiempo, la caja en el segundo y el cuarto, y en los silencios hay espacio para respirar.',
          ],
        },
        {
          title: 'Llegan los platillos',
          text: [
            'Ahora añadimos los **platillos**: `hh` es el hi-hat, el charles.',
            'El secreto es la **coma**: separa dos secuencias que suenan **al mismo tiempo**, cada una con sus pasos. Por un lado bombo y caja, por el otro cuatro hi-hats.',
          ],
        },
        {
          title: 'Repetir con *',
          text: [
            'Escribir `hh hh hh hh hh hh hh hh` es aburrido. El asterisco repite por ti: `hh*8` son ocho hi-hats en un ciclo.',
            'También funciona con un grupo de sonidos, como verás enseguida.',
          ],
          try: 'Prueba hh*16 para un ritmo más agitado, o hh*6 para uno que se balancea.',
        },
        {
          title: 'Dividir un tiempo con [ ]',
          text: [
            'Los corchetes toman **un solo lugar** del ciclo y lo vuelven a dividir. `[~ bd]` es un tiempo partido por la mitad: primero silencio, luego bombo.',
            'Es la manera de hacer los golpes "a contratiempo", los que dan empuje al ritmo.',
          ],
          try: 'Pon [bd bd bd] en lugar del primer bd: un tresillo de bombo.',
        },
        {
          title: 'Un ciclo sí, un ciclo no con < >',
          text: [
            'Los paréntesis angulares eligen **un elemento por ciclo**: en la primera vuelta el primero, en la segunda el segundo, y luego desde el principio.',
            'Aquí la caja se alterna con la palmada `cp` (clap). El ritmo se convierte en una frase de dos ciclos, sin escribir el doble.',
          ],
          try: 'Prueba <sd cp [cp cp]>: tres ciclos distintos antes de volver a empezar.',
        },
        {
          title: 'Ritmos euclidianos con ( )',
          text: [
            '`bd(3,8)` quiere decir: **3 golpes repartidos en 8 pasos**, de la forma más regular posible. Con solo dos números salen ritmos que se encuentran en músicas de todo el mundo.',
            '(3,8) es el tresillo de la música cubana, (5,8) el cinquillo.',
          ],
          try: 'Prueba bd(5,8) y luego bd(7,16). También el hi-hat puede ser euclidiano: hh(5,8).',
        },
        {
          title: 'Notas largas con @, golpes al azar con ?',
          text: [
            'Dos últimos trucos. La arroba da un **peso**: `bd@3` ocupa tres lugares en vez de uno. El signo de interrogación hace que un golpe suene **solo a veces**, al azar.',
            'Con `hh*16?` una parte de los hi-hats desaparece en cada vuelta: el ritmo nunca es del todo igual.',
          ],
        },
        {
          title: 'La velocidad',
          text: [
            '`setcpm()` decide cuántos **ciclos por minuto** suenan. Si en tu ciclo hay 4 tiempos, los pulsos por minuto (bpm) son cpm × 4. Para 100 bpm se escribe `setcpm(100/4)`.',
            'Va en una línea propia, antes del ritmo.',
          ],
          try: 'Lleva el tempo a 140/4 y luego a 70/4: el mismo ritmo cambia de carácter.',
        },
        {
          title: 'Las funciones: ply',
          text: [
            'Hasta ahora hemos trabajado **dentro** de las comillas. Ahora enganchamos **funciones** al pattern con un punto: `.nombre()`. Cada función transforma el ritmo entero.',
            '`.ply(2)` repite cada golpe dos veces, en el tiempo de uno. Aquí usamos `"<1 2>"`: un ciclo normal, un ciclo duplicado. ¡Sí, las funciones también aceptan la mini-notación!',
          ],
          try: 'Prueba .ply(3), o .ply("<1 2 3>").',
        },
        {
          title: 'degradeBy: quitar golpes al azar',
          text: [
            '`.degradeBy(0.4)` quita al azar alrededor del **40%** de los golpes. Un ritmo rígido empieza a respirar y nunca es igual dos veces.',
            'Hace lo mismo que el `?` que viste antes, pero puedes elegir tú cuánto: 0 no quita nada, 1 lo quita todo.',
          ],
          try: 'Prueba 0.1 y 0.8. Aquí solo está el hi-hat: enseguida verás cómo juntarlo con bombo y caja sin que desaparezca también el bombo.',
        },
        {
          title: 'fast y slow',
          text: [
            '`.fast(2)` hace que el pattern quepa **dos veces** en un ciclo, `.slow(2)` lo estira sobre dos ciclos.',
            'A diferencia de `setcpm`, cambia solo este pattern y no el tempo de toda la música.',
          ],
        },
        {
          title: 'rev e iter',
          text: [
            '`.rev()` toca el ciclo **al revés**, del final al principio.',
            '`.iter(4)` divide el ciclo en 4 trozos y en cada vuelta **empieza por un trozo distinto**: el ritmo parece girar sobre sí mismo.',
          ],
          try: 'Sustituye .iter(4) por .rev(), y luego prueba a usar las dos.',
        },
        {
          title: 'sometimes: de vez en cuando algo cambia',
          text: [
            '`.sometimes()` aplica una transformación **solo a veces**, más o menos una vez de cada dos.',
            'La parte `x => x.speed(2)` se lee así: «toma el pattern, llámalo x, y tócalo a doble velocidad». La doble velocidad hace el golpe más agudo.',
          ],
          try: 'Cambia speed(2) por ply(2): de vez en cuando un golpe se duplica.',
        },
        {
          title: 'Muchas funciones en fila',
          text: [
            'Las funciones se pueden poner **una detrás de otra**: cada una trabaja sobre el resultado de la de arriba. Lee la cadena de arriba abajo.',
            '`.gain()` regula el volumen: así el ritmo no suena demasiado fuerte.',
          ],
          try: 'Pon // delante de una línea para "apagarla" sin borrarla, y vuelve a ejecutar.',
        },
        {
          title: 'Una línea de bajo',
          text: [
            'Ahora un poco de música debajo de la batería: el **bajo**. En vez de una muestra usamos `note()`, que toca notas de verdad: `c2` es un do grave, `eb2` un mi bemol, `g1` un sol todavía más grave.',
            '`sawtooth` es un sintetizador de sonido rico, y `.lpf(400)` es un filtro que corta los agudos y lo vuelve suave y profundo.',
          ],
        },
        {
          title: 'Atención: ¡solo suena el último!',
          text: [
            'Probemos a poner batería y bajo uno debajo del otro. Pulsa ▶ y escucha bien…',
            'Solo oyes el bajo, ¿verdad? Cuando hay varios patterns en líneas distintas, Strudel **toca solo el último** e ignora los demás, sin ningún aviso. Es el error más común: no te preocupes, se arregla enseguida.',
          ],
        },
        {
          title: 'La solución: $:',
          text: [
            'Pon `$:` al principio de **cada** pattern: así suenan todos juntos, y siempre perfectamente a tempo entre ellos.',
            'Ahora cada instrumento está en su línea. Y aquí está la ventaja: las funciones valen solo para la línea en la que están. ¡El `.degradeBy()` actúa sobre el hi-hat, mientras bombo y caja siguen precisos!',
          ],
        },
        {
          title: 'Apagar y volver a encender',
          text: [
            'Añadiendo un guion bajo, `_$:`, una línea queda **en silencio** sin tener que borrarla.',
            'Es el gesto típico del live coding: quitas la batería, dejas el bajo solo y luego la haces volver a entrar. Cada vez vuelves a ejecutar con Cmd+Enter.',
          ],
          try: 'Mueve el _ de una línea a otra y prueba a construir un pequeño "arreglo": primero el bajo, luego el bombo, luego los platillos.',
        },
        {
          title: 'stack: muchos patterns en uno',
          text: [
            'Hay otra manera de hacer sonar varios patterns juntos: `stack()`. Dentro de los paréntesis pones los patterns, separados por **comas**, y él los **apila** en un solo pattern.',
            'Cada uno puede tener sus funciones, igual que con `$:`.',
          ],
          try: 'Cuidado con las comas al final de cada línea (menos la última): son ellas las que separan los patterns.',
        },
        {
          title: 'Una función para todo el stack',
          text: [
            'Esta es la magia de `stack`: al ser **un solo pattern**, puedes enganchar una función después del paréntesis de cierre y transformar **todo a la vez**, batería y bajo.',
            'Aquí `.lpf()` con `sine.range(300, 5000).slow(8)` es un filtro que se abre y se cierra lentamente sobre todo el tema, como hacen los DJ.',
          ],
        },
        {
          title: 'Transformar todo el groove',
          text: [
            'Todas las funciones que has aprendido valen también para el stack entero. Aquí cada cuatro ciclos el groove duplica la velocidad, a veces se da la vuelta, y un poco de reverberación (`.room()`) pone todo en la misma sala.',
            '¡Enhorabuena: has construido un groove completo! Pulsa **→ EDITOR** para llevarlo al LAB y seguir modificándolo, o **+ TIMELINE** para usarlo en tu performance.',
          ],
          try: 'Quita una de las funciones finales cada vez y escucha qué cambia. Luego inventa una combinación tuya.',
        },
      ],
    },

    /* ── SONIDO · Melodía ───────────────────────────────────────────── */
    melodia: {
      title: 'Melodía',
      desc: 'Una melodía con un sintetizador de diente de sierra, su envolvente y el filtro; luego acordes arpegiados, escalas, notas al azar y una progresión de acordes que hace evolucionar el arpegio.',
      steps: [
        {
          title: 'Una melodía sencilla',
          text: [
            '¡Hola de nuevo! Esta vez tocamos **notas**. En lugar de `sound("bd")` usamos `note()`, y entre las comillas escribimos los nombres de las notas.',
            'Los nombres son los ingleses: **c d e f g a b** = do re mi fa sol la si. El número detrás de la letra es la **octava**: `c4` es el do del centro del piano, `c5` el mismo do más agudo.',
            '`.sound("sawtooth")` elige el timbre: el **diente de sierra**, una onda brillante y rica, la más usada en los sintetizadores. La mini-notación es la misma del ritmo: `~` es un silencio.',
          ],
          try: 'Cambia algunas notas. También puedes probar los otros timbres: sine, triangle, square.',
        },
        {
          title: 'Ataque y relajación',
          text: [
            'Así el sonido es un poco rígido: empieza y se para de golpe. Pero cada nota tiene una forma en el tiempo, la **envolvente**.',
            '`.attack()` es cuánto tarda la nota en llegar al volumen máximo. `.release()` es cuánto tarda en apagarse después del final. Los dos se miden en **segundos**.',
            'Un pequeño ataque quita el chasquido inicial, una relajación más larga deja una cola que une una nota con la siguiente. El sonido se vuelve más vivo, más parecido a un instrumento de verdad.',
          ],
          try: 'Prueba attack(0.3): el sonido "se hincha" como un arco de violín. Luego attack(0) y release(0.05): se vuelve seco como un pizzicato.',
        },
        {
          title: 'El filtro paso bajo',
          text: [
            'El diente de sierra está lleno de **armónicos agudos**, por eso suena un poco áspero. Un filtro **paso bajo** (low pass) los corta: deja pasar las frecuencias por debajo de cierto valor y atenúa las que están por encima.',
            '`.lpf(800)` corta por encima de 800 hercios. Los números bajos hacen el sonido oscuro y suave, los altos lo dejan brillante.',
            '`.lpq()` es la **resonancia**: refuerza las frecuencias justo en el punto de corte y da ese sonido "ácido" típico de los sintetizadores.',
          ],
          try: 'Prueba lpf(300) y lpf(3000). Luego sube lpq a 15.',
        },
        {
          title: 'Un filtro que se mueve',
          text: [
            'El filtro se vuelve todavía más interesante si **se mueve**. En lugar de un número fijo usamos `sine`, una onda que sube y baja lentamente.',
            '`sine.range(300, 3000)` la hace oscilar entre 300 y 3000 Hz, y `.slow(4)` le hace dar una vuelta cada cuatro ciclos. Escucha cómo la melodía se abre y se cierra.',
          ],
        },
        {
          title: 'Un acorde',
          text: [
            'Un **acorde** está hecho de varias notas tocadas juntas. En la mini-notación se escriben dentro de `[ ]` separadas por **comas**.',
            '`[c3,e3,g3,c4]` es un do mayor: do, mi, sol y el do de la octava de arriba.',
          ],
        },
        {
          title: 'Arpegiar',
          text: [
            '**Arpegiar** quiere decir tocar las notas de un acorde una a una en lugar de todas a la vez, como hace un guitarrista cuando puntea las cuerdas.',
            '`.arp()` elige las notas del acorde según su **posición**: 0 es la más grave, 1 la segunda, y así sucesivamente. `"0 1 2 3"` sube, `"3 2 1 0"` baja.',
          ],
          try: 'Inventa tu propio dibujo: "0 2 1 3", o "0 [1 2] 3 ~".',
        },
        {
          title: 'Notas de una escala',
          text: [
            'Escribir los nombres de las notas está bien, pero hay una manera más cómoda: las **escalas**. Una escala es una selección de notas que suenan bien juntas.',
            'Con `n()` escribes **números** en lugar de nombres, y `.scale("C4:minor")` los convierte en las notas de la escala de do menor: 0 es la primera nota, 1 la segunda, 2 la tercera…',
            'Lo bonito es que dentro de una escala **nunca desafinas**: escribas el número que escribas, suena bien.',
          ],
          try: 'Cambia minor por major, luego por pentatonic o dorian. Mismos números, colores distintos.',
        },
        {
          title: 'Una melodía con números',
          text: [
            'Ahora usamos los números para escribir una melodía de verdad. También se pueden usar números **negativos** (notas por debajo de la primera) y mayores que 7 (la octava de arriba).',
          ],
        },
        {
          title: 'Notas al azar de un acorde: scramble',
          text: [
            '`.scramble(8)` divide el ciclo en 8 partes y para cada una **saca al azar** una nota del pattern. Las notas pueden repetirse, y cada vuelta es distinta.',
            'Si el pattern es un acorde arpegiado, obtienes una melodía al azar hecha solo con las notas del acorde.',
          ],
        },
        {
          title: 'Notas al azar de una escala',
          text: [
            'El mismo truco con una escala: `scramble` saca entre los grados, y la escala garantiza que cada nota sea correcta.',
            'También existe `.shuffle(8)`: baraja las notas como un mazo de cartas, así que en cada vuelta cada una aparece **una sola vez**.',
          ],
          try: 'Pon shuffle en lugar de scramble y escucha la diferencia.',
        },
        {
          title: 'Una progresión de acordes',
          text: [
            'Una **progresión** es una secuencia de acordes. Con `< >` tocamos uno por ciclo.',
            '`chord()` lee los cifrados como en un cancionero: **C Am F G** son do mayor, la menor, fa mayor y sol mayor. `.voicing()` elige las notas de cada acorde y las coloca bien.',
          ],
        },
        {
          title: 'El arpegio sigue a los acordes',
          text: [
            'Ahora añadimos `.arp()`. El **dibujo** del arpegio sigue siendo siempre el mismo, pero en cada ciclo se aplica a un acorde distinto: las notas cambian solas.',
            'Así funcionan muchas canciones: la mano derecha repite la misma figura, y la armonía de debajo la hace evolucionar.',
          ],
        },
        {
          title: 'También el dibujo puede cambiar',
          text: [
            'El dibujo del arpegio acepta la mini-notación, así que también él puede alternarse con `< >`: un ciclo sube, un ciclo baja, y así sucesivamente.',
            'Acordes y dibujo giran cada uno por su cuenta: 4 acordes y 2 dibujos se recombinan de maneras siempre nuevas.',
          ],
        },
        {
          title: 'Arpegio y funciones',
          text: [
            'Ahora añadimos las funciones que ya conoces. `.off(0.125, x => x.add(note(12)))` añade una **copia** del arpegio, desplazada un octavo y una octava más arriba (12 semitonos): parece un eco brillante.',
            '`.sometimes(x => x.ply(2))` de vez en cuando duplica las notas, y el filtro que se mueve y la reverberación (`.room()`) hacen el resto.',
          ],
          try: 'Añade .scramble(8) justo después de .arp(...): el arpegio se vuelve imprevisible pero siempre se queda dentro del acorde.',
        },
        {
          title: 'Con el bajo debajo',
          text: [
            'Para terminar, ponemos el **bajo** debajo del arpegio. `.rootNotes(2)` toma de cada acorde su nota principal, en la octava 2, la de los bajos. Los dos patterns suenan juntos gracias a `$:`, como en el tutorial Ritmo.',
            'Pulsa **→ EDITOR** para llevarlo al LAB, o **+ TIMELINE** para usarlo en tu performance.',
          ],
        },
      ],
    },

    /* ── SONIDO · Contrapunto ───────────────────────────────────────── */
    contrappunto: {
      title: 'Contrapunto',
      desc: 'Varias melodías independientes que suenan juntas: registros distintos, ritmos distintos, movimiento contrario, hasta tres voces y el canon.',
      steps: [
        {
          title: 'Qué es el contrapunto',
          text: [
            'El **contrapunto** es el arte de hacer sonar juntas varias melodías **independientes**, cada una con su propia vida, que sin embargo combinan bien. Bach era el maestro.',
            'Partimos de la melodía del tutorial **Melodía**: números de la escala de do menor, diente de sierra, envolvente y filtro. Esta será nuestra primera voz.',
          ],
        },
        {
          title: 'Los registros',
          text: [
            'El **registro** (o rango) es la zona de alturas en la que se mueve una voz: grave, media o aguda. En el coro son los bajos, los tenores, las contraltos y las sopranos.',
            'Para cambiar de registro una melodía basta con cambiar el número de la octava en la escala: `C4:minor` es la zona central, `C3:minor` una octava más abajo, `C5:minor` una octava más arriba.',
            'Aquí la misma melodía pasa por tres registros, uno por ciclo. Escucha cómo cambia de carácter.',
          ],
        },
        {
          title: 'Dos voces: aguda y grave',
          text: [
            'Ahora la primera voz en el registro **agudo** y una segunda en el registro **grave**, con `$:` delante de cada una para que suenen juntas.',
            'Las dos voces tienen también un **ritmo distinto**: la aguda se mueve rápido (8 notas por ciclo), la grave despacio (4 notas). Así el oído las distingue bien: es la primera regla del contrapunto.',
            'El filtro de la voz grave está más cerrado (`lpf(700)`), para que no tape a la aguda.',
          ],
          try: 'Pon _ delante de una de las dos líneas $: para escuchar las voces por separado, luego quítalo y vuelve a escucharlas juntas.',
        },
        {
          title: 'Movimiento contrario',
          text: [
            'Otro secreto: cuando una voz **sube**, la otra **baja**. Se llama **movimiento contrario**, y hace las voces todavía más independientes.',
            'Aquí la voz aguda sube por la escala y la grave hace el mismo recorrido al revés. ¿Te acuerdas de `.rev()` del tutorial Ritmo? Es justo lo que necesitamos.',
          ],
        },
        {
          title: 'Dos voces que se responden',
          text: [
            'Juntemos las tres ideas: registros distintos, ritmos distintos y un poco de movimiento contrario. Con `< >` las frases cambian en cada ciclo, así el diálogo entre las voces dura más.',
            'Fíjate en cómo la voz grave se mueve sobre todo cuando la aguda se para (en el silencio `~`): las voces se **responden**, como en una conversación.',
          ],
        },
        {
          title: 'Tres voces',
          text: [
            'Añadimos una tercera voz **en medio**, en el registro central (`C4:minor`). Para no crear confusión le damos un ritmo distinto otra vez: notas largas, dos por ciclo, que mantienen unidas a las otras dos.',
            'Ahora cada voz tiene su registro (agudo, medio, grave) y su paso (rápido, lento, medio). Intenta seguirlas de una en una con el oído.',
          ],
          try: 'Silencia una voz cada vez con _$: y escucha cómo cambia el conjunto.',
        },
        {
          title: 'El canon',
          text: [
            'El **canon** es el contrapunto más famoso: una sola melodía que **se persigue a sí misma**, como en «Martinillo». Las voces cantan lo mismo, pero entran en momentos distintos.',
            '`.off(0.5, x => x.add(n(-7)))` crea una copia de la melodía que empieza medio ciclo después y 7 grados más abajo: una octava por debajo, porque la escala tiene 7 notas. Un segundo `.off` añade la tercera voz.',
            '¡Enhorabuena: has escrito un canon a tres voces! Llévalo al LAB con **→ EDITOR** y prueba a cambiar la melodía: las otras voces la seguirán.',
          ],
        },
      ],
    },

    /* ── SONIDO · Ambient soundscape ────────────────────────────────── */
    ambient: {
      title: 'Paisaje sonoro ambient',
      desc: 'Un paisaje sonoro a partir de una sola muestra: ralentizada, afinada al azar y sumergida en una reverberación larguísima.',
      steps: [
        {
          title: 'Una muestra larga',
          text: [
            'En la música ambient los sonidos no corren: se ensanchan, se superponen, llenan el espacio. Partimos de una **muestra** bastante larga.',
            '`tabla` es una carpeta de sonidos de tabla, un tambor indio. Los dos puntos eligen **cuál** de las muestras de la carpeta: se cuenta desde 0, así que `tabla:2` es la tercera. Es una de las más largas de nuestra biblioteca, unos 3 segundos, un golpe grave que vibra mucho tiempo.',
            '`s()` es un atajo de `sound()`: hacen exactamente lo mismo.',
          ],
          try: 'Escucha también tabla:0 y tabla:1, las otras dos muestras de la carpeta.',
        },
        {
          title: 'Darle espacio',
          text: [
            'Un ciclo dura unos 2 segundos, pero nuestra muestra dura 3: las repeticiones se solapan y se convierte en un ritmo.',
            'Con `.slow(2)` la muestra suena **una vez cada dos ciclos**. Cada golpe tiene tiempo de apagarse antes del siguiente, y alrededor hay silencio: en el ambient también el vacío forma parte de la música.',
          ],
        },
        {
          title: 'Una altura al azar',
          text: [
            'Ahora cambiamos la **altura** (el pitch) de la muestra. `.speed()` decide a qué velocidad se lee: a 1 suena normal, a 0.5 va a media velocidad, una octava más grave y el doble de larga.',
            '`rand` es un número **al azar** entre 0 y 1, distinto para cada golpe. `rand.range(-0.5, 0.5)` lo lleva entre -0.5 y 0.5. Así cada golpe tiene una altura distinta, siempre mucho más grave que el original.',
            '¿Y los números negativos? Una velocidad negativa lee la muestra **al revés**, del final al principio: el golpe se convierte en un sonido que crece en lugar de apagarse. Cuanto más cerca de 0 está el número, más lento, grave y largo es el sonido, hasta casi desaparecer.',
          ],
          try: 'Escucha unos cuantos ciclos: no hay dos golpes iguales. Luego prueba rand.range(0.2, 0.5) para oír solo los "derechos".',
        },
        {
          title: 'Una reverberación enorme',
          text: [
            'Ahora el toque mágico: la **reverberación**, el sonido que rebota en las paredes de una sala y sigue después de que la fuente se ha parado.',
            '`.room(0.9)` es **cuánta** reverberación añadir, de 0 (nada) a 1 (casi solo reverberación). `.roomsize(10)` es el **tamaño** de la sala, y por tanto cuánto dura la cola: con 10 estamos en una catedral, y cada golpe se arrastra durante muchos segundos.',
            'Las colas de los golpes se superponen y se funden en una alfombra continua. `.gain(0.8)` baja un poco el volumen, porque toda esa reverberación se suma.',
          ],
          try: 'Compara roomsize(1) y roomsize(10): la misma cantidad de reverberación, salas muy distintas.',
        },
        {
          title: 'Una segunda capa',
          text: [
            'Un paisaje sonoro está hecho de **capas**. Añadimos `hh:1`, el platillo crash de la carpeta de los hi-hats, con el mismo tratamiento: ralentizado, altura al azar, mucha reverberación.',
            'El platillo usa `.slow(3)`, la tabla `.slow(2)`: las dos capas se encuentran en puntos siempre distintos y el paisaje nunca se repite igual. El filtro `.lpf(2000)` quita los agudos más cortantes del platillo.',
          ],
          try: 'Añade una tercera capa con otra muestra, por ejemplo east:2 o crow. Déjate guiar por el oído.',
        },
      ],
    },
  },
});
