// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // SSG（Static Site Generation）の設定
  // nitro.prerender で静的サイト生成を有効化
  nitro: {
    prerender: {
      crawlLinks: true
    }
  },
  
  // アプリケーションの設定
  app: {
    head: {
      title: 'ポートフォリオサイト',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})

