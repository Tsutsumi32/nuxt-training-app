<template>
  <AppLowerPage>
    <div class="works-detail-page">
      <div v-if="work" class="works-detail">
        <!-- Main Visual -->
        <section class="works-detail__mv works-detail-mv">
          <BaseContainer class="works-detail-mv__wrapper">
            <div class="works-detail-mv__image-wrapper">
              <img
                :src="work.thumbnail.url"
                :alt="work.title"
                class="works-detail-mv__image"
                :width="work.thumbnail.width"
                :height="work.thumbnail.height"
              />
            </div>
            <div class="works-detail-mv__info-wrapper">
              <h1 class="works-detail-mv__title">
                <template v-for="(line, index) in work.title.split(/<br\s*\/?>/i)" :key="index">
                  <template v-if="Number(index) > 0"><br /></template>
                  {{ line }}
                </template>
              </h1>
              <div class="works-detail-mv__info">
                <p class="works-detail-mv__category">{{ work.category.name }}</p>
                <div v-if="work.category" class="works-detail-mv__data-list">
                  <div v-if="work.launch_date" class="works-detail-mv__data">
                    <span class="works-detail-mv__data-label">Launch</span>
                    <span class="works-detail-mv__data-value">{{
                      formatDate(work.launch_date)
                    }}</span>
                  </div>
                  <div v-if="work.url" class="works-detail-mv__data">
                    <span class="works-detail-mv__data-label">URL</span>
                    <a
                      :href="work.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="works-detail-mv__data-link"
                    >
                      {{ work.url }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </BaseContainer>
        </section>

        <!-- Content Section -->
        <AppSection padding="top">
          <BaseContainer>
            <div v-if="work.overview" class="works-detail-content__overview">
              <h2 class="works-detail-content__section-title">概要</h2>
              <p class="works-detail-content__text" v-html="convertLineBreaks(work.overview)"></p>
            </div>

            <div class="works-detail-content__list">
              <div v-if="work.target" class="works-detail-content__item">
                <h3 class="works-detail-content__label">ターゲット</h3>
                <div
                  class="works-detail-content__explain"
                  v-html="convertLineBreaks(work.target)"
                ></div>
              </div>
              <div v-if="work.subject" class="works-detail-content__item">
                <h3 class="works-detail-content__label">課題・目的</h3>
                <div
                  class="works-detail-content__explain"
                  v-html="convertLineBreaks(work.subject)"
                ></div>
              </div>
              <div v-if="work.information_plan" class="works-detail-content__item">
                <h3 class="works-detail-content__label">情報・デザイン</h3>
                <div
                  class="works-detail-content__explain"
                  v-html="convertLineBreaks(work.information_plan)"
                ></div>
              </div>
              <div v-if="work.period" class="works-detail-content__item">
                <h3 class="works-detail-content__label">製作期間</h3>
                <div
                  class="works-detail-content__explain"
                  v-html="convertLineBreaks(work.period)"
                ></div>
              </div>
              <div v-if="work.tool && !isEmptyValue(work.tool)" class="works-detail-content__item">
                <h3 class="works-detail-content__label">使用ツール</h3>
                <div
                  class="works-detail-content__explain"
                  v-html="convertLineBreaks(work.tool)"
                ></div>
              </div>
              <div
                v-if="work.in_charge && !isEmptyValue(work.in_charge)"
                class="works-detail-content__item"
              >
                <h3 class="works-detail-content__label">担当業務</h3>
                <div
                  class="works-detail-content__explain"
                  v-html="convertLineBreaks(work.in_charge)"
                ></div>
              </div>
            </div>
          </BaseContainer>
        </AppSection>

        <!-- Materials Section -->
        <AppSection
          v-if="work.materials && work.materials.length > 0"
          padding="top"
          class="works-detail__materials works-detail-materials"
        >
          <BaseContainer>
            <h2 class="works-detail-materials__title">資料・スクリーンショット</h2>
            <div class="works-detail-materials__grid">
              <div
                v-for="(material, index) in work.materials"
                :key="index"
                class="works-detail-materials__item"
              >
                <img
                  :src="material.url"
                  :alt="`資料 ${String((index as number) + 1)}`"
                  class="works-detail-materials__image"
                />
              </div>
            </div>
          </BaseContainer>
        </AppSection>

        <!-- Productions Section -->
        <AppSection v-if="work.productions && work.productions.length > 0" padding="top">
          <BaseContainer>
            <h2 class="works-detail-productions__title">制作物</h2>
            <div class="works-detail-productions__grid">
              <div
                v-for="(production, index) in work.productions"
                :key="index"
                class="works-detail-productions__item"
              >
                <img
                  :src="production.url"
                  :alt="`制作物 ${String((index as number) + 1)}`"
                  class="works-detail-productions__image"
                />
              </div>
            </div>
          </BaseContainer>
        </AppSection>

        <!-- Related Works Section -->
        <AppSection v-if="relatedWorks && relatedWorks.length > 0" padding="top">
          <BaseContainer>
            <h2 class="works-detail-related__title">関連実績</h2>
            <ul class="works-detail-related__grid">
              <li v-for="relatedWork in relatedWorks" :key="relatedWork.id">
                <FeaturesWorksWorkCard :work="relatedWork" />
              </li>
            </ul>
          </BaseContainer>
        </AppSection>

        <!-- Back Link -->
        <div class="works-detail__back works-detail-back">
          <BaseContainer class="works-detail-back__wrapper">
            <BaseButton to="/works" variant="primary" size="large"> すべての実績を見る </BaseButton>
          </BaseContainer>
        </div>
      </div>
      <div v-else class="works-detail__not-found">
        <BaseContainer class="works-detail-not-found__wrapper">
          <h1>実績が見つかりません</h1>
          <BaseButton to="/works" variant="primary" size="large"> 実績一覧に戻る </BaseButton>
        </BaseContainer>
      </div>
    </div>
  </AppLowerPage>
</template>

<script setup lang="ts">
import type { Works, WorksListResponse } from '~/types/works';

const route = useRoute();
const workId = computed(() => route.params.id as string);

// Works詳細データを取得（useFetchでサーバーサイド実行）
// workIdが変更されたときに自動的に再取得されるようにkeyを設定
const { data: workData, error: _workError } = await useFetch<Works>(
  () => `/api/works/${workId.value}`,
  {
    key: () => `works-${workId.value}`,
    default: () => null,
    watch: [workId],
    onResponseError({ response }: { response: { _data: any } }) {
      console.error('Failed to load work details:', response._data);
    },
  }
);

// Works詳細データ
const work = computed(() => workData.value);

// 関連作品を取得（workDataが取得できた後に実行）
const { data: relatedWorksResponse } = await useFetch<WorksListResponse>('/api/works', {
  key: () => `related-works-${workData.value?.category?.id || 'none'}`,
  params: computed(() => ({
    limit: 100,
    categoryId: workData.value?.category?.id,
  })),
  default: () => ({ contents: [], totalCount: 0, limit: 100, offset: 0 }),
  watch: [workData],
  onResponseError({ response }: { response: { _data: any } }) {
    console.error('Failed to load related works:', response._data);
  },
});

// 関連作品（現在の作品を除く）
const relatedWorks = computed(() => {
  if (!relatedWorksResponse.value?.contents) return [];
  return relatedWorksResponse.value.contents
    .filter((w: Works) => w.id !== workId.value)
    .slice(0, 5);
});

// 空の値かどうかをチェック（配列の文字列表現「["..."]」を検出して除外）
const isEmptyValue = (value: string | undefined): boolean => {
  if (!value) return true;
  const trimmed = value.trim();
  // 空文字列
  if (trimmed === '') return true;
  // 空配列の文字列表現
  if (trimmed === '[]' || trimmed === '[""]') return true;
  // 配列の文字列表現「["..."]」を検出（JSON配列としてパースして判定）
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        // 配列の文字列表現の場合は除外
        return true;
      }
    } catch {
      // JSONパースに失敗した場合は通常の文字列として扱う
    }
  }
  return false;
};

