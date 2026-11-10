/* ════════════════════════════════════════════════════════════════════════
   FUNCDOCS — glossario delle funzioni Hydra e Strudel per la modalità aiuto
   In modalità aiuto, selezionando una parola nel codice compare la voce
   corrispondente. Formato:  nome: ['firma', 'spiegazione in italiano'].
   ════════════════════════════════════════════════════════════════════════ */

const FuncDocs = (() => {

  /* ── HYDRA · visuale ──────────────────────────────────────────────── */
  const hydra = {
    /* sorgenti: generano un'immagine di partenza */
    osc:      ['osc(frequenza, velocità, colore)', 'Genera onde luminose che scorrono sullo schermo. Il primo numero dice quante onde vedi, il secondo quanto veloci si muovono, il terzo quanto sono colorate.'],
    noise:    ['noise(scala, velocità)', 'Genera "nuvole" casuali in movimento, come un temporale di luce. Numeri più alti = dettagli più piccoli e movimento più veloce.'],
    voronoi:  ['voronoi(scala, velocità, sfumatura)', 'Genera celle irregolari, come una pelle di giraffa o bolle di sapone che si muovono.'],
    shape:    ['shape(lati, dimensione, sfumatura)', 'Disegna una forma geometrica: 3 = triangolo, 4 = quadrato, 100 = quasi un cerchio. La sfumatura ammorbidisce il bordo.'],
    gradient: ['gradient(velocità)', 'Genera una sfumatura di colori che cambia nel tempo.'],
    solid:    ['solid(rosso, verde, blu)', 'Riempie lo schermo con un colore fisso. I tre numeri vanno da 0 a 1: solid(1, 0, 0) è rosso pieno.'],
    src:      ['src(uscita)', 'Riprende l\'immagine da un\'uscita (es. src(o0)): serve per il feedback, cioè un\'immagine che si guarda allo specchio.'],

    /* sorgenti esterne: webcam, schermo, microfono */
    initCam:   ['s0.initCam()', 'Accende la webcam e la rende disponibile come sorgente: dopo puoi usarla con src(s0). Il browser ti chiede il permesso. L\'immagine resta su questo computer: non viene registrata né inviata.'],
    initScreen:['s0.initScreen()', 'Cattura una finestra o uno schermo e lo rende una sorgente: poi lo usi con src(s0). Il browser ti chiede quale finestra condividere.'],
    s0:        ['s0', 'Il primo "ingresso esterno" di Hydra: ci si attacca la webcam (s0.initCam()) o lo schermo (s0.initScreen()), poi lo si usa nella catena con src(s0). Ci sono anche s1, s2, s3.'],
    a:         ['a.fft[0]', 'Il microfono, se hai acceso 🎤 MIC nella barra in alto. a.fft[0] sono i bassi, a.fft[3] gli acuti; i valori vanno circa da 0 a 1. Si usa dentro una funzione freccia: .rotate(() => a.fft[0] * 3).'],
    fft:       ['a.fft[0…3]', 'Quanta energia c\'è in una fascia di frequenze del suono captato dal microfono: 0 bassi, 1 medio-bassi, 2 medio-alti, 3 acuti. Serve a far reagire le visuali alla musica.'],

    /* geometria: spostano e deformano l'immagine */
    rotate:   ['.rotate(angolo, velocità)', 'Ruota l\'immagine. Con una funzione freccia si anima: .rotate(() => time * 0.1).'],
    scale:    ['.scale(fattore)', 'Ingrandisce (>1) o rimpicciolisce (<1) l\'immagine.'],
    pixelate: ['.pixelate(x, y)', 'Trasforma l\'immagine in un mosaico di pixel grossi: meno pixel = effetto più "retro".'],
    repeat:   ['.repeat(x, y)', 'Ripete l\'immagine in una griglia: repeat(3, 3) fa nove copie.'],
    repeatX:  ['.repeatX(volte)', 'Ripete l\'immagine solo in orizzontale.'],
    repeatY:  ['.repeatY(volte)', 'Ripete l\'immagine solo in verticale.'],
    kaleid:   ['.kaleid(spicchi)', 'Effetto caleidoscopio: specchia l\'immagine in tanti spicchi quanti ne indichi.'],
    scroll:   ['.scroll(x, y)', 'Fa scorrere l\'immagine in orizzontale e verticale.'],
    scrollX:  ['.scrollX(quantità, velocità)', 'Fa scorrere l\'immagine in orizzontale, all\'infinito se dai una velocità.'],
    scrollY:  ['.scrollY(quantità, velocità)', 'Fa scorrere l\'immagine in verticale, all\'infinito se dai una velocità.'],

    /* colore */
    color:      ['.color(rosso, verde, blu)', 'Moltiplica i colori dell\'immagine canale per canale: color(1, 0, 0) tiene solo il rosso.'],
    brightness: ['.brightness(quantità)', 'Schiarisce (valori positivi) o scurisce (negativi) l\'immagine.'],
    contrast:   ['.contrast(quantità)', 'Aumenta (>1) o riduce (<1) il contrasto tra chiari e scuri.'],
    saturate:   ['.saturate(quantità)', 'Rende i colori più accesi (>1) o più spenti, fino al bianco e nero (0).'],
    hue:        ['.hue(quantità)', 'Sposta tutti i colori lungo l\'arcobaleno: il rosso diventa verde, il verde blu…'],
    invert:     ['.invert(quantità)', 'Inverte i colori, come un negativo fotografico.'],
    luma:       ['.luma(soglia, sfumatura)', 'Rende trasparenti le zone scure: resta visibile solo ciò che è più luminoso della soglia.'],
    thresh:     ['.thresh(soglia, sfumatura)', 'Bianco o nero, senza vie di mezzo: sopra la soglia bianco, sotto nero.'],
    posterize:  ['.posterize(livelli, gamma)', 'Riduce i colori a pochi livelli, come un poster serigrafato.'],
    colorama:   ['.colorama(quantità)', 'Fa ciclare i colori in modo psichedelico. Da usare con moderazione… o no!'],

    /* miscele: combinano due immagini */
    add:    ['.add(sorgente, quantità)', 'Somma un\'altra immagine a questa: le luci si accumulano.'],
    sub:    ['.sub(sorgente, quantità)', 'Sottrae un\'altra immagine da questa.'],
    mult:   ['.mult(sorgente, quantità)', 'Moltiplica le due immagini: restano luminose solo le zone chiare in entrambe.'],
    diff:   ['.diff(sorgente)', 'Mostra la differenza tra le due immagini: dove sono uguali diventa nero.'],
    blend:  ['.blend(sorgente, quantità)', 'Fonde le due immagini, come una dissolvenza tra due proiettori.'],
    layer:  ['.layer(sorgente)', 'Appoggia un\'altra immagine sopra questa, dove non è trasparente.'],
    mask:   ['.mask(sorgente)', 'Usa un\'altra immagine come maschera: questa resta visibile solo dove la maschera è chiara.'],

    /* modulazioni: un'immagine deforma l'altra */
    modulate:         ['.modulate(sorgente, quantità)', 'Usa un\'altra immagine per deformare questa: le zone chiare "spingono" i pixel. È il segreto di tanti effetti liquidi.'],
    modulateRotate:   ['.modulateRotate(sorgente, quantità)', 'Un\'altra immagine controlla la rotazione, punto per punto.'],
    modulateScale:    ['.modulateScale(sorgente, quantità)', 'Un\'altra immagine controlla l\'ingrandimento, punto per punto.'],
    modulatePixelate: ['.modulatePixelate(sorgente, quantità)', 'Un\'altra immagine controlla la grandezza dei pixel, punto per punto.'],
    modulateKaleid:   ['.modulateKaleid(sorgente, spicchi)', 'Caleidoscopio deformato da un\'altra immagine.'],
    modulateScrollX:  ['.modulateScrollX(sorgente, quantità)', 'Un\'altra immagine controlla lo scorrimento orizzontale.'],
    modulateScrollY:  ['.modulateScrollY(sorgente, quantità)', 'Un\'altra immagine controlla lo scorrimento verticale.'],
    modulateHue:      ['.modulateHue(sorgente, quantità)', 'Un\'altra immagine sposta i colori, punto per punto.'],
    modulateRepeat:   ['.modulateRepeat(sorgente, x, y)', 'Un\'altra immagine controlla la ripetizione a griglia.'],

    /* uscite e variabili globali */
    out:    ['.out(uscita)', 'Manda il risultato allo schermo. Senza .out() alla fine della catena non si vede niente!'],
    render: ['render(uscita)', 'Sceglie quale uscita mostrare a schermo: render(o0), oppure render() per vederle tutte e quattro insieme.'],
    o0:     ['o0 … o3', 'Le quattro uscite video di Hydra: quattro "tele" su cui dipingere. Di solito si usa o0; le altre servono per comporre e mescolare.'],
    o1:     ['o0 … o3', 'Le quattro uscite video di Hydra: quattro "tele" su cui dipingere. Di solito si usa o0; le altre servono per comporre e mescolare.'],
    o2:     ['o0 … o3', 'Le quattro uscite video di Hydra: quattro "tele" su cui dipingere. Di solito si usa o0; le altre servono per comporre e mescolare.'],
    o3:     ['o0 … o3', 'Le quattro uscite video di Hydra: quattro "tele" su cui dipingere. Di solito si usa o0; le altre servono per comporre e mescolare.'],
    time:   ['time', 'Il tempo che passa, in secondi. Dentro una funzione freccia anima qualsiasi parametro: .rotate(() => time * 0.2).'],
    mouse:  ['mouse.x · mouse.y', 'La posizione del mouse sullo schermo: usala per controllare i parametri con la mano.'],
    speed:  ['speed = numero', 'La velocità globale di tutte le animazioni Hydra: 2 = doppia velocità, 0.5 = metà.'],
    hush:   ['hush()', 'Ferma tutto e riporta lo schermo al nero. È quello che fa il bottone STOP.'],

    /* il tempo al fotogramma e gli eventi (tutorial Il tempo preciso, Clic e tastiera) */
    update: ['update = () => { … }', 'Una funzione che Hydra esegue prima di ogni fotogramma, circa 60 volte al secondo: dentro cambi le tue variabili (contatori, posizioni, passi a caso). ■ STOP la spegne.'],
    bpm:    ['bpm = numero', 'I battiti al minuto di Hydra (di solito 30): decidono quanto in fretta le liste, come [3, 4, 6], passano da un valore al successivo. STOP lo rimette a 30.'],
    onpointerup:   ['onpointerup = () => { … }', 'Ascoltatore: il browser esegue la funzione quando rilasci il pulsante del mouse (o il dito). Conta anche un clic sul testo: clicca sulla visuale. ■ STOP lo spegne.'],
    onpointerdown: ['onpointerdown = () => { … }', 'Ascoltatore: il browser esegue la funzione quando premi il pulsante del mouse (o il dito). Con onpointerup sai se è tenuto premuto. ■ STOP lo spegne.'],
    onkeydown:     ['onkeydown = (evento) => { … }', 'Ascoltatore: il browser esegue la funzione quando premi un tasto; evento.key dice quale (\'a\', \'ArrowLeft\'…). Prima clicca sulla visuale, o i tasti finiscono anche nel codice. ■ STOP lo spegne.'],
    innerWidth:    ['innerWidth · innerHeight', 'Larghezza e altezza della finestra, in pixel (sono window.innerWidth e window.innerHeight). innerHeight / innerWidth è la proporzione dello schermo: con .scale(1, …) fa tornare rotondi i cerchi.'],

    /* regolazioni del microfono (tutorial Il suono sotto la lente) */
    show:      ['a.show() · a.hide()', 'Mostra (o nasconde) in basso a destra le barre del microfono: una per banda, dai bassi agli acuti.'],
    setBins:   ['a.setBins(bande)', 'In quante bande dividere il suono (di solito 4): con a.setBins(8), a.fft va da a.fft[0] a a.fft[7].'],
    setSmooth: ['a.setSmooth(calma)', 'Quanto ammorbidire i numeri del microfono, da 0 (ogni fotogramma per conto suo, la visuale trema) a quasi 1 (lentissimo).'],
    setCutoff: ['a.setCutoff(livello)', 'Il pavimento: il suono sotto questo livello conta come zero. Alzalo se la visuale si muove anche nel silenzio.'],
    setScale:  ['a.setScale(livello)', 'Il soffitto: quanto suono serve, sopra il pavimento di setCutoff, per arrivare a 1. Abbassalo se la musica è piano e la visuale si muove poco. In a.show() è la riga sottile più in alto.'],
  };

  /* ── STRUDEL · suono ──────────────────────────────────────────────── */
  const strudel = {
    sound:  ['sound("pattern")', 'Sceglie i suoni da usare e la loro sequenza: sound("bd hh sd hh") suona quattro colpi per ciclo. È la funzione di partenza di quasi tutto.'],
    s:      ['s("pattern")', 'Abbreviazione di sound(): sceglie i suoni da suonare.'],
    note:   ['note("pattern")', 'Suona note musicali: nomi come "c3 e3 g3" o numeri. Da abbinare a .sound() per scegliere il timbro.'],
    n:      ['n("pattern")', 'Un numero che sceglie: quale variante di un campione (con .sound) o quale grado della scala (con .scale).'],
    stack:  ['stack(pattern1, pattern2, …)', 'Suona più pattern contemporaneamente, sovrapposti: è così che si costruisce un brano a più strumenti.'],
    seq:    ['seq(a, b, …)', 'Mette gli elementi in sequenza dentro un ciclo, dividendo il tempo in parti uguali.'],
    cat:    ['cat(a, b, …)', 'Alterna gli elementi: uno per ogni ciclo, a turno.'],
    setcpm: ['setcpm(cicli al minuto)', 'La velocità globale: quanti cicli al minuto. setcpm(30) = un ciclo ogni 2 secondi.'],

    /* trasformazioni del tempo */
    fast:  ['.fast(volte)', 'Accelera il pattern: .fast(2) lo suona due volte per ciclo.'],
    slow:  ['.slow(volte)', 'Rallenta il pattern: .slow(2) lo spalma su due cicli.'],
    rev:   ['.rev()', 'Suona il pattern al contrario, dall\'ultimo evento al primo.'],
    ply:   ['.ply(volte)', 'Ripete ogni evento N volte di fila: da "bd sd" a "bd bd sd sd".'],
    off:   ['.off(ritardo, modifica)', 'Aggiunge una copia del pattern spostata nel tempo e modificata: .off(0.125, x => x.speed(2)) crea un\'eco più acuta.'],
    every: ['.every(N, modifica)', 'Ogni N cicli applica una modifica: .every(4, rev) inverte il pattern un ciclo su quattro.'],
    struct:['.struct("x ~ x x")', 'Impone un ritmo al pattern: le "x" suonano, le "~" tacciono.'],
    euclid:['.euclid(colpi, passi)', 'Ritmo euclideo: distribuisce i colpi nel modo più regolare possibile. euclid(3, 8) è un ritmo che sentirai in mezzo mondo.'],

    /* casualità */
    sometimes: ['.sometimes(modifica)', 'Applica la modifica a caso, circa metà delle volte: .sometimes(x => x.speed(2)).'],
    often:     ['.often(modifica)', 'Come sometimes, ma più spesso (circa 3 volte su 4).'],
    rarely:    ['.rarely(modifica)', 'Come sometimes, ma di rado (circa 1 volta su 4).'],
    degrade:   ['.degrade()', 'Toglie eventi a caso, circa la metà: il pattern diventa più "sbucherellato" e vivo.'],
    degradeBy: ['.degradeBy(probabilità)', 'Toglie eventi a caso con la probabilità che scegli tu: 0.2 ne toglie uno su cinque.'],
    choose:    ['choose(a, b, …)', 'Sceglie a caso uno dei valori, ogni volta.'],

    /* suono e mixaggio */
    gain:  ['.gain(volume)', 'Il volume: 1 è normale, 0.5 è metà, 0 è silenzio.'],
    pan:   ['.pan(posizione)', 'La posizione stereo: 0 = sinistra, 0.5 = centro, 1 = destra. Prova .pan(sine) per farla ondeggiare.'],
    speed: ['.speed(velocità)', 'La velocità del campione: 2 = doppio (più acuto), 0.5 = metà (più grave), -1 = al contrario.'],
    bank:  ['.bank("nome")', 'Sceglie il banco di suoni, cioè quale drum machine usare per bd, sd, hh…'],
    jux:   ['.jux(modifica)', 'Stereo istantaneo: a sinistra il pattern originale, a destra la versione modificata. Classico: .jux(rev).'],

    /* filtri ed effetti */
    lpf:    ['.lpf(frequenza)', 'Filtro passa-basso: taglia gli acuti sopra la frequenza. Valori bassi = suono scuro e ovattato.'],
    cutoff: ['.cutoff(frequenza)', 'Altro nome del filtro passa-basso: taglia gli acuti sopra la frequenza.'],
    hpf:    ['.hpf(frequenza)', 'Filtro passa-alto: taglia i bassi sotto la frequenza. Valori alti = suono sottile.'],
    vowel:  ['.vowel("a e i o u")', 'Filtro a vocali: fa "parlare" il suono come una bocca che cambia forma.'],
    room:   ['.room(quantità)', 'Riverbero: il suono di una stanza. Più alto = stanza più grande.'],
    delay:  ['.delay(quantità)', 'Eco: il suono si ripete attenuandosi.'],
    crush:  ['.crush(bit)', 'Riduce la qualità digitale del suono: 4 suona "rotto" e lo-fi, 16 quasi pulito.'],
    chop:   ['.chop(fette)', 'Taglia il campione in N fette e le suona in sequenza: ottimo per spezzettare suoni lunghi.'],

    /* inviluppo */
    attack:  ['.attack(secondi)', 'Quanto tempo impiega il suono ad arrivare al volume pieno: alto = ingresso morbido.'],
    decay:   ['.decay(secondi)', 'Quanto in fretta il suono scende dal picco al livello di tenuta.'],
    sustain: ['.sustain(livello)', 'Il volume a cui il suono resta finché la nota è tenuta.'],
    release: ['.release(secondi)', 'Quanto tempo impiega il suono a spegnersi quando la nota finisce.'],

    /* altezze e scale */
    scale: ['.scale("nota:modo")', 'Intona i numeri di n() a una scala: con .scale("C:minor"), n("0 2 4") suona Do, Mib, Sol. Impossibile sbagliare nota!'],
    add:   ['.add(quantità)', 'Somma un valore alle note o ai numeri del pattern: .add(12) trasposta di un\'ottava.'],
    sub:   ['.sub(quantità)', 'Sottrae un valore alle note o ai numeri del pattern.'],
    range: ['.range(min, max)', 'Riscala un segnale (come sine) tra due valori: sine.range(200, 2000) per far respirare un filtro.'],

    /* armonia */
    chord:     ['chord("C Am F G")', 'Scrive gli accordi con le sigle del canzoniere: C = Do, Am = La minore, G7 = Sol settima, C^7 = Do settima maggiore. Da solo non suona: va seguito da .voicing() (l\'accordo) o .rootNotes() (il basso).'],
    voicing:   ['.voicing()', 'Trasforma le sigle di chord() in note vere, scegliendo una disposizione che suoni bene e che si muova poco da un accordo all\'altro, come farebbe un pianista.'],
    rootNotes: ['.rootNotes(ottava)', 'Da ogni sigla di chord() prende solo la fondamentale, la nota che dà il nome all\'accordo: è la parte del basso. Il numero è l\'ottava: 2 è grave.'],
    arp:       ['.arp("0 1 2 1")', 'Arpeggio: suona le note di un accordo una alla volta. I numeri sono le posizioni dentro l\'accordo: 0 è la nota più bassa.'],
    transpose: ['.transpose(semitoni)', 'Sposta tutte le note dello stesso numero di semitoni: 12 è un\'ottava sopra, 7 una quinta. La melodia resta la stessa, cambia la tonalità.'],
    layer:     ['.layer(a => …, b => …)', 'Dallo stesso pattern ricava più strati che suonano insieme, ognuno con la sua modifica: per esempio accordi e basso a partire dalla stessa riga di sigle.'],
    segment:   ['.segment(volte)', 'Campiona un segnale continuo (come irand o sine) N volte per ciclo, trasformandolo in eventi distinti.'],
    clip:      ['.clip(frazione)', 'Accorcia ogni nota: .clip(0.5) la fa durare metà del suo spazio, come uno staccato o un pizzicato.'],

    /* segnali di controllo */
    sine:   ['sine', 'Un\'onda lenta che sale e scende dolcemente tra 0 e 1: collegala a un parametro, es. .pan(sine).'],
    saw:    ['saw', 'Un segnale che sale da 0 a 1 e riparte da capo, come una rampa.'],
    square: ['square', 'Un segnale che scatta tra 0 e 1, on/off.'],
    tri:    ['tri', 'Un segnale che sale e scende in linea retta, come un triangolo.'],
    irand:  ['irand(massimo)', 'Un numero intero a caso da 0 al massimo, sempre diverso: n(irand(8)) pesca note a sorpresa.'],

    /* controllo */
    hush:    ['hush()', 'Silenzio: ferma tutta la musica. È quello che fa il bottone STOP.'],
    silence: ['silence', 'Un pattern vuoto: utile per zittire una sola voce dentro uno stack.'],

    /* nomi dei suoni percussivi */
    bd:  ['"bd" · bass drum', 'La cassa: il colpo grave e profondo, il battito del cuore del ritmo.'],
    sd:  ['"sd" · snare drum', 'Il rullante: il colpo secco che di solito risponde alla cassa.'],
    hh:  ['"hh" · hi-hat', 'Il charleston chiuso: il "tic" metallico che tiene il tempo.'],
    oh:  ['"oh" · open hi-hat', 'Il charleston aperto: come hh ma lasciato risuonare, "tssss".'],
    cp:  ['"cp" · clap', 'Il battito di mani.'],
    rim: ['"rim" · rimshot', 'Il colpo sul bordo del rullante: un "toc" di legno.'],
    lt:  ['"lt" · low tom', 'Il tom grave.'],
    mt:  ['"mt" · mid tom', 'Il tom medio.'],
    ht:  ['"ht" · high tom', 'Il tom acuto.'],
  };

  /* In inglese e spagnolo le voci arrivano dal pacchetto della lingua
     (js/lang/<lingua>/funcdocs.js), con gli stessi nomi di qui. */
  const tr = I18N.get('funcdocs') || {};

  /** Cerca una parola nel glossario del motore. → {title, body} oppure null */
  function lookup(engine, word) {
    const dict = engine === 'hydra' ? hydra : engine === 'strudel' ? strudel : null;
    if (!dict || !Object.hasOwn(dict, word)) return null;   // non «toString» & co.
    const hit = (tr[engine] || {})[word] || dict[word];
    return { title: hit[0], body: hit[1] };
  }

  return { lookup, entries: { hydra, strudel } };
})();
