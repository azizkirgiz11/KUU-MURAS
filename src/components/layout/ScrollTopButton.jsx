import { useEffect, useState } from 'react';
import Icon from '../ui/Icon.jsx';
import s from '../../styles/components/ScrollTopButton.module.css';

export default function ScrollTopButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <button className={`${s.btn} ${show ? s.show : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Жогорку жакка чыгуу" tabIndex={show ? 0 : -1}>
      <Icon name="up" size={22} />
    </button>
  );
}
