import { useMemo, useState } from 'react';

const sampleResume = `
Senior Software Engineer with 6+ years of experience building scalable web applications and APIs.
Strong expertise in React, JavaScript, TypeScript, Node.js, and REST architecture.
Led migration of legacy systems to modern cloud-based services and improved deployment speed by 35%.
Experienced in SQL and PostgreSQL, cross-functional collaboration, and mentoring junior engineers.
`;

const sampleJob = `
We are seeking a Full Stack Engineer with 5+ years of experience in React, Node.js, and cloud deployment.
The ideal candidate should have strong JavaScript/TypeScript skills, REST APIs, database design, system architecture, and communication skills.
Experience with Kubernetes, AWS, and CI/CD is a plus.
`;

const defaultAnalysis = {
  matchScore: 86,
  strengths: [
    'Strong frontend engineering experience with React and JavaScript.',
    'Solid understanding of APIs and backend architecture.',
    'Shows leadership and mentoring experience in the resume.',
  ],
  gaps: [
    'Could include more explicit experience with TypeScript and cloud platforms.',
    'Add concrete examples of CI/CD and deployment workflows.',
    'Resume can better highlight database design and Kubernetes usage.',
  ],
  suggestedBullets: [
    'Built and maintained scalable React applications serving 100K+ monthly users with reusable components and performance optimization.',
    'Designed and implemented RESTful APIs in Node.js, improving product reliability and reducing response times by 28%.',
    'Collaborated with cross-functional teams to ship features using CI/CD pipelines and cloud-based deployment workflows.',
  ],
  interviewQuestions: [
    'How do you design a scalable frontend architecture for a growing product?',
    'Describe a time you optimized an API or database to improve application performance.',
    'How do you handle trade-offs between speed, maintainability, and cost in cloud deployments?',
  ],
};

const stopWords = new Set([
  'the', 'with', 'and', 'for', 'this', 'that', 'from', 'have', 'into', 'your', 'their', 'they', 'them', 'were', 'will', 'good', 'more', 'than', 'been', 'over', 'what', 'when', 'where', 'which', 'must', 'also', 'like', 'does', 'using', 'role', 'ideal', 'candidate', 'experience', 'strong', 'skills', 'resume', 'job', 'description', 'across', 'about', 'after', 'before', 'while', 'within', 'through', 'could', 'should', 'would', 'build', 'built', 'need', 'needs', 'seeking', 'ideal', 'strong', 'plus'
]);

const aliasMap = {
  nodejs: 'node',
  node: 'node',
  nodes: 'node',
  apis: 'api',
  api: 'api',
  javascript: 'javascript',
  js: 'javascript',
  reactjs: 'react',
  react: 'react',
  typescript: 'typescript',
  mongo: 'mongodb',
  mongodb: 'mongodb',
  cloud: 'cloud',
  deployment: 'deployment',
  deployments: 'deployment',
  engineer: 'engineer',
  engineers: 'engineer',
  engineering: 'engineering',
  developer: 'developer',
  developers: 'developer',
  leadership: 'leadership',
  architecture: 'architecture',
  restful: 'rest',
  rest: 'rest',
};

export function extractKeywords(text) {
  const rawWords = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .map((word) => {
      const trimmed = word.trim();
      if (!trimmed || trimmed.length < 2) return '';
      const normalized = trimmed.replace(/[^a-z0-9]/g, '');
      if (!normalized) return '';
      if (normalized.endsWith('ies') && normalized.length > 4) return normalized.slice(0, -3) + 'y';
      if (normalized.endsWith('sses') && normalized.length > 5) return normalized.slice(0, -2);
      if (normalized.endsWith('ing') && normalized.length > 5) return normalized.slice(0, -3);
      if (normalized.endsWith('ed') && normalized.length > 4) return normalized.slice(0, -2);
      if (normalized.endsWith('s') && !['ss', 'us', 'is'].includes(normalized.slice(-2)) && normalized.length > 3) {
        return normalized.slice(0, -1);
      }
      return normalized;
    })
    .filter(Boolean)
    .filter((word) => !stopWords.has(word));

  return Array.from(
    new Set(
      rawWords.map((word) => aliasMap[word] || word).filter(Boolean)
    ),
  );
}

export function scoreMatch(resumeText, jobText) {
  const resumeKeywords = new Set(extractKeywords(resumeText));
  const jobKeywords = extractKeywords(jobText);
  const matched = jobKeywords.filter((keyword) => resumeKeywords.has(keyword));
  const totalRelevant = Math.max(jobKeywords.length, 1);
  const rawScore = (matched.length / totalRelevant) * 100;
  const score = Math.min(96, Math.max(45, Math.round(rawScore)));

  return { score, matchedKeywords: matched.slice(0, 8) };
}

export default function App() {
  const [resumeText, setResumeText] = useState(sampleResume);
  const [jobText, setJobText] = useState(sampleJob);

  const analysis = useMemo(() => {
    const result = scoreMatch(resumeText, jobText);

    return {
      matchScore: result.score,
      strengths: result.matchedKeywords.length
        ? [`Matched key skills: ${result.matchedKeywords.join(', ')}`]
        : ['Add more job-relevant keywords to strengthen keyword overlap.'],
      gaps: [
        'Add specific evidence for cloud, CI/CD, TypeScript, and architecture leadership.',
        'Include measurable impact metrics for deployment and performance improvements.',
      ],
      suggestedBullets: [
        'Built high-impact web applications with React and Node.js, delivering responsive, scalable user experiences across business-critical product features.',
        'Collaborated with engineering teams to design and ship REST APIs and deployment workflows, improving reliability, maintainability, and release velocity.',
      ],
      interviewQuestions: [
        'How have you used React and Node.js to build and scale real-world product features?',
        'Can you describe a project where you improved system performance or delivery pipeline quality?',
      ],
    };
  }, [resumeText, jobText]);

  return (
    <div className="page-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">AI career intelligence</p>
          <h1>Resume Reviewer</h1>
        </div>
        <span className="pill">Gemini + RAG Ready</span>
      </header>

      <main className="grid">
        <section className="panel">
          <h2>1. Resume</h2>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={14}
            placeholder="Paste your resume here"
          />
        </section>

        <section className="panel">
          <h2>2. Job Description</h2>
          <textarea
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            rows={14}
            placeholder="Paste the job description here"
          />
        </section>
      </main>

      <section className="results panel">
        <div className="score-row">
          <div>
            <p className="eyebrow">Match score</p>
            <h2>{analysis.matchScore}%</h2>
          </div>
          <div className="score-bar">
            <span style={{ width: `${analysis.matchScore}%` }} />
          </div>
        </div>

        <div className="card-grid">
          <div className="info-card">
            <h3>Strengths</h3>
            <ul>
              {analysis.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="info-card">
            <h3>Skill gaps</h3>
            <ul>
              {analysis.gaps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="info-card">
            <h3>Suggested bullets</h3>
            <ul>
              {analysis.suggestedBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="info-card">
            <h3>Mock interview questions</h3>
            <ul>
              {analysis.interviewQuestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
