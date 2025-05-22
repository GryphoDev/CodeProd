import { useLang } from "@/components/language-provider";
import { translations } from "@/lib/translations";

export const useTranslation = () => {
  const { lang } = useLang();

  const t = translations[lang];

  return { t };
};
