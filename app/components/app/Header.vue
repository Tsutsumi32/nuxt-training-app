<template>
  <header class="header">
    <div class="header__container">
      <NuxtLink to="/" class="header__brand">
        <span class="header__brand-text">Figma</span>
        <svg
          class="header__brand-icon"
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
      </NuxtLink>
      <nav class="header__nav">
        <NuxtLink to="/works" class="header__nav-link" :class="{ 'is-active': isActive('/works') }">
          Works
        </NuxtLink>
        <NuxtLink to="/tools" class="header__nav-link" :class="{ 'is-active': isActive('/tools') }">
          Tools
        </NuxtLink>
        <NuxtLink
          to="/profile"
          class="header__nav-link"
          :class="{ 'is-active': isActive('/profile') }"
        >
          About
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="header__nav-link"
          :class="{ 'is-active': isActive('/contact') }"
        >
          Contact
        </NuxtLink>
      </nav>
      <button class="header__theme-toggle" aria-label="テーマ切り替え" @click="toggleTheme">
        <span v-if="isDark" class="header__theme-icon">☀️</span>
        <span v-else class="header__theme-icon">🌙</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();
const { isDark, toggleTheme } = useTheme();

const isActive = (path: string) => {
  return route.path.startsWith(path);
};

const colorVar = (group: string, name: string) => {
  return `var(--color-${group}-${name})`;
};
</script>

<style lang="scss" scoped>
@use '../../assets/scss/utils/index' as *;

.header {
  border-bottom: s(8) solid $color_base_black;
  background-color: $color_bg_base;
  position: sticky;
  top: 0;
  z-index: 100;

  &__container {
    @include container;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: s(16);
    padding-inline: s(108.5);
    gap: s(40);
    display: none;

    @include media($bp_tab) {
      padding-inline: s(24);
      gap: s(16);
    }
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: s(12);
    text-decoration: none;
    color: inherit;

    &-text {
      font-family: $font-f_notosans;
      font-weight: 500;
      font-size: s(30);
      line-height: 1.2;
      letter-spacing: 0;
      color: $color_text_dark;
    }

    &-icon {
      flex-shrink: 0;
    }
  }

  &__nav {
    display: flex;
    gap: s(8);
    align-items: center;
  }

  &__nav-link {
    padding: s(15) s(27);
    font-family: $font-f_notosans;
    font-weight: 500;
    font-size: s(18);
    line-height: 1.555;
    letter-spacing: 0;
    color: $color_base_black;
    text-decoration: none;
    background-color: $color_bg_base;
    border: s(3) solid $color_accent_primary;
    border-radius: s(8);
    transition: all $transition_normal;
    display: inline-block;

    @include hover {
      background-color: $color_accent_light;
    }

    &.is-active,
    &.router-link-active,
    &.router-link-exact-active {
      background-color: $color_accent_primary;
      color: $color_base_black;
    }

    @include media($bp_tab) {
      padding: s(12) s(20);
      font-size: s(16);
    }
  }

  &__theme-toggle {
    background: transparent;
    border: s(3) solid $color_accent_primary;
    border-radius: s(8);
    padding: s(12);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all $transition_normal;
    width: s(48);
    height: s(48);

    @include hover {
      background-color: $color_accent_light;
    }
  }

  &__theme-icon {
    font-size: s(24);
    line-height: 1;
  }

  @include media($bp_tab) {
    &__brand-text {
      font-size: s(24);
    }

    &__brand-icon {
      width: s(40);
      height: s(40);
    }

    &__nav {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
}
</style>
