import { useState } from 'react';
import { FUN_FACTS } from '../../data/facts.js';
import { dayOfYear } from '../../lib/dates.js';
import Widget from '../ui/Widget.jsx';
import s from '../../styles/components/FunFact.module.css';

export default function FunFact() {
  const [i, setI] = useState(dayOfYear() % FUN_FACTS.length);
  return (
    <Widget title="Билесиңби?" icon="sparkle">
      <p className={s.text}>{FUN_FACTS[i]}</p>
      <button className={s.next} onClick={() => setI((v) => (v + 1) % FUN_FACTS.length)}>Дагы бир факт →</button>
    </Widget>
  );
}
