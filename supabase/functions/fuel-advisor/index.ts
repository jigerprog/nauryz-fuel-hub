import { createOpenAI } from "npm:@ai-sdk/openai";
import { streamText } from "npm:ai";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-lovable-aig-run-id",
  "Access-Control-Expose-Headers": "X-Lovable-AIG-Run-ID",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const COMPANY = `ТОО "НАУРЫЗ-КОНТРАКТ", г. Кульсары, Жылыойский р-н, Атырауская обл.
Услуги:
1. Хранение ГСМ — резервуарный парк общим объёмом ~4000 м³ (резервуары до 3600 т, планируется резервуар 2000 м³).
2. Приёмка ГСМ с ЖД вагонов-цистерн через собственный ЖД тупик 293 м.
3. Продажа дизельного топлива оптом.
4. Разгрузка и складирование инертных и строительных материалов (щебень разных фракций, песок из Мангистауской и Актюбинской областей).
Инфраструктура: территория 9700 м², склад с насосным зданием, площадка 3000 м³, охранная и противопожарная сигнализация, видеонаблюдение.
Контакты: менеджер +77788548420 (WhatsApp), менеджер по продажам +77754948042, nauryz_kontrakt@mail.ru.`;

const LANG: Record<string, string> = { ru: "русском", kk: "казахском", en: "английском" };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return json({ error: "AI is not configured" }, 500);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const s = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const company = s(body.company, 200);
  const industry = s(body.industry, 200);
  const needs = s(body.needs, 2000);
  const volume = s(body.volume, 200);
  const frequency = s(body.frequency, 200);
  const location = s(body.location, 200);
  const lang = LANG[body.language] ? body.language : "ru";
  if (!company || !needs) return json({ error: "company and needs are required" }, 400);

  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });

  const system = `Ты — консультант компании по ГСМ. Используй ТОЛЬКО эти данные о компании, не выдумывай цены и услуги:
${COMPANY}
Отвечай на ${LANG[lang]} языке, в Markdown, кратко (до ~300 слов). Структура:
## Рекомендуемые услуги — список подходящих услуг с объяснением, почему они подходят клиенту.
## Предложение — краткое коммерческое предложение под потребности клиента.
## Черновик заявки — готовый текст заявки от имени клиента, который можно отправить менеджеру.
Цены не называй — укажи, что их уточнит менеджер. Если потребность не относится к услугам компании, честно скажи об этом.`;

  const user = `Компания: ${company}
Отрасль: ${industry || "-"}
Потребность в ГСМ: ${needs}
Объём: ${volume || "-"}
Периодичность: ${frequency || "-"}
Местоположение: ${location || "-"}`;

  try {
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system,
      prompt: user,
      abortSignal: req.signal,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });
    const text = await result.text;
    if (!text.trim()) return json({ error: "Empty response" }, 502);
    return json({ result: text });
  } catch (e: any) {
    const status = e?.statusCode ?? e?.status ?? 500;
    console.error("fuel-advisor error", status, e?.message);
    if (status === 429) return json({ error: "rate_limited" }, 429);
    if (status === 402) return json({ error: "credits" }, 402);
    return json({ error: "ai_error" }, status >= 400 && status < 600 ? status : 500);
  }
});
