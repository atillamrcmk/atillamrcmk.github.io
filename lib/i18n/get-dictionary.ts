import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/tr";
import tr from "./dictionaries/tr";
import en from "./dictionaries/en";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = {
  tr,
  en,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.tr;
}
