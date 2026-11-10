/* ════════════════════════════════════════════════════════════════════════
   SNIPPETS — libreria di esempi didattici
   Ogni esempio: { id, engine: 'hydra'|'strudel', cat, tags, title, desc, code }
   `desc` è la spiegazione mostrata nel browser esempi e dai tooltip AIUTO.
   `tags` sono le etichette-filtro del browser esempi (vedi SNIPPET_TAGS).
   ════════════════════════════════════════════════════════════════════════ */

const SNIPPETS = [

  /* ── HYDRA · base ──────────────────────────────────────────────────── */
  {
    id: 'h-osc', engine: 'hydra', cat: 'Base',
    tags: ['primi passi', 'onde', 'colore'],
    title: 'Onda colorata',
    desc: 'osc() genera onde che scorrono: frequenza, velocità e quantità di colore.',
    code: `// osc(frequenza, velocità, colore)
osc(10, 0.1, 1.5)
  .out()`,
  },
  {
    id: 'h-shape', engine: 'hydra', cat: 'Base',
    tags: ['primi passi', 'forme'],
    title: 'Forma geometrica',
    desc: 'shape() disegna un poligono: numero di lati, dimensione, sfocatura del bordo.',
    code: `// shape(lati, dimensione, sfocatura)
shape(3, 0.4, 0.01)
  .out()`,
  },
  {
    id: 'h-gradient', engine: 'hydra', cat: 'Base',
    tags: ['primi passi', 'colore', 'movimento'],
    title: 'Gradiente animato',
    desc: 'gradient() crea una sfumatura di colori che cambia nel tempo.',
    code: `// gradient(velocità)
gradient(0.3)
  .out()`,
  },
  {
    id: 'h-noise', engine: 'hydra', cat: 'Base',
    tags: ['primi passi', 'organico', 'movimento'],
    title: 'Rumore organico',
    desc: 'noise() genera macchie in movimento, come nuvole o fumo.',
    code: `// noise(scala, velocità)
noise(4, 0.2)
  .out()`,
  },

  /* ── HYDRA · trasformazioni ────────────────────────────────────────── */
  {
    id: 'h-kaleid', engine: 'hydra', cat: 'Trasformazioni',
    tags: ['onde', 'simmetria'],
    title: 'Caleidoscopio',
    desc: 'kaleid() moltiplica l’immagine a specchio, come un caleidoscopio.',
    code: `osc(8, 0.1, 1)
  .kaleid(6)     // 6 specchi
  .out()`,
  },
  {
    id: 'h-rotate', engine: 'hydra', cat: 'Trasformazioni',
    tags: ['forme', 'movimento'],
    title: 'Rotazione continua',
    desc: 'rotate() fa girare l’immagine; con () => time la rotazione è continua.',
    code: `shape(4, 0.5)
  .rotate(() => time * 0.5)  // gira nel tempo
  .out()`,
  },
  {
    id: 'h-repeat', engine: 'hydra', cat: 'Trasformazioni',
    tags: ['forme', 'simmetria'],
    title: 'Griglia di copie',
    desc: 'repeat() ripete l’immagine in una griglia di righe e colonne.',
    code: `shape(3, 0.3)
  .repeat(4, 3)   // 4 colonne, 3 righe
  .out()`,
  },
  {
    id: 'h-pixel', engine: 'hydra', cat: 'Trasformazioni',
    tags: ['onde', 'deformare'],
    title: 'Pixel giganti',
    desc: 'pixelate() riduce la risoluzione: effetto videogioco anni ’80.',
    code: `osc(10, 0.2, 1.2)
  .pixelate(20, 20)
  .out()`,
  },

  /* ── HYDRA · colore ────────────────────────────────────────────────── */
  {
    id: 'h-color', engine: 'hydra', cat: 'Colore',
    tags: ['onde', 'colore'],
    title: 'Cambiare i colori',
    desc: 'color() moltiplica i canali rosso, verde e blu dell’immagine.',
    code: `osc(10, 0.1)
  .color(1.2, 0.3, 0.8)  // r, g, b
  .out()`,
  },
  {
    id: 'h-invert', engine: 'hydra', cat: 'Colore',
    tags: ['forme', 'colore'],
    title: 'Negativo',
    desc: 'invert() inverte i colori, come il negativo di una foto.',
    code: `shape(5, 0.4, 0.1)
  .invert()
  .out()`,
  },
  {
    id: 'h-hue', engine: 'hydra', cat: 'Colore',
    tags: ['onde', 'colore', 'movimento'],
    title: 'Arcobaleno rotante',
    desc: 'hue() ruota la tinta dei colori; animata con () => time.',
    code: `osc(6, 0.1, 1)
  .hue(() => time * 0.1)
  .out()`,
  },

  /* ── HYDRA · combinazioni ──────────────────────────────────────────── */
  {
    id: 'h-blend', engine: 'hydra', cat: 'Combinazioni',
    tags: ['onde', 'organico', 'mescolare'],
    title: 'Fondere due sorgenti',
    desc: 'blend() mescola due immagini, come una dissolvenza incrociata.',
    code: `osc(10, 0.1, 1)
  .blend( noise(3) )
  .out()`,
  },
  {
    id: 'h-diff', engine: 'hydra', cat: 'Combinazioni',
    tags: ['forme', 'mescolare'],
    title: 'Differenza',
    desc: 'diff() mostra la differenza tra due immagini: bordi e contrasti forti.',
    code: `shape(4, 0.6)
  .diff( shape(4, 0.4) )
  .out()`,
  },
  {
    id: 'h-mask', engine: 'hydra', cat: 'Combinazioni',
    tags: ['onde', 'forme', 'mescolare'],
    title: 'Ritaglio (maschera)',
    desc: 'mask() ritaglia un’immagine usando la forma di un’altra.',
    code: `osc(20, 0.2, 1.5)
  .mask( shape(6, 0.5, 0.01) )
  .out()`,
  },
  {
    id: 'h-modulate', engine: 'hydra', cat: 'Combinazioni',
    tags: ['onde', 'organico', 'deformare', 'mescolare'],
    title: 'Deformare (modulate)',
    desc: 'modulate() usa un’immagine per deformarne un’altra: effetto liquido.',
    code: `osc(10, 0.1, 1)
  .modulate( noise(3), 0.3 )
  .out()`,
  },

  /* ── HYDRA · feedback ──────────────────────────────────────────────────
     src(o0) dentro una catena che finisce in o0 legge il fotogramma di
     prima. Provati uno per uno in un browser headless; quel che si è
     imparato:
     - niente diff() sull'eco con sorgenti ferme e luminose: il pixel
       alterna acceso/spento a ogni fotogramma e lo schermo lampeggia;
     - una sorgente del tutto ferma porta il feedback a un punto fisso e
       l'immagine si congela: qualcosa deve cambiare nel tempo (time, osc);
     - colorama() sul nero e sul bianco dà granella colorata (lì la tinta
       di un pixel è instabile): con modulateHue lo sfondo deve avere già
       colore, e i pennelli devono essere colorati;
     - mask() rende trasparente quel che taglia: in un blend con l'eco lo
       sfondo diventa trasparente, non nero. Per ritagliare, mult(). */
  {
    id: 'h-feedback', engine: 'hydra', cat: 'Feedback',
    tags: ['onde', 'mescolare', 'eco'],
    title: 'Feedback (eco visiva)',
    desc: 'src(o0) rilegge l’uscita: l’immagine si accumula come un’eco visiva.',
    code: `osc(6, 0.15, 1)
  .blend( src(o0).scale(1.01), 0.7 )
  .out()`,
  },
  {
    id: 'h-fb-comet', engine: 'hydra', cat: 'Feedback',
    tags: ['forme', 'colore', 'movimento', 'eco'],
    title: 'Scia di una cometa',
    desc: 'Il cerchio si muove e l’eco resta indietro. brightness(-0.02) scurisce l’eco a ogni fotogramma: la scia si spegne da sola.',
    code: `shape(40, 0.08, 0.01)
  .color(1, 0.6, 0.2)
  .scrollX(() => Math.sin(time) * 0.3)
  .scrollY(() => Math.sin(time * 1.7) * 0.3)
  // l'eco sbiadisce un po' a ogni fotogramma
  .add( src(o0).brightness(-0.02) )
  .out()`,
  },
  {
    id: 'h-fb-tunnel', engine: 'hydra', cat: 'Feedback',
    tags: ['forme', 'colore', 'movimento', 'eco'],
    title: 'Tunnel arcobaleno',
    desc: 'L’eco si ingrandisce, gira e cambia tinta; layer() ci appoggia sopra il quadrato. Ogni copia esce un po’ più grande e di un altro colore.',
    code: `src(o0)
  .scale(1.03)     // l'eco si ingrandisce...
  .rotate(0.02)    // ...gira...
  .hue(0.01)       // ...e cambia colore
  .layer(
    shape(4, 0.15, 0.01)
      .color(1, 0.3, 0.5)
      .hue(() => time * 0.2)   // senza, dopo pochi secondi il tunnel si ferma
      .luma(0.1)
  )
  .out()`,
  },
  {
    id: 'h-fb-corridor', engine: 'hydra', cat: 'Feedback',
    tags: ['onde', 'forme', 'mescolare', 'eco'],
    title: 'Corridoio infinito',
    desc: 'Una cornice sul bordo dello schermo; l’eco rimpicciolisce (scale sotto 1) e la trascina verso il centro, come due specchi uno di fronte all’altro.',
    code: `src(o0)
  .scale(0.92)      // l'eco rimpicciolisce
  .rotate(0.02)
  .layer(
    osc(10, 0.1, 1.5)
      // una cornice: lo schermo intero meno un rettangolo
      .mask( shape(4, 1, 0.01).diff(shape(4, 0.9, 0.01)) )
  )
  .out()`,
  },
  {
    id: 'h-fb-smoke', engine: 'hydra', cat: 'Feedback',
    tags: ['forme', 'organico', 'deformare', 'eco'],
    title: 'Fumo che sale',
    desc: 'L’eco sale un poco (scrollY) e il rumore la deforma a ogni fotogramma: la macchia in basso diventa fumo.',
    code: `shape(50, 0.15, 0.3)
  .color(0.6, 0.4, 1)
  .scrollY(-0.3)             // la sorgente sta in basso
  .blend(
    src(o0)
      .scrollY(0.008)        // l'eco sale...
      .modulate(noise(3, 0.2), 0.006)   // ...si deforma...
      .brightness(-0.003),   // ...e sbiadisce
    0.97
  )
  .out()`,
  },
  {
    id: 'h-fb-selfmod', engine: 'hydra', cat: 'Feedback',
    tags: ['onde', 'simmetria', 'deformare', 'eco'],
    title: 'L’eco che deforma',
    desc: 'modulate() con o0: sono i colori del fotogramma di prima a spostare i pixel di quello nuovo. Il caleidoscopio si arriccia in una spirale.',
    code: `osc(15, 0.05, 1.2)
  .kaleid(4)
  // l'uscita di prima, un po' girata, deforma quella nuova
  .modulate( src(o0).rotate(0.2), 0.15 )
  .out()`,
  },
  {
    id: 'h-fb-brush', engine: 'hydra', cat: 'Feedback',
    tags: ['forme', 'colore', 'mouse', 'eco'],
    title: 'Pennello col mouse',
    desc: 'Muovi il mouse sullo schermo e disegni. mouse.x e mouse.y dicono dov’è il puntatore; l’eco tiene il disegno e brightness() lo fa sbiadire piano.',
    code: `// muovi il mouse sullo schermo
src(o0)
  .brightness(-0.004)      // il disegno vecchio sbiadisce piano
  .layer(
    shape(30, 0.04, 0.02)
      .color(1, 0.4, 0.7)
      .hue(() => time * 0.1)   // il colore cambia nel tempo
      .scrollX(() => 0.5 - mouse.x / width)
      .scrollY(() => mouse.y / height - 0.5)
      .luma(0.1)
  )
  .out()`,
  },
  {
    id: 'h-fb-zoomwave', engine: 'hydra', cat: 'Feedback',
    tags: ['forme', 'colore', 'deformare', 'eco'],
    title: 'Zoom infinito che ondeggia',
    desc: 'scale(1.02) ingrandisce l’eco a ogni fotogramma: uno zoom che non finisce mai. modulate() con il rumore lo fa ondeggiare, come un tunnel di gomma.',
    code: `src(o0)
  .scale(1.02)                       // zoom infinito
  .modulate( noise(3, 0.1), 0.003 )  // il rumore fa ondeggiare il tunnel
  .hue(0.01)
  .layer(
    shape(4, 0.15, 0.01)
      .color(1, 0.3, 0.5)
      .hue(() => time * 0.2)
      .luma(0.1)
  )
  .out()`,
  },
  {
    id: 'h-fb-galaxy', engine: 'hydra', cat: 'Feedback',
    tags: ['forme', 'colore', 'movimento', 'deformare', 'eco'],
    title: 'Galassia',
    desc: 'Zoom infinito più modulateRotate(): il cerchio sfocato fa girare l’eco più al centro che ai bordi, e le copie escono a spirale come i bracci di una galassia.',
    code: `src(o0)
  .scale(1.02)    // l'eco esce verso i bordi...
  // ...girando più al centro che ai bordi
  .modulateRotate( shape(99, 0.5, 0.8), -0.05 )
  .hue(0.01)
  .layer(
    shape(4, 0.15, 0.01)
      .rotate(() => time * 0.5)
      .color(1, 0.3, 0.5)
      .luma(0.1)
  )
  .out()`,
  },
  {
    id: 'h-fb-vortex', engine: 'hydra', cat: 'Feedback',
    tags: ['onde', 'movimento', 'deformare', 'eco'],
    title: 'Vortice',
    desc: 'Il contrario della galassia: scale sotto 1 risucchia l’eco verso il centro e modulateRotate() la attorciglia. La cornice di onde sul bordo diventa un gorgo.',
    code: `src(o0)
  .scale(0.98)    // l'eco viene risucchiata verso il centro...
  // ...e gira di più al centro che ai bordi
  .modulateRotate( shape(99, 0.5, 0.8), 0.1 )
  .layer(
    osc(10, 0.1, 1.5)
      // una cornice sottile sul bordo dello schermo
      .mask( shape(4, 1, 0.01).diff(shape(4, 0.95, 0.01)) )
  )
  .out()`,
  },
  {
    id: 'h-fb-lava', engine: 'hydra', cat: 'Feedback',
    tags: ['onde', 'organico', 'deformare', 'eco'],
    title: 'Lava che sale',
    desc: 'L’eco sale di pochissimo a ogni fotogramma e il rumore la piega: i colori della cornice colano verso l’alto come lava in una lampada.',
    code: `src(o0)
  .scrollY(0.003)                     // l'eco sale piano...
  .modulate( noise(6, 0.1), 0.003 )   // ...e si piega come un liquido
  .layer(
    osc(20, 0.1, 1.5)
      // una cornice larga, spostata un po' in basso
      .mask( shape(4, 1, 0.01).diff(shape(4, 0.8, 0.01)).scrollY(-0.1) )
  )
  .out()`,
  },
  {
    id: 'h-fb-marble', engine: 'hydra', cat: 'Feedback',
    tags: ['onde', 'simmetria', 'colore', 'organico', 'eco'],
    title: 'Marmo liquido',
    desc: 'colorama() sposta i colori dell’eco di pochissimo a ogni fotogramma; modulateHue(o0, 40) sposta ogni pixel in una direzione che dipende dal suo colore. Ogni tinta scivola per conto suo, come colori sciolti nell’acqua.',
    code: `osc(10, 0.1, 1.5).kaleid(4)
  // l'eco resta al 95% e cambia tinta a ogni fotogramma
  .blend( src(o0).colorama(0.003), 0.95 )
  // ogni pixel scivola in una direzione che dipende dal suo colore
  .modulateHue(o0, 40)
  .out()`,
  },
  {
    id: 'h-fb-liquidpaint', engine: 'hydra', cat: 'Feedback',
    tags: ['colore', 'organico', 'mouse', 'eco'],
    title: 'Pittura liquida',
    desc: 'Un pennello nel liquido: il cerchio segue il mouse e modulateHue(o0, 40) trascina via la traccia, ogni tinta nella sua direzione. Lo sfondo è un gradient(): con modulateHue serve un fondo già colorato.',
    code: `// muovi il mouse sullo schermo
gradient(0.1)
  .blend( src(o0), 0.97 )
  .modulateHue(o0, 40)
  // il pennello: un cerchio che cambia colore e segue il mouse
  .layer(
    shape(30, 0.05, 0.02)
      .color(1, 0.3, 0.6)
      .hue(() => time * 0.1)
      .scrollX(() => 0.5 - mouse.x / width)
      .scrollY(() => mouse.y / height - 0.5)
      .luma(0.1)
  )
  .out()`,
  },
  {
    id: 'h-fb-mic', engine: 'hydra', cat: 'Feedback',
    tags: ['forme', 'microfono', 'eco'],
    title: 'Tunnel che respira',
    desc: 'Accendi 🎤 MIC: sui bassi (a.fft[0]) il quadrato si gonfia e lo zoom dell’eco accelera. Con la musica di STRUDEL il tunnel pulsa a tempo.',
    code: `// serve 🎤 MIC acceso nella barra in alto
src(o0)
  .scale(() => 1.01 + a.fft[0] * 0.05)   // i bassi accelerano lo zoom
  .hue(0.005)
  .layer(
    shape(4, () => 0.1 + a.fft[0] * 0.2, 0.01)   // e gonfiano il quadrato
      .color(1, 0.5, 0.2)
      .hue(() => time * 0.1)
      .luma(0.1)
  )
  .out()`,
  },
  {
    id: 'h-fb-twoout', engine: 'hydra', cat: 'Feedback',
    tags: ['onde', 'colore', 'eco'],
    title: 'Due uscite che si rincorrono',
    desc: 'Il feedback può passare da un’altra uscita: o0 legge o1 e o1 rilegge o0 cambiandogli colore. render(o0) mostra il risultato.',
    code: `// o0: le onde nel quadrato, più l'eco che arriva da o1
osc(10, 0.1, 1)
  .mult( shape(4, 0.3, 0.2) )
  .blend( src(o1).scale(1.02).rotate(0.03), 0.8 )
  .out(o0)

// o1: rilegge o0 e ne sposta la tinta
src(o0).hue(0.05)
  .out(o1)

render(o0)`,
  },

  /* ── HYDRA · camera e suono ────────────────────────────────────────────
     Sorgenti esterne. Il browser chiede il permesso alla prima esecuzione:
     è normale, e va detto agli studenti prima che succeda. Le immagini e il
     suono restano nel browser di chi li usa. */
  {
    id: 'h-cam', engine: 'hydra', cat: 'Camera e suono',
    tags: ['webcam'],
    title: 'Webcam',
    desc: 'initCam() accende la webcam; src(s0) la porta nella catena. Il browser chiede il permesso: è normale.',
    code: `// la prima volta il browser chiede il permesso
s0.initCam()

src(s0)
  .out()`,
  },
  {
    id: 'h-cam-kaleid', engine: 'hydra', cat: 'Camera e suono',
    tags: ['webcam', 'simmetria', 'colore', 'movimento'],
    title: 'Webcam caleidoscopica',
    desc: 'La webcam trattata come qualsiasi altra sorgente: si può ruotare, specchiare, colorare.',
    code: `s0.initCam()

src(s0)
  .kaleid(6)
  .rotate(() => time * 0.05)
  .colorama(0.02)
  .out()`,
  },
  {
    id: 'h-cam-feedback', engine: 'hydra', cat: 'Camera e suono',
    tags: ['webcam', 'eco'],
    title: 'Webcam con eco',
    desc: 'Feedback sulla webcam: i movimenti lasciano una scia che si ingrandisce.',
    code: `s0.initCam()

src(s0)
  .blend( src(o0).scale(1.02), 0.85 )
  .out()`,
  },
  {
    id: 'h-mic', engine: 'hydra', cat: 'Camera e suono',
    tags: ['microfono', 'onde', 'movimento'],
    title: 'Visuale che ascolta',
    desc: 'Accendi 🎤 MIC nella barra in alto: a.fft[0] sono i bassi, a.fft[3] gli acuti. Prova a battere le mani.',
    code: `// serve 🎤 MIC acceso nella barra in alto
osc(20, 0.1, 1)
  .rotate(() => a.fft[0] * 3)
  .scale(() => 1 + a.fft[2])
  .out()`,
  },
  {
    id: 'h-mic-shape', engine: 'hydra', cat: 'Camera e suono',
    tags: ['microfono', 'forme', 'colore'],
    title: 'Forma che pulsa col suono',
    desc: 'Il cerchio si gonfia sui bassi. Con la musica di STRUDEL in riproduzione, va a tempo da solo.',
    code: `// serve 🎤 MIC acceso nella barra in alto
shape(100, 0.1, 0.3)
  .scale(() => 0.5 + a.fft[0] * 4)
  .color(0.9, 0.5, 0.3)
  .out()`,
  },
  {
    id: 'h-screen', engine: 'hydra', cat: 'Camera e suono',
    tags: ['schermo', 'deformare'],
    title: 'Schermo condiviso',
    desc: 'initScreen() cattura una finestra e la usa come immagine. Il browser chiede quale condividere.',
    code: `// il browser chiede quale finestra condividere
s0.initScreen()

src(s0)
  .pixelate(60, 40)
  .out()`,
  },

  /* ── STRUDEL · base ────────────────────────────────────────────────── */
  {
    id: 's-note', engine: 'strudel', cat: 'Base',
    tags: ['primi passi', 'melodia'],
    title: 'Prime note',
    desc: 'note() suona note musicali in sequenza, una per battito.',
    code: `// note in sequenza (nomi inglesi: c=do, d=re, e=mi...)
note("c4 e4 g4 b4")
  .sound("triangle")`,
  },
  {
    id: 's-rest', engine: 'strudel', cat: 'Base',
    tags: ['primi passi', 'melodia', 'ritmo'],
    title: 'Note e pause',
    desc: 'Il trattino ~ è una pausa; le [ ] raggruppano note più veloci.',
    code: `note("c4 ~ [e4 g4] b4")
  .sound("triangle")`,
  },
  {
    id: 's-drums', engine: 'strudel', cat: 'Base',
    tags: ['primi passi', 'batteria'],
    title: 'Batteria',
    desc: 'sound() suona campioni: bd=cassa, sd=rullante, hh=hi-hat. (Servono i campioni: la prima volta va caricata online.)',
    code: `sound("bd hh sd hh")`,
  },
  {
    id: 's-tempo', engine: 'strudel', cat: 'Base',
    tags: ['primi passi', 'batteria', 'ritmo'],
    title: 'Cambiare velocità',
    desc: 'setcpm() imposta i cicli al minuto: più alto = più veloce.',
    code: `setcpm(35)
sound("bd hh sd hh")`,
  },

  /* ── STRUDEL · ritmo ───────────────────────────────────────────────── */
  {
    id: 's-sub', engine: 'strudel', cat: 'Ritmo',
    tags: ['batteria', 'ritmo'],
    title: 'Suddivisioni',
    desc: 'Le parentesi [ ] dividono un battito in parti più veloci.',
    code: `sound("bd [hh hh] sd [hh hh hh]")`,
  },
  {
    id: 's-star', engine: 'strudel', cat: 'Ritmo',
    tags: ['batteria', 'ritmo'],
    title: 'Ripetizioni con *',
    desc: 'L’asterisco ripete un evento: hh*4 = quattro hi-hat in un battito.',
    code: `sound("bd hh*4 sd hh*2")`,
  },
  {
    id: 's-euclid', engine: 'strudel', cat: 'Ritmo',
    tags: ['batteria', 'ritmo', 'strati'],
    title: 'Ritmi euclidei',
    desc: '(3,8) distribuisce 3 colpi in 8 passi: ritmi di tutto il mondo con due numeri.',
    code: `sound("bd(3,8), hh*8")`,
  },
  {
    id: 's-poly', engine: 'strudel', cat: 'Ritmo',
    tags: ['batteria', 'ritmo', 'strati'],
    title: 'Più strumenti insieme',
    desc: 'La virgola sovrappone pattern che suonano contemporaneamente.',
    code: `sound("bd*2, hh*8, ~ sd")`,
  },
  /* I due ritmi «da manuale» del workshop ufficiale di Strudel, senza .bank()
     (qui non ci sono drum machine). Insegnano anche setcpm(bpm/4). */
  {
    id: 's-rock', engine: 'strudel', cat: 'Ritmo',
    tags: ['batteria', 'ritmo', 'strati', 'rock'],
    title: 'Ritmo rock',
    desc: 'Il ritmo rock di base: cassa e rullante che si alternano, hi-hat in ottavi. setcpm conta i cicli, non i bpm: per 100 bpm si scrive 100/4.',
    code: `// 100 bpm: un ciclo = 4 battiti, quindi 100/4
setcpm(100/4)
sound("[bd sd]*2, hh*8")`,
  },
  {
    id: 's-house', engine: 'strudel', cat: 'Ritmo',
    tags: ['batteria', 'ritmo', 'strati', 'elettronica', 'house', 'techno'],
    title: 'Ritmo house',
    desc: 'Cassa in quattro, clap sul 2 e sul 4, hi-hat in levare: la base di house e techno. Somiglia molto al rock: molti ritmi si riusano fra i generi.',
    code: `// 124 bpm
setcpm(124/4)
sound("bd*4, [~ cp]*2, [~ hh]*4")`,
  },

  /* ── STRUDEL · melodia ─────────────────────────────────────────────── */
  {
    id: 's-scale', engine: 'strudel', cat: 'Melodia',
    tags: ['melodia', 'scale'],
    title: 'Scale musicali',
    desc: 'n() sceglie i gradi della scala impostata con scale(): mai una nota sbagliata.',
    code: `n("0 2 4 7 4 2")
  .scale("C:minor")
  .sound("sawtooth")
  .lpf(800)`,
  },
  {
    id: 's-chords', engine: 'strudel', cat: 'Melodia',
    tags: ['accordi'],
    title: 'Accordi',
    desc: 'Le note tra [ , ] suonano insieme: un accordo.',
    code: `note("[c3,e3,g3] [a2,c3,e3]")
  .sound("sawtooth")
  .lpf(600)
  .slow(2)`,
  },
  {
    id: 's-arp', engine: 'strudel', cat: 'Melodia',
    tags: ['melodia', 'scale', 'arpeggio'],
    title: 'Arpeggio veloce',
    desc: 'fast() accelera il pattern; off() aggiunge una copia ritardata e trasposta.',
    code: `n("0 4 7 11")
  .scale("D:minor")
  .fast(2)
  .off(0.125, x => x.add(n(12)))
  .sound("triangle")`,
  },

  /* ── STRUDEL · suono ───────────────────────────────────────────────── */
  {
    id: 's-filter', engine: 'strudel', cat: 'Suono',
    tags: ['timbro', 'basso'],
    title: 'Filtro che si muove',
    desc: 'lpf() taglia gli acuti; sine.range() lo fa oscillare lentamente.',
    code: `note("c2 c2 g2 c2")
  .sound("sawtooth")
  .lpf(sine.range(200, 2000).slow(4))`,
  },
  {
    id: 's-adsr', engine: 'strudel', cat: 'Suono',
    tags: ['timbro'],
    title: 'Envelope (attack/release)',
    desc: 'attack e release scolpiscono come il suono nasce e muore.',
    code: `note("c3 e3 g3 e3")
  .sound("sine")
  .attack(0.2)
  .release(0.5)`,
  },
  {
    id: 's-fx', engine: 'strudel', cat: 'Suono',
    tags: ['timbro'],
    title: 'Reverb e delay',
    desc: 'room() aggiunge il reverb, delay() il delay: il suono si ripete a tempo, come un’eco.',
    code: `note("c4 ~ e4 ~")
  .sound("triangle")
  .room(0.6)
  .delay(0.4)`,
  },
  {
    id: 's-gain', engine: 'strudel', cat: 'Suono',
    tags: ['timbro', 'batteria', 'ritmo'],
    title: 'Dinamica (volume)',
    desc: 'gain() con un pattern crea accenti: forte, piano, piano, forte...',
    code: `sound("hh*8")
  .gain("1 0.3 0.6 0.3")`,
  },

  /* ── STRUDEL · struttura ───────────────────────────────────────────── */
  {
    /* Il modo del workshop ufficiale per far suonare più pattern insieme.
       Sta per primo perché è anche il modello che l'assistente riceve quando
       gli si chiede «batteria + basso + melodia» (vedi relevantSnippets). */
    id: 's-dollar', engine: 'strudel', cat: 'Struttura',
    tags: ['strati', 'batteria', 'basso'],
    title: 'Più pattern insieme con $:',
    desc: 'Senza $: suona solo l’ultimo pattern del codice, gli altri vengono ignorati. Con $: davanti a ciascuno suonano tutti insieme: batteria, basso e melodia, ognuno sulla sua riga.',
    code: `// $: davanti a OGNI pattern → suonano tutti insieme
$: sound("bd*2, ~ sd")
$: sound("hh*8").gain("[.25 1]*4")
$: note("c2 ~ eb2 g2").sound("sawtooth").lpf(500)
// prova a scrivere _$: al posto di $: per zittire una voce`,
  },
  {
    id: 's-stack', engine: 'strudel', cat: 'Struttura',
    tags: ['strati', 'batteria', 'basso'],
    title: 'Brano a strati',
    desc: 'stack() sovrappone più pattern completi: un piccolo brano.',
    code: `stack(
  sound("bd*2, ~ sd"),
  sound("hh*8").gain(0.4),
  note("c2 ~ eb2 g2").sound("sawtooth").lpf(500)
)`,
  },
  {
    id: 's-cat', engine: 'strudel', cat: 'Struttura',
    tags: ['melodia', 'variazione'],
    title: 'Sezioni alternate',
    desc: 'cat() alterna pattern un ciclo ciascuno: strofa, ritornello...',
    code: `cat(
  note("c3 e3 g3 e3"),
  note("a2 c3 e3 c3")
).sound("triangle")`,
  },
  {
    id: 's-sometimes', engine: 'strudel', cat: 'Struttura',
    tags: ['batteria', 'variazione', 'casuale'],
    title: 'Variazioni casuali',
    desc: 'sometimes() applica una modifica solo a volte: il pattern respira.',
    code: `sound("bd hh sd hh")
  .sometimes(x => x.speed(2))`,
  },

  /* ── STRUDEL · teoria ──────────────────────────────────────────────────
     Un concetto per esempio, in ordine: dal semitono all'accordo, poi i tre
     strati di un brano (basso, accordi, melodia). Ogni esempio è UNA sola
     espressione (più l'eventuale setcpm): la timeline impila le clip dentro
     `$: ( … )`, e un `const` lì dentro sarebbe un errore di sintassi. */
  {
    id: 't-semitoni', engine: 'strudel', cat: 'Teoria',
    tags: ['melodia', 'scale'],
    title: 'Toni e semitoni',
    desc: 'Il semitono è il passo più piccolo: da un tasto del pianoforte a quello accanto. # è il diesis (mezzo passo su), b il bemolle (mezzo passo giù). Due semitoni fanno un tono.',
    code: `// la scala cromatica: 12 semitoni, tutti i tasti da Do a Si
note("c4 c#4 d4 d#4 e4 f4 f#4 g4 g#4 a4 a#4 b4")
  .sound("triangle")`,
  },
  {
    id: 't-scala', engine: 'strudel', cat: 'Teoria',
    tags: ['melodia', 'scale'],
    title: 'La scala maggiore',
    desc: 'Una scala è una scelta di 7 note fra le 12. La maggiore segue sempre la stessa ricetta di toni (T) e semitoni (S): T T S T T T S.',
    code: `// do re mi fa sol la si do — i semitoni sono mi-fa e si-do
note("c4 d4 e4 f4 g4 a4 b4 c5")
  .sound("triangle")`,
  },
  {
    id: 't-magg-min', engine: 'strudel', cat: 'Teoria',
    tags: ['scale', 'variazione'],
    title: 'Maggiore e minore',
    desc: 'Gli stessi gradi su due scale: un ciclo in maggiore (luminoso), uno in minore (malinconico). Cambiano il terzo, il sesto e il settimo grado.',
    code: `// <a b> alterna: un ciclo Do maggiore, un ciclo Do minore
n("0 1 2 3 4 5 6 7")
  .scale("<C4:major C4:minor>")
  .sound("triangle")`,
  },
  {
    id: 't-durate', engine: 'strudel', cat: 'Teoria',
    tags: ['melodia', 'ritmo'],
    title: 'Durate: note lunghe e corte',
    desc: 'La chiocciola @ allunga una nota: c4@3 dura il triplo di d4. Se i pesi sommano a 8, ogni unità è un ottavo: @2 un quarto, @4 una metà. Apri ♪ SPARTITO per vederlo scritto.',
    code: `// 3 + 1 + 2 + 2 = 8 ottavi: quarto col punto, ottavo, due quarti
note("c4@3 d4 e4@2 g4@2")
  .sound("triangle")`,
  },
  {
    id: 't-intervalli', engine: 'strudel', cat: 'Teoria',
    tags: ['accordi'],
    title: 'Intervalli',
    desc: 'L’intervallo è la distanza fra due note. Suonate insieme, alcune distanze «stridono» (la seconda), altre riposano (terza, quinta, ottava).',
    code: `// Do insieme a Re, Mi, Sol, Do: seconda, terza, quinta, ottava
note("[c4,d4] [c4,e4] [c4,g4] [c4,c5]")
  .sound("triangle")
  .slow(2)`,
  },
  {
    id: 't-triade', engine: 'strudel', cat: 'Teoria',
    tags: ['accordi', 'scale'],
    title: 'Costruire un accordo',
    desc: 'Un accordo (triade) si costruisce prendendo una nota sì e una no dalla scala: gradi 0, 2, 4 — fondamentale, terza, quinta. Prima una alla volta, poi insieme.',
    code: `// tre note della scala, poi le stesse tre insieme
n("0 2 4 [0,2,4]")
  .scale("C4:major")
  .sound("triangle")`,
  },
  {
    id: 't-accordo-mm', engine: 'strudel', cat: 'Teoria',
    tags: ['accordi'],
    title: 'Accordo maggiore e minore',
    desc: 'Fra l’accordo maggiore e quello minore cambia una nota sola, quella di mezzo (la terza), di un semitono: Mi diventa Mi bemolle.',
    code: `// Do maggiore, poi Do minore: cambia solo e4 → eb4
note("[c4,e4,g4] [c4,eb4,g4]")
  .sound("sawtooth")
  .lpf(900)
  .slow(2)`,
  },
  {
    id: 't-gradi', engine: 'strudel', cat: 'Teoria',
    tags: ['accordi', 'scale', 'variazione'],
    title: 'Gli accordi della scala',
    desc: 'La stessa forma (0, 2, 4) spostata su ogni grado della scala dà sette accordi: I IV V maggiori, ii iii vi minori, vii diminuito. Tutte le canzoni in Do pescano da qui.',
    code: `// add() sposta la triade un grado più su a ogni ciclo
n("[0,2,4]")
  .add(n("<0 1 2 3 4 5 6 7>"))
  .scale("C4:major")
  .sound("sawtooth")
  .lpf(900)`,
  },
  {
    id: 't-sigle', engine: 'strudel', cat: 'Teoria',
    tags: ['accordi'],
    title: 'Accordi col loro nome',
    desc: 'chord() legge le sigle come sul canzoniere: C D E F G A B = Do Re Mi Fa Sol La Si; la «m» vuol dire minore. voicing() sceglie le note e le dispone bene.',
    code: `// Do, La minore, Fa, Sol — un accordo per ciclo
chord("<C Am F G>")
  .voicing()
  .sound("sawtooth")
  .lpf(900)`,
  },
  {
    id: 't-cadenza', engine: 'strudel', cat: 'Teoria',
    tags: ['accordi'],
    title: 'Tensione e riposo',
    desc: 'L’accordo sul quinto grado (dominante, qui G7) crea tensione; quello sul primo (tonica, C) la scioglie. Questo movimento, la cadenza, è il motore dell’armonia.',
    code: `// G7 chiede, C risponde
chord("<G7 C>")
  .voicing()
  .sound("sawtooth")
  .lpf(900)`,
  },
  {
    id: 't-arpeggio', engine: 'strudel', cat: 'Teoria',
    tags: ['accordi', 'arpeggio'],
    title: 'Arpeggio',
    desc: 'Arpeggiare vuol dire suonare le note di un accordo una alla volta. arp() le sceglie per posizione: 0 è la più bassa.',
    code: `// gli stessi quattro accordi, sgranati su e giù
chord("<C Am F G>")
  .voicing()
  .arp("0 1 2 3 4 3 2 1")
  .sound("triangle")`,
  },
  {
    id: 't-settime', engine: 'strudel', cat: 'Teoria',
    tags: ['accordi', 'jazz'],
    title: 'Accordi di settima',
    desc: 'Aggiungendo una quarta nota (la settima) l’accordo si colora: è il suono del jazz e della bossa nova. ^7 è la settima maggiore, m7 la minore, 7 quella di dominante.',
    code: `// prova a togliere i 7 e ascolta la differenza
chord("<C^7 Am7 Dm7 G7>")
  .voicing()
  .sound("sawtooth")
  .lpf(900)`,
  },
  {
    id: 't-strati', engine: 'strudel', cat: 'Teoria',
    tags: ['melodia', 'accordi', 'basso', 'strati'],
    title: 'Basso, accordi, melodia',
    desc: 'Quasi ogni brano è fatto di tre strati: la melodia (ciò che canti), gli accordi (il colore) e il basso, che suona la nota che dà il nome all’accordo (rootNotes).',
    code: `setcpm(30)
stack(
  // melodia: gradi della scala di Do
  n("<[4 2 0 2] [4 4 4@2] [3 1 ~ 1] [2 0 0@2]>")
    .scale("C5:major").sound("triangle"),
  // accordi
  chord("<C C G7 C>").voicing()
    .sound("sawtooth").lpf(700).gain(0.3),
  // basso: la fondamentale di ogni accordo
  chord("<C C G7 C>").rootNotes(2)
    .sound("sawtooth").lpf(300)
)`,
  },
  {
    id: 't-pentatonica', engine: 'strudel', cat: 'Teoria',
    tags: ['melodia', 'scale', 'casuale', 'blues'],
    title: 'Scala pentatonica',
    desc: 'Cinque note senza semitoni: stanno bene insieme in qualsiasi ordine. Per questo è la scala dell’improvvisazione, dal blues alla musica cinese. Qui le note escono a caso, e non stonano mai.',
    code: `// irand(10) pesca un grado a caso, 8 volte per ciclo
n(irand(10).segment(8))
  .scale("C4:pentatonic")
  .sound("triangle")
  .room(0.4)`,
  },
  {
    id: 't-modi', engine: 'strudel', cat: 'Teoria',
    tags: ['scale', 'variazione'],
    title: 'Altre scale, altri colori',
    desc: 'I modi sono scale costruite con le stesse note ma partendo da un grado diverso: dorico (folk, funk), frigio (flamenco), lidio (sognante), misolidio (rock).',
    code: `// la stessa salita da Re, un modo diverso a ogni ciclo
n("0 1 2 3 4 5 6 7")
  .scale("<D4:dorian D4:phrygian D4:lydian D4:mixolydian>")
  .sound("triangle")`,
  },
  {
    id: 't-trasporre', engine: 'strudel', cat: 'Teoria',
    tags: ['melodia', 'variazione'],
    title: 'Trasporre',
    desc: 'Trasporre vuol dire spostare tutto di uno stesso numero di semitoni: la melodia resta riconoscibile, cambia la tonalità. I cantanti lo fanno per adattare un brano alla voce.',
    code: `// la stessa figura in Do, poi 5 e 7 semitoni sopra: Fa e Sol
note("c4 e4 g4 e4")
  .transpose("<0 5 7 5>")
  .sound("triangle")`,
  },

  /* ── STRUDEL · giri di accordi ─────────────────────────────────────────
     Un giro di accordi non è di nessuno: migliaia di canzoni condividono
     questi. layer() parte da UNA sola riga di sigle e ne ricava accordi e
     basso: lo studente cambia il giro in un punto solo. */
  {
    id: 'g-pop', engine: 'strudel', cat: 'Giri di accordi',
    tags: ['accordi', 'basso', 'strati', 'pop'],
    title: 'I–V–vi–IV: il giro del pop',
    desc: 'Do, Sol, La minore, Fa: il giro più usato degli ultimi cinquant’anni («Let It Be», «No Woman No Cry», «With or Without You»). I numeri romani sono i gradi della scala: minuscolo = accordo minore.',
    code: `setcpm(30)
// una riga di sigle, due strati: accordi e basso
chord("<C G Am F>").layer(
  x => x.voicing().sound("sawtooth").lpf(900).gain(0.4),
  x => x.rootNotes(2).struct("x*4").sound("sawtooth").lpf(300)
)`,
  },
  {
    id: 'g-giro-di-do', engine: 'strudel', cat: 'Giri di accordi',
    tags: ['accordi', 'arpeggio', 'basso', 'strati', 'pop'],
    title: 'I–vi–IV–V: il giro di Do',
    desc: 'Do, La minore, Fa, Sol: il «giro di Do» di centinaia di canzoni degli anni ’50 e ’60. Gli stessi accordi del giro pop, in un altro ordine. L’arpeggio a terzine dà il dondolio da ballo lento.',
    code: `setcpm(25)
chord("<C Am F G>").layer(
  // [1 2 3]*4 = quattro terzine sulle note centrali dell'accordo
  x => x.voicing().arp("[1 2 3]*4").sound("triangle"),
  x => x.rootNotes(2).sound("sawtooth").lpf(300)
)`,
  },
  {
    id: 'g-minore', engine: 'strudel', cat: 'Giri di accordi',
    tags: ['accordi', 'basso', 'strati', 'ritmo', 'pop'],
    title: 'vi–IV–I–V: il giro in minore',
    desc: 'Ancora gli stessi quattro accordi, ma partendo da La minore: l’atmosfera diventa più scura («Zombie», «Despacito» usano questo giro in altre tonalità). Il ritmo 3+3+2 è il tresillo.',
    code: `setcpm(24)
chord("<Am F C G>").layer(
  x => x.voicing().struct("x ~ ~ x ~ ~ x ~")
    .sound("sawtooth").lpf(1200).gain(0.4),
  x => x.rootNotes(2).struct("x ~ ~ x ~ ~ x ~")
    .sound("sawtooth").lpf(300)
)`,
  },
  {
    id: 'g-blues', engine: 'strudel', cat: 'Giri di accordi',
    tags: ['accordi', 'basso', 'strati', 'ritmo', 'blues'],
    title: 'Blues in 12 battute',
    desc: 'Tre accordi di settima (I, IV, V) disposti su 12 battute: è la struttura del blues e del rock’n’roll. Il ritmo «lungo-corto» [x ~ x] è lo shuffle.',
    code: `setcpm(28)
// 4 battute di C7 · 2 di F7, 2 di C7 · G7, F7, C7, G7
chord("<C7!4 F7!2 C7!2 G7 F7 C7 G7>").layer(
  x => x.voicing().struct("[x ~ x]*4")
    .sound("sawtooth").lpf(1000).gain(0.35),
  x => x.rootNotes(2).struct("[x ~ x]*4")
    .sound("sawtooth").lpf(300)
)`,
  },
  {
    id: 'g-jazz', engine: 'strudel', cat: 'Giri di accordi',
    tags: ['accordi', 'basso', 'strati', 'jazz'],
    title: 'ii–V–I: la cadenza del jazz',
    desc: 'Re minore settima, Sol settima, Do settima maggiore: due accordi di tensione che cadono sulla tonica. È il mattone con cui sono costruiti quasi tutti gli standard jazz.',
    code: `setcpm(28)
chord("<Dm7 G7 C^7!2>").layer(
  // accordi in levare, come un pianista jazz
  x => x.voicing().struct("~ x ~ x")
    .sound("sawtooth").lpf(1000).gain(0.35),
  x => x.rootNotes(2).struct("x*4").sound("triangle")
)`,
  },
  {
    id: 'g-andalusa', engine: 'strudel', cat: 'Giri di accordi',
    tags: ['accordi', 'arpeggio', 'basso', 'strati', 'popolare'],
    title: 'Cadenza andalusa',
    desc: 'La minore, Sol, Fa, Mi: quattro accordi che scendono di grado. È il suono del flamenco, e il giro di «Hit the Road Jack». L’ultimo accordo, Mi maggiore, vuole tornare al La minore.',
    code: `setcpm(28)
chord("<Am G F E>").layer(
  x => x.voicing().arp("0 1 2 3 4 3 2 1").sound("triangle"),
  x => x.rootNotes(2).sound("sawtooth").lpf(300)
)`,
  },
  {
    id: 'g-pachelbel', engine: 'strudel', cat: 'Giri di accordi',
    tags: ['melodia', 'accordi', 'basso', 'strati', 'classica'],
    title: 'Il Canone di Pachelbel',
    desc: 'Otto accordi, due per battuta, scritti verso il 1680 e riusati da allora in decine di canzoni. Sopra, la linea che scende di grado. Qui in Do (l’originale è in Re).',
    code: `setcpm(20)
stack(
  // la melodia scende una nota per accordo
  note("<[e5 d5] [c5 b4] [a4 g4] [a4 b4]>").sound("triangle"),
  chord("<[C G] [Am Em] [F C] [F G]>").layer(
    x => x.voicing().sound("sawtooth").lpf(800).gain(0.3),
    x => x.rootNotes(2).sound("sawtooth").lpf(300)
  )
)`,
  },
  {
    id: 'g-quinte', engine: 'strudel', cat: 'Giri di accordi',
    tags: ['accordi', 'basso', 'strati', 'jazz'],
    title: 'Il circolo delle quinte',
    desc: 'Ogni accordo scende di una quinta verso il successivo: La, Re, Sol, Do, Fa, Si, Mi, La. È il giro di «Autumn Leaves» e «I Will Survive»: una catena di tensioni che si risolvono una nell’altra.',
    code: `setcpm(28)
chord("<Am7 Dm7 G7 C^7 F^7 Bm7b5 E7 Am7>").layer(
  x => x.voicing().sound("sawtooth").lpf(900).gain(0.35),
  x => x.rootNotes(2).struct("x ~ x ~").sound("triangle")
)`,
  },

  /* ── STRUDEL · cover ───────────────────────────────────────────────────
     Melodia + armonia di brani che tutti conoscono. Sono TUTTI di pubblico
     dominio (tradizionali, o di autori morti da oltre 70 anni), e non è un
     caso: Open Live Lab è pubblico e sotto AGPL, quindi la melodia di una canzone
     protetta non può starci dentro. Aggiungendone altri, stessa regola.
     Le melodie sono scritte una battuta per gruppo [ ], dentro < >: un ciclo
     = una battuta, così ♪ SPARTITO le mostra come sul libro di musica. */
  {
    id: 'c-gioia', engine: 'strudel', cat: 'Cover',
    tags: ['melodia', 'accordi', 'basso', 'strati', 'classica'],
    title: 'Inno alla gioia (Beethoven)',
    desc: 'La melodia si muove quasi solo per gradi vicini, per questo si canta così bene. Sotto bastano due accordi: tonica (C) e dominante (G).',
    code: `setcpm(30)
stack(
  // melodia: una battuta per ogni [ ]
  note(\`<
    [e5 e5 f5 g5] [g5 f5 e5 d5] [c5 c5 d5 e5] [e5@3 d5 d5@4]
    [e5 e5 f5 g5] [g5 f5 e5 d5] [c5 c5 d5 e5] [d5@3 c5 c5@4]
  >\`).sound("triangle"),
  // armonia: un accordo per battuta
  chord("<C G C G C G C [G C]>").layer(
    x => x.voicing().sound("sawtooth").lpf(700).gain(0.3),
    x => x.rootNotes(2).sound("sawtooth").lpf(300)
  )
)`,
  },
  {
    id: 'c-martino', engine: 'strudel', cat: 'Cover',
    tags: ['melodia', 'strati', 'popolare'],
    title: 'Fra Martino (canone)',
    desc: 'Un canone è una melodia che fa da accompagnamento a se stessa: una seconda voce canta le stesse note, ma in ritardo. off(2, …) la fa seguire a due battute di distanza, un’ottava sopra.',
    code: `setcpm(30)
// !2 ripete la battuta due volte
note(\`<
  [c4 d4 e4 c4]!2
  [e4 f4 g4@2]!2
  [[g4 a4] [g4 f4] e4 c4]!2
  [c4 g3 c4@2]!2
>\`)
  .off(2, x => x.transpose(12))   // la seconda voce
  .sound("triangle")`,
  },
  {
    id: 'c-stellina', engine: 'strudel', cat: 'Cover',
    tags: ['melodia', 'accordi', 'basso', 'strati', 'popolare'],
    title: 'Brilla brilla la stellina',
    desc: 'La melodia francese su cui Mozart scrisse dodici variazioni. Si accompagna con i tre accordi principali della tonalità: I (C), IV (F) e V (G).',
    code: `setcpm(25)
stack(
  note(\`<
    [c5 c5 g5 g5] [a5 a5 g5@2]
    [f5 f5 e5 e5] [d5 d5 c5@2]
  >\`).sound("triangle"),
  // [F C] = due accordi nella stessa battuta
  chord("<C [F C] [F C] [G C]>").layer(
    x => x.voicing().sound("sawtooth").lpf(700).gain(0.3),
    x => x.rootNotes(2).sound("sawtooth").lpf(300)
  )
)`,
  },
  {
    id: 'c-korobeiniki', engine: 'strudel', cat: 'Cover',
    tags: ['melodia', 'basso', 'strati', 'popolare'],
    title: 'Korobeiniki (il tema di Tetris)',
    desc: 'Una canzone popolare russa dell’Ottocento, diventata famosa come musica di Tetris. È in La minore, ma l’accordo di Mi è maggiore: quel Sol# «tira» verso il La (scala minore armonica).',
    code: `setcpm(35)
stack(
  note(\`<
    [e4@3 g#4 b4@2 g#4 e4] [a4@3 c5 e5@2 d5 c5]
    [b4@3 c5 d5@2 e5@2]    [c5@2 a4@2 a4@4]
    [f5@3 g5 a5@2 g5 f5]   [e5@3 f5 e5@2 d5 c5]
    [b4@3 c5 d5@2 e5@2]    [c5@2 a4@2 a4@4]
  >\`).sound("square").lpf(2500).gain(0.6),
  // basso: la fondamentale, rimbalzando di un'ottava
  chord("<E Am E Am Dm Am E Am>").rootNotes(2)
    .struct("x*8").transpose("[0 12]*4")
    .sound("triangle")
)`,
  },
  {
    id: 'c-bella-ciao', engine: 'strudel', cat: 'Cover',
    tags: ['melodia', 'accordi', 'basso', 'strati', 'popolare'],
    title: 'Bella ciao',
    desc: 'Canto popolare italiano. La melodia parte «in levare»: le tre note d’attacco (mi la si) stanno in fondo alla battuta precedente, qui alla fine del giro. Sotto, il basso sui tempi forti e gli accordi in levare.',
    code: `setcpm(30)
stack(
  note(\`<
    [c5 a4@4 e4 a4 b4]     [c5 a4@4 e4 a4 b4]
    [c5@2 b4 a4 c5@2 b4 a4] [e5@2 e5@2 e5 e5 d5 e5]
    [f5 f5@4 f5 e5 d5]     [f5 e5@4 e5 d5 c5]
    [b4 e5 c5 b4]          [a4@4 ~ e4 a4 b4]
  >\`).sound("triangle"),
  chord("<Am!4 Dm Am E7 Am>").layer(
    x => x.voicing().struct("~ x ~ x")
      .sound("sawtooth").lpf(900).gain(0.3),
    x => x.rootNotes(2).struct("x ~ x ~")
      .sound("sawtooth").lpf(300)
  )
)`,
  },
  {
    id: 'c-elisa', engine: 'strudel', cat: 'Cover',
    tags: ['melodia', 'arpeggio', 'strati', 'classica'],
    title: 'Per Elisa (Beethoven)',
    desc: 'Tutto il tema oscilla fra due accordi arpeggiati dalla mano sinistra: La minore (tonica) e Mi maggiore (dominante). È in 3/8: ogni ciclo è una battuta di sei note veloci.',
    code: `setcpm(40)
stack(
  // mano destra
  note(\`<
    [e5 d#5 e5 b4 d5 c5] [a4@2 ~ c4 e4 a4]
    [b4@2 ~ e4 g#4 b4]   [c5@2 ~ e4 e5 d#5]
    [e5 d#5 e5 b4 d5 c5] [a4@2 ~ c4 e4 a4]
    [b4@2 ~ e4 c5 b4]    [a4@2 ~ ~ e5 d#5]
  >\`).sound("triangle"),
  // mano sinistra: La minore, Mi maggiore, La minore
  note(\`<
    ~ [a2 e3 a3 ~ ~ ~] [e2 e3 g#3 ~ ~ ~] [a2 e3 a3 ~ ~ ~]
    ~ [a2 e3 a3 ~ ~ ~] [e2 e3 g#3 ~ ~ ~] [a2 e3 a3 ~ ~ ~]
  >\`).sound("triangle")
).room(0.4)`,
  },
  {
    id: 'c-bach', engine: 'strudel', cat: 'Cover',
    tags: ['accordi', 'arpeggio', 'classica'],
    title: 'Preludio in Do (Bach)',
    desc: 'Qui non c’è melodia: solo accordi, uno per battuta, suonati una nota alla volta. È l’armonia stessa a raccontare — ascolta come ogni accordo tende verso il successivo.',
    code: `setcpm(18)
// ogni [ , , ] è un accordo di cinque note
note(\`<
  [c4,e4,g4,c5,e5] [c4,d4,a4,d5,f5]
  [b3,d4,g4,d5,f5] [c4,e4,g4,c5,e5]
  [c4,e4,a4,e5,a5] [c4,d4,f#4,a4,d5]
  [b3,d4,g4,d5,g5] [b3,c4,e4,g4,c5]
>\`)
  .arp("[0 1 2 3 4 2 3 4]*2")   // l'ordine in cui Bach le sgrana
  .sound("triangle")
  .room(0.5)`,
  },
  {
    id: 'c-grieg', engine: 'strudel', cat: 'Cover',
    tags: ['melodia', 'basso', 'strati', 'classica'],
    title: 'Nell’antro del re della montagna (Grieg)',
    desc: 'Un tema in Si minore che sale per gradi e ricade, sopra un basso che alterna fondamentale e quinta. clip(0.5) accorcia le note come un pizzicato. Nell’originale accelera senza sosta: alza setcpm a ogni esecuzione!',
    code: `setcpm(30)
stack(
  note(\`<
    [b3 c#4 d4 e4 f#4 d4 f#4@2]  [f4 c#4 f4@2 e4 c4 e4@2]
    [b3 c#4 d4 e4 f#4 d4 f#4 b4] [a4 f#4 d4 f#4 a4@2 ~@2]
  >\`).clip(0.5).sound("sawtooth").lpf(1500),
  // basso: Si–Fa# (fondamentale e quinta), poi Re–La
  note("<[b1 f#2 b1 f#2]!3 [d2 a2 d2 a2]>")
    .clip(0.5).sound("triangle")
)`,
  },

  /* ── STRUDEL · generi elettronici ──────────────────────────────────────
     Italo disco, techno, tech house, drum and bass, IDM: la batteria è
     fatta (quasi sempre) con i due break
     tagliati in segmenti, come nel tutorial Beat IDM (js/tutorials/idm.js).
     Che cosa c'è in ogni segmento (misurato sui file come per xbreak1):
       xbreak1  cassa 0 5 8 11 13 · rullante 2 7 10 14 · hi-hat 1 3 4 6 9 12 15
       dnb1     cassa 0 1 5 8 9 13 · rullante 2 6 10 14 · hi-hat 3 4 7 11 12 15
     Ogni segmento dura 0,176 s: un sedicesimo a 85 bpm, un ottavo a 170. Per
     questo a setcpm(170/4) otto segmenti fanno una battuta, e dnb1 0…7 è già
     il two-step della drum and bass. A tempi diversi i segmenti si usano uno
     per uno, come i pezzi di una batteria elettronica.
     Come la teoria: una sola espressione per esempio, stack() e non $:. */
  {
    id: 'it-batteria', engine: 'strudel', cat: 'Italo disco',
    tags: ['batteria', 'ritmo', 'break', 'elettronica', 'italo disco'],
    title: 'Batteria italo con i segmenti',
    desc: 'L’italo disco è la dance italiana dei primi anni ’80: drum machine, bassi che rimbalzano, synth malinconici. Qui la batteria si costruisce pescando segmenti dai due break: la cassa da dnb1, rullante e hi-hat da xbreak1.',
    code: `setcpm(118/4)
// cassa in quattro · rullante sul 2 e sul 4 · hi-hat in levare
s("dnb1:0*4, [~ xbreak1:2]*2, [~ xbreak1:1]*4")`,
  },
  {
    id: 'it-basso', engine: 'strudel', cat: 'Italo disco',
    tags: ['basso', 'elettronica', 'italo disco'],
    title: 'Il basso a ottave',
    desc: 'Il marchio dell’italo: il basso suona sedicesimi senza sosta, saltando fra la nota e la stessa nota un’ottava sopra. Le note vengono dal giro La minore, Fa, Do, Sol: rootNotes prende la fondamentale di ogni accordo.',
    code: `setcpm(118/4)
chord("<Am F C G>").rootNotes(1)
  .struct("x*16")              // sedicesimi
  .add(note("[0 12]*8"))       // una sì e una no, un'ottava sopra
  .sound("sawtooth")
  .lpf(800)
  .release(0.1)`,
  },
  {
    id: 'it-arpeggio', engine: 'strudel', cat: 'Italo disco',
    tags: ['arpeggio', 'accordi', 'timbro', 'elettronica', 'italo disco'],
    title: 'Arpeggiator con il delay',
    desc: 'Gli stessi accordi sgranati a sedicesimi, come faceva l’arpeggiator dei synth dell’epoca. Il delay ripete ogni nota dopo un ottavo col punto (0,38 secondi a 118 bpm): le ripetizioni cadono fuori griglia e l’arpeggio sembra rincorrersi.',
    code: `setcpm(118/4)
chord("<Am F C G>")
  .voicing()
  .arp("[0 1 2 3]*4")
  .sound("square")
  .lpf(2000)
  .delay(0.4)
  .delaytime(0.38)       // un ottavo col punto
  .delayfeedback(0.45)
  .gain(0.5)`,
  },
  {
    id: 'it-brano', engine: 'strudel', cat: 'Italo disco',
    tags: ['strati', 'batteria', 'basso', 'melodia', 'break', 'elettronica', 'italo disco'],
    title: 'Un brano italo disco',
    desc: 'Tutto insieme: batteria a segmenti, basso a ottave, arpeggio, un pad di supersaw e la melodia. Ogni quattro battute xbreak1 regala un roll di quattro rullanti diversi (i segmenti 2, 7, 10, 14). off() raddoppia la melodia un’ottava sopra, un sedicesimo dopo: un’eco che luccica.',
    code: `setcpm(118/4)
stack(
  s("dnb1:0*4, [~ xbreak1:2]*2, [~ xbreak1:1]*4"),
  // il roll alla fine della quarta battuta
  n("<~ ~ ~ [~@3 [2 7 10 14]]>").s("xbreak1"),
  chord("<Am F C G>").layer(
    x => x.rootNotes(1).struct("x*16").add(note("[0 12]*8"))
      .sound("sawtooth").lpf(800).release(0.1),
    x => x.voicing().arp("[0 1 2 3]*4").sound("square")
      .lpf(2000).delay(0.4).delaytime(0.38).gain(0.3),
    x => x.voicing().sound("supersaw").attack(0.3)
      .lpf(1500).gain(0.2)
  ),
  note(\`<
    [e5@2 d5 c5 a4@2 c5 d5] [c5@2 a4@2 ~ a4 c5 f5]
    [e5@2 d5 c5 g4@2 c5 d5] [d5@3 b4 g4@2 ~@2]
  >\`).sound("square").lpf(3000).gain(0.4)
    .off(1/16, x => x.add(note(12)).gain(0.15))
)`,
  },

  {
    id: 'dnb-break', engine: 'strudel', cat: 'Drum and bass',
    tags: ['batteria', 'ritmo', 'break', 'elettronica', 'drum and bass'],
    title: 'Il two-step a 170',
    desc: 'La drum and bass nasce in Inghilterra nei primi anni ’90: break velocissimi (170 bpm) e bassi profondissimi. A setcpm(170/4) un ciclo è una battuta e i primi 8 segmenti di dnb1 la riempiono esatta: cassa, cassa, rullante… è il two-step, il ritmo di base del genere.',
    code: `setcpm(170/4)
// cassa 0 1 5 · rullante 2 6 · hi-hat 3 4 7
n("0 1 2 3 4 5 6 7")
  .s("dnb1")`,
  },
  {
    id: 'dnb-due-break', engine: 'strudel', cat: 'Drum and bass',
    tags: ['batteria', 'break', 'variazione', 'elettronica', 'drum and bass'],
    title: 'Due batteristi a confronto',
    desc: 'Ogni break è lungo due battute: 8 segmenti la prima, 8 la seconda. Qui si alternano i due break che abbiamo, due battute ciascuno. Stesso tempo, due batteristi diversi: xbreak1 è più sincopato, con la cassa che anticipa.',
    code: `setcpm(170/4)
n("<[0 1 2 3 4 5 6 7] [8 9 10 11 12 13 14 15]>")
  .s("<dnb1 dnb1 xbreak1 xbreak1>")`,
  },
  {
    id: 'dnb-edit', engine: 'strudel', cat: 'Drum and bass',
    tags: ['batteria', 'break', 'variazione', 'elettronica', 'drum and bass'],
    title: 'Rimontare il break',
    desc: 'I produttori di drum and bass non lasciano mai il break com’è: ripetono un segmento a sedicesimi, spostano una cassa, aggiungono un roll in fondo. Le < > cambiano l’ultimo ottavo a ogni battuta. cut(1) fa tacere il segmento vecchio quando parte il nuovo.',
    code: `setcpm(170/4)
n("0 1 2 [3 3] 4 [5 0] 6 <7 [7 7] 7 [6*4]>")
  .s("dnb1")
  .cut(1)`,
  },
  {
    id: 'dnb-jungle', engine: 'strudel', cat: 'Drum and bass',
    tags: ['batteria', 'break', 'casuale', 'basso', 'elettronica', 'drum and bass'],
    title: 'Jungle',
    desc: 'La jungle è la madre della drum and bass: break tagliuzzati come nel tutorial Beat IDM, sopra una bassline lenta che viene dal reggae. Quattro battute di xbreak1 rimontato, con qualche segmento che a caso balbetta (ply) o suona al contrario.',
    code: `setcpm(170/4)
stack(
  n(\`<
    [0 1 2 3 4 5 6 7]    [8 9 10 11 12 13 [14 14] 15]
    [0 1 2 3 0 1 2 [7 7]] [8 9 10 11 13 12 [14*4]@2]
  >\`).s("xbreak1")
    .sometimesBy(0.15, x => x.ply(2))
    .sometimesBy(0.1, x => x.speed(-1))
    .cut(1),
  // la bassline: una nota lunga, poi due brevi
  note("<[d2@3 ~] [d2@3 f2] [c2@3 ~] [a1@2 c2@2]>")
    .sound("triangle")
)`,
  },
  {
    id: 'dnb-reese', engine: 'strudel', cat: 'Drum and bass',
    tags: ['basso', 'timbro', 'elettronica', 'drum and bass'],
    title: 'Il reese bass',
    desc: 'Il basso più famoso della drum and bass: due onde sawtooth quasi uguali, una appena più alta (0,2 semitoni). Suonate insieme «battono» e il suono ondeggia, come un motore. Il filtro che si apre e si chiude lo fa ringhiare.',
    code: `setcpm(170/4)
note("<d2!3 [f2 c2]>")
  .add(note("0,0.2"))      // due note quasi uguali, insieme
  .sound("sawtooth")
  .lpf(sine.range(200, 1200).slow(4))
  .lpq(6)
  .gain(0.6)`,
  },
  {
    id: 'dnb-liquid', engine: 'strudel', cat: 'Drum and bass',
    tags: ['strati', 'batteria', 'basso', 'accordi', 'break', 'elettronica', 'drum and bass'],
    title: 'Un brano liquid',
    desc: 'La liquid è la drum and bass più morbida: il break corre a 170 bpm, ma accordi e basso si muovono lenti, un accordo ogni due battute. Sopra il break di dnb1, uno strato di hi-hat pescati a caso dalle due cartelle.',
    code: `setcpm(170/4)
stack(
  n("0 1 2 [3 3] 4 5 6 <7 [7 7]>").s("dnb1").cut(1),
  // hi-hat a caso: | sceglie, ? a volte tace
  s("[dnb1:3|dnb1:11|xbreak1:1|xbreak1:9]*16?")
    .hpf(4000).gain(rand.range(0.1, 0.4)).pan(rand).cut(2),
  chord("<Dm9 Bb^7 Gm9 A7>").slow(2).layer(
    x => x.voicing().sound("triangle").attack(0.4).release(2)
      .room(0.7).gain(0.4),
    x => x.rootNotes(2).struct("x ~ ~ ~ ~ ~ x ~")
      .sound("sawtooth").lpf(300)
  )
)`,
  },

  {
    id: 'tk-cassa', engine: 'strudel', cat: 'Techno',
    tags: ['batteria', 'ritmo', 'break', 'elettronica', 'techno'],
    title: 'Cassa in quattro',
    desc: 'La techno nasce a Detroit negli anni ’80 ed esplode a Berlino nei ’90: macchine, ripetizione, ipnosi. Tutto parte dalla cassa su ogni battito. Qui è il segmento 0 di dnb1, suonato un po’ più lento perché sia più grave. Sopra, un hi-hat in levare e i sedicesimi di xbreak1.',
    code: `setcpm(130/4)
stack(
  s("dnb1:0*4").speed(0.85),            // cassa
  s("[~ dnb1:4]*4").hpf(6000),          // hi-hat in levare
  s("xbreak1:3*16").gain("[0.5 1]*8")   // sedicesimi, uno piano uno forte
)`,
  },
  {
    id: 'tk-toploop', engine: 'strudel', cat: 'Techno',
    tags: ['batteria', 'break', 'timbro', 'elettronica', 'techno'],
    title: 'Il break come «top loop»',
    desc: 'Un trucco dei DJ techno: sopra la cassa si mette un break intero, filtrato. hpf(3000) toglie i bassi del break, così la sua cassa non disturba la nostra e restano solo hi-hat e ghost note. A 130 bpm ogni segmento dura più del suo posto nel ciclo: cut(1) lo tronca e il break diventa secco.',
    code: `setcpm(130/4)
stack(
  s("dnb1:0*4").speed(0.85),
  n(run(16)).s("xbreak1")
    .hpf(3000)
    .cut(1)
    .gain(0.8)
)`,
  },
  {
    id: 'tk-acid', engine: 'strudel', cat: 'Techno',
    tags: ['basso', 'timbro', 'elettronica', 'techno', 'acid'],
    title: 'Acid techno',
    desc: 'La bassline acid: il suono della Roland TB-303, un’onda sawtooth con il filtro a resonance altissima (lpq). Qui il cutoff si apre lentissimo, in 16 battute: è la tensione che in pista fa alzare le braccia. shape() la sporca un po’.',
    code: `setcpm(130/4)
note("[a1 a1 a2 a1] [c2 a1 a1 g2] [a1 a2 a1 eb2] [a1 c2 a1 a2]")
  .sound("sawtooth")
  .release(0.1)
  .lpf(sine.range(300, 3000).slow(16))
  .lpq(18)
  .shape(0.3)
  .gain(0.5)`,
  },
  {
    id: 'tk-dub', engine: 'strudel', cat: 'Techno',
    tags: ['accordi', 'timbro', 'elettronica', 'techno'],
    title: 'Dub techno',
    desc: 'Un solo accordo, suonato in levare e annegato nel delay: è la dub techno nata a Berlino negli anni ’90. Il delay (un ottavo col punto, 0,36 s a 124 bpm) lo ripete all’infinito, mentre il cutoff si apre e si chiude pianissimo.',
    code: `setcpm(124/4)
stack(
  s("dnb1:0*4").speed(0.85),
  s("[~ dnb1:4]*4").hpf(6000).gain(0.6),
  chord("Cm9").voicing()
    .struct("~ x ~ ~ ~ x ~ ~")
    .sound("sawtooth")
    .release(0.2)
    .lpf(sine.range(400, 2500).slow(16))
    .delay(0.6).delaytime(0.36).delayfeedback(0.65)
    .room(0.5)
    .gain(0.4)
)`,
  },
  {
    id: 'tk-industriale', engine: 'strudel', cat: 'Techno',
    tags: ['batteria', 'break', 'timbro', 'casuale', 'elettronica', 'techno'],
    title: 'Techno industriale',
    desc: 'La techno più dura: cassa distorta (shape) e un break ridotto a rumore. crush(4) lascia al suono solo 4 bit, come una console di quarant’anni fa: sparisce il dettaglio, resta la grana. Di tanto in tanto un segmento raddoppia (ply).',
    code: `setcpm(135/4)
stack(
  s("dnb1:0*4").speed(0.75).shape(0.6),
  n(run(16)).s("dnb1")
    .crush(4)
    .hpf(1500)
    .sometimesBy(0.2, x => x.ply(2))
    .cut(1)
    .gain(0.5)
)`,
  },
  {
    id: 'tk-brano', engine: 'strudel', cat: 'Techno',
    tags: ['strati', 'batteria', 'basso', 'variazione', 'break', 'elettronica', 'techno', 'acid'],
    title: 'Un brano techno',
    desc: 'Cassa, hi-hat, top loop, bassline acid. Nella techno il brano cambia pochissimo: ogni otto battute il filtro del top loop si apre (hpf da 3000 a 200) e xbreak1 entra per intero, poi torna sottile. Lascialo girare a lungo: il filtro della 303 fa il resto.',
    code: `setcpm(130/4)
stack(
  s("dnb1:0*4").speed(0.85),
  s("[~ dnb1:4]*4").hpf(6000).gain(0.7),
  n(run(16)).s("xbreak1")
    .hpf("<3000!7 200>")
    .cut(1).gain(0.6),
  note("[a1 a1 a2 a1] [c2 a1 a1 g2] [a1 a2 a1 eb2] [a1 c2 a1 a2]")
    .sound("sawtooth").release(0.1)
    .lpf(sine.range(300, 3000).slow(16)).lpq(18)
    .gain(0.4)
)`,
  },

  {
    id: 'th-groove', engine: 'strudel', cat: 'Tech house',
    tags: ['batteria', 'ritmo', 'break', 'elettronica', 'house'],
    title: 'Il groove tech house',
    desc: 'La tech house sta a metà strada: la cassa dritta della techno, il clap e lo shuffle della house. swingBy(1/3, 8) ritarda un po’ ogni sedicesimo in levare: gli hi-hat smettono di marciare e cominciano a ballare.',
    code: `setcpm(125/4)
stack(
  s("dnb1:0*4").speed(0.85),          // cassa
  s("~ cp ~ cp"),                     // clap sul 2 e sul 4
  s("[~ dnb1:4]*4").hpf(6000),        // hi-hat in levare
  s("xbreak1:3*16")                   // sedicesimi…
    .gain("[0.4 0.8]*8")
    .swingBy(1/3, 8)                  // …in shuffle
)`,
  },
  {
    id: 'th-basso', engine: 'strudel', cat: 'Tech house',
    tags: ['basso', 'ritmo', 'elettronica', 'house'],
    title: 'Il rolling bass',
    desc: 'La bassline della tech house quasi non tocca mai il battito: suona fra un colpo di cassa e l’altro, così i due non si pestano i piedi. Note corte (release), il cutoff basso e lo stesso shuffle degli hi-hat.',
    code: `setcpm(125/4)
note("[~ a1 ~ a1] [~ a1 c2 ~] [~ a1 ~ a1] [~ g1 a1 ~]")
  .sound("sawtooth")
  .lpf(500)
  .release(0.12)
  .swingBy(1/3, 8)`,
  },
  {
    id: 'th-perc', engine: 'strudel', cat: 'Tech house',
    tags: ['batteria', 'break', 'casuale', 'elettronica', 'house'],
    title: 'Percussioni dal break',
    desc: 'Dal break si prendono solo hi-hat e ghost note (i segmenti leggeri di xbreak1), pescati a caso e filtrati: diventano uno shaker che non si ripete mai uguale. degradeBy(0.4) ne fa tacere quasi metà. Sotto, due colpi di perc a fare da bonghi.',
    code: `setcpm(125/4)
stack(
  s("dnb1:0*4").speed(0.85),
  n("[1|3|4|6|9|12|15]*16").s("xbreak1")
    .degradeBy(0.4)
    .hpf(2500)
    .gain(rand.range(0.3, 0.7))
    .pan(rand)
    .swingBy(1/3, 8)
    .cut(1),
  s("~ perc:1 ~ ~ perc:2 ~ ~ perc:1").gain(0.6)
)`,
  },
  {
    id: 'th-stab', engine: 'strudel', cat: 'Tech house',
    tags: ['accordi', 'timbro', 'elettronica', 'house'],
    title: 'Lo stab',
    desc: 'Uno «stab» è un accordo cortissimo, una pugnalata. Qui La minore nona, in due ritmi che si alternano battuta per battuta, con un po’ di delay (un ottavo col punto: 0,36 s a 125 bpm) e di reverb.',
    code: `setcpm(125/4)
chord("Am9").voicing()
  .struct("<[~ ~ x ~ ~ x ~ ~] [~ x ~ ~ ~ ~ x ~]>")
  .sound("square")
  .lpf(1800)
  .release(0.15)
  .delay(0.3).delaytime(0.36)
  .room(0.4)
  .gain(0.4)`,
  },
  {
    id: 'th-brano', engine: 'strudel', cat: 'Tech house',
    tags: ['strati', 'batteria', 'basso', 'variazione', 'break', 'elettronica', 'house'],
    title: 'Un brano tech house',
    desc: 'Groove, basso, percussioni e stab insieme. mask("<1!7 0>") spegne cassa e basso nell’ottava battuta: un breakdown lampo che fa desiderare il drop, quando la cassa riparte sulla battuta dopo. È il trucco più vecchio della pista.',
    code: `setcpm(125/4)
stack(
  s("dnb1:0*4").speed(0.85).mask("<1!7 0>"),
  s("~ cp ~ cp"),
  s("[~ dnb1:4]*4").hpf(6000),
  n("[1|3|4|6|9|12|15]*16").s("xbreak1")
    .degradeBy(0.4).hpf(2500).gain(rand.range(0.2, 0.5))
    .pan(rand).swingBy(1/3, 8).cut(1),
  note("[~ a1 ~ a1] [~ a1 c2 ~] [~ a1 ~ a1] [~ g1 a1 ~]")
    .sound("sawtooth").lpf(500).release(0.12)
    .swingBy(1/3, 8).mask("<1!7 0>"),
  chord("Am9").voicing()
    .struct("<[~ ~ x ~ ~ x ~ ~] [~ x ~ ~ ~ ~ x ~]>")
    .sound("square").lpf(1800).release(0.15)
    .delay(0.3).delaytime(0.36).gain(0.3)
)`,
  },

  /* IDM: il tutorial Beat IDM insegna il break rimontato, i roll e il
     glitch; questi esempi mostrano altre strade dello stesso genere. */
  {
    id: 'idm-dadi', engine: 'strudel', cat: 'IDM',
    tags: ['batteria', 'break', 'casuale', 'elettronica', 'idm'],
    title: 'Il break ai dadi',
    desc: 'irand(16) tira un dado da 16 facce: ogni sedicesimo suona un segmento a caso di xbreak1. Il caso puro però non ha forma. ribbon(7, 2) prende due battute di caso e le ripete in loop: il ritmo diventa un disegno riconoscibile. Cambia il 7 per pescarne altre due.',
    code: `setcpm(85/4)
n(irand(16).segment(16))
  .s("xbreak1")
  .ribbon(7, 2)
  .cut(1)`,
  },
  {
    id: 'idm-drill', engine: 'strudel', cat: 'IDM',
    tags: ['batteria', 'break', 'variazione', 'elettronica', 'idm', 'drum and bass'],
    title: 'Drill ’n’ bass',
    desc: 'A metà anni ’90 Aphex Twin e Squarepusher prendono la drum and bass e la esagerano: roll da 8 e 16 colpi dentro un solo ottavo. ply() ripete ogni segmento tante volte quanto dice il numero, e il numero cambia a ogni battuta. Nell’ultima il roll sale anche di tono.',
    code: `setcpm(170/4)
n("0 1 2 3 4 5 6 7")
  .s("dnb1")
  .ply(\`<
    [1 1 1 1 1 1 1 4] [1 1 2 1 1 1 1 8]
    [1 1 1 4 1 1 2 1] [1 1 1 1 1 1 8 16]
  >\`)
  .speed("<1 1 1 [1 1 1 1 1 1 1.5 2]>")
  .cut(1)`,
  },
  {
    id: 'idm-poliritmo', engine: 'strudel', cat: 'IDM',
    tags: ['batteria', 'ritmo', 'break', 'strati', 'elettronica', 'idm'],
    title: 'Tre giri che non si incontrano',
    desc: 'Tre voci su una griglia di 16 sedicesimi, ma ognuna gira sulla sua lunghezza: la cassa ogni 5 passi, il rullante ogni 7, gli hi-hat ogni 3. Le graffe { }%16 fanno proprio questo. I tre giri tornano ad allinearsi solo dopo 105 passi: il ritmo sembra cambiare sempre, anche se nessuna voce cambia mai.',
    code: `setcpm(95/4)
stack(
  n("{0 ~ ~ 8 ~}%16").s("xbreak1"),          // cassa: giro di 5
  n("{~ ~ 2 ~ ~ ~ 10}%16").s("dnb1"),        // rullante: giro di 7
  n("{3 6 9}%16").s("xbreak1")               // hi-hat: giro di 3
    .gain(0.5).pan(sine.slow(4))
)`,
  },
  {
    id: 'idm-nastro', engine: 'strudel', cat: 'IDM',
    tags: ['batteria', 'break', 'accordi', 'timbro', 'strati', 'elettronica', 'idm'],
    title: 'Nastro consumato',
    desc: 'L’altra faccia della IDM, quella dei Boards of Canada: lenta, nostalgica, come una vecchia cassetta. Il break al suo tempo originale, scurito (lpf) e sgranato (crush). Il pad ondeggia di altezza con vib e vibmod: è il «wow» di un nastro che rallenta e riprende.',
    code: `setcpm(85/4)
stack(
  n(run(16)).s("xbreak1")
    .lpf(2000)
    .crush(8),
  chord("<F^7 Em7>").slow(2).voicing()
    .sound("sawtooth")
    .attack(0.5).release(2)
    .lpf(900)
    .vib(0.7).vibmod(0.2)     // l'altezza ondeggia piano
    .room(0.6)
    .gain(0.4)
)`,
  },
  {
    id: 'idm-acid', engine: 'strudel', cat: 'IDM',
    tags: ['basso', 'casuale', 'break', 'strati', 'elettronica', 'idm', 'acid'],
    title: 'Acid a caso',
    desc: 'Una 303 che improvvisa: irand(8) sceglie le note fra quelle della pentatonica di La minore, quindi non stona mai. perlin è un caso «morbido», che scivola invece di saltare: muove il cutoff come una mano sulla manopola. Sotto, dnb1 con un roll nell’ultima battuta.',
    code: `setcpm(140/4)
stack(
  n(irand(8).segment(16))
    .scale("A1:minor:pentatonic")
    .sound("sawtooth")
    .release(0.1)
    .lpf(perlin.range(300, 3000).slow(2))
    .lpq(15)
    .gain(0.5),
  n("0 1 2 3 4 5 6 7").s("dnb1")
    .ply("<1 1 1 [1 1 1 1 1 1 4 8]>")
    .cut(1)
)`,
  },
];

