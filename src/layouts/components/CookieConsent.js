"use client";

import { useEffect, useState } from "react";
import { getLocaleFromPath } from "@lib/i18n/config";
import { getDictionary } from "@lib/i18n/getDictionary";
import { usePathname } from "next/navigation";

const CookieConsent = () => {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const dict = getDictionary(locale);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookie-consent="));
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 60);
    document.cookie = `cookie-consent=true; expires=${expires.toUTCString()}; path=/`;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div id="cookie-box" className="cookie-box">
      {dict.cookie.message}
      <button
        id="cookie-button"
        type="button"
        className="cookie-box-button btn btn-sm btn-outline-primary"
        onClick={accept}
      >
        {dict.cookie.accept}
      </button>
    </div>
  );
};

export default CookieConsent;
