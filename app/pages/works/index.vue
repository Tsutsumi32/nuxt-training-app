<template>
  <AppLowerPage>
    <div class="works-page">
      <!-- Header Section -->
      <section class="works__header works-header">
        <BaseContainer>
          <div class="works-header__title">
            <BaseSectionTitle tag="h1">WORKS</BaseSectionTitle>
          </div>
          <p class="works-header__description">制作実績を紹介いたします</p>
        </BaseContainer>
      </section>

      <!-- Category Filter -->
      <section v-if="categories.length > 0" class="works__filters works-filters">
        <BaseContainer>
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
        </BaseContainer>
      </section>

      <!-- Works List -->
      <section class="works__list works-list">
        <BaseContainer>
          <ul v-if="worksList.length > 0" class="works-list__grid">
            <li v-for="work in worksList" :key="work.id">
              <FeaturesWorksWorkCard :work="work" />
            </li>
          </ul>
          <div v-else-if="isLoading" class="works-list__loading">
            <p>実績データを読み込み中...</p>
          </div>
          <div v-else class="works-list__empty">
            <p>該当する実績がありません</p>
          </div>
        </BaseContainer>
      </section>

      <!-- Contact Section -->
      <FeaturesContactCard />
    </div>
  </AppLowerPage>
</template>

<script setup lang="ts">
import type { Works, WorksCategory, WorksListResponse } from '~/types/works';

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
const { data: worksResponse, pending: isLoadingWorks } = await useFetch<WorksListResponse>(
  '/api/works',
  {
    params: {
      limit: 100,
      offset: 0,
      // カテゴリフィルタはクライアント側で行うため、ビルド時は全データを取得
    },
    default: () => ({ contents: [], totalCount: 0, limit: 100, offset: 0 }),
    onResponseError({ response }: { response: { _data: any } }) {
      console.error('Failed to load works:', response._data);
    },
  }
);

// Works一覧（クライアント側でカテゴリフィルタリング）
// SSGではビルド時に全データが取得されているため、クライアント側でフィルタリング
const worksList = computed(() => {
  const allWorks = worksResponse.value?.contents || [];

  // カテゴリが'All'の場合は全データを返す
  if (selectedCategory.value === 'All') {
    return allWorks;
  }

  // 選択されたカテゴリでフィルタリング
  return allWorks.filter((work: Works) => work.category?.id === selectedCategory.value);
});

const isLoading = computed(() => isLoadingWorks.value);

// カテゴリを選択
const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId;
  // worksListのcomputedが自動的に再計算される
};
</script>

<style lang="scss" scoped>
.works-page {
  width: 100%;
}

// Header Section
.works__header {
  padding-bottom: s(40);
  background-color: $color_bg_base;

  @include media($bp_pc) {
    padding-bottom: s(60);
  }
}

.works-header {
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
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: s(12);
    width: fit-content;
    margin-inline: auto;

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
      color: $color_text_primary;
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
  padding-top: s(60);
  background-color: $color_bg_base;

  @include media($bp_tab) {
    padding-top: s(40);
  }
}

.works-list {
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: s(24);
    list-style: none;
    padding: 0;
    margin: 0;

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
</style>
