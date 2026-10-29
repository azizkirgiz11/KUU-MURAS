import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const LayoutContext = createContext(null);
const desktop = () => window.matchMedia('(min-width: 901px)').matches;
const wide = () => window.matchMedia('(min-width: 1281px)').matches;
const saved = (k, fallback) => {
  try {
    const v = localStorage.getItem(k);
    return v ? v === 'open' : fallback;
  } catch {
    return fallback;
  }
};
const save = (k, open) => {
  try {
    localStorage.setItem(k, open ? 'open' : 'closed');
  } catch {
    /* ignore */
  }
};

export function LayoutProvider({ children }) {
  const [side, setSide] = useState(() => (desktop() ? saved('km-side', true) : false));
  const [right, setRight] = useState(() => (wide() ? saved('km-right', true) : false));

  const toggleSide = useCallback(() => {
    setSide((v) => {
      if (desktop()) save('km-side', !v);
      return !v;
    });
  }, []);
  const toggleRight = useCallback(() => {
    setRight((v) => {
      if (wide()) save('km-right', !v);
      return !v;
    });
  }, []);
  // Кичине экрандарда баракка өткөндө панелдерди жабабыз
  const closeSmall = useCallback(() => {
    if (!desktop()) setSide(false);
    if (!wide()) setRight(false);
  }, []);

  const value = useMemo(() => ({ side, right, toggleSide, toggleRight, closeSmall }), [side, right, toggleSide, toggleRight, closeSmall]);
  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export const useLayout = () => useContext(LayoutContext);
