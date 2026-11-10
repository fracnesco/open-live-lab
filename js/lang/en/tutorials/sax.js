/* English · tutorial «Ambient with sax» (translates js/tutorials/sax.js).
   Steps match by position; the code has no comments, so it is not repeated here. */

I18N.content('en', 'tutorials', { items: {

  'ambient-sax': {
    title: 'Ambient with sax',
    desc: 'A soundscape made of saxophone notes: very slow, picked at random from the ones that sound good together, played backwards and bathed in a huge reverb.',
    steps: [
      {
        title: 'A long note',
        text: [
          'In ambient music sounds do not rush: they spread out, overlap, fill the space. We start from a **saxophone** note.',
          'The `sax` folder holds one note per file, each more than 4 seconds long. `sax:9` is a **D**. A cycle lasts about 2 seconds, so each note has not finished yet when the next one starts: the repeats overlap.',
          '`s()` is a shortcut for `sound()`: they do exactly the same thing.',
        ],
        try: 'Listen to sax:0 (A), sax:5 (C) and sax:18 (G) too. In ♫ SOUNDS you will find the name of every note.',
      },
      {
        title: 'A very slow melody',
        text: [
          'Now let\'s make a little melody. `n()` picks the **number** of the file and `.s("sax")` the folder: `n("9").s("sax")` is the same as `s("sax:9")`.',
          'The `< >` brackets play **one note per cycle**, taking turns: D, C, A, E. With `.slow(2)` each note lasts two cycles, about 4 seconds, just as long as the sample: one ends and the next begins.',
        ],
      },
      {
        title: 'Random notes, but in tune',
        text: [
          'Instead of choosing the order ourselves, we let chance decide. In mini-notation the bar `|` means **“one of these, at random”**: on every turn Strudel picks one.',
          'The five notes are A, C, D, E, G: the **pentatonic scale** of A minor. It is a scale with no “awkward” notes: whatever order comes out, it sounds good.',
        ],
        try: 'Add 1 or 11 to the list: they are A and E again, but from a second take, played a little differently.',
      },
      {
        title: 'Lower, and backwards',
        text: [
          'With the tabla the pitch was completely random, with `rand`. But the sax is **pitched**: any old pitch would put it out of tune. We choose only speeds that stay on the same note.',
          '`.speed(1)` is the normal sound. `0.5` goes at half speed: the same note **an octave lower**, twice as long. `-0.5` is the same but **backwards**: the note swells out of nothing instead of attacking, like a breath.',
          'Again `|` chooses at random, one of the three each time.',
        ],
        try: 'Try .speed(2): an octave higher, and half as long. Then try .speed(0.7) and hear how it goes out of tune.',
      },
      {
        title: 'A huge reverb',
        text: [
          'Now the **reverb**: `.room(0.9)` is how much reverb to add (from 0 to 1), `.roomsize(10)` the size of the room. At 10 we are in a cathedral, and every note trails on for many seconds.',
          '`.pan(rand)` puts each note at a different point between the left and the right speaker: the sound spreads out in space. `.gain(0.7)` lowers the volume, because all those tails add up.',
        ],
        try: 'Listen with headphones: the notes arrive from different places.',
      },
      {
        title: 'The drone',
        text: [
          'Under the melody we put a **drone**: a low note that never changes, as in bagpipes or Indian music. It holds everything else together.',
          'It is the D (`sax:9`) played at `.speed(0.25)`: two octaves down and four times as long, almost 18 seconds. With `.slow(4)` it restarts every 8 seconds, so the notes overlap and the sound never stops. `.lpf(800)` darkens it even more.',
          'The two layers have different timings (`.slow(2)` and `.slow(4)`) and the melody is always different: the landscape never repeats itself.',
        ],
        try: 'Change the drone to sax:0 (A) and listen to how the colour changes. Then add a third layer: the hh:1 cymbal from the other ambient tutorial fits perfectly.',
      },
    ],
  },

} });
