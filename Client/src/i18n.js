import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend) // Carga traducciones desde /locales
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Inicializa react-i18next
  .init({
    fallbackLng: "en", // Idioma por defecto
    debug: true, // Modo desarrollo (muestra logs)
    interpolation: {
      escapeValue: false, // No escapa HTML (para seguridad)
    },
  });

export default i18n;
