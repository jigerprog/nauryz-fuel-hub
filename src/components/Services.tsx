import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Fuel, Train, Truck, Package } from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();
  const [openModal, setOpenModal] = useState<string | null>(null);

  const services = [
    {
      id: 'storage',
      icon: Fuel,
      title: t('services.storage.title'),
      description: t('services.storage.desc'),
    },
    {
      id: 'railway',
      icon: Train,
      title: t('services.railway.title'),
      description: t('services.railway.desc'),
    },
    {
      id: 'sales',
      icon: Truck,
      title: t('services.sales.title'),
      description: t('services.sales.desc'),
    },
    {
      id: 'materials',
      icon: Package,
      title: t('services.materials.title'),
      description: t('services.materials.desc'),
    },
  ];

  const ContactModal = ({ service }: { service: any }) => (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-industrial-dark">
          {service.title}
        </DialogTitle>
      </DialogHeader>
      <div className="py-6">
        <h3 className="text-lg font-semibold text-industrial-dark mb-4">
          {t('modal.contacts')}
        </h3>
        <div className="space-y-3">
          <Button
            onClick={() => window.open('https://wa.me/77788548420', '_blank')}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {t('modal.whatsapp')} (+7 778 854 84 20)
          </Button>
          <Button
            onClick={() => window.open('tel:+77788548420', '_self')}
            className="w-full bg-gradient-yellow hover:bg-gradient-yellow text-primary-foreground"
          >
            {t('modal.call')} (+7 778 854 84 20)
          </Button>
          <Button
            onClick={() => window.open('tel:+77754948042', '_self')}
            className="w-full bg-gradient-yellow hover:bg-gradient-yellow text-primary-foreground"
          >
            {t('modal.call')} (+7 775 494 80 42)
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-industrial-dark mb-6">
            {t('services.title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-yellow mx-auto mb-8"></div>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.id} className="group hover:shadow-steel transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-yellow rounded-lg flex items-center justify-center group-hover:shadow-yellow-glow transition-all duration-300">
                        <IconComponent className="w-8 h-8 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-industrial-dark mb-3">
                        {service.title}
                      </h3>
                      <p className="text-steel-dark mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                          >
                            {t('services.more')}
                          </Button>
                        </DialogTrigger>
                        <ContactModal service={service} />
                      </Dialog>
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

export default Services;