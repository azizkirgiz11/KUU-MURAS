import { useState } from 'react';
import Button from '../components/ui/Button.jsx';
import Tabs from '../components/ui/Tabs.jsx';
import s from '../styles/pages/Auth.module.css';

// Бул барак — үлгү (taslak). Сервер (Firebase/Supabase) кошулганда onSubmit ичине чыныгы кирүү логикасы жазылат.
const TABS = [
  { id: 'login', label: 'Кирүү', icon: 'user' },
  { id: 'register', label: 'Катталуу', icon: 'star' },
];

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    // TODO: бул жерде Firebase/Supabase менен чыныгы кирүүнү жаз
    setSent(true);
  };
  return (
    <div className={s.page}>
      <div className={s.card}>
        <h1>{mode === 'login' ? 'Кош келдиң' : 'Жаңы аккаунт'}</h1>
        <p>{mode === 'login' ? 'Прогрессиң түзмөктөр арасында сакталсын.' : 'Бир нече секундда катталып, окууну баштап кой.'}</p>
        <Tabs tabs={TABS} value={mode} onChange={(m) => { setMode(m); setSent(false); }} label="Кирүү же катталуу" />
        <form onSubmit={submit} className={s.form}>
          {mode === 'register' && (
            <label><span>Атың</span><input required name="name" autoComplete="name" placeholder="Аты-жөнүң" /></label>
          )}
          <label><span>Электрондук почта</span><input required type="email" name="email" autoComplete="email" placeholder="you@example.com" /></label>
          <label><span>Сырсөз</span><input required type="password" minLength={6} name="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} placeholder="Кеминде 6 символ" /></label>
          <Button type="submit" size="lg">{mode === 'login' ? 'Кирүү' : 'Катталуу'}</Button>
        </form>
        {sent && <p className={s.notice} role="status">Бул — демо барак. Аккаунт системасы азырынча иштебейт, бирок прогрессиң бул браузерде сакталат.</p>}
      </div>
    </div>
  );
}
