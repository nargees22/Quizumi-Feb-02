export const config = {
  runtime: "nodejs",
};

import { generateQuestionsServer } from "../lib/gemini";

export default async function handler(req: any, res: any) {
  try {
    const data = await generateQuestionsServer("test", "basic", 1);
    return res.status(200).json(data);
  } catch (err: any) {
    console.error("🔥 API ERROR:", err);
    return res.status(500).json({
      error: "Generate failed",
      details: err?.message || "Unknown error",
    });
  }
}
