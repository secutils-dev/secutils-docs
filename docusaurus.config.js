// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightTheme = require('prism-react-renderer/themes/vsLight');
const darkTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Secutils.dev Docs',
  tagline: 'Documentation, user guides, and more...',
  favicon: 'img/favicon.ico',
  url: 'https://secutils.dev',
  baseUrl: '/docs/',
  baseUrlIssueBanner: true,

  organizationName: 'secutils-dev',
  projectName: 'secutils-docs',

  markdown: { mermaid: true },
  themes: ['@docusaurus/theme-mermaid'],

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
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl: 'https://github.com/secutils-dev/secutils-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
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
          alt: 'Secutils.dev',
          src: 'img/logo.svg',
          srcDark: 'img/logo_dark.svg',
          height: 24,
          width: 147,
          href: '/docs',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
            className: 'su-navbar-breadcrumb'
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
            href: 'https://secutils.dev/about',
          },
          {
            label: 'Roadmap',
            href: 'https://github.com/orgs/secutils-dev/projects/1',
          },
          {
            label: 'Privacy',
            href: 'https://secutils.dev/privacy',
          },
          {
            label: 'Terms',
            href: 'https://secutils.dev/terms',
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
        // respectPrefersColorScheme: true,
        defaultMode: 'dark',
      },
    })
};

module.exports = config;
