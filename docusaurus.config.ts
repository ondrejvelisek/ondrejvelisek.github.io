import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
  title: "Ondrej Velisek",
  tagline: "Web app developer",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://ondrejvelisek.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "ondrejvelisek", // Usually your GitHub org/user name.
  projectName: "ondrejvelisek.github.io", // Usually your repo name.
  deploymentBranch: "gh-pages",
  trailingSlash: true,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: false && {
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          routeBasePath: "/",
          showReadingTime: true,
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",
        },
        pages: {
          path: "pages",
          exclude: ["**/[A-Z]*.{js,jsx,ts,tsx,md,mdx}"], // Components are with a capital initial letter
        },
        theme: {
          customCss: "./global.css",
        },
        gtag: {
          trackingID: "G-BZWT5GPVTE",
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    async function tailwindPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    // Replace with your project's social card
    //image: 'img/torrta-logo.png',
    navbar: {
      style: "dark",
      logo: {
        alt: "ondrejvelisek Logo",
        src: "img/ondrejvelisek-logo.svg",
      },
      items: [
        /*{
          label: 'Docs',
          position: 'left',
          type: 'docSidebar',
          sidebarId: 'sidebar',
        },
        {
          label: 'Blog',
          position: 'left',
          to: '/blog',
        },
        {
          label: 'GitHub',
          position: 'right',
          href: 'https://github.com/ondrejvelisek',
        },*/
      ],
    },
    footer: {
      style: "dark",
      copyright: `<div class="flex justify-between">
        <div>Copyright © ${new Date().getFullYear()} Ondrej Velisek</div>
        <div>Made with ❤️ in Czech republic.</div>
      </div>`,
    },
    prism: {
      theme: {
        ...prismThemes.vsDark,
        plain: {
          ...prismThemes.vsDark.plain,
          backgroundColor: "#212432",
        },
      },
      magicComments: [
        {
          className: "theme-code-block-highlighted-line",
          line: "highlight-next-line",
          block: { start: "highlight-start", end: "highlight-end" },
        },
        {
          className: "code-block-error-line",
          line: "error-next-line",
          block: { start: "error-start", end: "error-end" },
        },
        {
          className: "code-block-error-msg",
          line: "error-msg-next-line",
          block: { start: "error-msg-start", end: "error-msg-end" },
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
