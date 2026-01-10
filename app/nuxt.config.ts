// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // コンポーネントの自動インポート設定（デフォルト設定を使用）

  // SSG（Static Site Generation）の設定
  // nitro.prerender で静的サイト生成を有効化
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
    },
  },

  // CSS設定
  css: ['~/assets/scss/main.scss'],

  // Vite設定（SCSSのパス解決用）
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '',
        },
      },
    },
    resolve: {
      alias: {
        '~scss': '~/assets/scss',
        scss: '~/assets/scss',
      },
    },
  },

  // ランタイム設定（環境変数）
  // Nuxt 4のruntimeConfigを使用
  // サーバーサイドのみ: NUXT_ プレフィックスなし（機密情報）
  // クライアントサイドにも公開: NUXT_PUBLIC_ プレフィックス付き（公開情報）
  runtimeConfig: {
    // サーバーサイドのみ（機密情報）
    microcmsApiKey: process.env.NUXT_MICROCMS_API_KEY || process.env.MICROCMS_API_KEY,
    microcmsServiceDomain:
      process.env.NUXT_MICROCMS_SERVICE_DOMAIN || process.env.MICROCMS_SERVICE_DOMAIN,
  },

  // アプリケーションの設定
  app: {
    head: {
      title: 'ポートフォリオサイト',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Nuxt 3/4を使用して作成したポートフォリオサイトです。' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
});
