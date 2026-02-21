<script setup lang="ts">
/**
 * GlassButton — Apple-style glass button
 * Variants: primary, secondary, destructive, ghost
 */
interface Props {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  iconPosition?: 'left' | 'right'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant:      'primary',
  size:         'md',
  iconPosition: 'left',
  loading:      false,
  disabled:     false,
  fullWidth:    false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const haptics = useHaptics()

const onClick = (e: MouseEvent) => {
  if (props.disabled || props.loading) return
  haptics.impact(props.variant === 'destructive' ? 'medium' : 'light')
  emit('click', e)
}

const iconSize = computed(() => props.size === 'sm' ? 14 : props.size === 'lg' ? 20 : 16)
</script>

<template>
  <button
    class="glass-btn apple-press"
    :class="[`btn-${variant}`, `btn-${size}`, { 'btn-full': fullWidth, 'btn-loading': loading, 'btn-disabled': disabled }]"
    :disabled="disabled || loading"
    @click="onClick"
    type="button"
  >
    <!-- Loading spinner -->
    <div v-if="loading" class="btn-spinner">
      <lucide-loader-2 :size="iconSize" class="animate-spin" />
    </div>

    <!-- Left icon -->
    <component
      v-else-if="icon && iconPosition === 'left'"
      :is="`lucide-${icon}`"
      :size="iconSize"
      class="btn-icon"
    />

    <!-- Label -->
    <span class="btn-label">
      <slot>Button</slot>
    </span>

    <!-- Right icon -->
    <component
      v-if="!loading && icon && iconPosition === 'right'"
      :is="`lucide-${icon}`"
      :size="iconSize"
      class="btn-icon"
    />
  </button>
</template>

<style scoped>
.glass-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  border-radius: var(--radius-md);
  font-family: inherit;
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  transition:
    transform 0.12s ease,
    filter 0.12s ease,
    box-shadow 0.20s ease;
}

/* Sizes */
.btn-sm {
  padding: 6px 12px;
  font-size: var(--text-footnote);
  border-radius: var(--radius-sm);
  min-height: 28px;
}
.btn-md {
  padding: 10px 18px;
  font-size: var(--text-callout);
  min-height: 40px;
}
.btn-lg {
  padding: 14px 24px;
  font-size: var(--text-body);
  min-height: 50px;
  border-radius: var(--radius-lg);
}

.btn-full { width: 100%; }

/* Variants */
.btn-primary {
  background: var(--color-accent);
  color: #fff;
  box-shadow: 0 4px 12px rgba(var(--color-accent-rgb), 0.35);
}
.btn-primary:hover {
  box-shadow: 0 6px 20px rgba(var(--color-accent-rgb), 0.45);
}

.btn-secondary {
  background: var(--material-bg-thin);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  color: var(--color-accent);
  border: 1px solid var(--material-border);
}

.btn-destructive {
  background: rgba(255, 59, 48, 0.12);
  color: #FF3B30;
  border: 1px solid rgba(255, 59, 48, 0.20);
}
.dark .btn-destructive {
  background: rgba(255, 69, 58, 0.15);
  color: #FF453A;
  border-color: rgba(255, 69, 58, 0.25);
}

.btn-ghost {
  background: transparent;
  color: var(--color-accent);
}
.btn-ghost:hover {
  background: rgba(var(--color-accent-rgb), 0.08);
}

/* States */
.btn-disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
.btn-loading {
  opacity: 0.85;
  cursor: not-allowed;
}

.btn-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Shimmer inner highlight */
.glass-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0.15),
    transparent
  );
  pointer-events: none;
  border-radius: inherit;
}
</style>
