const { description } = require("../../package");

module.exports = {
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
  sassOptions: { indentedSyntax: true },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "~@/styles/main.scss"`,
      },
    },
  },
  dest: "docs",
  themeConfig: {
    repo: "https://github.com/counterapi",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    logo: "/img/counterapi-logo.svg",
    author: "omegion",
    nav: [
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
        title: "Guide",
        path: "/guide/",
        collapsable: false,
        sidebarDepth: 1, // optional, defaults to 1
        children: ["/guide/", "/guide/get-started"],
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
          "/javascript/counter-name-hashing",
          "/javascript/count-list",
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
        children: ["/api/", "/api/rate-limit", "/api/endpoints"],
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
    "sitemap",
    {
      hostname: "https://counterapi.dev",
      outFile: "src/.vuepress/dist/sitemap.xml",
    },
    "seo",
    {
      siteTitle: (_, $site) => $site.title,
      title: ($page) => $page.title,
      description: ($page) => $page.frontmatter.description,
      author: (_, $site) => $site.themeConfig.author,
      tags: ($page) => $page.frontmatter.tags,
      twitterCard: (_) => "summary_large_image",
      type: ($page) =>
        ["articles", "posts", "blog"].some((folder) =>
          $page.regularPath.startsWith("/" + folder)
        )
          ? "article"
          : "website",
      url: (_, $site, path) => ($site.themeConfig.domain || "") + path,
      image: ($page, $site) =>
        $page.frontmatter.image &&
        (($site.themeConfig.domain &&
          !$page.frontmatter.image.startsWith("http")) ||
          "") + $page.frontmatter.image,
      publishedAt: ($page) =>
        $page.frontmatter.date && new Date($page.frontmatter.date),
      modifiedAt: ($page) => $page.lastUpdated && new Date($page.lastUpdated),
    },
  ],
};
