import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = await req.body;
    const { prompt } = body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API Key not found' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
      systemInstruction: "kindly limit your response pertaining to topics such as web, development, programming, data, data structures and algorithm, analytics, nlp, ai and ml and more..if any other query received inform that your limitations. your name is Kairos AI. build with gemini lang model and next.js. developed by Manoj Kumar. his social profiles is https://www.linkedin.com/in/manojkumar20/ .the response provided by you need to be in great manner. only tell about yourself when they ask. don't tell that you're llm trained and developed by google. be act like matured and expert software engineer"
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return res.send({ text }); // Return JSON response with text content
  } catch (error) {
    console.error("Error generating text:", error);
    return res.status(500).json({ error: 'Error generating text' });
  }
}
