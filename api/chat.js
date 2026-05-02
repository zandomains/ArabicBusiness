import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { prompt, history } = req.body;
    
    // التأكد من وجود المفتاح
    if (!process.env.GEMINI_KEY) {
        throw new Error("GEMINI_KEY is not defined in environment variables");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

    // تصحيح الأقواس هنا (قوس واحد للإغلاق وقوس واحد للمجال)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash"
    }, { apiVersion: 'v1' });

    // استخدام GenerateContent للتأكد من الاتصال بنجاح
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ text });
    
  } catch (error) {
    console.error("API ERROR:", error);
    res.status(500).json({ error: "خطأ: " + error.message });
  }
}