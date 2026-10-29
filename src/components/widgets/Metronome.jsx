import { useEffect, useState } from 'react';
import { audio, click } from '../../lib/audio.js';
import Widget from '../ui/Widget.jsx';
import Icon from '../ui/Icon.jsx';
import s from '../../styles/components/Metronome.module.css';

export default function Metronome() {
  const [bpm, setBpm] = useState(70);
  const [on, setOn] = useState(false);
  const [beat, setBeat] = useState(-1);

  useEffect(() => {
    if (!on) { setBeat(-1); return undefined; }
    const c = audio();
    let next = c.currentTime + 0.06;
    let b = 0;
    const timers = [];
    const id = setInterval(() => {
      while (next < c.currentTime + 0.15) {
        const delay = next - c.currentTime;
        const idx = b % 4;
        click(idx === 0, delay);
        timers.push(setTimeout(() => setBeat(idx), Math.max(0, delay * 1000)));
        next += 60 / bpm;
        b += 1;
      }
    }, 30);
    return () => { clearInterval(id); timers.forEach(clearTimeout); };
  }, [on, bpm]);

  return (
    <Widget title="Метроном" icon="metronome">
      <div className={s.row}>
        <button className={s.play} onClick={() => setOn((v) => !v)} aria-label={on ? 'Токтотуу' : 'Баштоо'}>
          <Icon name={on ? 'pause' : 'play'} size={20} />
        </button>
        <div className={s.bpm}><b>{bpm}</b><small>согуу/мүн</small></div>
        <div className={s.dots} aria-hidden="true">
          {[0, 1, 2, 3].map((i) => <i key={i} className={beat === i ? s.on : ''} />)}
        </div>
      </div>
      <input className={s.range} type="range" min="40" max="180" value={bpm} onChange={(e) => setBpm(+e.target.value)} aria-label="Темп" />
    </Widget>
  );
}
