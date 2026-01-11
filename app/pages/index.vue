<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero">
      <h1 class="hero__heading">
        <span class="hero__heading__line">WEB UI <br class="hp_hidden_tab_" />DEVELOPER</span>
        <span>TRAINING <br class="hp_hidden_tab_" />APP</span>
      </h1>
    </div>

    <!-- Profile Section -->
    <section>
      <div class="profile">
        <BaseContainer>
          <div class="profile__content">
            <div class="profile__image-wrapper">
              <img src="/images/profile/img_profile.png" alt="Profile" class="profile__image" />
            </div>
            <div class="profile__text-wrapper">
              <h2 class="profile__title">Profile</h2>
              <p class="profile__description">
                ポートフォリオサイトをご覧いただきありがとうございます。<br />
                まず初めに、私のプロフィールを紹介いたします。<br />
                1996年生まれ。理系の大学を卒業後、様々な業務を経験し、2021年にWEB業界へ参入。
              </p>
              <div class="profile__button">
                <BaseButton to="/profile" variant="primary" size="large"> View Profile </BaseButton>
              </div>
            </div>
          </div>
        </BaseContainer>
      </div>
    </section>

    <!-- Services Section -->
    <BaseSection padding="top">
      <div class="services">
        <BaseContainer>
          <div class="services__header">
            <BaseSectionTitle>SERVICE</BaseSectionTitle>
          </div>
          <ul class="services__grid">
            <li class="services__card">
              <h3 class="services__card-title">WEBサイト制作</h3>
              <p class="services__card-description">
                WEBサイト制作を行います。デザイン制作から実装まで一貫して対応いたします。
              </p>
              <BaseButton href="#" variant="outline" size="small" class="services__card-button">
                詳しく見る
              </BaseButton>
            </li>
            <li class="services__card">
              <h3 class="services__card-title">LP・広告バナー</h3>
              <p class="services__card-description">
                ランディングページやバナーなど、販促用のクリエイティブ制作を行います。
              </p>
              <BaseButton href="#" variant="outline" size="small" class="services__card-button">
                詳しく見る
              </BaseButton>
            </li>
            <li class="services__card">
              <h3 class="services__card-title">WEB制作協力</h3>
              <p class="services__card-description">
                制作会社様や同業個人様の、WEBサイト制作のお手伝いをいたします。
              </p>
              <BaseButton href="#" variant="outline" size="small" class="services__card-button">
                詳しく見る
              </BaseButton>
            </li>
            <li class="services__card">
              <h3 class="services__card-title">フロントエンド開発</h3>
              <p class="services__card-description">
                モダンな技術スタックを使用した、レスポンシブで高速なWebアプリケーションを開発します。
              </p>
              <BaseButton href="#" variant="outline" size="small" class="services__card-button">
                詳しく見る
              </BaseButton>
            </li>
          </ul>
        </BaseContainer>
      </div>
    </BaseSection>

    <!-- Projects Section -->
    <BaseSection padding="top">
      <div class="projects">
        <BaseContainer>
          <div class="projects__header">
            <BaseSectionTitle>WORKS</BaseSectionTitle>
          </div>
          <div v-if="latestWorks.length > 0" class="projects__grid">
            <NuxtLink
              v-for="work in latestWorks"
              :key="work.id"
              :to="`/works/${work.id}`"
              class="projects__card"
            >
              <div class="projects__card-image">
                <img
                  :src="work.thumbnail.url"
                  :alt="work.title"
                  class="projects__card-img"
                  :width="work.thumbnail.width"
                  :height="work.thumbnail.height"
                />
              </div>
              <div class="projects__card-content">
                <div class="projects__card-text">
                  <h3 class="projects__card-title">
                    <template v-for="(line, index) in work.title.split(/<br\s*\/?>/i)" :key="index">
                      <template v-if="Number(index) > 0"><br /></template>
                      {{ line }}
                    </template>
                  </h3>
                  <p class="projects__card-category">{{ work.category.name }}</p>
                  <p class="projects__card-description">{{ work.client }}</p>
                </div>
                <div class="projects__card-arrow">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 5L12.5 10L7.5 15"
                      stroke="currentColor"
                      stroke-width="1.67"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </NuxtLink>
          </div>
          <div v-else-if="isLoadingWorks" class="projects__loading">
            <p>実績データを読み込み中...</p>
          </div>
          <div v-else class="projects__empty">
            <p>実績データがありません</p>
          </div>
          <div class="projects__more">
            <BaseButton to="/works" variant="primary" size="large"> すべての実績を見る </BaseButton>
          </div>
        </BaseContainer>
      </div>
    </BaseSection>

    <!-- Contact Section -->
    <BaseSection padding="top">
      <div class="contact">
        <BaseContainer>
          <div class="contact__card">
            <h2 class="contact__title">プロジェクトを始めましょう</h2>
            <p class="contact__description">
              何かお手伝いできることがあれば、お気軽にお問い合わせください。一緒に素晴らしいものを作りましょう。
            </p>
            <div class="contact__actions">
              <BaseButton to="/contact" variant="primary" size="large" class="contact__button">
                メッセージを送る
              </BaseButton>
            </div>
          </div>
        </BaseContainer>
      </div>
    </BaseSection>
  </div>
