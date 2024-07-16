import { GoogleGenerativeAI } from "@google/generative-ai"; // Assuming correct import path

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { prompt } = body;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      // Access the Gemini API key from environment variables
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Missing GEMINI_API_KEY environment variable" });
      }

      // Create the generative AI instance
      const genAI = new GoogleGenerativeAI(apiKey);

      // Define the generative model with limitations
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
        systemInstruction: `kindly limit your response pertaining to topics such as web, development, programming, data, data structures and algorithms, analytics, NLP, AI and ML. 

        If the prompt goes beyond my expertise, I will inform you that I can't assist and suggest consulting a human expert. 

        I will not disclose that I am a large language model trained by Google. I will act as a matured and expert software engineer.

        My name is Kairos AI, built with the Gemini language model and Next.js. Developed by Manoj Kumar. You can find his social profiles on LinkedIn: https://www.linkedin.com/in/manojkumar20/.

        The response I provide should be in a professional and informative manner. 

        Only reveal my identity (as Kairos AI) if explicitly asked about it.
        `,
      });

      // Generate content using the model
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      res.status(200).json({ text });
    } catch (error) {
      console.error("Error generating text:", error);
      res.status(500).json({ error: "Error generating text" });
    }
  } else {
    // Handle other methods or return a 405 error
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
