const { description } = require("../../package");

import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { viteBundler } from '@vuepress/bundler-vite'
import { sitemapPlugin } from "vuepress-plugin-sitemap2";
import { seoPlugin } from "vuepress-plugin-seo2";
import tailwindcss from 'tailwindcss'

export default {
  title: "Counter API",
  description: description,
  head: [
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicons/apple-icon-180x180.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicons/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicons/favicon-16x16.png",
      },
    ],
    ["link", { rel: "shortcut icon", href: "/favicons/favicon.ico" }],
    ["meta", { name: "theme-color", content: "#0842ba" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],
  dest: "dist",
  theme: defaultTheme({
    repo: "https://github.com/counterapi",
    editLinks: false,
    docsDir: "",
    lastUpdated: false,
    logo: "/img/counterapi-logo.svg",
    navbar: [
      {
        text: "Guide",
        link: "/guide/",
      },
      {
        text: "API",
        link: "/api/",
      },
    ],
    sidebar: [
      {
        text: "Guide",
        link: "/guide/",
        collapsable: false,
        sidebarDepth: 1, // optional, defaults to 1
        children: ["/guide/", "/guide/get-started"],
      },
      {
        text: "Javascript",
        link: "/javascript/",
        collapsable: false,
        sidebarDepth: 1,
        children: [
          "/javascript/",
          "/javascript/get-started",
          "/javascript/quick-start",
          "/javascript/counter-name-hashing",
          "/javascript/count-list",
        ],
      },
      {
        text: "Go",
        link: "/go/",
        collapsable: false,
        sidebarDepth: 1,
        children: [
          "/go/",
          "/go/get-started",
          "/go/quick-start",
          "/go/counter-name",
        ],
      },
      {
        text: "API",
        link: "/api/",
        collapsable: false,
        sidebarDepth: 1,
        children: ["/api/", "/api/rate-limit", "/api/endpoints"],
      },
    ],
  }),
  bundler: viteBundler({
    viteOptions: {
      css: {
        postcss: {
          plugins: [tailwindcss],
        },
      },
    },
    vuePluginOptions: {},
  }),
  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    searchPlugin({
      // options
    }),
    backToTopPlugin(),
    nprogressPlugin(),
    sitemapPlugin({
      hostname: "https://counterapi.dev",
    }),
    seoPlugin({
      hostname: "https://counterapi.dev",
      autoDescription: true,
      author: {
        name: "Hakan",
        url: "https://omegion.dev",
        email: "hello@counterapi.dev"
      }
    }),
  ],
};
