import { useEffect, useRef } from 'react';
import s from '../../styles/components/VideoPlayer.module.css';

let apiPromise;
function loadApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev?.(); resolve(window.YT); };
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    });
  }
  return apiPromise;
}

// YouTube ылдамдыгы: 0.25–2 (YouTube өзү үндүн бийиктигин сактайт)
export default function YouTubePlayer({ videoId, rate, onRates }) {
  const host = useRef(null);
  const player = useRef(null);
  const rateRef = useRef(rate);
  rateRef.current = rate;

  useEffect(() => {
    let dead = false;
    loadApi().then((YT) => {
      if (dead || !host.current) return;
      const el = document.createElement('div');
      host.current.appendChild(el);
      player.current = new YT.Player(el, {
        videoId,
        width: '100%',
        height: '100%',
        playerVars: { rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onReady: (e) => {
            onRates?.(e.target.getAvailablePlaybackRates());
            e.target.setPlaybackRate(rateRef.current);
          },
        },
      });
    });
    return () => {
      dead = true;
      player.current?.destroy?.();
      player.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  useEffect(() => { player.current?.setPlaybackRate?.(rate); }, [rate]);

  return <div ref={host} className={s.frame} />;
}
