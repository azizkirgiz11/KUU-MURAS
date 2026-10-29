import s from '../../styles/components/Chips.module.css';

export default function Chips({ options, value, onChange, label }) {
  return (
    <div className={s.chips} role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} className={s.chip} aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
