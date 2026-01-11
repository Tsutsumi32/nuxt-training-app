<template>
  <div class="about-page">
    <section class="section">
      <div class="container">
        <h1 class="section-title">About</h1>
        <div class="card">
          <h2>自己紹介</h2>
          <p>こんにちは！Nuxt 3を使用してポートフォリオサイトを制作しています。</p>
          <h3 class="mt-3">スキル</h3>
          <ul class="skill-list">
            <li>Vue.js / Nuxt.js</li>
            <li>TypeScript</li>
            <li>CSS / SCSS</li>
            <li>Docker</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.about-page {
  min-height: 100vh;
}

.skill-list {
  list-style: none;
  padding-left: 0;
}

.skill-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e5e5;
}

.skill-list li:last-child {
  border-bottom: none;
}
</style>
