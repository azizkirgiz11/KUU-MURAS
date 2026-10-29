import { komuzDayInfo } from '../../lib/dates.js';
import Widget from '../ui/Widget.jsx';
import s from '../../styles/components/DayCounter.module.css';

export default function KomuzDayCounter() {
  const { days, isToday, year } = komuzDayInfo();
  return (
    <Widget title="Комуз күнү" icon="star">
      {isToday ? (
        <p className={s.today}>Бүгүн — Комуз күнү! Куттуктайбыз!</p>
      ) : (
        <div className={s.row}>
          <b>{days}</b>
          <span>күн калды<small>9-сентябрь, {year}</small></span>
        </div>
      )}
    </Widget>
  );
}