// 改行コードを<br>タグに変換
const convertLineBreaks = (text: string | undefined): string => {
  if (!text || isEmptyValue(text)) return '';
  return text.replace(/\n/g, '<br>');
};

// 日付フォーマット（ハイドレーションエラーを防ぐため、UTCとして扱う）
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '';
  // YYYY-MM-DD形式の日付文字列を直接パース（UTCとして扱う）
  const dateMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (dateMatch && dateMatch[1] && dateMatch[2] && dateMatch[3]) {
    const year = parseInt(dateMatch[1], 10);
    const month = parseInt(dateMatch[2], 10);
    const day = parseInt(dateMatch[3], 10);
    return `${year}年${month}月${day}日`;
  }
  // フォールバック：既存の処理
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
};

// メタデータ設定
useHead(() => {
  if (!work.value) {
    return {
      title: '実績が見つかりません - ポートフォリオサイト',
    };
  }

  const title = work.value.title.replace(/<[^>]*>/g, '');
  return {
    title: `${title} - ポートフォリオサイト`,
    meta: [
      {
        name: 'description',
        content: work.value.overview || `${title}の制作実績です。`,
      },
    ],
  };
});
</script>

<style lang="scss" scoped>
.works-detail-page {
  width: 100%;
}

.works-detail {
  width: 100%;
}

