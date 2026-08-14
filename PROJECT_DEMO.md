# AI Resume Reviewer - Project Demo & Documentation

## 📋 Executive Summary

**AI Resume Reviewer** is an intelligent resume analysis tool that compares your resume against job descriptions and provides detailed feedback using Google's Gemini AI. It helps job seekers optimize their resumes by identifying skill gaps, highlighting strengths, and suggesting bullet points for better job matching.

---

## 🎯 Key Features

### 1. **Resume Upload Support**
- Upload resumes in multiple formats: `.txt`, `.pdf`, `.docx`
- Or paste resume text directly
- Automatic text extraction from uploaded files

### 2. **Resume Analysis**
- AI-powered comparison against job descriptions
- Match score calculation (0-100%)
- Identifies matched skills and keywords

### 3. **Detailed Feedback**
- **Strengths**: What matches well with the job
- **Skill Gaps**: Missing requirements and skills
- **Suggested Bullets**: AI-generated resume bullet points tailored to the job
- **Mock Interview Questions**: Practice questions based on job requirements

### 4. **Fallback Local Analysis**
- Works offline with keyword-based matching
- Useful when API is unavailable
- Still provides actionable insights

---

## 🏗️ Architecture

### Frontend
- **Framework**: React 18 with Vite 5.4
- **Language**: JavaScript
- **Styling**: Custom CSS with dark theme

### Backend
- **Platform**: Vercel Serverless Functions (Node.js)
- **API Route**: `/api/review`
- **Processing**: Google Generative AI (Gemini)

### AI Model
- **Provider**: Google Generative AI (Gemini)
- **Model**: `gemini-2.5-flash`
- **Features**: Fast, reliable, cost-effective

### File Processing
- **PDF Support**: `pdfjs-dist`
- **DOCX Support**: `jszip`
- **Text Support**: Native

---

## 📦 Tech Stack

```
Frontend:
├── React 18.3.1
├── Vite 5.4.21
├── pdfjs-dist (PDF parsing)
└── jszip (DOCX parsing)

Backend:
├── Node.js (Vercel Functions)
├── @google/generative-ai 0.24.1
└── URLSearchParams (request parsing)

Testing:
└── Vitest 2.1.9

Deployment:
└── Vercel (Auto-deployment on git push)
```

---

## 🖥️ User Interface

### Main Layout (2-Column Grid)

```
┌─────────────────────────────────────────────────────────┐
│  AI CAREER INTELLIGENCE                                 │
│  Resume Reviewer                    [Review Resume]     │
└─────────────────────────────────────────────────────────┘

┌──────────────────────┐   ┌──────────────────────────────┐
│  1. RESUME           │   │  2. JOB DESCRIPTION          │
│                      │   │                              │
│ [📄 Upload Resume]   │   │  Paste job description       │
│ or paste below       │   │  text here...                │
│                      │   │                              │
│ [Resume textarea]    │   │  [Job textarea]              │
│                      │   │                              │
└──────────────────────┘   └──────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  MATCH SCORE: 86%                                       │
│  [████████████████████░░░░░]                            │
└─────────────────────────────────────────────────────────┘

┌──────────────────────┐   ┌──────────────────────────────┐
│  STRENGTHS           │   │  SKILL GAPS                  │
│  • Strong frontend   │   │  • Missing TypeScript        │
│  • Solid backend     │   │  • No cloud platform exp.    │
└──────────────────────┘   └──────────────────────────────┘

┌──────────────────────┐   ┌──────────────────────────────┐
│  SUGGESTED BULLETS   │   │  MOCK QUESTIONS              │
│  • Built scalable... │   │  • How do you design...      │
└──────────────────────┘   └──────────────────────────────┘
```

---

## 🚀 How It Works

### Step 1: Input Resume
**Option A**: Upload a file
- Click **"📄 Upload Resume"**
- Select `.txt`, `.pdf`, or `.docx`
- Text auto-extracts and populates textarea

**Option B**: Paste directly
- Copy your resume
- Paste into the resume textarea

### Step 2: Input Job Description
- Paste the job posting into the Job Description section
- Include full requirements and preferred skills

### Step 3: Click "Review Resume"
- Frontend sends resume + job description to backend
- Backend calls Gemini AI API
- AI analyzes and returns structured feedback

