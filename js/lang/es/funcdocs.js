/* Español · el glosario del modo ayuda (traduce js/funcdocs.js).
   Las mismas claves que el italiano; cada entrada es ['firma', 'explicación'].
   La firma debe empezar como la italiana (el test compara la parte antes del
   primer paréntesis), así que las firmas sin paréntesis quedan como están. */

I18N.content('es', 'funcdocs', {

  /* ── HYDRA · visual ── */
  hydra: {
    /* fuentes: generan una imagen de partida */
    osc:      ['osc(frecuencia, velocidad, color)', 'Genera ondas luminosas que se deslizan por la pantalla. El primer número dice cuántas ondas ves, el segundo lo rápido que se mueven, el tercero lo coloridas que son.'],
    noise:    ['noise(escala, velocidad)', 'Genera "nubes" aleatorias en movimiento, como una tormenta de luz. Números más altos = detalles más pequeños y movimiento más rápido.'],
    voronoi:  ['voronoi(escala, velocidad, difuminado)', 'Genera celdas irregulares, como la piel de una jirafa o pompas de jabón que se mueven.'],
    shape:    ['shape(lados, tamaño, difuminado)', 'Dibuja una forma geométrica: 3 = triángulo, 4 = cuadrado, 100 = casi un círculo. El difuminado suaviza el borde.'],
    gradient: ['gradient(velocidad)', 'Genera un degradado de colores que cambia con el tiempo.'],
    solid:    ['solid(rojo, verde, azul)', 'Llena la pantalla de un color fijo. Los tres números van de 0 a 1: solid(1, 0, 0) es rojo puro.'],
    src:      ['src(salida)', 'Recupera la imagen de una salida (p. ej. src(o0)): sirve para el feedback, es decir, una imagen que se mira en el espejo.'],

    /* fuentes externas: webcam, pantalla, micrófono */
    initCam:   ['s0.initCam()', 'Enciende la webcam y la deja disponible como fuente: después puedes usarla con src(s0). El navegador te pide permiso. La imagen se queda en este equipo: no se graba ni se envía.'],
    initScreen:['s0.initScreen()', 'Captura una ventana o una pantalla y la convierte en una fuente: luego la usas con src(s0). El navegador te pregunta qué ventana compartir.'],
    s0:        ['s0', 'La primera "entrada externa" de Hydra: se le conecta la webcam (s0.initCam()) o la pantalla (s0.initScreen()), y luego se usa en la cadena con src(s0). También existen s1, s2, s3.'],
    a:         ['a.fft[0]', 'El micrófono, si has encendido 🎤 MIC en la barra de arriba. a.fft[0] son los graves, a.fft[3] los agudos; los valores van más o menos de 0 a 1. Se usa dentro de una función flecha: .rotate(() => a.fft[0] * 3).'],
    fft:       ['a.fft[0…3]', 'Cuánta energía hay en una franja de frecuencias del sonido que capta el micrófono: 0 graves, 1 medios-graves, 2 medios-agudos, 3 agudos. Sirve para que las visuales reaccionen a la música.'],

    /* geometría: mueven y deforman la imagen */
    rotate:   ['.rotate(ángulo, velocidad)', 'Gira la imagen. Con una función flecha se anima: .rotate(() => time * 0.1).'],
    scale:    ['.scale(factor)', 'Agranda (>1) o achica (<1) la imagen.'],
    pixelate: ['.pixelate(x, y)', 'Convierte la imagen en un mosaico de píxeles grandes: menos píxeles = efecto más "retro".'],
    repeat:   ['.repeat(x, y)', 'Repite la imagen en una cuadrícula: repeat(3, 3) hace nueve copias.'],
    repeatX:  ['.repeatX(veces)', 'Repite la imagen solo en horizontal.'],
    repeatY:  ['.repeatY(veces)', 'Repite la imagen solo en vertical.'],
    kaleid:   ['.kaleid(gajos)', 'Efecto caleidoscopio: refleja la imagen en tantos gajos como indiques.'],
    scroll:   ['.scroll(x, y)', 'Desplaza la imagen en horizontal y en vertical.'],
    scrollX:  ['.scrollX(cantidad, velocidad)', 'Desplaza la imagen en horizontal, sin fin si le das una velocidad.'],
    scrollY:  ['.scrollY(cantidad, velocidad)', 'Desplaza la imagen en vertical, sin fin si le das una velocidad.'],

    /* color */
    color:      ['.color(rojo, verde, azul)', 'Multiplica los colores de la imagen canal por canal: color(1, 0, 0) deja solo el rojo.'],
    brightness: ['.brightness(cantidad)', 'Aclara (valores positivos) u oscurece (negativos) la imagen.'],
    contrast:   ['.contrast(cantidad)', 'Aumenta (>1) o reduce (<1) el contraste entre claros y oscuros.'],
    saturate:   ['.saturate(cantidad)', 'Hace los colores más vivos (>1) o más apagados, hasta el blanco y negro (0).'],
    hue:        ['.hue(cantidad)', 'Desplaza todos los colores a lo largo del arcoíris: el rojo se vuelve verde, el verde azul…'],
    invert:     ['.invert(cantidad)', 'Invierte los colores, como un negativo fotográfico.'],
    luma:       ['.luma(umbral, difuminado)', 'Vuelve transparentes las zonas oscuras: solo queda visible lo que es más luminoso que el umbral.'],
    thresh:     ['.thresh(umbral, difuminado)', 'Blanco o negro, sin término medio: por encima del umbral blanco, por debajo negro.'],
    posterize:  ['.posterize(niveles, gamma)', 'Reduce los colores a pocos niveles, como un póster serigrafiado.'],
    colorama:   ['.colorama(cantidad)', 'Hace girar los colores de forma psicodélica. Úsalo con moderación… ¡o no!'],

    /* mezclas: combinan dos imágenes */
    add:    ['.add(fuente, cantidad)', 'Suma otra imagen a esta: las luces se acumulan.'],
    sub:    ['.sub(fuente, cantidad)', 'Resta otra imagen de esta.'],
    mult:   ['.mult(fuente, cantidad)', 'Multiplica las dos imágenes: solo quedan luminosas las zonas claras en ambas.'],
    diff:   ['.diff(fuente)', 'Muestra la diferencia entre las dos imágenes: donde son iguales se vuelve negro.'],
    blend:  ['.blend(fuente, cantidad)', 'Funde las dos imágenes, como un fundido entre dos proyectores.'],
    layer:  ['.layer(fuente)', 'Pone otra imagen encima de esta, donde no es transparente.'],
    mask:   ['.mask(fuente)', 'Usa otra imagen como máscara: esta queda visible solo donde la máscara es clara.'],

    /* modulaciones: una imagen deforma la otra */
    modulate:         ['.modulate(fuente, cantidad)', 'Usa otra imagen para deformar esta: las zonas claras "empujan" los píxeles. Es el secreto de muchos efectos líquidos.'],
    modulateRotate:   ['.modulateRotate(fuente, cantidad)', 'Otra imagen controla la rotación, punto por punto.'],
    modulateScale:    ['.modulateScale(fuente, cantidad)', 'Otra imagen controla el aumento, punto por punto.'],
    modulatePixelate: ['.modulatePixelate(fuente, cantidad)', 'Otra imagen controla el tamaño de los píxeles, punto por punto.'],
    modulateKaleid:   ['.modulateKaleid(fuente, gajos)', 'Caleidoscopio deformado por otra imagen.'],
    modulateScrollX:  ['.modulateScrollX(fuente, cantidad)', 'Otra imagen controla el desplazamiento horizontal.'],
    modulateScrollY:  ['.modulateScrollY(fuente, cantidad)', 'Otra imagen controla el desplazamiento vertical.'],
    modulateHue:      ['.modulateHue(fuente, cantidad)', 'Otra imagen desplaza los colores, punto por punto.'],
    modulateRepeat:   ['.modulateRepeat(fuente, x, y)', 'Otra imagen controla la repetición en cuadrícula.'],

    /* salidas y variables globales */
    out:    ['.out(salida)', 'Manda el resultado a la pantalla. Sin .out() al final de la cadena, ¡no se ve nada!'],
    render: ['render(salida)', 'Elige qué salida mostrar en pantalla: render(o0), o render() para verlas las cuatro juntas.'],
    o0:     ['o0 … o3', 'Las cuatro salidas de vídeo de Hydra: cuatro "lienzos" donde pintar. Normalmente se usa o0; las demás sirven para componer y mezclar.'],
    o1:     ['o0 … o3', 'Las cuatro salidas de vídeo de Hydra: cuatro "lienzos" donde pintar. Normalmente se usa o0; las demás sirven para componer y mezclar.'],
    o2:     ['o0 … o3', 'Las cuatro salidas de vídeo de Hydra: cuatro "lienzos" donde pintar. Normalmente se usa o0; las demás sirven para componer y mezclar.'],
    o3:     ['o0 … o3', 'Las cuatro salidas de vídeo de Hydra: cuatro "lienzos" donde pintar. Normalmente se usa o0; las demás sirven para componer y mezclar.'],
    time:   ['time', 'El tiempo que pasa, en segundos. Dentro de una función flecha anima cualquier parámetro: .rotate(() => time * 0.2).'],
    mouse:  ['mouse.x · mouse.y', 'La posición del mouse en la pantalla: úsala para controlar los parámetros con la mano.'],
    speed:  ['speed = número', 'La velocidad global de todas las animaciones de Hydra: 2 = doble velocidad, 0.5 = la mitad.'],
    hush:   ['hush()', 'Lo detiene todo y deja la pantalla en negro. Es lo que hace el botón STOP.'],

    /* el tiempo por fotograma y los eventos */
    update: ['update = () => { … }', 'Una función que Hydra ejecuta antes de cada fotograma, unas 60 veces por segundo: dentro cambias tus variables (contadores, posiciones, pasos al azar). ■ STOP la apaga.'],
    bpm:    ['bpm = número', 'Los pulsos por minuto de Hydra (normalmente 30): deciden lo rápido que las listas, como [3, 4, 6], pasan de un valor al siguiente. STOP lo devuelve a 30.'],
    onpointerup:   ['onpointerup = () => { … }', 'Oyente: el navegador ejecuta la función cuando sueltas el botón del mouse (o levantas el dedo). También cuenta un clic en el texto: haz clic en la visual. ■ STOP lo apaga.'],
    onpointerdown: ['onpointerdown = () => { … }', 'Oyente: el navegador ejecuta la función cuando pulsas el botón del mouse (o tocas con el dedo). Junto con onpointerup sabes si se mantiene pulsado. ■ STOP lo apaga.'],
    onkeydown:     ['onkeydown = (evento) => { … }', 'Oyente: el navegador ejecuta la función cuando pulsas una tecla; evento.key dice cuál (\'a\', \'ArrowLeft\'…). Primero haz clic en la visual, o las teclas acaban también en el código. ■ STOP lo apaga.'],
    innerWidth:    ['innerWidth · innerHeight', 'Ancho y alto de la ventana, en píxeles (son window.innerWidth y window.innerHeight). innerHeight / innerWidth es la proporción de la pantalla: con .scale(1, …) vuelve redondos los círculos.'],

    /* ajustes del micrófono */
    show:      ['a.show() · a.hide()', 'Muestra (u oculta) abajo a la derecha las barras del micrófono: una por banda, de los graves a los agudos.'],
    setBins:   ['a.setBins(bandas)', 'En cuántas bandas dividir el sonido (normalmente 4): con a.setBins(8), a.fft va de a.fft[0] a a.fft[7].'],
    setSmooth: ['a.setSmooth(calma)', 'Cuánto suavizar los números del micrófono, de 0 (cada fotograma por su cuenta, la visual tiembla) a casi 1 (lentísimo).'],
    setCutoff: ['a.setCutoff(nivel)', 'El suelo: el sonido por debajo de este nivel cuenta como cero. Súbelo si la visual se mueve incluso en silencio.'],
    setScale:  ['a.setScale(nivel)', 'El techo: cuánto sonido hace falta, por encima del suelo de setCutoff, para llegar a 1. Bájalo si la música suena bajito y la visual se mueve poco. En a.show() es la línea fina de más arriba.'],
  },

  /* ── STRUDEL · sonido ── */
  strudel: {
    sound:  ['sound("pattern")', 'Elige los sonidos que usar y su secuencia: sound("bd hh sd hh") toca cuatro golpes por ciclo. Es la función de partida de casi todo.'],
    s:      ['s("pattern")', 'Abreviatura de sound(): elige los sonidos que tocar.'],
    note:   ['note("pattern")', 'Toca notas musicales: nombres como "c3 e3 g3" o números. Combínala con .sound() para elegir el timbre.'],
    n:      ['n("pattern")', 'Un número que elige: qué variante de una muestra (con .sound) o qué grado de la escala (con .scale).'],
    stack:  ['stack(pattern1, pattern2, …)', 'Toca varios patterns a la vez, superpuestos: así se construye una pieza con varios instrumentos.'],
    seq:    ['seq(a, b, …)', 'Pone los elementos en secuencia dentro de un ciclo, dividiendo el tiempo en partes iguales.'],
    cat:    ['cat(a, b, …)', 'Alterna los elementos: uno por ciclo, por turnos.'],
    setcpm: ['setcpm(ciclos por minuto)', 'La velocidad global: cuántos ciclos por minuto. setcpm(30) = un ciclo cada 2 segundos.'],

    /* transformaciones del tiempo */
    fast:  ['.fast(veces)', 'Acelera el pattern: .fast(2) lo toca dos veces por ciclo.'],
    slow:  ['.slow(veces)', 'Ralentiza el pattern: .slow(2) lo reparte en dos ciclos.'],
    rev:   ['.rev()', 'Toca el pattern al revés, del último evento al primero.'],
    ply:   ['.ply(veces)', 'Repite cada evento N veces seguidas: de "bd sd" a "bd bd sd sd".'],
    off:   ['.off(retraso, cambio)', 'Añade una copia del pattern desplazada en el tiempo y modificada: .off(0.125, x => x.speed(2)) crea un eco más agudo.'],
    every: ['.every(N, cambio)', 'Cada N ciclos aplica un cambio: .every(4, rev) invierte el pattern un ciclo de cada cuatro.'],
    struct:['.struct("x ~ x x")', 'Impone un ritmo al pattern: las "x" suenan, las "~" callan.'],
    euclid:['.euclid(golpes, pasos)', 'Ritmo euclidiano: reparte los golpes de la forma más regular posible. euclid(3, 8) es un ritmo que oirás en medio mundo.'],

    /* azar */
    sometimes: ['.sometimes(cambio)', 'Aplica el cambio al azar, más o menos la mitad de las veces: .sometimes(x => x.speed(2)).'],
    often:     ['.often(cambio)', 'Como sometimes, pero más a menudo (unas 3 veces de cada 4).'],
    rarely:    ['.rarely(cambio)', 'Como sometimes, pero rara vez (más o menos 1 vez de cada 4).'],
    degrade:   ['.degrade()', 'Quita eventos al azar, más o menos la mitad: el pattern se vuelve más "agujereado" y vivo.'],
    degradeBy: ['.degradeBy(probabilidad)', 'Quita eventos al azar con la probabilidad que elijas: 0.2 quita uno de cada cinco.'],
    choose:    ['choose(a, b, …)', 'Elige al azar uno de los valores, cada vez.'],

    /* sonido y mezcla */
    gain:  ['.gain(volumen)', 'El volumen: 1 es normal, 0.5 es la mitad, 0 es silencio.'],
    pan:   ['.pan(posición)', 'La posición estéreo: 0 = izquierda, 0.5 = centro, 1 = derecha. Prueba .pan(sine) para que oscile.'],
    speed: ['.speed(velocidad)', 'La velocidad de la muestra: 2 = el doble (más agudo), 0.5 = la mitad (más grave), -1 = al revés.'],
    bank:  ['.bank("nombre")', 'Elige el banco de sonidos, es decir, qué drum machine usar para bd, sd, hh…'],
    jux:   ['.jux(cambio)', 'Estéreo instantáneo: a la izquierda el pattern original, a la derecha la versión modificada. Un clásico: .jux(rev).'],

    /* filtros y efectos */
    lpf:    ['.lpf(frecuencia)', 'Filtro paso bajo: corta los agudos por encima de la frecuencia. Valores bajos = sonido oscuro y apagado.'],
    cutoff: ['.cutoff(frecuencia)', 'Otro nombre del filtro paso bajo: corta los agudos por encima de la frecuencia.'],
    hpf:    ['.hpf(frecuencia)', 'Filtro paso alto: corta los graves por debajo de la frecuencia. Valores altos = sonido fino.'],
    vowel:  ['.vowel("a e i o u")', 'Filtro de vocales: hace "hablar" al sonido como una boca que cambia de forma.'],
    room:   ['.room(cantidad)', 'Reverberación: el sonido de una sala. Más alto = sala más grande.'],
    delay:  ['.delay(cantidad)', 'Eco: el sonido se repite atenuándose.'],
    crush:  ['.crush(bits)', 'Reduce la calidad digital del sonido: 4 suena "roto" y lo-fi, 16 casi limpio.'],
    chop:   ['.chop(trozos)', 'Corta la muestra en N trozos y los toca en secuencia: ideal para trocear sonidos largos.'],

    /* envolvente */
    attack:  ['.attack(segundos)', 'Cuánto tarda el sonido en llegar al volumen máximo: alto = entrada suave.'],
    decay:   ['.decay(segundos)', 'Lo rápido que baja el sonido desde el pico hasta el nivel de sostenido.'],
    sustain: ['.sustain(nivel)', 'El volumen en el que se queda el sonido mientras la nota se mantiene.'],
    release: ['.release(segundos)', 'Cuánto tarda el sonido en apagarse cuando la nota termina.'],

    /* alturas y escalas */
    scale: ['.scale("nota:modo")', 'Afina los números de n() en una escala: con .scale("C:minor"), n("0 2 4") toca Do, Mi♭, Sol. ¡Imposible equivocarse de nota!'],
    add:   ['.add(cantidad)', 'Suma un valor a las notas o a los números del pattern: .add(12) transporta una octava arriba.'],
    sub:   ['.sub(cantidad)', 'Resta un valor a las notas o a los números del pattern.'],
    range: ['.range(mín, máx)', 'Reescala una señal (como sine) entre dos valores: sine.range(200, 2000) para hacer respirar un filtro.'],

    /* armonía */
    chord:     ['chord("C Am F G")', 'Escribe los acordes con el cifrado americano: C = Do, Am = La menor, G7 = Sol séptima, C^7 = Do séptima mayor. Solo no suena: hay que seguirlo con .voicing() (el acorde) o .rootNotes() (el bajo).'],
    voicing:   ['.voicing()', 'Convierte el cifrado de chord() en notas de verdad, eligiendo una disposición que suene bien y que se mueva poco de un acorde al siguiente, como haría un pianista.'],
    rootNotes: ['.rootNotes(octava)', 'De cada cifrado de chord() toma solo la fundamental, la nota que da nombre al acorde: es la parte del bajo. El número es la octava: 2 es grave.'],
    arp:       ['.arp("0 1 2 1")', 'Arpegio: toca las notas de un acorde una a una. Los números son las posiciones dentro del acorde: 0 es la nota más grave.'],
    transpose: ['.transpose(semitonos)', 'Desplaza todas las notas el mismo número de semitonos: 12 es una octava arriba, 7 una quinta. La melodía sigue siendo la misma, cambia la tonalidad.'],
    layer:     ['.layer(a => …, b => …)', 'Del mismo pattern saca varias capas que suenan juntas, cada una con su cambio: por ejemplo acordes y bajo a partir de la misma línea de cifrados.'],
    segment:   ['.segment(veces)', 'Muestrea una señal continua (como irand o sine) N veces por ciclo, convirtiéndola en eventos separados.'],
    clip:      ['.clip(fracción)', 'Acorta cada nota: .clip(0.5) la hace durar la mitad de su espacio, como un staccato o un pizzicato.'],

    /* señales de control */
    sine:   ['sine', 'Una onda lenta que sube y baja suavemente entre 0 y 1: conéctala a un parámetro, p. ej. .pan(sine).'],
    saw:    ['saw', 'Una señal que sube de 0 a 1 y vuelve a empezar, como una rampa.'],
    square: ['square', 'Una señal que salta entre 0 y 1, encendido/apagado.'],
    tri:    ['tri', 'Una señal que sube y baja en línea recta, como un triángulo.'],
    irand:  ['irand(máximo)', 'Un número entero al azar de 0 al máximo, siempre distinto: n(irand(8)) saca notas sorpresa.'],

    /* control */
    hush:    ['hush()', 'Silencio: detiene toda la música. Es lo que hace el botón STOP.'],
    silence: ['silence', 'Un pattern vacío: útil para callar una sola voz dentro de un stack.'],

    /* nombres de los sonidos de percusión */
    bd:  ['"bd" · bass drum', 'El bombo: el golpe grave y profundo, el latido del ritmo.'],
    sd:  ['"sd" · snare drum', 'La caja: el golpe seco que suele responder al bombo.'],
    hh:  ['"hh" · hi-hat', 'El hi-hat cerrado: el "tic" metálico que marca el tiempo.'],
    oh:  ['"oh" · open hi-hat', 'El hi-hat abierto: como hh pero dejándolo resonar, "tssss".'],
    cp:  ['"cp" · clap', 'Las palmas.'],
    rim: ['"rim" · rimshot', 'El golpe en el aro de la caja: un "toc" de madera.'],
    lt:  ['"lt" · low tom', 'El tom grave.'],
    mt:  ['"mt" · mid tom', 'El tom medio.'],
    ht:  ['"ht" · high tom', 'El tom agudo.'],
  },
});
