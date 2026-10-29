// Web Audio: комуздун чертилген үнү, узак үн, метроном шыкылдагы.
let ctx;
export function audio() {
  if (!ctx) {
    const C = window.AudioContext || window.webkitAudioContext;
    ctx = new C();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export function pluck(freq, { when = 0, dur = 1.5, gain = 0.45 } = {}) {
  const c = audio();
  const t = c.currentTime + when;
  const out = c.createGain();
  const lp = c.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.setValueAtTime(Math.min(freq * 8, 7000), t);
  lp.frequency.exponentialRampToValueAtTime(Math.max(freq * 1.4, 200), t + dur);
  out.gain.setValueAtTime(0.0001, t);
  out.gain.exponentialRampToValueAtTime(gain, t + 0.006);
  out.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  [['sawtooth', 0], ['triangle', 4], ['sine', -3]].forEach(([type, det]) => {
    const o = c.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    o.detune.value = det;
    o.connect(lp);
    o.start(t);
    o.stop(t + dur + 0.05);
  });
  lp.connect(out);
  out.connect(c.destination);
}

// Күүлөө үчүн узак үн
export function drone(freq, seconds = 3) {
  const c = audio();
  const t = c.currentTime;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.25, t + 0.08);
  g.gain.setValueAtTime(0.25, t + seconds - 0.4);
  g.gain.exponentialRampToValueAtTime(0.0001, t + seconds);
  ['triangle', 'sine'].forEach((type) => {
    const o = c.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    o.connect(g);
    o.start(t);
    o.stop(t + seconds + 0.05);
  });
  g.connect(c.destination);
}

export function click(accent = false, when = 0) {
  const c = audio();
  const t = c.currentTime + when;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = 'square';
  o.frequency.value = accent ? 1600 : 1000;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(accent ? 0.35 : 0.2, t + 0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
  o.connect(g);
  g.connect(c.destination);
  o.start(t);
  o.stop(t + 0.06);
}
