/* English · tutorial «Acid techno» (translates js/tutorials/acid.js).
   Steps match by position; the code has no comments, so it is not repeated here. */

I18N.content('en', 'tutorials', { items: {

  acid: {
    title: 'Acid techno',
    desc: 'An acid techno track built piece by piece: drums made from break segments, the Roland TB-303 line with its “squelching” filter, and finally the shape of the track, with breakdown and drop.',
    steps: [
      {
        title: 'What acid is',
        text: [
          'Chicago, 1987. A group of kids, **Phuture**, buy a second-hand **Roland TB-303**: a little box designed to play bass lines for guitarists, a flop nobody wanted any more. Twiddling its knobs at random, they discover a sound never heard before, a bass that gurgles and squeals. The track is called “Acid Tracks”, and the sound becomes **acid**.',
          'In the \'90s, in England and Berlin, that sound meets techno, faster and harder: this is **acid techno**. In this tutorial we build a track, one piece at a time.',
          'Everything starts from the **kick**, one hit on every beat. We take it from the `dnb1` break: segment 0 is a kick. `.speed(0.85)` plays it a little slower, so lower. `setcpm(132/4)` means 132 beats per minute.',
        ],
        try: 'Try .speed(0.7) for a deeper kick, or .speed(1) to hear it as it is in the break.',
      },
      {
        title: 'The hi-hats',
        text: [
          'On top of the kick, two layers of hi-hats. Each one on its own `$:` line, so they all play together.',
          'The first is the **offbeat** hi-hat: `[~ dnb1:4]*4` is “rest, hi-hat” four times, that is, a hi-hat exactly between one kick and the next. `.hpf(6000)` removes everything except the highs.',
          'The second runs in **sixteenths** with segment 3 of `xbreak1`, a light hi-hat. `.gain("[0.4 0.8]*8")` plays them one soft and one loud: without it they would sound like a sewing machine.',
        ],
      },
      {
        title: 'The clap',
        text: [
          'On the second and fourth beat comes the sharp hit: the **clap**. A producers\' trick is **layering**: stacking two sounds to make a single, fuller one.',
          'In mini-notation a comma inside square brackets plays several things **together**: `[cp, xbreak1:2]` is the clap `cp` and, at the same instant, the snare from the break. `.room(0.3)` adds a bit of reverb.',
        ],
        try: 'Take cp out of the brackets, then put it back and take out xbreak1:2: can you hear what each of the two brings?',
      },
      {
        title: 'The break as a “top loop”',
        text: [
          'The last drum layer: the **whole** `xbreak1` break, all 16 of its segments in order with `run(16)`. But filtered: `.hpf(3000)` removes the lows, so the break\'s kick does not get in the way of ours and only the hi-hats and ghost notes remain. DJs call it a **top loop**: a layer that makes the top end shimmer.',
          'The break is recorded at 85 bpm and we are going at 132: each segment would last longer than its slot. `.cut(1)` chops it when the next one starts, and the break becomes dry and fast.',
        ],
        try: 'Try .hpf(300): the whole break comes in, and the rhythm becomes almost jungle.',
      },
      {
        title: 'The 303: the notes',
        text: [
          'Now the star of the show. For a moment we drop the drums and listen to it alone.',
          'The 303 plays a **sawtooth** wave, the richest and buzziest sound in synths. The notes are sixteenths in **A minor**, almost all on the low A (`a1`), with a few jumps: the octave above (`a2`), C, G, E flat. `~` is a rest.',
          '`.release(0.1)` makes each note end immediately: short, bouncy notes. Listen to how **harsh** it is like this, without a filter. In the next steps we tame it.',
        ],
      },
      {
        title: 'The low-pass filter',
        text: [
          'The most important knob on the 303 is the **low-pass filter**: it lets low frequencies through and cuts the high ones, the treble. The point where it cuts is called the **cutoff**: `.lpf(600)` sets the cutoff at 600 hertz.',
          'The sound becomes dark and round, as if it were coming through a wall.',
        ],
        try: 'Try .lpf(200) and .lpf(3000): where do you like it best?',
      },
      {
        title: 'Resonance',
        text: [
          'And here is the secret of acid. The filter has a second knob, the **resonance**: it makes the sound “whistle” right at the cutoff.',
          '`.lpq(20)` is a very high resonance. Listen: each note now has a little whistle inside, a liquid gurgle. It is the sound Phuture discovered by accident.',
        ],
        try: 'Try .lpq(0), then 5, then 30: hear the whistle grow.',
      },
      {
        title: 'Turning the knob',
        text: [
          'People who play acid live never leave the cutoff knob still: they turn it slowly, for minutes. It is this movement that builds tension on the dance floor.',
          'Instead of a hand we use a **sine** wave: `sine.range(300, 3000)` goes up and down between 300 and 3000 hertz, and `.slow(16)` makes one full turn last 16 bars, almost half a minute.',
          'Let it play for a long time: the sound opens up, gets sharp, then closes again.',
        ],
        try: 'Try .slow(4): the knob turns super fast, almost like an effect.',
      },
      {
        title: 'The squelch',
        text: [
          'On the 303 the filter does not move only with the knob: on every note it **jumps** up and immediately falls back. This is the **squelch**, which gives every note a little “wow”.',
          'In Strudel it is the **filter envelope**: `.lpenv(4)` says how far it opens on each note, `.lpdecay(0.15)` how quickly it falls back (0.15 seconds), `.lpsustain(0)` that it goes all the way back down.',
        ],
        try: 'Try .lpenv(8) for a huge squelch, or .lpdecay(0.05) for a very short one.',
      },
      {
        title: 'Jumps and grit',
        text: [
          'Two finishing touches for the 303. The first: `.sometimesBy(0.2, x => x.add(note(12)))` now and then makes a note jump **an octave up**. The line stays the same, but it never sounds the same twice.',
          'The second: acid techno likes it **dirty**. `.shape(0.4)` adds **distortion**, like an amp pushed too hard. And a **delay**: `.delay(0.3)` repeats each note after 0.34 seconds, a dotted eighth, so the repeats fall between one note and the next.',
        ],
        try: 'Raise shape to 0.8: mind your ears!',
      },
      {
        title: 'All together',
        text: [
          'Drums and 303 together. Every line starts with `_$:`, that is, **muted**, except the kick.',
          'Play it like a DJ: remove the `_` from one line at a time and run it again each time with Cmd+Enter. A classic order: kick, hi-hats, clap, top loop, and last of all the 303. Each layer that comes in raises the energy.',
        ],
      },
      {
        title: 'Breakdown and drop',
        text: [
          'The last piece is the **shape**. A techno track does not change its notes: it changes what is there and what is missing.',
          '`.mask("<1!6 0!2>")` is a switch that changes every bar: six bars on (`1!6`), two off (`0!2`). We put it on the kick, the offbeat hi-hat and the clap: every eight bars the drums disappear and only the 303 is left, with the top loop hissing. This is the **breakdown**. Then the kick comes back: this is the **drop**, and on the dance floor the arms go up.',
          'The top loop does the opposite: `.hpf("<3000!6 300!2>")` opens the filter exactly in the two breakdown bars, and the whole break comes in. Well done: you have built an acid techno track! Take it to the LAB with **→ EDITOR** and change the 303 line: two different notes are enough to make it yours.',
        ],
        try: 'Change 1!6 0!2 to 1!14 0!2: sixteen bars instead of eight, as in real tracks. Or put a mask on the 303 too, with "<1!7 0>".',
      },
    ],
  },

} });
