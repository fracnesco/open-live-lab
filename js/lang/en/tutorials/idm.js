/* English · tutorial «IDM beat» (translates js/tutorials/idm.js).
   Steps match by position; the code has no comments, so it is not repeated here. */

I18N.content('en', 'tutorials', { items: {

  idm: {
    title: 'IDM beat',
    desc: 'A jittery beat in the style of \'90s IDM, à la Aphex Twin: take a drum break, cut it into segments and put it back together, with lightning-fast rolls, glitches, an acid bass and a melancholy pad.',
    steps: [
      {
        title: 'What IDM is',
        text: [
          'Hi! **IDM** (Intelligent Dance Music) is the slightly tongue-in-cheek name given in the \'90s to the electronic music of artists like **Aphex Twin**: dance rhythms taken apart and reassembled, full of tiny details and lightning-fast drum rolls, with sweet, melancholy melodies on top.',
          'The basic trick is as old as hip hop: take a **break**, a short bit of drums played by a real drummer, and cut it into **segments**. Then put the segments back in a new order.',
          'In Open Live Lab the break is called **xbreak1** and it is already cut into **16 equal segments**, numbered 0 to 15. Below we play them in order: `n()` picks the segment number, `.s("xbreak1")` says which folder to take it from. Listen: this is the original break.',
        ],
        try: '85/4 is the tempo of the break: at 85 bpm the segments fit together perfectly. Try 70/4 and listen to what happens when they no longer fit.',
      },
      {
        title: 'Getting to know the segments',
        text: [
          'To rebuild a break you need to know what is inside each segment. In ours:',
          '**Kick**: segments 0, 5, 8, 11, 13. **Snare**: segments 2, 7, 10, 14. **Cymbals and light hits**: segments 1, 3, 4, 6, 9, 12, 15.',
          'Below we play three of them, well spaced out: a kick, a snare, a cymbal.',
        ],
        try: 'Replace the numbers with other segments and listen to them one at a time. Can you tell the kick from the snare?',
      },
      {
        title: 'A shortcut: run',
        text: [
          'Writing out the numbers 0 to 15 takes a while. `run(16)` does the same thing: it produces the numbers 0, 1, 2… up to 15, one per sixteenth.',
          'The result is identical to the first step, but the code is shorter. We will need it soon.',
        ],
      },
      {
        title: 'Rebuilding the break',
        text: [
          'Now the fun part: we change the **order** of the segments. Here the first half repeats the beginning twice (0 1 2 3), and towards the end kick 13 is doubled.',
          'The sound is still the drummer\'s, but the rhythm is now ours.',
        ],
        try: 'Invent your own order. A tip: put a kick (0, 5, 8…) at the start, so the rhythm has something to lean on.',
      },
      {
        title: 'Rolls',
        text: [
          'The trademark of this style is the **roll**: a segment that suddenly repeats 4, 8, 16 times, super fast, like a machine gun.',
          'In mini-notation all it takes is an asterisk: `7*4` is four snares in the time of one, `14*8` is eight.',
          '`.cut(1)` matters: when a new segment starts, it **cuts off** the one that was still playing. Without it the segments overlap and the roll turns to mush.',
        ],
        try: 'Remove .cut(1) and listen to the difference. Then try 14*16.',
      },
      {
        title: 'Rising rolls',
        text: [
          'A true IDM trick: the roll **changes pitch** as it plays, as if it were speeding up.',
          'Notice the tempo too: from here on it is `setcpm(170/4)`, twice the break, the speed of the most frantic IDM. Each segment gets only half the time it would need, and `.cut(1)` chops it off: the break becomes dry and jittery.',
          'Here `[14*16]@4` is a roll of 16 snares that takes up the last quarter of the cycle (the `@4` gives it the weight of 4 slots). And `.speed("1 1 1 [1 1.25 1.5 2]")` plays the last quarter faster and faster, so higher and higher: the roll rises like a siren.',
        ],
        try: 'Try speed with falling values: [1 0.8 0.6 0.4].',
      },
      {
        title: 'Glitch',
        text: [
          'Now we break the groove, but in a controlled way. Three functions:',
          '`.sometimesBy(0.2, x => x.speed(-1))` sometimes plays a segment **backwards**. `.sometimesBy(0.15, x => x.ply(4))` sometimes multiplies it by four, a little **stutter**. `.someCyclesBy(0.25, x => x.scramble(16))` in roughly one cycle out of four **shuffles** all the segments at random.',
          'It sounds like a skipping CD, but it always stays in time.',
        ],
        try: 'Raise the numbers to 0.5: more chaos. Lower them to 0.05: just the odd surprise.',
      },
      {
        title: 'Jittery cymbals',
        text: [
          'We add a **layer** of cymbals taken from the break, on top of the drums. In mini-notation the vertical bar `|` means “or”: `[1|3|6|9]` picks one of the four cymbal segments at random, and with `*16` it does so sixteen times per cycle. The final `?`, as in the Rhythm tutorial, makes some of them disappear.',
          '`rand` (a random number, different for every hit) changes the **volume** with `.gain(rand.range(0.2, 0.6))` and the **position** between right and left with `.pan(rand)`.',
          'Each layer sits on its own `$:` line, as in the Rhythm tutorial. The second layer uses `.cut(2)`: that way the cymbals cut each other off, but not the drums. Listen with headphones.',
        ],
      },
      {
        title: 'The acid bass',
        text: [
          'Under the drums, an **acid** bass: the sound of the Roland TB-303, a machine much loved in electronic music. It is a sawtooth wave with a very **resonant** filter (`.lpq(15)`) that opens and closes.',
          '`.sometimesBy(0.25, x => x.add(note(12)))` sometimes makes a note jump an octave up: these are the typical 303 flicks. The short release makes the notes dry and bouncy.',
        ],
      },
      {
        title: 'The melancholy pad',
        text: [
          'Contrast is the secret of this style: above the rhythmic chaos floats something **sweet and slow**. Long chords, a soft attack (`.attack(0.8)`), a very long release (`.release(3)`) and lots of reverb.',
          '`Am7` and `F^7` are two seventh chords, with a suspended, slightly nostalgic sound. `.slow(4)` makes each chord last four cycles: at 170 bpm the cycles fly by, and the pad has to stay calm.',
          'To make it **muffled**, as if it were coming from another room, we use the low-pass filter from the Melody tutorial: `.lpf(700)` cuts the highs. And the reverb is huge: `.room(0.95)` is almost all reverb, and `.roomsize(10)` is the cathedral from the Ambient soundscape tutorial.',
        ],
        try: 'Try lpf(300): the pad sounds like it is coming from underwater. Then lpf(3000) to hear the difference.',
      },
      {
        title: 'All together',
        text: [
          'Here is the complete track, one layer per `$:` line. The drums are the ones from the **glitch** step: the break with its rolls, which now and then plays backwards, stutters or shuffles itself. All the voices stay in time with each other, even though each one does its own chaos.',
          'Play it live the way a producer would: start with just the pad, then remove the `_` from the other lines one at a time and run it again each time with Cmd+Enter.',
        ],
        try: 'When all the voices are playing, try changing setcpm(170/4) to setcpm(85/4): the same track at half speed becomes almost trip hop.',
      },
      {
        title: 'A break that never repeats',
        text: [
          'One last step, for a track that keeps changing. In this tutorial you built **four ways** of playing the break: the segments in order with `run(16)`, the rebuilt break, the one with rolls and the one with the rising roll.',
          '`randcat()` puts them all together and on every cycle **picks one at random**. Inside the parentheses the patterns are separated by commas, just like in `stack`. Except that `stack` plays them all at the same moment, `randcat` one at a time.',
          'The rising roll carries its own `.speed()` with it, because it is inside the parentheses. Instead `.s("xbreak1")`, the glitch and `.cut(1)`, written after the closing parenthesis, apply to all four.',
          'Every cycle the drums change face, the glitch adds surprises, and underneath the bass and the pad hold the thread. Let it play for a long time: you will never hear two identical minutes. Well done! Take the track to the LAB with **→ EDITOR** and make it yours.',
        ],
        try: 'Add a fifth pattern of your own inside randcat, for example n("0 0 2 0 5 5 7 7*4 8 8 10 11 13 13 14*8 15"). Remember the comma after the one before it.',
      },
    ],
  },

} });
