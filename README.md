# AI Resume Reviewer

A Vercel-ready AI resume matching application for comparing a candidate's resume against a job description and generating actionable feedback.

## Features
- Upload or paste resume text
- Paste a job description
- Generate a match score
- Highlight strengths and skill gaps
- Suggest tailored bullet points
- Generate mock interview questions
- Gemini-powered analysis through a serverless API

## Tech stack
- React + Vite
- Node.js / Vercel Serverless API
- Google Gemini API
- Optional MongoDB persistence for user history

## Local development

1. Install dependencies:
   npm install
2. Copy environment variables:
   cp .env.example .env.local
3. Set your Gemini key in `.env.local`:
   GEMINI_API_KEY=your_key_here
4. Start the app:
   npm run dev

## Production deployment
- Deploy to Vercel
- Add `GEMINI_API_KEY` in Vercel Project Settings > Environment Variables
- Ensure `api/review.js` is included in the deployment

## Notes
This project intentionally follows the lead reference workflow while being adapted for your Project 1 brief.
