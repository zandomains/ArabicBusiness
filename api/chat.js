import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, history } = req.body;

    // إجبار المكتبة على استخدام الإصدار المستقر v1 لتجنب خطأ 404
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash"
    }, { apiVersion: 'v1' }); // هذه الإضافة هي المفتاح الحل

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

    res.status(200).json({ text });
    
  } catch (error) {
    console.error("Detailed Error:", error);
    res.status(500).json({ error: "حدث خطأ في الخادم: " + error.message });
  }
}