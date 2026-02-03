
export const config = {
  runtime: "nodejs",
};
import { generateQuestionsServer } from "../lib/gemini";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { topic, skill, count } = req.body || {};

    if (!topic || !skill || !count) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const data = await generateQuestionsServer(topic, skill, count);
    return res.status(200).json(data);

  } catch (err: any) {
    console.error("🔥 API ERROR:", err);
    return res.status(500).json({
      error: "Generate failed",
      details: err?.message || "Unknown error",
    });
  }
}
