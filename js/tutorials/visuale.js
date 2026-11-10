/* ════════════════════════════════════════════════════════════════════════
   TUTORIAL · Visuale — i percorsi Hydra, stesso formato di js/tutorials.js

   Si carica DOPO js/tutorials.js e js/tutorials/idm.js e si aggiunge in
   fondo a TUTORIALS: così, finito Beat IDM, «prossimo» porta a Primi passi.

   L'ordine segue la guida «Getting started» di Hydra
   (https://hydra.ojack.xyz/docs/docs/learning/getting-started/): la prima
   riga, le trasformazioni, la modularità, commenti ed errori, le uscite
   multiple, blend, modulate, la webcam. In più: il movimento nel tempo e, nel
   gruppo Insieme, le visuali che reagiscono alla musica.

   Tutto il percorso funziona anche senza webcam: la webcam ha un tutorial
   suo, alla fine, invece di comparire in mezzo come nella guida.

   Ogni riquadro visuale parte da uno schermo pulito (tutorial.js fa hush()
   prima di eseguire): un passo non eredita uscite, sorgenti o render() da un
   passo precedente.

   Il pannello del tutorial copre circa due terzi dello schermo da sinistra,
   centro compreso: una forma sola al centro (shape) non si vede. Per questo
   le forme sono sempre grandi o ripetute in griglia (repeat), e il feedback
   usa diff, che riempie lo schermo, invece di blend, che sfuma vicino al
   centro. Se aggiungi un passo, guardalo con il tutorial aperto.
   Anche render() divide lo schermo in quattro con o0 e o2 lì sotto: il testo
   del passo lo dice.
   ════════════════════════════════════════════════════════════════════════ */

