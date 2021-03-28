const { description } = require("../../package");

module.exports = {
  title: "Counter API",
  description: description,

  head: [
    ["meta", { name: "theme-color", content: "#0842ba" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],
  sassOptions: { indentedSyntax: true },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "~@/styles/main.scss"`,
      },
    },
  },
  themeConfig: {
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    logo: "/img/counterapi-logo.svg",
    nav: [
      {
        text: "Guide",
        link: "/guide/",
      },
      {
        text: "GitHub",
        link: "https://github.com/counterapi",
      },
    ],
    sidebar: [
      {
        title: "Guide",
        path: "/guide/",
        collapsable: false,
        sidebarDepth: 1, // optional, defaults to 1
        children: ["/guide/", "/guide/get-started", "/guide/configuration"],
      },
      {
        title: "Javascript",
        path: "/javascript/",
        collapsable: false,
        sidebarDepth: 1,
        children: [
          "/javascript/",
          "/javascript/get-started",
          "/javascript/quick-start",
          "/javascript/counter-name",
        ],
      },
      {
        title: "Go",
        path: "/go/",
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
        title: "API",
        path: "/api/",
        collapsable: false,
        sidebarDepth: 1,
        children: ["/api/", "/api/endpoints"],
      },
    ],
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    "vuepress-plugin-typescript",
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
  ],
};
