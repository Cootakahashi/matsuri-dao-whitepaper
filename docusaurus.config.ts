import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Matsuri Coin',
  tagline: 'The Currency of Culture',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://whitepaper.matsuri.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'matsuricoin',
  projectName: 'whitepaper',

  onBrokenLinks: 'throw',

  // Internationalization: 9 languages
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja', 'zh-Hans', 'fr', 'nb', 'ar', 'es', 'th', 'ko'],
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
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
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
          title: 'Docs',
          items: [
            {
              label: 'Whitepaper',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'X (Twitter)',
              href: 'https://x.com/matsuri_dao_jp',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Matsuri Web App',
              href: 'https://matsuri.group/en',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Matsuri Coin Project. Built with Culture OS.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
