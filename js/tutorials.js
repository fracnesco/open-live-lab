/* ════════════════════════════════════════════════════════════════════════
   TUTORIALS — percorsi passo passo (solo dati, come snippets.js)

   Ogni tutorial:
     { id, engine: 'strudel'|'hydra'|'mix', title, desc, steps: [...] }
   Ogni passo:
     { title,
       text:  [paragrafi],     // `codice` e **grassetto** sono ammessi
       code,                   // facoltativo: il codice del riquadro
       engine,                 // facoltativo: se diverso da quello del tutorial
       try,                    // facoltativo: «Prova tu», una piccola sfida
       mic: true }             // facoltativo: il codice usa a.fft (microfono)

   Il testo viene ESCAPATO prima di applicare i due segni di formattazione:
   qui non si scrive HTML.

   Un tutorial può stare anche in un file suo, in js/tutorials/, che fa
   TUTORIALS.push({...}) e si carica in index.html DOPO questo file (l'ordine
   dei <script> è l'ordine nell'elenco). Esempio: js/tutorials/idm.js.

   Regola dei contenuti: ogni riquadro deve suonare/funzionare in Open Live Lab
   così com'è. Solo i suoni della cartella samples/ (bd sd sn hh cp lt mt ht
   perc casio jazz arpy tabla east space crow xbreak1 dnb1 sax) e i sintetizzatori; niente
   .bank(), niente piano. Se aggiungi un passo, provalo con ▶ prima.
   ════════════════════════════════════════════════════════════════════════ */

/* L'ordine dei gruppi è l'ordine nell'indice; un gruppo senza tutorial non
   compare. */
const TUTORIAL_GROUPS = [
  { engine: 'strudel', label: 'Suono' },
  { engine: 'hydra',   label: 'Visuale' },
  { engine: 'mix',     label: 'Insieme' },
];

