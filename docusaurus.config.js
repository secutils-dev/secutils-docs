// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightTheme = require('prism-react-renderer/themes/vsLight');
const darkTheme = require('prism-react-renderer/themes/vsDark');

const URL = process.env.SECUTILS_URL ?? 'https://secutils.dev';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Secutils.dev Docs',
  tagline: 'Documentation, user guides, and more...',
  favicon: 'img/favicon.ico',
  url: URL,
  baseUrl: '/docs/',
  baseUrlIssueBanner: true,

  organizationName: 'secutils-dev',
  projectName: 'secutils-docs',

  markdown: { mermaid: true },
  themes: ['@docusaurus/theme-mermaid'],
  plugins: ['docusaurus-plugin-sass'],

  scripts: [{ src: '/js/script.js', async: true, defer: true, 'data-domain': 'secutils.dev' }],

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl: 'https://github.com/secutils-dev/secutils-docs/tree/main/',
        },
        blog: {
          blogTitle: 'Secutils.dev Blog',
          blogDescription: 'Secutils.dev Blog',
          postsPerPage: 6,
          feedOptions: {
            type: 'all',
            title: 'Secutils.dev Blog',
            copyright: `Copyright © ${new Date().getFullYear()} Secutils.dev`,
          },
        },
        theme: {
          customCss: require.resolve('./src/scss/index.scss'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: false,
        },
      },
      navbar: {
        logo: {
          alt: 'Navigate to Secutils.dev',
          src: 'img/logo.svg',
          srcDark: 'img/logo_dark.svg',
          target: '_self',
          height: 24,
          width: 147,
          href: URL,
        },
        items: [
          {
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
            to: '/docs',
            className: 'su-navbar-breadcrumb su-navbar-docs'
          },
          {
            sidebarId: 'blogSidebar',
            position: 'left',
            label: 'Blog',
            to: '/blog',
            className: 'su-navbar-breadcrumb su-navbar-blog'
          },
          {
            type: 'html',
            value: `<div class="su-navbar-buttons"><a href="/signin" class="su-navbar-link">Sign in</a><a href="/signup"><button class="su-navbar-button">Start free trial</button></a></div>`,
            position: 'right',
          },
        ],
      },
      footer: {
        links: [
          {
            label: 'About',
            href: `${URL}/about`,
          },
          {
            label: 'Blog',
            href: '/blog',
          },
          {
            label: 'Documentation',
            href: '/docs',
          },
          {
            label: 'Privacy',
            href: `${URL}/privacy`,
          },
          {
            label: 'Terms',
            href: `${URL}/terms`,
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Secutils.dev`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme
      },
      colorMode: {
        disableSwitch: false,
        respectPrefersColorScheme: false,
        defaultMode: 'light',
      },
    })
};

module.exports = config;
