import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
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
  {code: 'it', label: 'Italiano', flag: '🇮🇹'},
  {code: 'nb', label: 'Norsk', flag: '🇳🇴'},
  {code: 'ar', label: 'العربية', flag: '🇸🇦'},
  {code: 'hr', label: 'Hrvatski', flag: '🇭🇷'},
  {code: 'da', label: 'Dansk', flag: '🇩🇰'},
  {code: 'hi', label: 'हिन्दी', flag: '🇮🇳'},
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
        <p className="hero__tagline">
          <Translate
            id="homepage.hero.tagline"
            description="The tagline shown in the homepage hero — about protecting culture as we move from competitive Web2 to collaborative Web3.">
            {'Protect Culture. From competitive Web2 to collaborative Web3.'}
          </Translate>
        </p>
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
        <div className="hero__apps">
          <p className="hero__apps-label">Get the apps on iPhone</p>
          <div className="hero__apps-grid">
            <a
              className="hero__app"
              href="https://apps.apple.com/app/matsuri-%E7%A5%AD/id6761138366"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Matsuri on the App Store"
            >
              <span className="hero__app-icon">⛩️</span>
              <span className="hero__app-text">
                <span className="hero__app-name">Matsuri</span>
                <span className="hero__app-sub">Download on the App Store</span>
              </span>
            </a>
            <a
              className="hero__app"
              href="https://apps.apple.com/jp/app/gcf/id6761515025"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download GCF on the App Store"
            >
              <span className="hero__app-icon">🛡️</span>
              <span className="hero__app-text">
                <span className="hero__app-name">GCF</span>
                <span className="hero__app-sub">Download on the App Store</span>
              </span>
            </a>
            <a
              className="hero__app"
              href="https://apps.apple.com/jp/app/j-times/id6761513732"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download J-Times on the App Store"
            >
              <span className="hero__app-icon">📰</span>
              <span className="hero__app-text">
                <span className="hero__app-name">J-Times</span>
                <span className="hero__app-sub">Download on the App Store</span>
              </span>
            </a>
          </div>
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
      description="Matsuri Coin (MTC) — Protect Culture. From competitive Web2 to collaborative Web3. A decentralized utility token built on Solana, designed to preserve Japanese culture through the global Web3 economy."
    >
      <HomepageHero />
      <main>
        <HomepageFeatures />
      </main>
      <PoweredBy />
    </Layout>
  );
}
