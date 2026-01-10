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
@use '../../assets/scss/utils/index' as *;

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: s(8) solid $color_base_black;
  border-radius: s(335544);
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all $transition_normal;
  font-family: $font-f_notosans;
  line-height: 1.333;
  text-align: center;
  box-shadow: s(8) s(8) 0 0 rgba(0, 0, 0, 1);
  background-color: $color_button_bg;
  color: $color_base_black;

  &:disabled,
  &[disabled],
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
}

/* Variants */
.button--primary {
  background-color: $color_accent_primary;
  color: $color_base_black;
  border-color: $color_base_black;

  @include hover {
    background-color: $color_accent_hover;
    transform: translate(s(-2), s(-2));
    box-shadow: s(10) s(10) 0 0 rgba(0, 0, 0, 1);
  }
}

.button--secondary {
  background-color: $color_button_bg;
  color: $color_base_black;
  border-color: $color_base_black;

  @include hover {
    background-color: $color_bg_hover;
  }
}

.button--outline {
  background-color: transparent;
  color: $color_text_primary;
  border-color: $color_base_black;

  @include hover {
    background-color: $color_button_bg;
  }
}

.button--danger {
  background-color: #dc3545;
  color: $color_base_white;
  border-color: $color_base_black;

  @include hover {
    background-color: #c82333;
  }
}

/* Sizes */
.button--small {
  padding: s(12) s(24);
  font-size: s(14);
}

.button--medium {
  padding: s(16) s(32);
  font-size: s(16);
}

.button--large {
  padding: s(24) s(48);
  font-size: s(24);
}

/* Full width */
.button--full {
  width: 100%;
}

/* Active state */
.button:active:not(:disabled) {
  transform: translate(0, 0);
  box-shadow: s(8) s(8) 0 0 rgba(0, 0, 0, 1);
}

@include media($bp_tab) {
  .button--large {
    padding: s(20) s(40);
    font-size: s(20);
  }
}
</style>