const TUTORIALS = [

  /* ╔══ SUONO · Ritmo ══════════════════════════════════════════════════ */
  {
    id: 'ritmo', engine: 'strudel',
    title: 'Ritmo',
    desc: 'Dalla prima coppia cassa e rullante a un groove completo con il basso: mini-notazione, funzioni che trasformano il ritmo, più pattern insieme e stack.',
    steps: [

      /* ── 1 · cassa e rullante ────────────────────────────────────── */
      {
        title: 'Cassa e rullante',
        text: [
          'Ciao! Cominciamo dal cuore di ogni ritmo: la **cassa** e il **rullante**. In Strudel si chiamano `bd` (bass drum) e `sd` (snare drum).',
          'Premi **▶ ESEGUI** qui sotto, oppure Cmd+Invio dentro il riquadro. Senti? Bum, cià, bum, cià… all\'infinito.',
          'Quello che hai scritto tra le virgolette si chiama **mini-notazione**: è un piccolo linguaggio fatto apposta per scrivere ritmi. Strudel lo suona in un **ciclo**, una battuta che ricomincia da capo senza fermarsi.',
        ],
        code: `sound("bd sd")`,
        try: 'Premi ■ STOP per fermare, poi riprova. Puoi cambiare tutto il codice che vuoi: con ↺ ORIGINALE torni sempre al punto di partenza.',
      },
      {
        title: 'Quattro battiti',
        text: [
          'Scrivendo più suoni, il ciclo si divide in **parti uguali**. Con quattro suoni hai quattro battiti, come nella maggior parte delle canzoni.',
          'Il ciclo dura sempre lo stesso tempo: se aggiungi suoni non si allunga, diventa più fitto.',
        ],
        code: `sound("bd sd bd sd")`,
        try: 'Prova "bd bd sd bd": basta spostare un colpo per cambiare carattere al ritmo.',
      },
      {
        title: 'Il silenzio conta',
        text: [
          'La tilde `~` è una **pausa**: occupa il suo posto nel ciclo, ma non suona.',
          'Qui la cassa batte sul primo e sul terzo battito, il rullante sul secondo e sul quarto, e nelle pause c\'è spazio per respirare.',
        ],
        code: `sound("bd ~ sd ~ bd bd sd ~")`,
      },

      /* ── 2 · i piattini e la mini-notazione ──────────────────────── */
      {
        title: 'Arrivano i piattini',
        text: [
          'Ora aggiungiamo i **piattini**: `hh` è l\'hi-hat, il charleston.',
          'Il segreto è la **virgola**: separa due sequenze che suonano **nello stesso momento**, ognuna con i suoi passi. Da una parte cassa e rullante, dall\'altra quattro hi-hat.',
        ],
        code: `sound("bd sd bd sd, hh hh hh hh")`,
      },
      {
        title: 'Ripetere con *',
        text: [
          'Scrivere `hh hh hh hh hh hh hh hh` è noioso. L\'asterisco ripete per te: `hh*8` sono otto hi-hat in un ciclo.',
          'Funziona anche su un gruppo di suoni, come vedrai tra poco.',
        ],
        code: `sound("bd sd bd sd, hh*8")`,
        try: 'Prova hh*16 per un ritmo più agitato, oppure hh*6 per uno che dondola.',
      },
      {
        title: 'Dividere un battito con [ ]',
        text: [
          'Le parentesi quadre prendono **un solo posto** del ciclo e lo dividono ancora. `[~ bd]` è un battito diviso a metà: prima silenzio, poi cassa.',
          'È il modo per fare i colpi "in levare", quelli che danno spinta al ritmo.',
        ],
        code: `sound("bd [~ bd] sd ~, hh*8")`,
        try: 'Metti [bd bd bd] al posto del primo bd: una terzina di cassa.',
      },
      {
        title: 'Un ciclo sì, un ciclo no con < >',
        text: [
          'Le parentesi angolari scelgono **un elemento per ciclo**: al primo giro il primo, al secondo giro il secondo, e poi da capo.',
          'Qui il rullante si alterna con il battito di mani `cp` (clap). Il ritmo diventa una frase lunga due cicli, senza scrivere il doppio.',
        ],
        code: `sound("bd [~ bd] <sd cp> ~, hh*8")`,
        try: 'Prova <sd cp [cp cp]>: tre cicli diversi prima di ricominciare.',
      },
      {
        title: 'Ritmi euclidei con ( )',
        text: [
          '`bd(3,8)` vuol dire: **3 colpi distribuiti su 8 passi**, il più regolarmente possibile. Con due soli numeri escono ritmi che si trovano in musiche di tutto il mondo.',
          '(3,8) è il tresillo della musica cubana, (5,8) il cinquillo.',
        ],
        code: `sound("bd(3,8), ~ sd, hh*8")`,
        try: 'Prova bd(5,8) e poi bd(7,16). Anche l\'hi-hat può essere euclideo: hh(5,8).',
      },
      {
        title: 'Note lunghe con @, colpi a caso con ?',
        text: [
          'Due ultimi trucchi. La chiocciola dà un **peso**: `bd@3` occupa tre posti invece di uno. Il punto di domanda fa suonare un colpo **solo a volte**, a caso.',
          'Con `hh*16?` una parte degli hi-hat sparisce ogni giro: il ritmo non è mai del tutto uguale.',
        ],
        code: `sound("bd@3 bd sd@2 ~@2, hh*16?")`,
      },
      {
        title: 'La velocità',
        text: [
          '`setcpm()` decide quanti **cicli al minuto** suonano. Se nel tuo ciclo ci sono 4 battiti, i battiti al minuto (bpm) sono cpm × 4. Per 100 bpm si scrive `setcpm(100/4)`.',
          'Va su una riga tutta sua, prima del ritmo.',
        ],
        code: `setcpm(100/4)
sound("bd [~ bd] <sd cp> ~, hh*8")`,
        try: 'Porta il tempo a 140/4, poi a 70/4: lo stesso ritmo cambia carattere.',
      },

      /* ── 3 · funzioni che trasformano il pattern ─────────────────── */
      {
        title: 'Le funzioni: ply',
        text: [
          'Finora abbiamo lavorato **dentro** le virgolette. Adesso agganciamo delle **funzioni** al pattern con un punto: `.nome()`. Ogni funzione trasforma il ritmo intero.',
          '`.ply(2)` ripete ogni colpo due volte, nel tempo di uno. Qui usiamo `"<1 2>"`: un ciclo normale, un ciclo raddoppiato. Sì, anche le funzioni accettano la mini-notazione!',
        ],
        code: `sound("bd ~ sd ~, hh*4")
  .ply("<1 2>")`,
        try: 'Prova .ply(3), oppure .ply("<1 2 3>").',
      },
      {
        title: 'degradeBy: togliere colpi a caso',
        text: [
          '`.degradeBy(0.4)` toglie a caso circa il **40%** dei colpi. Un ritmo rigido comincia a respirare e non è mai uguale due volte.',
          'Fa lo stesso lavoro del `?` che hai visto prima, ma puoi scegliere tu quanto: 0 non toglie niente, 1 toglie tutto.',
        ],
        code: `sound("hh*16")
  .degradeBy(0.4)`,
        try: 'Prova 0.1 e 0.8. Qui c\'è solo l\'hi-hat: tra poco vedrai come metterlo insieme a cassa e rullante senza che sparisca anche la cassa.',
      },
      {
        title: 'fast e slow',
        text: [
          '`.fast(2)` fa stare il pattern **due volte** in un ciclo, `.slow(2)` lo allunga su due cicli.',
          'Diversamente da `setcpm`, cambia solo questo pattern e non il tempo di tutta la musica.',
        ],
        code: `sound("bd [~ bd] sd ~, hh*4")
  .fast("<1 2>")`,
      },
      {
        title: 'rev e iter',
        text: [
          '`.rev()` suona il ciclo **al contrario**, dalla fine all\'inizio.',
          '`.iter(4)` divide il ciclo in 4 pezzi e a ogni giro **parte da un pezzo diverso**: il ritmo sembra girare su sé stesso.',
        ],
        code: `sound("bd sd hh cp")
  .iter(4)`,
        try: 'Sostituisci .iter(4) con .rev(), poi prova a usarle tutte e due.',
      },
      {
        title: 'sometimes: ogni tanto qualcosa cambia',
        text: [
          '`.sometimes()` applica una trasformazione **solo a volte**, più o meno una volta su due.',
          'La parte `x => x.speed(2)` si legge così: «prendi il pattern, chiamalo x, e suonalo a velocità doppia». La velocità doppia rende il colpo più acuto.',
        ],
        code: `sound("bd*2 [~ bd] sd ~, hh*8")
  .sometimes(x => x.speed(2))`,
        try: 'Cambia speed(2) con ply(2): ogni tanto un colpo raddoppia.',
      },
      {
        title: 'Tante funzioni in fila',
        text: [
          'Le funzioni si possono mettere **una dopo l\'altra**: ognuna lavora sul risultato di quella sopra. Leggi la catena dall\'alto in basso.',
          '`.gain()` regola il volume: così il ritmo non è troppo forte.',
        ],
        code: `sound("bd [~ bd] <sd cp> ~, hh*8")
  .ply("<1 1 1 2>")
  .sometimes(x => x.speed(1.5))
  .gain(0.9)`,
        try: 'Metti // davanti a una riga per "spegnerla" senza cancellarla, poi riesegui.',
      },

      /* ── 4 · il basso e più pattern insieme ──────────────────────── */
      {
        title: 'Una linea di basso',
        text: [
          'Ora un po\' di musica sotto la batteria: il **basso**. Invece di un campione usiamo `note()`, che suona delle note vere: `c2` è un do grave, `eb2` un mi bemolle, `g1` un sol ancora più grave.',
          '`sawtooth` è un sintetizzatore dal suono ricco, e `.lpf(400)` è un filtro che taglia gli acuti e lo rende morbido e profondo.',
        ],
        code: `note("c2 ~ c2 eb2 ~ c2 g1 ~")
  .sound("sawtooth")
  .lpf(400)`,
      },
      {
        title: 'Attenzione: suona solo l\'ultimo!',
        text: [
          'Proviamo a mettere batteria e basso uno sotto l\'altro. Premi ▶ e ascolta bene…',
          'Senti solo il basso, vero? Quando ci sono più pattern su righe diverse, Strudel **suona soltanto l\'ultimo** e ignora gli altri, senza nessun avviso. È l\'errore più comune: non preoccuparti, si risolve subito.',
        ],
        code: `sound("bd [~ bd] sd ~, hh*8")
note("c2 ~ c2 eb2 ~ c2 g1 ~").sound("sawtooth").lpf(400)`,
      },
      {
        title: 'La soluzione: $:',
        text: [
          'Metti `$:` all\'inizio di **ogni** pattern: così suonano tutti insieme, e restano sempre perfettamente a tempo fra loro.',
          'Adesso ogni strumento sta sulla sua riga. Ed ecco il vantaggio: le funzioni valgono solo per la riga su cui stanno. Il `.degradeBy()` agisce sull\'hi-hat, mentre cassa e rullante restano precisi!',
        ],
        code: `setcpm(110/4)
$: sound("bd [~ bd] sd ~")
$: sound("hh*16").degradeBy(0.3).gain(0.6)
$: note("c2 ~ c2 eb2 ~ c2 g1 ~").sound("sawtooth").lpf(400)`,
      },
      {
        title: 'Spegnere e riaccendere',
        text: [
          'Aggiungendo un trattino basso, `_$:`, una riga va **in muto** senza doverla cancellare.',
          'È il gesto tipico del live coding: togli la batteria, lasci il basso da solo, poi la fai rientrare. Ogni volta riesegui con Cmd+Invio.',
        ],
        code: `setcpm(110/4)
$: sound("bd [~ bd] sd ~")
_$: sound("hh*16").degradeBy(0.3).gain(0.6)
$: note("c2 ~ c2 eb2 ~ c2 g1 ~").sound("sawtooth").lpf(400)`,
        try: 'Sposta il _ da una riga all\'altra, e prova a costruire un piccolo "arrangiamento": prima il basso, poi la cassa, poi i piattini.',
      },

      /* ── 5 · stack ───────────────────────────────────────────────── */
      {
        title: 'stack: tanti pattern in uno',
        text: [
          'C\'è un altro modo di far suonare più pattern insieme: `stack()`. Dentro le parentesi metti i pattern, separati da **virgole**, e lui li **impila** in un pattern solo.',
          'Ognuno può avere le sue funzioni, proprio come con `$:`.',
        ],
        code: `setcpm(110/4)
stack(
  sound("bd [~ bd] sd ~"),
  sound("hh*16").degradeBy(0.3).gain(0.6),
  note("c2 ~ c2 eb2 ~ c2 g1 ~").sound("sawtooth").lpf(400)
)`,
        try: 'Attento alle virgole alla fine di ogni riga (tranne l\'ultima): sono loro che separano i pattern.',
      },
      {
        title: 'Una funzione per tutto lo stack',
        text: [
          'Ecco la magia di `stack`: essendo **un pattern solo**, puoi agganciare una funzione dopo la parentesi di chiusura e trasformare **tutto insieme**, batteria e basso.',
          'Qui `.lpf()` con `sine.range(300, 5000).slow(8)` è un filtro che si apre e si chiude lentamente su tutto il brano, come fanno i DJ.',
        ],
        code: `setcpm(110/4)
stack(
  sound("bd [~ bd] sd ~"),
  sound("hh*16").degradeBy(0.3).gain(0.6),
  note("c2 ~ c2 eb2 ~ c2 g1 ~").sound("sawtooth").lpf(400)
).lpf(sine.range(300, 5000).slow(8))`,
      },
      {
        title: 'Trasformare tutto il groove',
        text: [
          'Tutte le funzioni che hai imparato valgono anche per lo stack intero. Qui ogni quattro cicli il groove raddoppia la velocità, a volte si rovescia, e un po\' di riverbero (`.room()`) mette tutto nella stessa stanza.',
          'Complimenti: hai costruito un groove completo! Premi **→ EDITOR** per portarlo nel LAB e continuare a modificarlo, oppure **+ TIMELINE** per usarlo nella tua performance.',
        ],
        code: `setcpm(110/4)
stack(
  sound("bd [~ bd] <sd cp> ~"),
  sound("hh*16").degradeBy(0.3).gain(0.6),
  note("c2 ~ c2 eb2 ~ c2 g1 ~").sound("sawtooth").lpf(400)
)
  .fast("<1 1 1 2>")
  .sometimesBy(0.25, x => x.rev())
  .room(0.3)`,
        try: 'Togli una delle funzioni finali alla volta e ascolta cosa cambia. Poi inventane una combinazione tua.',
      },
    ],
  },

  /* ╔══ SUONO · Melodia ════════════════════════════════════════════════ */
  {
    id: 'melodia', engine: 'strudel',
    title: 'Melodia',
    desc: 'Una melodia con un synth a dente di sega, il suo inviluppo e il filtro, poi accordi arpeggiati, scale, note a caso e una progressione di accordi che fa evolvere l\'arpeggio.',
    steps: [

      /* ── 1 · la prima melodia ────────────────────────────────────── */
      {
        title: 'Una melodia semplice',
        text: [
          'Ciao di nuovo! Stavolta suoniamo delle **note**. Al posto di `sound("bd")` usiamo `note()`, e dentro le virgolette scriviamo i nomi delle note.',
          'I nomi sono quelli inglesi: **c d e f g a b** = do re mi fa sol la si. Il numero dopo la lettera è l\'**ottava**: `c4` è il do al centro del pianoforte, `c5` lo stesso do più acuto.',
          '`.sound("sawtooth")` sceglie il timbro: la **dente di sega**, un\'onda brillante e ricca, la più usata nei synth. La mini-notazione è la stessa del ritmo: `~` è una pausa.',
        ],
        code: `note("c4 d4 e4 g4 e4 d4 c4 ~")
  .sound("sawtooth")`,
        try: 'Cambia qualche nota. Puoi anche provare gli altri timbri: sine, triangle, square.',
      },

      /* ── 2 · dare vita al suono ──────────────────────────────────── */
      {
        title: 'Attacco e rilascio',
        text: [
          'Così il suono è un po\' rigido: parte e si ferma di colpo. Ogni nota però ha una forma nel tempo, l\'**inviluppo**.',
          '`.attack()` è quanto tempo la nota impiega ad arrivare al volume pieno. `.release()` è quanto ci mette a spegnersi dopo la fine. Entrambi si misurano in **secondi**.',
          'Un piccolo attacco toglie lo scatto iniziale, un rilascio più lungo lascia una coda che lega una nota alla successiva. Il suono diventa più vivo, più simile a uno strumento vero.',
        ],
        code: `note("c4 d4 e4 g4 e4 d4 c4 ~")
  .sound("sawtooth")
  .attack(0.05)
  .release(0.4)`,
        try: 'Prova attack(0.3): il suono "gonfia" come un archetto. Poi attack(0) e release(0.05): diventa secco come un pizzico.',
      },
      {
        title: 'Il filtro passa-basso',
        text: [
          'La dente di sega è piena di **armonici acuti**, per questo suona un po\' aspra. Un filtro **passa-basso** (low pass) li taglia: lascia passare le frequenze sotto un certo valore e attenua quelle sopra.',
          '`.lpf(800)` taglia sopra gli 800 Hertz. Numeri bassi rendono il suono scuro e morbido, numeri alti lo lasciano brillante.',
          '`.lpq()` è la **risonanza**: rinforza le frequenze proprio sul punto di taglio e dà quel suono "acido" tipico dei synth.',
        ],
        code: `note("c4 d4 e4 g4 e4 d4 c4 ~")
  .sound("sawtooth")
  .attack(0.05)
  .release(0.4)
  .lpf(800)
  .lpq(5)`,
        try: 'Prova lpf(300) e lpf(3000). Poi alza lpq a 15.',
      },
      {
        title: 'Un filtro che si muove',
        text: [
          'Il filtro diventa ancora più interessante se **si muove**. Al posto di un numero fisso usiamo `sine`, un\'onda che sale e scende lentamente.',
          '`sine.range(300, 3000)` la fa oscillare tra 300 e 3000 Hz, e `.slow(4)` le fa compiere un giro ogni quattro cicli. Ascolta come la melodia si apre e si chiude.',
        ],
        code: `note("c4 d4 e4 g4 e4 d4 c4 ~")
  .sound("sawtooth")
  .attack(0.05)
  .release(0.4)
  .lpf(sine.range(300, 3000).slow(4))
  .lpq(5)`,
      },

      /* ── 3 · arpeggiare un accordo ───────────────────────────────── */
      {
        title: 'Un accordo',
        text: [
          'Un **accordo** è fatto di più note suonate insieme. Nella mini-notazione si scrivono dentro `[ ]` separate da **virgole**.',
          '`[c3,e3,g3,c4]` è un do maggiore: do, mi, sol e il do dell\'ottava sopra.',
        ],
        code: `note("[c3,e3,g3,c4]")
  .sound("sawtooth")
  .attack(0.05)
  .release(0.4)
  .lpf(1200)`,
      },
      {
        title: 'Arpeggiare',
        text: [
          '**Arpeggiare** vuol dire suonare le note di un accordo una alla volta invece che tutte insieme, come fa un chitarrista quando pizzica le corde.',
          '`.arp()` sceglie le note dell\'accordo in base alla loro **posizione**: 0 è la più grave, 1 la seconda, e così via. `"0 1 2 3"` sale, `"3 2 1 0"` scende.',
        ],
        code: `note("[c3,e3,g3,c4]")
  .arp("0 1 2 3 2 1 0 1")
  .sound("sawtooth")
  .attack(0.05)
  .release(0.4)
  .lpf(1200)`,
        try: 'Inventa un tuo disegno: "0 2 1 3", oppure "0 [1 2] 3 ~".',
      },

      /* ── 4 · prendere note da una scala ──────────────────────────── */
      {
        title: 'Note da una scala',
        text: [
          'Scrivere i nomi delle note va bene, ma c\'è un modo più comodo: le **scale**. Una scala è una scelta di note che stanno bene insieme.',
          'Con `n()` scrivi dei **numeri** invece dei nomi, e `.scale("C4:minor")` li trasforma nelle note della scala di do minore: 0 è la prima nota, 1 la seconda, 2 la terza…',
          'Il bello è che dentro una scala **non si stona mai**: qualunque numero scrivi, suona giusto.',
        ],
        code: `n("0 1 2 3 4 5 6 7")
  .scale("C4:minor")
  .sound("sawtooth")
  .attack(0.05)
  .release(0.4)
  .lpf(1200)`,
        try: 'Cambia minor con major, poi con pentatonic o dorian. Stessi numeri, colori diversi.',
      },
      {
        title: 'Una melodia con i numeri',
        text: [
          'Ora usiamo i numeri per scrivere una melodia vera. Si possono usare anche numeri **negativi** (note sotto la prima) e più grandi di 7 (l\'ottava sopra).',
        ],
        code: `n("0 2 4 2 3 1 -1 ~")
  .scale("C4:minor")
  .sound("sawtooth")
  .attack(0.05)
  .release(0.4)
  .lpf(1200)`,
      },

      /* ── 5 · note a caso ─────────────────────────────────────────── */
      {
        title: 'Note a caso da un accordo: scramble',
        text: [
          '`.scramble(8)` divide il ciclo in 8 parti e per ognuna **pesca a caso** una nota dal pattern. Le note possono ripetersi, e ogni giro è diverso.',
          'Se il pattern è un accordo arpeggiato, ottieni una melodia a caso fatta solo con le note dell\'accordo.',
        ],
        code: `note("c4 e4 g4 c5")
  .scramble(8)
  .sound("sawtooth")
  .attack(0.05)
  .release(0.4)
  .lpf(1200)`,
      },
      {
        title: 'Note a caso da una scala',
        text: [
          'Lo stesso trucco con una scala: `scramble` pesca tra i gradi, e la scala garantisce che ogni nota sia giusta.',
          'C\'è anche `.shuffle(8)`: rimescola le note come un mazzo di carte, quindi in ogni giro ognuna compare **una volta sola**.',
        ],
        code: `n("0 1 2 3 4 5 6 7")
  .scramble(8)
  .scale("C4:minor pentatonic")
  .sound("sawtooth")
  .attack(0.05)
  .release(0.4)
  .lpf(1200)
  .room(0.3)`,
        try: 'Metti shuffle al posto di scramble e ascolta la differenza.',
      },

      /* ── 6 · progressione e arpeggio che evolve ─────────────────── */
      {
        title: 'Una progressione di accordi',
        text: [
          'Una **progressione** è una sequenza di accordi. Con `< >` ne suoniamo uno per ciclo.',
          '`chord()` legge le sigle come su un canzoniere: **C Am F G** sono do maggiore, la minore, fa maggiore e sol maggiore. `.voicing()` sceglie le note di ogni accordo e le dispone bene.',
        ],
        code: `chord("<C Am F G>")
  .voicing()
  .sound("sawtooth")
  .attack(0.05)
  .release(0.4)
  .lpf(1200)`,
      },
      {
        title: 'L\'arpeggio segue gli accordi',
        text: [
          'Ora aggiungiamo `.arp()`. Il **disegno** dell\'arpeggio resta sempre lo stesso, ma a ogni ciclo lo applica a un accordo diverso: le note cambiano da sole.',
          'È così che funzionano molte canzoni: la mano destra ripete la stessa figura, e l\'armonia sotto la fa evolvere.',
        ],
        code: `chord("<C Am F G>")
  .voicing()
  .arp("0 1 2 3 2 1 0 1")
  .sound("sawtooth")
  .attack(0.05)
  .release(0.4)
  .lpf(1200)`,
      },
      {
        title: 'Anche il disegno può cambiare',
        text: [
          'Il disegno dell\'arpeggio accetta la mini-notazione, quindi anche lui può alternarsi con `< >`: un ciclo sale, un ciclo scende, e così via.',
          'Accordi e disegno girano ognuno per conto suo: 4 accordi e 2 disegni si ricombinano in modi sempre nuovi.',
        ],
        code: `chord("<C Am F G>")
  .voicing()
  .arp("<[0 1 2 3 2 1 0 1] [3 2 1 0 1 2 3 2]>")
  .sound("sawtooth")
  .attack(0.05)
  .release(0.4)
  .lpf(1200)`,
      },
      {
        title: 'Arpeggio e funzioni',
        text: [
          'Adesso aggiungiamo le funzioni che già conosci. `.off(0.125, x => x.add(note(12)))` aggiunge una **copia** dell\'arpeggio, spostata di un ottavo e un\'ottava sopra (12 semitoni): sembra un\'eco luccicante.',
          '`.sometimes(x => x.ply(2))` ogni tanto raddoppia le note, e il filtro che si muove e il riverbero (`.room()`) fanno il resto.',
        ],
        code: `chord("<C Am F G>")
  .voicing()
  .arp("<[0 1 2 3 2 1 0 1] [3 2 1 0 1 2 3 2]>")
  .off(0.125, x => x.add(note(12)))
  .sometimes(x => x.ply(2))
  .sound("sawtooth")
  .attack(0.02)
  .release(0.3)
  .lpf(sine.range(500, 3000).slow(8))
  .room(0.4)`,
        try: 'Aggiungi .scramble(8) subito dopo .arp(...): l\'arpeggio diventa imprevedibile ma resta sempre dentro l\'accordo.',
      },
      {
        title: 'Con il basso sotto',
        text: [
          'Per finire, mettiamo sotto l\'arpeggio il **basso**. `.rootNotes(2)` prende da ogni accordo la sua nota principale, nell\'ottava 2, quella dei bassi. I due pattern suonano insieme grazie a `$:`, come nel tutorial sul ritmo.',
          'Premi **→ EDITOR** per portarlo nel LAB, oppure **+ TIMELINE** per usarlo nella tua performance.',
        ],
        code: `$: chord("<C Am F G>")
  .voicing()
  .arp("<[0 1 2 3 2 1 0 1] [3 2 1 0 1 2 3 2]>")
  .off(0.125, x => x.add(note(12)))
  .sound("sawtooth")
  .attack(0.02)
  .release(0.3)
  .lpf(sine.range(500, 3000).slow(8))
  .room(0.4)
$: chord("<C Am F G>")
  .rootNotes(2)
  .sound("sawtooth")
  .lpf(400)`,
      },
    ],
  },

  /* ╔══ SUONO · Contrappunto ═══════════════════════════════════════════ */
  {
    id: 'contrappunto', engine: 'strudel',
    title: 'Contrappunto',
    desc: 'Più melodie indipendenti che suonano insieme: registri diversi, ritmi diversi, moto contrario, fino a tre voci e al canone.',
    steps: [
      {
        title: 'Che cos\'è il contrappunto',
        text: [
          'Il **contrappunto** è l\'arte di far suonare insieme più melodie **indipendenti**, ognuna con una sua vita, che però stanno bene insieme. Bach ne era il maestro.',
          'Partiamo dalla melodia del tutorial **Melodia**: numeri della scala di do minore, dente di sega, inviluppo e filtro. Questa sarà la nostra prima voce.',
        ],
        code: `n("0 2 4 2 3 1 -1 ~")
  .scale("C4:minor")
  .sound("sawtooth")
  .attack(0.05)
  .release(0.4)
  .lpf(1500)`,
      },
      {
        title: 'I registri',
        text: [
          'Il **registro** (o range) è la zona di altezze in cui si muove una voce: grave, media o acuta. Nel coro sono i bassi, i tenori, i contralti e i soprani.',
          'Per spostare una melodia di registro basta cambiare il numero dell\'ottava nella scala: `C4:minor` è la zona centrale, `C3:minor` un\'ottava sotto, `C5:minor` un\'ottava sopra.',
          'Qui la stessa melodia gira su tre registri, uno per ciclo. Ascolta come cambia carattere.',
        ],
        code: `n("0 2 4 2 3 1 -1 ~")
  .scale("<C3:minor C4:minor C5:minor>")
  .sound("sawtooth")
  .attack(0.05)
  .release(0.4)
  .lpf(1500)`,
      },
      {
        title: 'Due voci: acuta e grave',
        text: [
          'Ora la prima voce nel registro **acuto** e una seconda nel registro **grave**, con `$:` davanti a ciascuna per farle suonare insieme.',
          'Le due voci hanno anche un **ritmo diverso**: quella acuta si muove veloce (8 note per ciclo), quella grave lenta (4 note). Così l\'orecchio le distingue bene: è la prima regola del contrappunto.',
          'Il filtro della voce grave è più chiuso (`lpf(700)`), così non copre quella acuta.',
        ],
        code: `$: n("0 2 4 2 3 1 -1 ~")
  .scale("C5:minor")
  .sound("sawtooth").attack(0.05).release(0.4).lpf(1500)
  .gain(0.7)
$: n("0 -2 -3 -4")
  .scale("C3:minor")
  .sound("sawtooth").attack(0.1).release(0.6).lpf(700)`,
        try: 'Metti _ davanti a una delle due righe $: per ascoltare le voci separate, poi toglilo e riascoltale insieme.',
      },
      {
        title: 'Moto contrario',
        text: [
          'Un altro segreto: quando una voce **sale**, l\'altra **scende**. Si chiama **moto contrario**, e rende le voci ancora più indipendenti.',
          'Qui la voce acuta sale lungo la scala, quella grave fa lo stesso percorso al contrario. Ti ricordi `.rev()` del tutorial sul ritmo? È proprio quello che ci serve.',
        ],
        code: `$: n("0 1 2 3 4 5 6 7")
  .scale("C5:minor")
  .sound("sawtooth").attack(0.05).release(0.4).lpf(1500)
  .gain(0.7)
$: n("0 1 2 3 4 5 6 7").rev()
  .scale("C3:minor")
  .sound("sawtooth").attack(0.05).release(0.4).lpf(700)`,
      },
      {
        title: 'Due voci che si rispondono',
        text: [
          'Mettiamo insieme le tre idee: registri diversi, ritmi diversi e un po\' di moto contrario. Con `< >` le frasi cambiano a ogni ciclo, così il dialogo tra le voci dura più a lungo.',
          'Nota come la voce grave si muove soprattutto quando quella acuta si ferma (sulla pausa `~`): le voci si **rispondono**, come in una conversazione.',
        ],
        code: `$: n("<[0 2 4 2 3 1 -1 ~] [4 5 7 5 4 2 0 ~]>")
  .scale("C5:minor")
  .sound("sawtooth").attack(0.05).release(0.4).lpf(1500)
  .gain(0.7)
$: n("<[0 ~ -2 [-3 -4]] [2 ~ 0 [-1 -3]]>")
  .scale("C3:minor")
  .sound("sawtooth").attack(0.1).release(0.6).lpf(700)`,
      },
      {
        title: 'Tre voci',
        text: [
          'Aggiungiamo una terza voce **in mezzo**, nel registro centrale (`C4:minor`). Per non creare confusione le diamo un ritmo ancora diverso: note lunghe, due per ciclo, che tengono insieme le altre due.',
          'Ora ogni voce ha il suo registro (acuto, medio, grave) e il suo passo (veloce, lento, medio). Prova a seguirne una alla volta con l\'orecchio.',
        ],
        code: `$: n("<[0 2 4 2 3 1 -1 ~] [4 5 7 5 4 2 0 ~]>")
  .scale("C5:minor")
  .sound("sawtooth").attack(0.05).release(0.4).lpf(1500)
  .gain(0.6)
$: n("<[2 1] [4 2]>")
  .scale("C4:minor")
  .sound("sawtooth").attack(0.2).release(0.8).lpf(1000)
  .gain(0.5)
$: n("<[0 ~ -2 [-3 -4]] [2 ~ 0 [-1 -3]]>")
  .scale("C3:minor")
  .sound("sawtooth").attack(0.1).release(0.6).lpf(700)`,
        try: 'Metti in muto una voce alla volta con _$: e ascolta come cambia l\'insieme.',
      },
      {
        title: 'Il canone',
        text: [
          'Il **canone** è il contrappunto più famoso: una sola melodia che **insegue sé stessa**, come in «Fra Martino». Le voci cantano la stessa cosa, ma entrano in momenti diversi.',
          '`.off(0.5, x => x.add(n(-7)))` crea una copia della melodia che parte mezzo ciclo dopo e 7 gradi più in basso: un\'ottava sotto, perché la scala ha 7 note. Un secondo `.off` aggiunge la terza voce.',
          'Complimenti: hai scritto un canone a tre voci! Portalo nel LAB con **→ EDITOR** e prova a cambiare la melodia: le altre voci la seguiranno.',
        ],
        code: `n("<[0 2 4 2] [3 1 -1 ~] [4 5 7 5] [4 2 0 ~]>")
  .off(0.5, x => x.add(n(-7)))
  .off(1, x => x.add(n(-14)))
  .scale("C5:minor")
  .sound("sawtooth")
  .attack(0.05)
  .release(0.4)
  .lpf(1200)
  .gain(0.6)
  .room(0.3)`,
      },
    ],
  },

  /* ╔══ SUONO · Ambient soundscape ═════════════════════════════════════ */
  {
    id: 'ambient', engine: 'strudel',
    title: 'Ambient soundscape',
    desc: 'Un paesaggio sonoro da un solo campione: rallentato, intonato a caso e immerso in un riverbero lunghissimo.',
    steps: [
      {
        title: 'Un campione lungo',
        text: [
          'Nella musica ambient i suoni non corrono: si allargano, si sovrappongono, riempiono lo spazio. Partiamo da un **campione** abbastanza lungo.',
          '`tabla` è una cartella di suoni di tabla, un tamburo indiano. I due punti scelgono **quale** campione della cartella: si conta da 0, quindi `tabla:2` è il terzo. È uno dei più lunghi della nostra libreria, circa 3 secondi, un colpo grave che vibra a lungo.',
          '`s()` è una scorciatoia di `sound()`: fanno esattamente la stessa cosa.',
        ],
        code: `s("tabla:2")`,
        try: 'Ascolta anche tabla:0 e tabla:1, gli altri due campioni della cartella.',
      },
      {
        title: 'Dargli spazio',
        text: [
          'Un ciclo dura circa 2 secondi, ma il nostro campione ne dura 3: le ripetizioni si accavallano e diventa un ritmo.',
          'Con `.slow(2)` il campione suona **una volta ogni due cicli**. Ogni colpo ha il tempo di spegnersi prima del successivo, e intorno c\'è silenzio: nell\'ambient anche il vuoto fa parte della musica.',
        ],
        code: `s("tabla:2")
  .slow(2)`,
      },
      {
        title: 'Un pitch a caso',
        text: [
          'Ora cambiamo l\'**altezza** (il pitch) del campione. `.speed()` decide a che velocità viene letto: a 1 suona normale, a 0.5 va a metà velocità, un\'ottava più grave e lungo il doppio.',
          '`rand` è un numero **a caso** tra 0 e 1, diverso per ogni colpo. `rand.range(-0.5, 0.5)` lo porta tra -0.5 e 0.5. Così ogni colpo ha un\'altezza diversa, sempre molto più grave dell\'originale.',
          'E i numeri negativi? Una velocità negativa legge il campione **al contrario**, dalla fine all\'inizio: il colpo diventa un suono che cresce invece di spegnersi. Più il numero è vicino a 0, più il suono è lento, grave e lungo, fino quasi a sparire.',
        ],
        code: `s("tabla:2")
  .slow(2)
  .speed(rand.range(-0.5, 0.5))`,
        try: 'Ascolta per qualche ciclo: non ci sono due colpi uguali. Poi prova rand.range(0.2, 0.5) per sentire solo quelli "dritti".',
      },
      {
        title: 'Un riverbero enorme',
        text: [
          'Adesso il tocco magico: il **riverbero**, il suono che rimbalza sulle pareti di una stanza e continua dopo che la fonte si è fermata.',
          '`.room(0.9)` è **quanto** riverbero aggiungere, da 0 (niente) a 1 (quasi solo riverbero). `.roomsize(10)` è la **grandezza** della stanza, e quindi quanto dura la coda: con 10 siamo in una cattedrale, e ogni colpo si trascina per molti secondi.',
          'Le code dei colpi si sovrappongono e si fondono in un tappeto continuo. `.gain(0.8)` abbassa un po\' il volume, perché tutto quel riverbero si somma.',
        ],
        code: `s("tabla:2")
  .slow(2)
  .speed(rand.range(-0.5, 0.5))
  .room(0.9)
  .roomsize(10)
  .gain(0.8)`,
        try: 'Confronta roomsize(1) e roomsize(10): stessa quantità di riverbero, stanze diversissime.',
      },
      {
        title: 'Un secondo strato',
        text: [
          'Un paesaggio sonoro è fatto di **strati**. Aggiungiamo `hh:1`, il piatto crash della cartella degli hi-hat, con lo stesso trattamento: rallentato, pitch a caso, tanto riverbero.',
          'Il piatto usa `.slow(3)`, la tabla `.slow(2)`: i due strati si incontrano in punti sempre diversi e il paesaggio non si ripete mai uguale. Il filtro `.lpf(2000)` toglie gli acuti più taglienti del piatto.',
        ],
        code: `$: s("tabla:2")
  .slow(2)
  .speed(rand.range(-0.5, 0.5))
  .room(0.9)
  .roomsize(10)
  .gain(0.8)
$: s("hh:1")
  .slow(3)
  .speed(rand.range(-0.5, 0.5))
  .lpf(2000)
  .room(0.9)
  .roomsize(10)
  .gain(0.5)`,
        try: 'Aggiungi un terzo strato con un altro campione, per esempio east:2 o crow. Lasciati guidare dall\'orecchio.',
      },
    ],
  },

  /* Beat IDM sta in js/tutorials/idm.js: si aggiunge da sé a questo elenco. */
];
