import { Link } from 'react-router-dom';
import { LEVEL_LABEL } from '../../data/lessons.js';
import { useProgress } from '../../context/ProgressContext.jsx';
import Icon from '../ui/Icon.jsx';
import s from '../../styles/components/LessonCard.module.css';

export default function LessonCard({ lesson, index }) {
  const { done } = useProgress();
  const isDone = Boolean(done[lesson.slug]);
  return (
    <Link to={`/sabaktar/${lesson.slug}`} className={`${s.card} ${isDone ? s.done : ''}`}>
      <span className={s.num}>{isDone ? <Icon name="check" size={18} /> : index + 1}</span>
      <span className={s.body}>
        <b>{lesson.title}</b>
        <small>{lesson.summary}</small>
        <span className={s.meta}>
          <i className={`${s.lv} ${s[lesson.level]}`}>{LEVEL_LABEL[lesson.level]}</i>
          <em><Icon name="clock" size={14} />{lesson.minutes} мүн</em>
        </span>
      </span>
      <Icon name="chevR" size={20} className={s.go} />
    </Link>
  );
}
