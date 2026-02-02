import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateQuestionsServer } from './gemini';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { topic, skill, count } = req.body;

  try {
    const data = await generateQuestionsServer(topic, skill, count);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Gemini failed' });
  }
}
