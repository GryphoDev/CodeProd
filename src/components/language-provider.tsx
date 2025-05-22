import { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "fr";

type LangProviderProps = {
  children: React.ReactNode;
  defaultLang?: Lang;
  storageKey?: string;
};

type LangProviderState = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const initialState: LangProviderState = {
  lang: "en",
  setLang: () => null,
};

const LangProviderContext = createContext<LangProviderState>(initialState);

export function LangProvider({
  children,
  defaultLang = "en",
  storageKey = "lang",
  ...props
}: LangProviderProps) {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem(storageKey) as Lang) || defaultLang
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("en", "fr");
    root.classList.add(lang);
  }, [lang]);

  const updateLang = (lang: Lang) => {
    localStorage.setItem(storageKey, lang);
    setLang(lang);
  };

  const value = {
    lang,
    setLang: updateLang,
  };

  return (
    <LangProviderContext.Provider {...props} value={value}>
      {children}
    </LangProviderContext.Provider>
  );
}

export const useLang = () => {
  const context = useContext(LangProviderContext);
  if (context === undefined) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return context;
};
