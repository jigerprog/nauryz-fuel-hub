import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.png';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-industrial text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Company Info */}
          <div className="space-y-4">
            <img src={logo} alt="NAURYZ-CONTRACT" className="h-16 w-auto" />
            <p className="text-steel-light">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary mb-4">
              {t('contacts.title')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-steel-light">{t('contacts.manager')}: +7 778 854 84 20</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-steel-light">{t('contacts.sales')}: +7 775 494 80 42</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-steel-light">nauryz_kontrakt@mail.ru</p>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary mb-4">
              {t('contacts.address')}
            </h3>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-steel-light">
                {t('contacts.address.value')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-steel-dark/30 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-steel-medium text-sm">
              © 2024 ТОО "НАУРЫЗ-КОНТРАКТ". Все права защищены.
            </p>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => window.open('https://wa.me/77788548420', '_blank')}
                className="text-steel-light hover:text-primary transition-colors duration-300"
              >
                WhatsApp
              </button>
              <button 
                onClick={() => window.open('tel:+77788548420', '_self')}
                className="text-steel-light hover:text-primary transition-colors duration-300"
              >
                Позвонить
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;