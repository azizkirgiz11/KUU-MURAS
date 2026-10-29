import { Link } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext.jsx';
import { lessonBySlug, LESSONS } from '../../data/lessons.js';
import { kuuBySlug } from '../../data/kuu.js';
import Widget from '../ui/Widget.jsx';
import Icon from '../ui/Icon.jsx';
import s from '../../styles/components/MiniCard.module.css';

export default function ContinueCard() {
  const { last } = useProgress();
  const item = last && (last.type === 'lesson' ? lessonBySlug(last.slug) : kuuBySlug(last.slug));
  const to = item ? (last.type === 'lesson' ? `/sabaktar/${last.slug}` : `/kuu/${last.slug}`) : `/sabaktar/${LESSONS[0].slug}`;
  return (
    <Widget title="Улантуу" icon="play">
      <Link to={to} className={s.card}>
        <span className={s.text}>
          <small>{item ? (last.type === 'lesson' ? 'Акыркы сабак' : 'Акыркы күү') : 'Баштоо'}</small>
          <b>{item ? item.title : LESSONS[0].title}</b>
        </span>
        <span className={s.go}><Icon name="arrow" size={18} /></span>
      </Link>
    </Widget>
  );
}
