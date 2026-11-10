/* ════════════════════════════════════════════════════════════════════════
   TUTORIAL · Visuale, seconda parte — dalle guide di Hydra

   Si carica DOPO js/tutorials/visuale.js. Segue le guide «Learning» di Hydra
   (https://hydra.ojack.xyz/docs/docs/learning/guides/):
     Textures (dal libro di Hydra)        → Texture
     Javascript for Hydra users           → JavaScript per le visuali
     Iteration & generative patches       → Visuali generative
     Updating frames & precise timing     → Il tempo preciso
     Using clicks & keyboard presses      → Clic e tastiera
     Audio-reactivity explained           → Il suono sotto la lente (Insieme)

   I cinque tutorial visuali entrano PRIMA di «Visuali che ascoltano», così
   il percorso va da La webcam a Texture senza passare dal gruppo Insieme;
   quello sul microfono entra subito DOPO «Visuali che ascoltano», che ne è
   la prima parte.

   Le regole di visuale.js valgono anche qui: il pannello del tutorial copre
   i due terzi sinistri dello schermo, quindi niente forme sole al centro
   (repeat, oppure texture che riempiono tutto). Per le coordinate: in
   .scroll() un numero positivo sposta l'immagine a SINISTRA (e in basso),
   perciò un oggetto portato nella parte scoperta ha scrollX negativo.

   STOP (e ogni ▶ di un riquadro visuale) spegne anche quello che hush() da
   solo lascerebbe acceso: update, onpointerup/onkeydown…, speed e bpm, le
   regolazioni del microfono. Lo fa Engines.stop (js/engines.js).
   ════════════════════════════════════════════════════════════════════════ */

