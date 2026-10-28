"use client";

import { useId } from "react";

const ThemeSwitcher = ({ dark, onToggle, className = "" }) => {
  const maskId = useId().replace(/:/g, "");

  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`theme-switcher ${className}`}
      onClick={onToggle}
    >
      <svg
        viewBox="0 0 15 15"
        width="20"
        height="20"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        stroke="currentColor"
        aria-hidden
      >
        <mask id={maskId}>
          <circle className="masker" cx="7.5" cy="7.5" r="8.5" fill="#fff" />
        </mask>
        <g mask={`url(#${maskId})`}>
          <path
            className="sun"
            d="M7.5 1.5v-1m0 13.99v-.998m6-5.997h1m-13 0h-1m2-4.996-1-1m12 0-1 1m-10 9.993-1 1m12 0-1-1m-2-4.997a2.999 2.999 0 01-3 2.998 2.999 2.999 0 013-2.998z"
          />
        </g>
        <path
          className="moon"
          fill="currentColor"
          d="M1.66 11.362A6.5 6.5 0 007.693.502a7 7 0 11-6.031 10.86z"
        />
      </svg>
    </button>
  );
};

export default ThemeSwitcher;
