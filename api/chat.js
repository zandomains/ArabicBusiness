import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { prompt, history } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

    // الحل الجذري: استخدام المعاملات لتجاوز v1beta
    const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash"
    }, { apiVersion: 'v1' });
      apiVersion: 'v1' // إجبار المتصفح/السيرفر على استخدام المسار المستقر
    });

    // استخدام GenerateContent مباشرة بدلاً من StartChat مؤقتاً للتأكد من الاتصال
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ text });
    
  } catch (error) {
    console.error("API ERROR:", error);
    res.status(500).json({ error: "خطأ: " + error.message });
  }
}