import { Link } from "react-router-dom";
import { FOOTER_COLUMNS } from "../../data/navigation.js";
import { SITE } from "../../data/site.js";
import Icon from "../ui/Icon.jsx";
import s from "../../styles/components/Footer.module.css";

export default function Footer() {
  const socials = SITE.socials.filter((x) => x.href);
  return (
    <footer className={s.footer}>
      <div className={s.ornament} aria-hidden="true"></div>
      <div className={s.grid}>
        <div className={s.brand}>
          <Link to="/" className={s.logo}>
            Күү Мурас
          </Link>
          <p>
            Комузду ноталар, санарип комуз жана видео сабактар аркылуу үйрөнүүгө
            жардам берген платформа. Кыргыздын музыкалык мурасы жаштарга жетсин.
          </p>
          <a className={s.mail} href={`mailto:${SITE.email}`}>
            <Icon name="mail" size={18} />
            {SITE.email}
          </a>
          {socials.length > 0 && (
            <div className={s.socials}>
              {socials.map((x) => (
                <a key={x.label} href={x.href} target="_blank" rel="noreferrer">
                  {x.label}
                </a>
              ))}
            </div>
          )}
        </div>
        {FOOTER_COLUMNS.map((col) => (
          <nav key={col.title} className={s.col} aria-label={col.title}>
            <h4>{col.title}</h4>
            {col.links.map((l) => (
              <Link key={l.to + l.label} to={l.to}>
                {l.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className={s.bottom}>
        <span>
          © {new Date().getFullYear()} {SITE.name}. {SITE.context}.
        </span>
      </div>
    </footer>
  );
}
