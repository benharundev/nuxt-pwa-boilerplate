<script setup lang="ts">
/**
 * Navigation Tab Item Definition
 * Shared across Desktop, Tablet, and Mobile layouts
 */
export interface NavItem {
  label: string
  icon: string
  to: string
}

/**
 * Default Layout — Unified Adaptive Layout
 * Switches between Desktop / Tablet / Mobile based on useDeviceType()
 */
const { isDesktop, isTablet, isMobile } = useDeviceType()
</script>

<template>
  <div class="adaptive-layout">
    <!-- Desktop: macOS 3-column layout -->
    <LayoutDesktopLayout v-if="isDesktop">
      <slot />
    </LayoutDesktopLayout>

    <!-- Tablet: iPadOS sidebar/tab layout -->
    <LayoutTabletLayout v-else-if="isTablet">
      <slot />
    </LayoutTabletLayout>

    <!-- Mobile: iOS Liquid Glass bottom bar -->
    <LayoutMobileLayout v-else>
      <slot />
    </LayoutMobileLayout>
  </div>
</template>

<style scoped>
.adaptive-layout {
  width: 100%;
  min-height: 100dvh;
}
</style>
