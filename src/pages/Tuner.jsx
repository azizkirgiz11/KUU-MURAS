import { useEffect, useRef, useState } from 'react';
import { DEFAULT_TUNING, TUNINGS } from '../data/tunings.js';
import { audio, drone } from '../lib/audio.js';
import { freqOf, freqToMidi, nearestNote, noteInfo } from '../lib/music.js';
import { detectPitch } from '../lib/pitch.js';
import Button from '../components/ui/Button.jsx';
import Icon from '../components/ui/Icon.jsx';
import s from '../styles/pages/Tuner.module.css';

const ROMAN = ['I', 'II', 'III'];

export default function Tuner() {
  const [key, setKey] = useState(DEFAULT_TUNING);
  const tuning = TUNINGS[key];
  const [mic, setMic] = useState('off');
  const [read, setRead] = useState(null);
  const stopRef = useRef(null);

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
      const c = audio();
      const src = c.createMediaStreamSource(stream);
      const an = c.createAnalyser();
      an.fftSize = 2048;
      src.connect(an);
      const buf = new Float32Array(an.fftSize);
      const id = setInterval(() => {
        an.getFloatTimeDomainData(buf);
        const f = detectPitch(buf, c.sampleRate);
        if (f > 60 && f < 1200) setRead(f);
      }, 100);
      stopRef.current = () => { clearInterval(id); stream.getTracks().forEach((t) => t.stop()); src.disconnect(); };
      setMic('on');
    } catch {
      setMic('error');
    }
  };
  const stopMic = () => { stopRef.current?.(); stopRef.current = null; setMic('off'); setRead(null); };
  useEffect(() => () => stopRef.current?.(), []);

  let target = null;
  if (read) {
    const m = freqToMidi(read);
    const st = tuning.strings.reduce((a, b) => (Math.abs(b.midi - m) < Math.abs(a.midi - m) ? b : a));
    const idx = tuning.strings.indexOf(st);
    target = { idx, cents: Math.round((m - st.midi) * 100), note: nearestNote(read) };
  }
  const cents = target ? Math.max(-50, Math.min(50, target.cents)) : 0;
  const ok = target && Math.abs(target.cents) <= 8;

  return (
    <div className={s.page}>
      <header className={s.head}>
        <span className={s.kicker}>Күүлөгүч</span>
        <h1>Комузду күүлө</h1>
        <p>Бардык кылдын үнүн угуп, өз комузуңа салыштыр. Же микрофонду күйгүзүп, чертилген кылдын так же так эместигин көр.</p>
      </header>

      <div className={s.picker} role="group" aria-label="Күүлөө түрү">
        {Object.values(TUNINGS).map((t) => (
          <button key={t.id} aria-pressed={key === t.id} onClick={() => setKey(t.id)}>
            <b>{t.name}</b><small>{t.desc}</small>
          </button>
        ))}
      </div>

      <section className={s.strings}>
        {tuning.strings.map((st, i) => (
          <button key={i} className={s.string} onClick={() => drone(freqOf(tuning, i, 0), 3)}>
            <span className={s.roman}>{ROMAN[i]}</span>
            <b>{noteInfo(st.midi).solfege}</b>
            <em>{noteInfo(st.midi).letter}</em>
            <small><Icon name="play" size={12} /> Ойнотуу (3 сек)</small>
          </button>
        ))}
      </section>

      <section className={s.mic}>
        <div className={s.micHead}>
          <h2>Микрофон менен текшерүү</h2>
          {mic === 'on' ? <Button variant="ghost" onClick={stopMic}>Токтотуу</Button> : <Button icon="mic" onClick={startMic}>Микрофонду күйгүзүү</Button>}
        </div>
        {mic === 'error' && <p className={s.error}>Микрофонго жете алган жокпуз. Браузерден уруксат бериңиз.</p>}
        {mic === 'off' && <p className={s.hint}>Комузду микрофонго жакын кармап, бир кылды чертип көр. Тынч жерде жакшы иштейт.</p>}
        {mic === 'on' && (
          <div className={s.gauge}>
            <div className={s.note}>
              {target ? (<><b>{target.note.solfege}</b><span>{target.note.letter}{target.note.octave}</span></>) : <small>Кылды чертип көр...</small>}
            </div>
            <div className={s.meter} aria-hidden="true">
              <i className={s.center} />
              <i className={`${s.needle} ${ok ? s.good : ''}`} style={{ left: `${50 + cents}%` }} />
            </div>
            <div className={s.labels}><span>Төмөн</span><span>Так</span><span>Жогору</span></div>
            {target && (
              <p className={`${s.verdict} ${ok ? s.good : ''}`}>
                {ok ? `${ROMAN[target.idx]} кыл так күүлөнгөн ✓` : `${ROMAN[target.idx]} кыл: ${target.cents > 0 ? 'бир аз жогору' : 'бир аз төмөн'} (${target.cents > 0 ? '+' : ''}${target.cents} цент)`}
              </p>
            )}
          </div>
        )}
      </section>

      <section className={s.tips}>
        <h2>Кантип күүлөйбүз?</h2>
        <ol>
          <li>Эки четки кылды (I жана III) бирдей үнгө келтир.</li>
          <li>Ортоңку кылды (II) тандалган күүлөө боюнча квинта же кварта жогору күүлө.</li>
          <li>Кылды акырын тарт, ар бир өзгөртүүдөн кийин башка кылдарды кайра текшер.</li>
        </ol>
        <p>Жазылган нотанын так бийиктиги мугалимиңиздин күүлөөсүнөн айырмаланышы мүмкүн: керек болсо <code>src/data/tunings.js</code> ичинде өзгөртсө болот.</p>
      </section>
    </div>
  );
}
