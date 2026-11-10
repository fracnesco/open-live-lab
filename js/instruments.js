/* ════════════════════════════════════════════════════════════════════════
   INSTRUMENTS — strumenti sintetici fatti qui, non da Strudel

   Strudel porta solo oscillatori nudi (sine, sawtooth…) e i suoi strumenti
   veri (gm_*) sono soundfont scaricati dalla rete: qui non ci sono. Questi
   quattro si costruiscono al momento con la Web Audio, senza file:
   · guitar — una corda pizzicata (Karplus-Strong): un colpo di rumore che
     gira in un anello lungo un periodo e a ogni giro perde gli acuti;
   · epiano — un piano elettrico in FM: un'onda che ne fa vibrare un'altra,
     forte sull'attacco (il «bark») e poi sempre più morbida;
   · organ  — un organo a registri: più onde intonate sommate, come i tiranti
     di un Hammond, con un filo di chorus;
   · bell   — una campana in FM, con un rapporto non intero: gli armonici
     stonati sono quello che fa «campana».

   Si registrano in Strudel con registerSound (engines.js li chiama nel
   prebake), quindi valgono come s("sawtooth"): note("c3 e3 g3").s("guitar"),
   con .lpf, .room, .pan e tutta la catena di superdough dopo di loro.

   Ogni `build(ctx, t, value)` usa SOLO il contesto che riceve: così lo
   stesso strumento suona dal vivo e si disegna in un OfflineAudioContext
   (render(), per il pannello SUONI). Restituisce { node, sources, end }.

   Chitarra e campana risuonano da sole finché si spengono, come un campione:
   .clip(1) le taglia alla durata della nota. Piano e organo invece tengono
   la nota quanto dura, e .attack() / .release() ne cambiano l'inviluppo.
   ════════════════════════════════════════════════════════════════════════ */

