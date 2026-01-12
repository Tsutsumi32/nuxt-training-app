<template>
  <NuxtLink :to="`/works/${work.id}`" class="work-card">
    <div class="work-card__image">
      <img
        :src="work.thumbnail.url"
        :alt="work.title"
        class="work-card__img"
        :width="work.thumbnail.width"
        :height="work.thumbnail.height"
      />
    </div>
    <div class="work-card__content">
      <div class="work-card__text">
        <h3 class="work-card__title">
          <template v-for="(line, index) in work.title.split(/<br\s*\/?>/i)" :key="index">
            <template v-if="Number(index) > 0"><br /></template>
            {{ line }}
          </template>
        </h3>
        <div>
          <p class="work-card__category">{{ work.category.name }}</p>
          <p class="work-card__description">{{ formatClient(work.client) }}</p>
        </div>
      </div>
      <div class="work-card__arrow">
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
</template>

<script setup lang="ts">
import type { Works } from '~/types/works';
import { formatClient } from '~/utils/formatters';

defineProps<{
  work: Works;
}>();
</script>

<style lang="scss" scoped>
.work-card {
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
  height: 100%;

  @include hover {
    transform: translate(s(-2), s(-2));
    box-shadow: s(-8) s(8) 0 0 $color_base_black;
    background-color: $color_bg_hover;
  }

  @include media($bp_tab) {
    padding: s(20);
  }

  &__image {
    width: 100%;
    aspect-ratio: 5 / 3.5;
    border: s(3) solid $color_base_black;
    border-radius: s(4);
    overflow: hidden;
    background-color: $color_bg_base;
    padding: s(5) s(10);
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: s(16);
    flex: 1;
  }

  &__text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: s(4);
    flex: 1;
    height: 100%;
  }

  &__title {
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

  &__category {
    font-family: $font-f_notosans;
    font-size: s(12);
    line-height: 1.5;
    color: $color_text_secondary;
    margin: 0;

    @include media($bp_pc) {
      font-size: s(14);
    }
  }

  &__description {
    font-family: $font-f_notosans;
    font-size: s(12);
    line-height: 1.5;
    color: $color_text_primary;
    margin: 0;
    border: s(2) solid $color_base_black;
    width: fit-content;
    border-radius: 100vh;
    padding: s(1) s(16);
    margin-top: s(8);

    @include media($bp_pc) {
      font-size: s(14);
    }
  }

  &__arrow {
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
}
</style>
