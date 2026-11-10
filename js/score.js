/* ════════════════════════════════════════════════════════════════════════
   SCORE — da eventi Strudel a notazione musicale (testo ABC)

   Modulo PURO: niente DOM, niente Strudel, niente abcjs. Riceve gli eventi
   («hap») che un pattern produce interrogandolo, e restituisce una stringa
   in notazione ABC, che js/scoreview.js fa disegnare ad abcjs. Così gira
   anche in Node: `node --test test/score.test.js` lo prova su eventi veri catturati
   dall'app (test/fixtures/haps.json).

   Le convenzioni:
   · 1 ciclo di Strudel = 1 battuta in 4/4. Unità ABC: la semicroma (L:1/16),
     quindi una battuta vale 16 unità.
   · I tempi sono FRAZIONI ESATTE, mai numeri con la virgola: "bd hh sd" sono
     terzi di battuta, e 1/3 in virgola mobile non torna mai. Le terzine, le
     quintine e le settimine escono da qui, non da un arrotondamento.
   · Note con `note`/`freq` → pentagramma; suoni senza altezza (bd, hh…) →
     rigo di percussioni.
   · Le parti si riconoscono dal codice (opts.code): ogni `$:` e ogni
     argomento di stack(…) è una parte. Con una melodia e un accompagnamento
     lo spartito è quello per canto e pianoforte: melodia sola in alto,
     accompagnamento sotto su un doppio rigo. Dentro una parte, le voci si
     deducono dalle sovrapposizioni.
   · Non lancia MAI eccezioni per un pattern strano: una battuta troppo
     intricata viene approssimata alla semicroma, e lo dice negli avvisi.
   ════════════════════════════════════════════════════════════════════════ */

