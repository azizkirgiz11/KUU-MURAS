import { Link } from 'react-router-dom';
import { KUU_LEVEL } from '../../data/kuu.js';
import { useProgress } from '../../context/ProgressContext.jsx';
import Icon from '../ui/Icon.jsx';
import s from '../../styles/components/KuuCard.module.css';

const COVERS = ['/images/komuz-shyrdak.jpg', '/images/komuzchu-jailoo.jpg', '/images/suret-aksakal.jpg', '/images/oynoo-kyz.jpg', '/images/suret-jigit.jpg', '/images/notalar.jpg'];

export default function KuuCard({ kuu, index = 0 }) {
  const { fav, toggleFav } = useProgress();
  const on = Boolean(fav[kuu.slug]);
  return (
    <article className={s.card}>
      <Link to={`/kuu/${kuu.slug}`} className={s.link} aria-label={kuu.title}>
        <div className={s.cover}>
          <img src={COVERS[index % COVERS.length]} alt="" loading="lazy" />
          <span className={`${s.lv} ${s[kuu.level]}`}>{KUU_LEVEL[kuu.level]}</span>
        </div>
        <div className={s.body}>
          <h3>{kuu.title}</h3>
          <p>{kuu.author || 'Элдик күү'}</p>
          <small><Icon name="clock" size={14} />{kuu.minutes} мүн</small>
        </div>
      </Link>
      <button className={`${s.fav} ${on ? s.on : ''}`} onClick={() => toggleFav(kuu.slug)} aria-pressed={on} aria-label={on ? 'Тандалгандан алып салуу' : 'Тандалгандарга кошуу'}>
        <Icon name="heart" size={18} fill={on} />
      </button>
    </article>
  );
}
