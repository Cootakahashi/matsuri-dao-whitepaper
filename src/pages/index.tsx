import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

const languages = [
  {code: 'en', label: 'English', flag: '🇬🇧'},
  {code: 'ja', label: '日本語', flag: '🇯🇵'},
  {code: 'zh-Hans', label: '中文', flag: '🇨🇳'},
  {code: 'ko', label: '한국어', flag: '🇰🇷'},
  {code: 'th', label: 'ไทย', flag: '🇹🇭'},
  {code: 'my', label: 'မြန်မာ', flag: '🇲🇲'},
  {code: 'fil', label: 'Filipino', flag: '🇵🇭'},
  {code: 'fr', label: 'Français', flag: '🇫🇷'},
  {code: 'es', label: 'Español', flag: '🇪🇸'},
  {code: 'nb', label: 'Norsk', flag: '🇳🇴'},
  {code: 'ar', label: 'العربية', flag: '🇸🇦'},
  {code: 'hr', label: 'Hrvatski', flag: '🇭🇷'},
  {code: 'da', label: 'Dansk', flag: '🇩🇰'},
];

function LanguageSelector() {
  const {i18n} = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;

  return (
    <div className="language-selector">
      <p className="language-selector__label">Select Language</p>
      <div className="language-selector__grid">
        {languages.map(({code, label, flag}) => {
          const href = code === 'en' ? '/' : `/${code}/`;
          const isActive = currentLocale === code;
          return (
            <a
              key={code}
              href={href}
              className={`language-selector__item ${isActive ? 'language-selector__item--active' : ''}`}
            >
              <span className="language-selector__flag">{flag}</span>
              <span className="language-selector__name">{label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

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
        <LanguageSelector />
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
