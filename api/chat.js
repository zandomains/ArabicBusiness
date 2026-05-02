import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, history } = req.body;

    // التأكد من قراءة المفتاح الصحيح الذي أعددناه في Vercel
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    
    // استخدام الاسم المختصر والمستقر للنموذج
    // هذا الاسم متوافق تماماً مع الإصدار 0.24.1 ويحل مشكلة الـ 404
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash" 
    });

    const chat = model.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    });

    // إضافة التعليمات البرمجية للمساعد هنا لضمان هويته
    const systemPrompt = "أنت مساعد ذكي لمنصة ArabicBusiness. قدم نصائح حول ريادة الأعمال والتجارة في المغرب العربي بتركيز وإيجاز.";
    const fullPrompt = `${systemPrompt}\n\nالمستخدم: ${prompt}`;

    const result = await chat.sendMessage(fullPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ text });
    
  } catch (error) {
    console.error("API Error Detail:", error);
    res.status(500).json({ error: "حدث خطأ في الخادم: " + error.message });
  }
}