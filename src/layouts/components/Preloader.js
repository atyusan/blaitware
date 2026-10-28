"use client";

import { useEffect, useState } from "react";

const Preloader = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hide = () => setHidden(true);
    if (document.readyState === "complete") {
      const t = setTimeout(hide, 250);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", hide);
    const fallback = setTimeout(hide, 1200);
    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      className={`preloader ${hidden ? "is-hidden" : ""}`}
      aria-hidden={hidden}
    >
      <div className="preloader-spinner" />
    </div>
  );
};

export default Preloader;
