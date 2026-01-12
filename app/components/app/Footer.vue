<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__main">
        <div class="footer__brand">
          <NuxtLink to="/" class="footer__brand__logo">
            <img :src="logoPath" alt="Hero image" class="hero__image" />
          </NuxtLink>
        </div>
        <div class="footer__nav-section">
          <ul class="footer__nav-list">
            <li class="footer__nav-item">
              <NuxtLink to="/profile" class="footer__nav-link">Profile</NuxtLink>
            </li>
            <li class="footer__nav-item">
              <NuxtLink to="/works" class="footer__nav-link">Works</NuxtLink>
            </li>
            <li class="footer__nav-item">
              <NuxtLink to="/tools" class="footer__nav-link">Tools</NuxtLink>
            </li>
            <li class="footer__nav-item">
              <NuxtLink to="/contact" class="footer__nav-link">Contact</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <p class="footer__copyright">© {{ currentYear }} All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { isDark } = useTheme();

// テーマに応じてロゴのパスを切り替え
const logoPath = computed(() => {
  return isDark.value ? '/images/logo.png' : '/images/logo_black.png';
});

const currentYear = new Date().getFullYear();
</script>

<style lang="scss" scoped>
.footer {
  border-top: s(4) solid $color_base_black;
  background-color: $color_bg_base;
  margin-top: auto;
  margin-top: s(100);

  @include media($bp_tab) {
    margin-top: s(120);
  }

  @include media($bp_pc) {
    margin-top: s(150);
  }

  &__container {
    @include container;
    padding-block: s(52) 0;
    padding-left: s(40);
    display: flex;
    flex-direction: column;
    gap: s(32);

    @include media($bp_tab) {
      padding-block: s(40) 0;
      padding-inline: s(24);
      gap: s(32);
    }
  }

  &__main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: s(48);

    @include media($bp_tab) {
      grid-template-columns: 1fr;
      gap: s(32);
      padding-inline: 0;
    }
  }

  &__brand {
    display: flex;
    flex-direction: column;
    gap: s(24);

    &__logo {
      display: flex;
      align-items: center;
      gap: s(12);
      width: s(140);

      @include media($bp_tab) {
        margin-inline: auto;
      }

      @include media($bp_pc) {
        width: s(180);
      }
    }

    &__text {
      @include font('noto-sans-jp', 30, 1.2, 0, 400);
      color: $color_text_dark;
    }

    &__icon {
      flex-shrink: 0;
    }
  }

  &__nav-section {
    display: flex;
    flex-direction: column;
    gap: s(16);
  }

  &__nav-title {
    @include font('noto-sans-jp', 20, 1.4, 0, 700);
    color: $color_text_primary;
    margin: 0;
  }

  &__nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: s(8);

    @include media($bp_tab) {
      flex-direction: row;
      justify-content: center;
      gap: 0;
    }
  }

  &__nav-item {
    margin: 0;
  }

  &__nav-link {
    @include font('noto-sans-jp', 16, 1.5, 0, 500);
    color: $color_text_secondary;
    text-decoration: none;
    transition: color $transition_normal;
    display: inline-block;

    @include media($bp_tab) {
      padding-block: s(4);
      padding-inline: s(16);
    }

    @include hover {
      color: $color_accent_primary;
    }
  }

  &__bottom {
    border-top: s(3) solid $color_border_light;
    padding-block: s(35) 0;
    text-align: center;
  }

  &__copyright {
    @include font('noto-sans-jp', 14, 1.428, 0, 400);
    color: $color_text_secondary;
    margin: 0;
  }

  @include media($bp_tab) {
    &__brand {
      &__text {
        font-size: s(24);
      }

      &__icon {
        width: s(40);
        height: s(40);
      }
    }
  }
}
</style>