/* ╔══ VISUALE · Primi passi ═══════════════════════════════════════════ */
TUTORIALS.push({
  id: 'primi-passi', engine: 'hydra',
  title: 'Primi passi',
  desc: 'Dalla prima riga di codice a una visuale che si muove: le sorgenti, le trasformazioni in catena, i colori, i commenti, il tempo.',
  steps: [

    /* ── 1 · la prima riga ────────────────────────────────────────── */
    {
      title: 'La prima riga',
      text: [
        'Ciao! Qui non si suona: si **dipinge con il codice**. Il motore delle visuali si chiama **Hydra**, ed è costruito come un sintetizzatore. Solo che invece di onde sonore genera onde di luce e colore.',
        'Premi **▶ ESEGUI** qui sotto, oppure Cmd+Invio dentro il riquadro. La visuale compare **sullo sfondo**, nella parte dello schermo a destra del tutorial.',
        '`osc()` è un **oscillatore**: disegna delle strisce che scorrono. `.out()` manda l\'immagine sullo schermo. Senza `.out()` il codice gira ma non si vede niente: è la dimenticanza più comune.',
      ],
      code: `osc().out()`,
      try: 'Premi ■ STOP per tornare al nero, poi riprova. Puoi cambiare tutto il codice che vuoi: con ↺ ORIGINALE torni sempre al punto di partenza.',
    },
    {
      title: 'I tre numeri di osc',
      text: [
        'Tra le parentesi di `osc()` si possono scrivere **tre numeri**, separati da virgole. Se non li scrivi, Hydra usa i suoi.',
        'Il primo è la **frequenza**: quante strisce ci sono. Il secondo è la **velocità** con cui scorrono. Il terzo è il **colore**: a 0 le strisce sono grigie, alzandolo il rosso, il verde e il blu si separano e compare l\'arcobaleno.',
      ],
      code: `osc(20, 0.1, 0.8).out()`,
      try: 'Prova osc(5, 0.1, 0.8) e osc(80, 0.1, 0.8). Poi porta la velocità a 0: l\'immagine si ferma. E con -0.1?',
    },

    /* ── 2 · trasformazioni in catena ─────────────────────────────── */
    {
      title: 'Girare: rotate',
      text: [
        'Ora trasformiamo l\'immagine. Come in Strudel, le **funzioni** si agganciano con un punto: `.rotate()` fa ruotare tutto quello che viene prima.',
        'L\'angolo si misura in **radianti**: 3.14 (pi greco) è mezzo giro, 0.8 è circa un ottavo di giro. Le strisce verticali diventano oblique.',
        'Abbiamo scritto una funzione per riga: è lo stesso codice, solo più facile da leggere. `.out()` resta sempre in fondo: prima si costruisce l\'immagine, poi la si manda sullo schermo.',
      ],
      code: `osc(20, 0.1, 0.8)
  .rotate(0.8)
  .out()`,
      try: 'Prova rotate(1.57): un quarto di giro, e le strisce diventano orizzontali.',
    },
    {
      title: 'Quadretti: pixelate',
      text: [
        '`.pixelate(20, 30)` riduce l\'immagine a una griglia di **quadretti**: 20 in orizzontale e 30 in verticale, come in un vecchio videogioco.',
        'Nota che i quadretti sono dritti anche se le strisce sono oblique: `pixelate` lavora sull\'immagine che gli arriva, cioè quella **già ruotata**.',
      ],
      code: `osc(20, 0.1, 0.8)
  .rotate(0.8)
  .pixelate(20, 30)
  .out()`,
      try: 'Prova numeri piccoli, pixelate(4, 4), e numeri grandi, pixelate(200, 200).',
    },
    {
      title: 'Il caleidoscopio: kaleid',
      text: [
        '`.kaleid(4)` piega l\'immagine come un **caleidoscopio**: la divide in spicchi intorno al centro e li rispecchia. Il numero dice quanti spicchi.',
        'Guarda i quadretti: il caleidoscopio li ha piegati insieme a tutto il resto, e sono diventati spicchi anche loro.',
      ],
      code: `osc(20, 0.1, 0.8)
  .rotate(0.8)
  .pixelate(20, 30)
  .kaleid(4)
  .out()`,
      try: 'Prova kaleid(3), kaleid(6), kaleid(50). Con tanti spicchi escono dei cerchi.',
    },
    {
      title: 'L\'ordine conta',
      text: [
        'Le funzioni lavorano **una dopo l\'altra**, dall\'alto in basso: ognuna trasforma il risultato di quella sopra. Per questo l\'ordine cambia il risultato.',
        'Qui ci sono le stesse funzioni del passo prima, ma `kaleid` viene **prima** di `pixelate`. Ora il caleidoscopio si forma prima, e i quadretti tornano a essere una griglia dritta, sopra tutto.',
      ],
      code: `osc(20, 0.1, 0.8)
  .rotate(0.8)
  .kaleid(4)
  .pixelate(20, 30)
  .out()`,
      try: 'Sposta la riga .rotate(0.8) in fondo, subito prima di .out(): adesso gira tutto il caleidoscopio, quadretti compresi.',
    },
    {
      title: 'Come un sintetizzatore modulare',
      text: [
        'Hydra si ispira ai **sintetizzatori modulari**: tanti moduli collegati da cavi, dove il segnale passa da uno all\'altro. Qui i cavi sono i punti.',
        'Ogni catena ha la stessa forma: una **sorgente** che crea l\'immagine (come `osc`), poi le funzioni di **geometria**, che decidono dove stanno le cose (`rotate`, `pixelate`, `kaleid`…), poi quelle di **colore**, e in fondo `.out()`.',
        'Ecco la prima funzione di colore: `.color(1, 0.4, 0.8)` regola il **rosso, il verde e il blu**. 1 lascia il canale com\'è, 0 lo spegne del tutto: togliendo un bel po\' di verde, tutto vira sul viola.',
      ],
      code: `osc(20, 0.1, 0.8)
  .rotate(0.8)
  .kaleid(4)
  .color(1, 0.4, 0.8)
  .out()`,
      try: 'Prova color(0, 1, 1): senza il rosso resta un mondo azzurro e verde.',
    },

    /* ── 3 · altre sorgenti, altri colori ─────────────────────────── */
    {
      title: 'Altre sorgenti: shape',
      text: [
        '`osc` non è l\'unica sorgente. `shape()` disegna un **poligono**: il primo numero è quanti lati, il secondo quanto è grande, il terzo quanto è **sfumato** il bordo.',
        'Qui un triangolo (3 lati), grande 0.5, con il bordo netto. Le forme passano per le stesse funzioni di prima: `.repeat(3, 3)` lo ripete in una griglia di 3 per 3.',
        'Perché ripeterlo? Una forma nasce al **centro** dello schermo, che qui sta sotto il pannello del tutorial. In una griglia, invece, le copie arrivano fino alla parte scoperta, sulla destra.',
      ],
      code: `shape(3, 0.5, 0.01)
  .repeat(3, 3)
  .out()`,
      try: 'Prova shape(4) per un quadrato e shape(100) per un cerchio. Poi alza il terzo numero a 0.3: il bordo diventa una nuvola.',
    },
    {
      title: 'Nuvole: noise',
      text: [
        '`noise()` genera un **rumore** morbido che si muove, come fumo o nuvole. Il primo numero è la **grana**: più è alto, più le macchie sono piccole. Il secondo è la velocità.',
        'Il rumore è grigio, quindi lo coloriamo con `.color()`: un fumo azzurro.',
      ],
      code: `noise(3, 0.1)
  .color(0.3, 0.6, 1)
  .out()`,
      try: 'Prova noise(30, 0.1): la grana diventa fitta come la neve di un vecchio televisore. Oppure gradient(1), una sfumatura di colori che cambia nel tempo.',
    },
    {
      title: 'Celle e colori: voronoi e colorama',
      text: [
        '`voronoi()` divide lo schermo in **celle** che si muovono, come la pelle di una giraffa o le bolle di sapone. Il primo numero è quante celle, il secondo la velocità.',
        '`.colorama()` **fa ruotare tutti i colori** dell\'immagine: anche un numero piccolo trasforma il grigio in un arcobaleno psichedelico.',
      ],
      code: `voronoi(8, 0.3)
  .colorama(0.4)
  .out()`,
      try: 'Aggiungi .invert() prima di .out(): il negativo, come nelle vecchie pellicole. Poi prova .posterize(3), che riduce i colori a pochi, come in un manifesto.',
    },

    /* ── 4 · commenti ed errori ───────────────────────────────────── */
    {
      title: 'Commenti ed errori',
      text: [
        'Come nel suono, due barre `//` trasformano una riga in un **commento**: Hydra la salta. Servono a scrivere note per te, oppure a **spegnere** una funzione senza cancellarla. Qui `.pixelate()` è spento: togli le `//` e riesegui.',
        'E se sbagli qualcosa? Sotto il riquadro compare un messaggio con la **✕** e lo schermo resta nero finché non correggi. Gli errori più comuni: una parentesi dimenticata, un punto mancante, un nome scritto male (`rotat` invece di `rotate`). Non preoccuparti, capita a tutti.',
      ],
      code: `// una visuale con i commenti
osc(30, 0.1, 1.2)
  .kaleid(5)
  // .pixelate(16, 16)
  .color(0.9, 0.5, 1)
  .out()`,
      try: 'Cancella apposta una parentesi e premi ▶: leggi il messaggio d\'errore, poi rimetti tutto a posto con ↺ ORIGINALE.',
    },

    /* ── 5 · il movimento ─────────────────────────────────────────── */
    {
      title: 'Girare di continuo',
      text: [
        'Finora le immagini scorrevano, ma stavano ferme al loro posto. Molte funzioni di geometria hanno un numero in più per la **velocità**: `.rotate(0, 0.1)` parte dall\'angolo 0 e **gira** di continuo, piano.',
      ],
      code: `shape(4, 0.4, 0.01)
  .repeat(4, 4)
  .rotate(0, 0.1)
  .out()`,
      try: 'Prova rotate(0, -0.5): più veloce, e al contrario. Anche .scrollX(0, 0.1) ha una velocità: fa scorrere l\'immagine di lato.',
    },
    {
      title: 'Il tempo: () => time',
      text: [
        'Per far muovere **qualunque** numero c\'è un trucco: al posto del numero si scrive una piccola funzione, `() => …`, che Hydra ricalcola a ogni fotogramma, circa 60 volte al secondo.',
        '`time` sono i **secondi** passati dall\'avvio. `Math.sin(time)` è un\'onda che va su e giù tra -1 e 1, come `sine` in Strudel. Qui la usiamo per far **respirare** il caleidoscopio: `.scale()` ingrandisce e rimpicciolisce l\'immagine, tra 0.7 e 1.3.',
      ],
      code: `osc(20, 0.1, 0.8)
  .kaleid(4)
  .scale(() => 1 + Math.sin(time) * 0.3)
  .out()`,
      try: 'Prova Math.sin(time * 3): il respiro si fa affannato. Puoi mettere una funzione anche dentro osc: osc(() => 10 + Math.sin(time) * 5, 0.1, 0.8).',
    },
    {
      title: 'Sequenze: una lista di valori',
      text: [
        'Un altro modo per far cambiare un numero: una **lista** tra parentesi quadre. Con `[3, 4, 6, 8]` kaleid prende un valore ogni tanto, uno dopo l\'altro e poi da capo, come le `< >` nella mini-notazione di Strudel.',
        '`.fast(2)` fa scorrere la lista due volte più veloce. Attenzione: qui le quadre non dividono il tempo come in Strudel, sono solo un elenco di numeri.',
      ],
      code: `osc(20, 0.1, 0.8)
  .kaleid([3, 4, 6, 8].fast(2))
  .out()`,
      try: 'Aggiungi .smooth() dopo .fast(2): invece di scattare, i valori scivolano uno nell\'altro.',
    },
    {
      title: 'Tutto insieme',
      text: [
        'Ecco una visuale con tutto quello che hai imparato: una sorgente, la geometria, il colore e il movimento. Leggila dall\'alto in basso, una riga alla volta.',
        'Complimenti: hai costruito la tua prima visuale! Premi **→ EDITOR** per portarla nel LAB e continuare a modificarla, oppure **+ TIMELINE** per usarla nella tua performance.',
      ],
      code: `osc(30, 0.05, 1.2)
  .rotate(0, 0.05)
  .kaleid([4, 6, 8].fast(0.5))
  .scale(() => 1 + Math.sin(time * 0.5) * 0.2)
  .color(1, 0.6, 0.9)
  .colorama(0.1)
  .out()`,
      try: 'Metti // davanti a una riga alla volta e guarda cosa cambia. Poi inventa una combinazione tua.',
    },
  ],
});

