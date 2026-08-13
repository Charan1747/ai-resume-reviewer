import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const MODEL_NAME = 'gemini-2.5-flash'; // Same model as original working project

async function readFormBody(req) {
  if (req.body && typeof req.body === 'string') {
    return new URLSearchParams(req.body);
  }

  if (req.body && typeof req.body === 'object') {
    return new URLSearchParams(Object.entries(req.body).map(([key, value]) => [key, String(value)]));
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  return new URLSearchParams(raw || '');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body;
  try {
    body = await readFormBody(req);
  } catch {
    return res.status(400).json({ error: 'Invalid form payload.' });
  }

  const resumeText = body.get('resumeText') || '';
  const jobText = body.get('jobText') || '';

  if (!resumeText || !jobText) {
    return res.status(400).json({ error: 'Both resume text and job description are required.' });
  }

  if (!resumeText || !jobText) {
    return res.status(400).json({ error: 'Both resume text and job description are required.' });
  }

  try {
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

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleaned = text.replace(/```json|```/g, '').trim();
    const json = JSON.parse(cleaned);
    return res.status(200).json(json);
  } catch (error) {
    console.error('Gemini review error:', error);
    const errorMsg = error?.message || String(error);
    return res.status(500).json({
      matchScore: 0,
      strengths: [],
      gaps: [`Unable to generate review: ${errorMsg}`],
      suggestedBullets: [],
      interviewQuestions: [],
      error: 'AI review failed',
      details: errorMsg,
    });
  }
}
