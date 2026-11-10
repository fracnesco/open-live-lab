/* ════════════════════════════════════════════════════════════════════════
   TUTORIAL · Acid techno — un file a parte, stesso formato di js/tutorials.js

   Si carica DOPO js/tutorials.js e si aggiunge in fondo a TUTORIALS.

   Un brano costruito un pezzo alla volta: prima la batteria (tutta presa
   dai due break, un segmento alla volta), poi la linea della 303 e le sue
   manopole, infine la forma del brano. Il tempo è 132 bpm dall'inizio alla
   fine, così ogni passo si può incollare sotto al precedente.

   Segmenti usati (vedi la mappa in js/snippets.js, sezione generi):
     dnb1:0 cassa · dnb1:4 hi-hat · xbreak1:3 hi-hat leggero
     xbreak1:2 rullante · xbreak1 intero come top loop
   La linea della 303 è sempre la stessa, in La minore: cambiano solo le
   manopole. I ritardi (delaytime) sono un ottavo col punto a 132 bpm.
   ════════════════════════════════════════════════════════════════════════ */

TUTORIALS.push({
  id: 'acid', engine: 'strudel',
  title: 'Acid techno',
  desc: 'Un brano acid techno costruito pezzo per pezzo: una batteria fatta con i segmenti dei break, la linea della Roland TB-303 con il suo filtro che «squittisce», e alla fine la forma del brano, con breakdown e drop.',
  steps: [

    /* ── 1 · la batteria ──────────────────────────────────────────── */
    {
      title: 'Che cos\'è l\'acid',
      text: [
        'Chicago, 1987. Un gruppo di ragazzi, i **Phuture**, compra di seconda mano una **Roland TB-303**: una scatoletta nata per fare il basso ai chitarristi, un flop che nessuno voleva più. Girando a caso le sue manopole scoprono un suono mai sentito, un basso che gorgoglia e squittisce. Il pezzo si chiama «Acid Tracks», e il suono diventa **acid**.',
        'Negli anni \'90 in Inghilterra e a Berlino quel suono incontra la techno, più veloce e più dura: è l\'**acid techno**. In questo tutorial ne costruiamo un brano, un pezzo alla volta.',
        'Tutto parte dalla **cassa**, un colpo su ogni battito. La prendiamo dal break `dnb1`: il segmento 0 è una cassa. `.speed(0.85)` la suona un po\' più lenta, quindi più grave. `setcpm(132/4)` vuol dire 132 battiti al minuto.',
      ],
      code: `setcpm(132/4)
s("dnb1:0*4")
  .speed(0.85)`,
      try: 'Prova .speed(0.7) per una cassa più profonda, o .speed(1) per sentirla com\'è nel break.',
    },
    {
      title: 'Gli hi-hat',
      text: [
        'Sopra la cassa, due strati di hi-hat. Ognuno sulla sua riga `$:`, così suonano tutti insieme.',
        'Il primo è l\'hi-hat **in levare**: `[~ dnb1:4]*4` è «pausa, hi-hat» quattro volte, cioè un hi-hat esattamente fra un colpo di cassa e l\'altro. `.hpf(6000)` toglie tutto tranne gli acuti.',
        'Il secondo corre a **sedicesimi** con il segmento 3 di `xbreak1`, un hi-hat leggero. `.gain("[0.4 0.8]*8")` li suona uno piano e uno forte: senza, sembrerebbero una macchina da cucire.',
      ],
      code: `setcpm(132/4)
$: s("dnb1:0*4").speed(0.85)
$: s("[~ dnb1:4]*4").hpf(6000)
$: s("xbreak1:3*16").gain("[0.4 0.8]*8")`,
    },
    {
      title: 'Il clap',
      text: [
        'Sul secondo e sul quarto battito arriva il colpo secco: il **clap**. Un trucco dei produttori è il **layering**: sovrapporre due suoni per farne uno solo, più pieno.',
        'Nella mini-notazione la virgola dentro le parentesi quadre suona più cose **insieme**: `[cp, xbreak1:2]` è il clap `cp` e, nello stesso istante, il rullante del break. `.room(0.3)` gli aggiunge un po\' di reverb.',
      ],
      code: `setcpm(132/4)
$: s("dnb1:0*4").speed(0.85)
$: s("[~ dnb1:4]*4").hpf(6000)
$: s("xbreak1:3*16").gain("[0.4 0.8]*8")
$: s("~ [cp, xbreak1:2] ~ [cp, xbreak1:2]").room(0.3)`,
      try: 'Togli cp dalla parentesi, poi rimettilo e togli xbreak1:2: senti cosa porta ognuno dei due?',
    },
    {
      title: 'Il break come «top loop»',
      text: [
        'Ultimo strato di batteria: il break `xbreak1` **intero**, tutti i suoi 16 segmenti in fila con `run(16)`. Però filtrato: `.hpf(3000)` toglie i bassi, così la cassa del break non disturba la nostra e restano solo hi-hat e ghost note. I DJ lo chiamano **top loop**: uno strato che fa vibrare la parte alta.',
        'Il break è registrato a 85 bpm e noi andiamo a 132: ogni segmento durerebbe più del suo posto. `.cut(1)` lo tronca quando parte il successivo, e il break diventa secco e veloce.',
      ],
      code: `setcpm(132/4)
$: s("dnb1:0*4").speed(0.85)
$: s("[~ dnb1:4]*4").hpf(6000)
$: s("xbreak1:3*16").gain("[0.4 0.8]*8")
$: s("~ [cp, xbreak1:2] ~ [cp, xbreak1:2]").room(0.3)
$: n(run(16)).s("xbreak1")
  .hpf(3000)
  .cut(1)
  .gain(0.6)`,
      try: 'Prova .hpf(300): entra tutto il break, e il ritmo diventa quasi jungle.',
    },

    /* ── 2 · la 303 ───────────────────────────────────────────────── */
    {
      title: 'La 303: le note',
      text: [
        'Ora la protagonista. Per un attimo togliamo la batteria e ascoltiamo solo lei.',
        'La 303 suona un\'onda **sawtooth**, il suono più ricco e ronzante dei synth. Le note sono sedicesimi in **La minore**, quasi tutte sul La grave (`a1`), con qualche salto: l\'ottava sopra (`a2`), il Do, il Sol, il Mi bemolle. `~` è una pausa.',
        '`.release(0.1)` fa finire ogni nota subito: note corte e rimbalzanti. Ascolta com\'è **aspra** così, senza filtro. Nei prossimi passi la domiamo.',
      ],
      code: `setcpm(132/4)
note("a1 ~ a2 a1 c2 a1 ~ g2 a1 a2 ~ eb2 a1 c2 a1 a2")
  .sound("sawtooth")
  .release(0.1)
  .gain(0.5)`,
    },
    {
      title: 'Il filtro low-pass',
      text: [
        'La manopola più importante della 303 è il **filtro low-pass**: lascia passare le frequenze basse e taglia quelle alte, gli acuti. Il punto dove taglia si chiama **cutoff**: `.lpf(600)` mette il cutoff a 600 hertz.',
        'Il suono diventa scuro e rotondo, come se arrivasse attraverso un muro.',
      ],
      code: `setcpm(132/4)
note("a1 ~ a2 a1 c2 a1 ~ g2 a1 a2 ~ eb2 a1 c2 a1 a2")
  .sound("sawtooth")
  .release(0.1)
  .lpf(600)
  .gain(0.5)`,
      try: 'Prova .lpf(200) e .lpf(3000): dove ti piace di più?',
    },
    {
      title: 'La resonance',
      text: [
        'Ed ecco il segreto dell\'acid. Il filtro ha una seconda manopola, la **resonance**: fa «fischiare» il suono proprio sul cutoff.',
        '`.lpq(20)` è una resonance molto alta. Ascolta: ogni nota ora ha dentro un piccolo fischio, un gorgoglio liquido. È il suono che i Phuture scoprirono per caso.',
      ],
      code: `setcpm(132/4)
note("a1 ~ a2 a1 c2 a1 ~ g2 a1 a2 ~ eb2 a1 c2 a1 a2")
  .sound("sawtooth")
  .release(0.1)
  .lpf(600)
  .lpq(20)
  .gain(0.5)`,
      try: 'Prova .lpq(0), poi 5, poi 30: senti il fischio crescere.',
    },
    {
      title: 'Girare la manopola',
      text: [
        'Chi suona l\'acid dal vivo non lascia mai ferma la manopola del cutoff: la gira piano piano, per minuti. È questo movimento a far crescere la tensione in pista.',
        'Al posto della mano usiamo un\'onda **sine**: `sine.range(300, 3000)` va su e giù fra 300 e 3000 hertz, e `.slow(16)` fa durare un giro completo 16 battute, quasi mezzo minuto.',
        'Lascialo suonare a lungo: il suono si apre, diventa tagliente, poi si richiude.',
      ],
      code: `setcpm(132/4)
note("a1 ~ a2 a1 c2 a1 ~ g2 a1 a2 ~ eb2 a1 c2 a1 a2")
  .sound("sawtooth")
  .release(0.1)
  .lpf(sine.range(300, 3000).slow(16))
  .lpq(20)
  .gain(0.5)`,
      try: 'Prova .slow(4): la manopola gira velocissima, quasi un effetto.',
    },
    {
      title: 'Lo squelch',
      text: [
        'Nella 303 il filtro non si muove solo con la manopola: a ogni nota **scatta** verso l\'alto e subito ricade. È lo **squelch**, che dà a ogni nota un piccolo «uiu».',
        'In Strudel è il **filter envelope**: `.lpenv(4)` dice di quanto si apre a ogni nota, `.lpdecay(0.15)` in quanto tempo ricade (0,15 secondi), `.lpsustain(0)` che torna del tutto giù.',
      ],
      code: `setcpm(132/4)
note("a1 ~ a2 a1 c2 a1 ~ g2 a1 a2 ~ eb2 a1 c2 a1 a2")
  .sound("sawtooth")
  .release(0.1)
  .lpf(sine.range(300, 3000).slow(16))
  .lpq(20)
  .lpenv(4)
  .lpdecay(0.15)
  .lpsustain(0)
  .gain(0.5)`,
      try: 'Prova .lpenv(8) per uno squelch enorme, o .lpdecay(0.05) per uno cortissimo.',
    },
    {
      title: 'Salti e sporcizia',
      text: [
        'Due tocchi finali alla 303. Il primo: `.sometimesBy(0.2, x => x.add(note(12)))` ogni tanto fa saltare una nota **un\'ottava sopra**. La linea resta la stessa, ma non suona mai uguale due volte.',
        'Il secondo: l\'acid techno la vuole **sporca**. `.shape(0.4)` aggiunge **distortion**, come un amplificatore spinto troppo. E un **delay**: `.delay(0.3)` ripete ogni nota dopo 0,34 secondi, un ottavo col punto, così le ripetizioni cadono fra una nota e l\'altra.',
      ],
      code: `setcpm(132/4)
note("a1 ~ a2 a1 c2 a1 ~ g2 a1 a2 ~ eb2 a1 c2 a1 a2")
  .sometimesBy(0.2, x => x.add(note(12)))
  .sound("sawtooth")
  .release(0.1)
  .lpf(sine.range(300, 3000).slow(16))
  .lpq(20)
  .lpenv(4).lpdecay(0.15).lpsustain(0)
  .shape(0.4)
  .delay(0.3).delaytime(0.34).delayfeedback(0.4)
  .gain(0.4)`,
      try: 'Alza shape a 0.8: attenzione alle orecchie!',
    },

    /* ── 3 · il brano ─────────────────────────────────────────────── */
    {
      title: 'Tutto insieme',
      text: [
        'Batteria e 303 insieme. Tutte le righe partono con `_$:`, cioè **zittite**, tranne la cassa.',
        'Suonalo come un DJ: togli il `_` a una riga alla volta e riesegui ogni volta con Cmd+Invio. Un ordine classico: cassa, hi-hat, clap, top loop, e per ultima la 303. Ogni strato che entra alza l\'energia.',
      ],
      code: `setcpm(132/4)
$: s("dnb1:0*4").speed(0.85)
_$: s("[~ dnb1:4]*4").hpf(6000)
_$: s("xbreak1:3*16").gain("[0.4 0.8]*8")
_$: s("~ [cp, xbreak1:2] ~ [cp, xbreak1:2]").room(0.3)
_$: n(run(16)).s("xbreak1").hpf(3000).cut(1).gain(0.6)
_$: note("a1 ~ a2 a1 c2 a1 ~ g2 a1 a2 ~ eb2 a1 c2 a1 a2")
  .sometimesBy(0.2, x => x.add(note(12)))
  .sound("sawtooth").release(0.1)
  .lpf(sine.range(300, 3000).slow(16)).lpq(20)
  .lpenv(4).lpdecay(0.15).lpsustain(0)
  .shape(0.4)
  .delay(0.3).delaytime(0.34).delayfeedback(0.4)
  .gain(0.4)`,
    },
    {
      title: 'Breakdown e drop',
      text: [
        'L\'ultimo pezzo è la **forma**. Un brano techno non cambia le note: cambia quello che c\'è e quello che manca.',
        '`.mask("<1!6 0!2>")` è un interruttore che cambia a ogni battuta: sei battute acceso (`1!6`), due spento (`0!2`). Lo mettiamo su cassa, hi-hat in levare e clap: ogni otto battute la batteria sparisce e resta solo la 303, con il top loop che fruscia. È il **breakdown**. Poi la cassa torna: è il **drop**, e in pista si alzano le braccia.',
        'Il top loop invece fa il contrario: `.hpf("<3000!6 300!2>")` apre il filtro proprio nelle due battute di breakdown, e il break entra intero. Complimenti: hai costruito un brano acid techno! Portalo nel LAB con **→ EDITOR** e cambia la linea della 303: bastano due note diverse per farla tua.',
      ],
      code: `setcpm(132/4)
$: s("dnb1:0*4").speed(0.85)
  .mask("<1!6 0!2>")
$: s("[~ dnb1:4]*4").hpf(6000)
  .mask("<1!6 0!2>")
$: s("xbreak1:3*16").gain("[0.4 0.8]*8")
$: s("~ [cp, xbreak1:2] ~ [cp, xbreak1:2]").room(0.3)
  .mask("<1!6 0!2>")
$: n(run(16)).s("xbreak1")
  .hpf("<3000!6 300!2>")
  .cut(1).gain(0.6)
$: note("a1 ~ a2 a1 c2 a1 ~ g2 a1 a2 ~ eb2 a1 c2 a1 a2")
  .sometimesBy(0.2, x => x.add(note(12)))
  .sound("sawtooth").release(0.1)
  .lpf(sine.range(300, 3000).slow(16)).lpq(20)
  .lpenv(4).lpdecay(0.15).lpsustain(0)
  .shape(0.4)
  .delay(0.3).delaytime(0.34).delayfeedback(0.4)
  .gain(0.4)`,
      try: 'Cambia 1!6 0!2 in 1!14 0!2: sedici battute invece di otto, come nei brani veri. Oppure mask anche sulla 303, con "<1!7 0>".',
    },
  ],
});
