<script setup lang="ts">
/**
 * Mobile Layout — iOS "Liquid Glass" Style
 * Full-height with Bottom Tab Bar, safe area insets, swipe-back gesture.
 */
const route = useRoute()
const haptics = useHaptics()
const { swipeProgress } = useSwipeBack()

const navItems = [
  { label: 'Home',    icon: 'house',       to: '/' },
  { label: 'Explore', icon: 'compass',     to: '/explore' },
  { label: 'Profile', icon: 'user-circle', to: '/profile' },
]

// Derive current section title from route meta or path
const pageTitle = computed(() => {
  return (route.meta.title as string) || navItems.find(n => n.to === route.path)?.label || 'Boilerplate'
})

const canGoBack = computed(() => window.history.length > 1)
const router = useRouter()

const goBack = () => {
  haptics.impact('light')
  router.go(-1)
}

const { isDark, toggleTheme } = useAppleTheme()
</script>

<template>
  <div class="mobile-shell">

    <!-- iOS Navigation Bar (Large Title) -->
    <header class="mobile-navbar material-thick" :class="{ 'has-back': canGoBack }">
      <div class="navbar-top">
        <!-- Back button -->
        <button
          v-if="canGoBack && route.path !== '/'"
          class="back-btn apple-press"
          @click="goBack"
        >
          <lucide-chevron-left :size="20" />
        </button>
        <div v-else class="back-btn-spacer" />

        <!-- Right actions -->
        <div class="navbar-actions">
          <button class="action-btn apple-press" @click="toggleTheme">
            <component :is="isDark ? 'lucide-sun' : 'lucide-moon'" :size="18" />
          </button>
        </div>
      </div>

      <!-- Large title -->
      <div class="navbar-large-title">
        <h1 class="text-large-title">{{ pageTitle }}</h1>
      </div>
    </header>

    <!-- Swipe progress indicator (visual feedback) -->
    <div
      v-if="swipeProgress > 0"
      class="swipe-indicator"
      :style="{ width: `${swipeProgress * 100}%` }"
    />

    <!-- Page Content -->
    <main class="mobile-content content-above-tabbar">
      <slot />
    </main>

    <!-- Bottom Tab Bar — Liquid Glass -->
    <UiBottomTabBar :items="navItems" />

  </div>
</template>

<style scoped>
.mobile-shell {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100dvh;
  position: relative;
  background: var(--color-bg-secondary);
  overflow: hidden;
}

/* Navigation Bar */
.mobile-navbar {
  position: sticky;
  top: 0;
  z-index: var(--z-navbar, 200);
  padding-top: max(14px, env(safe-area-inset-top));
  padding-left: max(16px, env(safe-area-inset-left));
  padding-right: max(16px, env(safe-area-inset-right));
  padding-bottom: 12px;
  border-bottom: 0.5px solid var(--material-separator);
}

.navbar-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 44px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 6px 8px 6px 0;
  border: none;
  background: none;
  color: var(--color-accent);
  font-size: var(--text-body);
  font-weight: 500;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.back-btn-spacer { width: 60px; }

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: rgba(var(--color-accent-rgb), 0.10);
  color: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.navbar-large-title {
  padding-top: 6px;
}

.navbar-large-title h1 {
  color: var(--color-label);
}

/* Swipe hint strip */
.swipe-indicator {
  position: fixed;
  left: 0;
  top: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-accent), transparent);
  z-index: 999;
  pointer-events: none;
  transition: width 0.05s linear;
  border-radius: 0 2px 2px 0;
}

/* Content */
.mobile-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
  -webkit-overflow-scrolling: touch;
}
</style>
