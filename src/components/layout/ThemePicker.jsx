import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { PALETTES } from '../../data/palettes.js';
import Icon from '../ui/Icon.jsx';
import s from '../../styles/components/ThemePicker.module.css';

const MODES = [
  { id: 'dark', label: 'Караңгы', icon: 'moon' },
  { id: 'light', label: 'Жарык', icon: 'sun' },
  { id: 'auto', label: 'Авто', icon: 'sparkle' },
];

export default function ThemePicker() {
  const { mode, setMode, palette, setPalette } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, []);
  return (
    <div className={s.wrap} ref={ref}>
      <button className={s.trigger} onClick={() => setOpen((v) => !v)} aria-label="Тема жана түс" aria-expanded={open}>
        <Icon name="palette" size={20} />
      </button>
      {open && (
        <div className={s.pop} role="dialog" aria-label="Тема жана түс">
          <h4>Режим</h4>
          <div className={s.modes}>
            {MODES.map((m) => (
              <button key={m.id} aria-pressed={mode === m.id} onClick={() => setMode(m.id)}>
                <Icon name={m.icon} size={16} />{m.label}
              </button>
            ))}
          </div>
          <h4>Түс палитрасы</h4>
          <div className={s.swatches}>
            {PALETTES.map((p) => (
              <button
                key={p.id}
                className={s.swatch}
                aria-pressed={palette === p.id}
                aria-label={p.name}
                title={p.name}
                onClick={() => setPalette(p.id)}
                style={{ '--sw': `oklch(0.72 0.15 ${p.hue})` }}
              >
                <i />
                <span>{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
