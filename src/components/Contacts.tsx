import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contacts = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.message) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the data to your backend
    toast({
      title: "Заявка отправлена",
      description: "Мы свяжемся с вами в ближайшее время",
    });

    // Clear form
    setFormData({
      name: '',
      phone: '',
      company: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t('contacts.manager'),
      value: '+7 778 854 84 20',
      action: () => window.open('tel:+77788548420', '_self')
    },
    {
      icon: Phone,
      title: t('contacts.sales'),
      value: '+7 775 494 80 42',
      action: () => window.open('tel:+77754948042', '_self')
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'nauryz_kontrakt@mail.ru',
      action: () => window.open('mailto:nauryz_kontrakt@mail.ru', '_self')
    },
    {
      icon: MapPin,
      title: t('contacts.address'),
      value: t('contacts.address.value'),
      action: null
    }
  ];

  return (
    <section id="contacts" className="py-20 bg-steel-light/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-industrial-dark mb-6">
            {t('contacts.title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-yellow mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-industrial">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-industrial-dark font-medium">
                    {t('contacts.form.name')} *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-industrial-dark font-medium">
                    {t('contacts.form.phone')} *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="company" className="text-industrial-dark font-medium">
                    {t('contacts.form.company')}
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-industrial-dark font-medium">
                    {t('contacts.form.message')} *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-2"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-yellow hover:bg-gradient-yellow hover:scale-105 text-primary-foreground font-semibold py-3 shadow-yellow-glow transition-all duration-300"
                >
                  {t('contacts.form.submit')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="hover:shadow-steel transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-yellow rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary-foreground" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-industrial-dark mb-1">
                          {info.title}
                        </h3>
                        {info.action ? (
                          <button
                            onClick={info.action}
                            className="text-steel-dark hover:text-primary transition-colors duration-300 text-left"
                          >
                            {info.value}
                          </button>
                        ) : (
                          <p className="text-steel-dark">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* WhatsApp Contact */}
            <Card className="bg-gradient-yellow shadow-yellow-glow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <MessageCircle className="w-8 h-8 text-primary-foreground" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                      WhatsApp
                    </h3>
                    <Button
                      onClick={() => window.open('https://wa.me/77788548420', '_blank')}
                      variant="secondary"
                      className="bg-background/20 hover:bg-background/30 text-primary-foreground border-none"
                    >
                      Написать в WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;