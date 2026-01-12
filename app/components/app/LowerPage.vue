<template>
  <div class="lower-page">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.lower-page {
  padding-top: s($height_header_sp + 60);

  @include media($bp_pc) {
    padding-top: s($height_header_pc + 100);
  }
}
</style>
