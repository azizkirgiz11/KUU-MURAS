import { useState } from 'react';
import Lightbox from './Lightbox.jsx';
import s from '../../styles/components/Gallery.module.css';

export default function Gallery({ items }) {
  const [open, setOpen] = useState(-1);
  return (
    <>
      <div className={s.grid}>
        {items.map((it, i) => (
          <button key={it.src + i} className={`${s.item} ${i === 0 ? s.wide : ''}`} onClick={() => setOpen(i)} aria-label={`${it.title} — чоңойтуу`}>
            <img src={it.src} alt={it.title} loading="lazy" />
            <span>{it.title}</span>
          </button>
        ))}
      </div>
      {open >= 0 && <Lightbox items={items} index={open} onClose={() => setOpen(-1)} onIndex={setOpen} />}
    </>
  );
}
