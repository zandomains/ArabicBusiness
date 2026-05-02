import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // التأكد من أن الطلب من نوع POST فقط
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, history } = req.body;

    // قراءة المفتاح من إعدادات Vercel (Environment Variables)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "أنت مساعد ذكي متخصص لمنصة ArabicBusiness — منصة متخصصة في ريادة الأعمال للناطقين بالعربية في منطقة MENA والمغرب العربي. تقدم نصائح واضحة ودقيقة وقابلة للتطبيق حول استراتيجيات الأعمال، التجارة الإلكترونية، الاستثمار، التداول، التسويق الرقمي، التمويل الإسلامي، الأسواق المالية، وريادة الأعمال. كن موجزاً لكن شاملاً. رد بنفس لغة المستخدم."
    });

    const chat = model.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    // إرجاع الإجابة للواجهة الأمامية
    res.status(200).json({ text });
    
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "حدث خطأ في الخادم: " + error.message });
  }
}