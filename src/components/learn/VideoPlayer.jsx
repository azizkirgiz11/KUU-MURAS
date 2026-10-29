import { useEffect, useRef, useState } from 'react';
import Placeholder from '../ui/Placeholder.jsx';
import SpeedControl from './SpeedControl.jsx';
import YouTubePlayer from './YouTubePlayer.jsx';
import s from '../../styles/components/VideoPlayer.module.css';

const YT_PRESETS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

function getYouTubeVideoId(value) {
  const input = value?.trim();
  if (!input) return '';

  const match = input.match(
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?.*?\bv=|embed\/|shorts\/|live\/)|youtu\.be\/)?([A-Za-z0-9_-]{11})(?:[?&/].*)?$/,
  );
  return match?.[1] ?? '';
}

export default function VideoPlayer({ video, slug }) {
  const hasFile = Boolean(video?.file);
  const videoId = getYouTubeVideoId(video?.youtube);
  const hasYt = Boolean(videoId);
  const [source, setSource] = useState(hasFile ? 'file' : 'youtube');
  const [showYouTubePlayer, setShowYouTubePlayer] = useState(false);
  const [rate, setRate] = useState(1);
  const [ytRates, setYtRates] = useState(YT_PRESETS);
  const ref = useRef(null);

  useEffect(() => { setShowYouTubePlayer(false); }, [source, videoId]);

  const applyRate = () => {
    const v = ref.current;
    if (!v) return;
    // Ылдамдык өзгөргөндө үндүн бийиктиги өзгөрбөсүн
    v.preservesPitch = true;
    v.mozPreservesPitch = true;
    v.webkitPreservesPitch = true;
    v.playbackRate = rate;
  };
  useEffect(applyRate, [rate, source]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!hasFile && !hasYt) {
    if (video?.poster) {
      return (
        <div className={s.wrap}>
          <div className={`${s.stage} ${s.posterFallback}`}>
            <img src={video.poster} alt="Комуз деген эмне? — видео мукабасы" />
          </div>
          <p className={s.posterMessage}>
            YouTube видеосун көрсөтүү үчүн <code>src/data/media.js</code> файлына жарактуу видео шилтемесин кошуңуз.
          </p>
        </div>
      );
    }

    return (
      <Placeholder title="Видео жакында кошулат">
        Бул сабак үчүн видео кошуу: <code>src/data/media.js</code> ичинде <code>&apos;{slug}&apos;</code> үчүн
        <code>file</code> (MP4) же <code>youtube</code> (видео коду) жазыңыз.
      </Placeholder>
    );
  }

  const useYt = source === 'youtube' && hasYt;
  return (
    <div className={s.wrap}>
      {hasFile && hasYt && (
        <div className={s.switch} role="group" aria-label="Видео булагы">
          <button aria-pressed={!useYt} onClick={() => setSource('file')}>Түз видео</button>
          <button aria-pressed={useYt} onClick={() => setSource('youtube')}>YouTube</button>
        </div>
      )}
      <div className={s.stage}>
        {useYt ? (
          showYouTubePlayer ? (
            <YouTubePlayer videoId={videoId} rate={rate} onRates={setYtRates} />
          ) : video.poster ? (
            <button
              type="button"
              className={s.posterButton}
              onClick={() => setShowYouTubePlayer(true)}
              aria-label="YouTube плеерин көрсөтүү"
            >
              <img src={video.poster} alt="" />
              <span>YouTube плеерин көрсөтүү</span>
            </button>
          ) : (
            <YouTubePlayer videoId={videoId} rate={rate} onRates={setYtRates} />
          )
        ) : (
          <video ref={ref} className={s.video} controls playsInline preload="metadata" poster={video.poster || undefined} src={video.file} onLoadedMetadata={applyRate}>
            Браузериңиз видеону колдобойт.
          </video>
        )}
      </div>
      <SpeedControl
        value={rate}
        onChange={setRate}
        slider={!useYt}
        presets={useYt ? YT_PRESETS.filter((p) => ytRates.includes(p)) : [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2]}
      />
    </div>
  );
}
