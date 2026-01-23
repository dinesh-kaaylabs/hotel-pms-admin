
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// In a real production build, these would be loaded from a CDN
// For this implementation, we define the skeleton for the supported languages
const resources = {
  en: {
    translation: {
      common: {
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        loading: "Loading...",
        property: "Property"
      },
      nav: {
        dashboard: "Dashboard",
        bookings: "Bookings",
        housekeeping: "Housekeeping",
        maintenance: "Maintenance",
        pricing: "Pricing",
        finance: "Finance",
        reports: "Reports",
        training: "Training Hub"
      }
    }
  },
  ar: {
    translation: {
      common: {
        save: "حفظ",
        cancel: "إلغاء",
        delete: "حذف",
        edit: "تعديل",
        loading: "جاري التحميل...",
        property: "العقار"
      },
      nav: {
        dashboard: "لوحة التحكم",
        bookings: "الحجوزات",
        housekeeping: "تنظيف الغرف",
        maintenance: "الصيانة",
        pricing: "التسعير",
        finance: "المالية",
        reports: "التقارير",
        training: "مركز التدريب"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false, // Prevent lazy loading delays - we want instant updates
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p']
    }
  });

/**
 * ROOT CAUSE OF PREVIOUS i18n ISSUE:
 * 1. useSuspense: true caused delayed re-renders
 * 2. No proper language persistence strategy
 * 3. Components not subscribing to language changes via i18n.on()
 * 4. Hardcoded strings throughout app
 * 
 * FIX:
 * - Set useSuspense: false for instant updates
 * - Use localStorage detection (first priority)
 * - RTL handling on language change
 * - useTranslation() hook automatically subscribes to changes
 */

// Handle RTL direction switching on the document root
i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    const dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lng;
    // Force localStorage save to ensure persistence
    localStorage.setItem('i18nextLng', lng);
  }
});

export default i18n;