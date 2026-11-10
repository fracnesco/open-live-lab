/* English · the Hydra tutorials and “Visuals that listen” (translates js/tutorials/visuale.js).
   Steps match by position; code is repeated only where the Italian has comments. */

I18N.content('en', 'tutorials', { items: {

  /* ── VISUALS · First steps ───────────────────────────────────────── */
  'primi-passi': {
    title: 'First steps',
    desc: 'From the first line of code to a moving visual: sources, chained transformations, colors, comments, time.',
    steps: [
      {
        title: 'The first line',
        text: [
          'Hi! Here we are not playing music: we are **painting with code**. The visuals engine is called **Hydra**, and it is built like a synthesizer. Only, instead of sound waves, it makes waves of light and color.',
          'Press **▶ RUN** below, or Cmd+Enter inside the box. The visual appears **in the background**, in the part of the screen to the right of the tutorial.',
          '`osc()` is an **oscillator**: it draws stripes that scroll. `.out()` sends the image to the screen. Without `.out()` the code runs but nothing shows up: it is the most common slip.',
        ],
        try: 'Press ■ STOP to go back to black, then try again. You can change the code as much as you like: ↺ ORIGINAL always takes you back to the starting point.',
      },
      {
        title: 'The three numbers of osc',
        text: [
          'Between the brackets of `osc()` you can write **three numbers**, separated by commas. If you leave them out, Hydra uses its own.',
          'The first is the **frequency**: how many stripes there are. The second is the **speed** they scroll at. The third is the **color**: at 0 the stripes are gray; as you raise it, red, green and blue drift apart and a rainbow appears.',
        ],
        try: 'Try osc(5, 0.1, 0.8) and osc(80, 0.1, 0.8). Then set the speed to 0: the image stops. And with -0.1?',
      },
      {
        title: 'Turning: rotate',
        text: [
          'Now let\'s transform the image. As in Strudel, **functions** are hooked on with a dot: `.rotate()` turns everything that comes before it.',
          'The angle is measured in **radians**: 3.14 (pi) is half a turn, 0.8 is about an eighth of a turn. The vertical stripes become slanted.',
          'We wrote one function per line: it is the same code, just easier to read. `.out()` always stays at the end: first you build the image, then you send it to the screen.',
        ],
        try: 'Try rotate(1.57): a quarter turn, and the stripes become horizontal.',
      },
      {
        title: 'Little squares: pixelate',
        text: [
          '`.pixelate(20, 30)` reduces the image to a grid of **little squares**: 20 across and 30 down, like an old video game.',
          'Notice that the squares are straight even though the stripes are slanted: `pixelate` works on the image it receives, which is the one **already rotated**.',
        ],
        try: 'Try small numbers, pixelate(4, 4), and big ones, pixelate(200, 200).',
      },
      {
        title: 'The kaleidoscope: kaleid',
        text: [
          '`.kaleid(4)` folds the image like a **kaleidoscope**: it splits it into wedges around the center and mirrors them. The number says how many wedges.',
          'Look at the squares: the kaleidoscope folded them along with everything else, and they have become wedges too.',
        ],
        try: 'Try kaleid(3), kaleid(6), kaleid(50). With lots of wedges, circles appear.',
      },
      {
        title: 'Order matters',
        text: [
          'Functions work **one after another**, from top to bottom: each one transforms the result of the one above. That is why the order changes the result.',
          'Here are the same functions as in the previous step, but `kaleid` comes **before** `pixelate`. Now the kaleidoscope forms first, and the squares go back to being a straight grid, on top of everything.',
        ],
        try: 'Move the .rotate(0.8) line to the end, just before .out(): now the whole kaleidoscope turns, squares included.',
      },
      {
        title: 'Like a modular synthesizer',
        text: [
          'Hydra is inspired by **modular synthesizers**: lots of modules connected by cables, where the signal passes from one to the next. Here the cables are the dots.',
          'Every chain has the same shape: a **source** that creates the image (like `osc`), then the **geometry** functions, which decide where things are (`rotate`, `pixelate`, `kaleid`…), then the **color** ones, and `.out()` at the end.',
          'Here is the first color function: `.color(1, 0.4, 0.8)` adjusts **red, green and blue**. 1 leaves the channel as it is, 0 switches it off completely: take away a good deal of green and everything turns purple.',
        ],
        try: 'Try color(0, 1, 1): without red you are left with a world of cyan and green.',
      },
      {
        title: 'Other sources: shape',
        text: [
          '`osc` is not the only source. `shape()` draws a **polygon**: the first number is how many sides, the second how big it is, the third how **blurred** the edge is.',
          'Here a triangle (3 sides), size 0.5, with a sharp edge. Shapes go through the same functions as before: `.repeat(3, 3)` repeats it in a 3 by 3 grid.',
          'Why repeat it? A shape is born in the **center** of the screen, which here is under the tutorial panel. In a grid, instead, the copies reach the uncovered part, on the right.',
        ],
        try: 'Try shape(4) for a square and shape(100) for a circle. Then raise the third number to 0.3: the edge becomes a cloud.',
      },
      {
        title: 'Clouds: noise',
        text: [
          '`noise()` generates a soft, moving **noise**, like smoke or clouds. The first number is the **grain**: the higher it is, the smaller the blotches. The second is the speed.',
          'The noise is gray, so we color it with `.color()`: a blue smoke.',
        ],
        try: 'Try noise(30, 0.1): the grain becomes as fine as the snow on an old TV. Or gradient(1), a color gradient that changes over time.',
      },
      {
        title: 'Cells and colors: voronoi and colorama',
        text: [
          '`voronoi()` divides the screen into moving **cells**, like a giraffe\'s skin or soap bubbles. The first number is how many cells, the second the speed.',
          '`.colorama()` **rotates all the colors** of the image: even a small number turns gray into a psychedelic rainbow.',
        ],
        try: 'Add .invert() before .out(): the negative, like old film. Then try .posterize(3), which reduces the colors to just a few, like a poster.',
      },
      {
        title: 'Comments and errors',
        text: [
          'As with sound, two slashes `//` turn a line into a **comment**: Hydra skips it. They are for writing notes to yourself, or for **switching off** a function without deleting it. Here `.pixelate()` is switched off: remove the `//` and run it again.',
          'And if you get something wrong? A message with a **✕** appears under the box and the screen stays black until you fix it. The most common mistakes: a forgotten bracket, a missing dot, a misspelled name (`rotat` instead of `rotate`). Don\'t worry, it happens to everyone.',
        ],
        code: `// a visual with comments
osc(30, 0.1, 1.2)
  .kaleid(5)
  // .pixelate(16, 16)
  .color(0.9, 0.5, 1)
  .out()`,
        try: 'Delete a bracket on purpose and press ▶: read the error message, then put everything back with ↺ ORIGINAL.',
      },
      {
        title: 'Turning nonstop',
        text: [
          'So far the images scrolled, but stayed put. Many geometry functions have one more number for **speed**: `.rotate(0, 0.1)` starts at angle 0 and keeps **turning**, slowly.',
        ],
        try: 'Try rotate(0, -0.5): faster, and the other way around. .scrollX(0, 0.1) has a speed too: it slides the image sideways.',
      },
      {
        title: 'Time: () => time',
        text: [
          'To make **any** number move there is a trick: in place of the number you write a little function, `() => …`, which Hydra recalculates on every frame, about 60 times a second.',
          '`time` is the **seconds** since start-up. `Math.sin(time)` is a wave going up and down between -1 and 1, like `sine` in Strudel. Here we use it to make the kaleidoscope **breathe**: `.scale()` enlarges and shrinks the image, between 0.7 and 1.3.',
        ],
        try: 'Try Math.sin(time * 3): the breathing gets breathless. You can put a function inside osc too: osc(() => 10 + Math.sin(time) * 5, 0.1, 0.8).',
      },
      {
        title: 'Sequences: a list of values',
        text: [
          'Another way to make a number change: a **list** in square brackets. With `[3, 4, 6, 8]` kaleid takes one value every so often, one after another and then from the top, like `< >` in Strudel\'s mini-notation.',
          '`.fast(2)` runs through the list twice as fast. Careful: here the square brackets do not divide time as they do in Strudel, they are just a list of numbers.',
        ],
        try: 'Add .smooth() after .fast(2): instead of jumping, the values glide into one another.',
      },
      {
        title: 'All together',
        text: [
          'Here is a visual with everything you have learned: a source, geometry, color and movement. Read it from top to bottom, one line at a time.',
          'Well done: you have built your first visual! Press **→ EDITOR** to take it into the LAB and keep changing it, or **+ TIMELINE** to use it in your performance.',
        ],
        try: 'Put // in front of one line at a time and see what changes. Then invent a combination of your own.',
      },
    ],
  },

  /* ── VISUALS · Mix and warp ──────────────────────────────────────── */
  mescolare: {
    title: 'Mix and warp',
    desc: 'Several images together: Hydra\'s four outputs, the ways to merge them (blend, diff, mask), modulation that warps one image with another, and feedback, the visual echo.',
    steps: [
      {
        title: 'Four screens',
        text: [
          'Hi again! So far we have always written `.out()`. In fact Hydra has **four outputs**, like four screens: they are called `o0`, `o1`, `o2` and `o3`. `.out()` with nothing between the brackets means `.out(o0)`.',
          'Here we send four different images to the four outputs, and `render()` shows them **all together**: `o0` top left, `o1` top right, `o2` bottom left, `o3` bottom right.',
          'The tutorial panel covers the left part of the screen, so `o0` and `o2` stay mostly underneath it: `o1` and `o3` are the ones you see well.',
        ],
        try: 'Replace render() with render(o2): the screen shows only the third output, the noise.',
      },
      {
        title: 'Reading an output: src',
        text: [
          'Usually you don\'t look at all four: `render(o0)` shows **only** `o0`. The others keep working, like mixer tracks with the volume down, ready to be used.',
          'And how do you use them? `src()` **reads** an output and turns it into a source, like `osc` or `shape`. Here `o1` holds a spinning square, and `o0` reads it and repeats it in a grid.',
        ],
        try: 'Change the first line: instead of the shape, send an osc(20, 0.1, 0.8) to o1. The grid in o0 changes by itself.',
      },
      {
        title: 'Mixing: blend',
        text: [
          'Now the fun part: **merging** two images. `.blend()` mixes the image in the chain with the one between the brackets, like a **crossfade** between two cameras. Inside the brackets you just write the name of the output.',
          'The second number says how much: 0 is all the first image, 1 all the second, 0.5 half and half.',
        ],
        try: 'Try 0.2 and 0.8. Then change render(o0) to render(): you see the two starting images and the result together.',
      },
      {
        title: 'One chain inside another',
        text: [
          'Outputs are handy when an image is used more than once. But between the brackets you can also write another chain **directly**, with its own functions.',
          'The result is the same as the previous step, in a single chain. Watch the brackets: the one of `shape(…)` closes straight away, before `.repeat`, and the one of `blend(…)` only at the end, after the 0.5.',
        ],
        try: 'Inside blend, put noise(3, 0.1) in place of the shape.',
      },
      {
        title: 'Difference: diff',
        text: [
          '`.blend()` is not the only way to mix. `.diff()` computes the **difference** between the two images: where they are the same it turns black, where they differ it lights up.',
          'Here two squares spin in opposite directions, a bit like the contrary motion in the Counterpoint tutorial: where they overlap they go dark, and ever-new stars and interlocking shapes appear.',
        ],
        try: 'Replace diff with add, which adds the lights together, and then with mult, which multiplies them: it stays lit only where both images are bright.',
      },
      {
        title: 'Cutting out: mask',
        text: [
          '`.mask()` uses the second image as a **stencil**: where it is bright you see the first, where it is dark it stays black. It is like looking at the colored stripes through the hexagonal holes of a honeycomb.',
        ],
        try: 'Use voronoi(8, 0.3) as the stencil: the stripes show only inside the bright parts of the cells.',
      },
      {
        title: 'Modulating: warping with another image',
        text: [
          'And here is Hydra\'s most famous function: `.modulate()`. It does not mix the colors: it uses the light of the second image to **move the pixels** of the first. The result looks liquid, like looking through water.',
          'The name comes from synthesizers: **modulation** is when one oscillator makes another one waver. The second number says how much: 0 does nothing, the higher it goes the more the image warps.',
        ],
        try: 'Try 0.05 and 1. Then use a shape instead of the noise: modulate(shape(4, 0.5), 0.3).',
      },
      {
        title: 'Modulating the geometry',
        text: [
          'Many geometry functions have a “modulated” version. `.modulateRotate()` turns **each area** of the image by a different angle, depending on how bright the second image is at that point.',
          'In the same way `.modulateScale()` enlarges each area differently, and `.modulateKaleid()` folds it into a kaleidoscope.',
        ],
        try: 'Replace modulateRotate with modulateScale, then try modulateKaleid(voronoi(5, 0.3), 4).',
      },
      {
        title: 'Feedback: a visual echo',
        text: [
          'What if an output read **itself**? `src(o0)` inside the chain that ends in `o0` takes the image from the previous frame and mixes it with the new one. The result is a **visual echo**: everything leaves a trace.',
          'It is a bit like the reverb in the Ambient soundscape tutorial, where the sound carries on after the source has stopped. Here `.scale(1.02)` enlarges the echo on every frame, and `diff` crosses it with the new square: the copies spread towards the edges like ripples in a pond, until they fill the screen.',
        ],
        try: 'Add .rotate(0.02) right after .scale(1.02): the tunnel spins. Then change 1.02 to 0.98: the ripples move towards the center.',
      },
      {
        title: 'All together',
        text: [
          'Mixing and modulating can be chained as much as you like: each function adds an ingredient. Here an oscillator is warped by noise, crossed with a kaleidoscope triangle and left to slide into the feedback.',
          'Well done! Take the visual into the LAB with **→ EDITOR** and change one ingredient at a time, or put it on the timeline with **+ TIMELINE**.',
        ],
        try: 'Replace diff with mask, or noise with voronoi. Each swap changes the character of the whole visual.',
      },
    ],
  },

  /* ── VISUALS · The webcam ────────────────────────────────────────── */
  webcam: {
    title: 'The webcam',
    desc: 'Your own image as a source: the webcam goes through all the functions you know, from little squares to pop art, up to an advanced example with four outputs and a trail that changes color.',
    steps: [
      {
        title: 'Turning on the webcam',
        text: [
          'Hi! Besides `osc`, `shape` and `noise`, Hydra can use images that come **from outside**: the webcam, a shared screen, a video. For these there are the external sources `s0`, `s1`, `s2` and `s3`.',
          '`s0.initCam()` turns on the webcam inside `s0`, and `src(s0)` brings it into the chain, just as `src(o1)` did with the outputs.',
          'The first time, the **browser asks for permission**: press Allow. The images stay on this computer; they are not recorded or sent to anyone. If you have no webcam, or you denied permission, the screen stays black.',
        ],
        try: 'If the computer has more than one webcam, s0.initCam(1) uses the second.',
      },
      {
        title: 'Transforming the webcam',
        text: [
          'From here on the webcam is a source like any other: all the functions you have learned work on it too.',
          'Here we reduce it to little squares with `.pixelate(40, 30)`: 40 across and 30 down. Move in front of the camera: you have become a video game character!',
        ],
        try: 'Try pixelate(10, 8): a few huge squares, and you can barely recognize yourself. Then pixelate(160, 120), almost sharp, and pixelate(80, 4), which turns you into stripes.',
      },
      {
        title: 'Black and white: thresh',
        text: [
          '`.thresh()` is a **threshold**: whatever is brighter than a certain value turns white, the rest black. Your face becomes an ink drawing, like a photocopy.',
          'The number goes from 0 to 1: the lower it is, the more white there is. It depends a lot on the light in the room, so try adjusting it.',
        ],
        try: 'Add .color(1, 0.2, 0.4) after thresh: the white becomes whatever color you want.',
      },
      {
        title: 'Pop art',
        text: [
          'In the \'60s **Andy Warhol** printed the same photo several times, each with different flat colors. Let\'s try it too.',
          '`.saturate(3)` makes the colors brighter, `.posterize(3)` reduces them to a few levels, like a poster, and `.repeat(2, 2)` makes four copies.',
          'The last line looks complicated, but read it one piece at a time: `gradient(1)` is a color gradient that changes over time, and `.pixelate(2, 2)` reduces it to **four blocks** of flat color, one per copy. `diff` combines them with the webcam: each copy gets its own colors.',
        ],
        try: 'Try repeat(3, 3) and pixelate(3, 3): nine copies, nine colors.',
      },
      {
        title: 'The melting webcam',
        text: [
          'The webcam can be warped with `.modulate()` too. Here the noise makes it ripple like a reflection on water.',
        ],
        try: 'Now the other way around: keep the first line and write osc(20, 0.1, 0.8).modulate(src(s0), 0.3).out(). This time the webcam warps the stripes: as you move, you push them around.',
      },
      {
        title: 'The trail',
        text: [
          'The feedback from the previous tutorial works beautifully with the webcam. Here the echo is mixed with `blend` instead of `diff`: it fades little by little, and every movement leaves a **trail**, like a long-exposure photo.',
          'Slowly move a hand in front of the camera. The closer the `blend` number is to 1, the longer the trail.',
        ],
        try: 'Add .scale(1.02) after src(o0): the trail bursts out towards the edges.',
      },
      {
        title: 'An advanced example: the silhouette and the smoke',
        text: [
          'To finish, an advanced example. It looks long, but it is made of pieces you already know: **four chains**, one for each output, passing the image along as on an assembly line. Press ▶, stand in front of the camera and move. Then read it one output at a time.',
          '**o0, the mirror.** `src(s0).scale(1, -1)` takes the webcam and flips it left to right. The second number of `scale` stretches only the width, and a negative number means “the other way around”. Now the screen works as a mirror: if you raise your right hand, the one on the right goes up.',
          '**o1, the silhouette.** `.thresh(0.6, 0.01)` turns everything brighter than 0.6 white and the rest black. The second number, tiny, makes the edge sharp. `.invert()` then swaps black and white: now the **dark** parts of the image are white. If you are in front of a light wall, that is you.',
          '**o2, the cut-out.** `mult` multiplies the mirror by the silhouette: where the silhouette is white the webcam stays, where it is black it disappears.',
          '**o3, the smoke.** Here is the magic. `.blend(src(o3), 0.995)` is a feedback, as in the step The trail, but much longer: o3 reads itself, keeps 99.5% of the previous image and adds only 0.5% of the new one. Every movement stays on the screen for seconds.',
          '`.colorama(0.0025)` shifts the colors by a tiny amount, but it does so on every frame, and the feedback piles it up: the trail slowly travels through the whole rainbow. `.modulateHue(o3, 40)` moves each pixel in a direction that depends on its **color**: each hue slides off on its own, and the trail starts to drip like colored smoke.',
          'At the end `src(o2).mask(src(o1))` makes the cut-out transparent where the silhouette is black, and `.layer()` lays it **on top** of everything. `render(o3)` shows only the result: your living figure in front, sharp, and the colored smoke behind.',
          'Well done: this is real visual live coding! Take the example into the LAB with **→ EDITOR** and follow the two comments in the code: they are the first numbers to change.',
        ],
        code: `s0.initCam(0)

src(s0).scale(1, -1).out()

// change the first value of thresh
src(o0).thresh(0.6, 0.01).invert()
  .out(o1)

src(o0).mult(src(o1)).out(o2)

// change colorama
src(o2)
  .blend(src(o3), 0.995)
  .colorama(0.0025)
  .modulateHue(o3, 40)
  .layer(src(o2).mask(src(o1)))
  .out(o3)

render(o3)`,
        try: 'Change render(o3) to render(o1) to see the silhouette: if it is all white or all black, adjust the first number of thresh until it cuts you out well, then go back to render(o3). With render() you see the four outputs together (o0 and o2 stay under the panel).',
      },
    ],
  },

  /* ── TOGETHER · Visuals that listen ──────────────────────────────── */
  ascolto: {
    title: 'Visuals that listen',
    desc: 'Sound and visuals together: the microphone splits the music into bands, from bass to treble, and each band moves a number in the visual.',
    steps: [
      {
        title: 'First, some music',
        text: [
          'Hi! In this tutorial sound and visuals work **together**: the visual listens to the music and moves in time.',
          'Let\'s start with the music. This is a **SOUND** box: press ▶ and let it play. It stays on for the whole tutorial, underneath the visuals.',
        ],
        try: 'Keep it simple: the visual reacts best to a rhythm with a nice clear kick.',
      },
      {
        title: 'The visual listens: a.fft',
        text: [
          'Hydra does not receive Strudel\'s music directly: it **listens with the microphone**, from the computer\'s speakers. You need the speakers on, not headphones. It also works with your voice, or by clapping.',
          'When you press ▶ the microphone turns on by itself and the browser asks for permission: the sound stays on this computer. You switch it off with 🎤 MIC at the top.',
          'Hydra splits the sound into four **bands**, from bass to treble: `a.fft[0]` is the volume of the bass, `a.fft[3]` that of the treble. They are numbers that change all the time, which is why they sit inside `() =>`, like `time`. Here the size of the circles follows the bass: they pulse with the kick.',
        ],
        try: 'Change a.fft[0] to a.fft[3]: now the circles follow the hi-hats, higher and busier.',
      },
      {
        title: 'Changing the music',
        text: [
          'The visual keeps running while you change the music: it listens to whatever comes out of the speakers. Here we add the bass from the Rhythm tutorial, which mostly lights up the mid band.',
          'Press ▶ and go back to watching the visual from the last step you ran: it reacts to the new rhythm by itself.',
        ],
        try: 'Try a groove from the Rhythm or IDM beat tutorial too: with the lightning-fast rolls, the visual goes wild.',
      },
      {
        title: 'All together',
        text: [
          'To finish, the feedback tunnel from the Mix and warp tutorial, breathing with the music: the square swells with the kick, the treble lights up the blue and the mids make the echo ripples turn.',
          'Well done: you have built an audiovisual performance! With **+ TIMELINE** you put both the music and the visual on their tracks, and the piece is ready for an audience.',
        ],
      },
    ],
  },

} });