/* ╔══ VISUALE · Mescolare e deformare ════════════════════════════════ */
TUTORIALS.push({
  id: 'mescolare', engine: 'hydra',
  title: 'Mescolare e deformare',
  desc: 'Più immagini insieme: le quattro uscite di Hydra, i modi per fonderle (blend, diff, mask), la modulazione che deforma un\'immagine con un\'altra e il feedback, l\'eco visiva.',
  steps: [

    /* ── 1 · le quattro uscite ────────────────────────────────────── */
    {
      title: 'Quattro schermi',
      text: [
        'Ciao di nuovo! Finora abbiamo sempre scritto `.out()`. In realtà Hydra ha **quattro uscite**, come quattro schermi: si chiamano `o0`, `o1`, `o2` e `o3`. `.out()` senza niente tra le parentesi vuol dire `.out(o0)`.',
        'Qui mandiamo quattro immagini diverse alle quattro uscite, e `render()` le mostra **tutte insieme**: `o0` in alto a sinistra, `o1` in alto a destra, `o2` in basso a sinistra, `o3` in basso a destra.',
        'Il pannello del tutorial copre la parte sinistra dello schermo, quindi `o0` e `o2` restano in gran parte lì sotto: si vedono bene `o1` e `o3`.',
      ],
      code: `osc(20, 0.1, 0.8).out(o0)
shape(4, 0.5, 0.01).out(o1)
noise(3, 0.1).out(o2)
voronoi(8, 0.3).out(o3)
render()`,
      try: 'Sostituisci render() con render(o2): lo schermo mostra solo la terza uscita, il rumore.',
    },
    {
      title: 'Leggere un\'uscita: src',
      text: [
        'Di solito non si guardano tutte e quattro: `render(o0)` mostra **solo** `o0`. Le altre continuano a lavorare, come le tracce di un mixer con il volume abbassato, pronte a essere usate.',
        'E come si usano? `src()` **legge** un\'uscita e la fa diventare una sorgente, come `osc` o `shape`. Qui in `o1` c\'è un quadrato che gira, e `o0` lo legge e lo ripete in una griglia.',
      ],
      code: `shape(4, 0.5, 0.01).rotate(0, 0.2).out(o1)
src(o1)
  .repeat(3, 3)
  .out(o0)
render(o0)`,
      try: 'Cambia la prima riga: invece della forma manda in o1 un osc(20, 0.1, 0.8). La griglia in o0 cambia da sola.',
    },

    /* ── 2 · mescolare ────────────────────────────────────────────── */
    {
      title: 'Mescolare: blend',
      text: [
        'Ora il bello: **fondere** due immagini. `.blend()` mescola l\'immagine della catena con quella tra le parentesi, come una **dissolvenza incrociata** tra due telecamere. Dentro le parentesi basta scrivere il nome dell\'uscita.',
        'Il secondo numero dice quanto: 0 è tutta la prima immagine, 1 tutta la seconda, 0.5 metà e metà.',
      ],
      code: `osc(20, 0.1, 0.8).out(o1)
shape(4, 0.4, 0.01).repeat(4, 4).rotate(0, 0.1).out(o2)
src(o1)
  .blend(o2, 0.5)
  .out(o0)
render(o0)`,
      try: 'Prova 0.2 e 0.8. Poi cambia render(o0) in render(): vedi insieme le due immagini di partenza e il risultato.',
    },
    {
      title: 'Una catena dentro l\'altra',
      text: [
        'Le uscite sono comode quando un\'immagine si usa più volte. Ma tra le parentesi puoi anche scrivere **direttamente** un\'altra catena, con le sue funzioni.',
        'Il risultato è lo stesso del passo prima, in una catena sola. Attenzione alle parentesi: quella di `shape(…)` si chiude subito, prima di `.repeat`, e quella di `blend(…)` solo alla fine, dopo lo 0.5.',
      ],
      code: `osc(20, 0.1, 0.8)
  .blend(shape(4, 0.4, 0.01).repeat(4, 4).rotate(0, 0.1), 0.5)
  .out()`,
      try: 'Dentro blend metti noise(3, 0.1) al posto della forma.',
    },
    {
      title: 'Differenza: diff',
      text: [
        '`.blend()` non è l\'unico modo di mescolare. `.diff()` calcola la **differenza** tra le due immagini: dove sono uguali diventa nero, dove sono diverse si accende.',
        'Qui due quadrati girano in versi opposti, un po\' come il moto contrario del tutorial Contrappunto: dove si sovrappongono si spengono, e nascono stelle e incastri sempre nuovi.',
      ],
      code: `shape(4, 0.8, 0.01)
  .rotate(0, 0.1)
  .diff(shape(4, 0.8, 0.01).rotate(0, -0.1))
  .out()`,
      try: 'Sostituisci diff con add, che somma le luci, e poi con mult, che le moltiplica: resta acceso solo dove tutte e due le immagini sono chiare.',
    },
    {
      title: 'Ritagliare: mask',
      text: [
        '`.mask()` usa la seconda immagine come uno **stampo**: dove è chiara si vede la prima, dove è scura resta nero. È come guardare le strisce colorate attraverso i buchi esagonali di un alveare.',
      ],
      code: `osc(20, 0.1, 1.2)
  .mask(shape(6, 0.4, 0.01).repeat(4, 3))
  .out()`,
      try: 'Come stampo usa voronoi(8, 0.3): le strisce si vedono solo dentro le parti chiare delle celle.',
    },

    /* ── 3 · modulare ─────────────────────────────────────────────── */
    {
      title: 'Modulare: deformare con un\'altra immagine',
      text: [
        'Ed ecco la funzione più famosa di Hydra: `.modulate()`. Non mescola i colori: usa la luce della seconda immagine per **spostare i pixel** della prima. Il risultato sembra liquido, come guardare attraverso l\'acqua.',
        'Il nome viene dai sintetizzatori: la **modulazione** è quando un oscillatore ne fa ondeggiare un altro. Il secondo numero dice quanto: 0 non fa niente, più sale e più l\'immagine si deforma.',
      ],
      code: `osc(20, 0.1, 0.8)
  .modulate(noise(3, 0.1), 0.2)
  .out()`,
      try: 'Prova 0.05 e 1. Poi al posto del rumore usa una forma: modulate(shape(4, 0.5), 0.3).',
    },
    {
      title: 'Modulare la geometria',
      text: [
        'Molte funzioni di geometria hanno una versione «modulata». `.modulateRotate()` fa ruotare **ogni zona** dell\'immagine di un angolo diverso, a seconda di quanto è chiara la seconda immagine in quel punto.',
        'Allo stesso modo `.modulateScale()` ingrandisce ogni zona in modo diverso, e `.modulateKaleid()` la piega a caleidoscopio.',
      ],
      code: `osc(20, 0.1, 0.8)
  .modulateRotate(voronoi(5, 0.3), 1)
  .out()`,
      try: 'Sostituisci modulateRotate con modulateScale, poi prova modulateKaleid(voronoi(5, 0.3), 4).',
    },

    /* ── 4 · feedback ─────────────────────────────────────────────── */
    {
      title: 'Il feedback: un\'eco visiva',
      text: [
        'E se un\'uscita leggesse **sé stessa**? `src(o0)` dentro la catena che finisce in `o0` prende l\'immagine del fotogramma prima e la mescola con quella nuova. Il risultato è un\'**eco visiva**: ogni cosa lascia una traccia.',
        'È un po\' come il riverbero del tutorial Ambient, dove il suono continua dopo che la fonte si è fermata. Qui `.scale(1.02)` ingrandisce l\'eco a ogni fotogramma, e `diff` la incrocia con il quadrato nuovo: le copie si allargano verso i bordi come onde in uno stagno, fino a riempire lo schermo.',
      ],
      code: `shape(4, 0.3, 0.01)
  .rotate(0, 0.5)
  .color(1, 0.5, 0.8)
  .diff(src(o0).scale(1.02))
  .out(o0)`,
      try: 'Aggiungi .rotate(0.02) subito dopo .scale(1.02): il tunnel gira. Poi cambia 1.02 in 0.98: le onde vanno verso il centro.',
    },
    {
      title: 'Tutto insieme',
      text: [
        'Mescolare e modulare si possono concatenare quanto vuoi: ogni funzione aggiunge un ingrediente. Qui un oscillatore viene deformato dal rumore, incrociato con un triangolo a caleidoscopio e lasciato scivolare nel feedback.',
        'Complimenti! Porta la visuale nel LAB con **→ EDITOR** e cambia un ingrediente alla volta, oppure mettila in timeline con **+ TIMELINE**.',
      ],
      code: `osc(15, 0.05, 1.2)
  .modulate(noise(2, 0.1), 0.3)
  .diff(shape(3, 0.4, 0.01).rotate(0, 0.2).kaleid(3))
  .blend(src(o0).scale(1.01), 0.6)
  .colorama(0.05)
  .out(o0)`,
      try: 'Sostituisci diff con mask, oppure noise con voronoi. Ogni scambio cambia il carattere di tutta la visuale.',
    },
  ],
});

