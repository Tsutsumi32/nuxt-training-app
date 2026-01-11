<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__main">
        <div class="footer__brand">
          <div class="footer__brand__logo">
            <span class="footer__brand__text">Figma</span>
            <svg
              class="footer__brand__icon"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.5 10V38C20.5 39.933 18.933 41.5 17 41.5C15.067 41.5 13.5 39.933 13.5 38V10C13.5 8.067 15.067 6.5 17 6.5C18.933 6.5 20.5 8.067 20.5 10Z"
                :fill="colorVar('base', 'black')"
              />
              <path
                d="M34.5 17.5V38C34.5 39.933 32.933 41.5 31 41.5C29.067 41.5 27.5 39.933 27.5 38V17.5C27.5 15.567 29.067 14 31 14C32.933 14 34.5 15.567 34.5 17.5Z"
                :fill="colorVar('base', 'black')"
              />
            </svg>
          </div>
        </div>
        <div class="footer__nav-section">
          <h3 class="footer__nav-title">Figma</h3>
          <ul class="footer__nav-list">
            <li class="footer__nav-item">
              <NuxtLink to="/" class="footer__nav-link">Figma</NuxtLink>
            </li>
            <li class="footer__nav-item">
              <a href="#" class="footer__nav-link">Framer</a>
            </li>
            <li class="footer__nav-item">
              <a href="#" class="footer__nav-link">Webflow</a>
            </li>
            <li class="footer__nav-item">
              <a href="#" class="footer__nav-link">Notion</a>
            </li>
            <li class="footer__nav-item">
              <a href="#" class="footer__nav-link">Lottie</a>
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
const currentYear = new Date().getFullYear();

const colorVar = (group: string, name: string) => {
  return `var(--color-${group}-${name})`;
};
</script>

<style lang="scss" scoped>
.footer {
  border-top: s(4) solid $color_base_black;
  background-color: $color_bg_base;
  margin-top: auto;

  &__container {
    @include container;
    padding-block: s(52) 0;
    padding-inline: s(84.5);
    display: flex;
    flex-direction: column;
    gap: s(48);

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
    padding-inline: s(24);

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

    @include hover {
      color: $color_text_primary;
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
