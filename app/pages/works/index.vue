<template>
  <div class="works-page">
    <!-- Header Section -->
    <section class="works__header works-header">
      <div class="works-header__container">
        <h1 class="works-header__title">Works</h1>
        <p class="works-header__description">制作実績を紹介します</p>
      </div>
    </section>

    <!-- Category Filter -->
    <section v-if="categories.length > 0" class="works__filters works-filters">
      <div class="works-filters__container">
        <div class="works-filters__list">
          <button
            v-for="category in categories"
            :key="category.id"
            :class="['works-filters__button', { 'is-active': selectedCategory === category.id }]"
            @click="selectCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Works List -->
    <section class="works__list works-list">
      <div class="works-list__container">
        <div v-if="worksList.length > 0" class="works-list__grid">
          <NuxtLink
            v-for="work in worksList"
            :key="work.id"
            :to="`/works/${work.id}`"
            class="works-list__item works-item"
          >
            <div class="works-item__image-wrapper">
              <img
                :src="work.thumbnail.url"
                :alt="work.title"
                class="works-item__image"
                :width="work.thumbnail.width"
                :height="work.thumbnail.height"
              />
              <span class="works-item__category">{{ work.category.name }}</span>
            </div>
            <div class="works-item__content">
              <h3 class="works-item__title" v-html="work.title"></h3>
              <p class="works-item__client">{{ work.client }}</p>
            </div>
          </NuxtLink>
        </div>
        <div v-else-if="isLoading" class="works-list__loading">
          <p>実績データを読み込み中...</p>
        </div>
        <div v-else class="works-list__empty">
          <p>該当する実績がありません</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { WorksCategory, WorksListResponse } from '~/types/works';

useHead({
  title: '実績紹介 - ポートフォリオサイト',
  meta: [
    {
      name: 'description',
      content: 'Webサイト制作、LP制作、アプリ開発などの制作実績を紹介しています。',
    },
  ],
});

// カテゴリ一覧
const categories = ref<WorksCategory[]>([]);
const selectedCategory = ref<string>('All');

// カテゴリを取得（useFetchでサーバーサイド実行）
const { data: categoriesData } = await useFetch<WorksCategory[]>('/api/works/categories', {
  default: () => [],
  transform: (data: WorksCategory[]) => {
    return [...(data || []), { id: 'All', name: 'All' }];
  },
  onResponseError({ response }: { response: { _data: any } }) {
    console.error('Failed to load categories:', response._data);
  },
});

// カテゴリ一覧を設定
if (categoriesData.value) {
  categories.value = categoriesData.value;
}

// Works一覧を取得（useFetchでサーバーサイド実行）
// selectedCategoryが変更されたときに自動的に再取得される
const { data: worksResponse, pending: isLoadingWorks } = await useFetch<WorksListResponse>(
  () => '/api/works',
  {
    params: computed(() => ({
      limit: 100,
      offset: 0,
      categoryId: selectedCategory.value === 'All' ? undefined : selectedCategory.value,
    })),
    default: () => ({ contents: [], totalCount: 0, limit: 100, offset: 0 }),
    watch: [selectedCategory],
    onResponseError({ response }: { response: { _data: any } }) {
      console.error('Failed to load works:', response._data);
    },
  }
);

// Works一覧
const worksList = computed(() => worksResponse.value?.contents || []);
const isLoading = computed(() => isLoadingWorks.value);

// カテゴリを選択
const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId;
  // useFetchのwatchにより自動的に再取得される
};
</script>

<style lang="scss" scoped>
@use '../../../assets/scss/utils/index' as *;

.works-page {
  width: 100%;
}

// Header Section
.works__header {
  padding-block: s(60) s(40);
  background-color: $color_bg_base;

  @include media($bp_tab) {
    padding-block: s(40) s(32);
  }
}

.works-header {
  &__container {
    @include container;
    max-width: 1200px;
    text-align: center;
  }

  &__title {
    font-family: $font-f_rocknroll-one;
    font-weight: 500;
    font-size: s(40);
    line-height: 1.2;
    color: $color_text_primary;
    margin: 0 0 s(16);

    @include media($bp_pc) {
      font-size: s(48);
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
}

// Filters Section
.works__filters {
  padding-block: s(24) s(40);
  background-color: $color_bg_base;
  border-top: s(2) solid $color_base_black;
  border-bottom: s(2) solid $color_base_black;
}

.works-filters {
  &__container {
    @include container;
    max-width: 1200px;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: s(12);
    justify-content: center;

    @include media($bp_pc) {
      gap: s(16);
    }
  }

  &__button {
    font-family: $font-f_notosans;
    font-size: s(14);
    line-height: 1.5;
    color: $color_text_primary;
    padding: s(12) s(24);
    border: s(2) solid $color_base_black;
    background-color: $color_bg_base;
    border-radius: s(8);
    cursor: pointer;
    transition: all $transition_normal;

    @include hover {
      background-color: $color_bg_hover;
      transform: translate(s(-2), s(-2));
      box-shadow: s(4) s(4) 0 0 rgba(0, 0, 0, 1);
    }

    &.is-active {
      background-color: $color_accent_primary;
      color: $color_base_black;
      font-weight: 700;
    }

    @include media($bp_pc) {
      font-size: s(16);
      padding: s(14) s(28);
    }
  }
}

// Works List Section
.works__list {
  padding-block: s(60) s(80);
  background-color: $color_bg_base;

  @include media($bp_tab) {
    padding-block: s(40) s(60);
  }
}

.works-list {
  &__container {
    @include container;
    max-width: 1200px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(s(300), 1fr));
    gap: s(24);

    @include media($bp_pc) {
      grid-template-columns: repeat(auto-fill, minmax(s(350), 1fr));
      gap: s(32);
    }
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

// Works Item
.works-item {
  display: flex;
  flex-direction: column;
  border: s(4) solid $color_base_black;
  background-color: $color_bg_base;
  border-radius: s(8);
  box-shadow: s(-6) s(6) 0 0 rgba(0, 0, 0, 1);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all $transition_normal;

  @include hover {
    transform: translate(s(-2), s(-2));
    box-shadow: s(-8) s(8) 0 0 rgba(0, 0, 0, 1);
  }

  &__image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background-color: $color_bg_base;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform $transition_normal;
  }

  @include hover {
    transform: scale(1.05);
  }

  &__category {
    position: absolute;
    top: s(12);
    right: s(12);
    font-family: $font-f_notosans;
    font-size: s(12);
    line-height: 1.4;
    color: $color_base_black;
    background-color: $color_base_white;
    padding: s(6) s(12);
    border-radius: s(100);
    border: s(2) solid $color_base_black;
    font-weight: 500;

    @include media($bp_pc) {
      font-size: s(14);
      padding: s(8) s(16);
    }
  }

  &__content {
    padding: s(20);
    display: flex;
    flex-direction: column;
    gap: s(8);
    flex: 1;

    @include media($bp_pc) {
      padding: s(24);
      gap: s(12);
    }
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

  &__client {
    font-family: $font-f_notosans;
    font-size: s(14);
    line-height: 1.5;
    color: $color_text_secondary;
    margin: 0;

    @include media($bp_pc) {
      font-size: s(16);
    }
  }
}
</style>