const Score = (() => {

  /* Le frasi degli avvisi passano da _t (js/i18n.js). In Node (test) I18N
     non c'è: restano in italiano, con i segnaposto riempiti. */
  const _t = (s, p) => (typeof I18N !== 'undefined' ? I18N.t(s, p)
    : p ? s.replace(/\{(\w+)\}/g, (m, k) => (k in p ? p[k] : m)) : s);

  const UNITS = 16;            // semicrome per battuta
  const MAX_PITCHED = 4;       // voci intonate rappresentabili
  const MAX_TUPLET = 9;        // gruppi irregolari fino alla nonina

  /* ── frazioni esatte ───────────────────────────────────────────────── */
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  const F = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); return { n: n / g, d: d / g }; };
  const add = (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d);
  const sub = (a, b) => F(a.n * b.d - b.n * a.d, a.d * b.d);
  const mul = (a, b) => F(a.n * b.n, a.d * b.d);
  const div = (a, b) => F(a.n * b.d, a.d * b.n);
  const cmp = (a, b) => a.n * b.d - b.n * a.d;
  const eq  = (a, b) => a.n === b.n && a.d === b.d;
  const val = a => a.n / a.d;
  const isPow2 = x => x > 0 && (x & (x - 1)) === 0;
  const lcm = (a, b) => a / gcd(a, b) * b;
  const ZERO = F(0), ONE = F(1), HALF = F(1, 2);

  /** Un tempo di Strudel → frazione. Accetta la Fraction viva ({s,n,d}, con
      BigInt), la sua copia JSON, o un numero. */
  function toF(x) {
    if (x == null) return null;
    if (typeof x === 'number') return F(Math.round(x * 960), 960);
    if (typeof x === 'object' && 'n' in x && 'd' in x) {
      const s = 's' in x ? Number(x.s) : 1;
      const n = Number(x.n), d = Number(x.d);
      if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) return null;
      if (n > 1e9 || d > 1e6) return F(Math.round(s * n / d * 960), 960);   // frazioni mostruose: si approssima
      return F((s < 0 ? -1 : 1) * n, d);
    }
    if (typeof x.valueOf === 'function') return toF(Number(x.valueOf()));
    return null;
  }

  /* ── altezze ───────────────────────────────────────────────────────── */
  const SEMI = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
  const SHARP_NAMES = [['c', 0], ['c', 1], ['d', 0], ['d', 1], ['e', 0], ['f', 0],
                       ['f', 1], ['g', 0], ['g', 1], ['a', 0], ['a', 1], ['b', 0]];

  /** "c4", "Bb3", "f#4", "eb" (ottava 3, come Strudel) o numero MIDI →
      { letter, acc, oct, midi } — oppure null. */
  function parsePitch(p) {
    if (typeof p === 'number' && Number.isFinite(p)) {
      const m = Math.round(p);
      const [letter, acc] = SHARP_NAMES[((m % 12) + 12) % 12];
      return { letter, acc, oct: Math.floor(m / 12) - 1, midi: m, rounded: m !== p };
    }
    if (typeof p !== 'string') return null;
    const s = p.trim();
    if (/^-?\d+(\.\d+)?$/.test(s)) return parsePitch(Number(s));
    const m = /^([a-gA-G])([#bsf]*)(-?\d+)?$/.exec(s);
    if (!m) return null;
    const letter = m[1].toLowerCase();
    let acc = 0;
    for (const ch of m[2]) acc += (ch === '#' || ch === 's') ? 1 : -1;
    const oct = m[3] === undefined ? 3 : Number(m[3]);
    return { letter, acc, oct, midi: (oct + 1) * 12 + SEMI[letter] + acc };
  }

  /** Altezza → testo ABC. `state` ricorda le alterazioni già scritte nella
      battuta (in ABC valgono fino alla stanghetta), così non si ripetono e
      un bequadro compare solo quando serve. */
  function abcPitch(p, state) {
    const key = p.letter + p.oct;
    const cur = state[key] || 0;
    let out = '';
    if (p.acc !== cur) {
      out = p.acc > 0 ? '^'.repeat(p.acc) : p.acc < 0 ? '_'.repeat(-p.acc) : '=';
      state[key] = p.acc;
    }
    if (p.oct >= 5) out += p.letter + "'".repeat(p.oct - 5);
    else out += p.letter.toUpperCase() + ','.repeat(4 - p.oct);
    return out;
  }

  /* ── percussioni: suono → posizione sul rigo ───────────────────────────
     Le posizioni seguono l'uso della batteria: cassa in basso, rullante al
     centro, piatti in alto con la testa a ×. I suoni che non sono batteria
     stanno sulla linea centrale. */
  const PERC = {
    bd: ['F', false], sd: ['c', false], sn: ['c', false], cp: ['c', true],
    hh: ['g', true],  lt: ['A', false], mt: ['d', false], ht: ['e', false],
    perc: ['B', true],
  };
  const percPos = s => PERC[s] || ['B', false];

  /* ── durate scrivibili ─────────────────────────────────────────────── */
  /** Scompone una durata (in quarti di unità, intero) in valori scrivibili
      con una sola figura: 2^a (semplice) o 3·2^a (col punto). */
  function decompose(q) {
    const out = [];
    while (q > 0) {
      let best = 1;
      for (let v = 1; v <= q; v *= 2) { best = Math.max(best, v); if (v * 3 / 2 <= q && Number.isInteger(v * 3 / 2)) best = Math.max(best, v * 3 / 2); }
      out.push(best); q -= best;
    }
    return out;
  }
  /** Durata in unità (frazione) → suffisso ABC: "" per 1, "4", "3/2", "/2". */
  function durText(f) {
    if (f.d === 1) return f.n === 1 ? '' : String(f.n);
    return (f.n === 1 ? '' : f.n) + '/' + f.d;
  }

  class TooFine extends Error {}

  /* ── una battuta di una voce → testo ABC ───────────────────────────── */
  /** items: [{b, e, kind:'note'|'rest', ev, tie}] che coprono [0,1) senza
      buchi. ctx: { accState, restChar, noteText(ev, state) }. */
  function renderBar(items, ctx) {
    // Una nota che parte fuori dal battere e scavalca metà battuta si spezza
    // lì con una legatura: si legge meglio, e i tempi forti restano visibili.
    // Vale solo per i ritmi binari: spezzare a metà una terzina che copre la
    // battuta ("c4 e4 g4") la distruggerebbe.
    const binary = items.every(it => isPow2(it.b.d) && isPow2(it.e.d));
    const pre = [];
    for (const it of items) {
      const offBeat = mul(it.b, F(4)).d !== 1;
      if (binary && it.kind === 'note' && offBeat && cmp(it.b, HALF) < 0 && cmp(it.e, HALF) > 0) {
        pre.push({ ...it, e: HALF, tie: true }, { ...it, b: HALF });
      } else pre.push(it);
    }
    const st = { pos: ZERO, out: '' };
    renderSpan(pre, ZERO, ONE, ctx, st, 0);
    return st.out.trim();
  }

  function splitAt(items, t) {
    const L = [], R = [];
    for (const it of items) {
      if (cmp(it.e, t) <= 0) L.push(it);
      else if (cmp(it.b, t) >= 0) R.push(it);
      else { L.push({ ...it, e: t, tie: it.kind === 'note' ? true : it.tie }); R.push({ ...it, b: t }); }
    }
    return [L, R];
  }

  /** I punti di taglio interni allo span, relativi allo span (0..1). */
  function relBounds(items, a, b) {
    const len = sub(b, a), out = [];
    for (const it of items) for (const t of [it.b, it.e])
      if (cmp(t, a) > 0 && cmp(t, b) < 0) out.push(div(sub(t, a), len));
    return out;
  }
  const allDyadic = bounds => bounds.every(f => isPow2(f.d));

  function renderSpan(items, a, b, ctx, st, depth) {
    if (!items.length) return;
    if (depth > 8) throw new TooFine();
    const spanUnits = mul(sub(b, a), F(UNITS));
    const bounds = relBounds(items, a, b);

    if (allDyadic(bounds)) { emitPlain(items, ctx, st); return; }

    // Non è binario: c'è un gruppo irregolare. Prima si prova a isolarlo
    // dividendo a metà (una terzina dentro un quarto resta nel suo quarto);
    // se dividere non aiuta, il gruppo irregolare copre tutto lo span.
    const mid = add(a, mul(sub(b, a), HALF));
    const [L, R] = splitAt(items, mid);
    const midIsBoundary = items.some(it => eq(it.b, mid) || eq(it.e, mid));
    const helps = midIsBoundary || allDyadic(relBounds(L, a, mid)) || allDyadic(relBounds(R, mid, b));
    if (helps && cmp(spanUnits, F(1)) > 0) {
      renderSpan(L, a, mid, ctx, st, depth + 1);
      renderSpan(R, mid, b, ctx, st, depth + 1);
      return;
    }

    // gruppo irregolare: D = 2^k · m caselle, m dispari = il «numero» del gruppo
    let D = 1;
    for (const f of bounds) { D = lcm(D, f.d); if (D > 4096) throw new TooFine(); }
    let m = D, k = 0;
    while (m % 2 === 0) { m /= 2; k++; }
    if (m > MAX_TUPLET) throw new TooFine();
    let q = 1; while (q * 2 < m) q *= 2;                 // 3→2, 5→4, 7→4, 9→8
    const slot = div(spanUnits, F(q * (1 << k)));         // valore scritto di una casella
    if (slot.d > 4) throw new TooFine();
    const len = sub(b, a);
    const written = [];
    for (const it of items) {
      const g = mul(div(sub(it.e, it.b), len), F(D));     // caselle occupate (intero)
      if (g.d !== 1) throw new TooFine();
      const parts = decompose(g.n);
      parts.forEach((p, i) => written.push({ it, dur: mul(slot, F(p)), last: i === parts.length - 1 }));
    }
    st.out += ` (${m}:${q}:${written.length}`;
    for (const w of written) st.out += element(w.it, w.dur, w.last, ctx);
    st.out += ' ';
    st.pos = add(st.pos, spanUnits);
  }

  function emitPlain(items, ctx, st) {
    for (const it of items) {
      const units = mul(sub(it.e, it.b), F(UNITS));
      if (!isPow2(units.d) || units.d > 4) throw new TooFine();
      const parts = decompose(units.n * (4 / units.d));
      parts.forEach((p, i) => {
        const dur = F(p, 4);
        st.out += element(it, dur, i === parts.length - 1, ctx);
        st.pos = add(st.pos, dur);
        if (st.pos.d === 1 && st.pos.n % 4 === 0) st.out += ' ';   // a capo di movimento: spezza le travature
      });
    }
  }

  /** Un elemento scritto: nota/accordo o pausa, con durata ed eventuale legatura. */
  function element(it, dur, isLast, ctx) {
    if (it.kind === 'rest') return ctx.restChar + durText(dur);
    const tie = !isLast || it.tie;
    return ctx.noteText(it.ev) + durText(dur) + (tie ? '-' : '');
  }

  /** Piano B per una battuta intrattabile: tutto alla semicroma più vicina. */
  function snapItems(items) {
    const snap = t => F(Math.round(val(t) * UNITS), UNITS);
    const out = [];
    for (const it of items) {
      const b = snap(it.b), e = snap(it.e);
      if (cmp(e, b) <= 0) continue;
      const prev = out[out.length - 1];
      if (prev && prev.kind === 'rest' && it.kind === 'rest') prev.e = e;
      else out.push({ ...it, b, e });
    }
    // chiude i buchi lasciati dagli eventi spariti
    const filled = []; let t = ZERO;
    for (const it of out) {
      if (cmp(it.b, t) > 0) filled.push({ b: t, e: it.b, kind: 'rest' });
      if (cmp(it.b, t) < 0) it.b = t;
      if (cmp(it.e, it.b) > 0) { filled.push(it); t = it.e; }
    }
    if (cmp(t, ONE) < 0) filled.push({ b: t, e: ONE, kind: 'rest' });
    return filled;
  }

  /* ── dagli hap agli eventi ─────────────────────────────────────────── */
  function collect(haps, bars, warn, layerOf) {
    const END = F(bars);
    const pitched = [], perc = [];
    let noPitchN = false, skipped = 0, rounded = false;
    for (const h of haps || []) {
      if (!h || !h.whole) continue;                       // segnali continui: niente da scrivere
      const b = toF(h.whole.begin); let e = toF(h.whole.end);
      if (!b || !e) continue;
      if (h.part && h.part.begin != null) {
        const pb = toF(h.part.begin);
        if (pb && !eq(pb, b)) continue;                   // frammento senza attacco: l'attacco sta altrove
      }
      if (cmp(b, ZERO) < 0 || cmp(b, END) >= 0) continue;
      if (cmp(e, END) > 0) e = END;
      if (cmp(e, b) <= 0) continue;

      let v = h.value;
      if (typeof v === 'string' || typeof v === 'number') v = { note: v };
      if (!v || typeof v !== 'object') { skipped++; continue; }

      let pitch = null;
      if (v.note !== undefined) pitch = parsePitch(v.note);
      else if (typeof v.freq === 'number' && v.freq > 0) pitch = parsePitch(69 + 12 * Math.log2(v.freq / 440));
      if (pitch) {
        if (pitch.rounded) rounded = true;
        pitched.push({ b, e, pitch, layer: layerOf(h) });
      } else if (typeof v.s === 'string' && v.s) {
        if (v.n !== undefined && !PERC[v.s] && /^(sine|triangle|sawtooth|square|supersaw|pulse|saw|tri|sqr|guitar|epiano|organ|bell)$/.test(v.s)) noPitchN = true;
        perc.push({ b, e, sound: v.s });
      } else {
        if (v.n !== undefined) noPitchN = true;
        skipped++;
      }
    }
    if (noPitchN) warn(_t('n(…) da solo non ha un\'altezza: aggiungi .scale("C:major") per trasformare i numeri in note.'));
    if (rounded)  warn(_t('Alcune altezze non sono semitoni esatti: sono arrotondate alla nota più vicina.'));
    if (skipped)  warn(_t('{n} eventi senza nota né suono non sono rappresentati.', { n: skipped }));
    return { pitched, perc };
  }

  /** Accordi (stesso inizio e stessa fine) e poi voci: due eventi che si
      sovrappongono senza coincidere non possono stare nella stessa voce. */
  function assignVoices(pitched, warn, maxVoices = MAX_PITCHED) {
    const groups = new Map();
    for (const ev of pitched) {
      const key = `${ev.b.n}/${ev.b.d}-${ev.e.n}/${ev.e.d}`;
      if (!groups.has(key)) groups.set(key, { b: ev.b, e: ev.e, pitches: [] });
      const g = groups.get(key);
      if (!g.pitches.some(p => p.midi === ev.pitch.midi && p.acc === ev.pitch.acc)) g.pitches.push(ev.pitch);
    }
    const chords = [...groups.values()];
    for (const c of chords) { c.pitches.sort((x, y) => x.midi - y.midi); c.top = c.pitches[c.pitches.length - 1].midi; c.mean = c.pitches.reduce((s, p) => s + p.midi, 0) / c.pitches.length; }
    chords.sort((x, y) => cmp(x.b, y.b) || y.top - x.top);

    const voices = []; let dropped = 0;
    for (const c of chords) {
      const free = voices.filter(v => cmp(v.lastEnd, c.b) <= 0);
      let v = null;
      if (free.length) v = free.reduce((best, x) => Math.abs(x.lastPitch - c.mean) < Math.abs(best.lastPitch - c.mean) ? x : best);
      else if (voices.length < maxVoices) { v = { events: [], lastEnd: ZERO, lastPitch: c.mean }; voices.push(v); }
      if (!v) { dropped++; continue; }
      v.events.push(c); v.lastEnd = c.e; v.lastPitch = c.mean;
    }
    if (dropped) warn(_t('Troppe note sovrapposte: {n} eventi non entrano nelle {max} voci rappresentabili.', { n: dropped, max: maxVoices }));
    for (const v of voices) {
      const all = v.events.flatMap(e => e.pitches.map(p => p.midi));
      v.mean = all.reduce((s, x) => s + x, 0) / all.length;
      v.clef = v.mean < 57 ? 'bass' : 'treble';
    }
    voices.sort((x, y) => y.mean - x.mean);
    return voices;
  }

  /** Le percussioni stanno tutte in una voce: i colpi simultanei diventano
      un accordo, e ogni colpo dura al più fino al successivo. */
  function percVoice(perc) {
    const groups = new Map();
    for (const ev of perc) {
      const key = `${ev.b.n}/${ev.b.d}`;
      if (!groups.has(key)) groups.set(key, { b: ev.b, e: ev.e, sounds: [] });
      const g = groups.get(key);
      if (cmp(ev.e, g.e) < 0) g.e = ev.e;
      if (!g.sounds.includes(ev.sound)) g.sounds.push(ev.sound);
    }
    const events = [...groups.values()].sort((x, y) => cmp(x.b, y.b));
    events.forEach((g, i) => {
      const next = events[i + 1];
      if (next && cmp(g.e, next.b) > 0) g.e = next.b;
      const barEnd = F(Math.floor(val(g.b)) + 1);        // un colpo non si lega oltre la stanghetta
      if (cmp(g.e, barEnd) > 0) g.e = barEnd;
    });
    return events;
  }

  /** Gli eventi di una voce → per ogni battuta, elementi che la coprono tutta. */
  function barItems(events, bar) {
    const A = F(bar), B = F(bar + 1);
    const items = []; let t = ZERO;
    for (const ev of events) {
      if (cmp(ev.e, A) <= 0 || cmp(ev.b, B) >= 0) continue;
      const b = cmp(ev.b, A) < 0 ? ZERO : sub(ev.b, A);
      const e = cmp(ev.e, B) > 0 ? ONE : sub(ev.e, A);
      if (cmp(b, t) > 0) items.push({ b: t, e: b, kind: 'rest' });
      items.push({ b, e, kind: 'note', ev, tie: cmp(ev.e, B) > 0 });
      t = e;
    }
    if (cmp(t, ONE) < 0) items.push({ b: t, e: ONE, kind: 'rest' });
    return items;
  }

  /* ── le parti: da quale pezzo del codice viene ogni nota ───────────────
     Strudel non dice quale nota è della melodia e quale dell'accompagnamento:
     stack e `$:` arrivano mescolati. Ma ogni evento porta con sé le posizioni,
     nel codice, dei pezzi di mini-notazione che l'hanno prodotto
     (hap.context.locations, le stesse che accendono il codice mentre suona).
     Un musicista divide le parti come le ha divise chi ha scritto il codice:
     ogni blocco `$:` è una parte, e se un blocco è uno stack(…), ogni suo
     argomento è una parte. */

  /** Codice → [{ start, end }], una voce per parte, in ordine. */
  function layerRanges(code) {
    code = String(code || '');
    const n = code.length;
    const labels = [];                       // inizio di ogni `$:` a inizio riga
    const marks = [];                        // { at, depth, ch } fuori da stringhe e commenti
    let depth = 0, lineStart = true;
    for (let i = 0; i < n; i++) {
      const c = code[i];
      if (c === '\n') { lineStart = true; continue; }
      if (c === '/' && code[i + 1] === '/') { while (i < n && code[i] !== '\n') i++; i--; continue; }
      if (c === '/' && code[i + 1] === '*') { const e = code.indexOf('*/', i + 2); i = e === -1 ? n : e + 1; continue; }
      if (c === '"' || c === "'" || c === '`') {
        let j = i + 1; while (j < n && code[j] !== c) j += code[j] === '\\' ? 2 : 1;
        i = j; lineStart = false; continue;
      }
      if (/\s/.test(c)) continue;
      if (lineStart && depth === 0 && /^_?\$:/.test(code.slice(i, i + 3))) labels.push(i);
      lineStart = false;
      if ('([{'.includes(c)) { depth++; marks.push({ at: i, depth, ch: c }); }
      else if (')]}'.includes(c)) { marks.push({ at: i, depth, ch: c }); depth = Math.max(0, depth - 1); }
      else if (c === ',') marks.push({ at: i, depth, ch: c });
    }
    const blocks = labels.length
      ? labels.map((s, k) => ({ start: s, end: k + 1 < labels.length ? labels[k + 1] : n }))
      : [{ start: 0, end: n }];

    const out = [];
    for (const bl of blocks) {
      // il blocco comincia con stack( ? allora le parti sono i suoi argomenti
      const body = code.slice(bl.start, bl.end).replace(/^_?\$:/, '');
      const off = bl.end - bl.start - body.length + bl.start;
      const m = /^(\s|\/\/[^\n]*\n|\/\*[\s\S]*?\*\/)*stack\s*\(/.exec(body);
      if (!m) { out.push(bl); continue; }
      const open = off + m[0].length - 1;
      const o = marks.find(x => x.at === open);
      const close = o && marks.find(x => x.at > open && x.depth === o.depth && x.ch === ')');
      if (!o || !close) { out.push(bl); continue; }
      let s = open + 1;
      for (const x of marks) {
        if (x.at <= open || x.at >= close.at) continue;
        if (x.ch === ',' && x.depth === o.depth) { out.push({ start: s, end: x.at }); s = x.at + 1; }
      }
      if (code.slice(s, close.at).trim()) out.push({ start: s, end: close.at });
    }
    return out;
  }

  /** La parte di un evento: dove cade la maggior parte delle sue posizioni
      (una posizione ogni tanto è spuria, relativa alla stringa e non al
      codice). Senza posizioni, o con una parte sola: 0. */
  function layerFinder(ranges) {
    if (!ranges || ranges.length < 2) return () => 0;
    return h => {
      const locs = (h && h.context && h.context.locations) || [];
      const votes = new Array(ranges.length).fill(0);
      for (const l of locs) {
        const k = ranges.findIndex(r => l.start >= r.start && l.start < r.end);
        if (k !== -1) votes[k]++;
      }
      let best = 0;
      votes.forEach((v, k) => { if (v >= votes[best] && v > 0) best = k; });
      return best;
    };
  }

  /** Le parti intonate, con il loro carattere: `mono` se suona una nota
      alla volta (quasi sempre: un bicordo ogni tanto è ammesso), `mean`
      l'altezza media. Ordinate dalla più acuta. */
  function profiles(pitched) {
    const byLayer = new Map();
    for (const ev of pitched) {
      if (!byLayer.has(ev.layer)) byLayer.set(ev.layer, []);
      byLayer.get(ev.layer).push(ev);
    }
    return [...byLayer.entries()].map(([layer, evs]) => {
      const onsets = new Map();
      for (const ev of evs) { const k = `${ev.b.n}/${ev.b.d}`; onsets.set(k, (onsets.get(k) || 0) + 1); }
      const chordal = [...onsets.values()].filter(x => x > 1).length / onsets.size;
      const mean = evs.reduce((sum, ev) => sum + ev.pitch.midi, 0) / evs.length;
      return { layer, evs, mono: chordal <= 0.2, mean };
    }).sort((x, y) => y.mean - x.mean);
  }

  /* ── API ───────────────────────────────────────────────────────────── */

  /** Ogni quante battute il pattern si ripete (1, 2, 4… fino a maxBars)?
      Serve a mostrare "<c4 e4> g4" su 2 battute e "c4 e4" su una. */
  function period(haps, maxBars = 8) {
    const sig = Array.from({ length: maxBars }, () => []);
    for (const h of haps || []) {
      if (!h || !h.whole) continue;
      const b = toF(h.whole.begin), e = toF(h.whole.end);
      if (!b || !e || cmp(b, ZERO) < 0) continue;
      if (h.part && h.part.begin != null) { const pb = toF(h.part.begin); if (pb && !eq(pb, b)) continue; }
      const bar = Math.floor(val(b));
      if (bar >= maxBars) continue;
      const rb = sub(b, F(bar)), len = sub(e, b);
      // Conta solo ciò che finisce sullo spartito: un filtro che si muove
      // cambia il suono a ogni ciclo, ma le note scritte restano le stesse.
      const hv = h.value;
      let v; try { v = JSON.stringify(hv && typeof hv === 'object' ? [hv.note, hv.freq, hv.s, hv.note === undefined ? hv.n : undefined] : hv); } catch (_) { v = '?'; }
      sig[bar].push(`${rb.n}/${rb.d}+${len.n}/${len.d}:${v}`);
    }
    const s = sig.map(x => x.sort().join('|'));
    for (let p = 1; p < maxBars; p *= 2) {
      let same = true;
      for (let i = 0; i + p < maxBars && same; i++) if (s[i] !== s[i + p]) same = false;
      if (same) return p;
    }
    return maxBars;
  }

  /** haps → { abc, warnings, empty, voices, legend }.
      opts: { bars = 2, bpm = null, barsPerLine = 2, code = null }
      code: il codice valutato, per riconoscere le parti (vedi layerRanges). */
  function toAbc(haps, opts = {}) {
    const bars = Math.max(1, Math.min(16, Math.floor(opts.bars || 2)));
    const barsPerLine = Math.max(1, opts.barsPerLine || 2);
    const warnings = [];
    const warn = m => { if (!warnings.includes(m)) warnings.push(m); };

    const layerOf = layerFinder(opts.code != null ? layerRanges(opts.code) : null);
    const { pitched, perc } = collect(haps, bars, warn, layerOf);

    /* I righi. Un rigo è una lista di voci (al massimo due: gambi in su e
       in giù); `brace` unisce due righi in un doppio rigo da pianoforte. */
    const staves = [];
    let nextId = 1;
    const voice = (v, clef) => ({ id: String(nextId++), kind: 'pitched', clef, events: v.events });
    const clefOf = evs => evs.reduce((sum, ev) => sum + ev.pitch.midi, 0) / evs.length < 57 ? 'bass' : 'treble';
    /* Un rigo per una linea: al massimo due voci (gambi in su e in giù). */
    const lineStaff = (evs, clef, name, short) =>
      ({ name, short, voices: assignVoices(evs, warn, 2).map(v => voice(v, clef || clefOf(evs))) });
    /* Il doppio rigo da pianoforte: dal Do centrale in su la mano destra
       (violino), sotto la sinistra (basso), uniti dalla graffa. Se le note
       stanno tutte da una parte, il rigo è uno solo. */
    const handStaves = (evs, name, short) => {
      const rh = evs.filter(ev => ev.pitch.midi >= 60), lh = evs.filter(ev => ev.pitch.midi < 60);
      const hands = [];
      if (rh.length) hands.push(lineStaff(rh, 'treble'));
      if (lh.length) hands.push(lineStaff(lh, 'bass'));
      hands[0].name = name; hands[0].short = short;
      if (hands.length === 2) hands[0].brace = hands[1].braceEnd = true;
      return hands;
    };

    const parts = profiles(pitched);
    const melody = parts.find(p => p.mono && p.mean >= 55);
    if (parts.length > 1 && parts.every(p => p.mono)) {
      /* Solo linee, nessun accordo: un canone, un contrappunto, una melodia
         col suo basso. Come in una partitura per coro, ogni linea ha il suo
         rigo, dalla più acuta. */
      const duo = parts.length === 2 && parts[1].mean < 55;
      parts.forEach((p, i) => staves.push(lineStaff(p.evs, null,
        duo ? (i ? _t('Basso') : _t('Melodia')) : undefined,
        duo ? (i ? _t('B.') : _t('Mel.')) : undefined)));
    } else if (parts.length > 1 && melody) {
      /* Melodia e accompagnamento, come in uno spartito per canto e
         pianoforte: la melodia sola sul rigo in alto, tutto il resto sotto. */
      staves.push(lineStaff(melody.evs, null, _t('Melodia'), _t('Mel.')));
      const acc = parts.filter(p => p !== melody).flatMap(p => p.evs);
      staves.push(...handStaves(acc, _t('Accompagnamento'), _t('Acc.')));
    } else if (parts.length > 1 || (pitched.length && !parts[0].mono &&
               Math.min(...pitched.map(ev => ev.pitch.midi)) < 55 && Math.max(...pitched.map(ev => ev.pitch.midi)) >= 64)) {
      /* Accordi (con o senza basso) e nessuna melodia, oppure accordi così
         larghi da riempire di tagli addizionali un rigo solo: pianoforte. */
      staves.push(...handStaves(pitched));
    } else {
      /* Una parte sola: le voci si deducono dalle sovrapposizioni, e quelle
         con la stessa chiave condividono il rigo, a due a due. */
      for (const v of assignVoices(pitched, warn)) {
        const pv = voice(v, v.clef);
        const last = staves[staves.length - 1];
        if (last && last.voices[0].clef === pv.clef && last.voices.length < 2) last.voices.push(pv);
        else staves.push({ voices: [pv] });
      }
    }

    const legend = [];
    if (perc.length) {
      const named = staves.some(st => st.name);
      staves.push({ name: named ? _t('Batteria') : undefined, short: named ? _t('Batt.') : undefined,
        voices: [{ id: 'P', kind: 'perc', clef: 'perc', events: percVoice(perc) }] });
      for (const ev of perc) if (!legend.includes(ev.sound)) legend.push(ev.sound);
    }
    const voices = staves.flatMap(st => st.voices);
    if (!voices.length) return { abc: '', warnings, empty: true, voices: [], legend };
    for (const st of staves) st.voices.forEach((v, i) => { v.restChar = i === 0 ? 'z' : 'x'; });   // x = pausa invisibile

    const labelled = new Set();
    const body = voices.map(() => []);
    voices.forEach((v, vi) => {
      for (let bar = 0; bar < bars; bar++) {
        const state = {};
        const ctx = {
          restChar: v.restChar,
          noteText: ev => {
            if (v.kind === 'perc') {
              let ann = '';
              for (const s of ev.sounds) if (!labelled.has(s)) { labelled.add(s); ann += `"^${s}"`; }
              const heads = ev.sounds.map(s => { const [pos, x] = percPos(s); return (x ? '!style=x!' : '') + pos; });
              const uniq = [...new Set(heads)];
              return ann + (uniq.length > 1 ? '[' + uniq.join('') + ']' : uniq[0]);
            }
            const ps = ev.pitches.map(p => abcPitch(p, state));
            return ps.length > 1 ? '[' + ps.join('') + ']' : ps[0];
          },
        };
        const items = barItems(v.events, bar);
        let text;
        try { text = renderBar(items, ctx); }
        catch (e) {
          if (!(e instanceof TooFine)) throw e;
          warn(_t('Battuta {n}: ritmo troppo fitto per essere scritto esattamente — approssimato alla semicroma.', { n: bar + 1 }));
          try { text = renderBar(snapItems(items), ctx); } catch (_) { text = v.restChar + UNITS; }
        }
        body[vi].push(text || (v.restChar + UNITS));
      }
    });

    const head = ['X:1', 'M:4/4', `L:1/${UNITS}`];
    if (opts.bpm) head.push(`Q:1/4=${Math.round(opts.bpm)}`);
    // %%score: (1 2) = due voci sullo stesso rigo, {…} = doppio rigo
    head.push('%%score ' + staves.map(st => {
      const s = st.voices.length > 1 ? '(' + st.voices.map(v => v.id).join(' ') + ')' : st.voices[0].id;
      return (st.brace ? '{' : '') + s + (st.braceEnd ? '}' : '');
    }).join(' '));
    const q = s => s.replace(/"/g, '');
    for (const st of staves) {
      st.voices.forEach((v, i) => {
        const label = i === 0 && st.name ? ` name="${q(st.name)}" snm="${q(st.short)}"` : '';
        head.push(`V:${v.id} clef=${v.clef}${label}`);
      });
    }
    head.push('K:C');
    const lines = [];
    for (let from = 0; from < bars; from += barsPerLine) {
      const to = Math.min(bars, from + barsPerLine);
      voices.forEach((v, vi) => {
        lines.push(`[V:${v.id}] ` + body[vi].slice(from, to).join(' | ') + (to === bars ? ' |]' : ' |'));
      });
    }
    return {
      abc: head.concat(lines).join('\n') + '\n',
      warnings, empty: false, legend,
      voices: voices.map(v => ({ id: v.id, kind: v.kind, clef: v.clef })),
    };
  }

  return { toAbc, period, parsePitch, layerRanges };
})();

/* In Node (test) il modulo si esporta; nel browser resta il globale `Score`.
   Si controlla `module`, senza mai definirlo: abcjs sceglie come esporsi
   proprio guardando se `module` esiste. */
if (typeof module !== 'undefined' && module.exports) module.exports = Score;
