<template>
  <!-- NuxtLinkを使用する場合 -->
  <NuxtLink v-if="to && !disabled" :to="to" :class="buttonClasses">
    <slot />
  </NuxtLink>

  <!-- NuxtLinkがdisabledの場合、spanとして表示 -->
  <span v-else-if="to && disabled" :class="[buttonClasses, { 'button--disabled': disabled }]">
    <slot />
  </span>

  <!-- 通常のリンク（aタグ）を使用する場合 -->
  <a
    v-else-if="href && !disabled"
    :href="href"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :class="buttonClasses"
  >
    <slot />
  </a>

  <!-- リンクがdisabledの場合、spanとして表示 -->
  <span v-else-if="href && disabled" :class="[buttonClasses, { 'button--disabled': disabled }]">
    <slot />
  </span>

  <!-- ボタンを使用する場合 -->
  <button v-else :type="type" :disabled="disabled" :class="buttonClasses">
    <slot />
  </button>
</template>

<script setup lang="ts">
const attrs = useAttrs();

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'small' | 'medium' | 'large';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    full?: boolean;
    to?: string;
    href?: string;
    target?: string;
  }>(),
  {
    variant: 'primary',
    size: 'medium',
    type: 'button',
    disabled: false,
    full: false,
    to: undefined,
    href: undefined,
    target: undefined,
  }
);

const buttonClasses = computed(() => {
  const classes: Array<string | Record<string, boolean>> = [
    'button',
    `button--${props.variant}`,
    `button--${props.size}`,
  ];

  if (props.full) {
    classes.push({ 'button--full': true });
  }

  // 親から渡されたclass属性をマージ
  // attrs.classは文字列、配列、またはオブジェクトのいずれか
  if (attrs.class) {
    if (typeof attrs.class === 'string' || typeof attrs.class === 'object') {
      classes.push(attrs.class);
    }
  }

  return classes;
});
</script>

<style lang="scss" scoped>
.button {
  $_parent: &;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: s(6) solid $color_base_black;
  border-radius: 100vh;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all $transition_normal;
  font-family: $font-f_notosans;
  line-height: 1.333;
  text-align: center;
  box-shadow: s(2) s(5) 0 0 $color_base_black;
  background-color: $color_bg_button;
  color: $color_text_primary;

  &:disabled,
  &[disabled],
  &#{$_parent}--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Variants */
  &#{$_parent}--primary {
    background-color: $color_accent_primary;
    color: $color_text_primary;
    border-color: $color_base_black;

    @include hover {
      transform: translate(s(-2), s(-2));
      box-shadow: s(8) s(8) 0 0 $color_base_black;
    }
  }

  &#{$_parent}--secondary {
    background-color: $color_bg_button;
    color: $color_text_primary;
    border-color: $color_base_black;

    @include hover {
      background-color: $color_bg_hover;
    }
  }

  &#{$_parent}--outline {
    background-color: transparent;
    color: $color_text_primary;
    border-color: $color_base_black;

    @include hover {
      background-color: $color_bg_button;
    }
  }

  &#{$_parent}--danger {
    background-color: #dc3545;
    color: $color_text_primary;
    border-color: $color_base_black;

    @include hover {
      background-color: #c82333;
    }
  }

  /* Sizes */
  &#{$_parent}--small {
    padding: s(10) s(20);
    font-size: s(14);
  }

  &#{$_parent}--medium {
    padding: s(16) s(32);
    font-size: s(15);
  }

  &#{$_parent}--large {
    padding: s(18) s(45);
    font-size: s(18);

    @include media($bp_tab) {
      padding: s(20) s(40);
      font-size: s(20);
    }
  }

  /* Full width */
  &#{$_parent}--full {
    width: 100%;
  }

  /* Active state */
  &:active:not(:disabled) {
    transform: translate(0, 0);
    box-shadow: s(8) s(8) 0 0 rgba(0, 0, 0, 1);
  }
}
</style>
