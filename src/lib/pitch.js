// Автокорреляция менен жыштыкты аныктоо (микрофон күүлөгүчү үчүн).
export function detectPitch(buf, sampleRate) {
  let rms = 0;
  for (let i = 0; i < buf.length; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / buf.length);
  if (rms < 0.012) return -1;

  const thr = 0.2;
  let r1 = 0;
  let r2 = buf.length - 1;
  for (let i = 0; i < buf.length / 2; i++) if (Math.abs(buf[i]) < thr) { r1 = i; break; }
  for (let i = 1; i < buf.length / 2; i++) if (Math.abs(buf[buf.length - i]) < thr) { r2 = buf.length - i; break; }
  const b = buf.slice(r1, r2);
  const n = b.length;
  if (n < 64) return -1;

  const c = new Float32Array(n);
  for (let i = 0; i < n; i++) for (let j = 0; j < n - i; j++) c[i] += b[j] * b[j + i];

  let d = 0;
  while (d < n - 1 && c[d] > c[d + 1]) d++;
  let maxv = -1;
  let maxp = -1;
  for (let i = d; i < n; i++) if (c[i] > maxv) { maxv = c[i]; maxp = i; }
  if (maxp < 1 || maxp >= n - 1) return -1;

  let t0 = maxp;
  const x1 = c[t0 - 1];
  const x2 = c[t0];
  const x3 = c[t0 + 1];
  const a = (x1 + x3 - 2 * x2) / 2;
  const bb = (x3 - x1) / 2;
  if (a) t0 -= bb / (2 * a);
  return sampleRate / t0;
}
