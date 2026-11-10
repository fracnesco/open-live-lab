/* ════════════════════════════════════════════════════════════════════════
   EN · snippets — the examples of js/snippets.js in English
   Same ids as the Italian file. `code` is here only where the Italian code
   has comments: the code itself never changes, only the comments.
   Categories and tags are keys too (they group and filter): see
   localizeSnippets() in js/i18n.js.
   ════════════════════════════════════════════════════════════════════════ */

/* ── HYDRA ───────────────────────────────────────────────────────────── */
I18N.content('en', 'snippets', { items: {

  /* base */
  'h-osc': {
    title: 'Colored wave',
    desc: 'osc() makes scrolling waves: frequency, speed and amount of color.',
    code: `// osc(frequency, speed, color)
osc(10, 0.1, 1.5)
  .out()`,
  },
  'h-shape': {
    title: 'Geometric shape',
    desc: 'shape() draws a polygon: number of sides, size, edge blur.',
    code: `// shape(sides, size, blur)
shape(3, 0.4, 0.01)
  .out()`,
  },
  'h-gradient': {
    title: 'Animated gradient',
    desc: 'gradient() makes a blend of colors that changes over time.',
    code: `// gradient(speed)
gradient(0.3)
  .out()`,
  },
  'h-noise': {
    title: 'Organic noise',
    desc: 'noise() makes moving blotches, like clouds or smoke.',
    code: `// noise(scale, speed)
noise(4, 0.2)
  .out()`,
  },

  /* transformations */
  'h-kaleid': {
    title: 'Kaleidoscope',
    desc: 'kaleid() multiplies the image in mirrors, like a kaleidoscope.',
    code: `osc(8, 0.1, 1)
  .kaleid(6)     // 6 mirrors
  .out()`,
  },
  'h-rotate': {
    title: 'Continuous rotation',
    desc: 'rotate() turns the image; with () => time the rotation never stops.',
    code: `shape(4, 0.5)
  .rotate(() => time * 0.5)  // turns over time
  .out()`,
  },
  'h-repeat': {
    title: 'Grid of copies',
    desc: 'repeat() repeats the image in a grid of rows and columns.',
    code: `shape(3, 0.3)
  .repeat(4, 3)   // 4 columns, 3 rows
  .out()`,
  },
  'h-pixel': {
    title: 'Giant pixels',
    desc: 'pixelate() lowers the resolution: an ’80s video game look.',
  },

  /* color */
  'h-color': {
    title: 'Changing the colors',
    desc: 'color() multiplies the red, green and blue channels of the image.',
    code: `osc(10, 0.1)
  .color(1.2, 0.3, 0.8)  // r, g, b
  .out()`,
  },
  'h-invert': {
    title: 'Negative',
    desc: 'invert() inverts the colors, like a photo negative.',
  },
  'h-hue': {
    title: 'Rotating rainbow',
    desc: 'hue() rotates the hue of the colors; animated with () => time.',
  },

  /* combinations */
  'h-blend': {
    title: 'Blending two sources',
    desc: 'blend() mixes two images, like a crossfade.',
  },
  'h-diff': {
    title: 'Difference',
    desc: 'diff() shows the difference between two images: hard edges and contrasts.',
  },
  'h-mask': {
    title: 'Cutout (mask)',
    desc: 'mask() cuts out one image using the shape of another.',
  },
  'h-modulate': {
    title: 'Warping (modulate)',
    desc: 'modulate() uses one image to warp another: a liquid effect.',
  },

  /* feedback */
  'h-feedback': {
    title: 'Feedback (visual echo)',
    desc: 'src(o0) reads the output back: the image piles up like a visual echo.',
  },
  'h-fb-comet': {
    title: 'Comet trail',
    desc: 'The circle moves and the echo stays behind. brightness(-0.02) darkens the echo at every frame: the trail fades out on its own.',
    code: `shape(40, 0.08, 0.01)
  .color(1, 0.6, 0.2)
  .scrollX(() => Math.sin(time) * 0.3)
  .scrollY(() => Math.sin(time * 1.7) * 0.3)
  // the echo fades a little at every frame
  .add( src(o0).brightness(-0.02) )
  .out()`,
  },
  'h-fb-tunnel': {
    title: 'Rainbow tunnel',
    desc: 'The echo grows, turns and changes hue; layer() puts the square on top. Each copy comes out a bit bigger and in another color.',
    code: `src(o0)
  .scale(1.03)     // the echo grows...
  .rotate(0.02)    // ...turns...
  .hue(0.01)       // ...and changes color
  .layer(
    shape(4, 0.15, 0.01)
      .color(1, 0.3, 0.5)
      .hue(() => time * 0.2)   // without this, the tunnel stops after a few seconds
      .luma(0.1)
  )
  .out()`,
  },
  'h-fb-corridor': {
    title: 'Endless corridor',
    desc: 'A frame on the edge of the screen; the echo shrinks (scale below 1) and pulls it toward the center, like two mirrors facing each other.',
    code: `src(o0)
  .scale(0.92)      // the echo shrinks
  .rotate(0.02)
  .layer(
    osc(10, 0.1, 1.5)
      // a frame: the whole screen minus a rectangle
      .mask( shape(4, 1, 0.01).diff(shape(4, 0.9, 0.01)) )
  )
  .out()`,
  },
  'h-fb-smoke': {
    title: 'Rising smoke',
    desc: 'The echo rises a little (scrollY) and the noise warps it at every frame: the blob at the bottom turns into smoke.',
    code: `shape(50, 0.15, 0.3)
  .color(0.6, 0.4, 1)
  .scrollY(-0.3)             // the source sits at the bottom
  .blend(
    src(o0)
      .scrollY(0.008)        // the echo rises...
      .modulate(noise(3, 0.2), 0.006)   // ...warps...
      .brightness(-0.003),   // ...and fades
    0.97
  )
  .out()`,
  },
  'h-fb-selfmod': {
    title: 'The echo that warps',
    desc: 'modulate() with o0: the colors of the previous frame move the pixels of the new one. The kaleidoscope curls into a spiral.',
    code: `osc(15, 0.05, 1.2)
  .kaleid(4)
  // the previous output, turned a little, warps the new one
  .modulate( src(o0).rotate(0.2), 0.15 )
  .out()`,
  },
  'h-fb-brush': {
    title: 'Mouse brush',
    desc: 'Move the mouse over the screen and you draw. mouse.x and mouse.y tell where the pointer is; the echo keeps the drawing and brightness() makes it fade slowly.',
    code: `// move the mouse over the screen
src(o0)
  .brightness(-0.004)      // the old drawing fades slowly
  .layer(
    shape(30, 0.04, 0.02)
      .color(1, 0.4, 0.7)
      .hue(() => time * 0.1)   // the color changes over time
      .scrollX(() => 0.5 - mouse.x / width)
      .scrollY(() => mouse.y / height - 0.5)
      .luma(0.1)
  )
  .out()`,
  },
  'h-fb-zoomwave': {
    title: 'Endless wobbling zoom',
    desc: 'scale(1.02) enlarges the echo at every frame: a zoom that never ends. modulate() with noise makes it wobble, like a rubber tunnel.',
    code: `src(o0)
  .scale(1.02)                       // endless zoom
  .modulate( noise(3, 0.1), 0.003 )  // the noise makes the tunnel wobble
  .hue(0.01)
  .layer(
    shape(4, 0.15, 0.01)
      .color(1, 0.3, 0.5)
      .hue(() => time * 0.2)
      .luma(0.1)
  )
  .out()`,
  },
  'h-fb-galaxy': {
    title: 'Galaxy',
    desc: 'Endless zoom plus modulateRotate(): the blurred circle turns the echo more at the center than at the edges, and the copies spiral out like the arms of a galaxy.',
    code: `src(o0)
  .scale(1.02)    // the echo moves out toward the edges...
  // ...turning more at the center than at the edges
  .modulateRotate( shape(99, 0.5, 0.8), -0.05 )
  .hue(0.01)
  .layer(
    shape(4, 0.15, 0.01)
      .rotate(() => time * 0.5)
      .color(1, 0.3, 0.5)
      .luma(0.1)
  )
  .out()`,
  },
  'h-fb-vortex': {
    title: 'Vortex',
    desc: 'The opposite of the galaxy: scale below 1 sucks the echo toward the center and modulateRotate() twists it. The frame of waves on the edge becomes a whirlpool.',
    code: `src(o0)
  .scale(0.98)    // the echo is sucked toward the center...
  // ...and turns more at the center than at the edges
  .modulateRotate( shape(99, 0.5, 0.8), 0.1 )
  .layer(
    osc(10, 0.1, 1.5)
      // a thin frame on the edge of the screen
      .mask( shape(4, 1, 0.01).diff(shape(4, 0.95, 0.01)) )
  )
  .out()`,
  },
  'h-fb-lava': {
    title: 'Rising lava',
    desc: 'The echo rises a tiny bit at every frame and the noise bends it: the colors of the frame drip upward like lava in a lamp.',
    code: `src(o0)
  .scrollY(0.003)                     // the echo rises slowly...
  .modulate( noise(6, 0.1), 0.003 )   // ...and bends like a liquid
  .layer(
    osc(20, 0.1, 1.5)
      // a wide frame, shifted down a little
      .mask( shape(4, 1, 0.01).diff(shape(4, 0.8, 0.01)).scrollY(-0.1) )
  )
  .out()`,
  },
  'h-fb-marble': {
    title: 'Liquid marble',
    desc: 'colorama() shifts the colors of the echo a tiny bit at every frame; modulateHue(o0, 40) moves each pixel in a direction that depends on its color. Each hue slides its own way, like colors dissolving in water.',
    code: `osc(10, 0.1, 1.5).kaleid(4)
  // the echo stays at 95% and changes hue at every frame
  .blend( src(o0).colorama(0.003), 0.95 )
  // each pixel slides in a direction that depends on its color
  .modulateHue(o0, 40)
  .out()`,
  },
  'h-fb-liquidpaint': {
    title: 'Liquid paint',
    desc: 'A brush in liquid: the circle follows the mouse and modulateHue(o0, 40) drags the trace away, each hue in its own direction. The background is a gradient(): modulateHue needs a background that already has color.',
    code: `// move the mouse over the screen
gradient(0.1)
  .blend( src(o0), 0.97 )
  .modulateHue(o0, 40)
  // the brush: a circle that changes color and follows the mouse
  .layer(
    shape(30, 0.05, 0.02)
      .color(1, 0.3, 0.6)
      .hue(() => time * 0.1)
      .scrollX(() => 0.5 - mouse.x / width)
      .scrollY(() => mouse.y / height - 0.5)
      .luma(0.1)
  )
  .out()`,
  },
  'h-fb-mic': {
    title: 'Breathing tunnel',
    desc: 'Turn on 🎤 MIC: on the bass (a.fft[0]) the square swells and the zoom of the echo speeds up. With music playing in the SOUND editor the tunnel pulses in time.',
    code: `// needs 🎤 MIC on in the top bar
src(o0)
  .scale(() => 1.01 + a.fft[0] * 0.05)   // the bass speeds up the zoom
  .hue(0.005)
  .layer(
    shape(4, () => 0.1 + a.fft[0] * 0.2, 0.01)   // and swells the square
      .color(1, 0.5, 0.2)
      .hue(() => time * 0.1)
      .luma(0.1)
  )
  .out()`,
  },
  'h-fb-twoout': {
    title: 'Two outputs chasing each other',
    desc: 'Feedback can go through another output: o0 reads o1 and o1 reads o0 back, changing its color. render(o0) shows the result.',
    code: `// o0: the waves in the square, plus the echo coming from o1
osc(10, 0.1, 1)
  .mult( shape(4, 0.3, 0.2) )
  .blend( src(o1).scale(1.02).rotate(0.03), 0.8 )
  .out(o0)

// o1: reads o0 back and shifts its hue
src(o0).hue(0.05)
  .out(o1)

render(o0)`,
  },

  /* camera and sound */
  'h-cam': {
    title: 'Webcam',
    desc: 'initCam() turns on the webcam; src(s0) brings it into the chain. The browser asks for permission: that’s normal.',
    code: `// the first time, the browser asks for permission
s0.initCam()

src(s0)
  .out()`,
  },
  'h-cam-kaleid': {
    title: 'Kaleidoscope webcam',
    desc: 'The webcam treated like any other source: you can rotate it, mirror it, color it.',
  },
  'h-cam-feedback': {
    title: 'Webcam with echo',
    desc: 'Feedback on the webcam: movements leave a trail that keeps growing.',
  },
  'h-mic': {
    title: 'Visuals that listen',
    desc: 'Turn on 🎤 MIC in the top bar: a.fft[0] is the bass, a.fft[3] the treble. Try clapping your hands.',
    code: `// needs 🎤 MIC on in the top bar
osc(20, 0.1, 1)
  .rotate(() => a.fft[0] * 3)
  .scale(() => 1 + a.fft[2])
  .out()`,
  },
  'h-mic-shape': {
    title: 'Shape that pulses with sound',
    desc: 'The circle swells on the bass. With music playing in the SOUND editor, it keeps time by itself.',
    code: `// needs 🎤 MIC on in the top bar
shape(100, 0.1, 0.3)
  .scale(() => 0.5 + a.fft[0] * 4)
  .color(0.9, 0.5, 0.3)
  .out()`,
  },
  'h-screen': {
    title: 'Shared screen',
    desc: 'initScreen() captures a window and uses it as an image. The browser asks which one to share.',
    code: `// the browser asks which window to share
s0.initScreen()

src(s0)
  .pixelate(60, 40)
  .out()`,
  },
} });

