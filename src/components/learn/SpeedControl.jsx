import s from '../../styles/components/SpeedControl.module.css';

const ALL = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

export default function SpeedControl({ value, onChange, presets = ALL, slider = true, note = true }) {
  return (
    <div className={s.wrap}>
      <div className={s.head}>
        <span className={s.label}>Ылдамдык</span>
        <b className={s.value}>×{Number(value.toFixed(2))}</b>
      </div>
      <div className={s.presets} role="group" aria-label="Ылдамдыкты тандоо">
        {presets.map((p) => (
          <button key={p} aria-pressed={value === p} onClick={() => onChange(p)}>{p}×</button>
        ))}
      </div>
      {slider && (
        <input className={s.range} type="range" min="0.25" max="2" step="0.05" value={value} onChange={(e) => onChange(+e.target.value)} aria-label="Ылдамдык" />
      )}
      {note && <small className={s.note}>Ылдамдыкты өзгөрткөндө үндүн бийиктиги өзгөрбөйт.</small>}
    </div>
  );
}
