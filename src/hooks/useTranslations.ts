import { productConfig } from "@/constants";
import ptBR from "@/translations/ptBR";
import en from "@/translations/en";

const TRANSLATIONS: { [key: string]: Record<string, Record<string, string>> } =
{
  ptBR,
  en,
};

export const useTranslations = (basePath?: string) => {
  const { language } = productConfig;

  const getValue = (path: string) => {
    const target = basePath
      ? TRANSLATIONS[language][basePath]
      : TRANSLATIONS[language];

    const result = (target as Record<string, string>)?.[path];
    if (!result) {
      console.error(`Missing translation for ${basePath || "root"}.${path}`);
    }
    return result || "";
  };

  return getValue;
};
