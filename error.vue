<script setup lang="ts">
const error = useError()
</script>

<template>
  <div class="error-page">
    <div class="error-card liquid-glass">
      <div class="error-icon">
        <lucide-alert-triangle :size="40" />
      </div>
      <h1 class="text-title2">{{ error?.statusCode === 404 ? 'Not Found' : 'Something went wrong' }}</h1>
      <p class="text-body error-message">
        {{ error?.statusCode === 404
          ? 'The page you're looking for doesn't exist.'
          : error?.message || 'An unexpected error occurred.' }}
      </p>
      <div class="error-actions">
        <NuxtLink to="/" class="btn-primary-link">
          <UiGlassButton variant="primary" size="md" icon="house">Go Home</UiGlassButton>
        </NuxtLink>
        <UiGlassButton variant="secondary" size="md" icon="refresh-cw" @click="() => clearError({ redirect: '/' })">
          Retry
        </UiGlassButton>
      </div>
      <p class="text-caption1 error-code" v-if="error?.statusCode">
        Error {{ error.statusCode }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--color-bg-secondary);
}

.error-card {
  max-width: 420px;
  width: 100%;
  border-radius: var(--radius-2xl);
  padding: 40px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.error-icon {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: rgba(255, 59, 48, 0.10);
  color: #FF3B30;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 { color: var(--color-label); }

.error-message {
  color: var(--color-label-secondary);
  max-width: 300px;
}

.error-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-primary-link { text-decoration: none; }

.error-code {
  color: var(--color-label-quaternary);
  margin-top: 8px;
}
</style>
