import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

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
              items: { type: Type.STRING }
            },
            correctAnswerIndex: { type: Type.INTEGER },
            timeLimit: { type: Type.INTEGER },
            technology: { type: Type.STRING },
            skill: { type: Type.STRING }
          },
          required: ["text", "options", "correctAnswerIndex"]
        }
      }
    }
  };

  const prompt = `
Generate ${count} MCQ questions on "${topic}" (${skill} level).
Each must have 4 options and one correct answer.
`;

  const result = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  });

  return JSON.parse(result.text);
}
