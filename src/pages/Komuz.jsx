import { useState } from 'react';
import { Link } from 'react-router-dom';
import { INTRO, KOMUZ_DAY, PARTS, PERFORMERS, RELATED, SCHOOLS, TECHNIQUES, TIMELINE, TYPES, WOODS, FACTS, MUSIC_SCHOOLS } from '../data/komuz.js';
import { GALLERY, IMG } from '../data/images.js';
import Button from '../components/ui/Button.jsx';
import Gallery from '../components/ui/Gallery.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import s from '../styles/pages/Komuz.module.css';

const TOC = [
  { id: 'tuzulush', label: 'Түзүлүшү' },
  { id: 'tarykh', label: 'Тарыхы' },
  { id: 'komuzchular', label: 'Комузчулар' },
  { id: 'ykma', label: 'Ойноо ыкмалары' },
  { id: 'mektepter', label: 'Музыкалык мектептер' },
  { id: 'galereya', label: 'Галерея' },
];

export default function Komuz() {
  const [part, setPart] = useState(PARTS[2].id);
  const active = PARTS.find((p) => p.id === part);

  // Көбүрөөк көрсөтүү үчүн которгуч абалдар (States)
  const [showAllPerformers, setShowAllPerformers] = useState(false);
  const [showAllTechs, setShowAllTechs] = useState(false);
  const [showAllSchools, setShowAllSchools] = useState(false);

  return (
    <div className={s.page}>
      <section className={s.intro}>
        <div className={s.introText}>
          <span className={s.kicker}>Улуттук аспап</span>
          <h1>Комуз</h1>
          {INTRO.map((t, index) => <p key={index}>{t}</p>)}
          <ul className={s.facts}>
            {FACTS.map((f) => <li key={f.label}><b>{f.value}</b><span>{f.label}</span></li>)}
          </ul>
          <div className={s.row}>
            <Button to="/sabaktar" iconRight="arrow">Үйрөнүүнү баштоо</Button>
            <Button to="/akort" variant="ghost">Күүлөгүч</Button>
          </div>
        </div>
        <figure className={s.introImg}><img src={IMG.shyrdak.src} alt={IMG.shyrdak.alt} /></figure>
      </section>

      <nav className={s.toc} aria-label="Барактын бөлүмдөрү">
        {TOC.map((t) => <Link key={t.id} to={{ hash: `#${t.id}` }} replace>{t.label}</Link>)}
      </nav>

      <section className={s.section}>
        <SectionHeading id="tuzulush" eyebrow="Түзүлүшү" title="Комуз эмнеден турат?" text="Бөлүктү танда — анын милдетин көр." />
        <div className={s.parts}>
          <figure className={s.scheme}>
            <img src={IMG.scheme.src} alt={IMG.scheme.alt} loading="lazy" />
            <figcaption>Схемадагы жазуулар орусча: колки — кулактар, головка — баш, гриф — моюн, струны — кылдар, дека — капкак, корпус — чара, кобылка — тепке.</figcaption>
          </figure>
          <div className={s.partsBody}>
            <div className={s.partChips} role="tablist" aria-label="Комуздун бөлүктөрү">
              {PARTS.map((p) => (
                <button key={p.id} role="tab" aria-selected={part === p.id} onClick={() => setPart(p.id)}>{p.name}</button>
              ))}
            </div>
            <div className={s.partCard} key={active.id}>
              <h3>{active.name}</h3>
              <p>{active.text}</p>
            </div>
            <div className={s.woods}>
              <h4>Эмнеден жасалат?</h4>
              <div>{WOODS.map((w) => <span key={w}>{w}</span>)}</div>
              <p>Узундугу болжол менен 75–90 см. Булактарда бул өлчөм аз-аздан айырмаланат.</p>
            </div>
          </div>
        </div>
        <h3 className={s.sub}>Комуздун түрлөрү</h3>
        <div className={s.types}>
          {TYPES.map((t) => <div key={t.name}><b>{t.name}</b><span>{t.text}</span></div>)}
        </div>
      </section>

      <section className={s.section}>
        <SectionHeading id="tarykh" eyebrow="Тарыхы" title="Миңдеген жылдык жол" />
        <ol className={s.timeline}>
          {TIMELINE.map((t) => (
            <li key={t.title}>
              <span>{t.when}</span>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
        <div className={s.day}>
          <img src="/images/marka-1993.jpg" alt="Комуз тартылган 1993-жылкы почта маркасы" loading="lazy" />
          <div>
            <span className={s.kicker}>9-сентябрь</span>
            <h3>Комуз күнү</h3>
            <p>{KOMUZ_DAY}</p>
          </div>
        </div>
        <p className={s.related}>Түрк элдеринде тектеш аспаптар: {RELATED && RELATED.length > 0 ? RELATED.join(', ') : 'комуз, кобуз, комыс'}.</p>
      </section>

      {/* Улуу комузчулар (Алгач 3кө чектөө) */}
      <section className={s.section}>
        <SectionHeading id="komuzchular" eyebrow="Залкарлар" title="Улуу комузчулар" text="Комузду ушул адамдардын аты менен да билебиз." />
        <div className={s.people}>
          {(showAllPerformers ? PERFORMERS : PERFORMERS.slice(0, 3)).map((p) => (
            <article key={p.name}>
              <span>{p.role}</span>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
        {PERFORMERS.length > 3 && (
          <button className={s.toggleBtn} onClick={() => setShowAllPerformers(!showAllPerformers)}>
            {showAllPerformers ? 'Жашыруу ▲' : `Дагы көрсөткөнү (${PERFORMERS.length - 3}) ▼`}
          </button>
        )}

        <h3 className={s.sub}>Аткаруу мектептери</h3>
        <div className={s.schools}>
          {SCHOOLS && SCHOOLS.map((x) => <div key={x.name}><b>{x.name}</b><span>{x.text}</span></div>)}
        </div>
      </section>

      {/* Ойноо ыкмалары (Алгач 3кө чектөө) */}
      <section className={s.section}>
        <SectionHeading id="ykma" eyebrow="Ойноо" title="Комузда кантип ойнолот?" text="Комуз жумшак үндүү аспап, бирок ойноо ыкмалары абдан бай." />
        <div className={s.techs}>
          {(showAllTechs ? TECHNIQUES : TECHNIQUES.slice(0, 3)).map((t, i) => (
            <div key={t.title}><b>{String(i + 1).padStart(2, '0')}</b><h3>{t.title}</h3><p>{t.text}</p></div>
          ))}
        </div>
        {TECHNIQUES.length > 3 && (
          <button className={s.toggleBtn} onClick={() => setShowAllTechs(!showAllTechs)}>
            {showAllTechs ? 'Жашыруу ▲' : `Башка ыкмаларды көрүү (${TECHNIQUES.length - 3}) ▼`}
          </button>
        )}
        <p className={s.related}>Комузду адатта гитарадай, болжол менен 25–30° бурчта кармашат. Чебер комузчулар аспапты ойнотуп жатып оодарып да койушат.</p>
      </section>

      {/* Музыкалык мектептер (Алгач 4кө чектөө) */}
      <section className={s.section}>
        <SectionHeading id="mektepter" eyebrow="Билим берүү" title="Музыкалык мектептер жана окуу жайлар" text="Комуз жана музыкалык өнөр үйрөнүүчү окуу жайлар." />
        <div className={s.schoolsList}>
          {(showAllSchools ? MUSIC_SCHOOLS : MUSIC_SCHOOLS.slice(0, 4)).map((school) => (
            <div key={school.id} className={s.schoolCard}>
              <span style={{ fontSize: '0.85rem', color: 'var(--mute)', textTransform: 'uppercase' }}>{school.city}</span>
              <h3 style={{ margin: '4px 0', fontSize: '1.1rem' }}>{school.name}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--mute)', marginBottom: '8px' }}>{school.description}</p>
              <p style={{ fontSize: '0.85rem', margin: '2px 0' }}><b>Дареги:</b> {school.address}</p>
              {school.phone && <p style={{ fontSize: '0.85rem', margin: '2px 0' }}><b>Тел:</b> {school.phone}</p>}
            </div>
          ))}
        </div>
        {MUSIC_SCHOOLS.length > 4 && (
          <button className={s.toggleBtn} onClick={() => setShowAllSchools(!showAllSchools)}>
            {showAllSchools ? 'Жашыруу ▲' : `Башка окуу жайларды көрүү (${MUSIC_SCHOOLS.length - 4}) ▼`}
          </button>
        )}
      </section>

      <section className={s.section}>
        <SectionHeading id="galereya" eyebrow="Галерея" title="Комуз сүрөттөрдө" />
        <Gallery items={GALLERY} />
      </section>
    </div>
  );
}