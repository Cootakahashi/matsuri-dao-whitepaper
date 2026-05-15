import React from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

type DocLink = {
  title: string;
  permalink: string;
};

function PaginatorCard({
  to,
  direction,
  label,
}: {
  to: DocLink;
  direction: 'prev' | 'next';
  label: string;
}): React.ReactElement {
  const isNext = direction === 'next';
  return (
    <Link
      to={to.permalink}
      className={`${styles.card} ${isNext ? styles.cardNext : styles.cardPrev}`}
      aria-label={`${label}: ${to.title}`}>
      <span className={styles.cardLabel}>
        {!isNext && <span className={styles.cardArrow} aria-hidden="true">←</span>}
        {label}
        {isNext && <span className={styles.cardArrow} aria-hidden="true">→</span>}
      </span>
      <span className={styles.cardTitle}>{to.title}</span>
    </Link>
  );
}

export default function DocPaginator(): React.ReactElement | null {
  const {metadata} = useDoc();
  const {previous, next} = metadata;

  if (!previous && !next) {
    return null;
  }

  const prevLabel = translate({
    id: 'theme.docs.paginator.previous',
    message: 'Previous',
    description: 'Label for the Previous link in the doc paginator',
  });
  const nextLabel = translate({
    id: 'theme.docs.paginator.next',
    message: 'Next',
    description: 'Label for the Next link in the doc paginator',
  });

  return (
    <nav className={styles.paginator} aria-label={translate({
      id: 'theme.docs.paginator.navAriaLabel',
      message: 'Docs pages',
      description: 'The ARIA label for the docs pagination',
    })}>
      {previous ? (
        <PaginatorCard to={previous} direction="prev" label={prevLabel} />
      ) : (
        <span className={styles.placeholder} aria-hidden="true" />
      )}
      {next ? (
        <PaginatorCard to={next} direction="next" label={nextLabel} />
      ) : (
        <span className={styles.placeholder} aria-hidden="true" />
      )}
    </nav>
  );
}
