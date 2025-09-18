import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import office from '@/assets/office.jpeg';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-industrial-dark mb-6">
              {t('about.title')}
            </h2>
            <div className="w-20 h-1 bg-gradient-yellow mb-8"></div>
            <p className="text-lg text-steel-dark leading-relaxed">
              {t('about.text')}
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <Card className="overflow-hidden shadow-industrial">
              <CardContent className="p-0">
                <img 
                  src={office} 
                  alt="NAURYZ-CONTRACT Office and Facilities" 
                  className="w-full h-96 object-cover"
                />
              </CardContent>
            </Card>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-yellow rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;