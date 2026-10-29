import { GALLERY, IMG } from '../data/images.js';
import { SITE } from '../data/site.js';
import Button from '../components/ui/Button.jsx';
import Icon from '../components/ui/Icon.jsx';
import s from '../styles/pages/About.module.css';

const FEATURES = [
  { icon: 'video', title: 'Сапаттуу видеолор', text: 'Ачык ракурстан тартылган сабактар. Ылдамдыкты каалагандай өзгөртсө болот, үн бийиктиги сакталат.' },
  { icon: 'note', title: 'Ноталар', text: 'Нота баракчасы (PDF, SVG, сүрөт) жана ар бир нотанын кыргызча жана глобалдык окулушу.' },
  { icon: 'komuz', title: 'Санарип комуз', text: 'Экрандагы комузга басып, нотаны угуп, манжа ордун көрүп көнүгүү.' },
  { icon: 'tuner', title: 'Күүлөгүч жана метроном', text: 'Комузду күүлөп, ритмди так кармап машыгууга жардам берет.' },
];

const ROADMAP = [
  'Чопо-чоор жана ооз комуз боюнча сабактар',
  'Аккаунт жана прогрессти түзмөктөр арасында синхрондоо',
  'Мугалим менен видеоүзүлтүк (онлайн практика)',
  'Көбүрөөк күүлөр жана ноталар',
];

const SOURCES = [
  { label: 'Комуз (Википедия, кыргызча)', note: 'Түзүлүшү, тарыхы, комузчулар' },
  { label: 'Комуз (Википедия, орусча)', note: 'Жалпы маалымат жана тектеш аспаптар' },
  { label: 'Kaktus.media', note: 'Комуз күнү (9-сентябрь) жөнүндө маалымат' },
];

export default function About() {
  return (
    <div className={s.page}>
      <header className={s.head}>
        <div>
          <span className={s.kicker}>Долбоор жөнүндө</span>
          <h1>Комуздун мурасы жаштарга жетсин</h1>
          <p>Көп үйдө комуз өзүнчө сувенир болуп илинип турат: кантип баштоону билишпейт же сабактарды унутуп коюшкан. Күү Мурас — комузду кайра үнгө келтирүү үчүн жасалган заманбап санарип үй.</p>
          <p className={s.ctx}>{SITE.context}.</p>
        </div>
        <img src={IMG.girl.src} alt={IMG.girl.alt} />
      </header>

      <section className={s.block}>
        <h2>Эмне үчүн жасалды?</h2>
        <p>Автор өзү комузда ойнойт жана үйдө машыгып жатканда бир эле көйгөйгө туш болуп келген: татаал өтүүлөрдү жана ноталарды унутуп калуу. Интернеттеги видеолор көп учурда начар сапатта, ноталары жок жана структурасы жок. Ошондуктан бардыгы бир жерде — видео, ноталар жана санарип комуз менен — чогулган платформа керек болду.</p>
      </section>

      <section className={s.block}>
        <h2>Эмнелер бар?</h2>
        <div className={s.features}>
          {FEATURES.map((f) => (
            <article key={f.title}>
              <span><Icon name={f.icon} size={24} /></span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={s.block}>
        <h2>Кийинки кадамдар</h2>
        <ul className={s.road}>
          {ROADMAP.map((r) => <li key={r}><Icon name="arrow" size={16} />{r}</li>)}
        </ul>
      </section>

      <section className={s.block}>
        <h2>Байланыш</h2>
        <p>Суроо, сунуш же ката болсо — жазыңыз.</p>
        <div className={s.row}><Button href={`mailto:${SITE.email}`} icon="mail">{SITE.email}</Button></div>
      </section>

      <section className={s.block}>
        <h2>Сүрөттөрдүн жана маалыматтын булактары</h2>
        <ul className={s.credits}>
          {GALLERY.map((g) => <li key={g.src}><b>{g.title}</b><span>{g.credit}</span></li>)}
        </ul>
        <h3>Маалымат булактары</h3>
        <ul className={s.credits}>
          {SOURCES.map((x) => <li key={x.label}><b>{x.label}</b><span>{x.note}</span></li>)}
        </ul>
        <p className={s.small}>Тексттер өз сөзүбүз менен жазылган. Сүрөттөрдүн укугу тиешелүү автор же музейге таандык.</p>
      </section>
    </div>
  );
}
