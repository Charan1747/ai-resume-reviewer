import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  if (typeof req.body === 'string') {
    return JSON.parse(req.body);
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let payload;

  try {
    payload = await readJsonBody(req);
  } catch {
    return res.status(400).json({ error: 'Invalid JSON payload.' });
  }

  const { resumeText = '', jobText = '' } = payload || {};

  if (!resumeText || !jobText) {
    return res.status(400).json({ error: 'Both resume text and job description are required.' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are an expert hiring manager and resume coach.
      Review this resume against the provided job description.
      Return JSON only with fields:
      {
        "matchScore": number,
        "strengths": [string],
        "gaps": [string],
        "suggestedBullets": [string],
        "interviewQuestions": [string]
      }

      Resume:
      ${resumeText}

      Job Description:
      ${jobText}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleaned = text.replace(/```json|```/g, '').trim();
    const json = JSON.parse(cleaned);

    return res.status(200).json(json);
  } catch (error) {
    console.error('Gemini review error:', error);
    return res.status(500).json({
      matchScore: 0,
      strengths: [],
      gaps: ['Unable to generate review. Check your Gemini API configuration.'],
      suggestedBullets: [],
      interviewQuestions: [],
      error: 'AI review failed',
    });
  }
}