/* ── STRUDEL · basics, rhythm, melody, sound, structure ──────────────── */
I18N.content('en', 'snippets', { items: {

  's-note': {
    title: 'First notes',
    desc: 'note() plays musical notes in sequence, one per beat.',
    code: `// notes in sequence, by letter name (c, d, e...)
note("c4 e4 g4 b4")
  .sound("triangle")`,
  },
  's-rest': {
    title: 'Notes and rests',
    desc: 'The tilde ~ is a rest; [ ] groups faster notes together.',
  },
  's-drums': {
    title: 'Drums',
    desc: 'sound() plays samples: bd=kick, sd=snare, hh=hi-hat. (Samples are needed: the first time it must be loaded online.)',
  },
  's-tempo': {
    title: 'Changing speed',
    desc: 'setcpm() sets the cycles per minute: higher = faster.',
  },

  's-sub': {
    title: 'Subdivisions',
    desc: 'Brackets [ ] split a beat into faster parts.',
  },
  's-star': {
    title: 'Repeats with *',
    desc: 'The asterisk repeats an event: hh*4 = four hi-hats in one beat.',
  },
  's-euclid': {
    title: 'Euclidean rhythms',
    desc: '(3,8) spreads 3 hits over 8 steps: rhythms from all over the world with two numbers.',
  },
  's-poly': {
    title: 'Several instruments together',
    desc: 'The comma layers patterns that play at the same time.',
  },
  's-rock': {
    title: 'Rock beat',
    desc: 'The basic rock beat: kick and snare taking turns, hi-hat in eighths. setcpm counts cycles, not bpm: for 100 bpm you write 100/4.',
    code: `// 100 bpm: one cycle = 4 beats, so 100/4
setcpm(100/4)
sound("[bd sd]*2, hh*8")`,
  },
  's-house': {
    title: 'House beat',
    desc: 'Four-on-the-floor kick, clap on 2 and 4, hi-hat on the offbeat: the basis of house and techno. It looks a lot like rock: many rhythms are reused across genres.',
    code: `// 124 bpm
setcpm(124/4)
sound("bd*4, [~ cp]*2, [~ hh]*4")`,
  },

  's-scale': {
    title: 'Musical scales',
    desc: 'n() picks degrees of the scale set with scale(): never a wrong note.',
  },
  's-chords': {
    title: 'Chords',
    desc: 'Notes inside [ , ] play together: a chord.',
  },
  's-arp': {
    title: 'Fast arpeggio',
    desc: 'fast() speeds up the pattern; off() adds a delayed, transposed copy.',
  },

  's-filter': {
    title: 'Moving filter',
    desc: 'lpf() cuts the highs; sine.range() makes it sweep slowly.',
  },
  's-adsr': {
    title: 'Envelope (attack/release)',
    desc: 'attack and release shape how the sound starts and dies away.',
  },
  's-fx': {
    title: 'Reverb and delay',
    desc: 'room() adds reverb, delay() adds delay: the sound repeats in time, like an echo.',
  },
  's-gain': {
    title: 'Dynamics (volume)',
    desc: 'gain() with a pattern makes accents: loud, soft, soft, loud...',
  },

  's-dollar': {
    title: 'Several patterns together with $:',
    desc: 'Without $: only the last pattern in the code plays, the others are ignored. With $: in front of each one they all play together: drums, bass and melody, each on its own line.',
    code: `// $: in front of EVERY pattern → they all play together
$: sound("bd*2, ~ sd")
$: sound("hh*8").gain("[.25 1]*4")
$: note("c2 ~ eb2 g2").sound("sawtooth").lpf(500)
// try writing _$: instead of $: to mute a voice`,
  },
  's-stack': {
    title: 'Layered track',
    desc: 'stack() layers several complete patterns: a little track.',
  },
  's-cat': {
    title: 'Alternating sections',
    desc: 'cat() alternates patterns, one cycle each: verse, chorus...',
  },
  's-sometimes': {
    title: 'Random variations',
    desc: 'sometimes() applies a change only some of the time: the pattern breathes.',
  },
} });

