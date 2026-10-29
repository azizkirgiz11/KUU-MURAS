import Icon from './Icon.jsx';
import s from '../../styles/components/Widget.module.css';

export default function Widget({ title, icon, children }) {
  return (
    <section className={s.widget}>
      <h3 className={s.title}>{icon && <Icon name={icon} size={16} />}{title}</h3>
      {children}
    </section>
  );
}
