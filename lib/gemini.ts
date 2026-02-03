import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});
console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);
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
  const schema = {
    type: Type.OBJECT,
    properties: {
      questions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            correctAnswerIndex: { type: Type.INTEGER },
          },
          required: ["text", "options", "correctAnswerIndex"],
        },
      },
    },
  };

  const prompt = `
Generate ${count} MCQ questions on "${topic}" (${skill} level).
Each question must have exactly 4 options.
Return ONLY valid JSON.
`;

  const result = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const raw = result.text; // ✅ CORRECT
  if (!raw) throw new Error("Empty Gemini response");

  return JSON.parse(raw);
}
