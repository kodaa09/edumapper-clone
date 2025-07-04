// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
  ],
  css: ["~/assets/css/tailwind.css"],
  // routeRules: {
  //   "/api-proxy/**": {
  //     proxy: { to: "http://preprod-edumapper.koodev.fr/api/**" },
  //   },
  // },

  // runtimeConfig: {
  //   public: {
  //     apiBase: "/api-proxy",
  //   },
  // },
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3333/api",
    },
  },
});
