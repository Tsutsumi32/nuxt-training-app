<template>
  <div class="prepare">準備中です・・・</div>
</template>

<style lang="scss" scoped>
.prepare {
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: s(18);

  @include media($bp_pc) {
    font-size: s(20);
  }
}
</style>
