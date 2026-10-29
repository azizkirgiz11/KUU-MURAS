import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import s from '../../styles/components/Button.module.css';

export default function Button({ to, href, variant = 'primary', size = 'md', icon, iconRight, children, className, ...rest }) {
  const cls = [s.btn, s[variant], s[size], className].filter(Boolean).join(' ');
  const inner = (
    <>
      {icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={18} />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button type="button" className={cls} {...rest}>{inner}</button>;
}
