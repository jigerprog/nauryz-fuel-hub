import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, Loader2, MessageCircle, Copy } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const T = {
  ru: {
    title: 'AI-подбор услуг', subtitle: 'Опишите вашу компанию и потребности в ГСМ — AI подберёт подходящие услуги и подготовит черновик заявки.',
    company: 'Название компании *', industry: 'Сфера деятельности', needs: 'Потребность в ГСМ *', needsPh: 'Например: нужен дизель для спецтехники и место для хранения',
    volume: 'Объём (тонн / м³)', frequency: 'Периодичность', location: 'Местоположение', submit: 'Получить рекомендации', loading: 'Анализируем...',
    result: 'Рекомендации', send: 'Отправить в WhatsApp', copy: 'Копировать', copied: 'Скопировано', err: 'Не удалось получить ответ. Попробуйте позже.', req: 'Заполните обязательные поля',
  },
  kk: {
    title: 'AI арқылы қызмет таңдау', subtitle: 'Компанияңыз бен ЖЖМ қажеттіліктеріңізді сипаттаңыз — AI лайық қызметтерді таңдап, өтінім жобасын дайындайды.',
    company: 'Компания атауы *', industry: 'Қызмет саласы', needs: 'ЖЖМ қажеттілігі *', needsPh: 'Мысалы: арнайы техникаға дизель және сақтау орны қажет',
    volume: 'Көлемі (тонна / м³)', frequency: 'Жиілігі', location: 'Орналасқан жері', submit: 'Ұсыныстар алу', loading: 'Талдап жатырмыз...',
    result: 'Ұсыныстар', send: 'WhatsApp-қа жіберу', copy: 'Көшіру', copied: 'Көшірілді', err: 'Жауап алу мүмкін болмады. Кейінірек қайталаңыз.', req: 'Міндетті өрістерді толтырыңыз',
  },
  en: {
    title: 'AI Service Advisor', subtitle: 'Describe your company and fuel needs — AI will match suitable services and draft a request for you.',
    company: 'Company name *', industry: 'Industry', needs: 'Fuel needs *', needsPh: 'E.g. diesel for heavy machinery and storage space',
    volume: 'Volume (tons / m³)', frequency: 'Frequency', location: 'Location', submit: 'Get recommendations', loading: 'Analyzing...',
    result: 'Recommendations', send: 'Send via WhatsApp', copy: 'Copy', copied: 'Copied', err: 'Could not get a response. Please try later.', req: 'Please fill in required fields',
  },
};

const AiAdvisor = () => {
  const { language } = useLanguage();
  const t = T[language];
  const { toast } = useToast();
  const [form, setForm] = useState({ company: '', industry: '', needs: '', volume: '', frequency: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company.trim() || !form.needs.trim()) {
      toast({ title: t.req, variant: 'destructive' });
      return;
    }
    setLoading(true);
    setResult('');
    const { data, error } = await supabase.functions.invoke('fuel-advisor', { body: { ...form, language } });
    setLoading(false);
    if (error || !data?.result) {
      toast({ title: t.err, variant: 'destructive' });
      return;
    }
    setResult(data.result);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(result);
    toast({ title: t.copied });
  };

  return (
    <section id="ai-advisor" className="py-20 bg-industrial-darker">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-industrial-yellow mb-4">
            <Bot className="w-7 h-7 text-industrial-dark" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-steel-light mb-4">{t.title}</h2>
          <p className="text-steel max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="bg-industrial-dark border-industrial-yellow/20">
            <CardContent className="p-6">
              <form onSubmit={submit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label className="text-steel-light">{t.company}</Label><Input value={form.company} onChange={set('company')} maxLength={200} /></div>
                  <div><Label className="text-steel-light">{t.industry}</Label><Input value={form.industry} onChange={set('industry')} maxLength={200} /></div>
                </div>
                <div><Label className="text-steel-light">{t.needs}</Label><Textarea rows={4} value={form.needs} onChange={set('needs')} placeholder={t.needsPh} maxLength={2000} /></div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div><Label className="text-steel-light">{t.volume}</Label><Input value={form.volume} onChange={set('volume')} maxLength={200} /></div>
                  <div><Label className="text-steel-light">{t.frequency}</Label><Input value={form.frequency} onChange={set('frequency')} maxLength={200} /></div>
                  <div><Label className="text-steel-light">{t.location}</Label><Input value={form.location} onChange={set('location')} maxLength={200} /></div>
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-industrial-yellow text-industrial-dark hover:bg-industrial-yellow/90 font-semibold">
                  {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t.loading}</> : t.submit}
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card className="bg-industrial-dark border-industrial-yellow/20">
            <CardContent className="p-6 h-full flex flex-col">
              <h3 className="text-xl font-semibold text-industrial-yellow mb-4">{t.result}</h3>
              {result ? (
                <>
                  <div className="prose prose-sm prose-invert max-w-none flex-1 overflow-auto max-h-[480px]">
                    <ReactMarkdown>{result}</ReactMarkdown>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Button asChild className="bg-industrial-yellow text-industrial-dark hover:bg-industrial-yellow/90">
                      <a href={`https://wa.me/77788548420?text=${encodeURIComponent(result.slice(0, 3000))}`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4 mr-2" />{t.send}
                      </a>
                    </Button>
                    <Button variant="outline" onClick={copy}><Copy className="w-4 h-4 mr-2" />{t.copy}</Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-steel text-center min-h-[200px]">
                  {loading ? <Loader2 className="w-8 h-8 animate-spin text-industrial-yellow" /> : <Bot className="w-12 h-12 opacity-40" />}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AiAdvisor;
