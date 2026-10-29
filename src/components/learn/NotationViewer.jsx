import { useState } from 'react';
import Icon from '../ui/Icon.jsx';
import Placeholder from '../ui/Placeholder.jsx';
import s from '../../styles/components/NotationViewer.module.css';

const isPdf = (src) => /\.pdf($|\?)/i.test(src);

export default function NotationViewer({ sheets, slug }) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(1);
  if (!sheets?.length) {
    return (
      <Placeholder title="Нота баракчасы жакында кошулат">
        Нотаны (PNG, JPG, SVG же PDF) <code>public/media/notes/</code> ичине сал да,
        <code>src/data/media.js</code> ичинде <code>&apos;{slug}&apos;</code> үчүн жолун жаз.
      </Placeholder>
    );
  }
  const sheet = sheets[Math.min(i, sheets.length - 1)];
  const pdf = isPdf(sheet.src);
  return (
    <div className={s.wrap}>
      <div className={s.bar}>
        {sheets.length > 1 && (
          <div className={s.sheets} role="group" aria-label="Нота баракчалары">
            {sheets.map((x, k) => (
              <button key={x.src} aria-pressed={k === i} onClick={() => setI(k)}>{x.title}</button>
            ))}
          </div>
        )}
        <div className={s.tools}>
          {!pdf && (
            <>
              <button onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.2).toFixed(1)))} aria-label="Кичирейтүү"><Icon name="zoomOut" size={18} /></button>
              <span>{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom((z) => Math.min(2.6, +(z + 0.2).toFixed(1)))} aria-label="Чоңойтуу"><Icon name="zoomIn" size={18} /></button>
            </>
          )}
          <a href={sheet.src} download className={s.dl}><Icon name="download" size={18} />Жүктөө</a>
        </div>
      </div>
      <div className={s.stage}>
        {pdf ? (
          <object data={sheet.src} type="application/pdf" className={s.pdf} aria-label={sheet.title}>
            <p>PDF көрүнбөсө, <a href={sheet.src}>бул жерден ачыңыз</a>.</p>
          </object>
        ) : (
          <img src={sheet.src} alt={sheet.title} style={{ width: `${zoom * 100}%` }} />
        )}
      </div>
    </div>
  );
}