/* Categorie in ordine di presentazione, per motore */
const SNIPPET_CATS = {
  hydra:   ['Base', 'Trasformazioni', 'Colore', 'Combinazioni', 'Feedback',
            'Camera e suono'],
  strudel: ['Base', 'Ritmo', 'Melodia', 'Suono', 'Struttura',
            'Teoria', 'Giri di accordi', 'Cover',
            'Italo disco', 'Techno', 'Tech house', 'Drum and bass', 'IDM'],
};

/* Etichette per motore, come quelle del pannello SUONI: tagliano le
   categorie di traverso («tutti gli esempi con l'eco», «tutto il jazz»).
   Ordine = ordine dei bottoni; la seconda voce finisce nel data-help.
   Un'etichetta usata in `tags` ma assente qui non diventa un bottone. */
const SNIPPET_TAGS = {
  hydra: [
    ['primi passi', 'Gli esempi da cui partire: una sorgente sola, pochi numeri da cambiare.'],
    ['forme',       'Poligoni e cerchi disegnati con shape().'],
    ['onde',        'Strisce di colore che scorrono, generate da osc().'],
    ['colore',      'Tinte, canali rosso-verde-blu, negativi e arcobaleni.'],
    ['movimento',   'L\'immagine si muove da sola: gira, scorre, cambia nel tempo.'],
    ['organico',    'Forme morbide e irregolari, come nuvole, fumo o liquidi.'],
    ['simmetria',   'Specchi e ripetizioni: caleidoscopi e griglie di copie.'],
    ['deformare',   'L\'immagine si piega, si sgrana o si sposta pixel per pixel.'],
    ['mescolare',   'Due sorgenti combinate in una: fuse, sottratte, ritagliate.'],
    ['eco',         'Feedback: l\'uscita rientra nella catena e lascia scie, tunnel, frattali.'],
    ['webcam',      'Usa la webcam: il browser chiede il permesso la prima volta.'],
    ['microfono',   'Reagisce al suono: serve 🎤 MIC acceso nella barra in alto.'],
    ['schermo',     'Cattura una finestra del computer e la usa come immagine.'],
    ['mouse',       'Si disegna muovendo il mouse sullo schermo.'],
  ],
  strudel: [
    ['primi passi', 'Gli esempi da cui partire: una riga sola, un\'idea sola.'],
    ['batteria',    'Ritmi con i campioni di batteria: cassa, rullante, hi-hat, clap.'],
    ['ritmo',       'Come si dividono e si ripetono i battiti.'],
    ['melodia',     'Una linea di note da cantare.'],
    ['scale',       'Le note fra cui scegliere: maggiore, minore, pentatonica, modi.'],
    ['accordi',     'Più note suonate insieme, e come si susseguono.'],
    ['arpeggio',    'Le note di un accordo suonate una alla volta.'],
    ['basso',       'La linea grave che regge l\'armonia.'],
    ['strati',      'Più parti che suonano insieme: batteria, basso, accordi, melodia.'],
    ['timbro',      'Come suona una nota: filtro, envelope, reverb, delay, volume.'],
    ['variazione',  'Il pattern cambia da un ciclo all\'altro.'],
    ['casuale',     'Una parte la decide il caso: ogni ascolto è un po\' diverso.'],
    ['break',       'Un break di batteria tagliato in segmenti (xbreak1, dnb1) e rimontato.'],
    // da qui in giù i generi: accesi insieme a un'etichetta di sopra
    // («techno» + «basso») trovano un ingrediente di un genere
    ['pop',         'I giri di accordi della musica pop.'],
    ['rock',        'Il ritmo di base del rock.'],
    ['blues',       'Il blues e le sue scale.'],
    ['jazz',        'Accordi di settima e cadenze del jazz.'],
    ['classica',    'Brani e armonie della musica classica.'],
    ['popolare',    'Canti tradizionali e musiche popolari.'],
    ['elettronica', 'Tutti i generi della musica elettronica insieme: dall\'italo disco alla IDM.'],
    ['italo disco', 'La dance italiana dei primi anni \'80: bassi a ottave, arpeggi, synth malinconici.'],
    ['house',       'Cassa in quattro e clap: house e tech house, dai club di Chicago in poi.'],
    ['techno',      'Detroit e Berlino: cassa in quattro, ripetizione, macchine.'],
    ['acid',        'Il suono della Roland TB-303: una bassline con tanta resonance che «squittisce».'],
    ['drum and bass', 'Break velocissimi a 170 bpm e bassi profondi, jungle compresa.'],
    ['idm',         'La IDM alla Aphex Twin: break smontati, roll, caos controllato, melodie fragili.'],
  ],
};

/* ── Esempi salvati dall'utente (persistiti in localStorage) ───────────── */
const UserSnippets = (() => {
  const KEY = 'livelab-user-snippets-v1';
  let items = [];
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (Array.isArray(raw)) {
      items = raw.filter(s => s && (s.engine === 'hydra' || s.engine === 'strudel')
        && typeof s.code === 'string');
    }
  } catch (_) {}

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (_) {}
  }

  return {
    /** Esempi salvati, opzionalmente filtrati per motore (i più recenti prima). */
    list: engine => items.filter(s => !engine || s.engine === engine),
    add(engine, code, title) {
      const sn = {
        id: 'u-' + Date.now(),
        engine,
        title: title || 'senza titolo',
        desc: 'Esempio salvato da te.',
        code,
      };
      items.unshift(sn);
      save();
      return sn;
    },
    remove(id) {
      const i = items.findIndex(s => s.id === id);
      if (i !== -1) { items.splice(i, 1); save(); }
    },
  };
})();
