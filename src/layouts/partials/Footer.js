"use client";

import Social from "@components/Social";
import config from "@config/config.json";
import social from "@config/social.json";
import {
  getLocaleFromPath,
  localizePath,
} from "@lib/i18n/config";
import { getDictionary } from "@lib/i18n/getDictionary";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const dict = getDictionary(locale);
  const { copyright, footer_content } = config.params;
  const footer = dict.footer;
  const { logo, logo_dark, logo_width, logo_height, title } = config.site;
  const width = Number(logo_width) || 160;
  const height = Number(logo_height) || 52;

  return (
    <footer className="section bg-light pb-0">
      <div className="container">
        <div className="row justify-center">
          <div className="col-12 xl:col-11">
            <div className="section pt-0">
              <div className="row gy-4">
                {footer.map((col) => (
                  <div className="col-12 sm:col-6 lg:col-3" key={col.name}>
                    <div className="h5 mb-4">{col.name}</div>
                    <ul className="footer-list list-none">
                      {col.menu.map((item) => (
                        <li key={`${col.name}-${item.text}`}>
                          <Link
                            href={localizePath(item.url, locale)}
                            title={item.text}
                          >
                            {item.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="col-12 sm:col-6 lg:col-3 text-left">
                  <Link
                    href={localizePath("/", locale)}
                    className="mb-3 inline-block"
                    aria-label={title || "Blait Labs"}
                  >
                    <Image
                      src={logo}
                      width={width}
                      height={height}
                      alt={title || "Blait Labs"}
                      unoptimized
                      className="img-light"
                      style={{ width: `${width}px`, height: "auto" }}
                    />
                    <Image
                      src={logo_dark || logo}
                      width={width}
                      height={height}
                      alt={title || "Blait Labs"}
                      unoptimized
                      className="img-dark"
                      style={{ width: `${width}px`, height: "auto" }}
                    />
                  </Link>
                  {markdownify(footer_content, "p", "mb-4 text-left")}
                  <Social source={social} className="social-icons" />
                </div>
              </div>
            </div>
            <div className="footer-copyright border-t border-border py-6 text-center">
              {markdownify(
                copyright.replace("{year}", String(new Date().getFullYear())),
                "small",
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
