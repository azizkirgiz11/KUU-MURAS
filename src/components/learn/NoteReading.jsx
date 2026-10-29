import { pluck } from '../../lib/audio.js';
import { freqOf, noteOf, NOTE_TABLE } from '../../lib/music.js';
import s from '../../styles/components/NoteReading.module.css';

export default function NoteReading({ tab, tuning }) {
  const notes = tab.map((st) => ({ ...st, info: noteOf(tuning, st.s, st.p) }));
  const roman = ['I', 'II', 'III'];
  return (
    <div className={s.wrap}>
      {notes.length > 0 && (
        <>
          <h3>Нотанын окулушу</h3>
          <p className={s.hint}>Ар бир нотанын кыргызча окулушу жана глобалдык белгиси (C, D, E...). Басып, үнүн ук.</p>
          <div className={s.chips}>
            {notes.map((n, i) => (
              <button key={i} className={s.chip} onClick={() => pluck(freqOf(tuning, n.s, n.p))} title={`${roman[n.s]} кыл`}>
                <b>{n.info.solfege}</b>
                <span>{n.info.letter}</span>
                <small>{roman[n.s]} кыл{n.f ? ` · ${n.f}-манжа` : ' · ачык'}</small>
              </button>
            ))}
          </div>
          <dl className={s.lines}>
            <div><dt>Кыргызча окулушу</dt><dd>{notes.map((n) => n.info.solfege).join(' – ')}</dd></div>
            <div><dt>Глобалдык белгилери</dt><dd>{notes.map((n) => n.info.letter).join(' – ')}</dd></div>
          </dl>
        </>
      )}
      <h3>Нота аттары</h3>
      <div className={s.table} role="table" aria-label="Нота аттары">
        {NOTE_TABLE.map(([ky, gl]) => (
          <div key={gl} role="row"><b>{ky}</b><span>{gl}</span></div>
        ))}
      </div>
    </div>
  );
}
