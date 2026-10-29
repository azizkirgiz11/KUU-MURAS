import { useEffect } from 'react';
import Icon from './Icon.jsx';
import s from '../../styles/components/Lightbox.module.css';

export default function Lightbox({ items, index, onClose, onIndex }) {
  const item = items[index];
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, items.length, onClose, onIndex]);
  if (!item) return null;
  return (
    <div className={s.overlay} role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <figure className={s.fig} onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.title} />
        <figcaption><strong>{item.title}</strong><span>{item.credit}</span></figcaption>
      </figure>
      <button className={s.close} onClick={onClose} aria-label="Жабуу"><Icon name="close" /></button>
      <button className={`${s.nav} ${s.prev}`} onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + items.length) % items.length); }} aria-label="Мурунку"><Icon name="chevL" size={26} /></button>
      <button className={`${s.nav} ${s.next}`} onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % items.length); }} aria-label="Кийинки"><Icon name="chevR" size={26} /></button>
    </div>
  );
}
