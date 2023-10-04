import { defineClientConfig } from '@vuepress/client'
import APIRun from "./components/APIRun.vue"

import "tailwindcss/tailwind.css"

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('APIRun', APIRun)
  },
  setup() {},
  rootComponents: [],
})
