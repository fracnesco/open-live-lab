/* English · examples from the Hydra guides (translates js/snippets/visuale-guide.js).
   «code» is repeated where the Italian has comments or declares variables;
   the variables take the English names from RENAME.en in test/i18n.test.js,
   the same as in the tutorials. */

I18N.content('en', 'snippets', {

  cats: {
    'Texture':         'Textures',
    'Generative':      'Generative',
    'Tempo':           'Time',
    'Clic e tastiera': 'Clicks and keys',
  },

  tags: { hydra: {
    'texture':      ['texture',       'Repeating patterns: stripes, dots, checkerboards, blotches, stained glass.'],
    'generativo':   ['generative',    'The code builds the visual: loops, lists, conditions.'],
    'casuale':      ['random',        'Chance decides part of it: every ▶ is a little different.'],
    'clic e tasti': ['clicks & keys', 'Reacts to clicks and keys: you play the visual with your hands.'],
  } },

  items: {

    /* ── HYDRA · textures ── */
    'h-tx-zebra': {
      title: 'Zebra',
      desc: 'thresh() makes the stripes of osc() sharp; the noise bends them like the stripes of a real zebra.',
      code: `osc(30, 0.02)
  .thresh(0.5)                       // sharp stripes, black and white
  .modulate(noise(2, 0.05), 0.3)     // bent by the noise
  .out()`,
    },
    'h-tx-target': {
      title: 'Targets',
      desc: 'With lots and lots of slices, kaleid() bends the stripes into circles: the rings of a target, repeated in a grid.',
      code: `osc(40, 0.05)
  .thresh(0.5)
  .kaleid(200)          // lots of slices: the stripes become rings
  .repeat(3, 3)
  .out()`,
    },
    'h-tx-dots': {
      title: 'Round polka dots',
      desc: 'The screen is wider than it is tall, so repeated circles come out oval. scale(1, height / width) squeezes the grid and makes them round again.',
      code: `shape(100, 0.3, 0.01)
  .repeat(8, 8)
  // squeeze horizontally by the screen's proportions: round circles
  .scale(1, () => innerHeight / innerWidth)
  .scrollY(0, 0.05)
  .color(1, 0.3, 0.5)
  .out()`,
    },
    'h-tx-checker': {
      title: 'Checkerboard',
      desc: 'Vertical stripes diff horizontal stripes: black where they match, white where they differ. That is a checkerboard; the second set turns slowly and warps it.',
      code: `osc(60, 0)
  .thresh(0.5)
  .diff(
    osc(60, 0).thresh(0.5)
      .rotate(1.57, 0.02)     // a quarter turn, then slowly onward
  )
  .out()`,
    },
    'h-tx-tartan': {
      title: 'Tartan',
      desc: 'Flat bands of color (posterize) running vertically, blended half and half with the same bands running horizontally: where they cross the colors merge, like woven threads.',
    },
    'h-tx-moire': {
      title: 'Moiré',
      desc: 'Two identical zebras, the second turned just a tiny bit: where they meet, wide bands appear that nobody drew. They are beats, made of light.',
    },
    'h-tx-stained': {
      title: 'Stained glass',
      desc: 'voronoi() with its third number at 0: every cell a flat grey. colorama() turns them into colored glass.',
      code: `voronoi(6, 0.2, 0)      // flat cells, no shading
  .colorama(0.6)
  .out()`,
    },
    'h-tx-cracks': {
      title: 'Cracked earth',
      desc: 'diff of an image with a copy of itself shifted by a tiny amount: inside the cells it stays black, and the cracks appear along the edges.',
      code: `voronoi(6, 0.2, 0)
  .diff(voronoi(6, 0.2, 0).scroll(0.003, 0.003))   // a shifted copy
  .thresh(0.01)                                     // the edges, in white
  .color(0.9, 0.7, 0.5)
  .out()`,
    },
    'h-tx-rgb': {
      title: 'RGB filter',
      desc: 'Like the screen of an old TV seen up close: every little square split into three thin stripes, red, green and blue. osc with one stripe per square and the colors shifted by a third of a turn.',
      code: `squares = 40

voronoi(4, 0.3, 0)
  .colorama(0.5)
  .pixelate(squares, squares)
  // one wave cycle (2π) per square, the colors shifted by a third
  .mult(osc(Math.PI * 2 * squares, 0, Math.PI * 2 / 3))
  .out()`,
    },

    /* ── HYDRA · generative ── */
    'h-gen-rosette': {
      title: 'Rose window',
      desc: 'A for loop crosses the same sharp stripes many times, each turned by half a turn divided by count: a star. scroll moves it to the right, out from under the editor. Change count.',
      code: `count = 7               // how many copies
image = osc(15, 0.02).thresh(0.5)

for (let i = 1; i < count; i++) {
  image = image.diff(osc(15, 0.02).thresh(0.5).rotate(i * Math.PI / count))
}

image
  .scroll(-0.25, 0)       // the center of the star, on the right
  .out()`,
    },
    'h-gen-name': {
      title: 'Your name',
      desc: 'Every letter is a number (charCodeAt): forEach turns each one into a shape, with sides and speed chosen by the letter. Every word has its own visual.',
      code: `word = 'livelab'     // write your name
image = solid()

word.split('').forEach((letter, i) => {
  const code = letter.charCodeAt(0)
  image = image.diff(
    shape(code % 8 + 3, 0.15 + i * 0.07, 0.01).rotate(code, 0.02 * (i + 1))
  )
})

image.repeat(3, 3).out()`,
    },
    'h-gen-bubbles': {
      title: 'Layers of bubbles',
      desc: 'Five layers of bubbles built by a loop: each layer denser, faster and a different color. They look far and near, like the view from a train window.',
      code: `image = solid()

for (let i = 1; i <= 5; i++) {
  image = image.add(
    shape(100, 0.25, 0.01)
      .repeat(i * 2, i * 2)
      .scrollY(0, 0.02 * i)      // the dense layers move faster
      .color(1 / i, 0.4, i / 5),
    0.5
  )
}

image.out()`,
    },
    'h-gen-surprise': {
      title: 'Every ▶ a surprise',
      desc: 'The loop builds five layers, chance picks triangles or cells (form), the even layers warp and the odd ones cross. Press ▶ again and again: every composition is new.',
      code: `image = osc(20, 0.05, 1)

for (let i = 1; i <= 5; i++) {
  const form = Math.random() < 0.5
    ? shape(3, 0.5, 0.01).repeat(i, i)
    : voronoi(i * 2, 0.3)
  image = i % 2 == 0
    ? image.modulate(form, 0.1)
    : image.diff(form.rotate(i, 0.05 * i))
}

image.out()`,
    },
    'h-gen-reduce': {
      title: 'From a list of shapes',
      desc: 'map() turns a list of numbers (the sides) into a list of spinning shapes; reduce() crosses them all into a single image.',
      code: `sides = [3, 4, 5, 6, 8]

sides
  .map(n => shape(n, 0.5, 0.01).rotate(0, n * 0.04))    // numbers → shapes
  .reduce((all, form) => all.diff(form))         // shapes → one
  .repeat(3, 2)
  .out()`,
    },

    /* ── HYDRA · time ── */
    'h-tm-pop': {
      title: 'Popping bubbles',
      desc: 'The sawtooth, time % durationSec / durationSec: it climbs from 0 to 1 and then snaps back. The bubbles swell and pop every two seconds.',
      code: `durationSec = 2
phase = 0

update = () => {
  phase = time % durationSec / durationSec     // from 0 to 1, then back to 0
}

shape(100, () => phase * 0.6, 0.01)
  .repeat(4, 3)
  .color(0.3, 0.8, 1)
  .out()`,
    },
    'h-tm-bursts': {
      title: 'Bursts in time',
      desc: 'A grid of squares appears for a single frame, once a second; the feedback enlarges it and makes it fade.',
      code: `frameCount = 0
update = () => { frameCount++ }     // counts the frames

src(o0)
  .scale(1.015)
  .rotate(0.01)
  .color(0.985, 0.985, 0.985)    // the echo fades
  .add(
    shape(4, 0.3, 0.01).repeat(3, 3).color(1, 0.5, 0.8),
    () => frameCount % 60 == 0 ? 1 : 0    // one frame in 60
  )
  .out()`,
    },
    'h-tm-firefly': {
      title: 'Firefly',
      desc: 'A random walk: on every frame, one tiny step in a random direction. The echo leaves a trail. If it leaves the screen, it comes back in from the other side.',
    },
    'h-tm-bounce': {
      title: 'Bouncing ball',
      desc: 'Position and speed in update: when the ball touches an edge the speed changes sign. With gravity (vy -= …) it falls and bounces.',
      code: `x = -0.3;  y = 0
vx = 0.003; vy = 0.007

update = () => {
  vy -= 0.0002                              // gravity
  x += vx
  y += vy
  if (x < -0.45 || x > -0.25) vx = -vx
  if (y < -0.45) { y = -0.45; vy = -vy }    // the floor
}

shape(100, 0.05, 0.01)
  .color(0.3, 1, 0.8)
  .scroll(() => x, () => y)
  .add(src(o0).brightness(-0.03))
  .out()`,
    },
    'h-tm-beat': {
      title: 'In time with the music',
      desc: 'update works out the phase of the beat at 120 bpm: the squares swell at the start of every beat, like a kick drum, and on every beat the tint changes.',
      code: `bpm = 120
lastBeat = 0
phase = 0
tint = 0

update = () => {
  const beats = time * bpm / 60
  phase = beats % 1
  if (Math.floor(beats) != lastBeat) {
    lastBeat = Math.floor(beats)
    tint = Math.random()
  }
}

shape(4, () => 0.2 + (1 - phase) * 0.3, 0.01)
  .repeat(4, 3)
  .diff(osc(20, 0.1, 1).hue(() => tint))
  .out()`,
    },

    /* ── HYDRA · clicks and keys ── */
    'h-in-knobs': {
      title: 'The mouse as knobs',
      desc: 'mouse.x / innerWidth goes from 0 to 1, left to right: it sets the stripes. mouse.y sets the color and the rotation.',
      code: `// move the mouse over the visual
osc(() => mouse.x / innerWidth * 60, 0.1, () => mouse.y / innerHeight * 2)
  .rotate(() => mouse.y / innerHeight * 3)
  .kaleid(4)
  .out()`,
    },
    'h-in-melt': {
      title: 'Hold down and it melts',
      desc: 'onpointerdown and onpointerup: while you hold the button down (pressed is true), the noise melts the image. Let go, and it snaps back.',
      code: `pressed = false
onpointerdown = () => { pressed = true }
onpointerup = () => { pressed = false }

osc(20, 0.1, 0.8)
  .kaleid(5)
  .modulate(noise(3, 0.2), () => pressed ? 0.5 : 0)
  .out()`,
    },
    'h-in-newpatch': {
      title: 'One click, one visual',
      desc: 'The recipe newLook() invents a random visual; onpointerup = newLook makes a fresh one on every click.',
      code: `newLook = () => {
  osc(Math.random() * 40, 0.1, Math.random() * 2)
    .kaleid(Math.floor(Math.random() * 6) + 2)
    .rotate(Math.random() * Math.PI, 0.1)
    .modulate(noise(Math.random() * 5, 0.1), Math.random() * 0.3)
    .out()
}

newLook()
onpointerup = newLook     // no brackets: the browser calls it, on click`,
    },
    'h-in-keys': {
      title: 'A keyboard to play',
      desc: 'A S D F G change the shape, E turns the echo trail on and off, the mouse changes the color. Click on the visual first, then play.',
      code: `// A S D F G: the shapes · E: the echo · the mouse: the color
shapes = { a: 3, s: 4, d: 5, f: 6, g: 100 }
sides = 4
trail = true

onkeydown = (ev) => {
  if (shapes[ev.key]) sides = shapes[ev.key]
  if (ev.key === 'e') trail = !trail
}

shape(() => sides, 0.3, 0.01)
  .repeat(4, 3)
  .rotate(0, 0.1)
  .color(() => mouse.x / innerWidth, 0.5, 1)
  .add(src(o0).scale(1.02).brightness(-0.05), () => trail ? 1 : 0)
  .out()`,
    },
    'h-in-arrows': {
      title: 'Kaleidoscope on the arrow keys',
      desc: 'The arrow keys move the center of the kaleidoscope, + and - zoom it in and out. ev.key tells you which key you pressed.',
      code: `// (not “zoom”: that is already the name of a Strudel function)
x = 0; y = 0; zoomLevel = 1
onkeydown = (ev) => {
  if (ev.key === 'ArrowRight') x -= 0.05
  if (ev.key === 'ArrowLeft')  x += 0.05
  if (ev.key === 'ArrowUp')    y -= 0.05
  if (ev.key === 'ArrowDown')  y += 0.05
  if (ev.key === '+') zoomLevel *= 1.1
  if (ev.key === '-') zoomLevel /= 1.1
}

osc(20, 0.1, 1)
  .kaleid(6)
  .scale(() => zoomLevel)
  .scroll(() => x, () => y)
  .out()`,
    },

    /* ── HYDRA · microphone (Camera and sound) ── */
    'h-mic-eq': {
      title: 'Equalizer',
      desc: 'a.setBins(8) splits the sound into eight bands; a for loop draws one column per band, as tall as its volume. a.show() shows the microphone bars.',
      code: `// needs 🎤 MIC switched on in the top bar
a.setBins(8)
a.show()

bars = solid()
for (let i = 0; i < 8; i++) {
  bars = bars.add(
    shape(4, 1, 0.001)
      .scale(1, 0.02, () => 0.01 + a.fft[i])
      .scrollX(-0.25 - i * 0.03)
      .color(1 - i / 8, 0.4, i / 8)
  )
}
bars.out()`,
    },
    'h-mic-count': {
      title: 'Count the kicks',
      desc: 'A hit detector in update: when the bass goes above 0.6 and a moment earlier it was below, hits++. Every hit changes the shape and turns it one step.',
      code: `// needs 🎤 MIC switched on in the top bar
a.setSmooth(0.5)
hits = 0
above = false     // was the bass already above the line?

update = () => {
  if (a.fft[0] > 0.6 && !above) hits++    // lower 0.6 if it doesn't count
  above = a.fft[0] > 0.6
}

shape(() => hits % 5 + 3, 0.4, 0.01)
  .repeat(4, 3)
  .rotate(() => hits * 0.3)
  .out()`,
    },
  },
});
