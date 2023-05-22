// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5",
      title: "소윤 스터디",
      htmlAttrs: {
        lang: "ko",
      },
      meta: [{ name: "format-detection", content: "telephone=no" }],
    },
  },
});
