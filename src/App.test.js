import { describe, expect, it } from 'vitest';
import { extractKeywords, scoreMatch } from './App';

describe('resume review logic', () => {
  it('extracts meaningful keywords from text', () => {
    const keywords = extractKeywords('React, Node.js, JavaScript, API, cloud deployment.');

    expect(keywords).toContain('react');
    expect(keywords).toContain('node');
    expect(keywords).toContain('javascript');
    expect(keywords).toContain('api');
  });

  it('returns a realistic match score with overlap', () => {
    const resume = 'React developer with JavaScript and Node.js experience building REST APIs.';
    const job = 'We need a React engineer with JavaScript, API, and Node.js knowledge.';

    const result = scoreMatch(resume, job);

    expect(result.score).toBeGreaterThan(50);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.matchedKeywords.length).toBeGreaterThan(0);
  });
});
