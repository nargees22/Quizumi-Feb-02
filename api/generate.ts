import { generateQuestionsServer } from './gemini';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { topic, skill, count } = req.body;

  try {
    const data = await generateQuestionsServer(topic, skill, count);
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Gemini failed' });
  }
}
