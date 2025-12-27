import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  const currentLanguage = i18n.language;
  const isRTL = currentLanguage === 'ar';

  return {
    t,
    changeLanguage,
    currentLanguage,
    isRTL
  };
};
