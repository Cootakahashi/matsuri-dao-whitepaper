import React, {useEffect, useState} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

const CHAPTER_LABELS: Record<string, string> = {
  intro: 'Overview',
  vision: 'Story',
  challenges: 'Story',
  future: 'Story',
  ecosystem: 'Practice',
  mining: 'Practice',
  gcf: 'Practice',
  flywheel: 'Tech & Economy',
  tokenomics: 'Tech & Economy',
  'why-solana': 'Tech & Economy',
  'product-tech': 'Tech & Economy',
  roadmap: 'Tech & Economy',
  disclaimer: 'Reference',
};

const WORDS_PER_MIN_LATIN = 220;
const CHARS_PER_MIN_CJK = 450;

function computeReadingTime(text: string): number {
  if (!text) return 1;
  const cjkChars = (text.match(/[぀-ヿ㐀-䶿一-鿿가-힯]/g) || []).length;
  const latinText = text.replace(/[぀-ヿ㐀-䶿一-鿿가-힯]/g, ' ');
  const latinWords = latinText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = cjkChars / CHARS_PER_MIN_CJK + latinWords / WORDS_PER_MIN_LATIN;
  return Math.max(1, Math.ceil(minutes));
}

export default function DocReadingHero(): React.ReactElement | null {
  const {metadata} = useDoc();
  const [readTime, setReadTime] = useState<number | null>(null);

  useEffect(() => {
    const container = document.querySelector<HTMLElement>('.theme-doc-markdown');
    if (!container) return;
    const text = container.textContent ?? '';
    setReadTime(computeReadingTime(text));
  }, [metadata.id]);

  if (!metadata) return null;

  const chapterLabel = CHAPTER_LABELS[metadata.id] ?? null;

  return (
    <div className={styles.hero} aria-label="Reading metadata">
      {chapterLabel && (
        <span className={styles.hero__pill}>
          <span className={styles.hero__pillDot} aria-hidden="true" />
          {chapterLabel}
        </span>
      )}
      <span className={styles.hero__pill}>
        <svg
          className={styles.hero__pillIcon}
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        {readTime ? `${readTime} min read` : '— min read'}
      </span>
    </div>
  );
}
