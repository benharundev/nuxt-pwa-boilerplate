<script setup lang="ts">
/**
 * Tablet Layout — iPadOS Style
 * Landscape: Persistent Sidebar + Content
 * Portrait:  Bottom Tab Bar (like iPhone)
 */
const route = useRoute()
const { tabletShowSidebar, isLandscape } = useDeviceType()
const { toggleTheme, isDark } = useAppleTheme()
const haptics = useHaptics()

const navItems = [
  { label: 'Home',    icon: 'house',       to: '/' },
  { label: 'Explore', icon: 'compass',     to: '/explore' },
  { label: 'Profile', icon: 'user-circle', to: '/profile' },
]

// Overlay sidebar (for portrait slide-over)
const overlayOpen = ref(false)

const toggleOverlay = () => {
  overlayOpen.value = !overlayOpen.value
  haptics.impact('light')
}
const closeOverlay = () => { overlayOpen.value = false }

// Close overlay on route change
watch(() => route.path, () => { overlayOpen.value = false })

const onTabChange = () => { haptics.selection() }
</script>

<template>
  <div class="tablet-shell">

    <!-- LANDSCAPE: Persistent sidebar + detail -->
    <template v-if="tabletShowSidebar">
      <aside class="tablet-sidebar material-ultrathin">
        <!-- Mini sidebar (icon-only at ≤768px landscape) -->
        <nav class="tablet-sidebar-nav">
          <div class="sidebar-header-icon">
            <component :is="isDark ? 'lucide-moon' : 'lucide-sun'" :size="16" class="theme-icon" @click="toggleTheme" />
          </div>
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="tablet-nav-item"
            :class="{ 'is-active': route.path === item.to }"
            @click="onTabChange"
          >
            <component
              :is="`lucide-${item.icon}`"
              :size="20"
              :stroke-width="route.path === item.to ? 2.2 : 1.8"
            />
            <span class="nav-label text-caption1">{{ item.label }}</span>
          </NuxtLink>
        </nav>
      </aside>

      <main class="tablet-main">
        <slot />
      </main>
    </template>

    <!-- PORTRAIT: Bottom tab bar (iOS-style) -->
    <template v-else>
      <!-- Overlay sidebar trigger (optional slide-over) -->
      <Transition name="apple-sidebar">
        <aside
          v-if="overlayOpen"
          class="tablet-overlay-sidebar material-thick"
          @click.self="closeOverlay"
        >
          <nav class="overlay-nav">
            <button class="close-btn apple-press" @click="closeOverlay">
              <lucide-x :size="20" />
            </button>
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="overlay-nav-item"
              :class="{ 'is-active': route.path === item.to }"
              @click="haptics.selection()"
            >
              <component :is="`lucide-${item.icon}`" :size="20" />
              <span class="text-body">{{ item.label }}</span>
            </NuxtLink>
          </nav>
        </aside>
      </Transition>

      <!-- Backdrop -->
      <Transition name="apple-fade">
        <div
          v-if="overlayOpen"
          class="overlay-backdrop"
          @click="closeOverlay"
        />
      </Transition>

      <!-- Page content -->
      <main class="portrait-main">
        <!-- Compact nav bar -->
        <header class="tablet-navbar material-thick">
          <button class="sidebar-trigger apple-press" @click="toggleOverlay">
            <lucide-sidebar :size="20" />
          </button>
          <h1 class="text-headline">{{ route.meta.title || 'Boilerplate' }}</h1>
          <button class="theme-btn apple-press" @click="toggleTheme">
            <component :is="isDark ? 'lucide-sun' : 'lucide-moon'" :size="18" />
          </button>
        </header>

        <div class="portrait-content content-above-tabbar">
          <slot />
        </div>
      </main>

      <!-- Bottom Tab Bar -->
      <UiBottomTabBar :items="navItems" />
    </template>

  </div>
</template>

<style scoped>
.tablet-shell {
  display: flex;
  width: 100%;
  min-height: 100dvh;
  position: relative;
  background: var(--color-bg-secondary);
}

/* Landscape sidebar */
.tablet-sidebar {
  width: 80px;
  height: 100dvh;
  position: sticky;
  top: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: max(20px, env(safe-area-inset-top));
  padding-bottom: max(16px, env(safe-area-inset-bottom));
  border-right: 0.5px solid var(--material-separator);
}

.sidebar-header-icon {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 0.5px solid var(--material-separator);
  width: 100%;
  display: flex;
  justify-content: center;
}

.theme-icon {
  cursor: pointer;
  color: var(--color-label-secondary);
  transition: color 0.15s ease;
}
.theme-icon:hover { color: var(--color-accent); }

.tablet-sidebar-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding: 0 8px;
}

.tablet-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 10px 8px;
  border-radius: var(--radius-md);
  color: var(--color-label-secondary);
  text-decoration: none;
  width: 100%;
  transition: background 0.15s ease, color 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}
.tablet-nav-item:hover { background: rgba(var(--color-accent-rgb), 0.08); }
.tablet-nav-item.is-active {
  background: rgba(var(--color-accent-rgb), 0.14);
  color: var(--color-accent);
}

.nav-label { display: block; }

.tablet-main {
  flex: 1;
  min-height: 100dvh;
  overflow-y: auto;
  padding: max(20px, env(safe-area-inset-top)) 24px 20px;
}

/* Portrait mode */
.portrait-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.tablet-navbar {
  position: sticky;
  top: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: max(14px, env(safe-area-inset-top)) 16px 14px;
  border-bottom: 0.5px solid var(--material-separator);
}

.sidebar-trigger,
.theme-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(var(--color-accent-rgb), 0.08);
  color: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.portrait-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

/* Overlay sidebar */
.tablet-overlay-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100dvh;
  width: 280px;
  z-index: 400;
  display: flex;
  flex-direction: column;
  padding-top: max(20px, env(safe-area-inset-top));
  padding-bottom: max(20px, env(safe-area-inset-bottom));
}

.overlay-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 12px;
}

.close-btn {
  align-self: flex-end;
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
  margin-bottom: 12px;
}

.overlay-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: var(--radius-md);
  color: var(--color-label);
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;
}
.overlay-nav-item.is-active {
  background: rgba(var(--color-accent-rgb), 0.14);
  color: var(--color-accent);
}

.overlay-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 399;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}
</style>
