import { Link } from 'react-router-dom';
import s from '../../styles/components/Breadcrumbs.module.css';

export default function Breadcrumbs({ items }) {
  return (
    <nav className={s.nav} aria-label="Жол">
      {items.map((it, i) => (
        <span key={it.label} className={s.item}>
          {it.to ? <Link to={it.to}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
          {i < items.length - 1 && <i aria-hidden="true">/</i>}
        </span>
      ))}
    </nav>
  );
}
