<script setup lang="ts">
/**
 * Desktop Layout — macOS Style
 * Three-column: Sidebar | Content List | Detail View
 * Uses Apple material treatments throughout.
 */
const route = useRoute()
const { toggleTheme, isDark } = useAppleTheme()

const navItems = [
  { label: 'Home',    icon: 'house',       to: '/' },
  { label: 'Explore', icon: 'compass',     to: '/explore' },
  { label: 'Profile', icon: 'user-circle', to: '/profile' },
]

// Track if content list is shown (3-col vs 2-col mode)
const showContentList = ref(true)
</script>

<template>
  <div class="desktop-shell">
    <!-- App Window Chrome -->
    <div class="window-chrome">

      <!-- Column 1 — Sidebar (systemUltraThinMaterial) -->
      <aside class="window-sidebar material-ultrathin">
         
        <!-- Traffic light dots space -->
        <div class="sidebar-header">
          <div class="traffic-lights">
            <span class="tl tl-red"   />
            <span class="tl tl-yellow"/>
            <span class="tl tl-green" />
          </div>
          <div class="sidebar-brand">
            <img v-if="isDark" src="/logo-dark.png" alt="BenHarun" class="brand-logo" />
            <img v-else src="/logo-light.png" alt="BenHarun" class="brand-logo" />
          </div>
        </div>

        <!-- Navigation -->
        <nav class="sidebar-nav">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="sidebar-nav-item"
            :class="{ 'is-active': route.path === item.to }"
          >
            <component
              :is="`lucide-${item.icon}`"
              class="nav-icon"
              :size="18"
              :stroke-width="route.path === item.to ? 2.2 : 1.8"
            />
            <span class="text-subheadline">{{ item.label }}</span>
          </NuxtLink>
        </nav>

        <!-- Footer -->
        <div class="sidebar-footer">
          <button class="theme-toggle apple-press" @click="toggleTheme" :title="isDark ? 'Switch to Light' : 'Switch to Dark'">
            <component :is="isDark ? 'lucide-sun' : 'lucide-moon'" :size="16" />
          </button>
        </div>
      </aside>

      <!-- Column 2 — Content List (systemThinMaterial) -->
      <div class="window-content-list material-thin" v-if="showContentList">
        <UiContentList />
      </div>

      <!-- Column 3 — Detail View -->
      <main class="window-detail">
        <div class="detail-inner">
          <slot />
        </div>
      </main>

    </div>
  </div>
</template>

<style scoped>
.desktop-shell {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  background: var(--color-bg-secondary);
  padding: 0;
}

.window-chrome {
  display: grid;
  grid-template-columns: var(--sidebar-width) var(--content-list-width) 1fr;
  width: 100%;
  min-height: 100dvh;
  overflow: hidden;
  position: relative;
}

/* Sidebar */
.window-sidebar {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  position: sticky;
  top: 0;
  overflow: hidden;
  z-index: var(--z-sidebar, 100);
  transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 16px 12px;
  /* macOS traffic light space */
  padding-top: max(20px, env(safe-area-inset-top));
}

.traffic-lights {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-shrink: 0;
}

.tl {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
}
.tl-red    { background: #FF5F57; box-shadow: 0 0 0 0.5px rgba(0,0,0,0.15); }
.tl-yellow { background: #FEBC2E; box-shadow: 0 0 0 0.5px rgba(0,0,0,0.15); }
.tl-green  { background: #28C840; box-shadow: 0 0 0 0.5px rgba(0,0,0,0.15); }

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-logo {
  height: 24px;
  width: auto;
  object-fit: contain;
}

.sidebar-app-name {
  color: var(--color-label);
  font-weight: 700;
  letter-spacing: 0.5px;
}

.sidebar-nav {
  flex: 1;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
}

.sidebar-nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: var(--radius-md);
  color: var(--color-label-secondary);
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.sidebar-nav-item:hover {
  background: rgba(var(--color-accent-rgb), 0.08);
  color: var(--color-label);
}

.sidebar-nav-item.is-active {
  background: rgba(var(--color-accent-rgb), 0.14);
  color: var(--color-accent);
}

.nav-icon {
  flex-shrink: 0;
}

.sidebar-footer {
  padding: 12px 16px;
  padding-bottom: max(12px, env(safe-area-inset-bottom));
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.theme-toggle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: var(--material-bg-thin);
  color: var(--color-label-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* Content List */
.window-content-list {
  height: 100dvh;
  position: sticky;
  top: 0;
  overflow-y: auto;
  border-right: 0.5px solid var(--material-separator);
}

/* Detail */
.window-detail {
  min-height: 100dvh;
  overflow-y: auto;
  background: var(--color-bg-primary);
}

.detail-inner {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 24px;
}
</style>
