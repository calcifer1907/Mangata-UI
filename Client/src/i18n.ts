import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Tipado para las opciones de configuración (incluyendo backend)

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "es", // Idioma por defecto
    ns: ["common", "home"], // Espacio de nombres para la carga de archivos JSON
    fallbackLng: "es",
    fallbackNS: "home",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    // Para evitar errores 404
    returnNull: false,
    returnEmptyString: false,
    saveMissing: true,
    saveMissingTo: "all",
    backend: {
      // Configuración específica del backend
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
