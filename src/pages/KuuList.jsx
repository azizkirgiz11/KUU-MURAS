import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { KUU } from '../data/kuu.js';
import { useProgress } from '../context/ProgressContext.jsx';
import Chips from '../components/ui/Chips.jsx';
import Icon from '../components/ui/Icon.jsx';
import KuuCard from '../components/learn/KuuCard.jsx';
import s from '../styles/pages/KuuList.module.css';

const LEVELS = [
  { value: 'all', label: 'Баары' },
  { value: 'easy', label: 'Жеңил' },
  { value: 'medium', label: 'Орто' },
  { value: 'hard', label: 'Татаал' },
  { value: 'fav', label: '♥ Тандалгандар' },
];

export default function KuuList() {
  const [params, setParams] = useSearchParams();
  const { fav } = useProgress();
  const q = params.get('q') ?? '';
  const level = params.get('level') ?? 'all';
  const set = (k, v) => setParams((p) => { const n = new URLSearchParams(p); if (v && v !== 'all') n.set(k, v); else n.delete(k); return n; }, { replace: true });

  const items = useMemo(() => KUU.filter((k) => {
    if (level === 'fav' && !fav[k.slug]) return false;
    if (['easy', 'medium', 'hard'].includes(level) && k.level !== level) return false;
    return !q || k.title.toLowerCase().includes(q.toLowerCase());
  }), [q, level, fav]);

  return (
    <div className={s.page}>
      <header className={s.head}>
        <span className={s.kicker}>Күүлөр китепканасы</span>
        <h1>Күүнү танда — комузду ойнот</h1>
        <p>Ар бир күүнүн өз барагы бар: видео, ноталар жана санарип комуз.</p>
      </header>
      <div className={s.filters}>
        <label className={s.search}>
          <Icon name="search" size={18} />
          <input value={q} onChange={(e) => set('q', e.target.value)} placeholder="Күү аты..." aria-label="Күү издөө" />
        </label>
        <Chips options={LEVELS} value={level} onChange={(v) => set('level', v)} label="Деңгээл боюнча чыпкалоо" />
      </div>
      {items.length ? (
        <div className={s.grid}>{items.map((k, i) => <KuuCard key={k.slug} kuu={k} index={i} />)}</div>
      ) : (
        <p className={s.empty}>Эч нерсе табылган жок. Чыпканы өзгөртүп көр.</p>
      )}
    </div>
  );
}
