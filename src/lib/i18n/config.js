export const locales = ["en", "de", "zh-cn"];
export const defaultLocale = "en";

export const localeLabels = {
  en: "EN",
  de: "DE",
  "zh-cn": "CN",
};

export function getLocaleFromPath(pathname = "/") {
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de";
  if (pathname === "/zh-cn" || pathname.startsWith("/zh-cn/")) return "zh-cn";
  return "en";
}

export function stripLocale(pathname = "/") {
  const stripped = pathname.replace(/^\/(de|zh-cn)(?=\/|$)/, "");
  return stripped || "/";
}

export function localizePath(path = "/", locale = "en") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (!locale || locale === "en") return clean;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}
