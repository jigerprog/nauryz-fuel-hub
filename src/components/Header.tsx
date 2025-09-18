import React from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.png';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const flags = {
    ru: '🇷🇺',
    kk: '🇰🇿', 
    en: '🇺🇸'
  };

  return (
    <header className="bg-gradient-industrial border-b border-steel-light sticky top-0 z-50 shadow-industrial">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="NAURYZ-CONTRACT" className="h-12 w-auto" />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-background hover:text-primary transition-colors duration-300 font-medium"
            >
              {t('header.home')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-background hover:text-primary transition-colors duration-300 font-medium"
            >
              {t('header.about')}
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-background hover:text-primary transition-colors duration-300 font-medium"
            >
              {t('header.services')}
            </button>
            <button
              onClick={() => scrollToSection('contacts')}
              className="text-background hover:text-primary transition-colors duration-300 font-medium"
            >
              {t('header.contacts')}
            </button>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center space-x-2">
            {(Object.keys(flags) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-2 rounded-md transition-all duration-300 flex items-center space-x-1 ${
                  language === lang
                    ? 'bg-primary text-primary-foreground shadow-yellow-glow'
                    : 'text-background hover:bg-primary/20 hover:text-primary'
                }`}
              >
                <span className="text-lg">{flags[lang]}</span>
                <span className="text-sm font-medium uppercase">{lang}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;