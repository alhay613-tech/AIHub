"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import { Language, translations } from '@/lib/i18n/translations';

type I18nContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.en;
  isRTL: boolean;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('ai-hub-lang') as Language;
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('ai-hub-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const value = {
    lang,
    setLang,
    t: translations[lang],
    isRTL: lang === 'ar',
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}