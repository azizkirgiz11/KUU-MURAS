import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { KUU, KUU_LEVEL, kuuBySlug } from '../data/kuu.js';
import { useProgress } from '../context/ProgressContext.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import Button from '../components/ui/Button.jsx';
import Icon from '../components/ui/Icon.jsx';
import KuuCard from '../components/learn/KuuCard.jsx';
import LearnTabs from '../components/learn/LearnTabs.jsx';
import NotFound from './NotFound.jsx';
import s from '../styles/pages/KuuDetail.module.css';

export default function KuuDetail() {
  const { slug } = useParams();
  const kuu = kuuBySlug(slug);
  const { fav, toggleFav, setLast } = useProgress();
  useEffect(() => { if (kuu) setLast('kuu', slug); }, [kuu, slug, setLast]);
  if (!kuu) return <NotFound />;
  const on = Boolean(fav[slug]);
  const others = KUU.filter((k) => k.slug !== slug).slice(0, 3);

  return (
    <article className={s.page}>
      <Breadcrumbs items={[{ label: 'Күүлөр', to: '/kuu' }, { label: kuu.title }]} />
      <header className={s.head}>
        <div>
          <div className={s.badges}>
            <span className={s[kuu.level]}>{KUU_LEVEL[kuu.level]}</span>
            <span><Icon name="clock" size={14} />{kuu.minutes} мүн</span>
          </div>
          <h1>{kuu.title}</h1>
          <p className={s.author}>{kuu.author || 'Элдик күү'}</p>
        </div>
        <Button variant={on ? 'soft' : 'ghost'} icon="heart" onClick={() => toggleFav(slug)} aria-pressed={on}>{on ? 'Тандалган' : 'Тандалгандарга кош'}</Button>
      </header>

      <section className={s.about}>
        <p>{kuu.about}</p>
        <div className={s.tip}><Icon name="sparkle" size={18} /><span>{kuu.tip}</span></div>
      </section>

      <LearnTabs slug={slug} tab={kuu.tab} />

      <section className={s.more}>
        <div className={s.moreHead}><h2>Башка күүлөр</h2><Link to="/kuu">Бардыгы →</Link></div>
        <div className={s.grid}>{others.map((k, i) => <KuuCard key={k.slug} kuu={k} index={i + 1} />)}</div>
      </section>
    </article>
  );
}