// Main Visual
.works-detail__mv {
  background-color: $color_bg_base;
}

.works-detail-mv {
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: s(16);

    @include media($bp_tabL) {
      grid-template-columns: 1fr 1fr;
      gap: s(64);
      align-items: center;
    }
  }

  &__image-wrapper {
    width: 100%;
    aspect-ratio: 1 / 1;
    border: s(4) solid $color_base_black;
    border-radius: s(8);
    overflow: hidden;
    background-color: $color_bg_base;

    @include media($bp_pc) {
      aspect-ratio: 1 / 1;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__info-wrapper {
    display: flex;
    flex-direction: column;
    gap: s(24);

    @include media($bp_pc) {
      gap: s(32);
    }
  }

  &__title {
    font-family: $font-f_rocknroll-one;
    font-weight: 500;
    font-size: s(28);
    line-height: 1.4;
    color: $color_text_primary;
    margin: 0;

    @include media($bp_pc) {
      font-size: s(40);
    }
  }

  &__info {
    padding: s(24);
    border: s(3) solid $color_base_black;
    background-color: $color_bg_button;
    border-radius: s(16);
    display: flex;
    flex-direction: column;
    gap: s(24);

    @include media($bp_pc) {
      padding: s(32);
    }

    @include mode($theme_dark) {
      background-color: $color_bg_tag;
    }
  }

  &__category {
    font-family: $font-f_notosans;
    font-size: s(14);
    line-height: 1.5;
    color: $color_text_primary;
    background-color: $color_base_white;
    padding: s(8) s(16);
    border-radius: s(100);
    border: s(2) solid $color_base_black;
    width: fit-content;
    margin: 0;
    font-weight: 500;

    @include media($bp_pc) {
      font-size: s(16);
      padding: s(10) s(20);
    }
  }

  &__data-list {
    display: flex;
    flex-direction: column;
    gap: s(16);
  }

  &__data {
    display: flex;
    flex-direction: column;
    gap: s(8);
    padding-bottom: s(16);
    border-bottom: s(2) solid $color_base_black;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    @include media($bp_pc) {
      flex-direction: row;
      align-items: center;
    }
  }

  &__data-label {
    font-family: $font-f_notosans;
    font-weight: 700;
    font-size: s(14);
    line-height: 1.5;
    color: $color_text_primary;
    min-width: s(100);

    @include media($bp_pc) {
      font-size: s(16);
      min-width: s(120);
    }
  }

  &__data-value {
    font-family: $font-f_notosans;
    font-size: s(14);
    line-height: 1.5;
    color: $color_text_primary;

    @include media($bp_pc) {
      font-size: s(16);
    }
  }

  &__data-link {
    font-family: $font-f_notosans;
    font-size: s(14);
    line-height: 1.5;
    color: $color_text_link;
    text-decoration: underline;
    transition: color $transition_normal;

    @include hover {
      color: $color_accent_primary;
    }

    @include media($bp_pc) {
      font-size: s(16);
    }
  }
}

// Content Section
.works-detail__content {
  padding-block: s(60) s(40);
  background-color: $color_bg_base;

  @include media($bp_tab) {
    padding-block: s(40) s(32);
  }
}

.works-detail-content {
  &__overview {
    margin-bottom: s(48);
  }

  &__section-title {
    font-family: $font-f_notosans;
    font-weight: 700;
    font-size: s(28);
    line-height: 1.4;
    color: $color_text_primary;
    margin: 0 0 s(24);

    @include media($bp_pc) {
      font-size: s(32);
    }
  }

  &__text {
    font-family: $font-f_notosans;
    font-size: s(15);
    line-height: 1.8;
    color: $color_text_primary;
    margin: 0;
    white-space: pre-wrap;

    @include media($bp_pc) {
      font-size: s(18);
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: s(32);
  }

  &__item {
    position: relative;
  }

  &__label {
    font-family: $font-f_notosans;
    font-weight: 700;
    font-size: s(14);
    line-height: 1.5;
    color: $color_text_primary;
    background-color: $color_base_white;
    padding: s(8) s(16);
    border-radius: s(100);
    border: s(2) solid $color_base_black;
    display: inline-block;
    margin-bottom: s(12);

    @include media($bp_pc) {
      font-size: s(16);
      padding: s(10) s(20);
    }
  }

  &__explain {
    font-family: $font-f_notosans;
    font-size: s(14);
    line-height: 1.8;
    color: $color_text_secondary;
    white-space: pre-wrap;

    @include media($bp_pc) {
      font-size: s(16);
    }
  }
}

// Materials Section
.works-detail__materials {
  padding-block: s(60) s(40);
  background-color: $color_bg_base;

  @include media($bp_tab) {
    padding-block: s(40) s(32);
  }
}

.works-detail-materials {
  &__title {
    font-family: $font-f_rocknroll-one;
    font-weight: 500;
    font-size: s(28);
    line-height: 1.4;
    color: $color_text_primary;
    margin: 0 0 s(32);
    text-align: center;

    @include media($bp_pc) {
      font-size: s(32);
      margin-bottom: s(48);
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: s(24);

    @include media($bp_pc) {
      grid-template-columns: repeat(2, 1fr);
      gap: s(32);
    }
  }

  &__item {
    border: s(4) solid $color_base_black;
    border-radius: s(8);
    overflow: hidden;
    background-color: $color_bg_base;
  }

  &__image {
    width: 100%;
    height: auto;
    display: block;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
}

// Productions Section
.works-detail__productions {
  padding-block: s(60) s(40);
  background-color: $color_bg_base;

  @include media($bp_tab) {
    padding-block: s(40) s(32);
  }
}

.works-detail-productions {
  &__title {
    font-family: $font-f_notosans;
    font-weight: 700;
    font-size: s(28);
    line-height: 1.4;
    color: $color_text_primary;
    margin: 0 0 s(32);
    text-align: center;

    @include media($bp_pc) {
      font-size: s(32);
      margin-bottom: s(48);
    }
  }

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
    border: s(4) solid $color_base_black;
    border-radius: s(8);
    overflow: hidden;
    background-color: $color_bg_base;
  }

  &__image {
    width: 100%;
    height: auto;
    display: block;
    aspect-ratio: 3 / 2;
    object-fit: cover;
  }
}

// Related Works Section
.works-detail__related {
  padding-block: s(60) s(40);
  background-color: $color_bg_base;

  @include media($bp_tab) {
    padding-block: s(40) s(32);
  }
}

.works-detail-related {
  &__title {
    font-family: $font-f_notosans;
    font-weight: 700;
    font-size: s(28);
    line-height: 1.4;
    color: $color_text_primary;
    margin: 0 0 s(32);
    text-align: center;

    @include media($bp_pc) {
      font-size: s(32);
      margin-bottom: s(48);
    }
  }

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
      gap: s(32);
    }
  }
}

// Back Link Section
.works-detail__back {
  padding-top: s(60);
  background-color: $color_bg_base;

  @include media($bp_pc) {
    padding-top: s(80);
  }
}

.works-detail-back {
  &__wrapper {
    display: flex;
    justify-content: center;
  }
}

// Not Found
.works-detail__not-found {
  padding-block: s(80) s(60);
  background-color: $color_bg_base;
  text-align: center;
}

.works-detail-not-found {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: s(32);
    align-items: center;
  }

  h1 {
    font-family: $font-f_rocknroll-one;
    font-weight: 500;
    font-size: s(32);
    line-height: 1.4;
    color: $color_text_primary;
    margin: 0;

    @include media($bp_pc) {
      font-size: s(40);
    }
  }
}
</style>
