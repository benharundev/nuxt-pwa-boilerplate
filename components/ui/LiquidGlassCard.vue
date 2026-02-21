<script setup lang="ts">
/**
 * LiquidGlassCard
 * Demonstrates Apple's depth, material, and Liquid Glass effects.
 * Multi-layer: backdrop blur + inner glow + shimmer + depth shadow.
 */
interface Props {
  title?: string
  subtitle?: string
  icon?: string
  depth?: 1 | 2 | 3       // 1=shallow, 2=default, 3=elevated
  animated?: boolean       // Enable shimmer hover animation
  tint?: string            // Optional accent color
  compact?: boolean        // Compact card variant
}

const props = withDefaults(defineProps<Props>(), {
  title:    'Card Title',
  depth:    2,
  animated: true,
  tint:     '#007AFF',
  compact:  false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const haptics = useHaptics()

const onPress = (e: MouseEvent) => {
  haptics.impact('light')
  emit('click', e)
}

const depthClass = computed(() => `depth-${props.depth}`)

const tintRgb = computed(() => {
  // Parse hex to rgb for CSS variable
  const hex = props.tint.replace('#', '')
  const r = parseInt(hex.substring(0,2), 16)
  const g = parseInt(hex.substring(2,4), 16)
  const b = parseInt(hex.substring(4,6), 16)
  return `${r}, ${g}, ${b}`
})
</script>

<template>
  <div
    class="liquid-glass-card liquid-glass apple-hover"
    :class="[depthClass, { 'is-compact': compact, 'is-animated': animated }]"
    :style="{ '--card-tint': tint, '--card-tint-rgb': tintRgb }"
    role="article"
    @click="onPress"
  >
    <!-- Card content layer (above pseudo-elements) -->
    <div class="card-content">

      <!-- Icon -->
      <div v-if="icon" class="card-icon-wrap">
        <div class="card-icon-bg">
          <component :is="`lucide-${icon}`" :size="compact ? 18 : 24" />
        </div>
      </div>

      <!-- Text -->
      <div class="card-text">
        <h3 class="card-title" :class="compact ? 'text-callout' : 'text-headline'">
          {{ title }}
        </h3>
        <p v-if="subtitle" class="card-subtitle text-subheadline">
          {{ subtitle }}
        </p>
        <slot />
      </div>

      <!-- Chevron -->
      <div class="card-trailing" v-if="!compact">
        <lucide-chevron-right :size="16" class="trailing-chevron" />
      </div>

    </div>

    <!-- Animated shimmer overlay -->
    <div v-if="animated" class="card-shimmer" />

    <!-- Depth glow -->
    <div class="card-glow" />

  </div>
</template>

<style scoped>
.liquid-glass-card {
  --card-tint: #007AFF;
  --card-tint-rgb: 0, 122, 255;

  position: relative;
  border-radius: var(--radius-xl);
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition:
    transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Depth levels */
.depth-1 {
  box-shadow:
    0 2px 8px rgba(0,0,0,0.08),
    0 1px 3px rgba(0,0,0,0.06),
    inset 0 1px 0 rgba(255,255,255,0.22);
}
.depth-2 {
  box-shadow:
    0 8px 24px rgba(0,0,0,0.12),
    0 3px 8px rgba(0,0,0,0.08),
    inset 0 1px 0 rgba(255,255,255,0.22);
}
.depth-3 {
  box-shadow:
    0 20px 60px rgba(0,0,0,0.18),
    0 8px 20px rgba(0,0,0,0.10),
    inset 0 1px 0 rgba(255,255,255,0.28);
}

.dark .depth-1 {
  box-shadow:
    0 2px 8px rgba(0,0,0,0.30),
    0 1px 3px rgba(0,0,0,0.20),
    inset 0 1px 0 rgba(255,255,255,0.06);
}
.dark .depth-2 {
  box-shadow:
    0 8px 24px rgba(0,0,0,0.40),
    0 3px 8px rgba(0,0,0,0.28),
    inset 0 1px 0 rgba(255,255,255,0.06);
}
.dark .depth-3 {
  box-shadow:
    0 20px 60px rgba(0,0,0,0.55),
    0 8px 20px rgba(0,0,0,0.35),
    inset 0 1px 0 rgba(255,255,255,0.10);
}

/* Hover lift */
.liquid-glass-card:hover {
  transform: scale(1.02) translateY(-2px);
}
.depth-1:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.14), 0 2px 6px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.28); }
.depth-2:hover { box-shadow: 0 16px 40px rgba(0,0,0,0.16), 0 6px 14px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.28); }
.depth-3:hover { box-shadow: 0 28px 80px rgba(0,0,0,0.22), 0 12px 28px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.32); }

/* Press */
.liquid-glass-card:active {
  transform: scale(0.97) translateY(0);
  transition-duration: 0.10s;
}

/* Content */
.card-content {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
}

.is-compact .card-content {
  padding: 12px 14px;
}

/* Icon */
.card-icon-wrap { flex-shrink: 0; }

.card-icon-bg {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    rgba(var(--card-tint-rgb), 0.22),
    rgba(var(--card-tint-rgb), 0.10)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--card-tint);
  border: 1px solid rgba(var(--card-tint-rgb), 0.15);
}

.is-compact .card-icon-bg {
  width: 34px;
  height: 34px;
  border-radius: 9px;
}

/* Text */
.card-text { flex: 1; min-width: 0; }

.card-title {
  color: var(--color-label);
  margin-bottom: 2px;
}

.card-subtitle {
  color: var(--color-label-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Trailing */
.card-trailing {
  flex-shrink: 0;
  color: var(--color-label-quaternary);
}

.trailing-chevron {
  transition: transform 0.20s ease, color 0.20s ease;
}
.liquid-glass-card:hover .trailing-chevron {
  transform: translateX(2px);
  color: var(--color-label-secondary);
}

/* Shimmer */
.card-shimmer {
  position: absolute;
  inset: 0;
  z-index: 4;
  background: linear-gradient(
    105deg,
    transparent 20%,
    rgba(255,255,255,0.12) 50%,
    transparent 80%
  );
  background-size: 200% 100%;
  background-position: -200% center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.is-animated:hover .card-shimmer {
  opacity: 1;
  animation: shimmer 1.8s ease infinite;
}

/* Glow */
.card-glow {
  position: absolute;
  bottom: -30%;
  left: 10%;
  right: 10%;
  height: 60%;
  background: radial-gradient(
    ellipse at center,
    rgba(var(--card-tint-rgb), 0.15) 0%,
    transparent 70%
  );
  z-index: 2;
  pointer-events: none;
  filter: blur(20px);
}
</style>
