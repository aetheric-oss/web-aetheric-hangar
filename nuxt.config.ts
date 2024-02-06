import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineNuxtConfig({
  srcDir: "src/",

  typescript: {
    typeCheck: true,
  },

  app: {
    head: {
      titleTemplate: (chunk) => `FlyArrow.io${chunk && " - " + chunk}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "FlyArrow.io - Part of Arrow DAO",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&family=Poppins:wght@200;400;700;800&display=swap",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
      ],
    },
  },

  css: ["~/assets/styles/main.scss"],

  modules: ["@nuxt/devtools", "@pinia/nuxt"],

  imports: {
    dirs: ["store"],
  },

  runtimeConfig: {
    public: {
      GOOGLE_CLIENTID: process.env.GOOGLE_CLIENTID,
      smartlookId: "3d8cc3fad36fd64fa8461c440815b246c3b75961",
    },
  },

  nitro: {
    prerender: {
      concurrency: 1,
      failOnError: false,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/global.scss" as *;',
        },
      },
    },
    plugins: [
      nodePolyfills({
        protocolImports: true,
      }),
    ],
  },

  // Plugin settings
  devtools: {
    enabled: false,

    vscode: {
      enabled: true,
    },

    timeline: {
      enabled: true,
    },
  },
});
