import { Link, NavLink } from "react-router-dom";
import { useLayout } from "../../context/LayoutContext.jsx";
import { NAV } from "../../data/navigation.js";
import { SITE } from "../../data/site.js";
import Icon from "../ui/Icon.jsx";
import s from "../../styles/components/Sidebar.module.css";
import { useTheme } from "../../context/ThemeContext.jsx";

export default function Sidebar() {
  const { mode, palette } = useTheme();
  const { side, toggleSide } = useLayout();
  return (
    <aside
      className={`${s.side} ${side ? "" : s.collapsed}`}
      data-mode={mode}
      data-palette={palette}
      aria-label="Негизги меню"
    >
      <div className={s.top}>
        <Link to="/" className={s.logo} aria-label={`${SITE.name} — башкы бет`}>
          <img
            src="./favicon.jpeg"
            alt="Күү Мурас Logo"
            width="50"
            height="50"
            style={{ borderRadius: "20%" }}
          />

          <span className={s.brand}>
            <b>Күү Мурас</b>
            {/* <small style={{marginTop: '0.5rem'}}>{SITE.slogan}</small>
            <small style={{marginLeft: '0.8rem', marginTop: '0.5rem'}}>{SITE.sloga2}</small> */}
          </span>
        </Link>
        <button
          className={s.collapse}
          onClick={toggleSide}
          aria-label={side ? "Менюну жабуу" : "Менюну ачуу"}
          aria-expanded={side}
        >
          <Icon name={side ? "chevL" : "chevR"} size={18} />
        </button>
      </div>

      <nav className={s.nav}>
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            title={n.label}
            className={({ isActive }) =>
              `${s.link} ${isActive ? s.active : ""}`
            }
          >
            <Icon name={n.icon} size={21} />
            <span className={s.label}>{n.label}</span>
          </NavLink>
        ))}
      </nav>

      <p className={s.quote}>
        «Комуз — бул эстелик эмес, бул жашоо, бул мурас.»
      </p>

      <Link to="/kirish" className={s.user} title="Кирүү / Катталуу">
        <span className={s.avatar}>
          <Icon name="user" size={18} />
        </span>
        <span className={s.label}>Кирүү / Катталуу</span>
      </Link>
    </aside>
  );
}