/* ── STRUDEL · theory ────────────────────────────────────────────────── */
I18N.content('en', 'snippets', { items: {

  't-semitoni': {
    title: 'Whole steps and half steps',
    desc: 'The half step (semitone) is the smallest step: from one piano key to the one next to it. # is sharp (half a step up), b is flat (half a step down). Two half steps make a whole step.',
    code: `// the chromatic scale: 12 half steps, every key from C to B
note("c4 c#4 d4 d#4 e4 f4 f#4 g4 g#4 a4 a#4 b4")
  .sound("triangle")`,
  },
  't-scala': {
    title: 'The major scale',
    desc: 'A scale is a choice of 7 notes out of the 12. The major scale always follows the same recipe of whole steps (W) and half steps (H): W W H W W W H.',
    code: `// c d e f g a b c — the half steps are e-f and b-c
note("c4 d4 e4 f4 g4 a4 b4 c5")
  .sound("triangle")`,
  },
  't-magg-min': {
    title: 'Major and minor',
    desc: 'The same degrees on two scales: one cycle in major (bright), one in minor (melancholy). The third, sixth and seventh degrees change.',
    code: `// <a b> alternates: one cycle C major, one cycle C minor
n("0 1 2 3 4 5 6 7")
  .scale("<C4:major C4:minor>")
  .sound("triangle")`,
  },
  't-durate': {
    title: 'Durations: long and short notes',
    desc: 'The at sign @ makes a note longer: c4@3 lasts three times as long as d4. If the weights add up to 8, each unit is an eighth note: @2 a quarter, @4 a half. Open ♪ SCORE to see it written out.',
    code: `// 3 + 1 + 2 + 2 = 8 eighths: dotted quarter, eighth, two quarters
note("c4@3 d4 e4@2 g4@2")
  .sound("triangle")`,
  },
  't-intervalli': {
    title: 'Intervals',
    desc: 'An interval is the distance between two notes. Played together, some distances “clash” (the second), others rest (third, fifth, octave).',
    code: `// C together with D, E, G, C: second, third, fifth, octave
note("[c4,d4] [c4,e4] [c4,g4] [c4,c5]")
  .sound("triangle")
  .slow(2)`,
  },
  't-triade': {
    title: 'Building a chord',
    desc: 'A chord (triad) is built by taking every other note of the scale: degrees 0, 2, 4 — root, third, fifth. First one at a time, then together.',
    code: `// three notes of the scale, then the same three together
n("0 2 4 [0,2,4]")
  .scale("C4:major")
  .sound("triangle")`,
  },
  't-accordo-mm': {
    title: 'Major and minor chord',
    desc: 'Between the major and the minor chord only one note changes, the middle one (the third), by a half step: E becomes E flat.',
    code: `// C major, then C minor: only e4 → eb4 changes
note("[c4,e4,g4] [c4,eb4,g4]")
  .sound("sawtooth")
  .lpf(900)
  .slow(2)`,
  },
  't-gradi': {
    title: 'The chords of the scale',
    desc: 'The same shape (0, 2, 4) moved onto each degree of the scale gives seven chords: I IV V major, ii iii vi minor, vii diminished. Every song in C draws from here.',
    code: `// add() moves the triad one degree up every cycle
n("[0,2,4]")
  .add(n("<0 1 2 3 4 5 6 7>"))
  .scale("C4:major")
  .sound("sawtooth")
  .lpf(900)`,
  },
  't-sigle': {
    title: 'Chords by name',
    desc: 'chord() reads chord symbols as in a songbook: C D E F G A B are the note names; “m” means minor. voicing() picks the notes and spreads them out well.',
    code: `// C, A minor, F, G — one chord per cycle
chord("<C Am F G>")
  .voicing()
  .sound("sawtooth")
  .lpf(900)`,
  },
  't-cadenza': {
    title: 'Tension and rest',
    desc: 'The chord on the fifth degree (dominant, here G7) creates tension; the one on the first (tonic, C) releases it. This movement, the cadence, is the engine of harmony.',
    code: `// G7 asks, C answers
chord("<G7 C>")
  .voicing()
  .sound("sawtooth")
  .lpf(900)`,
  },
  't-arpeggio': {
    title: 'Arpeggio',
    desc: 'To arpeggiate means to play the notes of a chord one at a time. arp() picks them by position: 0 is the lowest.',
    code: `// the same four chords, rolled up and down
chord("<C Am F G>")
  .voicing()
  .arp("0 1 2 3 4 3 2 1")
  .sound("triangle")`,
  },
  't-settime': {
    title: 'Seventh chords',
    desc: 'Adding a fourth note (the seventh) colors the chord: it’s the sound of jazz and bossa nova. ^7 is the major seventh, m7 the minor, 7 the dominant.',
    code: `// try removing the 7s and hear the difference
chord("<C^7 Am7 Dm7 G7>")
  .voicing()
  .sound("sawtooth")
  .lpf(900)`,
  },
  't-strati': {
    title: 'Bass, chords, melody',
    desc: 'Almost every song is made of three layers: the melody (what you sing), the chords (the color) and the bass, which plays the note that gives the chord its name (rootNotes).',
    code: `setcpm(30)
stack(
  // melody: degrees of the C scale
  n("<[4 2 0 2] [4 4 4@2] [3 1 ~ 1] [2 0 0@2]>")
    .scale("C5:major").sound("triangle"),
  // chords
  chord("<C C G7 C>").voicing()
    .sound("sawtooth").lpf(700).gain(0.3),
  // bass: the root of each chord
  chord("<C C G7 C>").rootNotes(2)
    .sound("sawtooth").lpf(300)
)`,
  },
  't-pentatonica': {
    title: 'Pentatonic scale',
    desc: 'Five notes with no half steps: they sound good together in any order. That’s why it’s the scale of improvisation, from the blues to Chinese music. Here the notes come out at random, and they never sound wrong.',
    code: `// irand(10) picks a random degree, 8 times per cycle
n(irand(10).segment(8))
  .scale("C4:pentatonic")
  .sound("triangle")
  .room(0.4)`,
  },
  't-modi': {
    title: 'Other scales, other colors',
    desc: 'Modes are scales built from the same notes but starting on a different degree: Dorian (folk, funk), Phrygian (flamenco), Lydian (dreamy), Mixolydian (rock).',
    code: `// the same climb from D, a different mode every cycle
n("0 1 2 3 4 5 6 7")
  .scale("<D4:dorian D4:phrygian D4:lydian D4:mixolydian>")
  .sound("triangle")`,
  },
  't-trasporre': {
    title: 'Transposing',
    desc: 'To transpose means to move everything by the same number of half steps: the melody stays recognizable, the key changes. Singers do it to fit a song to their voice.',
    code: `// the same figure in C, then 5 and 7 half steps up: F and G
note("c4 e4 g4 e4")
  .transpose("<0 5 7 5>")
  .sound("triangle")`,
  },
} });

