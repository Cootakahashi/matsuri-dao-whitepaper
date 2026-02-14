import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

function HomepageHero() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="hero--matsuri">
      <div className="container" style={{textAlign: 'center', position: 'relative', zIndex: 1}}>
        <img
          src="/img/logo-mtc.jpg"
          alt="Matsuri Coin"
          className="hero__logo"
        />
        <Heading as="h1" className="hero__title--matsuri">
          {siteConfig.title}
        </Heading>
        <p className="hero__tagline">{siteConfig.tagline}</p>
        <div className="hero__actions">
          <Link className="button button--primary button--lg" to="/docs/intro">
            Read the Whitepaper
          </Link>
          <Link
            className="button button--outline button--lg"
            href="https://matsuri.group/en"
          >
            Matsuri Web App
          </Link>
        </div>
      </div>
    </header>
  );
}

function PoweredBy() {
  return (
    <section className="powered-by">
      <div className="container">
        <img
          src="/img/logo-matsuri.jpg"
          alt="Matsuri App"
          className="powered-by__logo"
        />
        <p className="powered-by__text">Powered by Matsuri — The Culture OS</p>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Whitepaper"
      description="Matsuri Coin (MTC) — The Currency of Culture. A decentralized utility token built on Solana, designed to preserve Japanese culture through the global Web3 economy."
    >
      <HomepageHero />
      <main>
        <HomepageFeatures />
      </main>
      <PoweredBy />
    </Layout>
  );
}
