import s from '../../styles/components/SectionHeading.module.css';

export default function SectionHeading({ eyebrow, title, text, action, id }) {
  return (
    <header className={s.head} id={id}>
      <div>
        {eyebrow && <span className={s.eyebrow}>{eyebrow}</span>}
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action}
    </header>
  );
}
