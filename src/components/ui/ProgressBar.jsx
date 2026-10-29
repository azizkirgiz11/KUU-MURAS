import s from '../../styles/components/ProgressBar.module.css';

export default function ProgressBar({ value, max, label }) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div className={s.wrap} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className={s.bar}><span style={{ width: `${pct}%` }} /></div>
      <small>{value}/{max}</small>
    </div>
  );
}
