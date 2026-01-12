<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero">
      <div class="hero__decoration hero__decoration--1"></div>
      <div class="hero__decoration hero__decoration--2"></div>
      <div class="hero__decoration hero__decoration--3"></div>
      <div class="hero__decoration hero__decoration--4"></div>
      <div class="hero__decoration hero__decoration--5"></div>
      <div class="hero__decoration hero__decoration--6"></div>
      <div class="hero__decoration hero__decoration--7"></div>
      <div class="hero__decoration hero__decoration--8"></div>
      <div class="hero__decoration hero__decoration--9"></div>
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
              <div class="profile__title">
                <BaseSectionTitle>PROFILE</BaseSectionTitle>
              </div>
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
    <AppSection padding="top">
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
              <div class="services__card-button">
                <BaseButton href="#" variant="outline" size="small"> 詳しく見る </BaseButton>
              </div>
            </li>
            <li class="services__card">
              <h3 class="services__card-title">LP・広告バナー</h3>
              <p class="services__card-description">
                ランディングページやバナーなど、販促用のクリエイティブ制作を行います。
              </p>
              <div class="services__card-button">
                <BaseButton href="#" variant="outline" size="small"> 詳しく見る </BaseButton>
              </div>
            </li>
            <li class="services__card">
              <h3 class="services__card-title">WEB制作協力</h3>
              <p class="services__card-description">
                制作会社様や同業個人様の、WEBサイト制作のお手伝いをいたします。
              </p>
              <div class="services__card-button">
                <BaseButton href="#" variant="outline" size="small"> 詳しく見る </BaseButton>
              </div>
            </li>
            <li class="services__card">
              <h3 class="services__card-title">フロントエンド開発</h3>
              <p class="services__card-description">
                モダンな技術スタックを使用した、レスポンシブで高速なWebアプリケーションを開発します。
              </p>
              <div class="services__card-button">
                <BaseButton href="#" variant="outline" size="small"> 詳しく見る </BaseButton>
              </div>
            </li>
          </ul>
        </BaseContainer>
      </div>
    </AppSection>

    <!-- Projects Section -->
    <AppSection padding="top">
      <div class="projects">
        <BaseContainer>
          <div class="projects__header">
            <BaseSectionTitle>WORKS</BaseSectionTitle>
          </div>
          <ul v-if="latestWorks.length > 0" class="projects__grid">
            <li v-for="work in latestWorks" :key="work.id">
              <FeaturesWorksWorkCard :work="work" />
            </li>
          </ul>
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
    </AppSection>

    <!-- Contact Section -->
    <FeaturesContactCard />
  </div>
</template>

<script setup lang="ts">
import type { Works } from '~/types/works';

