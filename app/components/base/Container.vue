<template>
  <div :class="containerClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
const attrs = useAttrs();

// $container-sizesのキーを型として使用
type ContainerType = 'normal';

const props = withDefaults(
  defineProps<{
    type?: ContainerType;
  }>(),
  {
    type: 'normal',
  }
);

const containerClasses = computed(() => {
  const classes: Array<string | Record<string, boolean>> = ['container'];

  // typeが'normal'でない場合、モディファイアクラスを追加
  if (props.type !== 'normal') {
    classes.push(`container--${props.type}`);
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
@use '~/assets/scss/utils' as *;

.container {
  // デフォルトのコンテナ設定
  @include container('normal');

  // サイズモディファイア
  @each $type, $sizes in $container-sizes {
    &--#{$type} {
      @include container($type);
    }
  }
}
</style>
