import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

console.log("ENV KEY EXISTS:", !!process.env.GEMINI_API_KEY);
console.log(
  "ENV KEY VALUE (first 6 chars):",
  process.env.GEMINI_API_KEY?.slice(0, 6)
);

export async function generateQuestionsServer(
  topic: string,
  skill: string,
  count: number
) {
  const prompt = `
Generate ${count} MCQ questions on "${topic}" (${skill} level).
Each question must have:
- text
- exactly 4 options
- correctAnswerIndex (0–3)

Return ONLY valid JSON in this format:
{
  "questions": [
    {
      "text": "...",
      "options": ["A", "B", "C", "D"],
      "correctAnswerIndex": 0
    }
  ]
}
`;

  const result = await ai.models.generateContent({
    model: "gemini-1.5-pro", // ✅ more stable on Vercel
    contents: prompt,
  });

  const raw = result.text(); // ✅ MUST be a function call

  if (!raw) {
    throw new Error("Empty Gemini response");
  }

  return JSON.parse(raw);
}
