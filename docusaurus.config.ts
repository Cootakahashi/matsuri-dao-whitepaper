import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Matsuri Coin',
  tagline: 'Protect Culture. From competitive Web2 to collaborative Web3.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Mermaid diagram rendering
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  // Set the production url of your site here
  url: 'https://whitepaper.matsuri.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'matsuricoin',
  projectName: 'whitepaper',

  onBrokenLinks: 'throw',

  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    },
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    },
    {
      tagName: 'meta',
      attributes: { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' },
    },
  ],

  // Internationalization: 10 languages
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja', 'zh-Hans', 'fr', 'nb', 'ar', 'es', 'th', 'ko', 'my', 'fil', 'hr', 'da', 'hi', 'it', 'de', 'vi', 'ne', 'id', 'ms'],
    localeConfigs: {
      en: { label: 'English', direction: 'ltr' },
      ja: { label: '日本語', direction: 'ltr' },
      'zh-Hans': { label: '中文', direction: 'ltr' },
      fr: { label: 'Français', direction: 'ltr' },
      nb: { label: 'Norsk', direction: 'ltr' },
      ar: { label: 'العربية', direction: 'rtl' },
      es: { label: 'Español', direction: 'ltr' },
      th: { label: 'ไทย', direction: 'ltr' },
      ko: { label: '한국어', direction: 'ltr' },
      my: { label: 'မြန်မာ', direction: 'ltr' },
      fil: { label: 'Filipino', direction: 'ltr' },
      hr: { label: 'Hrvatski', direction: 'ltr' },
      da: { label: 'Dansk', direction: 'ltr' },
      hi: { label: 'हिन्दी', direction: 'ltr' },
      it: { label: 'Italiano', direction: 'ltr' },
      de: { label: 'Deutsch', direction: 'ltr' },
      vi: { label: 'Tiếng Việt', direction: 'ltr' },
      ne: { label: 'नेपाली', direction: 'ltr' },
      id: { label: 'Bahasa Indonesia', direction: 'ltr' },
      ms: { label: 'Bahasa Melayu', direction: 'ltr' },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false, // Blog disabled for now
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/brand/matsuri-coin.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Matsuri Coin',
      logo: {
        alt: 'MTC Logo',
        src: 'img/logo-mtc.jpg',
        srcDark: 'img/logo-mtc.jpg',
        style: {borderRadius: '50%', height: '32px'},
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Whitepaper',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Whitepaper',
          items: [
            {label: 'Introduction', to: '/docs/intro'},
            {label: 'Tokenomics', to: '/docs/tokenomics'},
            {label: 'Products & Tech', to: '/docs/product-tech'},
            {label: 'Roadmap', to: '/docs/roadmap'},
          ],
        },
        {
          title: 'Products',
          items: [
            {label: 'Matsuri Web App', href: 'https://matsuri.group/en'},
            {label: 'J-Times Media', href: 'https://j-times.org'},
            {label: 'GCF Portal', href: 'https://gcf.works'},
          ],
        },
        {
          title: 'Developers',
          items: [
            {label: 'Smart Contracts (GitHub)', href: 'https://github.com/Cootakahashi/matsuri-contracts'},
            {label: 'Solana Explorer', href: 'https://solscan.io'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'X (Twitter)', href: 'https://x.com/matsuri_dao_jp'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Jon & Coo Inc. — Matsuri Coin Project. Built with Culture OS.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
