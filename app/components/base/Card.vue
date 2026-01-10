<template>
  <div :class="['card', { 'card--padded': padded, 'card--hover': hover }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    padded?: boolean;
    hover?: boolean;
  }>(),
  {
    padded: true,
    hover: false,
  }
);
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
}

.card--padded {
  padding: 2rem;
}

.card--hover:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}
</style>
