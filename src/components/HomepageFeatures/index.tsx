import type {ReactNode} from 'react';
import Heading from '@theme/Heading';

type FeatureItem = {
  icon: string;
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    icon: '⛩️',
    title: 'Culture as Currency',
    description: (
      <>
        MTC transforms intangible cultural experiences — festivals, pilgrimages,
        and artisan traditions — into on-chain digital assets with real economic
        value.
      </>
    ),
  },
  {
    icon: '⚡',
    title: 'Built on Solana',
    description: (
      <>
        Sub-second finality and near-zero fees enable micro-transactions at
        scale — from digital "Saisen" (offerings) to instant booking payments
        across Japan.
      </>
    ),
  },
  {
    icon: '🔥',
    title: 'Deflationary by Design',
    description: (
      <>
        Every transaction fuels the Buyback & Burn loop. More tourism, more
        revenue, more burns — creating natural scarcity as the ecosystem grows.
      </>
    ),
  },
];

function Feature({icon, title, description}: FeatureItem) {
  return (
    <div className="col col--4">
      <div className="feature__card">
        <span className="feature__icon">{icon}</span>
        <Heading as="h3" className="feature__title">
          {title}
        </Heading>
        <p className="feature__desc">{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className="features--matsuri">
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
