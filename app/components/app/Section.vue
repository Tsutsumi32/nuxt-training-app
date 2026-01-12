<template>
  <section :class="sectionClasses">
    <slot />
  </section>
</template>

<script setup lang="ts">
const attrs = useAttrs();

// $section-sizesのキーを型として使用
type SectionType = 'normal' | 'large' | 'xlarge';
type SectionPadding = 'both' | 'top' | 'bottom';

const props = withDefaults(
  defineProps<{
    type?: SectionType;
    padding?: SectionPadding;
  }>(),
  {
    type: 'normal',
    padding: 'both',
  }
);

const sectionClasses = computed(() => {
  const classes: Array<string | Record<string, boolean>> = ['section'];

  // typeに応じてモディファイアクラスを追加
  classes.push(`section--${props.type}`);

  // paddingに応じてモディファイアクラスを追加
  if (props.padding !== 'both') {
    classes.push(`section--padding-${props.padding}`);
  }

  // 親から渡されたclass属性をマージ
  if (attrs.class) {
    if (typeof attrs.class === 'string' || typeof attrs.class === 'object') {
      classes.push(attrs.class);
    }
  }

  return classes;
});
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '~/assets/scss/utils' as *;

.section {
  // $section-sizesの各サイズに対してモディファイアクラスを生成
  @each $size-name, $sizes in $section-sizes {
    &--#{$size-name} {
      @include section($size-name);
    }
  }

  &--padding-top {
    padding-bottom: 0 !important;
  }

  &--padding-bottom {
    padding-top: 0 !important;
  }
}
</style>
