import React, {useEffect, useState} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

const CHAPTER_ORDER = [
  'intro',
  'vision',
  'challenges',
  'future',
  'ecosystem',
  'mining',
  'gcf',
  'flywheel',
  'tokenomics',
  'why-solana',
  'product-tech',
  'roadmap',
  'disclaimer',
];

export default function DocProgressBar(): React.ReactElement | null {
  const {metadata} = useDoc();
  const [progress, setProgress] = useState(0);

  const chapterIndex = CHAPTER_ORDER.indexOf(metadata.id);
  const chapterNumber = chapterIndex + 1;
  const totalChapters = CHAPTER_ORDER.length;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent =
        docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      setProgress(percent);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (chapterIndex === -1) {
    return null;
  }

  return (
    <div className={styles.docProgress} role="region" aria-label="Reading progress">
      <div className={styles.docProgress__bar}>
        <div
          className={styles.docProgress__fill}
          style={{width: `${progress}%`}}
        />
      </div>
      <div className={styles.docProgress__meta}>
        <span className={styles.docProgress__chapter}>
          <span className={styles.docProgress__chapterNum}>{chapterNumber}</span>
          <span className={styles.docProgress__chapterSep}>/</span>
          <span className={styles.docProgress__chapterTotal}>{totalChapters}</span>
        </span>
        <span className={styles.docProgress__chapterLabel}>Chapter</span>
      </div>
    </div>
  );
}
