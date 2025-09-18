import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Factory, Truck, Shield, Zap, Building, Scale } from 'lucide-react';
import tanks2 from '@/assets/tanks2.jpeg';

const Capacities = () => {
  const { t } = useLanguage();

  const capacities = [
    {
      icon: Building,
      title: t('capacities.area'),
      value: t('capacities.area.value'),
    },
    {
      icon: Factory,
      title: t('capacities.storage'),
      value: t('capacities.storage.value'),
    },
    {
      icon: Truck,
      title: t('capacities.railway'),
      value: t('capacities.railway.value'),
    },
    {
      icon: Zap,
      title: t('capacities.expansion'),
      value: t('capacities.expansion.value'),
    },
    {
      icon: Scale,
      title: t('capacities.materials'),
      value: t('capacities.materials.value'),
    },
    {
      icon: Shield,
      title: t('capacities.security'),
      value: t('capacities.security.value'),
    },
  ];

  return (
    <section id="capacities" className="py-20 bg-steel-light/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-industrial-dark mb-6">
            {t('capacities.title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-yellow mx-auto mb-8"></div>
        </div>

        {/* Background Image */}
        <div className="relative mb-16">
          <Card className="overflow-hidden shadow-industrial">
            <CardContent className="p-0">
              <img 
                src={tanks2} 
                alt="Industrial Facility with Railway" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-industrial/30"></div>
            </CardContent>
          </Card>
        </div>

        {/* Capacity Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capacities.map((capacity, index) => {
            const IconComponent = capacity.icon;
            return (
              <Card key={index} className="group hover:shadow-steel transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-yellow rounded-lg flex items-center justify-center group-hover:shadow-yellow-glow transition-all duration-300">
                        <IconComponent className="w-8 h-8 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-industrial-dark mb-2">
                        {capacity.title}
                      </h3>
                      <p className="text-steel-dark font-medium">
                        {capacity.value}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Capacities;