// レイアウトに pt を渡す
definePageMeta({
  pt: false,
});

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
  position: relative;
  overflow: hidden;

  &__decoration {
    position: absolute;
    border-radius: 50%;
    background-color: $color_accent_primary;
    border: s(3) solid $color_base_black;
    z-index: 0;
    pointer-events: none;
    animation: float 6s ease-in-out infinite;

    &--1 {
      width: s(40);
      height: s(40);
      top: 17%;
      left: 10%;
      animation-delay: 0s;
      background-color: $color_accent_primary;

      @include media($bp_tab) {
        width: s(60);
        height: s(60);
        top: 20%;
        left: 10%;
      }
    }

    &--2 {
      width: s(20);
      height: s(20);
      top: 30%;
      right: 25%;
      animation-delay: 1s;
      background-color: #c2c5ff;

      @include media($bp_tab) {
        width: s(28);
        height: s(28);
        top: 30%;
        right: 30%;
      }
    }

    &--3 {
      width: s(50);
      height: s(50);
      top: 87%;
      left: 8%;
      animation-delay: 2s;
      background-color: $color_accent_primary;

      @include media($bp_tab) {
        width: s(50);
        height: s(50);
        top: 80%;
        left: 8%;
      }
    }

    &--4 {
      width: s(30);
      height: s(30);
      top: 22%;
      right: 8%;
      animation-delay: 0.5s;
      background-color: #c2c5ff;

      @include media($bp_tab) {
        width: s(55);
        height: s(55);
        top: 22%;
        right: 8%;
      }
    }

    &--5 {
      width: s(22);
      height: s(22);
      bottom: 20%;
      left: 40%;
      animation-delay: 1.5s;
      background-color: $color_accent_primary;

      @include media($bp_tab) {
        width: s(25);
        height: s(25);
        bottom: 20%;
        left: 34%;
      }
    }

    &--6 {
      width: s(60);
      height: s(60);
      bottom: 15%;
      right: 10%;
      animation-delay: 2.5s;
      background-color: #c2c5ff;

      @include media($bp_tab) {
        width: s(80);
        height: s(80);
        bottom: 15%;
        right: 10%;
      }
    }

    &--7 {
      display: none;
      width: s(22);
      height: s(22);
      bottom: 20%;
      left: 40%;
      animation-delay: 1.5s;
      background-color: #c2c5ff;

      @include media($bp_tab) {
        display: block;
        width: s(25);
        height: s(25);
        bottom: 40%;
        left: 5%;
      }
    }

    &--8 {
      display: none;
      width: s(22);
      height: s(22);
      bottom: 20%;
      left: 40%;
      animation-delay: 1.5s;
      background-color: #c2c5ff;

      @include media($bp_tab) {
        display: block;
        width: s(30);
        height: s(30);
        bottom: 8%;
        left: 60%;
      }
    }

    &--9 {
      display: none;
      width: s(22);
      height: s(22);
      bottom: 20%;
      left: 40%;
      animation-delay: 1.5s;
      background-color: $color_accent_primary;

      @include media($bp_tab) {
        display: block;
        width: s(25);
        height: s(25);
        top: 18%;
        left: 38%;
      }
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

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
    position: relative;
    z-index: 1;
    @include lightShadow;
    @include font(48, 130, 0, 500, $font-f_rocknroll-one);
    color: $color_text_primary;
    margin: 0;
    height: 100dvh;
    padding-inline: s(16);
    gap: s(4);
    display: flex;
    justify-content: center;
    flex-direction: column;
    perspective: 1000px;

    @include media($bp_tab) {
      align-items: center;
    }

    @include media($bp_tabL) {
      font-size: s(65);
    }

    @include media($bp_pc) {
      font-size: s(80);
    }

    & > span {
      display: block;
      animation: slideInLeft 1.5s 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      opacity: 0;
      transform: translateX(-100%) scaleX(0.5) rotateY(-45deg);
      transform-origin: left center;

      &:nth-child(2) {
        animation-delay: 0.9s;
      }
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

  @keyframes slideInLeft {
    0% {
      opacity: 0;
      transform: translateX(-100%) scaleX(0.5) rotateY(-45deg);
    }
    50% {
      opacity: 0.8;
      transform: translateX(8%) scaleX(1.02) rotateY(8deg);
    }
    70% {
      opacity: 0.95;
      transform: translateX(-1%) scaleX(1) rotateY(0deg);
    }
    85% {
      opacity: 0.98;
      transform: translateX(0.5%) scaleX(1.01) rotateY(0.5deg);
    }
    100% {
      opacity: 1;
      transform: translateX(0) scaleX(1) rotateY(0deg);
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
    @include font(40, 130, 0, 500, $font-f_rocknroll-one);
    color: $color_text_primary;
    margin: 0;
    text-align: center;

    @include media($bp_tab) {
      text-align: left;
    }
  }

  &__description {
    @include font(14, 180, 0);
    color: $color_text_primary;
    margin: 0;

    @include media($bp_pc) {
      font-size: s(16);
    }
  }

  &__button {
    margin-top: s(24);
    width: fit-content;
    margin-inline: auto;

    @include media($bp_tab) {
      margin-inline: 0;
      margin-top: s(32);
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
    @include font(20, 140, 0, 700, $font-f_rocknroll-one);
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
    @include font(14, 160, 0);
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

  &__more {
    display: flex;
    justify-content: center;
    margin-top: s(32);

    @include media($bp_pc) {
      margin-top: s(48);
    }
  }

  &__loading,
  &__empty {
    text-align: center;
    padding: s(80) s(20);

    p {
      @include font(16, 160, 0);
      color: $color_text_secondary;
      margin: 0;
    }
  }
}
</style>
