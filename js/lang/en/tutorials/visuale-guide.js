/* ════════════════════════════════════════════════════════════════════════
   EN · tutorials/visuale-guide.js — Visuals, part two: from the Hydra guides

   Translates js/tutorials/visuale-guide.js (texture, javascript, generative,
   tempo, interazione, lente). Same steps and paragraphs as the Italian.

   Code: only the comments and the names the code declares itself are
   translated, always with the English name from RENAME.en in
   test/i18n.test.js (spicchi → wedges, lati → sides…). Hydra's own names
   (update, time, bpm…) never change.
   ════════════════════════════════════════════════════════════════════════ */

I18N.content('en', 'tutorials', { items: {

/* ╔══ VISUALS · Textures ═════════════════════════════════════════════ */
texture: {
  title: 'Textures',
  desc: 'Stripes, rings, polka dots, checkerboards, spots and stained glass: repeating patterns built with osc, shape, noise and voronoi. From the “Textures” chapter of the Hydra book.',
  steps: [
    {
      title: 'Sharp stripes: thresh',
      text: [
        "Hi! In this tutorial we build **textures**: patterns that repeat, like the fabric of a T-shirt, bathroom tiles or the spots on a cow.",
        "We always start from the stripes of `osc()`. But its stripes are **soft**: they fade from light to dark. `.thresh()` (short for *threshold*) makes them **sharp**: whatever is lighter than the threshold becomes white, the rest black. Here is a zebra.",
      ],
      try: "Try thresh(0.2) and thresh(0.8): the white stripes change thickness. Then add .modulate(noise(2, 0.05), 0.3) before .out(): the stripes bend like a real zebra's.",
    },
    {
      title: 'Color steps: posterize',
      text: [
        "`.posterize()` does something similar, but with **colors**: instead of fading, it reduces them to a few steps, like a poster printed with only a few inks.",
        "The first number says how many steps for each color. With 3, the rainbow stripes become flat bands.",
      ],
      try: "Try posterize(2, 1) and posterize(8, 1). With 2 only the brightest colors are left.",
    },
    {
      title: 'Rings: kaleid',
      text: [
        "In the First steps tutorial, `.kaleid()` folded the image into a few slices. With **lots and lots** of slices something curious happens: the straight stripes bend into **circles**, like the rings of a target or of a stone dropped in a pond.",
        "The center of the target is in the middle of the screen, under the panel: on the right you see the outer rings spreading out.",
      ],
      try: "Try kaleid(4): the rings become nested squares. With speed 0, osc(40, 0), the target stops.",
    },
    {
      title: 'Polka dots: shape and repeat',
      text: [
        "A circle (`shape` with many sides) repeated with `.repeat()` becomes a **polka-dot** dress.",
        "But look closely: they are **ovals**, squashed. Hydra measures the screen from 0 to 1 both in width and in height, and since the screen is wider than it is tall, each cell of the grid is a rectangle, and the circle stretches with it.",
      ],
      try: "Try shape(4, 0.8, 0.01): the squares almost touch and what's left is a grid of thin lines, like the grout between tiles.",
    },
    {
      title: 'Round circles',
      text: [
        "To make them round again we **squeeze** the whole grid horizontally, by the same proportion as the screen. `innerHeight / innerWidth` is the height of the window divided by its width: on a wide screen it comes to about 0.6.",
        "`.scale(1, …)` uses that number for the width only: the cells become squares and the dots circles. We put it inside `() =>` so it stays right even if you widen or narrow the window. In the JavaScript tutorial we'll see where these two names come from.",
      ],
      try: "Add .scrollY(0, 0.05) before .out(): the dots scroll upwards forever. Then try raising the third number of shape to 0.3: blurry dots.",
    },
    {
      title: 'The checkerboard: stripes times stripes',
      text: [
        "What happens if we cross vertical stripes with horizontal stripes? The `diff` from the Mix and warp tutorial does exactly what we need: where the two images are the same (white on white, black on black) it's black, where they differ it's white. It's a **checkerboard**.",
        "The second stripes are the same ones, turned a quarter turn with `rotate(1.57)`.",
      ],
      try: "Replace diff with mult: only the places where white stripes cross stay white, and the checkerboard becomes a grid of little squares. Then try rotate(0.8) in the second chain: diamonds.",
    },
    {
      title: 'Tartan',
      text: [
        "The same crossing with **colored** stripes, instead of black and white, gives a fabric: the **tartan** of Scottish kilts. `posterize` makes flat bands of color, like dyed threads, and `blend(…, 0.5)` mixes the vertical bands half and half with the horizontal ones: where they cross, the colors merge, like two woven threads.",
      ],
      try: "Change 20 to 8 in only one of the two chains: the bands become wide one way and narrow the other, like a checked shirt.",
    },
    {
      title: 'Moiré: stripes over stripes',
      text: [
        "Have you ever seen strange waves appear when you look through two overlapping curtains, or at a striped shirt on TV? It's the **moiré** effect: two almost identical patterns, laid on top of each other, draw a third, much bigger pattern.",
        "Here the second zebra is turned just a tiny bit, and the angle sways slowly: where the stripes line up it stays black, where they slip out of step it lights up. Nobody drew the wide, slanted bands that move: they are born where the two meet.",
        "It happens with sound too: two almost identical notes played together “beat”, meaning the volume slowly goes up and down. These are the same **beats**, made of light.",
      ],
      try: "Change 0.1 to 0.03: the two zebras are almost straight and the moiré bands become huge. With 0.3 they narrow. The closer the stripes are to the same direction, the bigger the hidden pattern.",
    },
    {
      title: 'Spots: noise and thresh',
      text: [
        "`thresh` works with any image. On the smoke of `noise()` it gives **spots** with a sharp edge, like those of a cow or a Dalmatian. The smoke moves, and the spots slowly change shape.",
      ],
      try: "Try thresh(0), thresh(0.5) and noise(10, 0.05). Then add .color(0.9, 0.6, 0.2): a giraffe!",
    },
    {
      title: 'Stained glass: voronoi',
      text: [
        "`voronoi()` has a third number: the **shading** inside each cell. At 0 each cell is a flat gray, different from its neighbors, like a mosaic or a stained-glass window. `.colorama()` turns the grays into colors.",
      ],
      try: "Try voronoi(6, 0.2, 2): each cell gets darker towards its edge, like a bubble.",
    },
    {
      title: 'Edges: a shifted copy',
      text: [
        "A texture trick: the **diff** of an image with a copy of itself shifted just a tiny bit. Inside the cells the two copies are the same and the result is black; only on the **edges**, where the color changes, thin lines remain. Then `thresh` makes them white and sharp.",
        "The result looks like dry, cracked earth in summer.",
      ],
      try: "Change 0.003 to 0.01: the cracks get wider. Then try the trick on smoke: in place of voronoi(6, 0.2, 0), both times, write noise(3, 0.1).posterize(6, 1). Posterize splits the smoke into steps, and the edges of the steps are the contour lines of a mountain map.",
    },
    {
      title: 'All together',
      text: [
        "Textures can be mixed with each other like any other image. Here the polka dots act as a **stencil** (`mask`) for a fine checkerboard, and underneath the colored spots drift by.",
        "Well done: now you know how to make the fabric for a dress! Take it to the LAB with **→ EDITOR** and change one pattern at a time.",
      ],
      code: `// a fine checkerboard inside the polka dots...
osc(150, 0)
  .thresh(0.5)
  .diff(osc(150, 0).thresh(0.5).rotate(1.57))
  .mask(shape(100, 0.4, 0.01).repeat(5, 5).scale(1, () => innerHeight / innerWidth))
  // ...over a background of purple spots
  .add(noise(3, 0.05).thresh(0.2).color(0.4, 0.1, 0.7))
  .out()`,
      try: "Instead of the checkerboard try the zebra stripes, instead of the spots the cracks: every combination is a new fabric.",
    },
  ],
},

/* ╔══ VISUALS · JavaScript for visuals ═══════════════════════════════ */
javascript: {
  title: 'JavaScript for visuals',
  desc: 'Hydra is written in JavaScript, and a little JavaScript gives you superpowers: variables, lists, functions that build visuals, objects and the Math toolbox. From the “Javascript for Hydra users” guide.',
  steps: [
    {
      title: "It's JavaScript",
      text: [
        "Hi! The code you write for visuals is **JavaScript**, the language of every web page. Hydra adds its own functions (`osc`, `kaleid`, `out`…), but everything else comes from JavaScript, and we can use it.",
        "Let's start with something you already know, comments, with something new: `/*` and `*/` make a comment **several lines long**. Everything in between is skipped. Here it switches off two functions in one go.",
      ],
      code: `/* A comment over several lines:
   Hydra skips everything in here. */
osc(20, 0.1, 0.8)
  .kaleid(4)
  /* .pixelate(20, 20)
  .invert() */
  .out()`,
      try: "Move the */ right after .pixelate(20, 20): now only invert is switched off.",
    },
    {
      title: 'Variables: giving a number a name',
      text: [
        "A **variable** is a name that remembers a value. `wedges = 6` means: from here on, when I write `wedges`, I mean 6.",
        "The rules for names: no spaces, don't start with a number, and better to avoid accented letters. Above all **don't use names that Hydra or Strudel already use**, like `osc`, `shape`, `time`, `speed` or `zoom`: `osc = 3` would wipe out the oscillator, and `speed = 0.1` would slow down every visual. So pick names that say exactly what they hold, like `wedges` or `rate`: they're much less likely to be taken.",
      ],
      code: `wedges = 6
rate = 0.1

osc(20, rate, 0.8)
  .kaleid(wedges)
  .out()`,
      try: "Change wedges = 6 to wedges = 3 and press ▶.",
    },
    {
      title: 'One variable, many chains',
      text: [
        "Variables are most useful when the **same number** appears in several places. Here two grids of shapes use the same number of sides (`sides`): you only need to change it once, at the top, and both change.",
      ],
      code: `sides = 3

shape(sides, 0.5, 0.01).repeat(4, 3)
  .diff(shape(sides, 0.3, 0.01).repeat(4, 3).rotate(0, 0.2))
  .out()`,
      try: "Try sides = 4, sides = 6 and sides = 100.",
    },
    {
      title: 'Lists: arrays',
      text: [
        "An **array** is a list of values in square brackets. Each value has a position number, and counting starts from **zero**: `purple[0]` is the first, `purple[1]` the second, `purple[2]` the third.",
        "Here a list holds the three numbers of a color (red, green, blue), so the color has a single name: `purple`, or `orange`.",
        "In First steps you already used lists in another way: `kaleid([3, 4, 6])` takes one value after another over time. It's the same list, which Hydra reads as a **sequence**.",
      ],
      code: `purple = [0.7, 0.3, 1]
orange = [1, 0.5, 0.1]

osc(20, 0.1)
  .color(purple[0], purple[1], purple[2])
  .out()`,
      try: "Use orange instead of purple. Shortcut: .color(...orange) writes out the three values of the list by itself.",
    },
    {
      title: 'Functions: a recipe',
      text: [
        "A **function** is a recipe with ingredients. `(sides, count) => …` means: give me a number of sides and a number of copies, and I'll give you back a grid of shapes (`grid`).",
        "Written once, the recipe can be used as many times as you like, with different ingredients: here a grid of triangles and one of hexagons, crossed with `diff`.",
      ],
      code: `grid = (sides, count) => shape(sides, 0.4, 0.01).repeat(count, count)

grid(3, 4)
  .diff(grid(6, 2).rotate(0, 0.1))
  .out()`,
      try: "Add a third ingredient, the size, with a default value: grid = (sides, count, size = 0.4) => shape(sides, size, 0.01).repeat(count, count). Now grid(3, 4, 0.6) makes bigger triangles, and grid(6, 2), without the third number, uses 0.4. (Without the “= 0.4”, grid(6, 2) would give an error.)",
    },
    {
      title: 'Functions that make functions',
      text: [
        "You already know the `() => …` functions that Hydra recalculates on every frame. What if a recipe **returned one of those**? It's a factory of movements.",
        "`wave(rate, min, max)` returns a wave that goes up and down between `min` and `max`. That way you don't have to rewrite the `Math.sin` sums every time: here the kaleidoscope goes between 3 and 8 slices, slowly, while the visual breathes between 0.8 and 1.2, faster.",
      ],
      code: `wave = (rate, min, max) =>
  () => min + (max - min) * (0.5 + 0.5 * Math.sin(time * rate))

osc(20, 0.1, 0.8)
  .kaleid(wave(0.3, 3, 8))
  .scale(wave(2, 0.8, 1.2))
  .out()`,
      try: "Use the factory for the color too: .colorama(wave(0.5, 0, 0.3)).",
    },
    {
      title: 'Math: the toolbox',
      text: [
        "`Math` is a toolbox for sums. You know `Math.sin`. Here are three more tools:",
        "`Math.PI` is pi, 3.14159…: in radians it's **half a turn**, so `Math.PI / 4` is an eighth of a turn. `Math.random()` pulls out a **random** number between 0 and 1. `Math.floor()` cuts off the part after the decimal point: `Math.floor(4.7)` gives 4.",
        "Here chance picks the numbers: **every time you press ▶** you get a different visual.",
      ],
      try: "Press ▶ ten times. When you find one you like, careful: running it again makes it disappear! Copy it to the LAB with → EDITOR and replace the Math.random calls with the numbers you want to keep.",
    },
    {
      title: 'An RGB filter with Math.PI',
      text: [
        "Look really closely at the screen of an old television: each dot is made of three tiny stripes, one **red**, one **green** and one **blue**. Let's recreate it, with two sums.",
        "`pixelate(squares, squares)` divides the image into little squares. Then we multiply it by an `osc` with **one stripe per square**: since a wave makes a full turn in `Math.PI * 2`, the right frequency is `Math.PI * 2 * squares`.",
        "The third number of `osc` shifts red, green and blue relative to each other. With a third of a turn, `Math.PI * 2 / 3`, the three colors line up, one per tiny stripe.",
      ],
      code: `squares = 40

voronoi(4, 0.3, 0)
  .colorama(0.5)
  .pixelate(squares, squares)
  .mult(osc(Math.PI * 2 * squares, 0, Math.PI * 2 / 3))
  .out()`,
      try: "Try squares = 20: you can clearly see the three tiny stripes in each square. Instead of the cells you can use any visual, even the webcam.",
    },
    {
      title: 'Objects: the dot to get in',
      text: [
        "An **object** is a box with drawers, each with its own name. It's written in curly braces: `tint = { r: 1, g: 0.4, b: 0.8 }`. To open a drawer you use the **dot**: `tint.r` is 1.",
        "Many things you use are objects. `window` is the browser window: `window.innerWidth` and `window.innerHeight` are its width and height, in pixels (you can also leave `window.` out, as in the Textures tutorial). `mouse` is an object too: `mouse.x` and `mouse.y`. And so is `a`, the microphone: `a.fft`.",
        "With the window's proportion (`aspect`), as in the Textures tutorial, the squares become square again.",
      ],
      code: `tint = { r: 1, g: 0.4, b: 0.8 }
aspect = window.innerHeight / window.innerWidth

shape(4, 0.6, 0.01)
  .repeat(6, 6)
  .scale(1, aspect)
  .color(tint.r, tint.g, tint.b)
  .out()`,
      try: "Press ▶, then make the browser window narrower: the squares get distorted, because the proportion was calculated only once. Write .scale(1, () => window.innerHeight / window.innerWidth) and try again.",
    },
    {
      title: 'All together',
      text: [
        "Here's everything: the **settings** at the top, with names, then the **recipes**, then the chain that uses them. That's how you organize a long visual: when you play it live, you find the numbers to change right away, all in the same place.",
        "Well done: now you speak a little JavaScript! Take the visual to the LAB with **→ EDITOR** and change only the first three lines.",
      ],
      code: `// settings
sides  = 6
tint = { r: 1, g: 0.4, b: 0.8 }

// recipes
wave  = (rate, min, max) =>
  () => min + (max - min) * (0.5 + 0.5 * Math.sin(time * rate))
halo = (count) => shape(sides, 0.3, 0.01).repeat(count, count).rotate(0, 0.1)

// the visual
osc(30, 0.05, 1.2)
  .color(tint.r, tint.g, tint.b)
  .mask(halo(4))
  .diff(halo(2).scale(wave(0.5, 0.8, 1.5)))
  .rotate(Math.PI / 8)
  .out()`,
      try: "Add a setting of your own, for example turnSpeed = 0.1, and use it in the halo recipe instead of the 0.1 in rotate.",
    },
  ],
},

/* ╔══ VISUALS · Generative visuals ═══════════════════════════════════ */
generative: {
  title: 'Generative visuals',
  desc: 'Let the code write the code: with a for loop ten shapes are built in three lines, forEach turns your name into a visual, and with ? every repetition does something different. From the “Iteration & generative patches” guide.',
  steps: [
    {
      title: 'Repeating by hand',
      text: [
        "Hi! This visual crosses the same stripes four times, turned a little further each time. The result is nice, but look at the code: the lines are **almost all the same**, only the number in `rotate` changes.",
        "What if you wanted ten? Or fifty? Copying by hand is boring, and a single mistake ruins everything. Repetitive jobs are for the computer.",
      ],
    },
    {
      title: 'The for loop',
      text: [
        "The **`for` loop** repeats a piece of code. `for (let i = 1; i < 10; i++)` reads like this: start with `i` equal to 1; as long as `i` is less than 10, repeat; after each round add 1 to `i` (`i++`). So `i` is 1, 2, 3… up to 9.",
        "The variable `image` works as an **accumulator**: it starts from an `osc`, and on every round another crossing is added to it, turned by `i * 0.4`. At the end we send it to the screen.",
        "Why start from 1 and not 0? With `i` equal to 0 the rotation would be 0: the stripes crossed with **themselves**, and the `diff` of an image with itself is all black.",
      ],
      code: `image = osc(30, 0.05)

for (let i = 1; i < 10; i++) {
  image = image.diff(osc(30, 0.05).rotate(i * 0.4))
}

image.out()`,
      try: "Change 10 to 4: you're back to the visual from the previous step. Then try 20. Don't overdo it: every round adds work for the graphics card, and beyond a few dozen the computer slows down.",
    },
    {
      title: 'Dividing the circle',
      text: [
        "With a loop we can do the math properly. The stripes repeat the same pattern after **half a turn**, that is `Math.PI`: if we divide it into `count` equal parts, the copies spread out evenly, like the petals of a flower.",
        "The variable `count` decides everything: the number of rounds of the loop and the angle between one copy and the next. The stripes are sharp (`thresh`, from the Textures tutorial), so the points of the star are easy to see.",
        "The copies turn around the center of the screen, which is under the panel: `.scroll(-0.3, 0)`, at the end, moves everything to the right, and the center of the star shows up in the uncovered part.",
      ],
      code: `count = 6
image = osc(15, 0.02).thresh(0.5)

for (let i = 1; i < count; i++) {
  image = image.diff(osc(15, 0.02).thresh(0.5).rotate(i * Math.PI / count))
}

image
  .scroll(-0.3, 0)
  .out()`,
      try: "Try count = 3, count = 5 and count = 12. Then remove the two .thresh(0.5): the star turns to glass.",
    },
    {
      title: 'Layers of bubbles',
      text: [
        "Inside the loop, `i` can change **everything**: the size, the speed, the color. Here each round adds a grid of bubbles, each time denser, faster and a different color.",
        "`solid()` is a black screen: the accumulator starts empty. `.add(…, 0.5)` adds half the light of each layer. The big, slow bubbles seem close, the small, fast ones far away: it's **parallax**, like looking out of a train window.",
      ],
      code: `image = solid()

for (let i = 1; i <= 5; i++) {
  image = image.add(
    shape(100, 0.25, 0.01)
      .repeat(i * 2, i * 2)
      .scrollY(0, 0.02 * i)
      .color(1 / i, 0.4, i / 5),
    0.5
  )
}

image.out()`,
      try: "Put scrollX instead of scrollY. Then change shape(100…) to shape(3…): a rain of triangles.",
    },
    {
      title: 'A visual from your name: forEach',
      text: [
        "To the computer every letter is a **number**: c is 99, i is 105, a is 97, o is 111. `charCodeAt(0)` tells us.",
        "`word.split('')` splits the word into a list of letters, and `.forEach()` does something for **each one**, like a loop. Here each letter picks the sides of a shape (with `%`, the remainder of a division, which gives a number from 3 to 10) and its rotation speed.",
        "So every word has **its own** visual, always the same.",
      ],
      code: `word = 'ciao'
image = solid()

word.split('').forEach((letter, i) => {
  const code = letter.charCodeAt(0)
  image = image.diff(
    shape(code % 8 + 3, 0.2 + i * 0.1, 0.01).rotate(code, 0.02 * (i + 1))
  )
})

image
  .repeat(3, 3)
  .out()`,
      try: "Write your name instead of ciao (Italian for “hi”). And a friend's: what visual do they get?",
    },
    {
      title: 'map and reduce: lists of images',
      text: [
        "Two tools for lists, often used together. `.map()` turns each element into something else: here from a list of **numbers** (the `sides`) to a list of **images** (the turning `shapes`).",
        "`.reduce()` does the opposite of map: it takes the whole list and **reduces** it to a single thing, combining the elements two at a time. Here it crosses them all with `diff`, one after the other.",
      ],
      code: `sides = [3, 4, 5, 6]

// map: from numbers to images
shapes = sides.map(n => shape(n, 0.5, 0.01).rotate(0, n * 0.05))

// reduce: from many images to one
shapes
  .reduce((all, form) => all.diff(form))
  .repeat(3, 2)
  .out()`,
      try: "Add numbers to the list: [3, 4, 5, 6, 8, 100]. Then change diff to add, or to blend.",
    },
    {
      title: 'If… else: the question mark',
      text: [
        "So far the visuals always did the same thing. With a **condition** they can decide. The shortest way to write one is the question mark: `condition ? if yes : if no`.",
        "`time % 4` is the **remainder** of dividing by 4: it counts the seconds from 0 to 4 and then starts again from 0, forever. So `time % 4 < 2` is true for two seconds, then false for two, then true again: the kaleidoscope switches from 3 to 8 slices and back.",
      ],
      try: "Try time % 1 < 0.5: it changes twice a second. Then let it decide the color too: .colorama(() => time % 4 < 2 ? 0 : 0.3).",
    },
    {
      title: 'Conditions inside the loop',
      text: [
        "Conditions and loops together: each round can do something different. `i % 2 == 0` means “i is even” (the remainder of dividing by 2 is zero).",
        "Here the even squares turn clockwise and the odd ones counterclockwise: `dir` is 1 or -1, and it multiplies the speed. And each square is bigger and faster than the one before.",
      ],
      code: `image = solid()

for (let i = 1; i <= 6; i++) {
  const dir = i % 2 == 0 ? 1 : -1
  image = image.diff(
    shape(4, i * 0.15, 0.01).rotate(0, dir * 0.05 * i)
  )
}

image
  .repeat(2, 2)
  .out()`,
      try: "Let the condition decide the shape too: shape(i % 2 == 0 ? 4 : 3, …).",
    },
    {
      title: 'All together',
      text: [
        "A **generative** visual: the loop builds the layers, chance picks the ingredients, conditions decide how to mix them. Not even the person who wrote it knows how it will turn out: every time you press ▶ you get a new composition.",
        "Read it calmly: each layer is a triangle or some cells, at random; the even layers **warp** the image, the odd ones **cross** it.",
        "Well done! Press ▶ many times, and when the right one comes up take it to the LAB with **→ EDITOR**.",
      ],
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
      try: "Add a third option: instead of Math.random() < 0.5 ? … : … try noise(i, 0.1) when i is 3.",
    },
  ],
},

/* ╔══ VISUALS · Precise timing ═══════════════════════════════════════ */
tempo: {
  title: 'Precise timing',
  desc: 'The update function, which Hydra calls before every frame: counters, events at regular intervals, the sawtooth, random steps, a bouncing ball and the bpm metronome. From the “Updating frames & precise timing” guide.',
  steps: [
    {
      title: 'Sixty times a second: update',
      text: [
        "Hi! A visual is like a cartoon: lots of still **frames**, one after the other, about 60 a second. Before drawing each frame, Hydra checks whether you've written a function called `update`, and if there is one it **runs** it.",
        "Inside `update` you can change your variables however you like, on every frame. Here `sides` goes from 3 to 8, one more each second, then starts over: `Math.floor(time % 6)` counts 0, 1, 2, 3, 4, 5, 0, 1…",
        "The shape reads the variable with `() => sides`, so it sees the new value on every frame. **■ STOP** switches off `update` too.",
      ],
      code: `sides = 3

update = () => {
  sides = 3 + Math.floor(time % 6)
}

shape(() => sides, 0.4, 0.01)
  .repeat(4, 3)
  .out()`,
      try: "Try time * 2 % 6: the shapes change twice as fast.",
    },
    {
      title: 'Counting frames',
      text: [
        "In `update` you can also **count**. `frameCount++` adds 1 on every frame: after one second it's about 60, after a minute 3600.",
        "That way we can do something every so many frames. `if (…)` means “if”: if `frameCount` is a multiple of 60 (the remainder of the division is 0), that is **once a second**, we pick a new random `tint`.",
      ],
      code: `frameCount = 0
tint = 0

update = () => {
  frameCount++
  if (frameCount % 60 == 0) tint = Math.random()
}

osc(20, 0.1, 0.8)
  .kaleid(4)
  .hue(() => tint)
  .out()`,
      try: "Try % 120 (every two seconds) and % 30 (twice a second). Don't go faster than that: a color that changes over the whole screen more than three times a second can make people who are sensitive to flashing lights feel unwell.",
    },
    {
      title: 'A single frame',
      text: [
        "With the counter we can make something happen **for one frame only**, a sixtieth of a second: too short to see. But with the **feedback** from the Mix and warp tutorial the image stays, and changes.",
        "Here a grid of squares appears for just one frame each second (`add` with amount 1, otherwise 0). The echo enlarges it and fades it out: every second, an **explosion** of squares flying towards the edges.",
      ],
      code: `frameCount = 0
update = () => { frameCount++ }

src(o0)
  .scale(1.02)                  // the echo spreads out...
  .color(0.97, 0.97, 0.97)      // ...and fades
  .add(
    shape(4, 0.3, 0.01).repeat(3, 3).color(1, 0.5, 0.8),
    () => frameCount % 60 == 0 ? 1 : 0
  )
  .out()`,
      try: "Add .rotate(0.02) after .scale(1.02): the explosions spin. Or change 60 to 20.",
    },
    {
      title: 'Every so often: time % every < length',
      text: [
        "Counting frames works, but it depends on the computer: a slow one makes 30 a second, and everything runs at half speed. `time`, on the other hand, is **real seconds**.",
        "The recipe from the Hydra guide is `time % every < length`: true for `length` seconds, once every `every` seconds. Here, for half a second every 3 seconds, the cells light up in color (`lit` is true).",
      ],
      code: `lit = false

update = () => {
  lit = time % 3 < 0.5
}

voronoi(8, 0.3)
  .colorama(() => lit ? 0.5 : 0)
  .out()`,
      try: "Try time % 2 < 1: one second on and one second off, like a car's turn signal.",
    },
    {
      title: 'The sawtooth',
      text: [
        "`Math.sin(time)` is a wave that goes up and down, smoothly. Sometimes you need a different movement: rise slowly and then **start over** suddenly from the beginning. It's called a **sawtooth**, because when you draw it, that's exactly its shape.",
        "The recipe is `time % durationSec / durationSec`, the `phase`: it rises from 0 to 1 in `durationSec` seconds, then goes back to 0. Here it inflates some bubbles, which pop and are born again every 2 seconds.",
      ],
      code: `durationSec = 2
phase = 0

update = () => {
  phase = time % durationSec / durationSec
}

shape(100, () => phase * 0.6, 0.01)
  .repeat(4, 3)
  .color(0.3, 0.8, 1)
  .out()`,
      try: "Try (1 - phase) instead of phase: the bubbles are born big and deflate. It's the movement of a kick drum hit: loud at once, then it fades.",
    },
    {
      title: 'Random steps',
      text: [
        "Here's a firefly flying wherever it likes. On every frame, `update` makes it take a **tiny random step**: `Math.random() - 0.5` is a number between -0.5 and 0.5, that is a bit to the left or a bit to the right, a bit up or a bit down.",
        "A single step isn't noticeable, but added up one after the other they draw a path that never knows where it's going. It's called a **random walk**. The echo (`add` with a fading `src(o0)`) leaves a trail behind it.",
        "The firefly starts on the right, in the uncovered part of the screen: in `scroll`, negative numbers move things to the right.",
      ],
      try: "Change 0.02 to 0.06: the firefly gets jittery. If it leaves the screen, it comes back on the other side.",
    },
    {
      title: 'The bouncing ball',
      text: [
        "When variables **depend on each other**, `update` is the right place to keep them together. A ball has a position (`x`, `y`) and a velocity (`vx`, `vy`): on every frame the position changes by the velocity, and when the ball touches an edge the velocity **changes sign**, and the ball comes back.",
        "The edges are those of the uncovered part of the screen, to the right of the panel.",
      ],
      code: `x = -0.3;  y = 0          // where the ball is
vx = 0.003; vy = 0.007    // how far it moves on every frame

update = () => {
  x += vx
  y += vy
  if (x < -0.45 || x > -0.25) vx = -vx    // right and left edges
  if (y < -0.45 || y > 0.45) vy = -vy     // bottom and top edges
}

shape(100, 0.05, 0.01)
  .color(0.3, 1, 0.8)
  .scroll(() => x, () => y)
  .add(src(o0).brightness(-0.03))
  .out()`,
      try: "Add gravity: in update, before y += vy, write vy -= 0.0003. Now the ball falls and bounces on the floor.",
    },
    {
      title: 'The metronome: bpm and speed',
      text: [
        "Hydra has two global knobs for time. `speed` is the speed of **all** of Hydra's time: 2 goes twice as fast, 0.5 half as fast.",
        "`bpm` is beats per minute, like a music metronome. It decides how fast **lists** move from one value to the next: one on every beat. It's usually 30; here we set it to 120, the tempo of the Strudel tutorials, so the kaleidoscope changes on every kick (in time, but not exactly together: that's what the microphone is for).",
      ],
      code: `bpm = 120      // one value of the list on every beat
speed = 1      // the speed of all of Hydra's time

osc(20, 0.1, 0.8)
  .kaleid([3, 4, 6, 8])
  .rotate(0, 0.2)
  .out()`,
      try: "Try speed = 0.25: everything slows down, the rotation and the stripes too. ■ STOP puts speed and bpm back to their starting values.",
    },
    {
      title: 'All together',
      text: [
        "Everything in time: `update` works out where we are in the beat (`phase`, a sawtooth that starts over on every beat) and, on every new beat (`lastBeat` changes), picks a random tint.",
        "The squares swell at the start of each beat and shrink until the next one, like a kick. With `bpm = 120` it's in time with the music of the Strudel tutorials.",
        "Well done: now you can use Hydra's clock down to the frame! Take it to the LAB with **→ EDITOR**.",
      ],
      code: `bpm = 120
lastBeat = 0
phase = 0
tint = 0

update = () => {
  const beats = time * bpm / 60          // how many beats have gone by
  phase = beats % 1                       // from 0 to 1 in every beat
  if (Math.floor(beats) != lastBeat) {    // has a new beat started?
    lastBeat = Math.floor(beats)
    tint = Math.random()
  }
}

shape(4, () => 0.2 + (1 - phase) * 0.3, 0.01)
  .repeat(4, 3)
  .diff(osc(20, 0.1, 1).hue(() => tint))
  .out()`,
      try: "Try bpm = 60 and bpm = 170, the tempo of drum and bass.",
    },
  ],
},

/* ╔══ VISUALS · Clicks and keyboard ══════════════════════════════════ */
interazione: {
  title: 'Clicks and keyboard',
  desc: 'You play the visual with your hands: the mouse, clicks and keys become knobs. JavaScript event listeners, from the first switch to a visual you play with the keyboard. From the “Using clicks & keyboard presses” guide.',
  steps: [
    {
      title: 'The mouse: mouse.x and mouse.y',
      text: [
        "Hi! In this tutorial the visual reacts to **you**. Let's start with the mouse: `mouse.x` and `mouse.y` say where the pointer is, in pixels, from the left and from the top.",
        "Divided by the width of the window, `mouse.x / innerWidth` becomes a number from 0 (all the way left) to 1 (all the way right). Here it decides how many stripes there are; and `mouse.y` decides the color.",
        "Press ▶ and **move the mouse over the visual**, on the right.",
      ],
      try: "Use the mouse to rotate too: add .rotate(() => mouse.y / innerHeight * 3).",
    },
    {
      title: 'A switch: the click',
      text: [
        "Every time something happens (a click, a key, the window changing size), the browser sends an **event**. If you write a function with the right name, the browser calls it when the event arrives: it's a **listener**.",
        "`onpointerup` listens for when you **release** the mouse button (or your finger, on a tablet). Here each click flips `lit`: `!` means “the opposite”, so true becomes false and false becomes true. It's a **switch**.",
        "The click counts anywhere on the page, even on the tutorial text: click on the visual, on the right. **■ STOP** switches off the listeners too.",
      ],
      code: `lit = false
onpointerup = () => { lit = !lit }

osc(20, 0.1, () => lit ? 1 : 0)
  .kaleid(() => lit ? 6 : 2)
  .out()`,
      try: "Make it flip the direction of rotation too: .rotate(0, () => lit ? 0.2 : -0.2).",
    },
    {
      title: 'While you hold it down',
      text: [
        "Two listeners together: `onpointerdown` when you **press**, `onpointerup` when you **release**. That way the visual knows whether the button is down right now (`pressed`).",
        "Hold down on the visual: the image melts. Let go: it goes back to normal.",
      ],
      code: `pressed = false
onpointerdown = () => { pressed = true }
onpointerup = () => { pressed = false }

osc(20, 0.1, 0.8)
  .modulate(noise(3, 0.2), () => pressed ? 0.5 : 0)
  .out()`,
      try: "Instead of modulate, try .pixelate(() => pressed ? 20 : 2000, () => pressed ? 20 : 2000).",
    },
    {
      title: 'Counting clicks',
      text: [
        "`click++` adds 1 on every click. With `%`, the remainder of the division, the number of sides cycles from 3 to 10 and then starts over: `click % 8` goes from 0 to 7, plus 3 makes 3 to 10.",
        "Watch out for `() =>`: without it, Hydra would read `click` **only once**, when you press ▶, and then never notice anything again. It's the most common mistake with events.",
      ],
      code: `click = 0
onpointerup = () => { click++ }

shape(() => click % 8 + 3, 0.4, 0.01)
  .repeat(4, 3)
  .out()`,
      try: "Remove the () => in front of click % 8 + 3, press ▶ and click: nothing changes. Put it back.",
    },
    {
      title: 'A knob to turn',
      text: [
        "An idea from the Hydra guide: while you hold down, a number **grows**. When you let go, it stays where it is. It's like turning a knob: the longer you hold, the further you turn.",
        "`angle += pressed ? 0.02 : 0` says: add 0.02 if pressed, otherwise nothing. Since it's inside `() =>`, it happens on every frame.",
      ],
      code: `pressed = false
onpointerdown = () => { pressed = true }
onpointerup = () => { pressed = false }
angle = 0

osc(15, 0.1, 1)
  .kaleid(5)
  .rotate(() => angle += pressed ? 0.02 : 0)
  .out()`,
      try: "Make the knob go back to zero by itself when you let go: angle = pressed ? angle + 0.02 : angle * 0.95.",
    },
    {
      title: 'One click, a new visual',
      text: [
        "A listener can do **anything**, even build a whole visual. Here the recipe `newLook` invents a random visual and sends it to the screen; we call it once right away, then give it to `onpointerup`, so every click makes another one.",
        "Note: `onpointerup = newLook`, **without** parentheses. With parentheses, `newLook()`, the recipe would run right away; without them, we hand it to the browser so the browser runs it, at the right moment.",
      ],
      code: `newLook = () => {
  osc(Math.random() * 40, 0.1, Math.random() * 2)
    .kaleid(Math.floor(Math.random() * 6) + 2)
    .rotate(Math.random() * Math.PI, 0.1)
    .out()
}

newLook()
onpointerup = newLook`,
      try: "Add to the recipe .modulate(noise(Math.random() * 5, 0.1), Math.random() * 0.3).",
    },
    {
      title: 'The arrow keys',
      text: [
        "Now the keyboard. `onkeydown` listens for when you **press a key**, and receives an event, `ev`, that says which one: `ev.key` is the name of the key, for example `'ArrowLeft'`, the left arrow.",
        "The center of the kaleidoscope is under the panel: bring it into the uncovered part with the arrows. **Click on the visual first**, then use the arrows: if the cursor is still in the code box, the arrows move it too.",
        "The signs look backwards (right arrow, `x` goes down) because `scroll` moves the image to the left when the number grows.",
      ],
      code: `x = 0
y = 0
onkeydown = (ev) => {
  if (ev.key === 'ArrowRight') x -= 0.05
  if (ev.key === 'ArrowLeft')  x += 0.05
  if (ev.key === 'ArrowUp')    y -= 0.05
  if (ev.key === 'ArrowDown')  y += 0.05
}

osc(20, 0.1, 1)
  .kaleid(6)
  .scroll(() => x, () => y)
  .out()`,
      try: "Make the kaleidoscope zoom with the + and - keys: zoomLevel = 1, then if (ev.key === '+') zoomLevel *= 1.1, and .scale(() => zoomLevel) before .scroll.",
    },
    {
      title: 'Each key, a shape',
      text: [
        "Every key also has a **number**: `ev.keyCode`. A is 65, B 66, the space bar 32. Here the last key pressed (`key`) picks the sides of the shapes and their color.",
        "Click on the visual and type a word: each letter is a shape. (If you type in the code box, the visual listens to you anyway!)",
      ],
      code: `key = 65
onkeydown = (ev) => { key = ev.keyCode }

shape(() => key % 8 + 3, 0.4, 0.01)
  .repeat(4, 3)
  .color(() => key % 3 / 2, 0.5, () => key % 5 / 4)
  .out()`,
      try: "Let the key decide the speed too: .rotate(0, () => (key % 10) / 20).",
    },
    {
      title: 'All together: a visual to play',
      text: [
        "Here's an **instrument**. An object, `shapes`, says which key makes which shape: A, S, D, F and G are on the same row of the keyboard, like the keys of a piano. E switches the echo `trail` on and off, and the mouse, from left to right, changes the color.",
        "`shapes[ev.key]` opens the drawer named after the key: if the drawer exists, that's the new shape. A key that isn't there (a Z) does nothing.",
        "Click on the visual and play! With some Strudel music underneath, try to stay in time. Well done: you've built a visual instrument.",
      ],
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
      try: "Add more shapes to the drawer: h: 8, j: 12. Then a key that makes it spin the other way.",
    },
  ],
},

/* ╔══ TOGETHER · Sound under the lens ════════════════════════════════ */
lente: {
  title: 'Sound under the lens',
  desc: 'The microphone tools: see what it hears, split the sound into more bands, calm the flicker, adjust the sensitivity and count the kicks. From the “Audio-reactivity explained” guide.',
  steps: [
    {
      title: 'The music',
      text: [
        "Hi! This tutorial continues **Visuals that listen**: there you saw `a.fft`, here we learn to adjust it.",
        "First the music: kick, snare, cymbals and a bass, so every band, from lows to highs, has something to hear. Press ▶ and let it play, with the **speakers on** (with headphones the microphone hears nothing).",
      ],
    },
    {
      title: 'See what it hears: a.show()',
      text: [
        "`a.show()` shows the microphone **bars**, at the bottom right: one per band, from lows on the left to highs on the right. The taller a bar, the more sound there is in that band.",
        "Watch the bars while the music plays: the first jumps with the kick, the last shimmers with the cymbals. These are the numbers that end up in `a.fft[0]`, `a.fft[1]`… and that color the stripes here.",
      ],
      try: "Clap your hands near the computer: which bar jumps the most?",
    },
    {
      title: 'More bands: a.setBins',
      text: [
        "Usually there are 4 bands. `a.setBins(8)` splits the sound into **8** narrower bands: now you can tell the bass from the kick better, or the snare from the cymbals. `a.fft` becomes a list of 8 numbers, from `a.fft[0]` to `a.fft[7]`.",
        "And with 8 bands we can build an **equalizer**, with the `for` loop from Generative visuals: one column per band (the `bars`), as tall as its volume. The columns are in the uncovered part, on the right.",
      ],
      code: `a.setBins(8)
a.show()

bars = solid()
for (let i = 0; i < 8; i++) {
  bars = bars.add(
    shape(4, 1, 0.001)
      .scale(1, 0.02, () => 0.01 + a.fft[i])   // narrow, and as tall as band i
      .scrollX(-0.25 - i * 0.03)          // its column
      .color(1 - i / 8, 0.4, i / 8)
  )
}
bars.out()`,
      try: "Try a.setBins(16), with 16 columns: in the loop change 8 to 16 and 0.03 to 0.015.",
    },
    {
      title: 'Less jittery: a.setSmooth',
      text: [
        "The microphone numbers jump all the time, and the visual **shakes**. `a.setSmooth()` softens them: it goes from 0 (no calm, every frame on its own) to almost 1 (very slow, the visual only follows big changes).",
        "Here the circles follow the lows very calmly (0.9). Change the number and watch how the character of the visual changes.",
      ],
      try: "Try a.setSmooth(0): the circles jump with every hit. And a.setSmooth(0.98): they breathe slowly, as if they were asleep.",
    },
    {
      title: 'Sensitivity: setCutoff and setScale',
      text: [
        "Every room is different: in one there's the hum of the air conditioner, in another the music is quiet. Two settings fix things.",
        "`a.setCutoff()` is the **floor**: all sound below that level counts as zero. Raise it if the visual moves even when nobody is playing. `a.setScale()` decides where the **ceiling** is: how much sound is needed, above the floor, to reach 1. Lower it if the music is quiet and the visual barely moves.",
        "In `a.show()`, above each bar, there are two **thin lines**: the lower one is the floor, the upper one the ceiling. The bars show the sound as it is, and don't change; the lines change. Adjust until, with the music on, the bars go up and down **between the two lines**.",
      ],
      code: `a.setCutoff(4)    // the floor: below it, zero
a.setScale(6)     // the ceiling: how much it takes to reach 1
a.show()

voronoi(8, 0.3)
  .modulateScale(osc(10, 0.1), () => a.fft[1] * 2)
  .colorama(() => a.fft[2] * 0.5)
  .out()`,
      try: "Turn off the music (■ STOP in the first box) and raise the cutoff until the visual stays still. Then turn it back on: now it moves only with the music.",
    },
    {
      title: 'Counting hits',
      text: [
        "The `update` from the Precise timing tutorial and the microphone together: a **hit detector**. When the lows go over the threshold (0.6) and a moment before they were below it, a kick has arrived: `hits++`.",
        "`above` remembers how things were on the previous frame. Without it, a hit that lasts ten frames would be counted ten times.",
        "Every hit changes the shape and turns it one step: the visual moves **in time**, in jolts, like a choreography.",
      ],
      code: `a.setSmooth(0.5)
hits = 0
above = false

update = () => {
  if (a.fft[0] > 0.6 && !above) hits++
  above = a.fft[0] > 0.6
}

shape(() => hits % 5 + 3, 0.4, 0.01)
  .repeat(4, 3)
  .rotate(() => hits * 0.3)
  .out()`,
      try: "If the hits aren't counted, lower 0.6 (both times). Hydra also has its own detector: a.onBeat = () => { hits++ } instead of update, but it's harder to adjust.",
    },
    {
      title: 'All together',
      text: [
        "All together: six bands, a bit of calm, and each band with its own job. The lows inflate the circles, the hits change the tint, the mids warp, the highs switch on the echo.",
        "Well done! Now you know how to tune your visuals' ears. With **+ TIMELINE** put the music and the visual on their tracks, and before the show adjust cutoff and scale in the real room.",
      ],
      code: `a.setBins(6)
a.setSmooth(0.7)
hits = 0
above = false

update = () => {
  if (a.fft[0] > 0.6 && !above) hits++
  above = a.fft[0] > 0.6
}

shape(100, () => 0.15 + a.fft[0] * 0.3, 0.02)
  .repeat(4, 3)
  .color(1, 0.4, 0.7)
  .hue(() => hits * 0.1)
  .modulate(noise(3, 0.1), () => a.fft[2] * 0.3)
  .add(src(o0).scale(1.01).brightness(-0.04), () => a.fft[5] * 2)
  .out()`,
    },
  ],
},

} });
