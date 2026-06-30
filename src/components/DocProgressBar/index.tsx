import React from 'react';
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

  const chapterIndex = CHAPTER_ORDER.indexOf(metadata.id);
  const chapterNumber = chapterIndex + 1;
  const totalChapters = CHAPTER_ORDER.length;

  if (chapterIndex === -1) {
    return null;
  }

  // Reading-progress through the whole whitepaper, by chapter position.
  // (A scroll-based sticky bar can't work in this Docusaurus layout: an
  // ancestor with `overflow: auto` that never actually scrolls breaks
  // `position: sticky`, so the bar could never pin. Chapter-based progress
  // is always correct and needs no scroll listener.)
  const progress = (chapterNumber / totalChapters) * 100;

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
