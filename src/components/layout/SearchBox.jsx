import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LESSONS } from '../../data/lessons.js';
import { KUU } from '../../data/kuu.js';
import Icon from '../ui/Icon.jsx';
import s from '../../styles/components/SearchBox.module.css';

export default function SearchBox() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const nav = useNavigate();

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (t.length < 2) return [];
    return [
      ...LESSONS.filter((l) => l.title.toLowerCase().includes(t)).map((l) => ({ kind: 'Сабак', title: l.title, to: `/sabaktar/${l.slug}` })),
      ...KUU.filter((k) => k.title.toLowerCase().includes(t)).map((k) => ({ kind: 'Күү', title: k.title, to: `/kuu/${k.slug}` })),
    ].slice(0, 7);
  }, [q]);

  useEffect(() => {
    const onDoc = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const go = (to) => { nav(to); setQ(''); setOpen(false); };
  const onSubmit = (e) => {
    e.preventDefault();
    if (results[0]) go(results[0].to);
  };

  return (
    <div className={s.wrap} ref={ref}>
      <form className={s.box} onSubmit={onSubmit} role="search">
        <Icon name="search" size={18} />
        <input value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} placeholder="Сабак же күү издөө..." aria-label="Издөө" />
      </form>
      {open && q.trim().length >= 2 && (
        <ul className={s.list}>
          {results.length === 0 && <li className={s.empty}>Эч нерсе табылган жок</li>}
          {results.map((r) => (
            <li key={r.to}>
              <button onClick={() => go(r.to)}><em>{r.kind}</em>{r.title}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