/* ╔══ VISUALE · La webcam ════════════════════════════════════════════ */
TUTORIALS.push({
  id: 'webcam', engine: 'hydra',
  title: 'La webcam',
  desc: 'La tua immagine come sorgente: la webcam passa per tutte le funzioni che conosci, dai quadretti alla pop art, fino a un esempio avanzato con quattro uscite e una scia che cambia colore.',
  steps: [
    {
      title: 'Accendere la webcam',
      text: [
        'Ciao! Oltre a `osc`, `shape` e `noise`, Hydra può usare immagini che vengono **da fuori**: la webcam, uno schermo condiviso, un video. Per queste ci sono le sorgenti esterne `s0`, `s1`, `s2` e `s3`.',
        '`s0.initCam()` accende la webcam dentro `s0`, e `src(s0)` la porta nella catena, proprio come `src(o1)` faceva con le uscite.',
        'La prima volta il **browser ti chiede il permesso**: premi Consenti. Le immagini restano su questo computer, non vengono registrate né inviate a nessuno. Se non hai una webcam, o hai negato il permesso, lo schermo resta nero.',
      ],
      code: `s0.initCam()
src(s0)
  .out()`,
      try: 'Se il computer ha più di una webcam, s0.initCam(1) usa la seconda.',
    },
    {
      title: 'Trasformare la webcam',
      text: [
        'Da qui in poi la webcam è una sorgente come le altre: tutte le funzioni che hai imparato valgono anche per lei.',
        'Qui la riduciamo a quadretti con `.pixelate(40, 30)`: 40 in orizzontale e 30 in verticale. Muoviti davanti alla telecamera: sei diventato un personaggio dei videogiochi!',
      ],
      code: `s0.initCam()
src(s0)
  .pixelate(40, 30)
  .out()`,
      try: 'Prova pixelate(10, 8): pochi quadretti enormi, e ti riconosci a malapena. Poi pixelate(160, 120), quasi nitido, e pixelate(80, 4), che ti trasforma in strisce.',
    },
    {
      title: 'Bianco e nero: thresh',
      text: [
        '`.thresh()` è una **soglia**: quello che è più chiaro di un certo valore diventa bianco, il resto nero. Il volto diventa un disegno a inchiostro, come una fotocopia.',
        'Il numero va da 0 a 1: più è basso, più bianco c\'è. Dipende molto dalla luce della stanza, quindi prova a regolarlo.',
      ],
      code: `s0.initCam()
src(s0)
  .thresh(0.4)
  .out()`,
      try: 'Aggiungi .color(1, 0.2, 0.4) dopo thresh: il bianco diventa del colore che vuoi.',
    },
    {
      title: 'Pop art',
      text: [
        'Negli anni \'60 **Andy Warhol** stampava la stessa foto più volte, ognuna con colori piatti e diversi. Proviamo anche noi.',
        '`.saturate(3)` rende i colori più accesi, `.posterize(3)` li riduce a pochi livelli, come in un manifesto, e `.repeat(2, 2)` fa quattro copie.',
        'L\'ultima riga sembra complicata, ma leggila un pezzo alla volta: `gradient(1)` è una sfumatura di colori che cambia nel tempo, e `.pixelate(2, 2)` la riduce a **quattro blocchi** di colore piatto, uno per copia. `diff` li combina con la webcam: ogni copia ha i suoi colori.',
      ],
      code: `s0.initCam()
src(s0)
  .saturate(3)
  .posterize(3)
  .repeat(2, 2)
  .diff(gradient(1).pixelate(2, 2))
  .out()`,
      try: 'Prova repeat(3, 3) e pixelate(3, 3): nove copie, nove colori.',
    },
    {
      title: 'La webcam che si scioglie',
      text: [
        'Anche la webcam si può deformare con `.modulate()`. Qui il rumore la fa ondeggiare come un riflesso sull\'acqua.',
      ],
      code: `s0.initCam()
src(s0)
  .modulate(noise(3, 0.2), 0.1)
  .out()`,
      try: 'Ora al contrario: lascia la prima riga e scrivi osc(20, 0.1, 0.8).modulate(src(s0), 0.3).out(). È la webcam a deformare le strisce: muovendoti le sposti.',
    },
    {
      title: 'La scia',
      text: [
        'Il feedback del tutorial precedente funziona benissimo con la webcam. Qui l\'eco si mescola con `blend` invece che con `diff`: sfuma piano piano, e ogni movimento lascia una **scia**, come una foto a lunga esposizione.',
        'Muovi lentamente una mano davanti alla telecamera. Più il numero di `blend` è vicino a 1, più la scia è lunga.',
      ],
      code: `s0.initCam()
src(s0)
  .blend(src(o0), 0.9)
  .out(o0)`,
      try: 'Aggiungi .scale(1.02) dopo src(o0): la scia esplode verso i bordi.',
    },
    {
      title: 'Un esempio avanzato: la sagoma e il fumo',
      text: [
        'Per finire, un esempio avanzato. Sembra lungo, ma è fatto di pezzi che conosci già: **quattro catene**, una per ogni uscita, che si passano l\'immagine come in una catena di montaggio. Premi ▶, mettiti davanti alla telecamera e muoviti. Poi leggilo un\'uscita alla volta.',
        '**o0, lo specchio.** `src(s0).scale(1, -1)` prende la webcam e la ribalta da destra a sinistra. Il secondo numero di `scale` allarga solo la larghezza, e un numero negativo vuol dire «al contrario». Ora lo schermo fa da specchio: se alzi la mano destra, si alza quella a destra.',
        '**o1, la sagoma.** `.thresh(0.6, 0.01)` fa diventare bianco tutto quello che è più chiaro di 0.6 e nero il resto. Il secondo numero, piccolissimo, rende il bordo netto. `.invert()` poi scambia bianco e nero: ora sono bianche le parti **scure** dell\'immagine. Se sei davanti a una parete chiara, sei tu.',
        '**o2, il ritaglio.** `mult` moltiplica lo specchio per la sagoma: dove la sagoma è bianca la webcam resta, dove è nera sparisce.',
        '**o3, il fumo.** Qui c\'è la magia. `.blend(src(o3), 0.995)` è un feedback, come nel passo La scia, ma molto più lungo: o3 legge sé stessa, tiene il 99,5% dell\'immagine di prima e aggiunge solo lo 0,5% di quella nuova. Ogni movimento resta sullo schermo per secondi.',
        '`.colorama(0.0025)` sposta i colori di pochissimo, ma lo fa a ogni fotogramma, e il feedback accumula: la scia attraversa piano piano tutto l\'arcobaleno. `.modulateHue(o3, 40)` sposta ogni pixel in una direzione che dipende dal suo **colore**: ogni tinta scivola per conto suo, e la scia si mette a colare come fumo colorato.',
        'Alla fine `src(o2).mask(src(o1))` rende il ritaglio trasparente dove la sagoma è nera, e `.layer()` lo appoggia **sopra** a tutto. `render(o3)` mostra solo il risultato: la tua figura viva davanti, nitida, e il fumo colorato dietro.',
        'Complimenti: questo è live coding visuale vero! Porta l\'esempio nel LAB con **→ EDITOR** e segui i due commenti nel codice: sono i primi numeri da cambiare.',
      ],
      code: `s0.initCam(0)

src(s0).scale(1, -1).out()

// cambia il primo valore di thresh
src(o0).thresh(0.6, 0.01).invert()
  .out(o1)

src(o0).mult(src(o1)).out(o2)

// cambia colorama
src(o2)
  .blend(src(o3), 0.995)
  .colorama(0.0025)
  .modulateHue(o3, 40)
  .layer(src(o2).mask(src(o1)))
  .out(o3)

render(o3)`,
      try: 'Cambia render(o3) in render(o1) per vedere la sagoma: se è tutta bianca o tutta nera, regola il primo numero di thresh finché non ti ritaglia bene, poi torna a render(o3). Con render() vedi le quattro uscite insieme (o0 e o2 restano sotto il pannello).',
    },
  ],
});