### Step 4: Review Results
- See match score with visual progress bar
- Review strengths and gaps
- Get suggested resume bullets
- Practice with mock interview questions

---

## 📊 Resume Analysis Logic

### AI Analysis (When API Works)
```
Resume + Job Description
        ↓
    Gemini API
        ↓
Structured JSON Response:
{
  "matchScore": 86,
  "strengths": ["Matched skill: React", ...],
  "gaps": ["Missing: TypeScript", ...],
  "suggestedBullets": ["Built scalable...", ...],
  "interviewQuestions": ["How do you...", ...]
}
```

### Fallback Analysis (When API Unavailable)
```
Resume + Job Description
        ↓
Keyword Extraction (Local)
        ↓
Calculate Match Percentage:
  - Extract keywords from both texts
  - Remove stop words
  - Normalize variations (nodejs→node, etc.)
  - Count matches
  - Score = (matched / total) × 100
```

---

## 🔧 Setup Instructions

### Prerequisites
- Node.js 16+
- npm or yarn
- Vercel account (for deployment)
- Google Generative AI API key

### Local Development

1. **Clone Repository**
```bash
git clone https://github.com/Charan1747/ai-resume-reviewer.git
cd ai-resume-reviewer
```

2. **Install Dependencies**
```bash
npm install
```

3. **Setup Environment Variables**
Create `.env.local`:
```
GEMINI_API_KEY=your_api_key_here
```

4. **Run Development Server**
```bash
npm run dev
```
Open: http://localhost:5173

5. **Build for Production**
```bash
npm run build
```

6. **Run Tests**
```bash
npm test
```

### Vercel Deployment

1. **Push to GitHub**
```bash
git push origin master
```

2. **Connect to Vercel**
- Go to https://vercel.com
- Click "New Project"
- Select GitHub repository
- Import `ai-resume-reviewer`

3. **Add Environment Variable**
- Go to Project Settings → Environment Variables
- Add: `GEMINI_API_KEY` = your API key
- Value type: "Sensitive"

4. **Deploy**
- Click "Deploy"
- Auto-deploys on every git push!

**Live URL**: https://ai-resume-reviewer-[id].vercel.app

---

## 🔑 API Key Setup Guide

### Getting a Google Generative AI Key

1. **Create GCP Project**
   - Go to https://console.cloud.google.com
   - Click "Create Project"
   - Name: `ai-resume-reviewer`

2. **Enable Generative Language API**
   - Search for "Generative Language API"
   - Click "Enable"

3. **Create API Key**
   - Go to APIs & Services → Credentials
   - Click "+ Create Credentials" → API Key
   - Copy the key

4. **Add to Vercel**
   - Project Settings → Environment Variables
   - Name: `GEMINI_API_KEY`
   - Value: Paste your key
   - Environment: Production

5. **Redeploy**
   - Vercel auto-redeploys when you add env vars
   - Or manually trigger deployment

⚠️ **Important**: 
- Each GCP project should have its own API key
- Using same key across multiple projects may trigger billing requirements
- Keep API key secure in Vercel (use "Sensitive" setting)

---

## 📱 API Endpoint

### POST `/api/review`

**Request:**
```
POST /api/review
Content-Type: application/x-www-form-urlencoded

resumeText=Senior+Software+Engineer...&jobText=We+are+seeking...
```

**Response:**
```json
{
  "matchScore": 86,
  "strengths": [
    "Strong frontend engineering experience with React",
    "Solid understanding of APIs and backend architecture",
    "Shows leadership and mentoring experience"
  ],
  "gaps": [
    "Could include more explicit experience with TypeScript",
    "Add concrete examples of CI/CD and deployment workflows"
  ],
  "suggestedBullets": [
    "Built and maintained scalable React applications serving 100K+ users",
    "Designed and implemented RESTful APIs in Node.js"
  ],
  "interviewQuestions": [
    "How do you design a scalable frontend architecture?",
    "Describe a time you optimized an API for performance"
  ]
}
```

**Error Response:**
```json
{
  "error": "AI review failed",
  "details": "API rate limit exceeded",
  "matchScore": 0,
  "strengths": [],
  "gaps": [],
  "suggestedBullets": [],
  "interviewQuestions": []
}
```

---

## 🧪 Testing

