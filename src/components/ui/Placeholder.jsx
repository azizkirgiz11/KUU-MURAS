import s from '../../styles/components/Placeholder.module.css';

export default function Placeholder({ title, children }) {
  return (
    <div className={s.box}>
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  );
}
