import de from "./dictionaries/de.json";
import en from "./dictionaries/en.json";
import zhCn from "./dictionaries/zh-cn.json";
import { defaultLocale } from "./config";

const dictionaries = {
  en,
  de,
  "zh-cn": zhCn,
};

export function getDictionary(locale = defaultLocale) {
  return dictionaries[locale] || dictionaries[defaultLocale];
}
