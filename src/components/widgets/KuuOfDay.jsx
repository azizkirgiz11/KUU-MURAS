import { Link } from 'react-router-dom';
import { KUU, KUU_LEVEL } from '../../data/kuu.js';
import { dayOfYear } from '../../lib/dates.js';
import Widget from '../ui/Widget.jsx';
import Icon from '../ui/Icon.jsx';
import s from '../../styles/components/MiniCard.module.css';

export default function KuuOfDay() {
  const k = KUU[dayOfYear() % KUU.length];
  return (
    <Widget title="Күндүн күүсү" icon="note">
      <Link to={`/kuu/${k.slug}`} className={s.card}>
        <span className={s.text}>
          <small>{KUU_LEVEL[k.level]} · {k.minutes} мүн</small>
          <b>{k.title}</b>
        </span>
        <span className={s.go}><Icon name="arrow" size={18} /></span>
      </Link>
    </Widget>
  );
}
