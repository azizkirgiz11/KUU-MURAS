
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useLayout } from "../../context/LayoutContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import RightPanel from "./RightPanel.jsx";
import Footer from "./Footer.jsx";
import ScrollTopButton from "./ScrollTopButton.jsx";

import s from "../../styles/components/AppShell.module.css";

export default function AppShell() {
  const { side, right, closeSmall, toggleSide, toggleRight } =
    useLayout();

  const { pathname, hash } = useLocation();
  const { mode, palette } = useTheme();

  useEffect(() => {
    closeSmall();

    if (hash) {
      const el = document.getElementById(hash.slice(1));

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash, closeSmall]);

  const overlay = side || right;

  const closeOverlay = () => {
    if (side) toggleSide();
    if (right) toggleRight();
  };

  return (
    <div
      className={s.shell}
      data-mode={mode}
      data-palette={palette}
      style={{
        "--sw": side ? "248px" : "76px",
        "--rw": right ? "324px" : "0px",
      }}
    >
      <Sidebar />

      <div className={s.main}>
        <Topbar />

        <main className={s.content}>
          <div key={pathname} className={s.page}>
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>

      <RightPanel />

      <div
        className={`${s.backdrop} ${overlay ? s.show : ""}`}
        onClick={closeOverlay}
        aria-hidden="true"
      />

      <ScrollTopButton />
    </div>
  );
}
