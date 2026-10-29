import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext.jsx';
import { LESSONS, MODULES, lessonsOfModule, lessonBySlug } from '../data/lessons.js';
import { KUU } from '../data/kuu.js';
import { GALLERY, IMG } from '../data/images.js';
import { komuzDayInfo } from '../lib/dates.js';
import Button from '../components/ui/Button.jsx';
import Icon from '../components/ui/Icon.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import KuuCard from '../components/learn/KuuCard.jsx';
import Gallery from '../components/ui/Gallery.jsx';
import s from '../styles/pages/Home.module.css';

const WAYS = [
  { id: 'notes', icon: 'note', title: 'Ноталар менен', text: 'Нота баракчасын окуп, ар бир нотанын кыргызча жана глобалдык (C, D, E) окулушун көр.', img: IMG.notes },
  { id: 'digital', icon: 'komuz', title: 'Санарип комуз менен', text: 'Экрандагы комузга бас: үнүн ук, манжа ордун көр, ырааттуулукту каалаган ылдамдыкта ойнот.', img: IMG.poster },
  { id: 'video', icon: 'video', title: 'Видео менен', text: 'Ачык ракурстан тартылган сабактар. Ылдамдыкты өзгөртсөң да үн бийиктиги өзгөрбөйт.', img: IMG.girl },
];

export default function Home() {
  const { done, last } = useProgress();
  const next = LESSONS.find((l) => !done[l.slug]) ?? LESSONS[0];
  const lastLesson = last?.type === 'lesson' ? lessonBySlug(last.slug) : null;
  const target = lastLesson ?? next;
  const day = komuzDayInfo();

  return (
    <div className={s.page}>
      <section className={s.hero}>
        <img className={s.heroImg} src={IMG.hero.src} alt={IMG.hero.alt} />
        <div className={s.heroShade} />
        <div className={s.heroText}>
          <span className={s.kicker}>Кыргыздын үнү — келечектин мурасы</span>
          <h1>Комуздун үнүн <em>өз колуң</em> менен чыгар</h1>
          <p>Күү Мурас — комузду ноталар, санарип комуз жана видео сабактар аркылуу үйрөнүүгө арналган платформа. Үйдөн, өз темпиңде.</p>
          <div className={s.cta}>
            <Button to={`/sabaktar/${target.slug}`} size="lg" iconRight="arrow">{lastLesson ? 'Улантуу' : 'Сабактарды баштоо'}</Button>
            <Button to="/komuz" variant="glass" size="lg">Комуз жөнүндө</Button>
          </div>
        </div>
      </section>

      <section className={s.section}>
        <SectionHeading eyebrow="Үч жол" title="Өзүңө ылайыктуу жол менен үйрөн" text="Үчөөнү тең айкалыштырсаң, натыйжа тезирээк келет." />
        <div className={s.ways}>
          {WAYS.map((w) => (
            <Link key={w.id} to={`/sabaktar/${next.slug}?mode=${w.id}`} className={s.way}>
              <div className={s.wayImg}><img src={w.img.src} alt="" loading="lazy" /></div>
              <div className={s.wayBody}>
                <span className={s.wayIcon}><Icon name={w.icon} size={22} /></span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                <span className={s.more}>Көрүү <Icon name="arrow" size={16} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={s.section}>
        <SectionHeading eyebrow="Окуу программасы" title="4 модуль, 16 сабак" text="Таанышуудан биринчи толук күүгө чейин, кадам сайын."
          action={<Button to="/sabaktar" variant="ghost" size="sm" iconRight="arrow">Бардыгы</Button>} />
        <div className={s.modules}>
          {MODULES.map((m, i) => {
            const ls = lessonsOfModule(m.id);
            const d = ls.filter((l) => done[l.slug]).length;
            return (
              <Link key={m.id} to={`/sabaktar#${m.id}`} className={s.module}>
                <span className={s.moduleNum}>{String(i + 1).padStart(2, '0')}</span>
                <Icon name={m.icon} size={26} className={s.moduleIcon} />
                <h3>{m.title}</h3>
                <p>{m.subtitle}</p>
                <ProgressBar value={d} max={ls.length} label={`${m.title} прогресси`} />
              </Link>
            );
          })}
        </div>
      </section>

      <section className={`${s.section} ${s.split}`}>
        <div className={s.splitImg}><img src={IMG.shyrdak.src} alt={IMG.shyrdak.alt} loading="lazy" /></div>
        <div className={s.splitText}>
          <span className={s.kicker}>Улуттук мурас</span>
          <h2>Ар бир кыргыздын үйүндө комуз төрдө илинет</h2>
          <p>Бирок көп үйдө ал үнсүз турат: кантип баштоону билишпейт же сабактарды унутуп коюшкан. Күү Мурас комузду кайра үнгө келтирүү үчүн жасалды.</p>
          <ul className={s.checks}>
            <li><Icon name="check" size={18} />Перде жок — кулагың менен ойно</li>
            <li><Icon name="check" size={18} />Сабактар жөнөкөйдөн татаалга</li>
            <li><Icon name="check" size={18} />Үй ишин ноталар менен текшер</li>
          </ul>
          <div className={s.cta}>
            <Button to="/komuz" variant="soft" iconRight="arrow">Комуз тарыхы</Button>
            <Button to="/akort" variant="ghost">Комузду күүлө</Button>
          </div>
        </div>
      </section>

      <section className={s.section}>
        <SectionHeading eyebrow="Күүлөр" title="Белгилүү күүлөр" action={<Button to="/kuu" variant="ghost" size="sm" iconRight="arrow">Бардык күүлөр</Button>} />
        <div className={s.kuuGrid}>
          {KUU.slice(0, 3).map((k, i) => <KuuCard key={k.slug} kuu={k} index={i} />)}
        </div>
      </section>

      <section className={s.section}>
        <SectionHeading eyebrow="Галерея" title="Комуз сүрөттөрдө" text="Сүрөттү чоңойтуу үчүн басыңыз." />
        <Gallery items={GALLERY} />
      </section>

      <section className={s.banner}>
        <div>
          <span className={s.kicker}>9-сентябрь</span>
          <h2>Комуз күнү</h2>
          <p>{day.isToday ? 'Бүгүн — Комуз күнү! Комузду колуңа алып, күү чертип көр.' : `Комуз күнүнө ${day.days} күн калды. Ага чейин биринчи күүнү үйрөнүп ал.`}</p>
        </div>
        <Button to={`/sabaktar/${target.slug}`} size="lg" iconRight="arrow">Азыр баштоо</Button>
      </section>
    </div>
  );
}