/* ╔══ INSIEME · Visuali che ascoltano ════════════════════════════════
   Tutorial misto: ogni passo dichiara il suo motore. I passi Hydra con
   a.fft hanno mic: true, così tutorial.js accende il microfono da sé.
   Il microfono ascolta le casse: con le cuffie la visuale non sente niente,
   e il testo lo dice. */
TUTORIALS.push({
  id: 'ascolto', engine: 'mix',
  title: 'Visuali che ascoltano',
  desc: 'Suono e visuale insieme: il microfono divide la musica in bande, dai bassi agli acuti, e ogni banda muove un numero della visuale.',
  steps: [
    {
      title: 'Prima, un po\' di musica',
      engine: 'strudel',
      text: [
        'Ciao! In questo tutorial suono e visuale lavorano **insieme**: la visuale ascolta la musica e si muove a tempo.',
        'Cominciamo dalla musica. Questo è un riquadro **SUONO**: premi ▶ e lascialo andare. Resta acceso per tutto il tutorial, sotto le visuali.',
      ],
      code: `setcpm(120/4)
$: sound("bd*4")
$: sound("~ cp ~ cp, hh*8").gain(0.7)`,
      try: 'Tienilo semplice: la visuale reagisce meglio a un ritmo con una cassa ben chiara.',
    },
    {
      title: 'La visuale ascolta: a.fft',
      engine: 'hydra', mic: true,
      text: [
        'Hydra non riceve la musica di Strudel direttamente: la **ascolta con il microfono**, dalle casse del computer. Servono le casse accese, non le cuffie. Funziona anche con la voce, o battendo le mani.',
        'Premendo ▶ il microfono si accende da solo e il browser ti chiede il permesso: il suono resta su questo computer. Lo spegni con 🎤 MIC in alto.',
        'Hydra divide il suono in quattro **bande**, dai bassi agli acuti: `a.fft[0]` è il volume dei bassi, `a.fft[3]` quello degli acuti. Sono numeri che cambiano di continuo, per questo stanno dentro `() =>`, come `time`. Qui la grandezza dei cerchi segue i bassi: pulsano con la cassa.',
      ],
      code: `shape(100, () => 0.1 + a.fft[0] * 0.4, 0.05)
  .repeat(4, 3)
  .out()`,
      try: 'Cambia a.fft[0] con a.fft[3]: ora i cerchi seguono gli hi-hat, più acuti e più fitti.',
    },
    {
      title: 'Cambiare musica',
      engine: 'strudel',
      text: [
        'La visuale continua a girare mentre cambi la musica: ascolta qualunque cosa esca dalle casse. Qui aggiungiamo il basso del tutorial Ritmo, che accende soprattutto la banda dei medi.',
        'Premi ▶ e torna a guardare la visuale dell\'ultimo passo che hai eseguito: reagisce al nuovo ritmo da sola.',
      ],
      code: `setcpm(120/4)
$: sound("bd*4")
$: sound("~ cp ~ cp, hh*8").gain(0.7)
$: note("c2 ~ c2 eb2 ~ c2 g1 ~").sound("sawtooth").lpf(400)`,
      try: 'Prova anche un groove del tutorial Ritmo o di Beat IDM: con i rulli velocissimi, la visuale impazzisce.',
    },
    {
      title: 'Tutto insieme',
      engine: 'hydra', mic: true,
      text: [
        'Per finire, il tunnel di feedback del tutorial Mescolare, che respira con la musica: il quadrato si gonfia con la cassa, gli acuti accendono il blu e i medi fanno girare le onde dell\'eco.',
        'Complimenti: hai costruito una performance audiovisiva! Con **+ TIMELINE** metti sia la musica sia la visuale sulle loro tracce, e il pezzo è pronto per il pubblico.',
      ],
      code: `shape(4, () => 0.2 + a.fft[0] * 0.4, 0.01)
  .rotate(0, 0.2)
  .color(1, 0.4, () => a.fft[3] * 3)
  .diff(src(o0).scale(1.02).rotate(() => a.fft[1] * 0.05))
  .out(o0)`,
    },
  ],
});