/* ── STRUDEL · chord progressions, covers ────────────────────────────── */
I18N.content('en', 'snippets', { items: {

  'g-pop': {
    title: 'I–V–vi–IV: the pop progression',
    desc: 'C, G, A minor, F: the most used progression of the last fifty years (“Let It Be”, “No Woman No Cry”, “With or Without You”). Roman numerals are the degrees of the scale: lowercase = minor chord.',
    code: `setcpm(30)
// one line of chord symbols, two layers: chords and bass
chord("<C G Am F>").layer(
  x => x.voicing().sound("sawtooth").lpf(900).gain(0.4),
  x => x.rootNotes(2).struct("x*4").sound("sawtooth").lpf(300)
)`,
  },
  'g-giro-di-do': {
    title: 'I–vi–IV–V: the ’50s progression',
    desc: 'C, A minor, F, G: the progression of hundreds of songs from the ’50s and ’60s (in Italy it’s called the “giro di Do”). The same chords as the pop progression, in another order. The triplet arpeggio gives it the sway of a slow dance.',
    code: `setcpm(25)
chord("<C Am F G>").layer(
  // [1 2 3]*4 = four triplets on the middle notes of the chord
  x => x.voicing().arp("[1 2 3]*4").sound("triangle"),
  x => x.rootNotes(2).sound("sawtooth").lpf(300)
)`,
  },
  'g-minore': {
    title: 'vi–IV–I–V: the minor progression',
    desc: 'Again the same four chords, but starting from A minor: the mood gets darker (“Zombie” and “Despacito” use this progression in other keys). The 3+3+2 rhythm is the tresillo.',
  },
  'g-blues': {
    title: '12-bar blues',
    desc: 'Three seventh chords (I, IV, V) laid out over 12 bars: it’s the structure of blues and rock’n’roll. The “long-short” rhythm [x ~ x] is the shuffle.',
    code: `setcpm(28)
// 4 bars of C7 · 2 of F7, 2 of C7 · G7, F7, C7, G7
chord("<C7!4 F7!2 C7!2 G7 F7 C7 G7>").layer(
  x => x.voicing().struct("[x ~ x]*4")
    .sound("sawtooth").lpf(1000).gain(0.35),
  x => x.rootNotes(2).struct("[x ~ x]*4")
    .sound("sawtooth").lpf(300)
)`,
  },
  'g-jazz': {
    title: 'ii–V–I: the jazz cadence',
    desc: 'D minor seventh, G seventh, C major seventh: two tension chords that fall onto the tonic. It’s the brick almost every jazz standard is built from.',
    code: `setcpm(28)
chord("<Dm7 G7 C^7!2>").layer(
  // chords on the offbeat, like a jazz pianist
  x => x.voicing().struct("~ x ~ x")
    .sound("sawtooth").lpf(1000).gain(0.35),
  x => x.rootNotes(2).struct("x*4").sound("triangle")
)`,
  },
  'g-andalusa': {
    title: 'Andalusian cadence',
    desc: 'A minor, G, F, E: four chords stepping down. It’s the sound of flamenco, and the progression of “Hit the Road Jack”. The last chord, E major, wants to go back to A minor.',
  },
  'g-pachelbel': {
    title: 'Pachelbel’s Canon',
    desc: 'Eight chords, two per bar, written around 1680 and reused ever since in dozens of songs. On top, the line that steps down. Here in C (the original is in D).',
    code: `setcpm(20)
stack(
  // the melody steps down one note per chord
  note("<[e5 d5] [c5 b4] [a4 g4] [a4 b4]>").sound("triangle"),
  chord("<[C G] [Am Em] [F C] [F G]>").layer(
    x => x.voicing().sound("sawtooth").lpf(800).gain(0.3),
    x => x.rootNotes(2).sound("sawtooth").lpf(300)
  )
)`,
  },
  'g-quinte': {
    title: 'The circle of fifths',
    desc: 'Each chord falls a fifth to the next: A, D, G, C, F, B, E, A. It’s the progression of “Autumn Leaves” and “I Will Survive”: a chain of tensions resolving one into the other.',
  },

  'c-gioia': {
    title: 'Ode to Joy (Beethoven)',
    desc: 'The melody moves almost only by neighboring steps, which is why it’s so easy to sing. Underneath, two chords are enough: tonic (C) and dominant (G).',
    code: `setcpm(30)
stack(
  // melody: one bar for each [ ]
  note(\`<
    [e5 e5 f5 g5] [g5 f5 e5 d5] [c5 c5 d5 e5] [e5@3 d5 d5@4]
    [e5 e5 f5 g5] [g5 f5 e5 d5] [c5 c5 d5 e5] [d5@3 c5 c5@4]
  >\`).sound("triangle"),
  // harmony: one chord per bar
  chord("<C G C G C G C [G C]>").layer(
    x => x.voicing().sound("sawtooth").lpf(700).gain(0.3),
    x => x.rootNotes(2).sound("sawtooth").lpf(300)
  )
)`,
  },
  'c-martino': {
    title: 'Frère Jacques (round)',
    desc: 'A round (canon) is a melody that accompanies itself: a second voice sings the same notes, but later. off(2, …) makes it follow two bars behind, an octave higher.',
    code: `setcpm(30)
// !2 repeats the bar twice
note(\`<
  [c4 d4 e4 c4]!2
  [e4 f4 g4@2]!2
  [[g4 a4] [g4 f4] e4 c4]!2
  [c4 g3 c4@2]!2
>\`)
  .off(2, x => x.transpose(12))   // the second voice
  .sound("triangle")`,
  },
  'c-stellina': {
    title: 'Twinkle, Twinkle, Little Star',
    desc: 'The French tune Mozart wrote twelve variations on. It’s accompanied by the three main chords of the key: I (C), IV (F) and V (G).',
    code: `setcpm(25)
stack(
  note(\`<
    [c5 c5 g5 g5] [a5 a5 g5@2]
    [f5 f5 e5 e5] [d5 d5 c5@2]
  >\`).sound("triangle"),
  // [F C] = two chords in the same bar
  chord("<C [F C] [F C] [G C]>").layer(
    x => x.voicing().sound("sawtooth").lpf(700).gain(0.3),
    x => x.rootNotes(2).sound("sawtooth").lpf(300)
  )
)`,
  },
  'c-korobeiniki': {
    title: 'Korobeiniki (the Tetris theme)',
    desc: 'A 19th-century Russian folk song that became famous as the music of Tetris. It’s in A minor, but the E chord is major: that G# “pulls” toward A (harmonic minor scale).',
    code: `setcpm(35)
stack(
  note(\`<
    [e4@3 g#4 b4@2 g#4 e4] [a4@3 c5 e5@2 d5 c5]
    [b4@3 c5 d5@2 e5@2]    [c5@2 a4@2 a4@4]
    [f5@3 g5 a5@2 g5 f5]   [e5@3 f5 e5@2 d5 c5]
    [b4@3 c5 d5@2 e5@2]    [c5@2 a4@2 a4@4]
  >\`).sound("square").lpf(2500).gain(0.6),
  // bass: the root, bouncing by an octave
  chord("<E Am E Am Dm Am E Am>").rootNotes(2)
    .struct("x*8").transpose("[0 12]*4")
    .sound("triangle")
)`,
  },
  'c-bella-ciao': {
    title: 'Bella ciao',
    desc: 'Italian folk song. The melody starts “on the upbeat”: the three pickup notes (E A B) sit at the end of the previous bar, here at the end of the loop. Underneath, the bass on the strong beats and the chords on the offbeat.',
  },
  'c-elisa': {
    title: 'Für Elise (Beethoven)',
    desc: 'The whole theme swings between two chords arpeggiated by the left hand: A minor (tonic) and E major (dominant). It’s in 3/8: each cycle is a bar of six fast notes.',
    code: `setcpm(40)
stack(
  // right hand
  note(\`<
    [e5 d#5 e5 b4 d5 c5] [a4@2 ~ c4 e4 a4]
    [b4@2 ~ e4 g#4 b4]   [c5@2 ~ e4 e5 d#5]
    [e5 d#5 e5 b4 d5 c5] [a4@2 ~ c4 e4 a4]
    [b4@2 ~ e4 c5 b4]    [a4@2 ~ ~ e5 d#5]
  >\`).sound("triangle"),
  // left hand: A minor, E major, A minor
  note(\`<
    ~ [a2 e3 a3 ~ ~ ~] [e2 e3 g#3 ~ ~ ~] [a2 e3 a3 ~ ~ ~]
    ~ [a2 e3 a3 ~ ~ ~] [e2 e3 g#3 ~ ~ ~] [a2 e3 a3 ~ ~ ~]
  >\`).sound("triangle")
).room(0.4)`,
  },
  'c-bach': {
    title: 'Prelude in C (Bach)',
    desc: 'There’s no melody here: only chords, one per bar, played one note at a time. The harmony itself tells the story — listen to how each chord leans toward the next.',
    code: `setcpm(18)
// each [ , , ] is a five-note chord
note(\`<
  [c4,e4,g4,c5,e5] [c4,d4,a4,d5,f5]
  [b3,d4,g4,d5,f5] [c4,e4,g4,c5,e5]
  [c4,e4,a4,e5,a5] [c4,d4,f#4,a4,d5]
  [b3,d4,g4,d5,g5] [b3,c4,e4,g4,c5]
>\`)
  .arp("[0 1 2 3 4 2 3 4]*2")   // the order in which Bach rolls them out
  .sound("triangle")
  .room(0.5)`,
  },
  'c-grieg': {
    title: 'In the Hall of the Mountain King (Grieg)',
    desc: 'A theme in B minor that climbs step by step and falls back, over a bass alternating root and fifth. clip(0.5) shortens the notes like a pizzicato. In the original it speeds up nonstop: raise setcpm every time you play it!',
    code: `setcpm(30)
stack(
  note(\`<
    [b3 c#4 d4 e4 f#4 d4 f#4@2]  [f4 c#4 f4@2 e4 c4 e4@2]
    [b3 c#4 d4 e4 f#4 d4 f#4 b4] [a4 f#4 d4 f#4 a4@2 ~@2]
  >\`).clip(0.5).sound("sawtooth").lpf(1500),
  // bass: B–F# (root and fifth), then D–A
  note("<[b1 f#2 b1 f#2]!3 [d2 a2 d2 a2]>")
    .clip(0.5).sound("triangle")
)`,
  },
} });

