/* ════════════════════════════════════════════════════════════════════════
   TUTORIAL · Ambient con il sax — un file a parte, stesso formato di
   js/tutorials.js

   Si carica DOPO js/tutorials.js e si aggiunge in fondo a TUTORIALS.

   È il gemello di «Ambient soundscape» (la tabla): stessi ingredienti,
   ma il campione è intonato. Per questo il pitch non si sceglie con
   rand.range (stonerebbe) ma fra ottave e letture al contrario.

   Le note sono i file di samples/sax (sax:0 … sax:21, ~4,4 s ciascuno,
   suono pieno fino all'ultimo mezzo secondo). Si usa solo la pentatonica
   di la minore, così ogni combinazione casuale suona bene:
     la 0   do 5   re 9   mi 10   sol 18
   ════════════════════════════════════════════════════════════════════════ */

TUTORIALS.push({
  id: 'ambient-sax', engine: 'strudel',
  title: 'Ambient con il sax',
  desc: 'Un paesaggio sonoro fatto di note di sassofono: lentissime, scelte a caso fra quelle che stanno bene insieme, lette al contrario e immerse in un riverbero enorme.',
  steps: [
    {
      title: 'Una nota lunga',
      text: [
        'Nella musica ambient i suoni non corrono: si allargano, si sovrappongono, riempiono lo spazio. Partiamo da una nota di **sassofono**.',
        'La cartella `sax` contiene una nota per file, ognuna lunga più di 4 secondi. `sax:9` è un **re**. Un ciclo dura circa 2 secondi, quindi ogni nota non ha ancora finito quando parte la successiva: le ripetizioni si accavallano.',
        '`s()` è una scorciatoia di `sound()`: fanno esattamente la stessa cosa.',
      ],
      code: `s("sax:9")`,
      try: 'Ascolta anche sax:0 (la), sax:5 (do) e sax:18 (sol). Nella LIBRERIA trovi il nome di ogni nota.',
    },
    {
      title: 'Una melodia lentissima',
      text: [
        'Ora facciamo una piccola melodia. `n()` sceglie il **numero** del file e `.s("sax")` la cartella: `n("9").s("sax")` è lo stesso di `s("sax:9")`.',
        'Le parentesi `< >` suonano **una nota per ciclo**, a turno: re, do, la, mi. Con `.slow(2)` ogni nota dura due cicli, circa 4 secondi, proprio quanto il campione: finisce una e comincia l\'altra.',
      ],
      code: `n("<9 5 0 10>").s("sax")
  .slow(2)`,
    },
    {
      title: 'Note a caso, ma intonate',
      text: [
        'Invece di decidere noi l\'ordine, lasciamo scegliere al caso. Nella mini-notazione la barra `|` vuol dire **«uno di questi, a caso»**: a ogni giro Strudel ne pesca uno.',
        'Le cinque note sono la, do, re, mi, sol: la **scala pentatonica** di la minore. È una scala senza note «scomode»: qualunque ordine esca, suona bene.',
      ],
      code: `n("0|5|9|10|18").s("sax")
  .slow(2)`,
      try: 'Aggiungi 1 o 11 alla lista: sono di nuovo la e mi, ma in una seconda ripresa, suonata un po\' diversa.',
    },
    {
      title: 'Più grave, e al contrario',
      text: [
        'Con la tabla il pitch era del tutto a caso, con `rand`. Il sax però è **intonato**: un pitch qualsiasi lo renderebbe stonato. Scegliamo solo velocità che restano sulla stessa nota.',
        '`.speed(1)` è il suono normale. `0.5` va a metà velocità: la stessa nota **un\'ottava più grave**, lunga il doppio. `-0.5` è la stessa cosa ma **al contrario**: la nota cresce dal nulla invece di attaccare, come un respiro.',
        'Di nuovo `|` sceglie a caso, ogni volta una delle tre.',
      ],
      code: `n("0|5|9|10|18").s("sax")
  .slow(2)
  .speed("1|0.5|-0.5")`,
      try: 'Prova .speed(2): un\'ottava più acuta, e corta la metà. Poi prova .speed(0.7) e senti come stona.',
    },
    {
      title: 'Un riverbero enorme',
      text: [
        'Ora il **riverbero**: `.room(0.9)` è quanto riverbero aggiungere (da 0 a 1), `.roomsize(10)` la grandezza della stanza. Con 10 siamo in una cattedrale, e ogni nota si trascina per molti secondi.',
        '`.pan(rand)` mette ogni nota in un punto diverso fra la cassa sinistra e la destra: il suono si allarga nello spazio. `.gain(0.7)` abbassa il volume, perché tutte quelle code si sommano.',
      ],
      code: `n("0|5|9|10|18").s("sax")
  .slow(2)
  .speed("1|0.5|-0.5")
  .pan(rand)
  .room(0.9)
  .roomsize(10)
  .gain(0.7)`,
      try: 'Ascolta in cuffia: le note arrivano da punti diversi.',
    },
    {
      title: 'Il bordone',
      text: [
        'Sotto la melodia mettiamo un **bordone**: una nota grave che non cambia mai, come nelle cornamuse o nella musica indiana. Tiene insieme tutto il resto.',
        'È il re (`sax:9`) letto a `.speed(0.25)`: due ottave sotto e lungo quattro volte, quasi 18 secondi. Con `.slow(4)` riparte ogni 8 secondi, quindi le note si sovrappongono e il suono non si interrompe mai. `.lpf(800)` lo scurisce ancora.',
        'I due strati hanno tempi diversi (`.slow(2)` e `.slow(4)`) e la melodia è sempre diversa: il paesaggio non si ripete mai uguale.',
      ],
      code: `$: n("0|5|9|10|18").s("sax")
  .slow(2)
  .speed("1|0.5|-0.5")
  .pan(rand)
  .room(0.9)
  .roomsize(10)
  .gain(0.7)
$: s("sax:9")
  .slow(4)
  .speed(0.25)
  .lpf(800)
  .room(0.9)
  .roomsize(10)
  .gain(0.6)`,
      try: 'Cambia il bordone in sax:0 (la) e ascolta come cambia il colore. Poi aggiungi un terzo strato: il piatto hh:1 dell\'altro tutorial ambient ci sta benissimo.',
    },
  ],
});
