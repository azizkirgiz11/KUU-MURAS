import { useEffect, useMemo, useRef, useState } from 'react';
import { TUNINGS, DEFAULT_TUNING } from '../../data/tunings.js';
import { pluck } from '../../lib/audio.js';
import { freqOf, midiToFreq, noteInfo, noteOf } from '../../lib/music.js';
import Icon from '../ui/Icon.jsx';
import SpeedControl from './SpeedControl.jsx';
import s from '../../styles/components/DigitalKomuz.module.css';

// SVG өлчөмдөрү
const W = 1000;
const H = 300;
const X0 = 84; // жоок (nut)
const L = 820; // кылдын иштеген узундугу
const BR = X0 + L; // тепке
const NECK_END = 640;
const SY = [108, 150, 192];
const BASE_BPM = 72;
const ROMAN = ['I', 'II', 'III'];
const xOf = (n) => X0 + L * (1 - 2 ** (-n / 12));

export default function DigitalKomuz({ tab = [], defaultTuning = DEFAULT_TUNING }) {
  const [tuningKey, setTuningKey] = useState(defaultTuning);
  const tuning = TUNINGS[tuningKey];
  const [sel, setSel] = useState(null); // { s, n, f }
  const [snap, setSnap] = useState(true);
  const [guides, setGuides] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(false);
  const [idx, setIdx] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const svgRef = useRef(null);
  const timer = useRef(null);
  const live = useRef({ speed, loop, tab, tuning });
  live.current = { speed, loop, tab, tuning };

  useEffect(() => () => clearTimeout(timer.current), []);

  const stop = () => {
    clearTimeout(timer.current);
    setPlaying(false);
    setIdx(-1);
  };
  const step = (i) => {
    const { tab: t, speed: sp, loop: lp, tuning: tu } = live.current;
    if (i >= t.length) {
      if (lp && t.length) { step(0); return; }
      stop();
      return;
    }
    const st = t[i];
    setIdx(i);
    setSel({ s: st.s, n: st.p, f: st.f });
    pluck(freqOf(tu, st.s, st.p), { dur: Math.max(0.8, st.b * 1.2) });
    timer.current = setTimeout(() => step(i + 1), (st.b * 60000) / (BASE_BPM * sp));
  };
  const start = () => {
    clearTimeout(timer.current);
    setPlaying(true);
    step(0);
  };

  const hit = (e) => {
    const svg = svgRef.current;
    const r = svg.getBoundingClientRect();
    const x = ((e.clientX - r.left) * W) / r.width;
    const y = ((e.clientY - r.top) * H) / r.height;
    let si = 0;
    SY.forEach((yy, k) => { if (Math.abs(yy - y) < Math.abs(SY[si] - y)) si = k; });
    const t = Math.min(0.9, Math.max(0, (x - X0) / L));
    let n = -12 * Math.log2(1 - t);
    if (snap) n = Math.round(n);
    stop();
    setSel({ s: si, n, f: 0 });
    pluck(midiToFreq(tuning.strings[si].midi + n));
  };

  const openString = (si) => {
    stop();
    setSel({ s: si, n: 0, f: 0 });
    pluck(freqOf(tuning, si, 0));
  };
  const playChip = (i) => {
    stop();
    const st = tab[i];
    setIdx(i);
    setSel({ s: st.s, n: st.p, f: st.f });
    pluck(freqOf(tuning, st.s, st.p));
  };

  const info = sel ? noteInfo(tuning.strings[sel.s].midi + sel.n) : null;
  const freq = sel ? midiToFreq(tuning.strings[sel.s].midi + sel.n) : 0;
  const cents = sel ? Math.round((sel.n - Math.round(sel.n)) * 100) : 0;
  const labelString = sel ? sel.s : 1;
  const marks = useMemo(() => Array.from({ length: 14 }, (_, i) => i + 1), []);

  return (
    <div className={s.wrap}>
      <div className={s.controls}>
        <label className={s.field}>
          <span>Күүлөө</span>
          <select value={tuningKey} onChange={(e) => { stop(); setTuningKey(e.target.value); }}>
            {Object.values(TUNINGS).map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </label>
        <label className={s.check}><input type="checkbox" checked={snap} onChange={(e) => setSnap(e.target.checked)} /><span>Жарым тонго жабышуу</span></label>
        <label className={s.check}><input type="checkbox" checked={guides} onChange={(e) => setGuides(e.target.checked)} /><span>Позиция белгилери</span></label>
      </div>

      <div className={s.board}>
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className={s.svg} role="img" aria-label="Санарип комуз: моюнга басып, нотаны ук">
          <defs>
            <linearGradient id="dk-wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b97a42" /><stop offset="1" stopColor="#8a5428" /></linearGradient>
            <linearGradient id="dk-body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#efcf9d" /><stop offset="1" stopColor="#d3a465" /></linearGradient>
            <linearGradient id="dk-neck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4a2b18" /><stop offset="1" stopColor="#2e1a0e" /></linearGradient>
          </defs>
          <path d="M600 92 C660 84 700 24 800 30 C910 36 968 110 964 150 C968 192 910 266 800 270 C700 276 660 216 600 208 Z" fill="url(#dk-body)" stroke="#8a5428" strokeWidth="3" />
          <circle cx="770" cy="150" r="8" fill="#2a1a10" />
          <rect x="0" y="104" width={X0 - 10} height="92" rx="14" fill="url(#dk-wood)" />
          {[116, 150, 184].map((y) => <circle key={y} cx="22" cy={y} r="7" fill="#e8c48a" stroke="#6b4020" strokeWidth="2" />)}
          <rect x={X0 - 14} y="88" width={NECK_END - X0 + 24} height="124" fill="url(#dk-neck)" />
          <rect x={X0 - 8} y="88" width="8" height="124" fill="#f0e4cf" />
          <rect x={BR - 6} y={SY[0] - 12} width="12" height={SY[2] - SY[0] + 24} rx="3" fill="#5a3418" />

          {guides && marks.map((n) => (
            <g key={n}>
              <line x1={xOf(n)} x2={xOf(n)} y1="88" y2="212" stroke="#f0e4cf" strokeOpacity={n % 12 === 0 ? 0.6 : 0.2} strokeWidth={n % 12 === 0 ? 2 : 1} />
              {n <= 12 && <text x={xOf(n) - 1} y="238" textAnchor="middle" className={s.guideText}>{noteOf(tuning, labelString, n).letter}</text>}
            </g>
          ))}
          {guides && <text x={X0 - 3} y="238" textAnchor="middle" className={s.guideText}>{noteOf(tuning, labelString, 0).letter}</text>}

          {SY.map((y, k) => (
            <g key={k}>
              <line x1={X0 - 8} x2={BR} y1={y} y2={y} stroke="#f4ead6" strokeWidth={k === 1 ? 2.6 : 2} strokeLinecap="round" />
              <text x="22" y={y + 4} textAnchor="middle" className={s.pegText}>{ROMAN[k]}</text>
            </g>
          ))}

          {sel && (
            <g className={s.marker} style={{ transform: `translate(${xOf(sel.n)}px, ${SY[sel.s]}px)` }}>
              <circle r="15" className={s.dot} />
              <text y="5" textAnchor="middle" className={s.dotText}>{sel.f ? sel.f : sel.n === 0 ? '○' : ''}</text>
            </g>
          )}
          {/* басуу зонасы */}
          <rect x={X0 - 10} y="80" width={NECK_END - X0 + 30} height="140" fill="transparent" onPointerDown={hit} style={{ cursor: 'pointer' }} />
        </svg>
      </div>

      <div className={s.readout} aria-live="polite">
        {info ? (
          <>
            <b>{info.solfege}</b><span className={s.letter}>{info.letter}{info.octave}</span>
            <small>{ROMAN[sel.s]} кыл · {Math.round(freq)} Гц{!snap && cents !== 0 ? ` · ${cents > 0 ? '+' : ''}${cents} цент` : ''}</small>
          </>
        ) : (
          <small>Моюндун үстүнө басып же төмөнкү баскычтарды колдонуп, үндү ук.</small>
        )}
      </div>

      <div className={s.open}>
        {tuning.strings.map((st, k) => (
          <button key={k} onClick={() => openString(k)}>
            <small>{ROMAN[k]} кыл · ачык</small>
            <b>{noteInfo(st.midi).label}</b>
          </button>
        ))}
      </div>

      {tab.length > 0 ? (
        <section className={s.seq}>
          <div className={s.seqHead}>
            <h3>Көнүгүү ырааттуулугу</h3>
            <div className={s.transport}>
              <button className={s.go} onClick={playing ? stop : start}>
                <Icon name={playing ? 'pause' : 'play'} size={18} />{playing ? 'Токтотуу' : 'Ойнотуу'}
              </button>
              <label className={s.check}><input type="checkbox" checked={loop} onChange={(e) => setLoop(e.target.checked)} /><span>Кайталоо</span></label>
            </div>
          </div>
          <div className={s.chips}>
            {tab.map((st, i) => {
              const ni = noteOf(tuning, st.s, st.p);
              return (
                <button key={i} className={`${s.chip} ${idx === i ? s.now : ''}`} onClick={() => playChip(i)}>
                  <b>{ni.solfege}</b><span>{ni.letter}</span>
                  <small>{ROMAN[st.s]} · {st.f ? `${st.f}-манжа` : 'ачык'}</small>
                </button>
              );
            })}
          </div>
          <SpeedControl value={speed} onChange={setSpeed} presets={[0.25, 0.5, 0.75, 1, 1.25, 1.5]} />
        </section>
      ) : (
        <p className={s.empty}>
          Бул сабак үчүн көнүгүү ырааттуулугу азырынча кошула элек. Ал <code>tab</code> талаасында жазылат
          (<code>src/data/lessons.js</code> же <code>kuu.js</code>). Ага чейин санарип комузду эркин сынап көрсө болот.
        </p>
      )}
    </div>
  );
}