### Unit Tests
```bash
npm test
```

**Current Tests** (2/2 passing):
- ✅ Extract meaningful keywords from text
- ✅ Return realistic match score with overlap

### Manual Testing
1. **Test Resume Upload**
   - Upload `.txt`, `.pdf`, `.docx` files
   - Verify text extraction works

2. **Test Match Scoring**
   - Use sample resume + job description
   - Verify score is between 45-96%
   - Check keyword matching

3. **Test API Integration**
   - Add valid API key to Vercel
   - Click "Review Resume"
   - Verify AI-generated results

4. **Test Fallback**
   - Remove/invalid API key
   - Click "Review Resume"
   - Verify local keyword matching works

---

## 🚀 Deployment Workflow

```
Local Changes
    ↓
git push to GitHub
    ↓
Vercel Webhook Triggered
    ↓
Vercel Rebuilds & Tests
    ↓
Auto-Deploy to Production
    ↓
Live Update (30-60 seconds)
```

**No manual deployment needed!** Just push to GitHub and it's live.

---

## 📈 Performance Metrics

| Metric | Value |
|--------|-------|
| Frontend Build Size | ~152 KB (gzipped: ~50 KB) |
| PDF Library Size | ~365 KB (gzipped: ~107 KB) |
| Avg Response Time | 2-5 seconds (with API) |
| Fallback Response Time | <100ms (local) |
| Uptime | 99.9% (Vercel SLA) |

---

## 🔒 Security

- ✅ API keys stored in Vercel "Sensitive" environment variables
- ✅ No credentials in GitHub repo
- ✅ `.env.local` in `.gitignore`
- ✅ CORS not needed (Vercel backend handles API calls)
- ✅ Input validation for file uploads
- ✅ Error messages don't leak sensitive info

---

## 🎯 Use Cases

1. **Job Seekers**: Tailor resumes to specific job postings
2. **Career Coaches**: Help clients improve resume match
3. **Recruiters**: Quickly assess resume fit
4. **Students**: Learn what job descriptions require
5. **Career Changers**: Identify skill gaps for new roles

---

## 🚧 Future Enhancements

### Phase 2
- [ ] Support multiple resume formats (.html, .odt)
- [ ] Batch upload (analyze multiple resumes)
- [ ] Save analysis history
- [ ] Resume templates and examples
- [ ] Export analysis as PDF

### Phase 3
- [ ] Paid tier with premium AI models
- [ ] Cover letter generator
- [ ] Interview preparation module
- [ ] LinkedIn profile analyzer
- [ ] Job recommendation engine

### Phase 4
- [ ] Mobile app (React Native)
- [ ] Browser extension for job postings
- [ ] AI email assistant for applications
- [ ] Team collaboration features
- [ ] Analytics dashboard

---

## 📞 Support & Troubleshooting

### Issue: "AI review failed" / API unavailable
**Solution**:
- Check API key is valid in Vercel settings
- Verify Generative Language API is enabled in GCP
- Ensure billing account is linked (for new projects)
- Try again in 30 seconds

### Issue: PDF upload not working
**Solution**:
- Ensure PDF is valid and not corrupted
- Try converting to `.txt` or `.docx`
- Check browser console for errors

### Issue: Low match score
**Solution**:
- Ensure resume includes keywords from job description
- Add more specific technical skills
- Use exact terminology from job posting

### Issue: No automatic deployment
**Solution**:
- Verify Vercel GitHub integration is connected
- Check git push was successful
- Manually trigger deployment in Vercel dashboard

---

## 📚 Documentation Files

- `README.md` - Quick start guide
- `package.json` - Dependencies and scripts
- `src/App.jsx` - Main React component
- `api/review.js` - Backend API handler
- `src/styles.css` - UI styling

---

## 👥 Team & Roles

- **Developer**: Charan (You)
- **Repository**: https://github.com/Charan1747/ai-resume-reviewer
- **Deployment**: Vercel (charan-26ae)
- **AI Provider**: Google (Gemini API)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Vercel Docs](https://vercel.com/docs)
- [Google AI Documentation](https://ai.google.dev)
- [Gemini API Guide](https://ai.google.dev/docs)

---

**Version**: 1.0.0  
**Last Updated**: August 14, 2026  
**Status**: Production Ready ✅

