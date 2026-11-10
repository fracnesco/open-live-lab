/* ════════════════════════════════════════════════════════════════════════
   TIMELINE — organizza le clip di codice nel tempo ed esegue la performance

   Pattern portati dallo score generator di Brera:
   - coordinate lineari  x = secondi × PX_PER_SEC; in verticale righe
     impilate sotto il righello (tracce e corsie: computeLayout)
   - zoom esponenziale ancorato al cursore (rotellina)
   - drag con soglia 3px, anteprima via style, snap a 0.5s al rilascio
   - scheduler wall-clock con requestAnimationFrame (enter/exit di finestra)
   - undo a snapshot dell'intero stato

   Inviluppi alla Ableton Live: ogni clip può avere delle variabili (un nome
   e un range); ognuna ha una corsia sotto la traccia, che si apre e si
   chiude col triangolo accanto al nome della traccia, e dentro la corsia
   una linea a punti che la fa cambiare nel tempo.
   ════════════════════════════════════════════════════════════════════════ */

const Timeline = (() => {

  /* ── costanti geometriche ──────────────────────────────────────────── */
  let PX_PER_SEC = 14;
  const PX_MIN = 4, PX_MAX = 80;
  const RULER_H = 26;
  /* Le tracce si stringono quando sono tante: con 8 tracce suono il dock
     resta sotto i 360px e il visual, sopra, non sparisce. */
  const TRACK_H_MAX = 64, TRACK_H_MIN = 40, TRACKS_H_BUDGET = 360;
  let TRACK_H = TRACK_H_MAX;
  let BLOCK_H = TRACK_H - 8;
  const LANE_H = 44;                             // corsia di un inviluppo
  const ENV_PAD = 6;                             // margine verticale della linea nella corsia
  const SNAP = v => Math.round(v * 2) / 2;      // griglia 0.5 s
  const MIN_DUR = 1;

  document.documentElement.style.setProperty('--ruler-h', RULER_H + 'px');

  /* traccia 0 = VISUALE (hydra); tracce 1..N = SUONO (strudel, max 8).
     I pattern di tutte le tracce suono attive vengono impilati in un unico
     evaluate Strudel (sintassi $:): un solo scheduler, un solo clock di
     ciclo, quindi le tracce restano sempre in sincrono tra loro. */
  const MAX_SOUND_TRACKS = 8;
  /* I colori sono variabili del tema (css/theme.css), non valori: così le
     clip cambiano colore insieme al tema, senza ridisegnare la timeline. */
  const SOUND_COLORS = ['var(--sound)', 'var(--track-2)', 'var(--track-3)', 'var(--track-4)',
    'var(--track-5)', 'var(--track-6)', 'var(--track-7)', 'var(--track-8)'];
  let soundTracks = 1;
  const TRACKS = [];

  function rebuildTracks() {
    TRACKS.length = 0;
    TRACKS.push({ engine: 'hydra', label: _t('VISUALE'), color: 'var(--visual)' });
    for (let k = 0; k < soundTracks; k++) {
      TRACKS.push({
        engine: 'strudel',
        label: soundTracks > 1 ? _t('SUONO {n}', { n: k + 1 }) : _t('SUONO'),
        color: SOUND_COLORS[k % SOUND_COLORS.length],
      });
    }
    TRACK_H = Math.max(TRACK_H_MIN, Math.min(TRACK_H_MAX, Math.floor(TRACKS_H_BUDGET / TRACKS.length)));
    BLOCK_H = TRACK_H - 8;
    document.documentElement.style.setProperty('--track-h', TRACK_H + 'px');
  }
  rebuildTracks();

  const DEFAULT_CLIP_CODE = {
    hydra: 'osc(10, 0.1, 1.2)\n  .out()',
    strudel: 'sound("bd hh sd hh")',
  };

  /* ── stato ─────────────────────────────────────────────────────────── */
  // clip: { id, engine, label, start, duration, track,
  //         variants: [codice, …] (≥1; la prima è il codice principale),
  //         vmode: 'random'|'ciclo' — come scegliere la variante quando
  //         sono più di una (modulo 🎲 del playlist generator di Brera),
  //         vars: [{ name, min, max, points: [[t, v], …] }] — le variabili
  //         con il loro inviluppo: t in secondi dall'inizio della clip,
  //         v fra 0 e 1 (0 = min, 1 = max), punti ordinati per t }
  let clips = [];
  let nextId = 1;
  let selId = null;
  const folded = new Set();   // tracce con le corsie degli inviluppi chiuse (▸)

  /* ── DOM ───────────────────────────────────────────────────────────── */
  const scroll  = document.getElementById('tl-scroll');
  const canvas  = document.getElementById('tl-canvas');
  const timeEl  = document.getElementById('tl-time');
  const playBtn = document.getElementById('tl-play');
  const loopBtn = document.getElementById('tl-loop');
  const zoomEl  = document.getElementById('tl-zoom');

  /* ── persistenza ───────────────────────────────────────────────────── */
  function serialize() {
    return {
      version: 2, soundTracks, nextId,
      clips: clips.map(c => ({
        id: c.id, engine: c.engine, track: c.track,
        start: c.start, duration: c.duration, label: c.label,
        code: c.variants[0],                                     // compat v1
        variants: c.variants.length > 1 ? c.variants : undefined,
        vmode: c.variants.length > 1 ? c.vmode : undefined,
        vars: c.vars.length ? c.vars.map(v => ({
          name: v.name, min: v.min, max: v.max,
          points: v.points.map(([t, y]) => [Math.round(t * 100) / 100, Math.round(y * 1000) / 1000]),
        })) : undefined,
      })),
    };
  }

  function save() {
    try { localStorage.setItem('livelab-timeline-v1', JSON.stringify(serialize())); }
    catch (_) {}
  }

  function applyState(d) {
    if (!d || !Array.isArray(d.clips)) return false;
    soundTracks = Math.min(MAX_SOUND_TRACKS, Math.max(1, Math.round(+d.soundTracks || 1)));
    rebuildTracks();
    clips = d.clips.filter(c => c && (c.engine === 'hydra' || c.engine === 'strudel'))
      .map(c => {
        let variants = Array.isArray(c.variants)
          ? c.variants.map(v => String(v)).filter(v => v.trim()) : [];
        if (!variants.length) variants = [String(c.code || '')];
        return {
          id: c.id, engine: c.engine,
          label: c.label || 'clip',
          variants,
          vmode: c.vmode === 'ciclo' ? 'ciclo' : 'random',
          start: Math.max(0, +c.start || 0),
          duration: Math.max(MIN_DUR, +c.duration || 4),
          track: c.engine === 'hydra' ? 0
               : Math.min(soundTracks, Math.max(1, Math.round(+c.track) || 1)),
          vars: cleanVars(c.vars),
        };
      });
    nextId = Math.max(d.nextId || 1, ...clips.map(c => c.id + 1), 1);
    selId = null;
    renderSidebar();
    return true;
  }

  function cleanVars(list) {
    if (!Array.isArray(list)) return [];
    const seen = new Set();
    return list
      .filter(v => v && VAR_NAME.test(v.name) && !seen.has(v.name) && seen.add(v.name))
      .map(v => {
        let points = (Array.isArray(v.points) ? v.points : [])
          .filter(p => Array.isArray(p) && isFinite(p[0]) && isFinite(p[1]))
          .map(p => [+p[0], Math.min(1, Math.max(0, +p[1]))])
          .sort((a, b) => a[0] - b[0]);
        if (!points.length) points = [[0, 0.5]];
        return {
          name: v.name,
          min: isFinite(v.min) ? +v.min : 0,
          max: isFinite(v.max) ? +v.max : 1,
          points,
        };
      });
  }

  function demoState() {
    /* Le due variabili della demo sono nomi nel codice, non frasi: si
       traducono qui, provati nel browser (nessuno copre una funzione di
       Strudel o di Hydra: «filter» e «cutoff» lo farebbero). */
    const [onda, filtro] = ({ en: ['wave', 'filterFreq'] })[I18N.lang] || ['onda', 'filtro'];
    return { version: 2, soundTracks: 2, nextId: 8, clips: [
      { id: 1, engine: 'hydra', track: 0, start: 0,  duration: 12, label: _t('onda colorata'),
        code: 'osc(10, 0.1, 1.4)\n  .out()' },
      { id: 2, engine: 'hydra', track: 0, start: 12, duration: 12, label: _t('caleidoscopio'),
        code: 'osc(8, 0.1, 1)\n  .kaleid(6)\n  .rotate(() => time * 0.1)\n  .out()' },
      { id: 3, engine: 'hydra', track: 0, start: 24, duration: 16, label: _t('liquido'),
        code: `osc(10, 0.1, 1)\n  .modulate(noise(3), ${onda})\n  .out()`,
        vars: [{ name: onda, min: 0, max: 1, points: [[0, 0.1], [8, 0.9], [16, 0.2]] }] },
      { id: 4, engine: 'strudel', track: 1, start: 0,  duration: 8,  label: _t('ritmo a sorpresa'),
        code: 'sound("bd hh bd hh")', vmode: 'random',
        variants: ['sound("bd hh bd hh")', 'sound("bd bd sd hh")', 'sound("bd ~ sd cp")'] },
      { id: 5, engine: 'strudel', track: 1, start: 8,  duration: 16, label: _t('batteria piena'),
        code: 'sound("bd hh*2 sd hh*2, ~ ~ ~ cp")' },
      { id: 6, engine: 'strudel', track: 1, start: 24, duration: 16, label: _t('ritmo + basso'),
        code: 'stack(\n  sound("bd*2, hh*4"),\n  note("c2 ~ eb2 g2")\n    .sound("sawtooth").lpf(500)\n)' },
      { id: 7, engine: 'strudel', track: 2, start: 8,  duration: 32, label: _t('melodia (in sync)'),
        code: `n("0 2 4 7 4 2")\n  .scale("C:minor")\n  .sound("sawtooth")\n  .lpf(${filtro})\n  .room(0.4)`,
        vars: [{ name: filtro, min: 300, max: 4000, points: [[0, 0], [24, 1], [32, 0.3]] }] },
    ]};
  }

  function load() {
    let d = null;
    try { d = JSON.parse(localStorage.getItem('livelab-timeline-v1')); } catch (_) {}
    if (!applyState(d)) applyState(demoState());
  }

  /* ── undo (snapshot dell'intero stato) ─────────────────────────────── */
  const undoStack = [];
  let lastSnap = '';
  function commit() {
    const s = JSON.stringify(serialize());
    if (s !== lastSnap) {
      undoStack.push(lastSnap);
      if (undoStack.length > 50) undoStack.shift();
      lastSnap = s;
    }
    save();
  }
  function undo() {
    if (!undoStack.length) return;
    const s = undoStack.pop();
    lastSnap = s;
    try { applyState(JSON.parse(s)); } catch (_) { return; }
    save(); render();
  }

  /* ── aiuti geometrici (da Brera) ───────────────────────────────────── */
  function trackClips(track, exceptId) {
    return clips.filter(c => c.track === track && c.id !== exceptId);
  }

  /** primo punto libero ≥ desired dove entra `duration` sulla traccia */
  function freeSlotStart(track, exceptId, desired, duration) {
    const iv = trackClips(track, exceptId)
      .map(c => [c.start, c.start + c.duration])
      .sort((a, b) => a[0] - b[0]);
    let t = Math.max(0, desired);
    for (const [s, e] of iv) {
      if (t + duration <= s) break;
      if (t < e) t = e;
    }
    return t;
  }

  /** bordi occupati più vicini attorno a `time` sulla traccia */
  function neighbors(track, exceptId, time) {
    let prevEnd = 0, nextStart = Infinity;
    for (const c of trackClips(track, exceptId)) {
      const end = c.start + c.duration;
      if (end <= time + 1e-6 && end > prevEnd) prevEnd = end;
      if (c.start >= time - 1e-6 && c.start < nextStart) nextStart = c.start;
    }
    return { prevEnd, nextStart };
  }

  function totalDuration() {
    return clips.length ? Math.max(...clips.map(c => c.start + c.duration)) : 0;
  }

  /* ── righe: tracce e, sotto ognuna, le corsie dei suoi inviluppi ───── */
  /** Le variabili delle clip di una traccia, in ordine di apparizione:
      una corsia per nome (clip diverse possono condividerlo). */
  function laneNames(track) {
    const names = [];
    clips.filter(c => c.track === track).sort((a, b) => a.start - b.start)
      .forEach(c => c.vars.forEach(v => { if (!names.includes(v.name)) names.push(v.name); }));
    return names;
  }

  /** Righe dall'alto in basso, con la loro y: tracce e corsie aperte. */
  function computeLayout() {
    const rows = [], trackTop = [];
    let y = RULER_H;
    TRACKS.forEach((_, i) => {
      const lanes = laneNames(i);
      trackTop[i] = y;
      rows.push({ kind: 'track', track: i, top: y, h: TRACK_H, lanes: lanes.length });
      y += TRACK_H;
      if (!folded.has(i)) for (const name of lanes) {
        rows.push({ kind: 'lane', track: i, name, top: y, h: LANE_H });
        y += LANE_H;
      }
    });
    return { rows, trackTop, bottom: y };
  }
  let layout = computeLayout();

  /** La traccia a quell'altezza del canvas (una corsia vale la sua traccia). */
  function trackAtY(y) {
    let track = 0;
    for (const r of layout.rows) if (y >= r.top) track = r.track;
    return track;
  }

  /* ── inviluppi: valore nel tempo ───────────────────────────────────── */
  /** Interpolazione lineare fra i punti; prima del primo e dopo l'ultimo
      la linea resta piatta (come in Ableton). */
  function envAt(points, t) {
    if (!points.length) return 0.5;
    if (t <= points[0][0]) return points[0][1];
    for (let k = 1; k < points.length; k++) {
      const [t1, v1] = points[k];
      if (t <= t1) {
        const [t0, v0] = points[k - 1];
        return t1 === t0 ? v1 : v0 + (v1 - v0) * (t - t0) / (t1 - t0);
      }
    }
    return points[points.length - 1][1];
  }

  const scaled = (v, y) => v.min + (v.max - v.min) * y;

  /** Il valore della variabile dove sta la linea del tempo (fuori dalla
      clip: il suo primo o ultimo valore). Lo leggono Hydra a ogni
      fotogramma e Strudel a ogni evento: trascinare un punto mentre la
      performance suona si sente subito. */
  function varNow(id, name) {
    const c = clips.find(c => c.id === id);
    const v = c && c.vars.find(v => v.name === name);
    if (!v) return 0;
    return scaled(v, envAt(v.points, Math.min(c.duration, Math.max(0, playT - c.start))));
  }

  function fmtVal(x) {
    const a = Math.abs(x);
    return a >= 100 ? x.toFixed(0) : a >= 10 ? x.toFixed(1) : x.toFixed(2);
  }

  /* ── rendering ─────────────────────────────────────────────────────── */
  let playheadEl = null;

  function render() {
    renderSidebar();                    // ricalcola anche `layout`
    canvas.innerHTML = '';
    const maxEnd = totalDuration();
    const canvasW = Math.max(scroll.clientWidth || 500, (maxEnd + 30) * PX_PER_SEC);
    canvas.style.width = canvasW + 'px';
    /* Alto quanto la colonna dei nomi (tracce, corsie e il bottone + SUONO):
       così le due parti scorrono in verticale della stessa quantità. */
    canvas.style.height = (RULER_H + sideContentH()) + 'px';
    canvas.classList.toggle('tl-compact', TRACK_H < 56);

    /* righello — densità adattiva allo zoom */
    const ruler = document.createElement('div');
    ruler.className = 'tl-ruler';
    ruler.dataset.help = _t('Righello|Mostra i secondi. Clicca (o trascina) qui per spostare la linea del tempo in un punto preciso.');
    const step  = PX_PER_SEC >= 30 ? 1 : PX_PER_SEC >= 14 ? 5 : 10;
    const label = PX_PER_SEC >= 30 ? 5 : PX_PER_SEC >= 14 ? 10 : 30;
    for (let s = 0; s * PX_PER_SEC <= canvasW; s += step) {
      const mark = document.createElement('div');
      mark.className = 'ruler-mark' + (s % label === 0 ? ' major' : '');
      mark.style.left = (s * PX_PER_SEC) + 'px';
      if (s % label === 0) mark.innerHTML = `<span>${s}s</span>`;
      ruler.appendChild(mark);
    }
    canvas.appendChild(ruler);

    /* righe: tracce e corsie degli inviluppi */
    for (const r of layout.rows) {
      const row = document.createElement('div');
      row.className = r.kind === 'track'
        ? 'tl-track-row' + (r.track % 2 ? ' alt' : '')
        : 'tl-lane-row';
      row.dataset.track = r.track;
      row.style.top = r.top + 'px';
      row.style.height = r.h + 'px';
      canvas.appendChild(row);
    }

    /* clip */
    for (const c of clips) {
      const tr = TRACKS[c.track];
      const multi = c.variants.length > 1;
      const badge = multi ? (c.vmode === 'ciclo' ? '🔁 ' : '🎲 ') : '';
      const el = document.createElement('div');
      el.className = 't-block' + (c.id === selId ? ' selected' : '');
      el.dataset.id = c.id;
      el.dataset.help = (c.engine === 'hydra'
          ? _t('Clip «{label}»|Codice visuale (Hydra): parte al secondo {start}.', { label: c.label, start: c.start })
          : _t('Clip «{label}»|Codice sonoro (Strudel): parte al secondo {start}.', { label: c.label, start: c.start })) +
        (multi ? ' ' + (c.vmode === 'ciclo'
          ? _t('Contiene {n} varianti: a ogni passaggio ne suona una in sequenza.', { n: c.variants.length })
          : _t('Contiene {n} varianti: a ogni passaggio ne suona una a caso.', { n: c.variants.length })) : '') +
        (c.vars.length ? ' ' + (c.vars.length === 1
          ? _t('Ha una variabile (∿ {names}): i loro inviluppi sono nelle corsie sotto la traccia.', { names: c.vars.map(v => v.name).join(', ') })
          : _t('Ha {n} variabili (∿ {names}): i loro inviluppi sono nelle corsie sotto la traccia.', { n: c.vars.length, names: c.vars.map(v => v.name).join(', ') })) : '') +
        ' ' + _t('Trascina per spostarla, Alt+trascina per duplicarla, tira i bordi per la durata, doppio clic per modificare il codice. Cmd+C / Cmd+V per copiarla e incollarla alla linea del tempo.');
      el.style.left = (c.start * PX_PER_SEC) + 'px';
      el.style.top = (layout.trackTop[c.track] + 4) + 'px';
      el.style.width = Math.max(28, c.duration * PX_PER_SEC) + 'px';
      el.style.height = BLOCK_H + 'px';
      el.style.background =
        `linear-gradient(135deg, color-mix(in srgb, ${tr.color} 32%, var(--bg)) 0%, color-mix(in srgb, ${tr.color} 14%, var(--bg)) 100%)`;
      el.style.borderLeft = `3px solid ${tr.color}`;
      el.innerHTML =
        `<div class="tb-name">${badge}${escapeHtml(c.label)}${multi ? ` <span class="tb-vcount">×${c.variants.length}</span>` : ''}</div>` +
        `<div class="tb-time">@${c.start}s · ${c.duration}s${c.vars.length ? ` · ∿${c.vars.length}` : ''}</div>` +
        `<div class="tb-code">${escapeHtml(c.variants[0].split('\n')[0])}</div>` +
        `<div class="tb-resize-l"></div><div class="tb-resize-r"></div>`;
      canvas.appendChild(el);
    }

    /* inviluppi: nella corsia della variabile, sotto ogni clip che ce l'ha */
    for (const r of layout.rows) {
      if (r.kind !== 'lane') continue;
      for (const c of clips) {
        if (c.track !== r.track) continue;
        const v = c.vars.find(v => v.name === r.name);
        if (v) canvas.appendChild(envelopeEl(c, v, r));
      }
    }

    /* playhead */
    playheadEl = document.createElement('div');
    playheadEl.id = 'tl-playhead';
    playheadEl.style.left = (playT * PX_PER_SEC) + 'px';
    canvas.appendChild(playheadEl);

    /* La barra di scorrimento orizzontale ruba altezza al canvas: la colonna
       dei nomi riceve lo stesso spazio in fondo, o scorrendo fino in fondo
       nomi e righe non combacerebbero più. */
    sideScroll.style.paddingBottom = (scroll.offsetHeight - scroll.clientHeight) + 'px';
    sideScroll.scrollTop = scroll.scrollTop;

    updateTimeLabel();
  }

  /* ── inviluppi: disegno e modifica (alla Ableton) ──────────────────── */
  const vToY = (v, h) => ENV_PAD + (1 - v) * (h - 2 * ENV_PAD);
  const yToV = (y, h) => Math.min(1, Math.max(0, 1 - (y - ENV_PAD) / (h - 2 * ENV_PAD)));
  const clamp01 = v => Math.min(1, Math.max(0, v));

  function envelopeEl(c, v, r) {
    const el = document.createElement('div');
    el.className = 'tl-env';
    el.dataset.id = c.id;
    el.dataset.var = v.name;
    el.dataset.help = _t('Inviluppo «{name}»|Come cambia la variabile {name} durante la clip «{label}»: in alto vale {max}, in basso {min}.',
        { name: v.name, label: c.label, max: fmtVal(v.max), min: fmtVal(v.min) }) + ' ' +
      _t('Clic in un punto vuoto = nuovo punto (e trascinalo) · trascina un punto = spostalo · clic su un punto = cancellalo · trascina la linea = alzala o abbassala. Cmd+Z annulla.');
    el.style.left = (c.start * PX_PER_SEC) + 'px';
    el.style.top = r.top + 'px';
    el.style.width = Math.max(28, c.duration * PX_PER_SEC) + 'px';
    el.style.height = r.h + 'px';
    el.style.setProperty('--c', TRACKS[c.track].color);
    drawEnv(el, c, v);
    return el;
  }

  /** La linea a punti. Prima del primo punto e dopo l'ultimo prosegue
      piatta fino ai bordi della clip; i punti fuori dalla clip (dopo un
      accorciamento) restano nei dati ma non si disegnano. */
  function drawEnv(el, c, v) {
    const w = Math.max(28, c.duration * PX_PER_SEC), h = LANE_H;
    const xy = v.points.map(([t, y]) => [t * PX_PER_SEC, vToY(y, h)]);
    const first = xy[0], last = xy[xy.length - 1];
    const line = [[Math.min(0, first[0]), first[1]], ...xy, [Math.max(w, last[0]), last[1]]];
    const d = line.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join('');
    const area = `${d}L${line[line.length - 1][0].toFixed(1)} ${h}L${line[0][0].toFixed(1)} ${h}Z`;
    const dots = xy.map(([x, y], k) => x < -1 || x > w + 1 ? ''
      : `<circle class="env-pt" data-k="${k}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5"/>`).join('');
    el.innerHTML =
      `<svg width="${w}" height="${h}"><path class="env-area" d="${area}"/><path class="env-line" d="${d}"/>${dots}</svg>` +
      `<span class="env-tag">${escapeHtml(v.name)} ${fmtVal(v.min)}…${fmtVal(v.max)}</span>`;
  }

  /** Cosa c'è sotto il mouse in un inviluppo: un punto, la linea o il vuoto. */
  function envHit(env, e) {
    const c = clips.find(c => c.id === +env.dataset.id);
    const v = c && c.vars.find(v => v.name === env.dataset.var);
    if (!v) return null;
    const rect = env.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top, h = rect.height;
    const t = x / PX_PER_SEC;
    let point = -1, best = 7;
    v.points.forEach(([pt, pv], k) => {
      const dist = Math.hypot(pt * PX_PER_SEC - x, vToY(pv, h) - y);
      if (dist < best) { best = dist; point = k; }
    });
    const onLine = point < 0 && Math.abs(vToY(envAt(v.points, t), h) - y) <= 5;
    return { c, v, x, y, h, t, point, onLine };
  }

  function insertPoint(v, t, y) {
    let k = v.points.findIndex(p => p[0] > t);
    if (k === -1) k = v.points.length;
    v.points.splice(k, 0, [t, clamp01(y)]);
    return k;
  }

  /* etichetta col valore, accanto al mouse (hover e trascinamento) */
  let envTipEl = null;
  function showEnvTip(env, v, x, y, value) {
    if (!envTipEl || !envTipEl.isConnected) {
      envTipEl = document.createElement('div');
      envTipEl.className = 'tl-env-tip';
      canvas.appendChild(envTipEl);
    }
    envTipEl.textContent = `${v.name} ${fmtVal(value)}`;
    envTipEl.style.left = (env.offsetLeft + x + 10) + 'px';
    envTipEl.style.top = (env.offsetTop + Math.max(0, y - 20)) + 'px';
    envTipEl.hidden = false;
  }
  function hideEnvTip() { if (envTipEl) envTipEl.hidden = true; }

  function hotPoint(env, k) {
    env.querySelectorAll('.env-pt').forEach(p => p.classList.toggle('hot', +p.dataset.k === k));
  }

  let envEditing = false;

  /* mousedown su un inviluppo:
     · su un punto   → trascinalo (tempo e valore); un clic senza muovere lo cancella
     · sulla linea   → trascina il tratto su/giù; un clic senza muovere aggiunge un punto
     · nel vuoto     → nuovo punto lì, subito trascinabile */
  function startEnvEdit(env, e) {
    const hit = envHit(env, e);
    if (!hit) return;
    const { c, v, h } = hit;
    select(c.id);
    let mode = 'point', k = hit.point, seg = null;
    if (k < 0 && hit.onLine) {
      mode = 'segment';
      const after = v.points.findIndex(p => p[0] > hit.t);
      seg = after === -1 ? [v.points.length - 1] : after === 0 ? [0] : [after - 1, after];
    } else if (k < 0) {
      k = insertPoint(v, hit.t, yToV(hit.y, h));
      drawEnv(env, c, v);
    }
    const orig = v.points.map(p => p.slice());
    let moved = k !== hit.point && mode === 'point';   // un punto appena creato conta già come modifica
    envEditing = true;
    hotPoint(env, k);
    e.preventDefault();

    const mv = ev => {
      const dx = ev.clientX - e.clientX, dyPx = ev.clientY - e.clientY;
      if (!moved && Math.hypot(dx, dyPx) <= 3) return;
      moved = true;
      const dy = dyPx / (h - 2 * ENV_PAD);
      if (mode === 'point') {
        const lo = Math.max(0, k > 0 ? v.points[k - 1][0] : 0);
        const hi = Math.min(c.duration, k < v.points.length - 1 ? v.points[k + 1][0] : c.duration);
        const t = Math.min(hi, Math.max(lo, orig[k][0] + dx / PX_PER_SEC));
        v.points[k] = [t, clamp01(orig[k][1] - dy)];
        drawEnv(env, c, v);
        hotPoint(env, k);
        showEnvTip(env, v, t * PX_PER_SEC, vToY(v.points[k][1], h), scaled(v, v.points[k][1]));
      } else {
        for (const i of seg) v.points[i][1] = clamp01(orig[i][1] - dy);
        drawEnv(env, c, v);
        showEnvTip(env, v, hit.x, vToY(envAt(v.points, hit.t), h), scaled(v, envAt(v.points, hit.t)));
      }
    };
    const up = () => {
      window.removeEventListener('mousemove', mv);
      window.removeEventListener('mouseup', up);
      envEditing = false;
      hideEnvTip();
      if (!moved) {
        if (mode === 'point' && v.points.length > 1) v.points.splice(k, 1);
        else if (mode === 'segment') insertPoint(v, hit.t, envAt(v.points, hit.t));
      }
      commit(); render();
    };
    window.addEventListener('mousemove', mv);
    window.addEventListener('mouseup', up);
  }

  /* hover: cursore e valore, come in Ableton */
  canvas.addEventListener('mousemove', e => {
    if (drag || envEditing || Help.active) return;
    const env = e.target.closest('.tl-env');
    canvas.querySelectorAll('.env-pt.hot').forEach(p => p.classList.remove('hot'));
    if (!env) { hideEnvTip(); return; }
    const hit = envHit(env, e);
    if (!hit) return;
    env.style.cursor = hit.point >= 0 ? 'pointer' : hit.onLine ? 'ns-resize' : 'crosshair';
    if (hit.point >= 0) {
      const [pt, pv] = hit.v.points[hit.point];
      hotPoint(env, hit.point);
      showEnvTip(env, hit.v, pt * PX_PER_SEC, vToY(pv, hit.h), scaled(hit.v, pv));
    } else {
      const y = envAt(hit.v.points, hit.t);
      showEnvTip(env, hit.v, hit.x, vToY(y, hit.h), scaled(hit.v, y));
    }
  });
  canvas.addEventListener('mouseleave', () => { if (!envEditing) hideEnvTip(); });

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g,
      ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
  }

  /* ── sidebar: etichette traccia e corsie + aggiungi/rimuovi tracce SUONO ─ */
  const sideScroll = document.getElementById('tl-side-scroll');
  const trackLabelsEl = document.getElementById('tl-track-labels');
  const addTrackBtn = document.getElementById('tl-add-track');

  function renderSidebar() {
    layout = computeLayout();
    trackLabelsEl.innerHTML = '';
    for (const r of layout.rows) {
      const tr = TRACKS[r.track];
      const el = document.createElement('div');
      el.style.height = r.h + 'px';
      if (r.kind === 'lane') {
        el.className = 'tl-lane-label';
        el.dataset.track = r.track;
        el.dataset.name = r.name;
        el.dataset.help = _t('Corsia «{name}»|Sotto ogni clip di {track} che ha la variabile {name} c\'è il suo inviluppo: la linea dice quanto vale, istante per istante.',
            { name: r.name, track: tr.label }) + ' ' +
          _t('Il numero è il valore dove sta la linea del tempo. Le variabili si creano nella finestra della clip (doppio clic). La rotellina qui sui nomi fa scorrere su e giù.');
        el.innerHTML = `<span class="lane-sym" style="color:${tr.color}">∿</span><span class="lane-name">${escapeHtml(r.name)}</span><span class="lane-val"></span>`;
        trackLabelsEl.appendChild(el);
        continue;
      }
      const i = r.track;
      el.className = 'tl-track-label';
      el.dataset.help = tr.engine === 'hydra'
        ? _t('Traccia VISUALE|Le clip su questa traccia contengono codice Hydra: quando la linea del tempo le attraversa, le immagini cambiano.')
        : _t('Traccia {track}|Le clip su questa traccia contengono pattern Strudel. Le tracce suono suonano insieme, sempre a tempo tra loro: condividono lo stesso orologio musicale.', { track: tr.label });
      if (r.lanes) {
        const f = document.createElement('button');
        f.className = 'tl-fold';
        f.textContent = folded.has(i) ? '▸' : '▾';
        f.dataset.help = folded.has(i)
          ? _t('Inviluppi|Apre le corsie degli inviluppi di questa traccia: una per ogni variabile delle sue clip ({n}).', { n: r.lanes })
          : _t('Inviluppi|Chiude le corsie degli inviluppi di questa traccia: una per ogni variabile delle sue clip ({n}).', { n: r.lanes });
        f.addEventListener('click', () => {
          if (folded.has(i)) folded.delete(i); else folded.add(i);
          render();
        });
        el.appendChild(f);
      }
      el.insertAdjacentHTML('beforeend', `<span class="engine-dot" style="background:${tr.color}"></span>${tr.label}`);
      if (tr.engine === 'strudel' && soundTracks > 1) {
        const x = document.createElement('button');
        x.className = 'btn btn-mini tl-track-x';
        x.textContent = '✕';
        x.dataset.help = _t('Rimuovi traccia|Elimina questa traccia sonora (con le sue clip). Puoi annullare con Cmd+Z.');
        x.addEventListener('click', () => removeSoundTrack(i));
        el.appendChild(x);
      }
      trackLabelsEl.appendChild(el);
    }
    addTrackBtn.hidden = soundTracks >= MAX_SOUND_TRACKS;
    updateLaneValues();
  }

  /** Altezza del contenuto della colonna dei nomi (senza righello). */
  function sideContentH() {
    const btn = addTrackBtn.hidden ? 0 : (addTrackBtn.offsetHeight || 20) + 16;   // 16 = margini
    return layout.bottom - RULER_H + btn;
  }

  /** Il valore di ogni corsia dove sta la linea del tempo. */
  function updateLaneValues() {
    trackLabelsEl.querySelectorAll('.tl-lane-label').forEach(el => {
      const c = clipAt(+el.dataset.track, playT);
      const has = c && c.vars.some(v => v.name === el.dataset.name);
      el.querySelector('.lane-val').textContent = has ? fmtVal(varNow(c.id, el.dataset.name)) : '';
    });
  }

  /* Scorrimento verticale (tante tracce, tante corsie): scorre il canvas, e
     la colonna dei nomi lo segue. Sopra il canvas la rotellina resta lo
     zoom, quindi su e giù si va con la rotellina sui nomi o con la barra. */
  scroll.addEventListener('scroll', () => {
    sideScroll.scrollTop = scroll.scrollTop;
    canvas.classList.toggle('v-scrolled', scroll.scrollTop > 0);
  });
  sideScroll.addEventListener('wheel', e => {
    e.preventDefault();
    scroll.scrollTop += e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
  }, { passive: false });

  function addSoundTrack() {
    if (soundTracks >= MAX_SOUND_TRACKS) return;
    if (playing) stop();
    soundTracks++;
    rebuildTracks();
    commit(); renderSidebar(); render();
  }

  function removeSoundTrack(i) {
    if (TRACKS[i] && TRACKS[i].engine !== 'strudel') return;
    const n = clips.filter(c => c.track === i).length;
    if (n && !confirm(_t('La traccia {track} contiene {n} clip: eliminarla comunque?', { track: TRACKS[i].label, n }))) return;
    if (playing) stop();
    clips = clips.filter(c => c.track !== i);
    clips.forEach(c => { if (c.track > i) c.track--; });
    const was = [...folded];
    folded.clear();
    was.forEach(t => { if (t < i) folded.add(t); else if (t > i) folded.add(t - 1); });
    soundTracks--;
    rebuildTracks();
    if (selId != null && !clips.some(c => c.id === selId)) selId = null;
    commit(); renderSidebar(); render();
  }

  addTrackBtn.addEventListener('click', addSoundTrack);

  function updateTimeLabel() {
    timeEl.textContent = `${playT.toFixed(1)}s / ${totalDuration().toFixed(1)}s`;
  }

  function movePlayhead(t) {
    playT = Math.max(0, t);
    if (playheadEl) playheadEl.style.left = (playT * PX_PER_SEC) + 'px';
    updateTimeLabel();
    updateLaneValues();
  }

  /* ── zoom (rotellina ancorata al cursore + slider) ─────────────────── */
  scroll.addEventListener('wheel', e => {
    const ax = Math.abs(e.deltaX), ay = Math.abs(e.deltaY);
    if (ay >= ax) {
      e.preventDefault();
      const rect = scroll.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const tAtCursor = (scroll.scrollLeft + cx) / PX_PER_SEC;
      const factor = Math.exp(-e.deltaY * 0.0018);
      const next = Math.min(PX_MAX, Math.max(PX_MIN, PX_PER_SEC * factor));
      if (next === PX_PER_SEC) return;
      PX_PER_SEC = next;
      zoomEl.value = String(Math.round(next));
      render();
      scroll.scrollLeft = Math.max(0, tAtCursor * PX_PER_SEC - cx);
    } else {
      e.preventDefault();
      scroll.scrollLeft += e.deltaX;
    }
  }, { passive: false });

  zoomEl.addEventListener('input', () => {
    const mid = scroll.scrollLeft + scroll.clientWidth / 2;
    const tAtMid = mid / PX_PER_SEC;
    PX_PER_SEC = +zoomEl.value;
    render();
    scroll.scrollLeft = Math.max(0, tAtMid * PX_PER_SEC - scroll.clientWidth / 2);
  });

  /* ── drag / resize clip (soglia 3px, snap al rilascio) ─────────────── */
  let drag = null;

  canvas.addEventListener('mousedown', e => {
    if (Help.active) return;
    const block = e.target.closest('.t-block');

    /* clic/trascinamento sul righello = seek */
    if (!block && e.target.closest('.tl-ruler')) {
      const seekFromEvent = ev => {
        const rect = canvas.getBoundingClientRect();
        seek(Math.max(0, (ev.clientX - rect.left) / PX_PER_SEC));
      };
      seekFromEvent(e);
      const mv = ev => seekFromEvent(ev);
      const up = () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseup', up); };
      window.addEventListener('mousemove', mv);
      window.addEventListener('mouseup', up);
      return;
    }

    const env = !block && e.target.closest('.tl-env');
    if (env) { startEnvEdit(env, e); return; }

    if (!block) {
      const row = e.target.closest('.tl-track-row, .tl-lane-row');
      if (row) lastTrack = +row.dataset.track;
      select(null);
      return;
    }
    const clip = clips.find(c => c.id === +block.dataset.id);
    if (!clip) return;
    select(clip.id);
    lastTrack = clip.track;
    /* un clic sulla clip toglie un'eventuale selezione di testo altrove,
       così Cmd+C copia la clip (vedi le scorciatoie in main.js) */
    window.getSelection().removeAllRanges();

    const mode = e.target.classList.contains('tb-resize-r') ? 'resize-r'
               : e.target.classList.contains('tb-resize-l') ? 'resize-l' : 'move';
    drag = {
      clip, el: block, mode, moved: false,
      dup: mode === 'move' && e.altKey,       // Alt+trascina = duplica
      startX: e.clientX, startY: e.clientY,
      origStart: clip.start, origDuration: clip.duration,
      envEls: [...canvas.querySelectorAll(`.tl-env[data-id="${clip.id}"]`)],
    };
    e.preventDefault();
  });

  window.addEventListener('mousemove', e => {
    if (!drag) return;
    if (!drag.moved) {
      if (Math.abs(e.clientX - drag.startX) <= 3 && Math.abs(e.clientY - drag.startY) <= 3) return;   // clic ≠ drag
      drag.moved = true;
      /* Alt: l'originale resta dov'è, si trascina una copia (come in Ableton) */
      if (drag.dup) {
        const copy = { ...cloneClip(drag.clip), id: nextId++, start: drag.clip.start };
        clips.push(copy);
        const el = drag.el.cloneNode(true);
        el.dataset.id = copy.id;
        el.classList.remove('playing-now');
        el.style.outline = '';
        canvas.insertBefore(el, playheadEl);
        drag.clip = copy; drag.el = el; drag.envEls = [];
        select(copy.id);
      }
    }
    const dx = e.clientX - drag.startX;
    const c = drag.clip;

    if (drag.mode === 'resize-r') {
      c.duration = Math.max(MIN_DUR, drag.origDuration + dx / PX_PER_SEC);
      drag.el.style.width = Math.max(28, c.duration * PX_PER_SEC) + 'px';
    } else if (drag.mode === 'resize-l') {
      const end = drag.origStart + drag.origDuration;
      c.start = Math.max(0, Math.min(end - MIN_DUR, drag.origStart + dx / PX_PER_SEC));
      c.duration = end - c.start;
      drag.el.style.left = (c.start * PX_PER_SEC) + 'px';
      drag.el.style.width = Math.max(28, c.duration * PX_PER_SEC) + 'px';
    } else {
      c.start = Math.max(0, drag.origStart + dx / PX_PER_SEC);
      drag.el.style.left = (c.start * PX_PER_SEC) + 'px';
      drag.envEls.forEach(el => { el.style.left = drag.el.style.left; });   // l'inviluppo segue la clip
      /* drag verticale: cambia traccia, solo tra tracce dello stesso motore */
      const rect = canvas.getBoundingClientRect();
      const target = trackAtY(e.clientY - rect.top);
      if (target !== c.track && TRACKS[target].engine === c.engine) {
        c.track = target;
        drag.el.style.top = (layout.trackTop[target] + 4) + 'px';
        drag.envEls.forEach(el => { el.style.visibility = 'hidden'; });   // ricompaiono nella traccia nuova
      }
    }
  });

  window.addEventListener('mouseup', () => {
    if (!drag) return;
    const { clip: c, mode, moved, origStart } = drag;
    drag = null;
    if (!moved) return;

    if (mode === 'resize-r') {
      c.duration = Math.max(MIN_DUR, SNAP(c.duration));
      const { nextStart } = neighbors(c.track, c.id, c.start + 1e-3);
      if (isFinite(nextStart) && nextStart > c.start) {
        c.duration = Math.max(MIN_DUR, Math.min(c.duration, nextStart - c.start));
      }
    } else if (mode === 'resize-l') {
      const end = c.start + c.duration;
      c.start = Math.max(0, SNAP(c.start));
      const { prevEnd } = neighbors(c.track, c.id, end - 1e-3);
      c.start = Math.max(c.start, Math.min(prevEnd, end - MIN_DUR));
      c.duration = Math.max(MIN_DUR, SNAP(end - c.start));
      /* i punti degli inviluppi restano dove erano nel tempo, come il
         contenuto di una clip audio in Ableton: si sposta solo il bordo */
      const shift = c.start - origStart;
      if (shift) c.vars.forEach(v => v.points.forEach(p => { p[0] -= shift; }));
    } else {
      c.start = SNAP(Math.max(0, c.start));
      c.start = freeSlotStart(c.track, c.id, c.start, c.duration);   // niente sovrapposizioni
    }
    lastTrack = c.track;
    commit(); render();
  });

  /* Alt premuto: sulle clip il cursore diventa «copia» (Alt+trascina duplica) */
  const altCursor = e => canvas.classList.toggle('alt-dup', e.altKey);
  window.addEventListener('keydown', altCursor);
  window.addEventListener('keyup', altCursor);
  window.addEventListener('blur', () => canvas.classList.remove('alt-dup'));

  /* doppio clic: su clip = modifica · su spazio vuoto = nuova clip */
  canvas.addEventListener('dblclick', e => {
    if (Help.active) return;
    const block = e.target.closest('.t-block');
    if (block) {
      const clip = clips.find(c => c.id === +block.dataset.id);
      if (clip) openClipModal(clip);
      return;
    }
    const row = e.target.closest('.tl-track-row');
    if (!row) return;
    const track = +row.dataset.track;
    lastTrack = track;
    const rect = canvas.getBoundingClientRect();
    const t = SNAP(Math.max(0, (e.clientX - rect.left) / PX_PER_SEC));
    addClip(TRACKS[track].engine, DEFAULT_CLIP_CODE[TRACKS[track].engine], t, 8, _t('nuova clip'), track);
  });

  function select(id) {
    selId = id;
    canvas.querySelectorAll('.t-block').forEach(el =>
      el.classList.toggle('selected', +el.dataset.id === id));
  }

  function addClip(engine, code, desiredStart, duration = 8, label, track) {
    if (track == null) track = engine === 'hydra' ? 0 : 1;
    const start = freeSlotStart(track, null, desiredStart, duration);
    const clip = {
      id: nextId++, engine, track,
      label: label || firstLineLabel(code) || 'clip',
      variants: [code], vmode: 'random',
      start, duration, vars: [],
    };
    clips.push(clip);
    commit(); render(); select(clip.id);
    return clip;
  }

  /* ── copia / taglia / incolla ──────────────────────────────────────── */
  let clipboard = null;      // copia della clip, senza id né posizione
  let lastTrack = null;      // l'ultima traccia cliccata: lì va l'incolla

  function cloneClip(c) {
    return {
      engine: c.engine, track: c.track, label: c.label, duration: c.duration,
      variants: c.variants.slice(), vmode: c.vmode,
      vars: c.vars.map(v => ({ ...v, points: v.points.map(p => p.slice()) })),
    };
  }

  function copySelected() {
    const c = clips.find(c => c.id === selId);
    if (!c) return false;
    clipboard = cloneClip(c);
    return true;
  }

  /** Incolla alla linea del tempo, sull'ultima traccia cliccata se è dello
      stesso motore (altrimenti su quella da cui la clip è stata copiata);
      se lì il posto è occupato, nel primo spazio libero dopo. */
  function paste() {
    if (!clipboard) return;
    const fits = i => i != null && TRACKS[i] && TRACKS[i].engine === clipboard.engine;
    const track = fits(lastTrack) ? lastTrack
                : fits(clipboard.track) ? clipboard.track
                : TRACKS.findIndex(t => t.engine === clipboard.engine);
    const start = freeSlotStart(track, null, SNAP(playT), clipboard.duration);
    const clip = { ...cloneClip(clipboard), id: nextId++, track, start };
    clips.push(clip);
    commit(); render(); select(clip.id);
    revealTime(start);
  }

  /** Scorre la timeline se `t` è fuori dalla parte visibile. */
  function revealTime(t) {
    const x = t * PX_PER_SEC, left = scroll.scrollLeft, w = scroll.clientWidth;
    if (x < left || x > left + w - 60) scroll.scrollLeft = Math.max(0, x - w * 0.2);
  }

  function firstLineLabel(code) {
    const line = String(code).split('\n')[0].replace(/^\/\/\s*/, '').trim();
    return line.length > 26 ? line.slice(0, 26) + '…' : line;
  }

  function removeClip(id) {
    const i = clips.findIndex(c => c.id === id);
    if (i === -1) return;
    clips.splice(i, 1);
    if (selId === id) selId = null;
    commit(); render();
  }

  /* ── modale modifica clip (con varianti 🎲) ────────────────────────── */
  const modalBack = document.getElementById('clip-modal-back');
  const variantModeEl = document.getElementById('clip-variant-mode');
  let modalCM = null;
  let modalClip = null;
  let modalVariants = [];   // copia di lavoro: applicata solo alla chiusura
  let modalVIdx = 0;

  function renderVariantTabs() {
    const tabs = document.getElementById('clip-variant-tabs');
    tabs.innerHTML = '';
    modalVariants.forEach((_, i) => {
      const b = document.createElement('button');
      b.className = 'btn btn-mini variant-tab' + (i === modalVIdx ? ' active-accent' : '');
      b.textContent = String(i + 1);
      b.dataset.help = _t('Variante {n}|Mostra e modifica il codice della variante {n}.', { n: i + 1 });
      b.addEventListener('click', () => switchVariant(i));
      tabs.appendChild(b);
    });
    document.getElementById('clip-variant-del').hidden = modalVariants.length < 2;
    variantModeEl.hidden = modalVariants.length < 2;
  }

  function switchVariant(i) {
    modalVariants[modalVIdx] = modalCM.getValue();
    modalVIdx = i;
    modalCM.setValue(modalVariants[i]);
    renderVariantTabs();
    modalCM.focus();
  }

  /* ── variabili nella modale ────────────────────────────────────────── */
  const VAR_NAME = /^[A-Za-z_][A-Za-z0-9_]*$/;
  /* Hydra mette i suoi nomi su window solo quando nasce (alla prima
     visuale): prima di allora un controllo su window non li vedrebbe. */
  const HYDRA_NAMES = new Set(['osc', 'noise', 'voronoi', 'shape', 'gradient', 'src', 'solid', 'prev',
    'render', 'hush', 'time', 'bpm', 'speed', 'fps', 'stats', 'width', 'height', 'mouse', 'update',
    'setResolution', 'setFunction', 'loadScript', 'tick', 'screencap', 'vidRecorder', 'a',
    's0', 's1', 's2', 's3', 'o0', 'o1', 'o2', 'o3']);

  function globalExists(name) {
    try { return (0, eval)(`typeof ${name}`) !== 'undefined'; } catch (_) { return true; }
  }

  /** Perché un nome non va bene (o null). Un nome che esiste già — osc,
      note, time… — coprirebbe la funzione vera, e il codice si romperebbe
      in modi incomprensibili: meglio fermarlo qui, con un'alternativa. */
  function varNameError(name, taken) {
    if (!name) return _t('dai un nome alla variabile');
    if (!VAR_NAME.test(name)) return _t('«{name}»: il nome può avere solo lettere senza accenti, numeri e _ (niente spazi), e non può cominciare con un numero', { name });
    try { new Function(`"use strict"; var ${name};`); }
    catch (_) { return _t('«{name}» è una parola riservata di JavaScript: scegli un altro nome', { name }); }
    if (taken.includes(name)) return _t('c\'è già una variabile «{name}» in questa clip', { name });
    if (!ownGlobals.has(name) && (HYDRA_NAMES.has(name) || globalExists(name))) {
      return _t('«{name}» è già il nome di qualcosa che esiste (in Hydra, in Strudel o nel browser): scegline un altro, per esempio «mio_{name}»', { name });
    }
    return null;
  }

  let modalVars = [];   // copia di lavoro: min/max restano testo finché non si salva
  const varsErrEl = document.getElementById('clip-vars-err');

  function renderVarRows() {
    const list = document.getElementById('clip-vars-list');
    list.innerHTML = '';
    modalVars.forEach((v, i) => {
      const row = document.createElement('div');
      row.className = 'clip-var-row';
      row.innerHTML =
        `<span class="clip-var-sym">∿</span>` +
        `<input class="field var-name" spellcheck="false" autocomplete="off" data-help="${escapeHtml(_t('Nome della variabile|Il nome da scrivere nel codice. Solo lettere senza accenti, numeri e _, senza spazi.'))}">` +
        `<span class="label-txt">${escapeHtml(_t('da'))}</span>` +
        `<input class="field var-num" inputmode="decimal" data-help="${escapeHtml(_t('Valore più basso|Quanto vale la variabile quando l\'inviluppo è in fondo alla corsia.'))}">` +
        `<span class="label-txt">${escapeHtml(_t('a'))}</span>` +
        `<input class="field var-num" inputmode="decimal" data-help="${escapeHtml(_t('Valore più alto|Quanto vale la variabile quando l\'inviluppo è in cima alla corsia.'))}">` +
        `<button class="btn btn-mini var-ins" data-help="${escapeHtml(_t('Nel codice|Scrive il nome della variabile nel codice, dove sta il cursore.'))}">${escapeHtml(_t('↳ NEL CODICE'))}</button>` +
        `<button class="btn btn-mini var-del" data-help="${escapeHtml(_t('Elimina variabile|Toglie la variabile e il suo inviluppo. Se il codice la usa ancora, darà errore.'))}">✕</button>`;
      const [nameEl, minEl, maxEl] = row.querySelectorAll('input');
      nameEl.value = v.name; minEl.value = v.min; maxEl.value = v.max;
      nameEl.addEventListener('input', () => { v.name = nameEl.value.trim(); varsHint(); });
      minEl.addEventListener('input', () => { v.min = minEl.value; });
      maxEl.addEventListener('input', () => { v.max = maxEl.value; });
      row.querySelector('.var-ins').addEventListener('click', () => {
        modalCM.replaceSelection(v.name);
        modalCM.focus();
      });
      row.querySelector('.var-del').addEventListener('click', () => {
        modalVars.splice(i, 1);
        renderVarRows();
      });
      list.appendChild(row);
    });
    varsHint();
  }

  function varsHint() {
    const el = document.getElementById('clip-vars-hint');
    const n = (modalVars[0] && VAR_NAME.test(modalVars[0].name)) ? modalVars[0].name : 'v1';
    el.textContent = !modalVars.length ? _t('numeri che cambiano nel tempo, disegnati sotto la clip')
      : modalClip.engine === 'hydra' ? _t('nel codice: osc(10, 0.1, {n}) · per fare conti: () => {n}() * 2', { n })
      : _t('nel codice: .lpf({n}) · .gain({n}) · per fare conti: {n}.mul(2)', { n });
  }

  /** Controlla le variabili della modale e le mette nella clip. Con un
      errore lo mostra, evidenzia il campo e restituisce false. */
  function applyModalVars() {
    const rows = document.querySelectorAll('#clip-vars-list .clip-var-row');
    rows.forEach(r => r.querySelectorAll('input').forEach(inp => inp.classList.remove('bad')));
    const num = s => Number(String(s).trim().replace(',', '.'));   // «0,5» vale come 0.5
    const out = [];
    for (let i = 0; i < modalVars.length; i++) {
      const v = modalVars[i];
      let err = varNameError(v.name, out.map(o => o.name)), field = 0;
      if (!err && (String(v.min).trim() === '' || !isFinite(num(v.min)))) { err = _t('«{name}»: dopo «da» ci va un numero', { name: v.name }); field = 1; }
      if (!err && (String(v.max).trim() === '' || !isFinite(num(v.max)))) { err = _t('«{name}»: dopo «a» ci va un numero', { name: v.name }); field = 2; }
      if (err) {
        varsErrEl.textContent = err;
        varsErrEl.hidden = false;
        const inp = rows[i] && rows[i].querySelectorAll('input')[field];
        if (inp) { inp.classList.add('bad'); inp.focus(); }
        return false;
      }
      out.push({ name: v.name, min: num(v.min), max: num(v.max), points: v.points.map(p => p.slice()) });
    }
    varsErrEl.hidden = true;
    const before = laneNames(modalClip.track);
    modalClip.vars = out;
    if (out.some(v => !before.includes(v.name))) folded.delete(modalClip.track);   // una corsia nuova si vede subito
    return true;
  }

  document.getElementById('clip-var-add').addEventListener('click', () => {
    let k = modalVars.length + 1;
    while (modalVars.some(v => v.name === 'v' + k)) k++;
    modalVars.push({ name: 'v' + k, min: 0, max: 1, points: [[0, 0.5]] });   // linea piatta a metà, come in Ableton
    renderVarRows();
    const names = document.querySelectorAll('#clip-vars-list .var-name');
    names[names.length - 1].select();
  });

  function openClipModal(clip) {
    modalClip = clip;
    modalVariants = clip.variants.slice();
    modalVIdx = 0;
    modalVars = clip.vars.map(v => ({ ...v, points: v.points.map(p => p.slice()) }));
    varsErrEl.hidden = true;
    renderVarRows();
    document.getElementById('clip-modal-label').value = clip.label;
    variantModeEl.value = clip.vmode;
    const dot = document.getElementById('clip-modal-dot');
    dot.className = 'engine-dot ' + (clip.engine === 'hydra' ? 'dot-hydra' : 'dot-strudel');
    document.getElementById('clip-modal-engine').textContent =
      clip.engine === 'hydra' ? _t('clip visuale · hydra') : _t('clip sonora · strudel · {track}', { track: TRACKS[clip.track].label.toLowerCase() });
    modalBack.hidden = false;
    if (!modalCM) {
      modalCM = CodeMirror(document.getElementById('cm-clip'), {
        value: modalVariants[0], mode: 'javascript', lineNumbers: true, lineWrapping: true,
        autoCloseBrackets: true, matchBrackets: true,
      });
    } else {
      modalCM.setValue(modalVariants[0]);
    }
    renderVariantTabs();
    setTimeout(() => { modalCM.refresh(); modalCM.focus(); }, 0);
  }

  function closeClipModal(saveIt = true) {
    if (saveIt && modalClip) {
      if (!applyModalVars()) return;     // nome sbagliato: la finestra resta aperta sull'errore
      modalVariants[modalVIdx] = modalCM.getValue();
      const kept = modalVariants.filter(v => v.trim());
      modalClip.variants = kept.length ? kept : [modalCM.getValue()];
      modalClip.vmode = variantModeEl.value === 'ciclo' ? 'ciclo' : 'random';
      modalClip.label = document.getElementById('clip-modal-label').value.trim() || 'clip';
      commit(); render();
    }
    modalBack.hidden = true;
    modalClip = null;
  }

  document.getElementById('clip-variant-add').addEventListener('click', () => {
    modalVariants[modalVIdx] = modalCM.getValue();
    modalVariants.push(modalCM.getValue());   // parte da una copia dell'attuale
    modalVIdx = modalVariants.length - 1;
    modalCM.setValue(modalVariants[modalVIdx]);
    renderVariantTabs();
    modalCM.focus();
  });
  document.getElementById('clip-variant-del').addEventListener('click', () => {
    if (modalVariants.length < 2) return;
    modalVariants.splice(modalVIdx, 1);
    modalVIdx = Math.min(modalVIdx, modalVariants.length - 1);
    modalCM.setValue(modalVariants[modalVIdx]);
    renderVariantTabs();
  });

  document.getElementById('clip-modal-close').addEventListener('click', () => closeClipModal(true));
  document.getElementById('clip-modal-ok').addEventListener('click', () => closeClipModal(true));
  document.getElementById('clip-modal-try').addEventListener('click', async () => {
    if (!modalClip || !applyModalVars()) return;
    const res = await Engines.run(modalClip.engine, withVars(modalClip, modalCM.getValue()));
    const btn = document.getElementById('clip-modal-try');
    btn.textContent = res.ok ? _t('▶ OK!') : _t('✕ ERRORE');
    btn.title = res.ok ? '' : res.error;
    if (!res.ok) AppConsole.log('timeline', 'err', _t('prova clip: {error}', { error: res.error }));
    setTimeout(() => { btn.textContent = _t('▶ PROVA'); }, 1600);
  });
  document.getElementById('clip-modal-stop').addEventListener('click', () => {
    if (modalClip) Engines.stop(modalClip.engine);
  });
  document.getElementById('clip-modal-delete').addEventListener('click', () => {
    if (!modalClip) return;
    const id = modalClip.id;
    modalBack.hidden = true;
    modalClip = null;
    removeClip(id);
  });
  modalBack.addEventListener('mousedown', e => {
    if (e.target === modalBack) closeClipModal(true);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modalBack.hidden) closeClipModal(true);
  });

  /* ── trasporto: scheduler wall-clock con rAF ───────────────────────── */
  let playing = false;
  let paused = false;
  let looping = false;
  let playT = 0;            // posizione della linea del tempo (s)
  let startWall = 0;        // performance.now() all'avvio, ribasato su seek/pausa
  let rafId = null;
  const active = {};        // track -> id clip attiva (o undefined)
  const picked = new Map(); // id clip -> variante scelta all'ingresso (stabile finché è attiva)
  const cycleCount = new Map();   // id clip -> passaggi fatti (per vmode 'ciclo')

  function resetActive() {
    TRACKS.forEach((_, i) => { active[i] = undefined; });
    picked.clear();
  }

  /** Sceglie la variante da suonare quando la clip entra (modulo 🎲 di Brera). */
  function pickVariant(c) {
    const n = c.variants.length;
    if (n === 1) return { code: c.variants[0], which: 0, n };
    let k;
    if (c.vmode === 'ciclo') {
      const cnt = cycleCount.get(c.id) || 0;
      cycleCount.set(c.id, cnt + 1);
      k = cnt % n;
    } else {
      k = Math.floor(Math.random() * n);
    }
    return { code: c.variants[k], which: k, n };
  }

  /* ── variabili delle clip nel codice ───────────────────────────────── */
  /* Strudel: ogni variabile diventa un segnale continuo, dichiarato subito
     prima del pattern della sua clip. `var` e non `const`: due clip impilate
     possono avere una variabile con lo stesso nome, e ogni pattern si tiene
     il segnale che quel nome aveva quando è stato costruito. */
  function strudelVarLines(c) {
    return c.vars.map(v => `var ${v.name} = Timeline.envSignal(${c.id}, '${v.name}');`);
  }

  /* Hydra: ogni variabile diventa una funzione globale. Hydra chiama a ogni
     fotogramma le funzioni che riceve come parametri, quindi
     `osc(10, 0.1, luce)` segue l'inviluppo. Suona una clip visuale alla
     volta: i nomi non si scontrano. */
  const ownGlobals = new Set();   // nomi messi su window da qui: riusabili
  function exposeHydraVars(c) {
    for (const v of c.vars) {
      window[v.name] = () => varNow(c.id, v.name);
      ownGlobals.add(v.name);
    }
  }

  /** Il codice di una clip pronto da eseguire, con le sue variabili. */
  function withVars(c, code) {
    if (c.engine === 'hydra') { exposeHydraVars(c); return code; }
    return c.vars.length ? [...strudelVarLines(c), code].join('\n') : code;
  }

  /** Impila i codici delle clip sonore attive in un solo programma Strudel.
      Le righe setcpm/setcps vengono portate in testa (il tempo è globale);
      ogni pattern diventa un blocco `$: (…)`, così suonano tutti insieme
      sullo stesso clock di ciclo — è questo che tiene le tracce in sync.
      Le variabili di ogni clip vengono dichiarate subito prima del suo blocco. */
  function stackStrudel(items) {
    const setup = [], parts = [];
    for (const { clip, code } of items) {
      const rest = [];
      for (const line of String(code || '').split('\n')) {
        if (/^\s*set(?:cpm|cps)\s*\(/i.test(line)) setup.push(line.trim());
        else rest.push(line);
      }
      const body = rest.join('\n').trim();
      if (body) parts.push({ body, vars: strudelVarLines(clip) });
    }
    if (!parts.length) return null;
    if (parts.length === 1) return [...setup, ...parts[0].vars, parts[0].body].join('\n');
    return [...setup, ...parts.flatMap(p => [...p.vars,
      /^\s*\$\s*:/m.test(p.body) ? p.body : `$: (\n${p.body}\n)`   // già etichettato → lascia com'è
    ])].join('\n');
  }

  function setPlayBtn() {
    playBtn.textContent = playing && !paused ? _t('⏸ PAUSA') : _t('▶ PLAY');
    playBtn.classList.toggle('active-ok', playing && !paused);
  }

  function play() {
    if (playing && !paused) {          // → pausa
      paused = true;
      cancelAnimationFrame(rafId);
      Engines.stop();
      resetActive();
      markPlayingClips();
      setPlayBtn();
      return;
    }
    if (totalDuration() === 0) return;
    if (playT >= totalDuration()) playT = 0;
    playing = true; paused = false;
    startWall = performance.now() - playT * 1000;
    rafId = requestAnimationFrame(tick);
    setPlayBtn();
  }

  function stop() {
    playing = false; paused = false;
    cancelAnimationFrame(rafId);
    Engines.stop();
    resetActive();
    cycleCount.clear();
    movePlayhead(0);
    markPlayingClips();
    setPlayBtn();
  }

  function seek(t) {
    movePlayhead(t);
    if (playing && !paused) {
      startWall = performance.now() - playT * 1000;
      resetActive();                    // forza re-trigger (e nuova scelta 🎲)
    }
  }

  function clipAt(track, t) {
    return clips.find(c => c.track === track && t >= c.start && t < c.start + c.duration);
  }

  function logEnter(cur, trackLabel, which, n) {
    AppConsole.log('timeline', 'info',
      (n > 1
        ? _t('▶ clip «{label}» ({track}) — variante {which}/{n}', { label: cur.label, track: trackLabel.toLowerCase(), which: which + 1, n })
        : _t('▶ clip «{label}» ({track})', { label: cur.label, track: trackLabel.toLowerCase() })));
  }

  function tick(now) {
    if (!playing || paused) return;
    const t = (now - startWall) / 1000;
    const total = totalDuration();

    if (t >= total) {
      if (looping && total > 0) {
        startWall = now;
        resetActive();                  // al giro dopo le clip 🎲 ripescano
        movePlayhead(0);
        rafId = requestAnimationFrame(tick);
        return;
      }
      stop();
      return;
    }

    let uiDirty = false;

    /* VISUALE (traccia 0): enter/exit come prima, con scelta variante */
    {
      const cur = clipAt(0, t);
      const curId = cur ? cur.id : undefined;
      if (curId !== active[0]) {
        if (active[0] !== undefined) picked.delete(active[0]);
        active[0] = curId;
        uiDirty = true;
        if (cur) {
          const { code, which, n } = pickVariant(cur);
          picked.set(cur.id, code);
          Promise.resolve(Engines.run('hydra', withVars(cur, code))).then(res => {
            if (res.ok) logEnter(cur, TRACKS[0].label, which, n);
            else AppConsole.log('timeline', 'err', _t('clip «{label}»: {error}', { label: cur.label, error: res.error }), undefined, { engine: 'hydra', code });
            flagClipError(cur.id, !res.ok);
          });
        } else {
          Engines.stop('hydra');
        }
      }
    }

    /* SUONO (tracce 1..N): l'insieme delle clip attive determina lo stack.
       Quando cambia, un unico evaluate rimpiazza il tutto: le clip che
       proseguono non ripartono, perché i pattern sono funzioni del clock
       di ciclo condiviso — la sincronia è garantita dallo scheduler unico. */
    {
      let changed = false;
      const activeSound = [];
      for (let i = 1; i < TRACKS.length; i++) {
        const cur = clipAt(i, t);
        const curId = cur ? cur.id : undefined;
        if (curId !== active[i]) {
          changed = true; uiDirty = true;
          if (active[i] !== undefined) picked.delete(active[i]);
          active[i] = curId;
          if (cur) {
            const { code, which, n } = pickVariant(cur);
            picked.set(cur.id, code);
            logEnter(cur, TRACKS[i].label, which, n);
          }
        }
        if (cur) activeSound.push(cur);
      }
      if (changed) {
        const stacked = stackStrudel(activeSound.map(c => ({ clip: c, code: picked.get(c.id) })));
        if (!stacked) {
          Engines.stop('strudel');
        } else {
          Promise.resolve(Engines.run('strudel', stacked)).then(res => {
            if (!res.ok) AppConsole.log('timeline', 'err', _t('tracce suono: {error}', { error: res.error }), undefined, { engine: 'strudel', code: stacked });
            activeSound.forEach(c => flagClipError(c.id, !res.ok));
          });
        }
      }
    }

    if (uiDirty) markPlayingClips();
    movePlayhead(t);
    keepPlayheadVisible();
    rafId = requestAnimationFrame(tick);
  }

  function flagClipError(id, isErr) {
    const el = canvas.querySelector(`.t-block[data-id="${id}"]`);
    if (el) el.style.outline = isErr ? '1px solid var(--bad)' : '';
  }

  function markPlayingClips() {
    const ids = new Set(Object.values(active).filter(Boolean));
    canvas.querySelectorAll('.t-block').forEach(el =>
      el.classList.toggle('playing-now', ids.has(+el.dataset.id)));
  }

  function keepPlayheadVisible() {
    const x = playT * PX_PER_SEC;
    const left = scroll.scrollLeft, w = scroll.clientWidth;
    if (x < left + 40 || x > left + w - 60) {
      scroll.scrollLeft = Math.max(0, x - w * 0.2);
    }
  }

  playBtn.addEventListener('click', play);
  document.getElementById('tl-stop').addEventListener('click', stop);
  loopBtn.addEventListener('click', () => {
    looping = !looping;
    loopBtn.classList.toggle('active-accent', looping);
  });

  /* ── export / import ───────────────────────────────────────────────── */
  document.getElementById('tl-export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(serialize(), null, 2)],
      { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'performance-livelab.json';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  const importFile = document.getElementById('tl-import-file');
  document.getElementById('tl-import').addEventListener('click', () => importFile.click());
  importFile.addEventListener('change', () => {
    const f = importFile.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        if (applyState(JSON.parse(reader.result))) { commit(); render(); }
        else alert(_t('File non valido: manca l\'elenco delle clip.'));
      } catch (e) { alert(_t('File non leggibile: {error}', { error: e.message })); }
      importFile.value = '';
    };
    reader.readAsText(f);
  });

  /* ── boot ──────────────────────────────────────────────────────────── */
  load();
  lastSnap = JSON.stringify(serialize());

  return {
    render, play, stop, undo,
    get playing() { return playing && !paused; },
    /** Aggiunge il codice del LAB in coda alla traccia del suo motore
        (per il suono: quella che finisce prima, così le tracce si riempiono
        in modo bilanciato). */
    addFromLab(engine, code, label) {
      let track = 0;
      if (engine === 'strudel') {
        track = 1;
        let best = Infinity;
        for (let i = 1; i < TRACKS.length; i++) {
          const end = Math.max(0, ...trackClips(i, null).map(c => c.start + c.duration));
          if (end < best) { best = end; track = i; }
        }
      }
      const end = Math.max(0, ...trackClips(track, null).map(c => c.start + c.duration));
      return addClip(engine, code, end, 8, label, track);
    },
    removeSelected() { if (selId != null) removeClip(selId); },
    get hasSelection() { return selId != null; },
    copy: copySelected,
    cut() { if (copySelected()) removeClip(selId); },
    paste,
    get canPaste() { return clipboard != null; },
    /** Per il codice Strudel delle clip (vedi stackStrudel): la variabile
        come segnale continuo, letto a ogni evento. */
    envSignal(id, name) { return strudel.signal(() => varNow(id, name)); },
  };
})();
