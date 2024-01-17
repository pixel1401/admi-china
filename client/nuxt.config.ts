// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
    },
  },
  
  typescript: {
    strict: true
  },
  pages: true,
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxt/image",
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  ui: {
    global: true,
    notifications: {
      position: "top-0 bottom-auto",
    },
    
    // icons: ['mdi', 'simple-icons']
  },
  image: {},
  devtools: { enabled: true },

  
});
