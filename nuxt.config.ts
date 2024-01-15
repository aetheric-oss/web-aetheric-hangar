export default defineNuxtConfig({
  srcDir: "src/",

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

  modules: ["@nuxt/devtools", "@pinia/nuxt", "nuxt-vue3-google-signin"],

  imports: {
    dirs: ["store"],
  },

  plugins: [{ src: "~/plugins/google.auth.js", mode: "client" }],
  build: { transpile: ["GoogleSignInPlugin"] },

  runtimeConfig: {
    public: { GOOGLE_LOGIN_AUTH_API_KEY: process.env.clientId },
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
          additionalData: '@use "@/assets/styles/global.scss" as *;'
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

  googleSignIn: {
    clientId: process.env.clientId,
  },
});