/* ── STRUDEL · electronic genres ─────────────────────────────────────── */
I18N.content('en', 'snippets', { items: {

  'it-batteria': {
    title: 'Italo drums from segments',
    desc: 'Italo disco is the Italian dance music of the early ’80s: drum machines, bouncing basslines, melancholy synths. Here the drums are built by picking segments from the two breaks: the kick from dnb1, snare and hi-hat from xbreak1.',
    code: `setcpm(118/4)
// four-on-the-floor kick · snare on 2 and 4 · hi-hat on the offbeat
s("dnb1:0*4, [~ xbreak1:2]*2, [~ xbreak1:1]*4")`,
  },
  'it-basso': {
    title: 'The octave bass',
    desc: 'The trademark of italo: the bass plays nonstop sixteenths, jumping between a note and the same note an octave up. The notes come from the A minor, F, C, G progression: rootNotes takes the root of each chord.',
    code: `setcpm(118/4)
chord("<Am F C G>").rootNotes(1)
  .struct("x*16")              // sixteenths
  .add(note("[0 12]*8"))       // every other one, an octave up
  .sound("sawtooth")
  .lpf(800)
  .release(0.1)`,
  },
  'it-arpeggio': {
    title: 'Arpeggiator with delay',
    desc: 'The same chords rolled out in sixteenths, the way the arpeggiators of the synths of the time did. The delay repeats each note after a dotted eighth (0.38 seconds at 118 bpm): the repeats fall off the grid and the arpeggio seems to chase itself.',
    code: `setcpm(118/4)
chord("<Am F C G>")
  .voicing()
  .arp("[0 1 2 3]*4")
  .sound("square")
  .lpf(2000)
  .delay(0.4)
  .delaytime(0.38)       // a dotted eighth
  .delayfeedback(0.45)
  .gain(0.5)`,
  },
  'it-brano': {
    title: 'An italo disco track',
    desc: 'All together: segment drums, octave bass, arpeggio, a supersaw pad and the melody. Every four bars xbreak1 throws in a roll of four different snares (segments 2, 7, 10, 14). off() doubles the melody an octave up, a sixteenth later: a sparkling echo.',
    code: `setcpm(118/4)
stack(
  s("dnb1:0*4, [~ xbreak1:2]*2, [~ xbreak1:1]*4"),
  // the roll at the end of the fourth bar
  n("<~ ~ ~ [~@3 [2 7 10 14]]>").s("xbreak1"),
  chord("<Am F C G>").layer(
    x => x.rootNotes(1).struct("x*16").add(note("[0 12]*8"))
      .sound("sawtooth").lpf(800).release(0.1),
    x => x.voicing().arp("[0 1 2 3]*4").sound("square")
      .lpf(2000).delay(0.4).delaytime(0.38).gain(0.3),
    x => x.voicing().sound("supersaw").attack(0.3)
      .lpf(1500).gain(0.2)
  ),
  note(\`<
    [e5@2 d5 c5 a4@2 c5 d5] [c5@2 a4@2 ~ a4 c5 f5]
    [e5@2 d5 c5 g4@2 c5 d5] [d5@3 b4 g4@2 ~@2]
  >\`).sound("square").lpf(3000).gain(0.4)
    .off(1/16, x => x.add(note(12)).gain(0.15))
)`,
  },

  'dnb-break': {
    title: 'The two-step at 170',
    desc: 'Drum and bass was born in England in the early ’90s: super-fast breaks (170 bpm) and very deep basslines. At setcpm(170/4) one cycle is one bar and the first 8 segments of dnb1 fill it exactly: kick, kick, snare… it’s the two-step, the basic rhythm of the genre.',
    code: `setcpm(170/4)
// kick 0 1 5 · snare 2 6 · hi-hat 3 4 7
n("0 1 2 3 4 5 6 7")
  .s("dnb1")`,
  },
  'dnb-due-break': {
    title: 'Two drummers side by side',
    desc: 'Each break is two bars long: 8 segments in the first, 8 in the second. Here the two breaks we have take turns, two bars each. Same tempo, two different drummers: xbreak1 is more syncopated, with the kick coming early.',
  },
  'dnb-edit': {
    title: 'Re-editing the break',
    desc: 'Drum and bass producers never leave the break as it is: they repeat a segment in sixteenths, move a kick, add a roll at the end. The < > change the last eighth every bar. cut(1) silences the old segment when the new one starts.',
  },
  'dnb-jungle': {
    title: 'Jungle',
    desc: 'Jungle is the mother of drum and bass: chopped-up breaks like in the IDM beat tutorial, over a slow bassline that comes from reggae. Four bars of re-edited xbreak1, with a few segments that randomly stutter (ply) or play backwards.',
    code: `setcpm(170/4)
stack(
  n(\`<
    [0 1 2 3 4 5 6 7]    [8 9 10 11 12 13 [14 14] 15]
    [0 1 2 3 0 1 2 [7 7]] [8 9 10 11 13 12 [14*4]@2]
  >\`).s("xbreak1")
    .sometimesBy(0.15, x => x.ply(2))
    .sometimesBy(0.1, x => x.speed(-1))
    .cut(1),
  // the bassline: one long note, then two short ones
  note("<[d2@3 ~] [d2@3 f2] [c2@3 ~] [a1@2 c2@2]>")
    .sound("triangle")
)`,
  },
  'dnb-reese': {
    title: 'The reese bass',
    desc: 'The most famous bass in drum and bass: two nearly identical sawtooth waves, one just slightly higher (0.2 semitones). Played together they “beat” and the sound wobbles, like an engine. The filter opening and closing makes it growl.',
    code: `setcpm(170/4)
note("<d2!3 [f2 c2]>")
  .add(note("0,0.2"))      // two nearly identical notes, together
  .sound("sawtooth")
  .lpf(sine.range(200, 1200).slow(4))
  .lpq(6)
  .gain(0.6)`,
  },
  'dnb-liquid': {
    title: 'A liquid track',
    desc: 'Liquid is the softest drum and bass: the break runs at 170 bpm, but chords and bass move slowly, one chord every two bars. Over the dnb1 break, a layer of hi-hats picked at random from the two folders.',
    code: `setcpm(170/4)
stack(
  n("0 1 2 [3 3] 4 5 6 <7 [7 7]>").s("dnb1").cut(1),
  // random hi-hats: | chooses, ? sometimes stays silent
  s("[dnb1:3|dnb1:11|xbreak1:1|xbreak1:9]*16?")
    .hpf(4000).gain(rand.range(0.1, 0.4)).pan(rand).cut(2),
  chord("<Dm9 Bb^7 Gm9 A7>").slow(2).layer(
    x => x.voicing().sound("triangle").attack(0.4).release(2)
      .room(0.7).gain(0.4),
    x => x.rootNotes(2).struct("x ~ ~ ~ ~ ~ x ~")
      .sound("sawtooth").lpf(300)
  )
)`,
  },

  'tk-cassa': {
    title: 'Four-on-the-floor kick',
    desc: 'Techno was born in Detroit in the ’80s and exploded in Berlin in the ’90s: machines, repetition, hypnosis. Everything starts from the kick on every beat. Here it’s segment 0 of dnb1, played a bit slower so it sounds deeper. On top, an offbeat hi-hat and the sixteenths of xbreak1.',
    code: `setcpm(130/4)
stack(
  s("dnb1:0*4").speed(0.85),            // kick
  s("[~ dnb1:4]*4").hpf(6000),          // offbeat hi-hat
  s("xbreak1:3*16").gain("[0.5 1]*8")   // sixteenths, one soft one loud
)`,
  },
  'tk-toploop': {
    title: 'The break as a “top loop”',
    desc: 'A techno DJ trick: put a whole break over the kick, filtered. hpf(3000) removes the lows of the break, so its kick doesn’t get in the way of ours and only hi-hats and ghost notes remain. At 130 bpm each segment lasts longer than its slot in the cycle: cut(1) chops it and the break turns tight.',
  },
  'tk-acid': {
    title: 'Acid techno',
    desc: 'The acid bassline: the sound of the Roland TB-303, a sawtooth wave with the filter resonance turned way up (lpq). Here the cutoff opens very slowly, over 16 bars: it’s the tension that makes hands go up on the dance floor. shape() dirties it up a bit.',
  },
  'tk-dub': {
    title: 'Dub techno',
    desc: 'A single chord, played on the offbeat and drowned in delay: it’s dub techno, born in Berlin in the ’90s. The delay (a dotted eighth, 0.36 s at 124 bpm) repeats it forever, while the cutoff opens and closes very slowly.',
  },
  'tk-industriale': {
    title: 'Industrial techno',
    desc: 'The hardest techno: a distorted kick (shape) and a break reduced to noise. crush(4) leaves the sound only 4 bits, like a forty-year-old game console: the detail disappears, the grain remains. Every now and then a segment doubles (ply).',
  },
  'tk-brano': {
    title: 'A techno track',
    desc: 'Kick, hi-hat, top loop, acid bassline. In techno the track changes very little: every eight bars the filter of the top loop opens (hpf from 3000 to 200) and xbreak1 comes in whole, then goes thin again. Let it run for a long time: the 303’s filter does the rest.',
  },

  'th-groove': {
    title: 'The tech house groove',
    desc: 'Tech house sits halfway: the straight kick of techno, the clap and shuffle of house. swingBy(1/3, 8) delays each offbeat sixteenth a little: the hi-hats stop marching and start dancing.',
    code: `setcpm(125/4)
stack(
  s("dnb1:0*4").speed(0.85),          // kick
  s("~ cp ~ cp"),                     // clap on 2 and 4
  s("[~ dnb1:4]*4").hpf(6000),        // offbeat hi-hat
  s("xbreak1:3*16")                   // sixteenths…
    .gain("[0.4 0.8]*8")
    .swingBy(1/3, 8)                  // …with shuffle
)`,
  },
  'th-basso': {
    title: 'The rolling bass',
    desc: 'The tech house bassline almost never touches the beat: it plays between one kick and the next, so the two don’t step on each other’s toes. Short notes (release), a low cutoff and the same shuffle as the hi-hats.',
  },
  'th-perc': {
    title: 'Percussion from the break',
    desc: 'From the break you take only the hi-hats and ghost notes (the light segments of xbreak1), picked at random and filtered: they become a shaker that never repeats the same way. degradeBy(0.4) silences almost half of them. Underneath, two perc hits play the bongos.',
  },
  'th-stab': {
    title: 'The stab',
    desc: 'A “stab” is a very short chord, a jab. Here A minor ninth, in two rhythms that alternate bar by bar, with a bit of delay (a dotted eighth: 0.36 s at 125 bpm) and reverb.',
  },
  'th-brano': {
    title: 'A tech house track',
    desc: 'Groove, bass, percussion and stab together. mask("<1!7 0>") turns off kick and bass in the eighth bar: a lightning breakdown that makes you crave the drop, when the kick comes back in on the next bar. It’s the oldest trick on the dance floor.',
  },

  'idm-dadi': {
    title: 'Rolling dice with the break',
    desc: 'irand(16) rolls a 16-sided die: every sixteenth plays a random segment of xbreak1. But pure chance has no shape. ribbon(7, 2) takes two bars of chance and loops them: the rhythm becomes a recognizable pattern. Change the 7 to pick two others.',
  },
  'idm-drill': {
    title: 'Drill ’n’ bass',
    desc: 'In the mid-’90s Aphex Twin and Squarepusher take drum and bass and push it over the top: rolls of 8 and 16 hits inside a single eighth. ply() repeats each segment as many times as the number says, and the number changes every bar. In the last one the roll also rises in pitch.',
  },
  'idm-poliritmo': {
    title: 'Three loops that never meet',
    desc: 'Three voices on a grid of 16 sixteenths, but each one loops over its own length: the kick every 5 steps, the snare every 7, the hi-hats every 3. The braces { }%16 do exactly this. The three loops line up again only after 105 steps: the rhythm seems to keep changing, even though no voice ever changes.',
    code: `setcpm(95/4)
stack(
  n("{0 ~ ~ 8 ~}%16").s("xbreak1"),          // kick: loop of 5
  n("{~ ~ 2 ~ ~ ~ 10}%16").s("dnb1"),        // snare: loop of 7
  n("{3 6 9}%16").s("xbreak1")               // hi-hat: loop of 3
    .gain(0.5).pan(sine.slow(4))
)`,
  },
  'idm-nastro': {
    title: 'Worn-out tape',
    desc: 'The other side of IDM, the Boards of Canada side: slow, nostalgic, like an old cassette. The break at its original tempo, darkened (lpf) and grainy (crush). The pad wavers in pitch with vib and vibmod: it’s the “wow” of a tape slowing down and catching up.',
    code: `setcpm(85/4)
stack(
  n(run(16)).s("xbreak1")
    .lpf(2000)
    .crush(8),
  chord("<F^7 Em7>").slow(2).voicing()
    .sound("sawtooth")
    .attack(0.5).release(2)
    .lpf(900)
    .vib(0.7).vibmod(0.2)     // the pitch wavers gently
    .room(0.6)
    .gain(0.4)
)`,
  },
  'idm-acid': {
    title: 'Random acid',
    desc: 'A 303 that improvises: irand(8) picks the notes from the A minor pentatonic, so it never sounds wrong. perlin is a “smooth” randomness that glides instead of jumping: it moves the cutoff like a hand on the knob. Underneath, dnb1 with a roll in the last bar.',
  },
} });

