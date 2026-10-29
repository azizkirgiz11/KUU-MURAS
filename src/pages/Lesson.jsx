import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LESSONS, LEVEL_LABEL, MODULES, lessonBySlug, lessonIndex } from '../data/lessons.js';
import { useProgress } from '../context/ProgressContext.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import Button from '../components/ui/Button.jsx';
import Icon from '../components/ui/Icon.jsx';
import LearnTabs from '../components/learn/LearnTabs.jsx';
import NotFound from './NotFound.jsx';
import s from '../styles/pages/Lesson.module.css';

export default function Lesson() {
  const { slug } = useParams();
  const lesson = lessonBySlug(slug);
  const { done, toggleDone, setLast } = useProgress();

  useEffect(() => { if (lesson) setLast('lesson', slug); }, [lesson, slug, setLast]);
  if (!lesson) return <NotFound />;

  const i = lessonIndex(slug);
  const prev = LESSONS[i - 1];
  const next = LESSONS[i + 1];
  const mod = MODULES.find((m) => m.id === lesson.module);
  const isDone = Boolean(done[slug]);

  return (
    <article className={s.page}>
      <Breadcrumbs items={[{ label: 'Сабактар', to: '/sabaktar' }, { label: mod.title, to: `/sabaktar#${mod.id}` }, { label: lesson.title }]} />

      <header className={s.head}>
        <div>
          <div className={s.badges}>
            <span>{i + 1}-сабак</span>
            <span className={s[lesson.level]}>{LEVEL_LABEL[lesson.level]}</span>
            <span><Icon name="clock" size={14} />{lesson.minutes} мүн</span>
          </div>
          <h1>{lesson.title}</h1>
          <p>{lesson.summary}</p>
        </div>
        <Button variant={isDone ? 'soft' : 'ghost'} icon="check" onClick={() => toggleDone(slug)} aria-pressed={isDone}>
          {isDone ? 'Аткарылды' : 'Аткарылды деп белгиле'}
        </Button>
      </header>

      <LearnTabs slug={slug} tab={lesson.tab} />

      <div className={s.content}>
        <div className={s.main}>
          <section className={s.block}>
            <h2>Бул сабакта</h2>
            <ul className={s.goals}>
              {lesson.goals.map((g) => <li key={g}><Icon name="check" size={16} />{g}</li>)}
            </ul>
          </section>

          <section className={s.block}>
            <h2>Кадам сайын</h2>
            <ol className={s.steps}>
              {lesson.steps.map((st) => <li key={st}>{st}</li>)}
            </ol>
          </section>

          <section className={`${s.block} ${s.warn}`}>
            <h2>Көп кетүүчү каталар</h2>
            <ul>
              {lesson.mistakes.map((m) => <li key={m}>{m}</li>)}
            </ul>
          </section>
        </div>

        <aside className={s.side}>
          <div className={s.tip}>
            <Icon name="sparkle" size={20} />
            <h3>Кеңеш</h3>
            <p>{lesson.tip}</p>
          </div>
          <div className={s.tools}>
            <h3>Жардамчылар</h3>
            <Link to="/akort"><Icon name="tuner" size={18} />Комузду күүлө</Link>
            <Link to="/komuz#tuzulush"><Icon name="komuz" size={18} />Комуздун түзүлүшү</Link>
          </div>
        </aside>
      </div>

      <nav className={s.pager} aria-label="Сабактар арасында өтүү">
        {prev ? <Link to={`/sabaktar/${prev.slug}`}><Icon name="arrowL" size={18} /><span><small>Мурунку</small>{prev.title}</span></Link> : <span />}
        {next ? <Link to={`/sabaktar/${next.slug}`} className={s.nextLink}><span><small>Кийинки</small>{next.title}</span><Icon name="arrow" size={18} /></Link> : <span />}
      </nav>
    </article>
  );
}
