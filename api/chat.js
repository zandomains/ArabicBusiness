const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { prompt } = req.body;

    if (!process.env.GEMINI_KEY) {
      throw new Error("GEMINI_KEY is not defined in environment variables");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({ text });

  } catch (error) {
    console.error("API ERROR:", error);
    res.status(500).json({ error: "خطأ: " + error.message });
  }
};