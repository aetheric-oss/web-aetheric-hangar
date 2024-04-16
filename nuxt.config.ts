export default defineNuxtConfig({
  ssr: false,

  srcDir: "src/",
  ignore: [
    "aetheric-api/"
  ],
  typescript: {
    typeCheck: true,
    strict: true
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

  modules: ["@nuxt/devtools", "@pinia/nuxt", "~/modules/aetheric-api/index"],
  runtimeConfig: {
    public: {
      GOOGLE_CLIENTID: process.env.GOOGLE_CLIENTID,
      smartlookId: "3d8cc3fad36fd64fa8461c440815b246c3b75961",
      api: {
        useMock: true,
        backends: {
          cargo: "http://localhost:8002",
          assets: "http://localhost:8001",
          contact: "http://localhost:8003",
          users: "https://tst1.api.flyarrow.io",
          auth: "https://tst1.api.flyarrow.io",
          address: "https://tst1.api.flyarrow.io",
          aircraft: "https://tst1.api.flyarrow.io",
          companies: "https://tst1.api.flyarrow.io"
        }
      }
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: true,
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
