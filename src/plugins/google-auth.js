import vue3GoogleLogin from 'vue3-google-login';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public
  nuxtApp.vueApp.use(vue3GoogleLogin, {
    load: {
      key: config.GOOGLE_LOGIN_AUTH_API_KEY,
    },
  })
})