/* ── categories and tags ─────────────────────────────────────────────── */
I18N.content('en', 'snippets', {
  cats: {
    'Base':            'Basics',
    'Trasformazioni':  'Transformations',
    'Colore':          'Color',
    'Combinazioni':    'Combinations',
    'Feedback':        'Feedback',
    'Camera e suono':  'Camera and sound',
    'Ritmo':           'Rhythm',
    'Melodia':         'Melody',
    'Suono':           'Sound',
    'Struttura':       'Structure',
    'Teoria':          'Theory',
    'Giri di accordi': 'Chord progressions',
    'Cover':           'Covers',
    'Italo disco':     'Italo disco',
    'Techno':          'Techno',
    'Tech house':      'Tech house',
    'Drum and bass':   'Drum and bass',
    'IDM':             'IDM',
  },
  tags: {
    hydra: {
      'primi passi': ['first steps', 'The examples to start from: a single source, a few numbers to change.'],
      'forme':       ['shapes',      'Polygons and circles drawn with shape().'],
      'onde':        ['waves',       'Scrolling stripes of color, made by osc().'],
      'colore':      ['color',       'Hues, red-green-blue channels, negatives and rainbows.'],
      'movimento':   ['motion',      'The image moves by itself: it turns, scrolls, changes over time.'],
      'organico':    ['organic',     'Soft, irregular shapes, like clouds, smoke or liquids.'],
      'simmetria':   ['symmetry',    'Mirrors and repeats: kaleidoscopes and grids of copies.'],
      'deformare':   ['warp',        'The image bends, gets grainy or shifts pixel by pixel.'],
      'mescolare':   ['mix',         'Two sources combined into one: blended, subtracted, cut out.'],
      'eco':         ['echo',        'Feedback: the output goes back into the chain and leaves trails, tunnels, fractals.'],
      'webcam':      ['webcam',      'Uses the webcam: the browser asks for permission the first time.'],
      'microfono':   ['microphone',  'Reacts to sound: needs 🎤 MIC on in the top bar.'],
      'schermo':     ['screen',      'Captures a window of the computer and uses it as an image.'],
      'mouse':       ['mouse',       'You draw by moving the mouse over the screen.'],
    },
    strudel: {
      'primi passi':   ['first steps',   'The examples to start from: a single line, a single idea.'],
      'batteria':      ['drums',         'Beats made with drum samples: kick, snare, hi-hat, clap.'],
      'ritmo':         ['rhythm',        'How beats are divided and repeated.'],
      'melodia':       ['melody',        'A line of notes to sing.'],
      'scale':         ['scales',        'The notes to choose from: major, minor, pentatonic, modes.'],
      'accordi':       ['chords',        'Several notes played together, and how they follow one another.'],
      'arpeggio':      ['arpeggio',      'The notes of a chord played one at a time.'],
      'basso':         ['bass',          'The low line that holds up the harmony.'],
      'strati':        ['layers',        'Several parts playing together: drums, bass, chords, melody.'],
      'timbro':        ['timbre',        'How a note sounds: filter, envelope, reverb, delay, volume.'],
      'variazione':    ['variation',     'The pattern changes from one cycle to the next.'],
      'casuale':       ['random',        'Chance decides part of it: every listen is a bit different.'],
      'break':         ['break',         'A drum break cut into segments (xbreak1, dnb1) and put back together.'],
      'pop':           ['pop',           'The chord progressions of pop music.'],
      'rock':          ['rock',          'The basic rock beat.'],
      'blues':         ['blues',         'The blues and its scales.'],
      'jazz':          ['jazz',          'Seventh chords and jazz cadences.'],
      'classica':      ['classical',     'Pieces and harmonies from classical music.'],
      'popolare':      ['folk',          'Traditional songs and folk music.'],
      'elettronica':   ['electronic',    'All the electronic music genres together: from italo disco to IDM.'],
      'italo disco':   ['italo disco',   'The Italian dance music of the early ’80s: octave basslines, arpeggios, melancholy synths.'],
      'house':         ['house',         'Four-on-the-floor kick and clap: house and tech house, from the Chicago clubs onward.'],
      'techno':        ['techno',        'Detroit and Berlin: four-on-the-floor kick, repetition, machines.'],
      'acid':          ['acid',          'The sound of the Roland TB-303: a bassline with so much resonance it “squeaks”.'],
      'drum and bass': ['drum and bass', 'Super-fast breaks at 170 bpm and deep basslines, jungle included.'],
      'idm':           ['idm',           'IDM the Aphex Twin way: broken-down breaks, rolls, controlled chaos, fragile melodies.'],
    },
  },
});
