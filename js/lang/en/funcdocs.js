/* English · the help-mode glossary (translates js/funcdocs.js).
   Same keys as the Italian; each entry is ['signature', 'explanation'].
   The signature must start like the Italian one (the test checks the part
   before the first bracket), so signatures without brackets stay as they are. */

I18N.content('en', 'funcdocs', {

  /* ── HYDRA · visuals ── */
  hydra: {
    /* sources: they make a starting image */
    osc:      ['osc(frequency, speed, color)', 'Makes waves of light that scroll across the screen. The first number says how many waves you see, the second how fast they move, the third how colorful they are.'],
    noise:    ['noise(scale, speed)', 'Makes random moving "clouds", like a storm of light. Higher numbers = smaller details and faster movement.'],
    voronoi:  ['voronoi(scale, speed, blending)', 'Makes irregular cells, like giraffe skin or moving soap bubbles.'],
    shape:    ['shape(sides, size, smoothing)', 'Draws a geometric shape: 3 = triangle, 4 = square, 100 = almost a circle. The smoothing softens the edge.'],
    gradient: ['gradient(speed)', 'Makes a color gradient that changes over time.'],
    solid:    ['solid(red, green, blue)', 'Fills the screen with a single color. The three numbers go from 0 to 1: solid(1, 0, 0) is pure red.'],
    src:      ['src(output)', 'Takes the image back from an output (e.g. src(o0)): it is used for feedback, an image looking at itself in the mirror.'],

    /* external sources: webcam, screen, microphone */
    initCam:   ['s0.initCam()', 'Switches on the webcam and makes it available as a source: afterwards you can use it with src(s0). The browser asks for your permission. The image stays on this computer: it is never recorded or sent anywhere.'],
    initScreen:['s0.initScreen()', 'Captures a window or a screen and turns it into a source: then you use it with src(s0). The browser asks which window to share.'],
    s0:        ['s0', 'Hydra\'s first "external input": you attach the webcam (s0.initCam()) or the screen (s0.initScreen()) to it, then use it in the chain with src(s0). There are also s1, s2, s3.'],
    a:         ['a.fft[0]', 'The microphone, if you have switched on 🎤 MIC in the top bar. a.fft[0] is the bass, a.fft[3] the treble; the values go roughly from 0 to 1. Use it inside an arrow function: .rotate(() => a.fft[0] * 3).'],
    fft:       ['a.fft[0…3]', 'How much energy there is in one frequency band of the sound picked up by the microphone: 0 bass, 1 low-mids, 2 high-mids, 3 treble. It makes visuals react to music.'],

    /* geometry: they move and warp the image */
    rotate:   ['.rotate(angle, speed)', 'Rotates the image. With an arrow function it animates: .rotate(() => time * 0.1).'],
    scale:    ['.scale(factor)', 'Enlarges (>1) or shrinks (<1) the image.'],
    pixelate: ['.pixelate(x, y)', 'Turns the image into a mosaic of big pixels: fewer pixels = a more "retro" look.'],
    repeat:   ['.repeat(x, y)', 'Repeats the image in a grid: repeat(3, 3) makes nine copies.'],
    repeatX:  ['.repeatX(times)', 'Repeats the image horizontally only.'],
    repeatY:  ['.repeatY(times)', 'Repeats the image vertically only.'],
    kaleid:   ['.kaleid(slices)', 'Kaleidoscope effect: mirrors the image into as many slices as you say.'],
    scroll:   ['.scroll(x, y)', 'Scrolls the image horizontally and vertically.'],
    scrollX:  ['.scrollX(amount, speed)', 'Scrolls the image horizontally, endlessly if you give it a speed.'],
    scrollY:  ['.scrollY(amount, speed)', 'Scrolls the image vertically, endlessly if you give it a speed.'],

    /* color */
    color:      ['.color(red, green, blue)', 'Multiplies the colors of the image channel by channel: color(1, 0, 0) keeps only the red.'],
    brightness: ['.brightness(amount)', 'Brightens (positive values) or darkens (negative values) the image.'],
    contrast:   ['.contrast(amount)', 'Increases (>1) or reduces (<1) the contrast between lights and darks.'],
    saturate:   ['.saturate(amount)', 'Makes the colors more vivid (>1) or duller, down to black and white (0).'],
    hue:        ['.hue(amount)', 'Shifts every color along the rainbow: red becomes green, green becomes blue…'],
    invert:     ['.invert(amount)', 'Inverts the colors, like a photographic negative.'],
    luma:       ['.luma(threshold, smoothing)', 'Makes the dark areas transparent: only what is brighter than the threshold stays visible.'],
    thresh:     ['.thresh(threshold, smoothing)', 'Black or white, nothing in between: white above the threshold, black below.'],
    posterize:  ['.posterize(levels, gamma)', 'Reduces the colors to a few levels, like a screen-printed poster.'],
    colorama:   ['.colorama(amount)', 'Cycles the colors psychedelically. Use in moderation… or don\'t!'],

    /* blends: they combine two images */
    add:    ['.add(source, amount)', 'Adds another image to this one: the lights pile up.'],
    sub:    ['.sub(source, amount)', 'Subtracts another image from this one.'],
    mult:   ['.mult(source, amount)', 'Multiplies the two images: only the areas that are bright in both stay bright.'],
    diff:   ['.diff(source)', 'Shows the difference between the two images: where they match it turns black.'],
    blend:  ['.blend(source, amount)', 'Blends the two images, like a crossfade between two projectors.'],
    layer:  ['.layer(source)', 'Lays another image on top of this one, wherever it is not transparent.'],
    mask:   ['.mask(source)', 'Uses another image as a mask: this one stays visible only where the mask is bright.'],

    /* modulations: one image warps the other */
    modulate:         ['.modulate(source, amount)', 'Uses another image to warp this one: the bright areas "push" the pixels. It is the secret behind lots of liquid effects.'],
    modulateRotate:   ['.modulateRotate(source, amount)', 'Another image controls the rotation, point by point.'],
    modulateScale:    ['.modulateScale(source, amount)', 'Another image controls the zoom, point by point.'],
    modulatePixelate: ['.modulatePixelate(source, amount)', 'Another image controls the size of the pixels, point by point.'],
    modulateKaleid:   ['.modulateKaleid(source, slices)', 'A kaleidoscope warped by another image.'],
    modulateScrollX:  ['.modulateScrollX(source, amount)', 'Another image controls the horizontal scrolling.'],
    modulateScrollY:  ['.modulateScrollY(source, amount)', 'Another image controls the vertical scrolling.'],
    modulateHue:      ['.modulateHue(source, amount)', 'Another image shifts the colors, point by point.'],
    modulateRepeat:   ['.modulateRepeat(source, x, y)', 'Another image controls the grid repetition.'],

    /* outputs and global variables */
    out:    ['.out(output)', 'Sends the result to the screen. Without .out() at the end of the chain you see nothing!'],
    render: ['render(output)', 'Chooses which output to show on screen: render(o0), or render() to see all four at once.'],
    o0:     ['o0 … o3', 'Hydra\'s four video outputs: four "canvases" to paint on. You usually use o0; the others are for composing and mixing.'],
    o1:     ['o0 … o3', 'Hydra\'s four video outputs: four "canvases" to paint on. You usually use o0; the others are for composing and mixing.'],
    o2:     ['o0 … o3', 'Hydra\'s four video outputs: four "canvases" to paint on. You usually use o0; the others are for composing and mixing.'],
    o3:     ['o0 … o3', 'Hydra\'s four video outputs: four "canvases" to paint on. You usually use o0; the others are for composing and mixing.'],
    time:   ['time', 'Time passing, in seconds. Inside an arrow function it animates any parameter: .rotate(() => time * 0.2).'],
    mouse:  ['mouse.x · mouse.y', 'The position of the mouse on the screen: use it to control parameters by hand.'],
    speed:  ['speed = number', 'The global speed of all Hydra animations: 2 = double speed, 0.5 = half.'],
    hush:   ['hush()', 'Stops everything and turns the screen black. It is what the STOP button does.'],

    /* frame timing and events */
    update: ['update = () => { … }', 'A function Hydra runs before every frame, about 60 times a second: inside it you change your variables (counters, positions, random steps). ■ STOP switches it off.'],
    bpm:    ['bpm = number', 'Hydra\'s beats per minute (usually 30): they decide how quickly lists, like [3, 4, 6], move from one value to the next. STOP sets it back to 30.'],
    onpointerup:   ['onpointerup = () => { … }', 'Listener: the browser runs the function when you release the mouse button (or lift your finger). A click on the text counts too: click on the visual. ■ STOP switches it off.'],
    onpointerdown: ['onpointerdown = () => { … }', 'Listener: the browser runs the function when you press the mouse button (or touch with your finger). Together with onpointerup you know whether it is held down. ■ STOP switches it off.'],
    onkeydown:     ['onkeydown = (evento) => { … }', 'Listener: the browser runs the function when you press a key; evento.key (the event\'s key) says which one (\'a\', \'ArrowLeft\'…). Click on the visual first, or the keys also end up in the code. ■ STOP switches it off.'],
    innerWidth:    ['innerWidth · innerHeight', 'Width and height of the window, in pixels (they are window.innerWidth and window.innerHeight). innerHeight / innerWidth is the screen\'s proportion: with .scale(1, …) it makes circles round again.'],

    /* microphone settings */
    show:      ['a.show() · a.hide()', 'Shows (or hides) the microphone bars in the bottom right corner: one per band, from bass to treble.'],
    setBins:   ['a.setBins(bands)', 'How many bands to split the sound into (usually 4): with a.setBins(8), a.fft goes from a.fft[0] to a.fft[7].'],
    setSmooth: ['a.setSmooth(calm)', 'How much to smooth the microphone numbers, from 0 (each frame on its own, the visual jitters) to almost 1 (very slow).'],
    setCutoff: ['a.setCutoff(level)', 'The floor: sound below this level counts as zero. Raise it if the visual moves even in silence.'],
    setScale:  ['a.setScale(level)', 'The ceiling: how much sound, above the setCutoff floor, it takes to reach 1. Lower it if the music is quiet and the visual barely moves. In a.show() it is the thin line at the top.'],
  },

  /* ── STRUDEL · sound ── */
  strudel: {
    sound:  ['sound("pattern")', 'Chooses which sounds to use and in what order: sound("bd hh sd hh") plays four hits per cycle. It is the starting function for almost everything.'],
    s:      ['s("pattern")', 'Short for sound(): chooses the sounds to play.'],
    note:   ['note("pattern")', 'Plays musical notes: names like "c3 e3 g3" or numbers. Pair it with .sound() to choose the timbre.'],
    n:      ['n("pattern")', 'A number that chooses: which variant of a sample (with .sound) or which degree of the scale (with .scale).'],
    stack:  ['stack(pattern1, pattern2, …)', 'Plays several patterns at the same time, layered: this is how you build a piece with several instruments.'],
    seq:    ['seq(a, b, …)', 'Puts the elements in sequence inside one cycle, dividing the time into equal parts.'],
    cat:    ['cat(a, b, …)', 'Alternates the elements: one per cycle, taking turns.'],
    setcpm: ['setcpm(cycles per minute)', 'The global speed: how many cycles per minute. setcpm(30) = one cycle every 2 seconds.'],

    /* time transformations */
    fast:  ['.fast(times)', 'Speeds the pattern up: .fast(2) plays it twice per cycle.'],
    slow:  ['.slow(times)', 'Slows the pattern down: .slow(2) spreads it over two cycles.'],
    rev:   ['.rev()', 'Plays the pattern backwards, from the last event to the first.'],
    ply:   ['.ply(times)', 'Repeats each event N times in a row: from "bd sd" to "bd bd sd sd".'],
    off:   ['.off(delay, change)', 'Adds a copy of the pattern shifted in time and changed: .off(0.125, x => x.speed(2)) makes a higher-pitched echo.'],
    every: ['.every(N, change)', 'Every N cycles it applies a change: .every(4, rev) reverses the pattern one cycle in four.'],
    struct:['.struct("x ~ x x")', 'Imposes a rhythm on the pattern: the "x"s play, the "~"s stay silent.'],
    euclid:['.euclid(hits, steps)', 'Euclidean rhythm: spreads the hits out as evenly as possible. euclid(3, 8) is a rhythm you will hear all over the world.'],

    /* randomness */
    sometimes: ['.sometimes(change)', 'Applies the change at random, about half the time: .sometimes(x => x.speed(2)).'],
    often:     ['.often(change)', 'Like sometimes, but more often (about 3 times in 4).'],
    rarely:    ['.rarely(change)', 'Like sometimes, but rarely (about 1 time in 4).'],
    degrade:   ['.degrade()', 'Removes events at random, about half of them: the pattern gets more "holey" and alive.'],
    degradeBy: ['.degradeBy(probability)', 'Removes events at random with the probability you choose: 0.2 removes one in five.'],
    choose:    ['choose(a, b, …)', 'Picks one of the values at random, every time.'],

    /* sound and mixing */
    gain:  ['.gain(volume)', 'The volume: 1 is normal, 0.5 is half, 0 is silence.'],
    pan:   ['.pan(position)', 'The stereo position: 0 = left, 0.5 = center, 1 = right. Try .pan(sine) to make it sway.'],
    speed: ['.speed(speed)', 'The playback speed of the sample: 2 = double (higher), 0.5 = half (lower), -1 = backwards.'],
    bank:  ['.bank("name")', 'Chooses the sound bank, that is which drum machine to use for bd, sd, hh…'],
    jux:   ['.jux(change)', 'Instant stereo: the original pattern on the left, the changed version on the right. A classic: .jux(rev).'],

    /* filters and effects */
    lpf:    ['.lpf(frequency)', 'Low-pass filter: cuts the highs above the frequency. Low values = a dark, muffled sound.'],
    cutoff: ['.cutoff(frequency)', 'Another name for the low-pass filter: cuts the highs above the frequency.'],
    hpf:    ['.hpf(frequency)', 'High-pass filter: cuts the lows below the frequency. High values = a thin sound.'],
    vowel:  ['.vowel("a e i o u")', 'Vowel filter: makes the sound "talk" like a mouth changing shape.'],
    room:   ['.room(amount)', 'Reverb: the sound of a room. Higher = a bigger room.'],
    delay:  ['.delay(amount)', 'Echo: the sound repeats, fading away.'],
    crush:  ['.crush(bits)', 'Lowers the digital quality of the sound: 4 sounds "broken" and lo-fi, 16 almost clean.'],
    chop:   ['.chop(slices)', 'Cuts the sample into N slices and plays them in sequence: great for chopping up long sounds.'],

    /* envelope */
    attack:  ['.attack(seconds)', 'How long the sound takes to reach full volume: high = a soft entrance.'],
    decay:   ['.decay(seconds)', 'How quickly the sound drops from its peak to the sustain level.'],
    sustain: ['.sustain(level)', 'The volume the sound stays at while the note is held.'],
    release: ['.release(seconds)', 'How long the sound takes to die away when the note ends.'],

    /* pitches and scales */
    scale: ['.scale("note:mode")', 'Tunes the numbers of n() to a scale: with .scale("C:minor"), n("0 2 4") plays C, Eb, G. Impossible to hit a wrong note!'],
    add:   ['.add(amount)', 'Adds a value to the notes or numbers of the pattern: .add(12) transposes up an octave.'],
    sub:   ['.sub(amount)', 'Subtracts a value from the notes or numbers of the pattern.'],
    range: ['.range(min, max)', 'Rescales a signal (like sine) between two values: sine.range(200, 2000) to make a filter breathe.'],

    /* harmony */
    chord:     ['chord("C Am F G")', 'Writes chords as lead-sheet symbols: C = C major, Am = A minor, G7 = G seventh, C^7 = C major seventh. On its own it makes no sound: follow it with .voicing() (the chord) or .rootNotes() (the bass).'],
    voicing:   ['.voicing()', 'Turns the symbols of chord() into real notes, choosing a layout that sounds good and moves as little as possible from one chord to the next, as a pianist would.'],
    rootNotes: ['.rootNotes(octave)', 'From each symbol of chord() it takes only the root, the note that gives the chord its name: it is the bass part. The number is the octave: 2 is low.'],
    arp:       ['.arp("0 1 2 1")', 'Arpeggio: plays the notes of a chord one at a time. The numbers are positions inside the chord: 0 is the lowest note.'],
    transpose: ['.transpose(semitones)', 'Shifts every note by the same number of semitones: 12 is an octave up, 7 a fifth. The melody stays the same, the key changes.'],
    layer:     ['.layer(a => …, b => …)', 'Derives several layers from the same pattern that play together, each with its own change: for example chords and bass from the same line of chord symbols.'],
    segment:   ['.segment(times)', 'Samples a continuous signal (like irand or sine) N times per cycle, turning it into separate events.'],
    clip:      ['.clip(fraction)', 'Shortens each note: .clip(0.5) makes it last half its space, like staccato or pizzicato.'],

    /* control signals */
    sine:   ['sine', 'A slow wave that rises and falls smoothly between 0 and 1: connect it to a parameter, e.g. .pan(sine).'],
    saw:    ['saw', 'A signal that rises from 0 to 1 and starts again from the bottom, like a ramp.'],
    square: ['square', 'A signal that snaps between 0 and 1, on/off.'],
    tri:    ['tri', 'A signal that rises and falls in a straight line, like a triangle.'],
    irand:  ['irand(maximum)', 'A random whole number from 0 up to the maximum, always different: n(irand(8)) picks surprise notes.'],

    /* control */
    hush:    ['hush()', 'Silence: stops all the music. It is what the STOP button does.'],
    silence: ['silence', 'An empty pattern: handy for muting a single voice inside a stack.'],

    /* names of the drum sounds */
    bd:  ['"bd" · bass drum', 'The kick drum: the deep, low hit, the heartbeat of the rhythm.'],
    sd:  ['"sd" · snare drum', 'The snare: the sharp hit that usually answers the kick.'],
    hh:  ['"hh" · hi-hat', 'The closed hi-hat: the metallic "tick" that keeps time.'],
    oh:  ['"oh" · open hi-hat', 'The open hi-hat: like hh but left ringing, "tssss".'],
    cp:  ['"cp" · clap', 'A handclap.'],
    rim: ['"rim" · rimshot', 'A hit on the rim of the snare: a wooden "tock".'],
    lt:  ['"lt" · low tom', 'The low tom.'],
    mt:  ['"mt" · mid tom', 'The mid tom.'],
    ht:  ['"ht" · high tom', 'The high tom.'],
  },
});
