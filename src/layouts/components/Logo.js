"use client";

import config from "@config/config.json";
import { getLocaleFromPath, localizePath } from "@lib/i18n/config";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Logo = () => {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const { logo, logo_dark, logo_width, logo_height, logo_text, title } =
    config.site;
  const width = Number(logo_width) || 180;
  const height = Number(logo_height) || 39;

  return (
    <Link
      href={localizePath("/", locale)}
      className="navbar-brand"
      aria-label={title || "Logo"}
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      {logo ? (
        <>
          <Image
            src={logo}
            alt={title || "Blaitware"}
            width={width * 2}
            height={height * 2}
            priority
            unoptimized
            className="img-light h-full w-auto"
          />
          <Image
            src={logo_dark || logo}
            alt={title || "Blaitware"}
            width={width * 2}
            height={height * 2}
            priority
            unoptimized
            className="img-dark h-full w-auto"
          />
        </>
      ) : (
        logo_text || title
      )}
    </Link>
  );
};

export default Logo;
