/* ════════════════════════════════════════════════════════════════════════
   TUTORIAL · Beat IDM — un file a parte, stesso formato di js/tutorials.js

   Si carica DOPO js/tutorials.js e si aggiunge in fondo a TUTORIALS.

   La batteria è tutta xbreak1: un break di batteria già tagliato in 16
   segmenti uguali (samples/xbreak1/001…016.wav → xbreak1:0 … xbreak1:15),
   ognuno di circa 0,18 s. In fila fanno una battuta a 85 bpm, per questo il
   tutorial parte da setcpm(85/4): a quel tempo i segmenti combaciano e il
   break suona com'è.

   Che cosa c'è in ogni segmento (misurato sui file: energia sui bassi e
   brillantezza dell'attacco). Se il campione cambia, va rifatto:
     cassa     0 5 8 11 13
     rullante  2 7 10 14
     piatti e colpi leggeri  1 3 4 6 9 12 15
   ════════════════════════════════════════════════════════════════════════ */

TUTORIALS.push({
  id: 'idm', engine: 'strudel',
  title: 'Beat IDM',
  desc: 'Un beat nervoso nello stile della IDM anni \'90, alla Aphex Twin: si prende un break di batteria, lo si taglia in segmenti e lo si rimonta, con rulli velocissimi, glitch, un basso acid e un pad malinconico.',
  steps: [

    /* ── 1 · il break ─────────────────────────────────────────────── */
    {
      title: 'Che cos\'è la IDM',
      text: [
        'Ciao! **IDM** (Intelligent Dance Music) è il nome, un po\' scherzoso, dato negli anni \'90 alla musica elettronica di artisti come **Aphex Twin**: ritmi da ballo smontati e rimontati, pieni di dettagli minuscoli e rulli di batteria velocissimi, con sopra melodie dolci e malinconiche.',
        'Il trucco di base è vecchio quanto l\'hip hop: si prende un **break**, un pezzetto di batteria suonata da un batterista vero, e lo si taglia in **segmenti**. Poi i segmenti si rimettono in un ordine nuovo.',
        'In Open Live Lab il break si chiama **xbreak1** ed è già tagliato in **16 segmenti** uguali, numerati da 0 a 15. Qui sotto le suoniamo in fila: `n()` sceglie il numero del segmento, `.s("xbreak1")` dice da quale cartella prenderlo. Ascolta: è il break originale.',
      ],
      code: `setcpm(85/4)
n("0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15")
  .s("xbreak1")`,
      try: '85/4 è il tempo del break: a 85 bpm i segmenti combaciano perfettamente. Prova 70/4 e ascolta cosa succede quando non combaciano più.',
    },
    {
      title: 'Conoscere i segmenti',
      text: [
        'Per rimontare un break bisogna sapere cosa c\'è dentro ogni segmento. Nel nostro:',
        '**Cassa**: segmenti 0, 5, 8, 11, 13. **Rullante**: segmenti 2, 7, 10, 14. **Piatti e colpi leggeri**: segmenti 1, 3, 4, 6, 9, 12, 15.',
        'Qui sotto ne suoniamo tre, ben distanziate: una cassa, un rullante, un piatto.',
      ],
      code: `setcpm(85/4)
n("0 ~ ~ ~ 2 ~ ~ ~ 1 ~ ~ ~ ~ ~ ~ ~")
  .s("xbreak1")`,
      try: 'Sostituisci i numeri con altri segmenti e ascoltali uno per uno. Riconosci la cassa dal rullante?',
    },
    {
      title: 'Una scorciatoia: run',
      text: [
        'Scrivere i numeri da 0 a 15 è lungo. `run(16)` fa la stessa cosa: produce i numeri 0, 1, 2… fino a 15, uno per sedicesimo.',
        'Il risultato è identico al primo passo, ma il codice è più corto. Ci servirà tra poco.',
      ],
      code: `setcpm(85/4)
n(run(16))
  .s("xbreak1")`,
    },

    /* ── 2 · rimontare ────────────────────────────────────────────── */
    {
      title: 'Rimontare il break',
      text: [
        'Ora il bello: cambiamo **l\'ordine** dei segmenti. Qui la prima metà ripete due volte l\'inizio (0 1 2 3), e verso la fine la cassa 13 raddoppia.',
        'Il suono è sempre quello del batterista, ma il ritmo ora è nostro.',
      ],
      code: `setcpm(85/4)
n("0 1 2 3 0 1 2 3 8 9 10 11 13 13 14 15")
  .s("xbreak1")`,
      try: 'Inventa il tuo ordine. Un consiglio: metti una cassa (0, 5, 8…) all\'inizio, così il ritmo ha un punto di appoggio.',
    },
    {
      title: 'I rulli',
      text: [
        'Il marchio di fabbrica di questo stile sono i **rulli**: un segmento che all\'improvviso si ripete 4, 8, 16 volte, velocissimo, come una mitragliatrice.',
        'Con la mini-notazione basta l\'asterisco: `7*4` sono quattro rullanti nel tempo di uno, `14*8` otto.',
        '`.cut(1)` è importante: quando parte un segmento nuovo, **taglia** quello che stava ancora suonando. Senza, i segmenti si sovrappongono e il rullo diventa un impasto.',
      ],
      code: `setcpm(85/4)
n("0 1 2 3 5 6 7 7*4 8 9 10 11 13 12 14*8 15")
  .s("xbreak1")
  .cut(1)`,
      try: 'Togli .cut(1) e ascolta la differenza. Poi prova 14*16.',
    },
    {
      title: 'Rulli che salgono',
      text: [
        'Un trucco da vero IDM: il rullo **cambia altezza** mentre suona, come se accelerasse.',
        'Nota anche il tempo: da qui in poi è `setcpm(170/4)`, il doppio del break, la velocità della IDM più frenetica. Ogni segmento ha solo metà del tempo che gli servirebbe, e `.cut(1)` lo tronca: il break diventa secco e nervoso.',
        'Qui `[14*16]@4` è un rullo di 16 rullanti che occupa l\'ultimo quarto del ciclo (la `@4` gli dà il peso di 4 posti). E `.speed("1 1 1 [1 1.25 1.5 2]")` fa suonare l\'ultimo quarto sempre più veloce, quindi più acuto: il rullo sale come una sirena.',
      ],
      code: `setcpm(170/4)
n("0 1 2 3 5 6 7 8 9 10 11 13 [14*16]@4")
  .s("xbreak1")
  .speed("1 1 1 [1 1.25 1.5 2]")
  .cut(1)`,
      try: 'Prova speed con valori che scendono: [1 0.8 0.6 0.4].',
    },

    /* ── 3 · caos controllato ─────────────────────────────────────── */
    {
      title: 'Il glitch',
      text: [
        'Ora rompiamo il groove, ma con controllo. Tre funzioni:',
        '`.sometimesBy(0.2, x => x.speed(-1))` a volte suona un segmento **al contrario**. `.sometimesBy(0.15, x => x.ply(4))` a volte lo moltiplica per quattro, un piccolo **balbettio**. `.someCyclesBy(0.25, x => x.scramble(16))` in un ciclo su quattro, più o meno, **rimescola** tutti i segmenti a caso.',
        'Il risultato sembra un CD che salta, ma resta sempre a tempo.',
      ],
      code: `setcpm(170/4)
n("0 1 2 3 5 6 7 7*4 8 9 10 11 13 12 14*8 15")
  .s("xbreak1")
  .sometimesBy(0.2, x => x.speed(-1))
  .sometimesBy(0.15, x => x.ply(4))
  .someCyclesBy(0.25, x => x.scramble(16))
  .cut(1)`,
      try: 'Alza i numeri a 0.5: più caos. Abbassali a 0.05: solo qualche sorpresa.',
    },
    {
      title: 'Piatti nervosi',
      text: [
        'Aggiungiamo uno **strato** di piatti presi dal break, sopra la batteria. Nella mini-notazione la barra verticale `|` vuol dire «oppure»: `[1|3|6|9]` pesca a caso uno dei quattro segmenti dei piatti, e con `*16` lo fa sedici volte per ciclo. Il `?` finale, come nel tutorial Ritmo, ne fa sparire qualcuna.',
        '`rand` (un numero a caso diverso per ogni colpo) cambia il **volume** con `.gain(rand.range(0.2, 0.6))` e la **posizione** tra destra e sinistra con `.pan(rand)`.',
        'Ogni strato sta sulla sua riga `$:`, come nel tutorial sul ritmo. Il secondo strato usa `.cut(2)`: così i piatti si tagliano tra loro, ma non tagliano la batteria. Ascolta con le cuffie.',
      ],
      code: `setcpm(170/4)
$: n("0 1 2 3 5 6 7 7*4 8 9 10 11 13 12 14*8 15")
  .s("xbreak1")
  .cut(1)
$: n("[1|3|6|9]*16?")
  .s("xbreak1")
  .speed(1.5)
  .gain(rand.range(0.2, 0.6))
  .pan(rand)
  .cut(2)`,
    },

    /* ── 4 · il resto del brano ───────────────────────────────────── */
    {
      title: 'Il basso acid',
      text: [
        'Sotto la batteria, un basso **acid**: il suono della macchina Roland TB-303, amatissima nella musica elettronica. È una dente di sega con un filtro molto **risonante** (`.lpq(15)`) che si apre e si chiude.',
        '`.sometimesBy(0.25, x => x.add(note(12)))` a volte fa saltare una nota un\'ottava sopra: sono i guizzi tipici della 303. Il release corto rende le note secche e rimbalzanti.',
      ],
      code: `setcpm(170/4)
note("c2 ~ c2 c3 ~ eb2 c2 ~ g1 ~ c2 ~ bb1 c2 ~ eb2")
  .sometimesBy(0.25, x => x.add(note(12)))
  .sound("sawtooth")
  .release(0.1)
  .lpf(sine.range(300, 2500).slow(8))
  .lpq(15)
  .gain(0.7)`,
    },
    {
      title: 'Il pad malinconico',
      text: [
        'Il contrasto è il segreto di questo stile: sopra il caos ritmico galleggia qualcosa di **dolce e lento**. Accordi lunghi, un attacco morbido (`.attack(0.8)`), un rilascio lunghissimo (`.release(3)`) e tanto riverbero.',
        '`Am7` e `F^7` sono due accordi di settima, dal suono sospeso e un po\' nostalgico. `.slow(4)` fa durare ogni accordo quattro cicli: a 170 bpm i cicli volano, e il pad deve restare calmo.',
        'Per renderlo **ovattato**, come se arrivasse da un\'altra stanza, il filtro passa-basso del tutorial Melodia: `.lpf(700)` taglia gli acuti. E il riverbero è enorme: `.room(0.95)` è quasi tutto riverbero, e `.roomsize(10)` è la cattedrale del tutorial Ambient.',
      ],
      code: `setcpm(170/4)
chord("<Am7 F^7>")
  .voicing()
  .slow(4)
  .sound("triangle")
  .attack(0.8)
  .release(3)
  .lpf(700)
  .room(0.95)
  .roomsize(10)
  .gain(0.5)`,
      try: 'Prova lpf(300): il pad sembra arrivare da sott\'acqua. Poi lpf(3000) per sentire la differenza.',
    },
    {
      title: 'Tutto insieme',
      text: [
        'Ecco il brano completo, uno strato per riga `$:`. La batteria è quella del **glitch**: il break con i rulli, che ogni tanto suona al contrario, balbetta o si rimescola. Tutte le voci restano a tempo fra loro, anche se ognuna fa il suo caos.',
        'Suonalo dal vivo come farebbe un producer: parti solo dal pad, poi togli il `_` alle altre righe una alla volta e riesegui ogni volta con Cmd+Invio.',
      ],
      code: `setcpm(170/4)
_$: n("0 1 2 3 5 6 7 7*4 8 9 10 11 13 12 14*8 15")
  .s("xbreak1")
  .sometimesBy(0.2, x => x.speed(-1))
  .sometimesBy(0.15, x => x.ply(4))
  .someCyclesBy(0.25, x => x.scramble(16))
  .cut(1)
_$: n("[1|3|6|9]*16?").s("xbreak1")
  .speed(1.5).gain(rand.range(0.2, 0.5)).pan(rand)
  .cut(2)
_$: note("c2 ~ c2 c3 ~ eb2 c2 ~ g1 ~ c2 ~ bb1 c2 ~ eb2")
  .sometimesBy(0.25, x => x.add(note(12)))
  .sound("sawtooth").release(0.1)
  .lpf(sine.range(300, 2500).slow(8)).lpq(15)
  .gain(0.6)
$: chord("<Am7 F^7>").voicing().slow(4)
  .sound("triangle").attack(0.8).release(3)
  .lpf(700).room(0.95).roomsize(10)
  .gain(0.5)`,
      try: 'Quando suonano tutte le voci, prova a cambiare setcpm(170/4) in setcpm(85/4): lo stesso brano, a metà velocità, diventa quasi trip hop.',
    },
    {
      title: 'Un break che non si ripete mai',
      text: [
        'Un ultimo passo, per un brano che cambia di continuo. In questo tutorial hai costruito **quattro modi** di suonare il break: i segmenti in fila con `run(16)`, il break rimontato, quello con i rulli e quello con il rullo che sale.',
        '`randcat()` li mette tutti insieme e a ogni ciclo ne **pesca uno a caso**. Dentro le parentesi i pattern si separano con le virgole, proprio come in `stack`. Solo che `stack` li suona tutti nello stesso momento, `randcat` uno alla volta.',
        'Il rullo che sale si porta dietro il suo `.speed()`, perché sta dentro la parentesi. Invece `.s("xbreak1")`, il glitch e `.cut(1)`, scritti dopo la parentesi di chiusura, valgono per tutti e quattro.',
        'Ogni ciclo la batteria cambia volto, il glitch aggiunge sorprese, e sotto il basso e il pad tengono il filo. Lascialo suonare a lungo: non sentirai mai due minuti uguali. Complimenti! Porta il brano nel LAB con **→ EDITOR** e fallo tuo.',
      ],
      code: `setcpm(170/4)
$: randcat(
  n(run(16)),
  n("0 1 2 3 0 1 2 3 8 9 10 11 13 13 14 15"),
  n("0 1 2 3 5 6 7 7*4 8 9 10 11 13 12 14*8 15"),
  n("0 1 2 3 5 6 7 8 9 10 11 13 [14*16]@4")
    .speed("1 1 1 [1 1.25 1.5 2]")
)
  .s("xbreak1")
  .sometimesBy(0.2, x => x.speed(-1))
  .sometimesBy(0.15, x => x.ply(4))
  .someCyclesBy(0.25, x => x.scramble(16))
  .cut(1)
$: n("[1|3|6|9]*16?").s("xbreak1")
  .speed(1.5).gain(rand.range(0.2, 0.5)).pan(rand)
  .cut(2)
$: note("c2 ~ c2 c3 ~ eb2 c2 ~ g1 ~ c2 ~ bb1 c2 ~ eb2")
  .sometimesBy(0.25, x => x.add(note(12)))
  .sound("sawtooth").release(0.1)
  .lpf(sine.range(300, 2500).slow(8)).lpq(15)
  .gain(0.6)
$: chord("<Am7 F^7>").voicing().slow(4)
  .sound("triangle").attack(0.8).release(3)
  .lpf(700).room(0.95).roomsize(10)
  .gain(0.5)`,
      try: 'Aggiungi dentro randcat un quinto pattern inventato da te, per esempio n("0 0 2 0 5 5 7 7*4 8 8 10 11 13 13 14*8 15"). Ricordati la virgola dopo quello prima.',
    },
  ],
});
