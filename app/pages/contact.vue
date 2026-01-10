<template>
  <div class="contact-page">
    <section class="section">
      <div class="container">
        <h1 class="section-title">Contact</h1>
        <div class="card">
          <p>お問い合わせは以下のフォームまたはメールアドレスよりお願いいたします。</p>
          <form class="contact-form mt-4">
            <div class="form-group">
              <label for="name" class="form-label">お名前</label>
              <input id="name" type="text" name="name" class="form-input" required />
            </div>
            <div class="form-group">
              <label for="email" class="form-label">メールアドレス</label>
              <input id="email" type="email" name="email" class="form-input" required />
            </div>
            <div class="form-group">
              <label for="message" class="form-label">メッセージ</label>
              <textarea
                id="message"
                name="message"
                class="form-textarea"
                rows="5"
                required
              ></textarea>
            </div>
            <div class="form-actions">
              <BaseButton type="submit" variant="primary" size="large">送信する</BaseButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-textarea {
  resize: vertical;
}

.form-actions {
  text-align: center;
  margin-top: 2rem;
}
</style>
