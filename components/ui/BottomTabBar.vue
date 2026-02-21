<script setup lang="ts">
/**
 * BottomTabBar — Liquid Glass iOS Tab Bar
 * High-translucency glassmorphism with safe area insets + haptic feedback.
 */
interface TabItem {
  label: string
  icon: string
  to: string
}

const props = defineProps<{
  items: TabItem[]
}>()

const route = useRoute()
const haptics = useHaptics()

const onTabTap = () => {
  haptics.selection()
}

const isActive = (to: string) => route.path === to
</script>

<template>
  <nav class="bottom-tab-bar material-chrome" role="tablist" aria-label="Main navigation">
    <NuxtLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="tab-item apple-press"
      :class="{ 'is-active': isActive(item.to) }"
      role="tab"
      :aria-selected="isActive(item.to)"
      @click="onTabTap"
    >
      <!-- Icon with active bounce animation -->
      <div class="tab-icon-wrap">
        <Transition name="apple-pop">
          <div v-if="isActive(item.to)" class="tab-indicator" />
        </Transition>
        <component
          :is="`lucide-${item.icon}`"
          class="tab-icon"
          :size="24"
          :stroke-width="isActive(item.to) ? 2.2 : 1.7"
        />
      </div>

      <!-- Label -->
      <span class="tab-label text-caption2">{{ item.label }}</span>

    </NuxtLink>
  </nav>
</template>

<style scoped>
.bottom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 300;

  display: flex;
  align-items: stretch;
  justify-content: space-around;

  /* Safe area + tab height */
  padding-bottom: max(8px, env(safe-area-inset-bottom));
  padding-left: max(0px, env(safe-area-inset-left));
  padding-right: max(0px, env(safe-area-inset-right));
  padding-top: 8px;

  min-height: calc(49px + env(safe-area-inset-bottom, 0px));
}

/* Tab Item */
.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 4px 8px;
  text-decoration: none;
  color: var(--color-label-secondary);
  transition: color 0.20s var(--ease-apple, ease);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  min-width: 44px;  /* HIG min tap target */
  min-height: 44px;
}

.tab-item.is-active {
  color: var(--color-accent);
}

/* Icon wrapper */
.tab-icon-wrap {
  position: relative;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Active background pill */
.tab-indicator {
  position: absolute;
  inset: -4px -8px;
  background: rgba(var(--color-accent-rgb), 0.12);
  border-radius: 10px;
  z-index: 0;
}

.tab-icon {
  position: relative;
  z-index: 1;
  transition: transform 0.20s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tab-item.is-active .tab-icon {
  transform: scale(1.12);
}

/* Label */
.tab-label {
  display: block;
  font-weight: 500;
  color: inherit;
  transition: color 0.20s ease;
  letter-spacing: 0.01em;
}
</style>
