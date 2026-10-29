import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);
const read = (k, d) => {
  try {
    return localStorage.getItem(k) || d;
  } catch {
    return d;
  }
};
const write = (k, v) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* ignore */
  }
};

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => read('km-mode', 'dark'));
  const [palette, setPalette] = useState(() => read('km-palette', 'bakyr'));

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const apply = () => {
      document.documentElement.dataset.theme = mode === 'auto' ? (mq.matches ? 'light' : 'dark') : mode;
    };
    apply();
    write('km-mode', mode);
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [mode]);

  useEffect(() => {
    document.documentElement.dataset.palette = palette;
    write('km-palette', palette);
  }, [palette]);

  const value = useMemo(() => ({ mode, setMode, palette, setPalette }), [mode, palette]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
