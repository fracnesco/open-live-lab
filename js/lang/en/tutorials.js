/* English translation of js/tutorials.js (the TUTORIAL_GROUPS labels and the
   tutorials defined there). Steps match the Italian by position; the code is
   the same as the Italian, so it is not repeated here. */

I18N.content('en', 'tutorials', {
  groups: {
    'Suono': 'Sound',
    'Visuale': 'Visual',
    'Insieme': 'Together',
  },
  items: {

    /* ── SOUND · Rhythm ─────────────────────────────────────────────── */
    ritmo: {
      title: 'Rhythm',
      desc: 'From the first kick and snare to a full groove with a bassline: mini-notation, functions that transform the rhythm, several patterns together, and stack.',
      steps: [
        {
          title: 'Kick and snare',
          text: [
            'Hi! Let\'s start from the heart of every rhythm: the **kick** and the **snare**. In Strudel they are called `bd` (bass drum) and `sd` (snare drum).',
            'Press **▶ RUN** below, or Cmd+Enter inside the box. Hear it? Boom, tak, boom, tak… forever.',
            'What you wrote between the quotes is called **mini-notation**: a tiny language made just for writing rhythms. Strudel plays it in a **cycle**, a bar that starts over again without ever stopping.',
          ],
          try: 'Press ■ STOP to stop, then try again. You can change the code as much as you like: ↺ ORIGINAL always takes you back to the starting point.',
        },
        {
          title: 'Four beats',
          text: [
            'When you write more sounds, the cycle is split into **equal parts**. With four sounds you get four beats, like in most songs.',
            'The cycle always lasts the same time: adding sounds doesn\'t make it longer, it makes it denser.',
          ],
          try: 'Try "bd bd sd bd": moving a single hit is enough to change the character of the rhythm.',
        },
        {
          title: 'Silence counts',
          text: [
            'The tilde `~` is a **rest**: it takes up its place in the cycle, but makes no sound.',
            'Here the kick hits on the first and third beats, the snare on the second and fourth, and the rests leave room to breathe.',
          ],
        },
        {
          title: 'Here come the hi-hats',
          text: [
            'Now let\'s add the **cymbals**: `hh` is the hi-hat.',
            'The secret is the **comma**: it separates two sequences that play **at the same time**, each with its own steps. On one side kick and snare, on the other four hi-hats.',
          ],
        },
        {
          title: 'Repeating with *',
          text: [
            'Writing `hh hh hh hh hh hh hh hh` is boring. The asterisk repeats for you: `hh*8` is eight hi-hats in one cycle.',
            'It works on a group of sounds too, as you\'ll see shortly.',
          ],
          try: 'Try hh*16 for a busier rhythm, or hh*6 for one that swings.',
        },
        {
          title: 'Splitting a beat with [ ]',
          text: [
            'Square brackets take **a single slot** of the cycle and divide it further. `[~ bd]` is a beat split in half: first silence, then kick.',
            'This is how you make offbeat hits, the ones that push the rhythm forward.',
          ],
          try: 'Put [bd bd bd] in place of the first bd: a kick triplet.',
        },
        {
          title: 'Every other cycle with < >',
          text: [
            'Angle brackets pick **one element per cycle**: the first one on the first pass, the second one on the second pass, then back to the start.',
            'Here the snare alternates with a hand clap, `cp`. The rhythm becomes a phrase two cycles long, without writing twice as much.',
          ],
          try: 'Try <sd cp [cp cp]>: three different cycles before it starts over.',
        },
        {
          title: 'Euclidean rhythms with ( )',
          text: [
            '`bd(3,8)` means: **3 hits spread over 8 steps**, as evenly as possible. With just two numbers you get rhythms found in music all over the world.',
            '(3,8) is the tresillo of Cuban music, (5,8) the cinquillo.',
          ],
          try: 'Try bd(5,8) and then bd(7,16). The hi-hat can be Euclidean too: hh(5,8).',
        },
        {
          title: 'Long notes with @, random hits with ?',
          text: [
            'Two last tricks. The at sign gives a **weight**: `bd@3` takes three slots instead of one. The question mark makes a hit play **only sometimes**, at random.',
            'With `hh*16?` some of the hi-hats disappear on every pass: the rhythm is never quite the same.',
          ],
        },
        {
          title: 'Tempo',
          text: [
            '`setcpm()` sets how many **cycles per minute** play. If your cycle has 4 beats, the beats per minute (bpm) are cpm × 4. For 100 bpm you write `setcpm(100/4)`.',
            'It goes on a line of its own, before the rhythm.',
          ],
          try: 'Set the tempo to 140/4, then to 70/4: the same rhythm changes character.',
        },
        {
          title: 'Functions: ply',
          text: [
            'So far we have worked **inside** the quotes. Now we attach **functions** to the pattern with a dot: `.name()`. Each function transforms the whole rhythm.',
            '`.ply(2)` repeats each hit twice, in the time of one. Here we use `"<1 2>"`: one normal cycle, one doubled cycle. Yes, functions accept mini-notation too!',
          ],
          try: 'Try .ply(3), or .ply("<1 2 3>").',
        },
        {
          title: 'degradeBy: dropping random hits',
          text: [
            '`.degradeBy(0.4)` randomly drops about **40%** of the hits. A stiff rhythm starts to breathe and is never the same twice.',
            'It does the same job as the `?` you saw before, but you choose how much: 0 drops nothing, 1 drops everything.',
          ],
          try: 'Try 0.1 and 0.8. There\'s only the hi-hat here: soon you\'ll see how to combine it with kick and snare without the kick disappearing too.',
        },
        {
          title: 'fast and slow',
          text: [
            '`.fast(2)` fits the pattern **twice** into one cycle, `.slow(2)` stretches it over two cycles.',
            'Unlike `setcpm`, it only changes this pattern, not the tempo of the whole piece.',
          ],
        },
        {
          title: 'rev and iter',
          text: [
            '`.rev()` plays the cycle **backwards**, from the end to the start.',
            '`.iter(4)` splits the cycle into 4 pieces and on every pass **starts from a different piece**: the rhythm seems to spin around itself.',
          ],
          try: 'Replace .iter(4) with .rev(), then try using both.',
        },
        {
          title: 'sometimes: every now and then something changes',
          text: [
            '`.sometimes()` applies a transformation **only sometimes**, roughly one time in two.',
            'The part `x => x.speed(2)` reads like this: "take the pattern, call it x, and play it at double speed". Double speed makes the hit higher.',
          ],
          try: 'Change speed(2) to ply(2): every now and then a hit doubles.',
        },
        {
          title: 'Many functions in a row',
          text: [
            'Functions can be placed **one after the other**: each one works on the result of the one above. Read the chain from top to bottom.',
            '`.gain()` sets the volume: this way the rhythm isn\'t too loud.',
          ],
          try: 'Put // in front of a line to "switch it off" without deleting it, then run again.',
        },
        {
          title: 'A bassline',
          text: [
            'Now some music under the drums: the **bass**. Instead of a sample we use `note()`, which plays real notes: `c2` is a low C, `eb2` an E flat, `g1` an even lower G.',
            '`sawtooth` is a synthesizer with a rich sound, and `.lpf(400)` is a filter that cuts the highs and makes it soft and deep.',
          ],
        },
        {
          title: 'Watch out: only the last one plays!',
          text: [
            'Let\'s try putting drums and bass one under the other. Press ▶ and listen carefully…',
            'You only hear the bass, right? When there are several patterns on different lines, Strudel **plays only the last one** and ignores the others, without any warning. It\'s the most common mistake: don\'t worry, it\'s easy to fix.',
          ],
        },
        {
          title: 'The fix: $:',
          text: [
            'Put `$:` at the start of **every** pattern: that way they all play together, and always stay perfectly in time with each other.',
            'Now each instrument has its own line. And here\'s the bonus: functions only apply to the line they are on. The `.degradeBy()` acts on the hi-hat, while kick and snare stay tight!',
          ],
        },
        {
          title: 'Muting and unmuting',
          text: [
            'By adding an underscore, `_$:`, a line is **muted** without having to delete it.',
            'It\'s the typical live coding move: drop the drums, leave the bass alone, then bring them back in. Each time, run again with Cmd+Enter.',
          ],
          try: 'Move the _ from one line to another, and try building a little "arrangement": first the bass, then the kick, then the hi-hats.',
        },
        {
          title: 'stack: many patterns in one',
          text: [
            'There\'s another way to play several patterns together: `stack()`. Inside the parentheses you put the patterns, separated by **commas**, and it **stacks** them into a single pattern.',
            'Each one can have its own functions, just like with `$:`.',
          ],
          try: 'Mind the commas at the end of each line (except the last): they are what separates the patterns.',
        },
        {
          title: 'One function for the whole stack',
          text: [
            'Here\'s the magic of `stack`: since it is **a single pattern**, you can attach a function after the closing parenthesis and transform **everything at once**, drums and bass.',
            'Here `.lpf()` with `sine.range(300, 5000).slow(8)` is a filter that slowly opens and closes over the whole track, the way DJs do.',
          ],
        },
        {
          title: 'Transforming the whole groove',
          text: [
            'All the functions you\'ve learned work on the whole stack too. Here every four cycles the groove doubles its speed, sometimes it flips backwards, and a bit of reverb (`.room()`) puts everything in the same room.',
            'Well done: you\'ve built a complete groove! Press **→ EDITOR** to take it to the LAB and keep changing it, or **+ TIMELINE** to use it in your performance.',
          ],
          try: 'Remove one of the final functions at a time and listen to what changes. Then invent a combination of your own.',
        },
      ],
    },

    /* ── SOUND · Melody ─────────────────────────────────────────────── */
    melodia: {
      title: 'Melody',
      desc: 'A melody on a sawtooth synth, its envelope and filter, then arpeggiated chords, scales, random notes and a chord progression that makes the arpeggio evolve.',
      steps: [
        {
          title: 'A simple melody',
          text: [
            'Hi again! This time we play **notes**. Instead of `sound("bd")` we use `note()`, and between the quotes we write note names.',
            'The names are the letters **c d e f g a b**, the usual English note names. The number after the letter is the **octave**: `c4` is middle C on the piano, `c5` the same C one octave higher.',
            '`.sound("sawtooth")` picks the timbre: the **sawtooth**, a bright, rich waveform, the most used in synths. The mini-notation is the same as for rhythm: `~` is a rest.',
          ],
          try: 'Change a few notes. You can also try the other timbres: sine, triangle, square.',
        },
        {
          title: 'Attack and release',
          text: [
            'Like this the sound is a bit stiff: it starts and stops abruptly. But every note has a shape in time, the **envelope**.',
            '`.attack()` is how long the note takes to reach full volume. `.release()` is how long it takes to fade out after it ends. Both are measured in **seconds**.',
            'A short attack removes the initial click, a longer release leaves a tail that links one note to the next. The sound becomes more alive, more like a real instrument.',
          ],
          try: 'Try attack(0.3): the sound "swells" like a bow on a string. Then attack(0) and release(0.05): it becomes dry like a pluck.',
        },
        {
          title: 'The low-pass filter',
          text: [
            'The sawtooth is full of **high harmonics**, which is why it sounds a bit harsh. A **low-pass** filter cuts them: it lets frequencies below a certain value through and attenuates those above.',
            '`.lpf(800)` cuts above 800 Hertz. Low numbers make the sound dark and soft, high numbers leave it bright.',
            '`.lpq()` is the **resonance**: it boosts the frequencies right at the cutoff point and gives that "acid" sound typical of synths.',
          ],
          try: 'Try lpf(300) and lpf(3000). Then raise lpq to 15.',
        },
        {
          title: 'A moving filter',
          text: [
            'The filter gets even more interesting when it **moves**. Instead of a fixed number we use `sine`, a wave that slowly rises and falls.',
            '`sine.range(300, 3000)` makes it swing between 300 and 3000 Hz, and `.slow(4)` makes it go around once every four cycles. Listen to the melody opening and closing.',
          ],
        },
        {
          title: 'A chord',
          text: [
            'A **chord** is made of several notes played together. In mini-notation you write them inside `[ ]` separated by **commas**.',
            '`[c3,e3,g3,c4]` is a C major chord: C, E, G and the C an octave above.',
          ],
        },
        {
          title: 'Arpeggiating',
          text: [
            'To **arpeggiate** means playing the notes of a chord one at a time instead of all together, like a guitarist picking the strings.',
            '`.arp()` picks the notes of the chord by their **position**: 0 is the lowest, 1 the second, and so on. `"0 1 2 3"` goes up, `"3 2 1 0"` goes down.',
          ],
          try: 'Invent your own pattern: "0 2 1 3", or "0 [1 2] 3 ~".',
        },
        {
          title: 'Notes from a scale',
          text: [
            'Writing note names is fine, but there\'s an easier way: **scales**. A scale is a selection of notes that sound good together.',
            'With `n()` you write **numbers** instead of names, and `.scale("C4:minor")` turns them into the notes of the C minor scale: 0 is the first note, 1 the second, 2 the third…',
            'The nice thing is that inside a scale you **never play a wrong note**: whatever number you write, it sounds right.',
          ],
          try: 'Change minor to major, then to pentatonic or dorian. Same numbers, different colors.',
        },
        {
          title: 'A melody with numbers',
          text: [
            'Now let\'s use numbers to write a real melody. You can also use **negative** numbers (notes below the first one) and numbers larger than 7 (the octave above).',
          ],
        },
        {
          title: 'Random notes from a chord: scramble',
          text: [
            '`.scramble(8)` splits the cycle into 8 parts and for each one **picks a random** note from the pattern. Notes can repeat, and every pass is different.',
            'If the pattern is an arpeggiated chord, you get a random melody made only of the chord\'s notes.',
          ],
        },
        {
          title: 'Random notes from a scale',
          text: [
            'The same trick with a scale: `scramble` picks among the degrees, and the scale makes sure every note is right.',
            'There\'s also `.shuffle(8)`: it shuffles the notes like a deck of cards, so on every pass each one appears **only once**.',
          ],
          try: 'Put shuffle in place of scramble and listen to the difference.',
        },
        {
          title: 'A chord progression',
          text: [
            'A **progression** is a sequence of chords. With `< >` we play one per cycle.',
            '`chord()` reads chord symbols like a songbook: **C Am F G** are C major, A minor, F major and G major. `.voicing()` picks the notes of each chord and lays them out nicely.',
          ],
        },
        {
          title: 'The arpeggio follows the chords',
          text: [
            'Now we add `.arp()`. The arpeggio\'s **pattern** always stays the same, but every cycle it is applied to a different chord: the notes change by themselves.',
            'That\'s how many songs work: the right hand repeats the same figure, and the harmony underneath makes it evolve.',
          ],
        },
        {
          title: 'The pattern can change too',
          text: [
            'The arpeggio pattern accepts mini-notation, so it can alternate with `< >` too: one cycle goes up, one cycle goes down, and so on.',
            'Chords and pattern each go around on their own: 4 chords and 2 patterns recombine in ever new ways.',
          ],
        },
        {
          title: 'Arpeggio and functions',
          text: [
            'Now let\'s add the functions you already know. `.off(0.125, x => x.add(note(12)))` adds a **copy** of the arpeggio, shifted by an eighth and an octave higher (12 semitones): it sounds like a shimmering echo.',
            '`.sometimes(x => x.ply(2))` doubles the notes now and then, and the moving filter and the reverb (`.room()`) do the rest.',
          ],
          try: 'Add .scramble(8) right after .arp(...): the arpeggio becomes unpredictable but always stays inside the chord.',
        },
        {
          title: 'With the bass underneath',
          text: [
            'To finish, let\'s put the **bass** under the arpeggio. `.rootNotes(2)` takes the main note of each chord, in octave 2, the bass octave. The two patterns play together thanks to `$:`, as in the Rhythm tutorial.',
            'Press **→ EDITOR** to take it to the LAB, or **+ TIMELINE** to use it in your performance.',
          ],
        },
      ],
    },

    /* ── SOUND · Counterpoint ───────────────────────────────────────── */
    contrappunto: {
      title: 'Counterpoint',
      desc: 'Several independent melodies playing together: different registers, different rhythms, contrary motion, up to three voices and the canon.',
      steps: [
        {
          title: 'What counterpoint is',
          text: [
            '**Counterpoint** is the art of playing several **independent** melodies together, each with a life of its own, that still sound good together. Bach was its master.',
            'Let\'s start from the melody of the **Melody** tutorial: numbers from the C minor scale, sawtooth, envelope and filter. This will be our first voice.',
          ],
        },
        {
          title: 'Registers',
          text: [
            'The **register** (or range) is the pitch zone a voice moves in: low, middle or high. In a choir they are the basses, tenors, altos and sopranos.',
            'To move a melody to another register, just change the octave number in the scale: `C4:minor` is the middle zone, `C3:minor` an octave below, `C5:minor` an octave above.',
            'Here the same melody moves through three registers, one per cycle. Listen to how its character changes.',
          ],
        },
        {
          title: 'Two voices: high and low',
          text: [
            'Now the first voice in the **high** register and a second one in the **low** register, with `$:` in front of each so they play together.',
            'The two voices also have a **different rhythm**: the high one moves fast (8 notes per cycle), the low one slowly (4 notes). That way the ear tells them apart easily: it\'s the first rule of counterpoint.',
            'The low voice\'s filter is more closed (`lpf(700)`), so it doesn\'t cover the high one.',
          ],
          try: 'Put _ in front of one of the two $: lines to hear the voices separately, then remove it and listen to them together again.',
        },
        {
          title: 'Contrary motion',
          text: [
            'Another secret: when one voice **goes up**, the other **goes down**. It\'s called **contrary motion**, and it makes the voices even more independent.',
            'Here the high voice climbs up the scale, the low one walks the same path backwards. Remember `.rev()` from the Rhythm tutorial? It\'s exactly what we need.',
          ],
        },
        {
          title: 'Two voices answering each other',
          text: [
            'Let\'s put the three ideas together: different registers, different rhythms and some contrary motion. With `< >` the phrases change every cycle, so the dialogue between the voices lasts longer.',
            'Notice how the low voice moves mostly when the high one stops (on the rest `~`): the voices **answer each other**, like in a conversation.',
          ],
        },
        {
          title: 'Three voices',
          text: [
            'Let\'s add a third voice **in the middle**, in the central register (`C4:minor`). To avoid confusion we give it yet another rhythm: long notes, two per cycle, holding the other two together.',
            'Now each voice has its own register (high, middle, low) and its own pace (fast, slow, medium). Try following one at a time with your ear.',
          ],
          try: 'Mute one voice at a time with _$: and listen to how the whole changes.',
        },
        {
          title: 'The canon',
          text: [
            'The **canon** is the most famous kind of counterpoint: a single melody that **chases itself**, as in "Frère Jacques". The voices sing the same thing, but come in at different moments.',
            '`.off(0.5, x => x.add(n(-7)))` creates a copy of the melody that starts half a cycle later and 7 degrees lower: an octave below, because the scale has 7 notes. A second `.off` adds the third voice.',
            'Well done: you\'ve written a three-voice canon! Take it to the LAB with **→ EDITOR** and try changing the melody: the other voices will follow it.',
          ],
        },
      ],
    },

    /* ── SOUND · Ambient soundscape ─────────────────────────────────── */
    ambient: {
      title: 'Ambient soundscape',
      desc: 'A soundscape from a single sample: slowed down, randomly pitched and immersed in a very long reverb.',
      steps: [
        {
          title: 'A long sample',
          text: [
            'In ambient music sounds don\'t rush: they spread out, overlap, fill the space. Let\'s start from a fairly long **sample**.',
            '`tabla` is a folder of tabla sounds, an Indian drum. The colon picks **which** sample in the folder: counting starts at 0, so `tabla:2` is the third one. It\'s one of the longest in our library, about 3 seconds, a deep hit that rings for a long time.',
            '`s()` is a shortcut for `sound()`: they do exactly the same thing.',
          ],
          try: 'Also listen to tabla:0 and tabla:1, the other two samples in the folder.',
        },
        {
          title: 'Giving it space',
          text: [
            'A cycle lasts about 2 seconds, but our sample lasts 3: the repetitions overlap and it turns into a rhythm.',
            'With `.slow(2)` the sample plays **once every two cycles**. Each hit has time to die out before the next one, and there\'s silence around it: in ambient, emptiness is part of the music too.',
          ],
        },
        {
          title: 'A random pitch',
          text: [
            'Now let\'s change the **pitch** of the sample. `.speed()` sets how fast it is read: at 1 it sounds normal, at 0.5 it plays at half speed, an octave lower and twice as long.',
            '`rand` is a **random** number between 0 and 1, different for every hit. `rand.range(-0.5, 0.5)` brings it between -0.5 and 0.5. So every hit has a different pitch, always much lower than the original.',
            'And the negative numbers? A negative speed reads the sample **backwards**, from the end to the start: the hit becomes a sound that swells instead of dying away. The closer the number is to 0, the slower, lower and longer the sound, until it almost disappears.',
          ],
          try: 'Listen for a few cycles: no two hits are the same. Then try rand.range(0.2, 0.5) to hear only the "forward" ones.',
        },
        {
          title: 'A huge reverb',
          text: [
            'Now the magic touch: **reverb**, the sound that bounces off the walls of a room and keeps going after the source has stopped.',
            '`.room(0.9)` is **how much** reverb to add, from 0 (none) to 1 (almost only reverb). `.roomsize(10)` is the **size** of the room, and so how long the tail lasts: at 10 we\'re in a cathedral, and every hit trails on for many seconds.',
            'The tails of the hits overlap and melt into a continuous carpet. `.gain(0.8)` lowers the volume a little, because all that reverb adds up.',
          ],
          try: 'Compare roomsize(1) and roomsize(10): same amount of reverb, very different rooms.',
        },
        {
          title: 'A second layer',
          text: [
            'A soundscape is made of **layers**. Let\'s add `hh:1`, the crash cymbal from the hi-hat folder, with the same treatment: slowed down, random pitch, lots of reverb.',
            'The cymbal uses `.slow(3)`, the tabla `.slow(2)`: the two layers meet at ever-changing points and the soundscape never repeats itself. The `.lpf(2000)` filter removes the cymbal\'s sharpest highs.',
          ],
          try: 'Add a third layer with another sample, for example east:2 or crow. Let your ear guide you.',
        },
      ],
    },
  },
});
