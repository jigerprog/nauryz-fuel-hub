import React, { createContext, useContext, useState } from 'react';

export type Language = 'ru' | 'kk' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ru: {
    // Header
    'header.home': 'Главная',
    'header.about': 'О нас',
    'header.services': 'Услуги',
    'header.contacts': 'Контакты',
    
    // Hero Section
    'hero.title': 'ТОО "НАУРЫЗ-КОНТРАКТ" — Надежный партнер в поставке, хранении и продаже ГСМ',
    'hero.subtitle': 'Оптовые поставки дизельного топлива и профессиональное хранение нефтепродуктов для крупных компаний и транспортных предприятий',
    'hero.cta': 'Получить консультацию',
    
    // About Section
    'about.title': 'О компании',
    'about.text': 'ТОО "НАУРЫЗ-КОНТРАКТ" располагает одной из крупнейших в Жылыойском районе баз по приемке, складированию, хранению и отпуску нефтепродуктов, товарно-материальных ценностей. Компания имеет все возможности по приему, складированию, хранению и отпуску нефтепродуктов, оборудования, трубной продукции, строительных и инертных материалов и других товарно-материальных ценностей.',
    
    // Capacities Section
    'capacities.title': 'Производственные мощности',
    'capacities.area': 'Территория нефтебазы',
    'capacities.area.value': '9 700 м²',
    'capacities.storage': 'Резервуары для хранения',
    'capacities.storage.value': '3 600 тонн',
    'capacities.railway': 'Железнодорожный тупик',
    'capacities.railway.value': '293 м',
    'capacities.expansion': 'Планируемое расширение',
    'capacities.expansion.value': '2 000 м³',
    'capacities.materials': 'Площадка для инертных материалов',
    'capacities.materials.value': '3 000 м³',
    'capacities.security': 'Безопасность и контроль',
    'capacities.security.value': 'Охранная и противопожарная сигнализация, видеонаблюдение',
    
    // Services Section
    'services.title': 'Услуги',
    'services.storage.title': 'Хранение ГСМ',
    'services.storage.desc': 'Обеспечиваем надежное и безопасное хранение дизельного топлива и других нефтепродуктов в резервуарах с общим объемом 4000 м³.',
    'services.railway.title': 'Приемка с ЖД вагонов',
    'services.railway.desc': 'Осуществляем приемку нефтепродуктов с железнодорожных цистерн через собственный тупик длиной 293 м.',
    'services.sales.title': 'Продажа дизельного топлива оптом',
    'services.sales.desc': 'Предлагаем оптовые поставки высококачественного дизельного топлива с нашей нефтебазы для крупных компаний и предприятий.',
    'services.materials.title': 'Разгрузка инертных и строительных материалов',
    'services.materials.desc': 'Осуществляем разгрузку и складирование различных инертных материалов, включая щебень разных фракций и песок из Мангистауской и Актюбинской областей.',
    'services.more': 'Подробнее',
    
    // Contacts Section
    'contacts.title': 'Свяжитесь с нами',
    'contacts.form.name': 'Имя',
    'contacts.form.phone': 'Телефон',
    'contacts.form.company': 'Название компании',
    'contacts.form.message': 'Сообщение',
    'contacts.form.submit': 'Отправить заявку',
    'contacts.manager': 'Менеджер',
    'contacts.sales': 'Менеджер по продажам',
    'contacts.address': 'Юридический адрес',
    'contacts.address.value': 'Атырауская обл., Жылыойский р-н, г.Кульсары, ул.Бисенгали Өтеулиев, 21',
    
    // Modal
    'modal.contacts': 'Контакты',
    'modal.whatsapp': 'Написать в WhatsApp',
    'modal.call': 'Позвонить',
    'modal.close': 'Закрыть',
  },
  
  kk: {
    // Header
    'header.home': 'Басты бет',
    'header.about': 'Біз туралы',
    'header.services': 'Қызметтер',
    'header.contacts': 'Байланыс',
    
    // Hero Section
    'hero.title': '"НАУРЫЗ-КОНТРАКТ" ЖШС — ЖММ жеткізу, сақтау және сату саласындағы сенімді серіктес',
    'hero.subtitle': 'Ірі компаниялар мен көлік кәсіпорындары үшін дизель отынын көтерме жеткізу және мұнай өнімдерін кәсіби сақтау',
    'hero.cta': 'Кеңес алу',
    
    // About Section
    'about.title': 'Компания туралы',
    'about.text': '"НАУРЫЗ-КОНТРАКТ" ЖШС Жылыой ауданындағы мұнай өнімдерін, тауарлық-материалдық құндылықтарды қабылдау, складтау, сақтау және беру жөніндегі ең ірі базалардың бірін иеленеді. Компания мұнай өнімдерін, жабдықтарды, құбырлық өнімдерді, құрылыс және инертті материалдарды және басқа тауарлық-материалдық құндылықтарды қабылдау, складтау, сақтау және беру жөніндегі барлық мүмкіндіктерге ие.',
    
    // Capacities Section
    'capacities.title': 'Өндірістік қуаттар',
    'capacities.area': 'Мұнай базасының аумағы',
    'capacities.area.value': '9 700 м²',
    'capacities.storage': 'Сақтау резервуарлары',
    'capacities.storage.value': '3 600 тонна',
    'capacities.railway': 'Теміржол тупигі',
    'capacities.railway.value': '293 м',
    'capacities.expansion': 'Жоспарланған кеңейту',
    'capacities.expansion.value': '2 000 м³',
    'capacities.materials': 'Инертті материалдарға арналған алаң',
    'capacities.materials.value': '3 000 м³',
    'capacities.security': 'Қауіпсіздік және бақылау',
    'capacities.security.value': 'Қорғау және өртке қарсы дабыл жүйесі, бейне бақылау',
    
    // Services Section
    'services.title': 'Қызметтер',
    'services.storage.title': 'ЖММ сақтау',
    'services.storage.desc': 'Жалпы көлемі 4000 м³ резервуарларда дизель отыны мен басқа мұнай өнімдерін сенімді және қауіпсіз сақтауды қамтамасыз етеміз.',
    'services.railway.title': 'ТЖ вагондарынан қабылдау',
    'services.railway.desc': 'Ұзындығы 293 м өзіміздің тупик арқылы теміржол цистерналарынан мұнай өнімдерін қабылдауды жүзеге асырамыз.',
    'services.sales.title': 'Дизель отынын көтерме сату',
    'services.sales.desc': 'Ірі компаниялар мен кәсіпорындар үшін біздің мұнай базасынан жоғары сапалы дизель отынын көтерме жеткізуді ұсынамыз.',
    'services.materials.title': 'Инертті және құрылыс материалдарын түсіру',
    'services.materials.desc': 'Маңғыстау және Ақтөбе облыстарынан әр түрлі фракциялы щебень және құм салып, әр түрлі инертті материалдарды түсіру және складтауды жүзеге асырамыз.',
    'services.more': 'Толығырақ',
    
    // Contacts Section
    'contacts.title': 'Бізбен байланысыңыз',
    'contacts.form.name': 'Аты',
    'contacts.form.phone': 'Телефон',
    'contacts.form.company': 'Компания атауы',
    'contacts.form.message': 'Хабарлама',
    'contacts.form.submit': 'Өтінім жіберу',
    'contacts.manager': 'Менеджер',
    'contacts.sales': 'Сату менеджері',
    'contacts.address': 'Заңды мекенжайы',
    'contacts.address.value': 'Атырау обл., Жылыой ауд., Құлсары қ., Бисенғали Өтеуұлы көш., 21',
    
    // Modal
    'modal.contacts': 'Байланыстар',
    'modal.whatsapp': 'WhatsApp арқылы жазу',
    'modal.call': 'Қоңырау шалу',
    'modal.close': 'Жабу',
  },
  
  en: {
    // Header
    'header.home': 'Home',
    'header.about': 'About',
    'header.services': 'Services',
    'header.contacts': 'Contacts',
    
    // Hero Section
    'hero.title': 'TOO "NAURYZ-CONTRACT" — Reliable Partner in Fuel Supply, Storage and Sales',
    'hero.subtitle': 'Wholesale diesel fuel deliveries and professional petroleum products storage for large companies and transport enterprises',
    'hero.cta': 'Get Consultation',
    
    // About Section
    'about.title': 'About Company',
    'about.text': 'TOO "NAURYZ-CONTRACT" operates one of the largest bases in Zhylyoi district for receiving, warehousing, storage and distribution of petroleum products and material assets. The company has full capabilities for receiving, warehousing, storage and distribution of petroleum products, equipment, pipe products, construction and inert materials, and other material assets.',
    
    // Capacities Section
    'capacities.title': 'Production Capacities',
    'capacities.area': 'Oil depot territory',
    'capacities.area.value': '9,700 m²',
    'capacities.storage': 'Storage reservoirs',
    'capacities.storage.value': '3,600 tons',
    'capacities.railway': 'Railway siding',
    'capacities.railway.value': '293 m',
    'capacities.expansion': 'Planned expansion',
    'capacities.expansion.value': '2,000 m³',
    'capacities.materials': 'Inert materials platform',
    'capacities.materials.value': '3,000 m³',
    'capacities.security': 'Security and control',
    'capacities.security.value': 'Security and fire alarm systems, video surveillance',
    
    // Services Section
    'services.title': 'Services',
    'services.storage.title': 'Fuel Storage',
    'services.storage.desc': 'We provide reliable and safe storage of diesel fuel and other petroleum products in reservoirs with a total volume of 4,000 m³.',
    'services.railway.title': 'Railway Car Reception',
    'services.railway.desc': 'We handle petroleum product reception from railway tank cars through our own siding 293 meters long.',
    'services.sales.title': 'Wholesale Diesel Fuel Sales',
    'services.sales.desc': 'We offer wholesale deliveries of high-quality diesel fuel from our oil depot to large companies and enterprises.',
    'services.materials.title': 'Inert and Construction Materials Unloading',
    'services.materials.desc': 'We handle unloading and warehousing of various inert materials, including crushed stone of different fractions and sand from Mangistau and Aktobe regions.',
    'services.more': 'Learn More',
    
    // Contacts Section
    'contacts.title': 'Contact Us',
    'contacts.form.name': 'Name',
    'contacts.form.phone': 'Phone',
    'contacts.form.company': 'Company Name',
    'contacts.form.message': 'Message',
    'contacts.form.submit': 'Submit Request',
    'contacts.manager': 'Manager',
    'contacts.sales': 'Sales Manager',
    'contacts.address': 'Legal Address',
    'contacts.address.value': 'Atyrau region, Zhylyoi district, Kulsary city, Bisengali Oteuliev st., 21',
    
    // Modal
    'modal.contacts': 'Contacts',
    'modal.whatsapp': 'Message on WhatsApp',
    'modal.call': 'Call Now',
    'modal.close': 'Close',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};