import { useLayout } from '../../context/LayoutContext.jsx';
import Icon from '../ui/Icon.jsx';
import ContinueCard from '../widgets/ContinueCard.jsx';
import KuuOfDay from '../widgets/KuuOfDay.jsx';
import Metronome from '../widgets/Metronome.jsx';
import KomuzDayCounter from '../widgets/KomuzDayCounter.jsx';
import FunFact from '../widgets/FunFact.jsx';
import s from '../../styles/components/RightPanel.module.css';

export default function RightPanel() {
  const { right, toggleRight } = useLayout();
  return (
    <aside className={`${s.panel} ${right ? '' : s.closed}`} aria-label="Кошумча панель" aria-hidden={!right}>
      <div className={s.inner}>
        <div className={s.head}>
          <h2>Менин бурчум</h2>
          <button onClick={toggleRight} aria-label="Панелди жабуу" tabIndex={right ? 0 : -1}><Icon name="close" size={18} /></button>
        </div>
        <ContinueCard />
        <Metronome />
        <KuuOfDay />
        <KomuzDayCounter />
        <FunFact />
      </div>
    </aside>
  );
}
