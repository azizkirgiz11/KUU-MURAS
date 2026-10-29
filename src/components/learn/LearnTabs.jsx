import { useSearchParams } from 'react-router-dom';
import { mediaFor } from '../../data/media.js';
import { DEFAULT_TUNING, TUNINGS } from '../../data/tunings.js';
import Tabs from '../ui/Tabs.jsx';
import VideoPlayer from './VideoPlayer.jsx';
import NotationViewer from './NotationViewer.jsx';
import NoteReading from './NoteReading.jsx';
import DigitalKomuz from './DigitalKomuz.jsx';
import s from '../../styles/components/LearnTabs.module.css';

const TABS = [
  { id: 'video', label: 'Видео', icon: 'video' },
  { id: 'notes', label: 'Ноталар', icon: 'note' },
  { id: 'digital', label: 'Санарип комуз', icon: 'komuz' },
];

const BLURB = {
  video: 'Ар бир кыймылды жай жана ачык ракурстан көр. Ылдамдыкты каалагандай өзгөртсө болот.',
  notes: 'Нотаны окуп, окулушун кыргызча (Ре, Ля) жана глобалдык (D, A) белгилер менен салыштыр.',
  digital: 'Экрандагы комузга бас, нотанын үнүн угуп, ырааттуулукту ар кандай ылдамдыкта ойнот.',
};

// Сабак жана күү барактарында колдонулган окутуунун үч жолу
export default function LearnTabs({ slug, tab, tuning = DEFAULT_TUNING }) {
  const [params, setParams] = useSearchParams();
  const raw = params.get('mode');
  const mode = TABS.some((t) => t.id === raw) ? raw : 'video';
  const media = mediaFor(slug);
  const setMode = (id) => setParams((p) => { const n = new URLSearchParams(p); n.set('mode', id); return n; }, { replace: true });

  return (
    <section className={s.wrap}>
      <Tabs tabs={TABS} value={mode} onChange={setMode} label="Окуу жолдору" />
      <p className={s.blurb}>{BLURB[mode]}</p>
      <div role="tabpanel" id={`panel-${mode}`} aria-labelledby={`tab-${mode}`} className={s.panel}>
        {mode === 'video' && <VideoPlayer video={media.video} slug={slug} />}
        {mode === 'notes' && (
          <div className={s.stack}>
            <NotationViewer sheets={media.notation} slug={slug} />
            <NoteReading tab={tab} tuning={TUNINGS[tuning] ?? TUNINGS[DEFAULT_TUNING]} />
          </div>
        )}
        {mode === 'digital' && <DigitalKomuz tab={tab} defaultTuning={tuning} />}
      </div>
    </section>
  );
}
