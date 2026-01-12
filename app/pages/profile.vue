<template>
  <AppLowerPage>
    <div class="profile-page">
      <!-- Main Visual Section -->
      <section>
        <BaseContainer>
          <div class="profile-mv__content">
            <div class="profile-mv__image-wrapper">
              <img src="/images/profile/img_profile.png" alt="Profile" class="profile-mv__image" />
            </div>
            <div class="profile-mv__text-wrapper">
              <div class="profile-mv__title">
                <BaseSectionTitle tag="h1">PROFILE</BaseSectionTitle>
              </div>
              <div class="profile-mv__text-content">
                <p class="profile-mv__text">
                  堤 颯輝 ( Satsuki Tsutsumi )<br />
                  屋号「I Thing Studio (アイシングスタジオ)」
                </p>
                <p class="profile-mv__text">
                  1996年生まれ。<br />
                  理系の大学を卒業後、<br />
                  アパレル業界、飲食業界、営業、製造業等様々な業務を経験。<br />
                  2021年にWEB業界へ参入。<br />
                  システム開発の設計・実装・テスト、スマホアプリ検証等も経験。<br />
                  現在は主にWEB制作分野において、<br />
                  フロントエンド開発やデザインを行っている。<br />
                  常に今よりも「より良く」を目指して、日々制作・学習に励んでいる。
                </p>
                <p class="profile-mv__text">
                  趣味は絵を描くこと。<br />
                  WEBの仕事の傍ら、絵を描く活動を行っている。
                </p>
              </div>
            </div>
          </div>
        </BaseContainer>
      </section>

      <!-- Catch Section -->
      <AppSection padding="top">
        <BaseContainer>
          <h2 class="profile-catch__title">
            Creative that <br class="hp_hidden_tab_" />captures the essence.
          </h2>
          <p class="profile-catch__jp">「 役割を捉えた取り組みを。 」</p>
          <div class="profile-catch__text">
            <p>自分は何ができるのか。そこにいる役割は。</p>
            <p>そして、なぜそれを創るのか。<br class="hp_hidden_tab_">その作品に何を託したいのか。</p>
            <p>自分の役割・制作の意味を明確にし、遂行する。</p>
            <p>そのような思考を大切に、<br class="hp_hidden_tab_"></br>日々制作に取り組んでいます。</p>
          </div>
        </BaseContainer>
      </AppSection>

      <!-- Values Section -->
      <AppSection padding="top">
        <BaseContainer>
          <ul class="profile-values__list">
            <li class="profile-values__item">
              <p class="profile-values__en">sincerity</p>
              <h3 class="profile-values__title">誠実</h3>
              <p class="profile-values__text">
                責任をもってやり遂げること<br />
                素直であること
              </p>
            </li>
            <li class="profile-values__item">
              <p class="profile-values__en">cooperative</p>
              <h3 class="profile-values__title">一体性</h3>
              <p class="profile-values__text">
                共により良いゴールを<br />
                目指すこと
              </p>
            </li>
            <li class="profile-values__item">
              <p class="profile-values__en">ambition</p>
              <h3 class="profile-values__title">向上心</h3>
              <p class="profile-values__text">
                常に成長を志し<br />
                磨く姿勢を失くさないこと
              </p>
            </li>
          </ul>
        </BaseContainer>
      </AppSection>

      <!-- Skills Section -->
      <AppSection padding="top">
        <BaseContainer>
          <div class="profile-skills__title">
            <BaseSectionTitle tag="h1">SKILLS</BaseSectionTitle>
          </div>
          <div class="profile-skills__content">
            <div class="profile-skills__category">
              <h3 class="profile-skills__category-title">フロントエンド</h3>
              <ul class="profile-skills__list">
                <li class="profile-skills__item">HTML</li>
                <li class="profile-skills__item">CSS</li>
                <li class="profile-skills__item">SCSS</li>
                <li class="profile-skills__item">Javascript</li>
                <li class="profile-skills__item">TypeScript</li>
                <li class="profile-skills__item">Vue.js</li>
                <li class="profile-skills__item">Nuxt.js</li>
                <li class="profile-skills__item">React</li>
                <li class="profile-skills__item">Next.js</li>
                <li class="profile-skills__item">Astro.js</li>
              </ul>
            </div>
            <div class="profile-skills__category">
              <h3 class="profile-skills__category-title">デザイン・ツール</h3>
              <ul class="profile-skills__list">
                <li class="profile-skills__item">Illustrator</li>
                <li class="profile-skills__item">Photoshop</li>
                <li class="profile-skills__item">XD</li>
                <li class="profile-skills__item">Figma</li>
                <li class="profile-skills__item">AfterEffects</li>
              </ul>
            </div>
            <div class="profile-skills__category">
              <h3 class="profile-skills__category-title">その他</h3>
              <ul class="profile-skills__list">
                <li class="profile-skills__item">PHP</li>
                <li class="profile-skills__item">Laravel</li>
                <li class="profile-skills__item">Framer</li>
                <li class="profile-skills__item">Wordpress</li>
                <li class="profile-skills__item">Docker</li>
                <li class="profile-skills__item">Git</li>
                <li class="profile-skills__item">AI</li>
              </ul>
            </div>
          </div>
        </BaseContainer>
      </AppSection>

      <!-- Links Section -->
      <AppSection padding="top">
        <BaseContainer>
          <div class="profile-links__grid">
            <NuxtLink to="/works" class="profile-links__item">
              <div class="profile-links__image-wrapper">
                <img src="/images/works/img_works.jpg" alt="Works" class="profile-links__image" />
                <div class="profile-links__overlay"></div>
              </div>
              <div class="profile-links__content">
                <h3 class="profile-links__title">Works</h3>
                <p class="profile-links__text">実績一覧ページを見る</p>
                <BaseButton variant="primary" size="medium" class="profile-links__button">
                  View Works
                </BaseButton>
              </div>
            </NuxtLink>
            <NuxtLink to="/tools" class="profile-links__item">
              <div class="profile-links__image-wrapper">
                <img src="/images/img_about_gallery.jpg" alt="Gallery" class="profile-links__image" />
                <div class="profile-links__overlay"></div>
              </div>
              <div class="profile-links__content">
                <h3 class="profile-links__title">Tools</h3>
                <p class="profile-links__text">ツール一覧ページを見る</p>
                <BaseButton variant="primary" size="medium" class="profile-links__button">
                  View Tools
                </BaseButton>
              </div>
            </NuxtLink>
          </div>
        </BaseContainer>
      </AppSection>

      <!-- Contact Section -->
      <FeaturesContactCard />
    </div>
  </AppLowerPage>
