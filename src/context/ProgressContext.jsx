import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const ProgressContext = createContext(null);
const EMPTY = { done: {}, fav: {}, last: null };

export function ProgressProvider({ children }) {
  const [state, setState] = useLocalStorage('km-progress', EMPTY);

  const toggleDone = useCallback((slug) => {
    setState((s) => {
      const done = { ...s.done };
      if (done[slug]) delete done[slug];
      else done[slug] = Date.now();
      return { ...s, done };
    });
  }, [setState]);

  const toggleFav = useCallback((slug) => {
    setState((s) => {
      const fav = { ...s.fav };
      if (fav[slug]) delete fav[slug];
      else fav[slug] = true;
      return { ...s, fav };
    });
  }, [setState]);

  // "Эң акыркы кайда калдың" — акыркы ачылган сабак же күү
  const setLast = useCallback((type, slug) => {
    setState((s) => (s.last?.slug === slug && s.last?.type === type ? s : { ...s, last: { type, slug, at: Date.now() } }));
  }, [setState]);

  const reset = useCallback(() => setState(EMPTY), [setState]);

  const value = useMemo(() => ({ ...state, toggleDone, toggleFav, setLast, reset }), [state, toggleDone, toggleFav, setLast, reset]);
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export const useProgress = () => useContext(ProgressContext);
