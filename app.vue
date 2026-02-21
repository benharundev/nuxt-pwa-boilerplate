<script setup lang="ts">
/**
 * App.vue — Entry point
 * Initializes theme, safe areas, and global page transitions.
 */
const { isDark } = useAppleTheme()

// Apply theme to <html> on SSR hydration
useHead({
  htmlAttrs: {
    class: computed(() => isDark.value ? 'dark' : ''),
  },
})
</script>

<template>
  <!-- Global page transition wrapper -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Global fallback for page transitions defined in transitions.css */
.apple-page-enter-active,
.apple-page-leave-active {
  transition: opacity 0.30s var(--ease-apple, ease), transform 0.35s var(--ease-apple-decel, ease);
}
.apple-page-enter-from { opacity: 0; transform: translate3d(5%, 0, 0) scale(0.98); }
.apple-page-leave-to   { opacity: 0; transform: translate3d(-3%, 0, 0) scale(0.97); }
</style>