const Instruments = (() => {

  const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
  const freqOf = v => strudel.getFrequencyFromValue(v);      // note/freq/octave come i synth di Strudel; senza nota: do2
  const osc = (ctx, frequency, type = 'sine') => new OscillatorNode(ctx, { frequency, type });
  const gain = (ctx, value) => new GainNode(ctx, { gain: value });

  /** Dove un suono che risuona da solo si ferma: alla sua fine naturale,
      o prima con .clip(x) — x volte la durata della nota. */
  const cutAt = (t, v, natural) => v.clip != null ? Math.min(t + natural, t + v.clip * v.duration) : t + natural;

  /* ── guitar: Karplus-Strong, calcolato in JS in un buffer ─────────────── */
  /* L'anello si calcola su un array, non con un DelayNode in retroazione:
     in un anello la Web Audio non scende sotto i 128 campioni di ritardo,
     cioè niente note sopra i ~370 Hz. Il buffer di una nota si tiene
     (fino a MAX_CACHED): una melodia ne usa poche, e ricalcolarle a ogni
     colpo butterebbe via un megabyte per nota. */
  const MAX_CACHED = 40;
  const strings = new Map();     // "sampleRate:freq" → AudioBuffer

  function stringBuffer(sampleRate, freq) {
    const key = `${sampleRate}:${freq.toFixed(2)}`;
    if (strings.has(key)) return strings.get(key);
    const ring = clamp(3 * Math.sqrt(110 / freq), 0.5, 4);   // s per -60 dB: le corde gravi risuonano di più
    const len = Math.ceil(sampleRate * ring);
    const out = new Float32Array(len);
    // la media fra due campioni ritarda di mezzo campione: l'anello deve durare esattamente un periodo
    const D = Math.max(2, sampleRate / freq - 0.5), d0 = Math.floor(D), fr = D - d0;
    const loss = Math.pow(0.001, 1 / (freq * ring));           // quanto perde a ogni giro
    // il colpo: rumore lungo un periodo, ammorbidito (un plettro, non una lama),
    // meno una sua copia spostata (pizzicata vicino al ponte), senza continua
    const P = d0 + 2, shift = Math.max(1, Math.round(P * 0.13));
    const pick = new Float32Array(P);
    let lp = 0;
    for (let i = 0; i < P; i++) { lp += 0.55 * (Math.random() * 2 - 1 - lp); pick[i] = lp; }
    let mean = 0;
    for (let i = 0; i < P; i++) { out[i] = pick[i] - (i >= shift ? pick[i - shift] : 0); mean += out[i]; }
    mean /= P;
    for (let i = 0; i < P; i++) out[i] -= mean;
    for (let n = P; n < len; n++) {
      const a = out[n - d0] * (1 - fr) + out[n - d0 - 1] * fr;       // y[n-D]
      const b = out[n - d0 - 1] * (1 - fr) + out[n - d0 - 2] * fr;   // y[n-D-1]
      out[n] = loss * 0.5 * (a + b);
    }
    let top = 0;
    for (let i = 0; i < len; i++) top = Math.max(top, Math.abs(out[i]));
    const k = top ? 0.4 / top : 0, fade = Math.min(len, Math.round(sampleRate * 0.03));
    for (let i = 0; i < len; i++) out[i] *= k * Math.min(1, (len - i) / fade);
    const buffer = new AudioBuffer({ length: len, sampleRate, numberOfChannels: 1 });
    buffer.copyToChannel(out, 0);
    if (strings.size >= MAX_CACHED) strings.delete(strings.keys().next().value);   // via la più vecchia
    strings.set(key, buffer);
    return buffer;
  }

  function guitar(ctx, t, v) {
    const buffer = stringBuffer(ctx.sampleRate, freqOf(v));
    const src = new AudioBufferSourceNode(ctx, { buffer });
    const amp = gain(ctx, 1);
    const end = cutAt(t, v, buffer.duration);
    amp.gain.setTargetAtTime(0, end - 0.03, 0.01);
    src.connect(amp);
    src.start(t);
    src.stop(end + 0.05);
    return { node: amp, sources: [src], end };
  }

  /* ── epiano: FM a due modulatori ─────────────────────────────────────── */
  function epiano(ctx, t, v) {
    const f = freqOf(v);
    const attack = v.attack ?? 0.002, release = v.release ?? 0.3;
    const end = Math.max(t + v.duration, t + attack);          // una nota più corta dell'attacco lo finisce comunque
    const car = osc(ctx, f), mod = osc(ctx, f), tine = osc(ctx, f * 14);
    const depth = gain(ctx, 0), tineDepth = gain(ctx, 0);
    // l'indice di modulazione parte alto e cala: l'attacco ringhia, poi il suono si arrotonda
    depth.gain.setValueAtTime(f * 1.6, t);
    depth.gain.setTargetAtTime(f * 0.25, t, 0.35);
    // il «tine», la lamella del Rhodes: un tintinnio acuto che dura un attimo
    tineDepth.gain.setValueAtTime(f * 0.9, t);
    tineDepth.gain.setTargetAtTime(0, t, 0.02);
    mod.connect(depth).connect(car.frequency);
    tine.connect(tineDepth).connect(car.frequency);
    const amp = gain(ctx, 0);
    amp.gain.setValueAtTime(0, t);
    amp.gain.linearRampToValueAtTime(0.35, t + attack);
    amp.gain.setTargetAtTime(0, t + attack, clamp(1.6 * Math.sqrt(262 / f), 0.4, 3));  // le note gravi durano di più
    amp.gain.setTargetAtTime(0, end, release / 5);                                        // il tasto si alza
    car.connect(amp);
    const stop = end + release + 0.05;
    for (const o of [car, mod, tine]) { o.start(t); o.stop(stop); }
    return { node: amp, sources: [car, mod, tine], end: stop };
  }

  /* ── organ: tiranti sommati in una PeriodicWave ──────────────────────── */
  /* L'onda parte un'ottava SOTTO la nota (il tirante da 16'), così anche il
     5⅓' — la quinta sopra la nota — è un armonico intero dell'onda.
     Armonico: 1 = 16', 2 = 8' (la nota), 3 = 5⅓', 4 = 4', 6 = 2⅔', 8 = 2'. */
  const DRAWBARS = { 1: 0.5, 2: 1, 3: 0.7, 4: 0.5, 6: 0.2, 8: 0.25 };
  const organWaves = new WeakMap();   // ctx → PeriodicWave: appartiene al contesto che la crea
  function organWave(ctx) {
    if (!organWaves.has(ctx)) {
      const real = new Float32Array(17), imag = new Float32Array(17);
      for (const [h, a] of Object.entries(DRAWBARS)) imag[h] = a;
      organWaves.set(ctx, ctx.createPeriodicWave(real, imag));
    }
    return organWaves.get(ctx);
  }

  function organ(ctx, t, v) {
    const f = freqOf(v);
    const attack = v.attack ?? 0.008, release = v.release ?? 0.08;
    const end = Math.max(t + v.duration, t + attack);
    const periodicWave = organWave(ctx);
    // due canne appena scordate (6 cent): il battimento lento è il chorus
    const pipes = [0, 6].map(detune => new OscillatorNode(ctx, { periodicWave, frequency: f / 2, detune }));
    const amp = gain(ctx, 0);
    amp.gain.setValueAtTime(0, t);
    amp.gain.linearRampToValueAtTime(0.14, t + attack);
    amp.gain.setTargetAtTime(0, end, release / 5);
    const stop = end + release + 0.05;
    for (const p of pipes) { p.connect(amp); p.start(t); p.stop(stop); }
    return { node: amp, sources: pipes, end: stop };
  }

  /* ── bell: FM con rapporto 1 : 1,4 (la campana di Chowning) ──────────── */
  function bell(ctx, t, v) {
    const f = freqOf(v);
    const ring = clamp(5 * Math.sqrt(262 / f), 1.5, 6);
    const end = cutAt(t, v, ring);
    const car = osc(ctx, f), mod = osc(ctx, f * 1.4), depth = gain(ctx, 0);
    // gli armonici stonati si spengono prima della fondamentale: il colpo è metallico, la coda pura
    depth.gain.setValueAtTime(f * 1.4 * 4, t);
    depth.gain.setTargetAtTime(0, t, ring / 5);
    mod.connect(depth).connect(car.frequency);
    const amp = gain(ctx, 0);
    amp.gain.setValueAtTime(0, t);
    amp.gain.linearRampToValueAtTime(0.3, t + 0.002);
    amp.gain.setTargetAtTime(0, t + 0.002, ring / 6.9);
    amp.gain.setTargetAtTime(0, end - 0.03, 0.01);
    car.connect(amp);
    for (const o of [car, mod]) { o.start(t); o.stop(end + 0.05); }
    return { node: amp, sources: [car, mod], end };
  }

  const BUILD = { guitar, epiano, organ, bell };
  const NAMES = Object.keys(BUILD);

  /** In Strudel, accanto ai suoi synth. Il gestore riceve (tempo, valore,
      fine) e restituisce il nodo da agganciare alla catena di superdough e
      come fermarlo (lo usa il limite di polifonia). `onended` va chiamato
      quando tutto ha finito di suonare: Strudel conta così le voci vive. */
  function register() {
    for (const name of NAMES) {
      strudel.registerSound(name, (t, value, onended) => {
        const { node, sources } = BUILD[name](strudel.getAudioContext(), t, value);
        let left = sources.length;
        for (const s of sources) s.onended = () => {
          if (--left) return;
          node.disconnect();
          onended();
        };
        return { node, stop: time => sources.forEach(s => { try { s.stop(time); } catch (_) {} }) };
      }, { type: 'synth', prebake: true });
    }
  }

  /** Lo strumento suonato in silenzio, per disegnarlo: `value` come in un
      pattern ({ note: 'c4' }), `duration` la durata della nota in secondi. */
  async function render(name, value, duration) {
    const sampleRate = 22050;               // basta per una forma d'onda da 160 colonne
    const probe = new OfflineAudioContext(1, 1, sampleRate);
    const { end } = BUILD[name](probe, 0, { ...value, duration });   // solo per sapere quanto dura
    const ctx = new OfflineAudioContext(1, Math.ceil(sampleRate * Math.min(end + 0.05, 8)), sampleRate);
    BUILD[name](ctx, 0, { ...value, duration }).node.connect(ctx.destination);
    return ctx.startRendering();
  }

  return { NAMES, register, render };
})();
