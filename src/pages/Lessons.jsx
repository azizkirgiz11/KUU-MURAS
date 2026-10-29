import { useProgress } from '../context/ProgressContext.jsx';
import { LESSONS, MODULES, lessonsOfModule } from '../data/lessons.js';
import Button from '../components/ui/Button.jsx';
import Icon from '../components/ui/Icon.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import LessonCard from '../components/learn/LessonCard.jsx';
import s from '../styles/pages/Lessons.module.css';

export default function Lessons() {
  const { done } = useProgress();
  const total = LESSONS.length;
  const count = LESSONS.filter((l) => done[l.slug]).length;
  const next = LESSONS.find((l) => !done[l.slug]);
  let offset = 0;

  return (
    <div className={s.page}>
      <header className={s.head}>
        <div>
          <span className={s.kicker}>Окуу программасы</span>
          <h1>Комузду кадам сайын үйрөн</h1>
          <p>Төрт модуль, он алты сабак. Ар бир сабакта үч жол бар: видео, ноталар жана санарип комуз.</p>
        </div>
        <div className={s.card}>
          <b>{count} / {total}</b>
          <span>сабак аткарылды</span>
          <ProgressBar value={count} max={total} label="Жалпы прогресс" />
          {next ? <Button to={`/sabaktar/${next.slug}`} size="sm" iconRight="arrow">{count ? 'Улантуу' : 'Баштоо'}</Button> : <p className={s.finish}>Куттуктайбыз, программа бүттү! 🎉</p>}
        </div>
      </header>

      <div className={s.legend}>
        <span><Icon name="video" size={16} />Видео</span>
        <span><Icon name="note" size={16} />Ноталар</span>
        <span><Icon name="komuz" size={16} />Санарип комуз</span>
      </div>

      {MODULES.map((m, mi) => {
        const ls = lessonsOfModule(m.id);
        const start = offset;
        offset += ls.length;
        const d = ls.filter((l) => done[l.slug]).length;
        return (
          <section key={m.id} id={m.id} className={s.module}>
            <div className={s.moduleHead}>
              <span className={s.num}>{mi + 1}</span>
              <div>
                <h2>{m.title}</h2>
                <p>{m.subtitle}</p>
              </div>
              <span className={s.count}>{d}/{ls.length}</span>
            </div>
            <div className={s.list}>
              {ls.map((l, i) => <LessonCard key={l.slug} lesson={l} index={start + i} />)}
            </div>
          </section>
        );
      })}
    </div>
  );
}
