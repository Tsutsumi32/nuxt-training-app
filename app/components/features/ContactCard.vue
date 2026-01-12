<template>
  <AppSection padding="top">
    <div class="contact">
      <BaseContainer>
        <div class="contact__header">
          <BaseSectionTitle>CONTACT</BaseSectionTitle>
        </div>
        <div class="contact__card">
          <h2 class="contact__title">一緒にモノづくりをしましょう！</h2>
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
  </AppSection>
</template>

<script setup lang="ts">
// このコンポーネントは特にpropsを必要としない
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '~/assets/scss/utils' as *;

// Contact Section
.contact {
  &__header {
    text-align: center;
  }

  &__card {
    padding: s(48) s(24);
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
    font-family: $font-f_notosans;
    font-weight: 700;
    font-size: s(30);
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
    font-size: s(15);
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