(() => {

/* ╔══ VISUALE · Texture ══════════════════════════════════════════════ */
const texture = {
  id: 'texture', engine: 'hydra',
  title: 'Texture',
  desc: 'Righe, anelli, pois, scacchiere, macchie e vetrate: i motivi che si ripetono, costruiti con osc, shape, noise e voronoi. Dal capitolo «Textures» del libro di Hydra.',
  steps: [

    /* ── 1 · righe ─────────────────────────────────────────────────── */
    {
      title: 'Righe nette: thresh',
      text: [
        'Ciao! In questo tutorial costruiamo delle **texture**: motivi che si ripetono, come la stoffa di una maglietta, le piastrelle del bagno o le macchie di una mucca.',
        'Si parte sempre dalle strisce di `osc()`. Le sue strisce però sono **morbide**: sfumano dal chiaro allo scuro. `.thresh()` (da *threshold*, soglia) le rende **nette**: quello che è più chiaro della soglia diventa bianco, il resto nero. Ecco una zebra.',
      ],
      code: `osc(30, 0.05)
  .thresh(0.5)
  .out()`,
      try: 'Prova thresh(0.2) e thresh(0.8): cambia lo spessore delle righe bianche. Poi aggiungi .modulate(noise(2, 0.05), 0.3) prima di .out(): le righe si piegano come quelle di una zebra vera.',
    },
    {
      title: 'Gradini di colore: posterize',
      text: [
        '`.posterize()` fa una cosa simile, ma con i **colori**: invece di sfumare, li riduce a pochi gradini, come in un manifesto stampato con pochi inchiostri.',
        'Il primo numero dice quanti gradini per ogni colore. Con 3 le strisce arcobaleno diventano fasce piatte.',
      ],
      code: `osc(10, 0.05, 1.5)
  .posterize(3, 1)
  .out()`,
      try: 'Prova posterize(2, 1) e posterize(8, 1). Con 2 restano solo i colori più accesi.',
    },

    /* ── 2 · anelli e pois ─────────────────────────────────────────── */
    {
      title: 'Anelli: kaleid',
      text: [
        'Nel tutorial Primi passi `.kaleid()` piegava l\'immagine in pochi spicchi. Con **tantissimi** spicchi succede una cosa curiosa: le strisce diritte si piegano in **cerchi**, come gli anelli di un bersaglio o quelli di un sasso nello stagno.',
        'Il centro del bersaglio è al centro dello schermo, sotto il pannello: a destra vedi gli anelli più esterni che si allargano.',
      ],
      code: `osc(40, 0.05)
  .thresh(0.5)
  .kaleid(200)
  .out()`,
      try: 'Prova kaleid(4): gli anelli diventano quadrati annidati. Con la velocità a 0, osc(40, 0), il bersaglio si ferma.',
    },
    {
      title: 'Pois: shape e repeat',
      text: [
        'Un cerchio (`shape` con tanti lati) ripetuto con `.repeat()` diventa un vestito a **pois**.',
        'Ma guardali bene: sono **ovali**, schiacciati. Hydra misura lo schermo da 0 a 1 sia in larghezza sia in altezza, e siccome lo schermo è più largo che alto, ogni cella della griglia è un rettangolo, e il cerchio si allarga con lei.',
      ],
      code: `shape(100, 0.3, 0.01)
  .repeat(8, 8)
  .out()`,
      try: 'Prova shape(4, 0.8, 0.01): i quadrati quasi si toccano e resta una griglia di linee sottili, come le fughe tra le piastrelle.',
    },
    {
      title: 'Cerchi rotondi',
      text: [
        'Per farli tornare rotondi si **stringe** tutta la griglia in larghezza, della stessa proporzione dello schermo. `innerHeight / innerWidth` è l\'altezza della finestra divisa per la larghezza: su uno schermo largo viene circa 0.6.',
        '`.scale(1, …)` usa quel numero per la sola larghezza: le celle diventano quadrate e i pois cerchi. L\'abbiamo messo dentro `() =>` così resta giusto anche se allarghi o stringi la finestra. Nel tutorial JavaScript vediamo meglio da dove vengono questi due nomi.',
      ],
      code: `shape(100, 0.3, 0.01)
  .repeat(8, 8)
  .scale(1, () => innerHeight / innerWidth)
  .color(1, 0.3, 0.5)
  .out()`,
      try: 'Aggiungi .scrollY(0, 0.05) prima di .out(): i pois scorrono in alto all\'infinito. Poi prova ad alzare il terzo numero di shape a 0.3: pois sfumati.',
    },

    /* ── 3 · incroci ───────────────────────────────────────────────── */
    {
      title: 'La scacchiera: righe per righe',
      text: [
        'Cosa succede se incrociamo delle righe verticali con delle righe orizzontali? Il `diff` del tutorial Mescolare fa esattamente quello che serve: dove le due immagini sono uguali (bianco con bianco, nero con nero) viene nero, dove sono diverse viene bianco. È una **scacchiera**.',
        'Le seconde righe sono le stesse, girate di un quarto di giro con `rotate(1.57)`.',
      ],
      code: `osc(60, 0)
  .thresh(0.5)
  .diff(osc(60, 0).thresh(0.5).rotate(1.57))
  .out()`,
      try: 'Sostituisci diff con mult: resta bianco solo dove le righe bianche si incrociano, e la scacchiera diventa una griglia di quadretti. Poi prova rotate(0.8) nella seconda catena: rombi.',
    },
    {
      title: 'Il tessuto scozzese',
      text: [
        'Lo stesso incrocio con delle strisce **colorate**, invece che bianche e nere, dà un tessuto: il **tartan** delle gonne scozzesi. `posterize` fa le fasce di colore piatte, come fili tinti, e `blend(…, 0.5)` mescola a metà le fasce verticali con quelle orizzontali: dove si incrociano, i colori si fondono, come due fili intrecciati.',
      ],
      code: `osc(20, 0, 1.5).posterize(3, 1)
  .blend(osc(20, 0, 1.5).posterize(3, 1).rotate(1.57), 0.5)
  .out()`,
      try: 'Cambia 20 in 8 in una sola delle due catene: le fasce diventano larghe da una parte e fitte dall\'altra, come in una camicia a quadri.',
    },
    {
      title: 'Moiré: righe sopra righe',
      text: [
        'Hai mai visto delle strane onde comparire quando guardi due tende sovrapposte, o una camicia a righe in tv? È l\'effetto **moiré**: due motivi quasi uguali, sovrapposti, disegnano un terzo motivo molto più grande.',
        'Qui la seconda zebra è girata di pochissimo, e l\'angolo ondeggia piano: dove le righe coincidono resta nero, dove si sfasano si accende. Le fasce larghe e oblique che si muovono non le ha disegnate nessuno: nascono dall\'incontro delle due.',
        'Succede anche col suono: due note quasi uguali suonate insieme «battono», cioè il volume va su e giù lentamente. Sono gli stessi **battimenti**, fatti di luce.',
      ],
      code: `osc(100, 0)
  .thresh(0.5)
  .diff(osc(100, 0).thresh(0.5).rotate(() => 0.1 + Math.sin(time * 0.2) * 0.05))
  .out()`,
      try: 'Cambia 0.1 in 0.03: le due zebre sono quasi dritte e le fasce del moiré diventano larghissime. Con 0.3 si stringono. Più le righe sono vicine alla stessa direzione, più il disegno nascosto è grande.',
    },

    /* ── 4 · texture naturali ──────────────────────────────────────── */
    {
      title: 'Macchie: noise e thresh',
      text: [
        '`thresh` funziona con qualunque immagine. Sul fumo di `noise()` dà delle **macchie** con il bordo netto, come quelle di una mucca o di un dalmata. Il fumo si muove, e le macchie si deformano piano piano.',
      ],
      code: `noise(3, 0.05)
  .thresh(0.2)
  .out()`,
      try: 'Prova thresh(0), thresh(0.5) e noise(10, 0.05). Poi aggiungi .color(0.9, 0.6, 0.2): una giraffa!',
    },
    {
      title: 'Vetrate: voronoi',
      text: [
        '`voronoi()` ha un terzo numero: la **sfumatura** dentro ogni cella. A 0 ogni cella è di un grigio piatto, diverso dalle vicine, come un mosaico o una vetrata. `.colorama()` trasforma i grigi in colori.',
      ],
      code: `voronoi(6, 0.2, 0)
  .colorama(0.6)
  .out()`,
      try: 'Prova voronoi(6, 0.2, 2): ogni cella si scurisce verso il bordo, come una bolla.',
    },
    {
      title: 'I bordi: una copia spostata',
      text: [
        'Un trucco da texture: **diff** di un\'immagine con una sua copia spostata di pochissimo. Dentro le celle le due copie sono uguali e il risultato è nero; solo sui **bordi**, dove cambia colore, restano delle linee sottili. `thresh` poi le rende bianche e nette.',
        'Il risultato sembra la terra secca e crepata d\'estate.',
      ],
      code: `voronoi(6, 0.2, 0)
  .diff(voronoi(6, 0.2, 0).scroll(0.003, 0.003))
  .thresh(0.01)
  .out()`,
      try: 'Cambia 0.003 in 0.01: le crepe si allargano. Poi prova il trucco sul fumo: al posto di voronoi(6, 0.2, 0), tutte e due le volte, scrivi noise(3, 0.1).posterize(6, 1). Il posterize divide il fumo in gradini, e i bordi dei gradini sono le curve di livello di una cartina dei monti.',
    },
    {
      title: 'Tutto insieme',
      text: [
        'Le texture si possono mescolare fra loro come ogni altra immagine. Qui i pois fanno da **stampo** (`mask`) per una scacchiera fitta, e sotto scorrono le macchie colorate.',
        'Complimenti: ora sai costruire la stoffa di un vestito! Portalo nel LAB con **→ EDITOR** e cambia un motivo alla volta.',
      ],
      code: `// una scacchiera fitta dentro ai pois...
osc(150, 0)
  .thresh(0.5)
  .diff(osc(150, 0).thresh(0.5).rotate(1.57))
  .mask(shape(100, 0.4, 0.01).repeat(5, 5).scale(1, () => innerHeight / innerWidth))
  // ...sopra un fondo a macchie viola
  .add(noise(3, 0.05).thresh(0.2).color(0.4, 0.1, 0.7))
  .out()`,
      try: 'Al posto della scacchiera prova le righe della zebra, al posto delle macchie le crepe: ogni combinazione è una stoffa nuova.',
    },
  ],
};

/* ╔══ VISUALE · JavaScript per le visuali ════════════════════════════ */
const javascript = {
  id: 'javascript', engine: 'hydra',
  title: 'JavaScript per le visuali',
  desc: 'Hydra si scrive in JavaScript, e un po\' di JavaScript dà superpoteri: variabili, liste, funzioni che costruiscono visuali, oggetti e la cassetta degli attrezzi Math. Dalla guida «Javascript for Hydra users».',
  steps: [
    {
      title: 'È JavaScript',
      text: [
        'Ciao! Il codice che scrivi per le visuali è **JavaScript**, il linguaggio di tutte le pagine web. Hydra aggiunge le sue funzioni (`osc`, `kaleid`, `out`…), ma tutto il resto viene da JavaScript, e lo possiamo usare.',
        'Cominciamo da una cosa che già conosci, i commenti, con una novità: `/*` e `*/` fanno un commento **lungo più righe**. Tutto quello che sta in mezzo viene saltato. Qui spegne due funzioni in un colpo solo.',
      ],
      code: `/* Un commento su più righe:
   Hydra salta tutto quello che sta qui dentro. */
osc(20, 0.1, 0.8)
  .kaleid(4)
  /* .pixelate(20, 20)
  .invert() */
  .out()`,
      try: 'Sposta il */ subito dopo .pixelate(20, 20): ora è spento solo invert.',
    },
    {
      title: 'Variabili: dare un nome a un numero',
      text: [
        'Una **variabile** è un nome che si ricorda un valore. `spicchi = 6` vuol dire: da qui in poi, quando scrivo `spicchi`, intendo 6.',
        'Le regole per i nomi: niente spazi, non si comincia con un numero, e meglio evitare gli accenti. E soprattutto **non usare i nomi che Hydra o Strudel usano già**, come `osc`, `shape`, `time`, `speed` o `zoom`: `osc = 3` cancellerebbe l\'oscillatore, e `speed = 0.1` rallenterebbe tutte le visuali. Con i nomi in italiano sei quasi sempre al sicuro.',
      ],
      code: `spicchi = 6
velocita = 0.1

osc(20, velocita, 0.8)
  .kaleid(spicchi)
  .out()`,
      try: 'Cambia spicchi = 6 in spicchi = 3 e premi ▶.',
    },
    {
      title: 'Una variabile, tante catene',
      text: [
        'Le variabili servono soprattutto quando lo **stesso numero** compare in più punti. Qui due griglie di forme usano lo stesso numero di lati: basta cambiarlo una volta sola, in alto, e cambiano tutte e due.',
      ],
      code: `lati = 3

shape(lati, 0.5, 0.01).repeat(4, 3)
  .diff(shape(lati, 0.3, 0.01).repeat(4, 3).rotate(0, 0.2))
  .out()`,
      try: 'Prova lati = 4, lati = 6 e lati = 100.',
    },
    {
      title: 'Liste: gli array',
      text: [
        'Un **array** è una lista di valori tra parentesi quadre. Ogni valore ha un numero di posto, e si conta da **zero**: `viola[0]` è il primo, `viola[1]` il secondo, `viola[2]` il terzo.',
        'Qui una lista tiene i tre numeri di un colore (rosso, verde, blu), così il colore ha un nome solo.',
        'Nei Primi passi hai già usato le liste in un altro modo: `kaleid([3, 4, 6])` prende un valore dopo l\'altro nel tempo. È la stessa lista, che Hydra legge come una **sequenza**.',
      ],
      code: `viola   = [0.7, 0.3, 1]
arancio = [1, 0.5, 0.1]

osc(20, 0.1)
  .color(viola[0], viola[1], viola[2])
  .out()`,
      try: 'Usa arancio al posto di viola. Scorciatoia: .color(...arancio) scrive da sola i tre valori della lista.',
    },
    {
      title: 'Funzioni: una ricetta',
      text: [
        'Una **funzione** è una ricetta con degli ingredienti. `(lati, quante) => …` vuol dire: dammi un numero di lati e un numero di copie, e io ti restituisco una griglia di forme.',
        'Scritta una volta, la ricetta si usa quante volte vuoi, con ingredienti diversi: qui una griglia di triangoli e una di esagoni, incrociate con `diff`.',
      ],
      code: `griglia = (lati, quante) => shape(lati, 0.4, 0.01).repeat(quante, quante)

griglia(3, 4)
  .diff(griglia(6, 2).rotate(0, 0.1))
  .out()`,
      try: 'Aggiungi un terzo ingrediente, la grandezza, con un valore di riserva: griglia = (lati, quante, grande = 0.4) => shape(lati, grande, 0.01).repeat(quante, quante). Ora griglia(3, 4, 0.6) fa triangoli più grandi, e griglia(6, 2), senza il terzo numero, usa 0.4. (Senza il «= 0.4», griglia(6, 2) darebbe errore.)',
    },
    {
      title: 'Funzioni che fanno funzioni',
      text: [
        'Conosci già le funzioni `() => …` che Hydra ricalcola a ogni fotogramma. E se una ricetta **restituisse una di queste**? È una fabbrica di movimenti.',
        '`onda(velocita, min, max)` restituisce un\'onda che va su e giù tra `min` e `max`. Così non devi riscrivere ogni volta i conti con `Math.sin`: qui il caleidoscopio va tra 3 e 8 spicchi, lentamente, e intanto la visuale respira tra 0.8 e 1.2, più in fretta.',
      ],
      code: `onda = (velocita, min, max) =>
  () => min + (max - min) * (0.5 + 0.5 * Math.sin(time * velocita))

osc(20, 0.1, 0.8)
  .kaleid(onda(0.3, 3, 8))
  .scale(onda(2, 0.8, 1.2))
  .out()`,
      try: 'Usa la fabbrica anche per il colore: .colorama(onda(0.5, 0, 0.3)).',
    },
    {
      title: 'Math: la cassetta degli attrezzi',
      text: [
        '`Math` è una cassetta di attrezzi per i conti. `Math.sin` la conosci. Ecco altri tre attrezzi:',
        '`Math.PI` è pi greco, 3.14159…: in radianti è **mezzo giro**, quindi `Math.PI / 4` è un ottavo di giro. `Math.random()` tira fuori un numero **a caso** tra 0 e 1. `Math.floor()` taglia via la parte dopo la virgola: `Math.floor(4.7)` fa 4.',
        'Qui i numeri li sceglie il caso: **ogni volta che premi ▶** esce una visuale diversa.',
      ],
      code: `osc(Math.random() * 40, 0.1, Math.random() * 2)
  .rotate(Math.PI / 4)
  .kaleid(Math.floor(Math.random() * 6) + 2)
  .out()`,
      try: 'Premi ▶ dieci volte. Quando ne trovi una che ti piace, attenzione: rieseguendo sparisce! Copiala nel LAB con → EDITOR e sostituisci i Math.random con i numeri che vuoi tenere.',
    },
    {
      title: 'Un filtro RGB con Math.PI',
      text: [
        'Guarda da vicinissimo lo schermo di un vecchio televisore: ogni puntino è fatto di tre striscette, una **rossa**, una **verde** e una **blu**. Rifacciamolo, con due conti.',
        '`pixelate(quadretti, quadretti)` divide l\'immagine in quadretti. Poi la moltiplichiamo per un `osc` con **una striscia per quadretto**: siccome un\'onda fa un giro intero in `Math.PI * 2`, la frequenza giusta è `Math.PI * 2 * quadretti`.',
        'Il terzo numero di `osc` sposta il rosso, il verde e il blu uno rispetto all\'altro. Con un terzo di giro, `Math.PI * 2 / 3`, i tre colori si mettono in fila, uno per striscetta.',
      ],
      code: `quadretti = 40

voronoi(4, 0.3, 0)
  .colorama(0.5)
  .pixelate(quadretti, quadretti)
  .mult(osc(Math.PI * 2 * quadretti, 0, Math.PI * 2 / 3))
  .out()`,
      try: 'Prova quadretti = 20: vedi bene le tre striscette in ogni quadretto. Al posto delle celle puoi mettere qualunque visuale, anche la webcam.',
    },
    {
      title: 'Oggetti: il punto per entrare',
      text: [
        'Un **oggetto** è una scatola con dei cassetti, ognuno con il suo nome. Si scrive tra parentesi graffe: `tinta = { r: 1, g: 0.4, b: 0.8 }`. Per aprire un cassetto si usa il **punto**: `tinta.r` è 1.',
        'Molte cose che usi sono oggetti. `window` è la finestra del browser: `window.innerWidth` e `window.innerHeight` sono la sua larghezza e la sua altezza, in pixel (il `window.` si può anche lasciare sottinteso, come nel tutorial Texture). `mouse` è un oggetto anche lui: `mouse.x` e `mouse.y`. E anche `a`, il microfono: `a.fft`.',
        'Con la proporzione della finestra, come nel tutorial Texture, i quadrati tornano quadrati.',
      ],
      code: `tinta = { r: 1, g: 0.4, b: 0.8 }
proporzione = window.innerHeight / window.innerWidth

shape(4, 0.6, 0.01)
  .repeat(6, 6)
  .scale(1, proporzione)
  .color(tinta.r, tinta.g, tinta.b)
  .out()`,
      try: 'Premi ▶, poi stringi la finestra del browser: i quadrati si deformano, perché la proporzione è stata calcolata una volta sola. Scrivi .scale(1, () => window.innerHeight / window.innerWidth) e riprova.',
    },
    {
      title: 'Tutto insieme',
      text: [
        'Ecco tutto: le **impostazioni** in alto, con dei nomi, poi le **ricette**, poi la catena che le usa. È così che si organizza una visuale lunga: quando la suoni dal vivo, i numeri da cambiare li trovi subito, tutti nello stesso posto.',
        'Complimenti: ora parli un po\' di JavaScript! Porta la visuale nel LAB con **→ EDITOR** e cambia solo le prime tre righe.',
      ],
      code: `// impostazioni
lati  = 6
tinta = { r: 1, g: 0.4, b: 0.8 }

// ricette
onda  = (velocita, min, max) =>
  () => min + (max - min) * (0.5 + 0.5 * Math.sin(time * velocita))
anello = (quante) => shape(lati, 0.3, 0.01).repeat(quante, quante).rotate(0, 0.1)

// la visuale
osc(30, 0.05, 1.2)
  .color(tinta.r, tinta.g, tinta.b)
  .mask(anello(4))
  .diff(anello(2).scale(onda(0.5, 0.8, 1.5)))
  .rotate(Math.PI / 8)
  .out()`,
      try: 'Aggiungi un\'impostazione tua, per esempio giri = 0.1, e usala nella ricetta anello al posto dello 0.1 di rotate.',
    },
  ],
};

/* ╔══ VISUALE · Visuali generative ═══════════════════════════════════ */
const generative = {
  id: 'generative', engine: 'hydra',
  title: 'Visuali generative',
  desc: 'Lascia che il codice scriva il codice: con un ciclo for dieci forme si costruiscono in tre righe, forEach trasforma il tuo nome in una visuale, e con ? ogni ripetizione fa qualcosa di diverso. Dalla guida «Iteration & generative patches».',
  steps: [
    {
      title: 'Ripetere a mano',
      text: [
        'Ciao! Questa visuale incrocia quattro volte le stesse strisce, ogni volta girate un po\' di più. Il risultato è bello, ma guarda il codice: le righe sono **quasi tutte uguali**, cambia solo il numero di `rotate`.',
        'E se ne volessi dieci? O cinquanta? Copiare a mano è noioso, e basta un errore per rovinare tutto. Ai compiti ripetitivi ci pensa il computer.',
      ],
      code: `osc(30, 0.05)
  .diff(osc(30, 0.05).rotate(0.4))
  .diff(osc(30, 0.05).rotate(0.8))
  .diff(osc(30, 0.05).rotate(1.2))
  .out()`,
    },
    {
      title: 'Il ciclo for',
      text: [
        'Il **ciclo `for`** ripete un pezzo di codice. `for (let i = 1; i < 10; i++)` si legge così: parti con `i` uguale a 1; finché `i` è minore di 10, ripeti; dopo ogni giro aggiungi 1 a `i` (`i++`). Quindi `i` vale 1, 2, 3… fino a 9.',
        'La variabile `immagine` fa da **accumulatore**: parte da un `osc`, e a ogni giro le si aggiunge un altro incrocio, girato di `i * 0.4`. Alla fine la mandiamo sullo schermo.',
        'Perché partire da 1 e non da 0? Con `i` uguale a 0 la rotazione sarebbe 0: le strisce incrociate con **sé stesse**, e il `diff` di un\'immagine con sé stessa è tutto nero.',
      ],
      code: `immagine = osc(30, 0.05)

for (let i = 1; i < 10; i++) {
  immagine = immagine.diff(osc(30, 0.05).rotate(i * 0.4))
}

immagine.out()`,
      try: 'Cambia 10 in 4: torni alla visuale del passo prima. Poi prova 20. Attenzione a non esagerare: ogni giro aggiunge lavoro alla scheda grafica, e oltre qualche decina il computer rallenta.',
    },
    {
      title: 'Dividere il cerchio',
      text: [
        'Con un ciclo possiamo fare i conti per bene. Le strisce ripetono lo stesso disegno dopo **mezzo giro**, cioè `Math.PI`: se lo dividiamo in `quante` parti uguali, le copie si distribuiscono in modo regolare, come i petali di un fiore.',
        'La variabile `quante` decide tutto: il numero di giri del ciclo e l\'angolo tra una copia e l\'altra. Le strisce sono nette (`thresh`, dal tutorial Texture), così le punte della stella si vedono bene.',
        'Le copie girano intorno al centro dello schermo, che sta sotto il pannello: `.scroll(-0.3, 0)`, alla fine, sposta tutto verso destra, e il centro della stella compare nella parte scoperta.',
      ],
      code: `quante = 6
immagine = osc(15, 0.02).thresh(0.5)

for (let i = 1; i < quante; i++) {
  immagine = immagine.diff(osc(15, 0.02).thresh(0.5).rotate(i * Math.PI / quante))
}

immagine
  .scroll(-0.3, 0)
  .out()`,
      try: 'Prova quante = 3, quante = 5 e quante = 12. Poi togli i due .thresh(0.5): la stella diventa di vetro.',
    },
    {
      title: 'Bolle a strati',
      text: [
        'Dentro il ciclo, `i` può cambiare **tutto**: la grandezza, la velocità, il colore. Qui ogni giro aggiunge una griglia di bolle, ogni volta più fitta, più veloce e di un altro colore.',
        '`solid()` è uno schermo nero: l\'accumulatore parte vuoto. `.add(…, 0.5)` aggiunge metà della luce di ogni strato. Le bolle grandi e lente sembrano vicine, quelle piccole e veloci lontane: è la **parallasse**, come guardare fuori dal finestrino del treno.',
      ],
      code: `immagine = solid()

for (let i = 1; i <= 5; i++) {
  immagine = immagine.add(
    shape(100, 0.25, 0.01)
      .repeat(i * 2, i * 2)
      .scrollY(0, 0.02 * i)
      .color(1 / i, 0.4, i / 5),
    0.5
  )
}

immagine.out()`,
      try: 'Metti scrollX al posto di scrollY. Poi cambia shape(100…) in shape(3…): una pioggia di triangoli.',
    },
    {
      title: 'Una visuale dal tuo nome: forEach',
      text: [
        'Per il computer ogni lettera è un **numero**: la c è 99, la i è 105, la a è 97, la o è 111. `charCodeAt(0)` ce lo dice.',
        '`parola.split(\'\')` divide la parola in una lista di lettere, e `.forEach()` fa qualcosa per **ognuna**, come un ciclo. Qui ogni lettera sceglie i lati di una forma (con `%`, il resto della divisione, che fa uscire un numero da 3 a 10) e la sua velocità di rotazione.',
        'Così ogni parola ha la **sua** visuale, sempre la stessa.',
      ],
      code: `parola = 'ciao'
immagine = solid()

parola.split('').forEach((lettera, i) => {
  const numero = lettera.charCodeAt(0)
  immagine = immagine.diff(
    shape(numero % 8 + 3, 0.2 + i * 0.1, 0.01).rotate(numero, 0.02 * (i + 1))
  )
})

immagine
  .repeat(3, 3)
  .out()`,
      try: 'Scrivi il tuo nome al posto di ciao. E quello di un amico: che visuale ha?',
    },
    {
      title: 'map e reduce: liste di immagini',
      text: [
        'Due attrezzi per le liste, che si usano spesso insieme. `.map()` trasforma ogni elemento in un\'altra cosa: qui da una lista di **numeri** (i lati) a una lista di **immagini** (le forme che girano).',
        '`.reduce()` fa il contrario del map: prende tutta la lista e la **riduce** a una cosa sola, combinando gli elementi due alla volta. Qui li incrocia tutti con `diff`, uno dopo l\'altro.',
      ],
      code: `lati = [3, 4, 5, 6]

// map: da numeri a immagini
forme = lati.map(n => shape(n, 0.5, 0.01).rotate(0, n * 0.05))

// reduce: da tante immagini a una
forme
  .reduce((tutte, forma) => tutte.diff(forma))
  .repeat(3, 2)
  .out()`,
      try: 'Aggiungi numeri alla lista: [3, 4, 5, 6, 8, 100]. Poi cambia diff in add, o in blend.',
    },
    {
      title: 'Se… altrimenti: il punto di domanda',
      text: [
        'Finora le visuali facevano sempre la stessa cosa. Con una **condizione** possono decidere. Il modo più corto di scriverla è il punto di domanda: `condizione ? se sì : se no`.',
        '`time % 4` è il **resto** della divisione per 4: conta i secondi da 0 a 4 e poi ricomincia da 0, all\'infinito. Quindi `time % 4 < 2` è vero per due secondi, poi falso per due, poi di nuovo vero: il caleidoscopio passa da 3 a 8 spicchi e ritorno.',
      ],
      code: `osc(20, 0.1, 0.8)
  .kaleid(() => time % 4 < 2 ? 3 : 8)
  .out()`,
      try: 'Prova time % 1 < 0.5: cambia due volte al secondo. Poi fai decidere anche il colore: .colorama(() => time % 4 < 2 ? 0 : 0.3).',
    },
    {
      title: 'Condizioni dentro il ciclo',
      text: [
        'Condizioni e cicli insieme: ogni giro può fare una cosa diversa. `i % 2 == 0` vuol dire «i è pari» (il resto della divisione per 2 è zero).',
        'Qui i quadrati pari girano in senso orario e quelli dispari in senso antiorario: `verso` vale 1 o -1, e moltiplica la velocità. E ogni quadrato è più grande e più veloce del precedente.',
      ],
      code: `immagine = solid()

for (let i = 1; i <= 6; i++) {
  const verso = i % 2 == 0 ? 1 : -1
  immagine = immagine.diff(
    shape(4, i * 0.15, 0.01).rotate(0, verso * 0.05 * i)
  )
}

immagine
  .repeat(2, 2)
  .out()`,
      try: 'Fai decidere alla condizione anche la forma: shape(i % 2 == 0 ? 4 : 3, …).',
    },
    {
      title: 'Tutto insieme',
      text: [
        'Una visuale **generativa**: il ciclo costruisce gli strati, il caso sceglie gli ingredienti, le condizioni decidono come mescolarli. Nemmeno chi l\'ha scritta sa come verrà: ogni volta che premi ▶ esce una composizione nuova.',
        'Leggila con calma: ogni strato è un triangolo o delle celle, a caso; gli strati pari **deformano** l\'immagine, quelli dispari la **incrociano**.',
        'Complimenti! Premi ▶ tante volte, e quando esce quella giusta portala nel LAB con **→ EDITOR**.',
      ],
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
      try: 'Aggiungi una terza possibilità: al posto di Math.random() < 0.5 ? … : … prova con noise(i, 0.1) quando i è 3.',
    },
  ],
};

/* ╔══ VISUALE · Il tempo preciso ═════════════════════════════════════ */
const tempo = {
  id: 'tempo', engine: 'hydra',
  title: 'Il tempo preciso',
  desc: 'La funzione update, che Hydra chiama prima di ogni fotogramma: contatori, eventi a intervalli regolari, il dente di sega, i passi a caso, una pallina che rimbalza e il metronomo bpm. Dalla guida «Updating frames & precise timing».',
  steps: [
    {
      title: 'Sessanta volte al secondo: update',
      text: [
        'Ciao! Una visuale è come un cartone animato: tanti **fotogrammi** fermi, uno dopo l\'altro, circa 60 al secondo. Prima di disegnare ogni fotogramma, Hydra guarda se hai scritto una funzione chiamata `update`, e se c\'è la **esegue**.',
        'Dentro `update` puoi cambiare le tue variabili come vuoi, a ogni fotogramma. Qui `lati` va da 3 a 8, uno in più ogni secondo, poi ricomincia: `Math.floor(time % 6)` conta 0, 1, 2, 3, 4, 5, 0, 1…',
        'La forma legge la variabile con `() => lati`, così vede il valore nuovo a ogni fotogramma. **■ STOP** spegne anche `update`.',
      ],
      code: `lati = 3

update = () => {
  lati = 3 + Math.floor(time % 6)
}

shape(() => lati, 0.4, 0.01)
  .repeat(4, 3)
  .out()`,
      try: 'Prova time * 2 % 6: le forme cambiano due volte più in fretta.',
    },
    {
      title: 'Contare i fotogrammi',
      text: [
        'In `update` si può anche **contare**. `fotogrammi++` aggiunge 1 a ogni fotogramma: dopo un secondo vale circa 60, dopo un minuto 3600.',
        'Così possiamo fare qualcosa ogni tanti fotogrammi. `if (…)` vuol dire «se»: se `fotogrammi` è un multiplo di 60 (il resto della divisione è 0), cioè **una volta al secondo**, scegliamo a caso una tinta nuova.',
      ],
      code: `fotogrammi = 0
tinta = 0

update = () => {
  fotogrammi++
  if (fotogrammi % 60 == 0) tinta = Math.random()
}

osc(20, 0.1, 0.8)
  .kaleid(4)
  .hue(() => tinta)
  .out()`,
      try: 'Prova % 120 (ogni due secondi) e % 30 (due volte al secondo). Non andare più veloce di così: un colore che cambia su tutto lo schermo più di tre volte al secondo può far star male chi è sensibile alle luci lampeggianti.',
    },
    {
      title: 'Un solo fotogramma',
      text: [
        'Col contatore possiamo far succedere una cosa **per un fotogramma solo**, un sessantesimo di secondo: troppo poco per vederla. Ma con il **feedback** del tutorial Mescolare l\'immagine resta, e si trasforma.',
        'Qui una griglia di quadrati compare per un solo fotogramma al secondo (`add` con quantità 1, altrimenti 0). L\'eco la ingrandisce e la fa sbiadire: ogni secondo, un\'**esplosione** di quadrati che vola verso i bordi.',
      ],
      code: `fotogrammi = 0
update = () => { fotogrammi++ }

src(o0)
  .scale(1.02)                  // l'eco si allarga...
  .color(0.97, 0.97, 0.97)      // ...e sbiadisce
  .add(
    shape(4, 0.3, 0.01).repeat(3, 3).color(1, 0.5, 0.8),
    () => fotogrammi % 60 == 0 ? 1 : 0
  )
  .out()`,
      try: 'Aggiungi .rotate(0.02) dopo .scale(1.02): le esplosioni girano. Oppure cambia 60 in 20.',
    },
    {
      title: 'Ogni tanto: time % ogni < durata',
      text: [
        'Contare i fotogrammi funziona, ma dipende dal computer: uno lento ne fa 30 al secondo, e tutto va a metà velocità. `time` invece sono **secondi veri**.',
        'La ricetta della guida di Hydra è `time % ogni < durata`: vero per `durata` secondi, una volta ogni `ogni` secondi. Qui per mezzo secondo ogni 3 secondi le celle si accendono di colori.',
      ],
      code: `acceso = false

update = () => {
  acceso = time % 3 < 0.5
}

voronoi(8, 0.3)
  .colorama(() => acceso ? 0.5 : 0)
  .out()`,
      try: 'Prova time % 2 < 1: un secondo acceso e un secondo spento, come una freccia della macchina.',
    },
    {
      title: 'Il dente di sega',
      text: [
        '`Math.sin(time)` è un\'onda che va su e giù, morbida. A volte serve un movimento diverso: salire piano e poi **ricominciare** di colpo da capo. Si chiama **dente di sega**, perché disegnato ha proprio quella forma.',
        'La ricetta è `time % durata / durata`: sale da 0 a 1 in `durata` secondi, poi torna a 0. Qui fa gonfiare delle bolle, che scoppiano e rinascono ogni 2 secondi.',
      ],
      code: `durata = 2
fase = 0

update = () => {
  fase = time % durata / durata
}

shape(100, () => fase * 0.6, 0.01)
  .repeat(4, 3)
  .color(0.3, 0.8, 1)
  .out()`,
      try: 'Prova (1 - fase) al posto di fase: le bolle nascono grandi e si sgonfiano. È il movimento di un colpo di cassa: forte subito, poi si spegne.',
    },
    {
      title: 'Passi a caso',
      text: [
        'Ecco una lucciola che vola come le pare. A ogni fotogramma, `update` le fa fare un **passettino a caso**: `Math.random() - 0.5` è un numero tra -0.5 e 0.5, cioè un po\' a sinistra o un po\' a destra, un po\' su o un po\' giù.',
        'Un passo solo non si nota, ma sommati uno dopo l\'altro disegnano una strada che non si sa mai dove va. Si chiama **passeggiata casuale**. L\'eco (`add` con `src(o0)` che sbiadisce) le lascia dietro una scia.',
        'La lucciola parte a destra, nella parte scoperta dello schermo: in `scroll`, i numeri negativi spostano verso destra.',
      ],
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
      try: 'Cambia 0.02 in 0.06: la lucciola diventa nervosa. Se esce dallo schermo, ricompare dall\'altra parte.',
    },
    {
      title: 'La pallina che rimbalza',
      text: [
        'Quando le variabili **dipendono l\'una dall\'altra**, `update` è il posto giusto per tenerle insieme. Una pallina ha una posizione (`x`, `y`) e una velocità (`vx`, `vy`): a ogni fotogramma la posizione cambia della velocità, e quando la pallina tocca un bordo la velocità **cambia segno**, e la pallina torna indietro.',
        'I bordi sono quelli della parte scoperta dello schermo, a destra del pannello.',
      ],
      code: `x = -0.3;  y = 0          // dove sta la pallina
vx = 0.003; vy = 0.007    // di quanto si sposta a ogni fotogramma

update = () => {
  x += vx
  y += vy
  if (x < -0.45 || x > -0.25) vx = -vx    // bordi destro e sinistro
  if (y < -0.45 || y > 0.45) vy = -vy     // bordi in basso e in alto
}

shape(100, 0.05, 0.01)
  .color(0.3, 1, 0.8)
  .scroll(() => x, () => y)
  .add(src(o0).brightness(-0.03))
  .out()`,
      try: 'Aggiungi la gravità: in update, prima di y += vy, scrivi vy -= 0.0003. Ora la pallina cade e rimbalza sul pavimento.',
    },
    {
      title: 'Il metronomo: bpm e speed',
      text: [
        'Hydra ha due manopole globali per il tempo. `speed` è la velocità di **tutto** il tempo di Hydra: 2 va al doppio, 0.5 alla metà.',
        '`bpm` sono i battiti al minuto, come il metronomo della musica. Decide quanto in fretta le **liste** passano da un valore al successivo: uno a ogni battito. Di solito è 30; qui lo mettiamo a 120, il tempo dei tutorial di Strudel, così il caleidoscopio cambia a ogni colpo di cassa (a tempo, ma non esattamente insieme: per quello c\'è il microfono).',
      ],
      code: `bpm = 120      // un valore della lista a ogni battito
speed = 1      // la velocità di tutto il tempo di Hydra

osc(20, 0.1, 0.8)
  .kaleid([3, 4, 6, 8])
  .rotate(0, 0.2)
  .out()`,
      try: 'Prova speed = 0.25: tutto rallenta, anche la rotazione e le strisce. ■ STOP rimette speed e bpm ai valori di partenza.',
    },
    {
      title: 'Tutto insieme',
      text: [
        'Tutto a tempo: `update` calcola a che punto del battito siamo (`fase`, un dente di sega che riparte a ogni battito) e, a ogni battito nuovo, sceglie a caso una tinta.',
        'I quadrati si gonfiano all\'inizio di ogni battito e si sgonfiano fino al successivo, come una cassa. Con `bpm = 120` va a tempo con la musica dei tutorial di Strudel.',
        'Complimenti: ora sai usare l\'orologio di Hydra al fotogramma! Portala nel LAB con **→ EDITOR**.',
      ],
      code: `bpm = 120
battito = 0
fase = 0
tinta = 0

update = () => {
  const battiti = time * bpm / 60        // quanti battiti sono passati
  fase = battiti % 1                     // da 0 a 1 in ogni battito
  if (Math.floor(battiti) != battito) {  // è iniziato un battito nuovo?
    battito = Math.floor(battiti)
    tinta = Math.random()
  }
}

shape(4, () => 0.2 + (1 - fase) * 0.3, 0.01)
  .repeat(4, 3)
  .diff(osc(20, 0.1, 1).hue(() => tinta))
  .out()`,
      try: 'Prova bpm = 60 e bpm = 170, il tempo della drum and bass.',
    },
  ],
};

/* ╔══ VISUALE · Clic e tastiera ══════════════════════════════════════ */
const interazione = {
  id: 'interazione', engine: 'hydra',
  title: 'Clic e tastiera',
  desc: 'La visuale si suona con le mani: il mouse, i clic e i tasti diventano manopole. Gli ascoltatori di eventi di JavaScript, dal primo interruttore a una visuale da suonare con la tastiera. Dalla guida «Using clicks & keyboard presses».',
  steps: [
    {
      title: 'Il mouse: mouse.x e mouse.y',
      text: [
        'Ciao! In questo tutorial la visuale reagisce a **te**. Cominciamo dal mouse: `mouse.x` e `mouse.y` dicono dov\'è il puntatore, in pixel, da sinistra e dall\'alto.',
        'Diviso per la larghezza della finestra, `mouse.x / innerWidth` diventa un numero da 0 (tutto a sinistra) a 1 (tutto a destra). Qui decide quante strisce ci sono; e `mouse.y` decide il colore.',
        'Premi ▶ e **muovi il mouse sulla visuale**, a destra.',
      ],
      code: `osc(() => mouse.x / innerWidth * 60, 0.1, () => mouse.y / innerHeight * 2)
  .out()`,
      try: 'Usa il mouse anche per girare: aggiungi .rotate(() => mouse.y / innerHeight * 3).',
    },
    {
      title: 'Un interruttore: il clic',
      text: [
        'Il browser, ogni volta che succede qualcosa (un clic, un tasto, la finestra che cambia misura), manda un **evento**. Se scrivi una funzione con il nome giusto, il browser la chiama quando arriva l\'evento: è un **ascoltatore**.',
        '`onpointerup` ascolta quando **rilasci** il pulsante del mouse (o il dito, su un tablet). Qui ogni clic scambia `acceso`: `!` vuol dire «il contrario», quindi vero diventa falso e falso diventa vero. È un **interruttore**.',
        'Il clic conta in qualunque punto della pagina, anche sul testo del tutorial: clicca sulla visuale, a destra. **■ STOP** spegne anche gli ascoltatori.',
      ],
      code: `acceso = false
onpointerup = () => { acceso = !acceso }

osc(20, 0.1, () => acceso ? 1 : 0)
  .kaleid(() => acceso ? 6 : 2)
  .out()`,
      try: 'Fai scambiare anche il verso di rotazione: .rotate(0, () => acceso ? 0.2 : -0.2).',
    },
    {
      title: 'Finché tieni premuto',
      text: [
        'Due ascoltatori insieme: `onpointerdown` quando **premi**, `onpointerup` quando **rilasci**. Così la visuale sa se il pulsante è giù in questo momento.',
        'Tieni premuto sulla visuale: l\'immagine si scioglie. Lascia: torna a posto.',
      ],
      code: `premuto = false
onpointerdown = () => { premuto = true }
onpointerup = () => { premuto = false }

osc(20, 0.1, 0.8)
  .modulate(noise(3, 0.2), () => premuto ? 0.5 : 0)
  .out()`,
      try: 'Invece di modulate, prova .pixelate(() => premuto ? 20 : 2000, () => premuto ? 20 : 2000).',
    },
    {
      title: 'Contare i clic',
      text: [
        '`clic++` aggiunge 1 a ogni clic. Con `%`, il resto della divisione, il numero di lati gira da 3 a 10 e poi ricomincia: `clic % 8` va da 0 a 7, più 3 fa da 3 a 10.',
        'Attenzione a `() =>`: senza, Hydra leggerebbe `clic` **una volta sola**, quando premi ▶, e poi non si accorgerebbe più di niente. È l\'errore più comune con gli eventi.',
      ],
      code: `clic = 0
onpointerup = () => { clic++ }

shape(() => clic % 8 + 3, 0.4, 0.01)
  .repeat(4, 3)
  .out()`,
      try: 'Togli il () => davanti a clic % 8 + 3, premi ▶ e clicca: non cambia niente. Rimettilo.',
    },
    {
      title: 'Una manopola da girare',
      text: [
        'Un\'idea della guida di Hydra: finché tieni premuto, un numero **cresce**. Quando lasci, resta dov\'è. È come girare una manopola: più tieni premuto, più giri.',
        '`angolo += premuto ? 0.02 : 0` vuol dire: aggiungi 0.02 se premuto, altrimenti niente. Siccome sta dentro `() =>`, succede a ogni fotogramma.',
      ],
      code: `premuto = false
onpointerdown = () => { premuto = true }
onpointerup = () => { premuto = false }
angolo = 0

osc(15, 0.1, 1)
  .kaleid(5)
  .rotate(() => angolo += premuto ? 0.02 : 0)
  .out()`,
      try: 'Fai tornare la manopola a zero da sola quando lasci: angolo = premuto ? angolo + 0.02 : angolo * 0.95.',
    },
    {
      title: 'Un clic, una visuale nuova',
      text: [
        'Un ascoltatore può fare **qualunque cosa**, anche costruire una visuale intera. Qui la ricetta `nuova` inventa una visuale a caso e la manda sullo schermo; la chiamiamo subito una volta, poi la diamo a `onpointerup`, così ogni clic ne fa un\'altra.',
        'Nota: `onpointerup = nuova`, **senza** parentesi. Con le parentesi, `nuova()`, la ricetta verrebbe eseguita subito; senza, la consegniamo al browser perché la esegua lui, al momento giusto.',
      ],
      code: `nuova = () => {
  osc(Math.random() * 40, 0.1, Math.random() * 2)
    .kaleid(Math.floor(Math.random() * 6) + 2)
    .rotate(Math.random() * Math.PI, 0.1)
    .out()
}

nuova()
onpointerup = nuova`,
      try: 'Aggiungi alla ricetta .modulate(noise(Math.random() * 5, 0.1), Math.random() * 0.3).',
    },
    {
      title: 'Le frecce',
      text: [
        'Ora la tastiera. `onkeydown` ascolta quando **premi un tasto**, e riceve un `evento` che dice quale: `evento.key` è il nome del tasto, per esempio `\'ArrowLeft\'`, la freccia a sinistra.',
        'Il centro del caleidoscopio sta sotto il pannello: portalo con le frecce nella parte scoperta. **Prima clicca sulla visuale**, poi usa le frecce: se il cursore è ancora nel riquadro del codice, le frecce spostano anche lui.',
        'I segni sembrano al contrario (freccia a destra, `x` diminuisce) perché `scroll` sposta l\'immagine verso sinistra quando il numero cresce.',
      ],
      code: `x = 0
y = 0
onkeydown = (evento) => {
  if (evento.key === 'ArrowRight') x -= 0.05
  if (evento.key === 'ArrowLeft')  x += 0.05
  if (evento.key === 'ArrowUp')    y -= 0.05
  if (evento.key === 'ArrowDown')  y += 0.05
}

osc(20, 0.1, 1)
  .kaleid(6)
  .scroll(() => x, () => y)
  .out()`,
      try: 'Fai zoomare il caleidoscopio con i tasti + e -: scala = 1, poi if (evento.key === \'+\') scala *= 1.1, e .scale(() => scala) prima di .scroll.',
    },
    {
      title: 'Ogni tasto, una forma',
      text: [
        'Ogni tasto ha anche un **numero**: `evento.keyCode`. La A è 65, la B 66, la barra spaziatrice 32. Qui l\'ultimo tasto premuto sceglie i lati delle forme e il loro colore.',
        'Clicca sulla visuale e scrivi una parola: ogni lettera è una forma. (Se scrivi nel riquadro del codice, la visuale ti ascolta lo stesso!)',
      ],
      code: `tasto = 65
onkeydown = (evento) => { tasto = evento.keyCode }

shape(() => tasto % 8 + 3, 0.4, 0.01)
  .repeat(4, 3)
  .color(() => tasto % 3 / 2, 0.5, () => tasto % 5 / 4)
  .out()`,
      try: 'Fai decidere al tasto anche la velocità: .rotate(0, () => (tasto % 10) / 20).',
    },
    {
      title: 'Tutto insieme: una visuale da suonare',
      text: [
        'Ecco uno **strumento**. Un oggetto, `forme`, dice quale tasto fa quale forma: A, S, D, F e G sono sulla stessa riga della tastiera, come i tasti di un pianoforte. La E accende e spegne l\'eco, e il mouse, da sinistra a destra, cambia il colore.',
        '`forme[evento.key]` apre il cassetto con il nome del tasto: se il cassetto c\'è, quella è la forma nuova. Un tasto che non c\'è (una Z) non fa niente.',
        'Clicca sulla visuale e suona! Con una musica di Strudel sotto, prova ad andare a tempo. Complimenti: hai costruito uno strumento visivo.',
      ],
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
      try: 'Aggiungi al cassetto altre forme: h: 8, j: 12. Poi un tasto che fa girare al contrario.',
    },
  ],
};

/* ╔══ INSIEME · Il suono sotto la lente ══════════════════════════════
   Seconda parte di «Visuali che ascoltano»: gli attrezzi del microfono.
   Engines.stop (a ogni ▶ di un riquadro visuale) rimette setBins,
   setSmooth, setCutoff, setScale ai valori di partenza e nasconde a.show():
   ogni passo dichiara le sue regolazioni. */
const lente = {
  id: 'lente', engine: 'mix',
  title: 'Il suono sotto la lente',
  desc: 'Gli attrezzi del microfono: vedere quello che sente, dividere il suono in più bande, calmare lo sfarfallio, regolare la sensibilità e contare i colpi di cassa. Dalla guida «Audio-reactivity explained».',
  steps: [
    {
      title: 'La musica',
      engine: 'strudel',
      text: [
        'Ciao! Questo tutorial continua **Visuali che ascoltano**: lì hai visto `a.fft`, qui impariamo a regolarlo.',
        'Prima la musica: cassa, rullante, piattini e un basso, così tutte le bande, dai bassi agli acuti, hanno qualcosa da sentire. Premi ▶ e lasciala andare, con le **casse accese** (con le cuffie il microfono non sente niente).',
      ],
      code: `setcpm(120/4)
$: sound("bd*4")
$: sound("~ cp ~ cp, hh*8").gain(0.7)
$: note("c2 ~ c2 eb2 ~ c2 g1 ~").sound("sawtooth").lpf(400)`,
    },
    {
      title: 'Vedere quello che sente: a.show()',
      engine: 'hydra', mic: true,
      text: [
        '`a.show()` mostra, in basso a destra, le **barre** del microfono: una per banda, dai bassi a sinistra agli acuti a destra. Più una barra è alta, più suono c\'è in quella banda.',
        'Guarda le barre mentre la musica suona: la prima salta con la cassa, l\'ultima vibra con i piattini. Sono questi i numeri che finiscono in `a.fft[0]`, `a.fft[1]`… e che qui colorano le strisce.',
      ],
      code: `a.show()

osc(20, 0.1, () => a.fft[0] * 2)
  .kaleid(() => 2 + a.fft[3] * 6)
  .out()`,
      try: 'Batti le mani vicino al computer: quale barra salta di più?',
    },
    {
      title: 'Più bande: a.setBins',
      engine: 'hydra', mic: true,
      text: [
        'Di solito le bande sono 4. `a.setBins(8)` divide il suono in **8** bande, più strette: ora puoi distinguere meglio il basso dalla cassa, o il rullante dai piattini. `a.fft` diventa una lista di 8 numeri, da `a.fft[0]` a `a.fft[7]`.',
        'E con 8 bande possiamo costruire un **equalizzatore**, con il ciclo `for` delle Visuali generative: una colonna per banda, alta quanto il suo volume. Le colonne stanno nella parte scoperta, a destra.',
      ],
      code: `a.setBins(8)
a.show()

barre = solid()
for (let i = 0; i < 8; i++) {
  barre = barre.add(
    shape(4, 1, 0.001)
      .scale(1, 0.02, () => 0.01 + a.fft[i])   // stretta, e alta quanto la banda i
      .scrollX(-0.25 - i * 0.03)          // la sua colonna
      .color(1 - i / 8, 0.4, i / 8)
  )
}
barre.out()`,
      try: 'Prova a.setBins(16), con 16 colonne: nel ciclo cambia 8 in 16 e 0.03 in 0.015.',
    },
    {
      title: 'Meno nervosa: a.setSmooth',
      engine: 'hydra', mic: true,
      text: [
        'I numeri del microfono saltano di continuo, e la visuale **trema**. `a.setSmooth()` li ammorbidisce: va da 0 (nessuna calma, ogni fotogramma per conto suo) a quasi 1 (lentissimo, la visuale segue solo i cambiamenti grandi).',
        'Qui i cerchi seguono i bassi con molta calma (0.9). Cambia il numero e guarda come cambia il carattere della visuale.',
      ],
      code: `a.setSmooth(0.9)
a.show()

shape(100, () => 0.1 + a.fft[0] * 0.4, 0.05)
  .repeat(4, 3)
  .color(1, 0.5, 0.3)
  .out()`,
      try: 'Prova a.setSmooth(0): i cerchi scattano con ogni colpo. E a.setSmooth(0.98): respirano lenti, come se dormissero.',
    },
    {
      title: 'La sensibilità: setCutoff e setScale',
      engine: 'hydra', mic: true,
      text: [
        'Ogni stanza è diversa: in una c\'è il rumore del condizionatore, in un\'altra la musica è bassa. Due regolazioni sistemano le cose.',
        '`a.setCutoff()` è il **pavimento**: tutto il suono sotto quel livello conta come zero. Alzalo se la visuale si muove anche quando nessuno suona. `a.setScale()` decide dov\'è il **soffitto**: quanto suono serve, sopra il pavimento, per arrivare a 1. Abbassalo se la musica è piano e la visuale si muove poco.',
        'In `a.show()`, sopra ogni barra, ci sono due **righe sottili**: quella in basso è il pavimento, quella in alto il soffitto. Le barre mostrano il suono com\'è, e non cambiano; cambiano le righe. Regola finché, con la musica, le barre vanno su e giù **tra le due righe**.',
      ],
      code: `a.setCutoff(4)    // il pavimento: sotto, zero
a.setScale(6)     // il soffitto: quanto serve per arrivare a 1
a.show()

voronoi(8, 0.3)
  .modulateScale(osc(10, 0.1), () => a.fft[1] * 2)
  .colorama(() => a.fft[2] * 0.5)
  .out()`,
      try: 'Spegni la musica (■ STOP nel primo riquadro) e alza il cutoff finché la visuale sta ferma. Poi riaccendi: ora si muove solo con la musica.',
    },
    {
      title: 'Contare i colpi',
      engine: 'hydra', mic: true,
      text: [
        'L\'`update` del tutorial Il tempo preciso e il microfono insieme: un **rilevatore di colpi**. Quando i bassi superano la soglia (0.6) e un attimo prima erano sotto, è arrivato un colpo di cassa: `colpi++`.',
        '`sopra` si ricorda com\'era il fotogramma prima. Senza, un colpo che dura dieci fotogrammi verrebbe contato dieci volte.',
        'Ogni colpo cambia la forma e la fa girare di un passo: la visuale va **a tempo**, a scatti, come una coreografia.',
      ],
      code: `a.setSmooth(0.5)
colpi = 0
sopra = false

update = () => {
  if (a.fft[0] > 0.6 && !sopra) colpi++
  sopra = a.fft[0] > 0.6
}

shape(() => colpi % 5 + 3, 0.4, 0.01)
  .repeat(4, 3)
  .rotate(() => colpi * 0.3)
  .out()`,
      try: 'Se i colpi non vengono contati, abbassa 0.6 (tutte e due le volte). Hydra ha anche un rilevatore suo: a.onBeat = () => { colpi++ } al posto di update, ma è meno facile da regolare.',
    },
    {
      title: 'Tutto insieme',
      engine: 'hydra', mic: true,
      text: [
        'Tutto insieme: sei bande, un po\' di calma, e ogni banda con il suo compito. I bassi gonfiano i cerchi, i colpi cambiano la tinta, i medi deformano, gli acuti accendono l\'eco.',
        'Complimenti! Ora sai regolare le orecchie delle tue visuali. Con **+ TIMELINE** metti la musica e la visuale sulle loro tracce, e prima dello spettacolo regola cutoff e scale nella stanza vera.',
      ],
      code: `a.setBins(6)
a.setSmooth(0.7)
colpi = 0
sopra = false

update = () => {
  if (a.fft[0] > 0.6 && !sopra) colpi++
  sopra = a.fft[0] > 0.6
}

shape(100, () => 0.15 + a.fft[0] * 0.3, 0.02)
  .repeat(4, 3)
  .color(1, 0.4, 0.7)
  .hue(() => colpi * 0.1)
  .modulate(noise(3, 0.1), () => a.fft[2] * 0.3)
  .add(src(o0).scale(1.01).brightness(-0.04), () => a.fft[5] * 2)
  .out()`,
    },
  ],
};

/* ── dove entrano nell'elenco ─────────────────────────────────────── */
const ascolto = TUTORIALS.findIndex(t => t.id === 'ascolto');
if (ascolto === -1) {
  TUTORIALS.push(texture, javascript, generative, tempo, interazione, lente);
} else {
  TUTORIALS.splice(ascolto + 1, 0, lente);
  TUTORIALS.splice(ascolto, 0, texture, javascript, generative, tempo, interazione);
}

})();
