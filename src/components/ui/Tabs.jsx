import Icon from './Icon.jsx';
import s from '../../styles/components/Tabs.module.css';

export default function Tabs({ tabs, value, onChange, label = 'Бөлүмдөр' }) {
  const onKey = (e) => {
    const i = tabs.findIndex((t) => t.id === value);
    if (e.key === 'ArrowRight') onChange(tabs[(i + 1) % tabs.length].id);
    if (e.key === 'ArrowLeft') onChange(tabs[(i - 1 + tabs.length) % tabs.length].id);
  };
  return (
    <div className={s.tabs} role="tablist" aria-label={label} onKeyDown={onKey}>
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          id={`tab-${t.id}`}
          aria-selected={value === t.id}
          aria-controls={`panel-${t.id}`}
          tabIndex={value === t.id ? 0 : -1}
          className={s.tab}
          onClick={() => onChange(t.id)}
        >
          {t.icon && <Icon name={t.icon} size={18} />}
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}
