"use client";

import Logo from "@components/Logo";
import ThemeSwitcher from "@components/ThemeSwitcher";
import {
  getLocaleFromPath,
  localeLabels,
  locales,
  localizePath,
  stripLocale,
} from "@lib/i18n/config";
import { getDictionary } from "@lib/i18n/getDictionary";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBriefcaseMedical,
  FaChartBar,
  FaEnvelopeOpenText,
  FaGraduationCap,
  FaHeadset,
  FaLaptopHouse,
  FaServer,
  FaUsers,
} from "react-icons/fa";

const icons = {
  FaUsers,
  FaHeadset,
  FaLaptopHouse,
  FaEnvelopeOpenText,
  FaChartBar,
  FaServer,
  FaBriefcaseMedical,
  FaGraduationCap,
  FaArrowRight,
};

/** Temporary: set to true to show the EN/DE/CN language switcher again. */
const ENABLE_LANGUAGE_SWITCHER = false;

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPath(pathname);
  const pathWithoutLocale = stripLocale(pathname);
  const dict = getDictionary(locale);
  const { main } = dict;
  const [navOpen, setNavOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dark, setDark] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setNavOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const onLanguageChange = (event) => {
    router.push(localizePath(pathWithoutLocale, event.target.value));
  };

  const isActive = (url) =>
    pathWithoutLocale === url || pathWithoutLocale.startsWith(`${url}/`);

  const LanguageSelect = ({ className = "" }) => (
    <select
      aria-label="Language"
      className={`language-switcher ${className}`}
      value={locale}
      onChange={onLanguageChange}
    >
      {locales.map((code) => (
        <option key={code} value={code}>
          {localeLabels[code]}
        </option>
      ))}
    </select>
  );

  return (
    <header className={`header navigation ${sticky ? "is-sticky" : ""}`}>
      <div className="container">
        <nav className="navbar">
          <Logo />

          <div className="navbar-mobile-tools">
            {ENABLE_LANGUAGE_SWITCHER && <LanguageSelect />}
            <ThemeSwitcher dark={dark} onToggle={toggleTheme} />
            <button
              type="button"
              className="navbar-toggler"
              aria-expanded={navOpen}
              aria-label="Toggle navigation"
              onClick={() => setNavOpen((open) => !open)}
            >
              {navOpen ? (
                <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <polygon
                    points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                    transform="rotate(45 10 10)"
                  />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              )}
            </button>
          </div>

          <div
            id="nav-menu"
            className={`navbar-collapse ${navOpen ? "show" : ""}`}
          >
            <ul className="navbar-nav">
              {main.map((menuItem, i) => (
                <React.Fragment key={`menu-${i}`}>
                  {menuItem.hasChildren ? (
                    <li
                      className={`nav-item nav-dropdown ${
                        menuItem.children.some(
                          (child) => child.icon || child.subtitle,
                        )
                          ? "dropdown-lg"
                          : ""
                      } ${openDropdown === menuItem.name ? "is-open" : ""}`}
                    >
                      <button
                        type="button"
                        className={`nav-link dropdown-toggle ${
                          menuItem.children.some((child) => isActive(child.url))
                            ? "nav-link-active"
                            : ""
                        }`}
                        aria-expanded={openDropdown === menuItem.name}
                        onClick={() => {
                          // Desktop uses CSS :hover; click accordion is mobile-only
                          if (window.innerWidth < 992) {
                            setOpenDropdown((current) =>
                              current === menuItem.name ? null : menuItem.name,
                            );
                          }
                        }}
                      >
                        {menuItem.name}
                      </button>
                      <ul className="nav-dropdown-list">
                        {menuItem.children.map((child, j) => {
                          const Icon = child.icon ? icons[child.icon] : null;
                          return (
                            <li
                              className="nav-dropdown-item"
                              key={`children-${j}`}
                            >
                              <Link
                                href={localizePath(child.url, locale)}
                                className={`nav-dropdown-link ${
                                  Icon || child.subtitle ? "has-icon" : ""
                                } ${isActive(child.url) ? "active" : ""}`}
                                onClick={() => {
                                  setNavOpen(false);
                                  setOpenDropdown(null);
                                }}
                              >
                                {Icon && (
                                  <Icon className="dropdown-icon" aria-hidden />
                                )}
                                {child.name}
                                {child.subtitle && (
                                  <small className="dropdown-subtitle">
                                    {child.subtitle}
                                  </small>
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <Link
                        href={localizePath(menuItem.url, locale)}
                        onClick={() => setNavOpen(false)}
                        className={`nav-link ${
                          isActive(menuItem.url) ? "nav-link-active" : ""
                        }`}
                      >
                        {menuItem.name}
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>

            <div className="navbar-actions">
              {ENABLE_LANGUAGE_SWITCHER && (
                <LanguageSelect className="language-desktop" />
              )}
              <Link
                className="btn btn-sm btn-primary"
                href={localizePath("/get-demo", locale)}
                onClick={() => setNavOpen(false)}
              >
                {dict.nav_button}
              </Link>
              <ThemeSwitcher
                dark={dark}
                onToggle={toggleTheme}
                className="theme-desktop"
              />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
