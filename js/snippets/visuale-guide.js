/* ════════════════════════════════════════════════════════════════════════
   SNIPPETS · Visuale — esempi dalle guide di Hydra

   Si carica DOPO js/snippets.js (stesso formato, vedi lì) e aggiunge:
   quattro categorie (Texture, Generative, Tempo, Clic e tastiera) e gli
   esempi al microfono in Camera e suono. Sono i «pezzi pronti» che
   accompagnano i tutorial di js/tutorials/visuale-guide.js, costruiti sulle
   guide https://hydra.ojack.xyz/docs/docs/learning/guides/.

   Gli esempi con update, onpointerup, onkeydown, bpm o speed lasciano
   qualcosa acceso finché non si preme ■ STOP (Engines.stop lo spegne);
   rieseguire un altro esempio da solo non basta, come in Hydra.
   ════════════════════════════════════════════════════════════════════════ */

(() => {

SNIPPETS.push(

  /* ── HYDRA · texture ───────────────────────────────────────────────── */
  {
    id: 'h-tx-zebra', engine: 'hydra', cat: 'Texture',
    tags: ['texture', 'onde', 'organico'],
    title: 'Zebra',
    desc: 'thresh() rende nette le strisce di osc(); il rumore le piega come quelle di una zebra vera.',
    code: `osc(30, 0.02)
  .thresh(0.5)                       // righe nette, bianche e nere
  .modulate(noise(2, 0.05), 0.3)     // piegate dal rumore
  .out()`,
  },
  {
    id: 'h-tx-target', engine: 'hydra', cat: 'Texture',
    tags: ['texture', 'onde', 'simmetria'],
    title: 'Bersagli',
    desc: 'Con tantissimi spicchi kaleid() piega le strisce in cerchi: gli anelli di un bersaglio, ripetuti in griglia.',
    code: `osc(40, 0.05)
  .thresh(0.5)
  .kaleid(200)          // tanti spicchi: le righe diventano anelli
  .repeat(3, 3)
  .out()`,
  },
  {
    id: 'h-tx-dots', engine: 'hydra', cat: 'Texture',
    tags: ['texture', 'forme', 'movimento'],
    title: 'Pois rotondi',
    desc: 'Lo schermo è più largo che alto, e i cerchi ripetuti vengono ovali. scale(1, altezza / larghezza) stringe la griglia e li fa tornare rotondi.',
    code: `shape(100, 0.3, 0.01)
  .repeat(8, 8)
  // stringe in larghezza quanto è largo lo schermo: cerchi rotondi
  .scale(1, () => innerHeight / innerWidth)
  .scrollY(0, 0.05)
  .color(1, 0.3, 0.5)
  .out()`,
  },
  {
    id: 'h-tx-checker', engine: 'hydra', cat: 'Texture',
    tags: ['texture', 'onde', 'mescolare'],
    title: 'Scacchiera',
    desc: 'Righe verticali diff righe orizzontali: dove sono uguali nero, dove sono diverse bianco. È una scacchiera; la seconda gira piano e la deforma.',
    code: `osc(60, 0)
  .thresh(0.5)
  .diff(
    osc(60, 0).thresh(0.5)
      .rotate(1.57, 0.02)     // un quarto di giro, e poi piano piano
  )
  .out()`,
  },
  {
    id: 'h-tx-tartan', engine: 'hydra', cat: 'Texture',
    tags: ['texture', 'colore', 'mescolare'],
    title: 'Tessuto scozzese',
    desc: 'Fasce di colore piatte (posterize) in verticale, mescolate a metà con le stesse fasce in orizzontale: dove si incrociano i colori si fondono, come fili intrecciati.',
    code: `osc(20, 0, 1.5).posterize(3, 1)
  .blend(osc(20, 0, 1.5).posterize(3, 1).rotate(1.57), 0.5)
  .out()`,
  },
  {
    id: 'h-tx-moire', engine: 'hydra', cat: 'Texture',
    tags: ['texture', 'onde', 'movimento'],
    title: 'Moiré',
    desc: 'Due zebre uguali, la seconda girata di pochissimo: dall\'incontro nascono fasce larghe che nessuno ha disegnato. Sono i battimenti, fatti di luce.',
    code: `osc(100, 0)
  .thresh(0.5)
  .diff(
    osc(100, 0).thresh(0.5)
      .rotate(() => 0.1 + Math.sin(time * 0.2) * 0.05)
  )
  .out()`,
  },
  {
    id: 'h-tx-stained', engine: 'hydra', cat: 'Texture',
    tags: ['texture', 'colore', 'organico'],
    title: 'Vetrata',
    desc: 'voronoi() con il terzo numero a 0: ogni cella di un grigio piatto. colorama() li trasforma in vetri colorati.',
    code: `voronoi(6, 0.2, 0)      // celle piatte, senza sfumatura
  .colorama(0.6)
  .out()`,
  },
  {
    id: 'h-tx-cracks', engine: 'hydra', cat: 'Texture',
    tags: ['texture', 'organico', 'mescolare'],
    title: 'Terra crepata',
    desc: 'diff di un\'immagine con una sua copia spostata di pochissimo: dentro le celle resta nero, sui bordi nascono le crepe.',
    code: `voronoi(6, 0.2, 0)
  .diff(voronoi(6, 0.2, 0).scroll(0.003, 0.003))   // una copia spostata
  .thresh(0.01)                                     // i bordi, bianchi
  .color(0.9, 0.7, 0.5)
  .out()`,
  },
  {
    id: 'h-tx-rgb', engine: 'hydra', cat: 'Texture',
    tags: ['texture', 'colore', 'deformare'],
    title: 'Filtro RGB',
    desc: 'Come lo schermo di un vecchio televisore visto da vicino: ogni quadretto diviso in tre striscette, rossa, verde e blu. osc con una striscia per quadretto e i colori sfasati di un terzo di giro.',
    code: `quadretti = 40

voronoi(4, 0.3, 0)
  .colorama(0.5)
  .pixelate(quadretti, quadretti)
  // un giro d'onda (2π) per quadretto, i colori sfasati di un terzo
  .mult(osc(Math.PI * 2 * quadretti, 0, Math.PI * 2 / 3))
  .out()`,
  },

  /* ── HYDRA · generative ────────────────────────────────────────────── */
  {
    id: 'h-gen-rosette', engine: 'hydra', cat: 'Generative',
    tags: ['generativo', 'onde', 'simmetria'],
    title: 'Rosone',
    desc: 'Un ciclo for incrocia le stesse strisce nette tante volte, girate di mezzo giro diviso per quante: una stella. scroll la sposta a destra, fuori dall\'editor. Cambia quante.',
    code: `quante = 7
immagine = osc(15, 0.02).thresh(0.5)

for (let i = 1; i < quante; i++) {
  immagine = immagine.diff(osc(15, 0.02).thresh(0.5).rotate(i * Math.PI / quante))
}

immagine
  .scroll(-0.25, 0)       // il centro della stella, a destra
  .out()`,
  },
  {
    id: 'h-gen-name', engine: 'hydra', cat: 'Generative',
    tags: ['generativo', 'forme', 'movimento'],
    title: 'Il tuo nome',
    desc: 'Ogni lettera è un numero (charCodeAt): forEach ne fa una forma, con i lati e la velocità decisi dalla lettera. Ogni parola ha la sua visuale.',
    code: `parola = 'livelab'     // scrivi il tuo nome
immagine = solid()

parola.split('').forEach((lettera, i) => {
  const numero = lettera.charCodeAt(0)
  immagine = immagine.diff(
    shape(numero % 8 + 3, 0.15 + i * 0.07, 0.01).rotate(numero, 0.02 * (i + 1))
  )
})

immagine.repeat(3, 3).out()`,
  },
  {
    id: 'h-gen-bubbles', engine: 'hydra', cat: 'Generative',
    tags: ['generativo', 'forme', 'movimento', 'colore'],
    title: 'Bolle a strati',
    desc: 'Cinque strati di bolle costruiti da un ciclo: ogni strato più fitto, più veloce e di un altro colore. Sembrano lontani e vicini, come dal finestrino del treno.',
    code: `immagine = solid()

for (let i = 1; i <= 5; i++) {
  immagine = immagine.add(
    shape(100, 0.25, 0.01)
      .repeat(i * 2, i * 2)
      .scrollY(0, 0.02 * i)      // gli strati fitti vanno più veloci
      .color(1 / i, 0.4, i / 5),
    0.5
  )
}

immagine.out()`,
  },
  {
    id: 'h-gen-surprise', engine: 'hydra', cat: 'Generative',
    tags: ['generativo', 'casuale', 'deformare'],
    title: 'Ogni ▶ una sorpresa',
    desc: 'Il ciclo costruisce cinque strati, il caso sceglie triangoli o celle, i pari deformano e i dispari incrociano. Premi ▶ tante volte: ogni composizione è nuova.',
    code: `immagine = osc(20, 0.05, 1)

for (let i = 1; i <= 5; i++) {
  const forma = Math.random() < 0.5
    ? shape(3, 0.5, 0.01).repeat(i, i)
    : voronoi(i * 2, 0.3)
  immagine = i % 2 == 0
    ? immagine.modulate(forma, 0.1)
    : immagine.diff(forma.rotate(i, 0.05 * i))
}

immagine.out()`,
  },
  {
    id: 'h-gen-reduce', engine: 'hydra', cat: 'Generative',
    tags: ['generativo', 'forme', 'simmetria'],
    title: 'Da una lista di forme',
    desc: 'map() trasforma una lista di numeri in una lista di forme che girano; reduce() le incrocia tutte in una sola immagine.',
    code: `lati = [3, 4, 5, 6, 8]

lati
  .map(n => shape(n, 0.5, 0.01).rotate(0, n * 0.04))    // numeri → forme
  .reduce((tutte, forma) => tutte.diff(forma))         // forme → una
  .repeat(3, 2)
  .out()`,
  },

  /* ── HYDRA · tempo ─────────────────────────────────────────────────
     update gira prima di ogni fotogramma, finché non premi ■ STOP. */
  {
    id: 'h-tm-pop', engine: 'hydra', cat: 'Tempo',
    tags: ['forme', 'movimento'],
    title: 'Bolle che scoppiano',
    desc: 'Il dente di sega, time % durata / durata: sale da 0 a 1 e poi riparte di colpo. Le bolle si gonfiano e scoppiano ogni due secondi.',
    code: `durata = 2
fase = 0

update = () => {
  fase = time % durata / durata     // da 0 a 1, poi di nuovo 0
}

shape(100, () => fase * 0.6, 0.01)
  .repeat(4, 3)
  .color(0.3, 0.8, 1)
  .out()`,
  },
  {
    id: 'h-tm-bursts', engine: 'hydra', cat: 'Tempo',
    tags: ['forme', 'eco'],
    title: 'Esplosioni a tempo',
    desc: 'Una griglia di quadrati compare per un fotogramma solo, una volta al secondo; il feedback la ingrandisce e la fa sbiadire.',
    code: `fotogrammi = 0
update = () => { fotogrammi++ }

src(o0)
  .scale(1.015)
  .rotate(0.01)
  .color(0.985, 0.985, 0.985)    // l'eco sbiadisce
  .add(
    shape(4, 0.3, 0.01).repeat(3, 3).color(1, 0.5, 0.8),
    () => fotogrammi % 60 == 0 ? 1 : 0    // un fotogramma ogni 60
  )
  .out()`,
  },
  {
    id: 'h-tm-firefly', engine: 'hydra', cat: 'Tempo',
    tags: ['forme', 'casuale', 'eco'],
    title: 'Lucciola',
    desc: 'Una passeggiata casuale: a ogni fotogramma un passettino a caso. L\'eco lascia la scia. Se esce dallo schermo, rientra dall\'altra parte.',
    code: `x = -0.3
y = 0

update = () => {
  x += (Math.random() - 0.5) * 0.02
  y += (Math.random() - 0.5) * 0.02
}

shape(100, 0.04, 0.02)
  .color(1, 0.9, 0.3)
  .scroll(() => x, () => y)
  .add(src(o0).brightness(-0.01))
  .out()`,
  },
  {
    id: 'h-tm-bounce', engine: 'hydra', cat: 'Tempo',
    tags: ['forme', 'eco'],
    title: 'Pallina che rimbalza',
    desc: 'Posizione e velocità in update: quando la pallina tocca un bordo la velocità cambia segno. Con la gravità (vy -= …) cade e rimbalza.',
    code: `x = -0.3;  y = 0
vx = 0.003; vy = 0.007

update = () => {
  vy -= 0.0002                              // la gravità
  x += vx
  y += vy
  if (x < -0.45 || x > -0.25) vx = -vx
  if (y < -0.45) { y = -0.45; vy = -vy }    // il pavimento
}

shape(100, 0.05, 0.01)
  .color(0.3, 1, 0.8)
  .scroll(() => x, () => y)
  .add(src(o0).brightness(-0.03))
  .out()`,
  },
  {
    id: 'h-tm-beat', engine: 'hydra', cat: 'Tempo',
    tags: ['forme', 'colore', 'movimento'],
    title: 'A tempo di musica',
    desc: 'update calcola la fase del battito a 120 bpm: i quadrati si gonfiano all\'inizio di ogni battito, come una cassa, e a ogni battito cambia la tinta.',
    code: `bpm = 120
battito = 0
fase = 0
tinta = 0

update = () => {
  const battiti = time * bpm / 60
  fase = battiti % 1
  if (Math.floor(battiti) != battito) {
    battito = Math.floor(battiti)
    tinta = Math.random()
  }
}

shape(4, () => 0.2 + (1 - fase) * 0.3, 0.01)
  .repeat(4, 3)
  .diff(osc(20, 0.1, 1).hue(() => tinta))
  .out()`,
  },

  /* ── HYDRA · clic e tastiera ───────────────────────────────────────
     Gli ascoltatori (onpointerup, onkeydown…) restano accesi fino a ■ STOP.
     I tasti arrivano anche mentre scrivi nell'editor: prima clicca sulla
     visuale. */
  {
    id: 'h-in-knobs', engine: 'hydra', cat: 'Clic e tastiera',
    tags: ['mouse', 'onde', 'colore'],
    title: 'Il mouse come manopole',
    desc: 'mouse.x / innerWidth va da 0 a 1, da sinistra a destra: decide le strisce. mouse.y decide il colore e la rotazione.',
    code: `// muovi il mouse sulla visuale
osc(() => mouse.x / innerWidth * 60, 0.1, () => mouse.y / innerHeight * 2)
  .rotate(() => mouse.y / innerHeight * 3)
  .kaleid(4)
  .out()`,
  },
  {
    id: 'h-in-melt', engine: 'hydra', cat: 'Clic e tastiera',
    tags: ['clic e tasti', 'deformare'],
    title: 'Tieni premuto e si scioglie',
    desc: 'onpointerdown e onpointerup: finché tieni premuto, il rumore scioglie l\'immagine. Lascia, e torna a posto.',
    code: `premuto = false
onpointerdown = () => { premuto = true }
onpointerup = () => { premuto = false }

osc(20, 0.1, 0.8)
  .kaleid(5)
  .modulate(noise(3, 0.2), () => premuto ? 0.5 : 0)
  .out()`,
  },
  {
    id: 'h-in-newpatch', engine: 'hydra', cat: 'Clic e tastiera',
    tags: ['clic e tasti', 'casuale'],
    title: 'Un clic, una visuale',
    desc: 'La ricetta nuova() inventa una visuale a caso; onpointerup = nuova la rifà a ogni clic.',
    code: `nuova = () => {
  osc(Math.random() * 40, 0.1, Math.random() * 2)
    .kaleid(Math.floor(Math.random() * 6) + 2)
    .rotate(Math.random() * Math.PI, 0.1)
    .modulate(noise(Math.random() * 5, 0.1), Math.random() * 0.3)
    .out()
}

nuova()
onpointerup = nuova     // senza parentesi: la chiama il browser, al clic`,
  },
  {
    id: 'h-in-keys', engine: 'hydra', cat: 'Clic e tastiera',
    tags: ['clic e tasti', 'mouse', 'forme', 'eco'],
    title: 'Tastiera da suonare',
    desc: 'A S D F G cambiano la forma, E accende e spegne l\'eco, il mouse cambia il colore. Prima clicca sulla visuale, poi suona.',
    code: `// A S D F G: le forme · E: l'eco · il mouse: il colore
forme = { a: 3, s: 4, d: 5, f: 6, g: 100 }
lati = 4
eco = true

onkeydown = (evento) => {
  if (forme[evento.key]) lati = forme[evento.key]
  if (evento.key === 'e') eco = !eco
}

shape(() => lati, 0.3, 0.01)
  .repeat(4, 3)
  .rotate(0, 0.1)
  .color(() => mouse.x / innerWidth, 0.5, 1)
  .add(src(o0).scale(1.02).brightness(-0.05), () => eco ? 1 : 0)
  .out()`,
  },
  {
    id: 'h-in-arrows', engine: 'hydra', cat: 'Clic e tastiera',
    tags: ['clic e tasti', 'simmetria'],
    title: 'Caleidoscopio con le frecce',
    desc: 'Le frecce spostano il centro del caleidoscopio, + e - lo ingrandiscono. evento.key dice quale tasto hai premuto.',
    code: `// (non «zoom»: è già il nome di una funzione di Strudel)
x = 0; y = 0; scala = 1
onkeydown = (evento) => {
  if (evento.key === 'ArrowRight') x -= 0.05
  if (evento.key === 'ArrowLeft')  x += 0.05
  if (evento.key === 'ArrowUp')    y -= 0.05
  if (evento.key === 'ArrowDown')  y += 0.05
  if (evento.key === '+') scala *= 1.1
  if (evento.key === '-') scala /= 1.1
}

osc(20, 0.1, 1)
  .kaleid(6)
  .scale(() => scala)
  .scroll(() => x, () => y)
  .out()`,
  },

  /* ── HYDRA · microfono (Camera e suono) ────────────────────────────── */
  {
    id: 'h-mic-eq', engine: 'hydra', cat: 'Camera e suono',
    tags: ['microfono', 'generativo', 'forme'],
    title: 'Equalizzatore',
    desc: 'a.setBins(8) divide il suono in otto bande; un ciclo for disegna una colonna per banda, alta quanto il suo volume. a.show() mostra le barre del microfono.',
    code: `// serve 🎤 MIC acceso nella barra in alto
a.setBins(8)
a.show()

barre = solid()
for (let i = 0; i < 8; i++) {
  barre = barre.add(
    shape(4, 1, 0.001)
      .scale(1, 0.02, () => 0.01 + a.fft[i])
      .scrollX(-0.25 - i * 0.03)
      .color(1 - i / 8, 0.4, i / 8)
  )
}
barre.out()`,
  },
  {
    id: 'h-mic-count', engine: 'hydra', cat: 'Camera e suono',
    tags: ['microfono', 'forme'],
    title: 'Conta i colpi di cassa',
    desc: 'Un rilevatore di colpi in update: quando i bassi superano 0.6 e un attimo prima erano sotto, colpi++. Ogni colpo cambia la forma e la gira di un passo.',
    code: `// serve 🎤 MIC acceso nella barra in alto
a.setSmooth(0.5)
colpi = 0
sopra = false

update = () => {
  if (a.fft[0] > 0.6 && !sopra) colpi++    // abbassa 0.6 se non conta
  sopra = a.fft[0] > 0.6
}

shape(() => colpi % 5 + 3, 0.4, 0.01)
  .repeat(4, 3)
  .rotate(() => colpi * 0.3)
  .out()`,
  },
);

/* categorie nuove prima di «Camera e suono», etichette nuove prima di
   «webcam»: così restano vicino alle loro sorelle */
const cats = SNIPPET_CATS.hydra;
const at = cats.indexOf('Camera e suono');
cats.splice(at === -1 ? cats.length : at, 0,
  'Texture', 'Generative', 'Tempo', 'Clic e tastiera');

const tags = SNIPPET_TAGS.hydra;
const tagAt = tags.findIndex(t => t[0] === 'webcam');
const newTags = [
  ['texture',      'Motivi che si ripetono: righe, pois, scacchiere, macchie, vetrate.'],
  ['generativo',   'Il codice costruisce la visuale: cicli, liste, condizioni.'],
  ['casuale',      'Una parte la decide il caso: ogni ▶ è un po\' diverso.'],
  ['clic e tasti', 'Reagisce ai clic e ai tasti: la visuale si suona con le mani.'],
].filter(n => !tags.some(t => t[0] === n[0]));
tags.splice(tagAt === -1 ? tags.length : tagAt, 0, ...newTags);

})();
