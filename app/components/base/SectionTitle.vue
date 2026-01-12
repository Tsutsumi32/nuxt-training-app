<template>
  <component :is="tag" class="section-title">
    <slot />
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  }>(),
  {
    tag: 'h2',
  }
);

const tag = computed(() => props.tag);
</script>

<style lang="scss" scoped>
.section-title {
  @include lightShadow;
  font-family: $font-f_rocknroll-one;
  font-weight: 500;
  font-size: s(40);
  line-height: 1.2;
  color: $color_text_primary;
  margin: 0;
  margin-bottom: s(32);

  @include media($bp_tab) {
    font-size: s(38);
    margin-bottom: s(52);
  }

  @include media($bp_pc) {
    font-size: s(48);
  }
}
</style>
