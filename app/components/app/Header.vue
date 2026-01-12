<template>
  <header class="header">
    <div class="header__container">
      <NuxtLink to="/" class="header__brand" @click="closeMenu">
        <img :src="logoPath" alt="Hero image" class="hero__image" />
      </NuxtLink>
      <div class="header__contents">
        <nav ref="navElement" class="header__nav" :class="{ 'is-open': isMenuOpen }">
          <NuxtLink
            to="/profile"
            class="header__nav-link"
            :class="{ 'is-active': isActive('/profile') }"
            @click="closeMenu"
          >
            Profile
          </NuxtLink>
          <NuxtLink
            to="/works"
            class="header__nav-link"
            :class="{ 'is-active': isActive('/works') }"
            @click="closeMenu"
          >
            Works
          </NuxtLink>
          <NuxtLink
            to="/tools"
            class="header__nav-link"
            :class="{ 'is-active': isActive('/tools') }"
            @click="closeMenu"
          >
            Tools
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="header__nav-link"
            :class="{ 'is-active': isActive('/contact') }"
            @click="closeMenu"
          >
            Contact
          </NuxtLink>
        </nav>
        <button class="header__theme-toggle" aria-label="テーマ切り替え" @click="toggleTheme">
          <span v-if="isDark" class="header__theme-icon">☀️</span>
          <span v-else class="header__theme-icon">🌙</span>
        </button>
        <button
          class="header__hamburger"
          :class="{ 'is-open': isMenuOpen }"
          aria-label="メニューを開く"
          aria-expanded="isMenuOpen"
          @click="toggleMenu"
        >
          <span class="header__hamburger-line"></span>
          <span class="header__hamburger-line"></span>
          <span class="header__hamburger-line"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { fadeIn, fadeOut } from '~/utils/fadeAnimation';

const route = useRoute();
const { isDark, toggleTheme } = useTheme();

// テーマに応じてロゴのパスを切り替え
const logoPath = computed(() => {
  return isDark.value ? '/images/logo.png' : '/images/logo_black.png';
});

const isMenuOpen = ref(false);
const navElement = ref<HTMLElement | null>(null);

const isActive = (path: string) => {
  return route.path.startsWith(path);
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

// メニューの表示・非表示をfadeAnimationで制御
watch(
  () => isMenuOpen.value,
  (newValue: boolean) => {
    if (typeof window === 'undefined') return;

    const navEl = navElement.value;

    if (newValue) {
      // メニューを開く
      if (navEl) {
        navEl.style.opacity = '0';
        fadeIn(navEl, 300, false);
      }
    } else {
      // メニューを閉じる
      if (navEl) {
        fadeOut(navEl, 300, false);
      }
    }
  },
  { immediate: false }
);

// ルート変更時にメニューを閉じる
watch(
  () => route.path,
  () => {
    closeMenu();
  }
);
</script>

<style lang="scss" scoped>
.header {
  border: s(2) solid $color_base_black;
  background-color: $color_bg_base;
  position: fixed;
  top: s(16);
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  border-radius: 100vh;
  width: calc(100% - s(12));
  height: s($height_header_sp);

  @include media($bp_pc) {
    height: s($height_header_pc);
    width: calc(100% - s(20));
  }

  @include mode($theme_dark) {
    border: s(2) solid $color_base_accent;
  }

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    padding-inline: s(16);
    gap: s(40);
    position: relative;

    @include media($bp_tab) {
      gap: s(16);
    }

    @include media($bp_pc) {
      padding-inline: s(40);
    }
  }

  &__contents {
    display: flex;
    align-items: center;
    gap: s(16);

    @include media($bp_pc) {
      gap: s(30);
    }
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: s(12);
    text-decoration: none;
    color: inherit;

    img {
      width: s(100);
      @include media($bp_tab) {
        width: s(120);
      }

      @include media($bp_pc) {
        width: s(150);
      }
    }
  }

  &__nav {
    gap: s(8);
    align-items: center;
    position: absolute;
    top: calc(100% + s(8));
    left: 0;
    background-color: $color_base_black;
    border-radius: s(16);
    box-shadow: s(0) s(8) s(24) rgba(0, 0, 0, 0.1);
    padding: s(16);
    flex-direction: column;
    z-index: 101;
    opacity: 0;
    pointer-events: none;
    width: 100%;
    display: flex;

    &.is-open {
      pointer-events: auto;
    }

    @include media($bp_pc) {
      position: static;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      background-color: transparent;
      box-shadow: none;
      padding: 0;
      margin: 0;
      transform: none;
      opacity: 1 !important;
      pointer-events: auto;
      width: auto;
    }
  }

  &__nav-link {
    padding: s(15) s(27);
    @include font(18, 155.5, 0, 500);
    color: $color_base_white;
    text-decoration: none;
    transition: all $transition_normal;
    display: inline-block;
    width: 100%;
    text-align: center;
    border-radius: s(8);

    @include hover {
      color: $color_accent_primary;
    }

    &.is-active,
    &.router-link-active,
    &.router-link-exact-active {
      color: $color_accent_primary;
    }

    @include media($bp_pc) {
      color: $color_text_primary;
      width: auto;
      text-align: left;
      padding: s(10) s(18);
    }
  }

  &__theme-toggle {
    background: transparent;
    background-color: $color_accent_light;
    border-radius: 100vh;
    border: s(2) solid transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all $transition_normal;
    width: s(38);
    height: s(38);

    @include media($bp_pc) {
      width: s(48);
      height: s(48);
    }

    @include hover {
      border: s(2) solid $color_accent_primary;
    }
  }

  &__theme-icon {
    font-size: s(20);
    line-height: 1;

    @include media($bp_pc) {
      font-size: s(24);
    }
  }

  &__hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: s(38);
    height: s(38);
    background: transparent;
    border: s(2) solid transparent;
    border-radius: 100vh;
    background-color: $color_accent_light;
    cursor: pointer;
    gap: s(5);
    padding: s(8);
    transition: all $transition_normal;
    position: relative;
    z-index: 200;

    @include media($bp_pc) {
      display: none;
    }

    @include hover {
      border: s(2) solid $color_accent_primary;
    }

    &.is-open {
      .header__hamburger-line {
        &:nth-child(1) {
          transform: translateY(s(7)) rotate(45deg);
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:nth-child(3) {
          transform: translateY(s(-7)) rotate(-45deg);
        }
      }
    }
  }

  &__hamburger-line {
    width: s(18);
    height: s(2);
    background-color: $color_base_black;
    border-radius: s(2);
    transition: all $transition_normal;

    @include mode($theme_dark) {
      background-color: $color_base_white;
    }
  }
}
</style>
