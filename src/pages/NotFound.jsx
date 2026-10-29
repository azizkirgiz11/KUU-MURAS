import Button from '../components/ui/Button.jsx';
import s from '../styles/pages/NotFound.module.css';

export default function NotFound() {
  return (
    <div className={s.page}>
      <b>404</b>
      <h1>Бул барак табылган жок</h1>
      <p>Шилтеме эскирген же барак көчүрүлгөн болушу мүмкүн.</p>
      <div className={s.row}>
        <Button to="/" iconRight="arrow">Башкы бетке</Button>
        <Button to="/sabaktar" variant="ghost">Сабактар</Button>
      </div>
    </div>
  );
}