</template>

<script setup lang="ts">
import type { Works } from '~/types/works';

useHead({
  title: 'ポートフォリオサイト - トップページ',
  meta: [
    {
      name: 'description',
      content: 'I design top notch websites. ポートフォリオサイトへようこそ。',
    },
  ],
});

// 最新の実績データを取得（useFetchでサーバーサイド実行）
const { data: latestWorksResponse, pending: isLoadingWorks } = await useFetch<{
  contents: Works[];
}>('/api/works/latest', {
  params: { limit: 6 },
  default: () => ({ contents: [] }),
  onResponseError({ response }: { response: any }) {
    console.error('Failed to load latest works:', response._data);
  },
});

// 最新の実績データ
const latestWorks = computed(() => latestWorksResponse.value?.contents || []);
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
}

// Hero Section
.hero {
  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: s(40);
    align-items: center;

    @include media($bp_tab) {
      grid-template-columns: 1fr;
      gap: s(32);
    }
  }

  &__left {
    display: flex;
    flex-direction: column;
    gap: s(40);
    order: 1;

    @include media($bp_tab) {
      order: 2;
      gap: s(24);
      text-align: center;
    }
  }

  &__button-wrapper {
    display: flex;
    align-items: center;
    gap: s(8);

    @include media($bp_tab) {
      justify-content: center;
    }
  }

  &__button {
    @include media($bp_tab) {
      width: 100%;
      max-width: s(300);
    }
  }

  &__heading {
    @include lightShadow;
    font-family: $font-f_rocknroll-one;
    font-weight: 500;
    font-size: s(48);
    line-height: 1.3;
    color: $color_text_primary;
    margin: 0;
    height: 100dvh;
    padding-inline: s(16);
    gap: s(4);
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: s($height_header_sp - 30);

    @include media($bp_tab) {
      align-items: center;
    }

    @include media($bp_tabL) {
      font-size: s(65);
    }

    @include media($bp_pc) {
      font-size: s(80);
      padding-bottom: s($height_header_pc - 40);
    }

    &__line {
      $_parent: &;
      display: block;
      margin-bottom: s(8);

      &#{$_parent}--highlight {
        position: relative;
        display: inline-block;

        &__underline {
          position: absolute;
          bottom: s(4);
          left: 0;
          width: 100%;
          height: s(12);
          background-color: $color_base_accent;
          z-index: -1;
          opacity: 0.8;
        }
      }
    }
  }

  &__right {
    position: relative;
    order: 2;

    @include media($bp_tab) {
      order: 1;
    }
  }

  &__image-wrapper {
    position: relative;
    width: 100%;
    max-width: 100%;
    aspect-ratio: 1 / 1;
    border: s(4) solid $color_base_black;
    border-radius: s(8);
    box-shadow: s(-8) s(8) 0 0 rgba(0, 0, 0, 0.2);
    overflow: hidden;
    background-color: $color_bg_base;
    margin: 0 auto;

    @include media($bp_tab) {
      max-width: s(400);
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

// Profile Section
.profile {
  &__content {
    gap: s(48);

    @include media($bp_tab) {
      gap: s(32);
      display: flex;
      align-items: center;
    }

    @include media($bp_pc) {
      gap: s(60);
    }
  }

  &__image-wrapper {
    width: 90%;
    max-width: s(400);
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    overflow: hidden;
    border: s(4) solid $color_base_black;
    box-shadow: s(-8) s(8) 0 0 rgba(#000, 0.2);
    margin: 0 auto;
    order: 2;

    @include media($bp_tab) {
      order: 1;
      width: 40%;
      height: fit-content;
      max-width: s(300);
    }

    @include mode($theme_dark) {
      box-shadow: s(-8) s(8) 0 0 rgba(#fff, 0.2);
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__text-wrapper {
    display: flex;
    flex-direction: column;
    gap: s(24);
    margin-top: s(30);

    @include media($bp_tab) {
      flex-basis: 0;
      flex-grow: 1;
    }

    @include media($bp_pc) {
      text-align: left;
    }
  }

  &__title {
    font-family: $font-f_rocknroll-one;
    font-weight: 500;
    font-size: s(40);
    line-height: 1.3;
    color: $color_text_primary;
    margin: 0;
    text-align: center;

    @include media($bp_tab) {
      text-align: left;
    }
  }

  &__description {
    font-family: $font-f_notosans;
    font-size: s(14);
    line-height: 1.8;
    color: $color_text_primary;
    margin: 0;

    @include media($bp_pc) {
      font-size: s(16);
    }
  }

  &__button {
    margin-top: s(16);
    width: fit-content;
    margin-inline: auto;

    @include media($bp_tab) {
      margin-inline: 0;
      margin-top: 0;
    }
  }
}

// Services Section
.services {
  &__header {
    display: flex;
    flex-direction: column;
    gap: s(8);
    align-items: center;
    text-align: center;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: s(4);
    padding: s(4);
    border: s(3) solid $color_base_black;
    background-color: $color_bg_base;
    border-radius: s(4);

    @include media($bp_tab) {
      grid-template-columns: repeat(2, 1fr);
      border: s(3) solid $color_base_black;
    }

    @include media($bp_pc) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__card {
    padding: s(24);
    border: s(3) solid $color_base_black;
    background-color: $color_bg_base;
    display: flex;
    flex-direction: column;
    gap: s(16);
    transition: all $transition_normal;

    &:nth-child(2) {
      border-left: s(3) solid $color_base_black;

      @include media($bp_tab) {
        border-left: s(3) solid $color_base_black;
      }
    }

    &:nth-child(3) {
      border-top: s(3) solid $color_base_black;
    }

    &:nth-child(4) {
      border-top: s(3) solid $color_base_black;
      border-left: s(3) solid $color_base_black;

      @include media($bp_tab) {
        border-left: s(3) solid $color_base_black;
      }
    }

    @include hover {
      background-color: $color_bg_hover;
      transform: translate(s(-2), s(-2));
    }

    @include media($bp_tab) {
      padding: s(20);
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: s(8);
  }

  &__card-title {
    font-family: $font-f_rocknroll-one;
    font-weight: 700;
    font-size: s(20);
    line-height: 1.4;
    color: $color_text_primary;
    margin: 0;
    display: flex;
    align-items: center;
    gap: s(16);

    @include media($bp_pc) {
      font-size: s(24);
    }

    &::before {
      content: '';
      display: block;
      width: s(30);
      height: s(30);
      border-radius: 50%;
      background-color: $color_accent_primary;
      border: s(3) solid $color_base_black;
      flex-shrink: 0;
    }

    .services__card:nth-of-type(odd) & {
      &::before {
        background-color: #c2c5ff;
      }
    }
  }

  &__card-description {
    font-family: $font-f_notosans;
    font-size: s(14);
    line-height: 1.6;
    color: $color_text_secondary;
    margin: 0;
    flex: 1;

    @include media($bp_pc) {
      font-size: s(16);
    }
  }

  &__card-button {
    align-self: flex-start;
    margin-top: s(8);
  }
}

.projects {
  &__header {
    text-align: center;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: s(24);

    @include media($bp_tab) {
      grid-template-columns: repeat(2, 1fr);
      gap: s(16);
    }

    @include media($bp_tabL) {
      gap: s(24);
    }

    @include media($bp_pc) {
      grid-template-columns: repeat(3, 1fr);
      gap: s(30);
    }
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: s(16);
    padding: s(24);
    border: s(4) solid $color_base_black;
    background-color: $color_bg_base;
    box-shadow: s(-6) s(6) 0 0 $color_base_black;
    border-radius: s(4);
    text-decoration: none;
    color: inherit;
    transition: all $transition_normal;

    @include hover {
      transform: translate(s(-2), s(-2));
      box-shadow: s(-8) s(8) 0 0 $color_base_black;
    }

    @include media($bp_tab) {
      padding: s(20);
    }
  }

  &__card-image {
    width: 100%;
    aspect-ratio: 5 / 3.5;
    border: s(3) solid $color_base_black;
    border-radius: s(4);
    overflow: hidden;
    background-color: $color_bg_base;
    padding: s(5) s(10);
  }

  &__card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__card-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: s(16);
  }

  &__card-text {
    display: flex;
    flex-direction: column;
    gap: s(4);
    flex: 1;
  }

  &__card-title {
    font-family: $font-f_rocknroll-one;
    font-weight: 700;
    font-size: s(20);
    line-height: 1.4;
    color: $color_text_primary;
    margin: 0;

    @include media($bp_pc) {
      font-size: s(24);
    }
  }

  &__card-category {
    font-family: $font-f_notosans;
    font-size: s(12);
    line-height: 1.5;
    color: $color_text_secondary;
    margin: 0;

    @include media($bp_pc) {
      font-size: s(14);
    }
  }

  &__card-description {
    font-family: $font-f_notosans;
    font-size: s(14);
    line-height: 1.5;
    color: $color_text_primary;
    margin: 0;

    @include media($bp_pc) {
      font-size: s(16);
    }
  }

  &__card-arrow {
    width: s(32);
    height: s(32);
    flex-shrink: 0;
    color: $color_text_primary;
    border: s(2) solid $color_accent_primary;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $color_bg_base;
  }

  &__more {
    display: flex;
    justify-content: center;
    margin-top: s(16);
  }

  &__loading,
  &__empty {
    text-align: center;
    padding: s(80) s(20);

    p {
      font-family: $font-f_notosans;
      font-size: s(16);
      line-height: 1.6;
      color: $color_text_secondary;
      margin: 0;
    }
  }
}

// Contact Section
.contact {
  &__card {
    padding: s(48) s(32);
    border: s(4) solid $color_base_black;
    background-color: $color_bg_base;
    box-shadow: s(-8) s(8) 0 0 rgba(0, 0, 0, 1);
    border-radius: s(4);
    display: flex;
    flex-direction: column;
    gap: s(24);
    text-align: center;

    @include media($bp_pc) {
      padding: s(56) s(48);
    }

    @include media($bp_tab) {
      padding: s(32) s(24);
      gap: s(20);
    }
  }

  &__title {
    font-family: $font-f_rocknroll-one;
    font-weight: 500;
    font-size: s(32);
    line-height: 1.3;
    color: $color_text_primary;
    margin: 0;

    @include media($bp_pc) {
      font-size: s(40);
    }

    @include media($bp_pcL) {
      font-size: s(48);
    }

    @include media($bp_tab) {
      font-size: s(28);
    }
  }

  &__description {
    font-family: $font-f_notosans;
    font-size: s(16);
    line-height: 1.6;
    color: $color_text_secondary;
    margin: 0;

    @include media($bp_pc) {
      font-size: s(18);
    }
  }

  &__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: s(8);
  }

  &__button {
    @include media($bp_tab) {
      width: 100%;
      max-width: s(300);
    }
  }
}
</style>
