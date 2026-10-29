import { Link } from 'react-router-dom';
import { useLayout } from '../../context/LayoutContext.jsx';
import Icon from '../ui/Icon.jsx';
import SearchBox from './SearchBox.jsx';
import ThemePicker from './ThemePicker.jsx';
import s from '../../styles/components/Topbar.module.css';

export default function Topbar() {
  const { side, right, toggleSide, toggleRight } = useLayout();
  return (
    <header className={s.bar}>
      <button className={`${s.btn} ${s.menu}`} onClick={toggleSide} aria-label="Менюну ачуу/жабуу" aria-expanded={side}>
        <Icon name="menu" />
      </button>
      <Link to="/" className={s.mobileLogo}>Күү Мурас</Link>
      <SearchBox />
      <div className={s.actions}>
        <ThemePicker />
        <Link to="/kirish" className={`${s.btn} ${s.login}`} aria-label="Кирүү"><Icon name="user" size={20} /></Link>
        <button className={s.btn} onClick={toggleRight} aria-label={right ? 'Оң панелди жабуу' : 'Оң панелди ачуу'} aria-expanded={right}>
          <Icon name="panelR" size={20} />
        </button>
      </div>
    </header>
  );
}
