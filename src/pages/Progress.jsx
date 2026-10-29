import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext.jsx';
import { LESSONS, lessonBySlug } from '../data/lessons.js';
import { KUU, kuuBySlug } from '../data/kuu.js';
import Button from '../components/ui/Button.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import KuuCard from '../components/learn/KuuCard.jsx';
import s from '../styles/pages/Progress.module.css';

export default function Progress() {
  const { done, fav, last, reset } = useProgress();
  const doneList = LESSONS.filter((l) => done[l.slug]);
  const minutes = doneList.reduce((a, l) => a + l.minutes, 0);
  const favList = KUU.filter((k) => fav[k.slug]);
  const lastItem = last ? (last.type === 'lesson' ? lessonBySlug(last.slug) : kuuBySlug(last.slug)) : null;
  const lastTo = last ? (last.type === 'lesson' ? `/sabaktar/${last.slug}` : `/kuu/${last.slug}`) : '/sabaktar';
  const next = LESSONS.find((l) => !done[l.slug]);

  const onReset = () => {
    if (window.confirm('Бардык прогресс жана тандалгандар өчүрүлөт. Улантасызбы?')) reset();
  };

  return (
    <div className={s.page}>
      <header className={s.head}>
        <span className={s.kicker}>Менин жолум</span>
        <h1>Окуу прогрессим</h1>
        <p>Прогресс бул браузерде сакталат. Кийин аккаунт системасы кошулганда, ал түзмөктөр арасында синхрондолот.</p>
      </header>

      <section className={s.stats}>
        <div><b>{doneList.length}<small>/{LESSONS.length}</small></b><span>аткарылган сабак</span></div>
        <div><b>{minutes}</b><span>мүнөт окуу</span></div>
        <div><b>{favList.length}</b><span>тандалган күү</span></div>
      </section>
      <ProgressBar value={doneList.length} max={LESSONS.length} label="Жалпы прогресс" />

      <section className={s.continue}>
        <div>
          <span className={s.kicker}>Эң акыркы кайда калдың</span>
          <h2>{lastItem ? lastItem.title : 'Азырынча баштала элек'}</h2>
          <p>{lastItem ? (last.type === 'lesson' ? 'Акыркы ачылган сабак' : 'Акыркы ачылган күү') : 'Биринчи сабакты ачып баштап көр.'}</p>
        </div>
        <Button to={lastTo} iconRight="arrow">{lastItem ? 'Улантуу' : 'Баштоо'}</Button>
      </section>

      {next && lastItem?.slug !== next.slug && (
        <p className={s.next}>Кийинки сунуш: <Link to={`/sabaktar/${next.slug}`}>{next.title}</Link></p>
      )}

      <section className={s.block}>
        <h2>Аткарылган сабактар</h2>
        {doneList.length ? (
          <ul className={s.list}>
            {doneList.map((l) => <li key={l.slug}><Link to={`/sabaktar/${l.slug}`}>{l.title}</Link><small>{new Date(done[l.slug]).toLocaleDateString('ky-KG')}</small></li>)}
          </ul>
        ) : <p className={s.empty}>Сабактарды ачып, «Аткарылды деп белгиле» баскычын бас.</p>}
      </section>

      <section className={s.block}>
        <h2>Тандалган күүлөр</h2>
        {favList.length ? (
          <div className={s.grid}>{favList.map((k, i) => <KuuCard key={k.slug} kuu={k} index={i} />)}</div>
        ) : <p className={s.empty}>Күүнүн үстүндөгү жүрөк баскычын басып, тандалгандарга кош.</p>}
      </section>

      <button className={s.reset} onClick={onReset}>Прогрессти тазалоо</button>
    </div>
  );
}
