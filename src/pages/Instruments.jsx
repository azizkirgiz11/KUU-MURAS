import { Link } from 'react-router-dom';
import { IMG } from '../data/images.js';
import Icon from '../components/ui/Icon.jsx';
import s from '../styles/pages/Instruments.module.css';

const SOON = [
  { icon: 'music', title: 'Чопо-чоор', text: 'Күйдүрүлгөн чоподон жасалган байыркы үйлөмө аспап. Анын үнү табият үндөрүн элестетет.' },
  { icon: 'sparkle', title: 'Ооз комуз', text: 'Темир-комуз деп да аталган, оозго такап ойнолуучу тилчелүү аспап.' },
];

export default function Instruments() {
  return (
    <div className={s.page}>
      <header className={s.head}>
        <span className={s.kicker}>Аспаптар</span>
        <h1>Кыргыздын улуттук аспаптары</h1>
        <p>Бүгүн комуздан баштайбыз. Кийинки кадамда башка аспаптарды да кошобуз.</p>
      </header>

      <Link to="/sabaktar" className={s.featured}>
        <img src={IMG.poster.src} alt={IMG.poster.alt} />
        <div>
          <span className={s.badge}>Азыр жеткиликтүү</span>
          <h2>Комуз</h2>
          <p>Үч кылдуу, перделери жок улуттук аспап. 16 сабак, ноталар, видео жана санарип комуз.</p>
          <div className={s.row}>
            <span className={s.fake}>Сабактарды баштоо <Icon name="arrow" size={18} /></span>
          </div>
        </div>
      </Link>

      <h2 className={s.sub}>Жакында</h2>
      <div className={s.grid}>
        {SOON.map((x) => (
          <article key={x.title} className={s.card}>
            <span className={s.icon}><Icon name={x.icon} size={26} /></span>
            <span className={s.soon}>Жакында</span>
            <h3>{x.title}</h3>
            <p>{x.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
