export default defineNuxtConfig({
  ssr: false,

  srcDir: "src/",

  typescript: {
    typeCheck: true,
    strict: true
  },

  app: {
    head: {
      titleTemplate: (chunk) => `Aetheric B.V.${chunk && " - " + chunk}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Aetheric B.V. (est. 2024)",
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
          cargo: process.env.CARGO_API,
          assets: process.env.ASSETS_API,
          contact: process.env.CONTACT_API,
          users: process.env.USERS_API,
          auth: process.env.AUTH_API,
          address: process.env.ADDRESS_API,
          aircraft: process.env.AIRCRAFT_API,
          companies: process.env.COMPANIES_API
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