</template>

<script setup lang="ts">
useHead({
  title: 'プロフィール - ポートフォリオサイト',
  meta: [
    {
      name: 'description',
      content:
        '堤 颯輝のプロフィールページです。WEB制作、フロントエンド開発、デザインについて紹介しています。',
    },
  ],
});
</script>

<style lang="scss" scoped>
.profile-page {
  width: 100%;
}

// Main Visual Section
.profile__mv {
  padding-block: s(60) s(80);
  background-color: $color_bg_base;

  @include media($bp_tab) {
    padding-block: s(40) s(60);
  }
}

.profile-mv {
  &__content {
    max-width: s(900);
    margin-inline: auto;
    @include media($bp_tab) {
      display: flex;
      gap: s(40);
      justify-content: center;
    }

    @include media($bp_tabL) {
      gap: s(40);
    }
  }

  &__image-wrapper {
    width: 100%;
    max-width: s(400);
    aspect-ratio: 1 / 1;
    border: s(4) solid $color_base_black;
    border-radius: 100vh;
    overflow: hidden;
    box-shadow: s(-8) s(8) 0 0 rgba(#000, 0.2);
    margin: 0 auto;
    order: 1;
    padding: s(16);
    max-width: s(300);
    margin-bottom: s(24);

    @include media($bp_tab) {
      width: 38%;
      height: fit-content;
    }

    @include media($bp_pc) {
      max-width: s(500);
      order: 2;
      margin: 0;
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
    transform: scale(1.05);
    object-position: center 40%;
  }

  &__text-wrapper {

    @include media($bp_tab) {
      flex-basis: 0;
      flex-grow: 1;
    }
  }

  &__title {
    text-align: center;

    @include media($bp_tab) {
      text-align: left;
    }
  }

  &__text-content {
    display: flex;
    flex-direction: column;
    gap: s(24);
  }

  &__text {
    font-family: $font-f_notosans;
    font-size: s(14);
    line-height: 1.8;
    color: $color_text_primary;
    margin: 0;

    @include media($bp_pc) {
      font-size: s(16);
    }
  }
}

// Catch Section
.profile__catch {
  padding-block: s(80) s(60);
  background-color: $color_bg_base;

  @include media($bp_tab) {
    padding-block: s(60) s(40);
  }
}

.profile-catch {
  &__title {
    font-family: $font-f_rocknroll-one;
    font-weight: 500;
    font-size: s(26);
    line-height: 1.3;
    color: $color_text_primary;
    margin: 0;

    @include media($bp_tabL) {
      font-size: s(32);
    }

    @include media($bp_pc) {
      font-size: s(48);
    }
  }

  &__jp {
    font-family: $font-f_notosans;
    font-weight: 700;
    font-size: s(18);
    line-height: 1.5;
    color: $color_text_primary;
    margin: s(24) 0 0;

    @include media($bp_pc) {
      font-size: s(24);
      margin-top: s(32);
    }
  }

  &__text {
    margin-top: s(32);
    display: flex;
    flex-direction: column;
    gap: s(16);

    p {
      font-family: $font-f_notosans;
      font-size: s(14);
      line-height: 1.8;
      color: $color_text_secondary;
      margin: 0;

      @include media($bp_pc) {
        font-size: s(16);
      }
    }
  }
}

// Values Section
.profile__values {
  padding-block: s(80) s(60);
  background-color: $color_bg_base;

  @include media($bp_tab) {
    padding-block: s(60) s(40);
  }
}

.profile-values {
  &__list {
    display: grid;
    grid-template-columns: 1fr;
    gap: s(32);
    list-style: none;
    margin: 0;
    padding: 0;

    @include media($bp_tabL) {
      grid-template-columns: repeat(3, 1fr);
      gap: s(24);
    }

    @include media($bp_pc) {
      gap: s(40);
    }
  }

  &__item {
    padding: s(32) s(24);
    border: s(3) solid $color_base_black;
    background-color: $color_bg_base;
    border-radius: s(16);
    box-shadow: s(-4) s(4) 0 0 rgba(0, 0, 0, 0.2);
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: s(16);
    min-height: s(280);

    @include media($bp_pc) {
      padding: s(40) s(32);
      min-height: s(300);
    }
  }

  &__en {
    font-family: $font-f_rocknroll-one;
    font-size: s(14);
    line-height: 1.4;
    background-color: $color_base_black;
    color: $color_accent_primary;
    padding: s(8) s(16);
    border-radius: s(8);
    margin: 0;
    position: relative;

    @include media($bp_pc) {
      font-size: s(18);
      padding: s(12) s(20);
    }

    &::before,
    &::after {
      content: '';
      display: block;
      width: s(20);
      height: s(20);
      border-radius: 50%;
      background-color: $color_base_white;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      box-shadow: s(4) s(4) 0 0 rgba(0, 0, 0, 0.1);

      @include media($bp_pc) {
        width: s(24);
        height: s(24);
      }
    }

    &::before {
      left: s(16);
    }

    &::after {
      right: s(16);
    }
  }

  &__title {
    font-family: $font-f_notosans;
    font-weight: 700;
    font-size: s(24);
    line-height: 1.4;
    color: $color_text_primary;
    margin: s(16) 0 0;
    padding-bottom: s(16);
    border-bottom: s(2) solid $color_base_black;
    position: relative;

    @include media($bp_pc) {
      font-size: s(28);
    }
  }

  &__text {
    font-family: $font-f_notosans;
    font-size: s(14);
    line-height: 1.8;
    color: $color_text_secondary;
    margin: s(16) 0 0;
    flex: 1;

    @include media($bp_pc) {
      font-size: s(16);
    }
  }
}

// Skills Section
.profile__skills {
  padding-block: s(80) s(60);
  background-color: $color_bg_base;

  @include media($bp_tab) {
    padding-block: s(60) s(40);
  }
}

.profile-skills {
  &__title {
    text-align: center;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: s(32);

    @include media($bp_tabL) {
      grid-template-columns: repeat(3, 1fr);
      gap: s(24);
    }

    @include media($bp_pc) {
      gap: s(40);
    }
  }

  &__category {
    padding: s(24);
    border: s(3) solid $color_base_black;
    background-color: $color_bg_base;
    border-radius: s(16);
    box-shadow: s(-4) s(4) 0 0 rgba(0, 0, 0, 0.2);

    @include media($bp_pc) {
      padding: s(32);
    }
  }

  &__category-title {
    font-family: $font-f_rocknroll-one;
    font-weight: 700;
    font-size: s(20);
    line-height: 1.4;
    color: $color_text_primary;
    margin: 0 0 s(20);
    padding-bottom: s(12);
    border-bottom: s(2) solid $color_base_black;

    @include media($bp_pc) {
      font-size: s(24);
      margin-bottom: s(24);
      padding-bottom: s(16);
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: s(12);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__item {
    font-family: $font-f_notosans;
    font-size: s(14);
    line-height: 1.5;
    color: $color_text_primary;
    padding: s(12) s(16);
    border: s(2) solid $color_base_black;
    background-color: $color_bg_button;
    border-radius: s(8);
    box-shadow: s(-2) s(2) 0 0 rgba(0, 0, 0, 0.1);

    @include media($bp_pc) {
      font-size: s(16);
      padding: s(14) s(20);
    }

    @include mode($theme_dark) {
      background-color: $color_bg_tag;
    }
  }
}

// Links Section
.profile__links {
  padding-block: s(80) s(60);
  background-color: $color_bg_base;

  @include media($bp_tab) {
    padding-block: s(60) s(40);
  }
}

.profile-links {
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: s(24);

    @include media($bp_tabL) {
      grid-template-columns: repeat(2, 1fr);
      gap: s(32);
    }
  }

  &__item {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: s(400);
    border: s(4) solid $color_base_black;
    border-radius: s(16);
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: all $transition_normal;

    @include hover {
      transform: translate(s(-2), s(-2));
      box-shadow: s(-8) s(8) 0 0 $color_base_black;
    }

    @include media($bp_pc) {
      min-height: s(500);
    }
  }

  &__image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
    z-index: 2;
  }

  &__content {
    position: relative;
    z-index: 3;
    padding: s(32);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    gap: s(16);
    color: $color_base_white;

    @include media($bp_pc) {
      padding: s(48);
      gap: s(24);
    }

    @include mode($theme_dark) {
      color: $color_base_black;
    }
  }

  &__title {
    font-family: $font-f_rocknroll-one;
    font-weight: 700;
    font-size: s(32);
    line-height: 1.2;
    margin: 0;

    @include media($bp_pc) {
      font-size: s(40);
    }
  }

  &__text {
    font-family: $font-f_notosans;
    font-size: s(14);
    line-height: 1.6;
    margin: 0;

    @include media($bp_pc) {
      font-size: s(16);
    }
  }

  &__button {
    margin-top: s(8);
    align-self: flex-start;
  }
}
</style>
