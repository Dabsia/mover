import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import nlFlag from "../Assets/nl.png";
import gbFlag from "../Assets/gb.png";

const languages = [
  { code: "nl", name: "NL", flag: nlFlag },
  { code: "en", name: "EN", flag: gbFlag },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  // Force language change and save to localStorage
  const handleChange = (langCode) => {
    console.log("Changing language to:", langCode);

    // Save to localStorage immediately
    localStorage.setItem("zinter-lang", langCode);

    // Change the language
    i18n.changeLanguage(langCode).then(() => {
      console.log("Language changed successfully to:", langCode);
      setOpen(false);

      // Optional: Force a small re-render to ensure everything updates
      setTimeout(() => {
        window.dispatchEvent(new Event("languageChanged"));
      }, 100);
    });
  };

  const currentLanguage =
    languages.find((l) => l.code === i18n.language) || languages[0];

  // Debug: log current language on mount and changes
  useEffect(() => {
    console.log("Current language:", i18n.language);
    console.log("Saved in localStorage:", localStorage.getItem("zinter-lang"));
  }, [i18n.language]);

  return (
    <div className="mr-1 relative">
      {/* Current language button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-gray-100"
      >
        <img
          src={currentLanguage.flag}
          alt={currentLanguage.name}
          className="w-3 h-3"
        />
        <span className="text-sm font-medium">{currentLanguage.name}</span>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[80px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              className={`flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 ${
                i18n.language === lang.code ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              <img src={lang.flag} alt={lang.name} className="w-3 h-3" />
              <span className="text-sm">{lang.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}

export default LanguageSwitcher;
