<script setup lang="ts">
/**
 * ContentList — macOS-style content list panel
 * Middle column in the three-column desktop layout.
 */
const route = useRoute()

const listItems = [
  { id: '1', title: 'Getting Started',    subtitle: 'Nuxt + PWA setup',          icon: 'rocket',      to: '/',        badge: 'New' },
  { id: '2', title: 'Adaptive Layouts',   subtitle: 'Desktop, Tablet, Mobile',   icon: 'layout-grid', to: '/explore',      },
  { id: '3', title: 'Materials & Glass',  subtitle: 'Apple vibrancy system',     icon: 'sparkles',    to: '/',        },
  { id: '4', title: 'Typography',         subtitle: 'Dynamic Type scale',        icon: 'type',        to: '/',        },
  { id: '5', title: 'PWA Config',         subtitle: 'iOS splash & manifest',     icon: 'smartphone',  to: '/',        },
  { id: '6', title: 'Composables',        subtitle: 'useDeviceType & more',      icon: 'code-2',      to: '/',        },
  { id: '7', title: 'Profile',            subtitle: 'User profile template',     icon: 'user-circle', to: '/profile', },
]

const selectedId = ref('1')

const onSelect = (id: string) => {
  selectedId.value = id
}
</script>

<template>
  <div class="content-list">
    <!-- Header -->
    <div class="list-header material-thick">
      <h2 class="text-title3">Contents</h2>
      <button class="list-filter-btn apple-press">
        <lucide-sliders-horizontal :size="16" />
      </button>
    </div>

    <!-- Apple separator -->
    <div class="apple-separator" />

    <!-- Items -->
    <div class="list-items">
      <button
        v-for="item in listItems"
        :key="item.id"
        class="list-item apple-press"
        :class="{ 'is-selected': selectedId === item.id }"
        @click="onSelect(item.id)"
      >
        <!-- Icon -->
        <div class="item-icon-wrap">
          <component :is="`lucide-${item.icon}`" :size="18" />
        </div>

        <!-- Text -->
        <div class="item-text">
          <div class="item-title text-subheadline">{{ item.title }}</div>
          <div class="item-subtitle text-caption1">{{ item.subtitle }}</div>
        </div>

        <!-- Badge + Chevron -->
        <div class="item-trailing">
          <span v-if="item.badge" class="item-badge text-caption2">{{ item.badge }}</span>
          <lucide-chevron-right :size="14" class="item-chevron" />
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.content-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: max(20px, env(safe-area-inset-top)) 16px 14px;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 0.5px solid var(--material-separator);
}

.list-header h2 { color: var(--color-label); }

.list-filter-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: rgba(var(--color-accent-rgb), 0.08);
  color: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.list-items {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}

.list-item::after {
  /* Separator line */
  content: '';
  position: absolute;
  bottom: 0;
  left: 54px; /* Indent past icon */
  right: 0;
  height: 0.5px;
  background: var(--material-separator);
}

.list-item:last-child::after { display: none; }

.list-item:hover {
  background: rgba(var(--color-accent-rgb), 0.06);
}

.list-item.is-selected {
  background: rgba(var(--color-accent-rgb), 0.12);
}

.item-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(var(--color-accent-rgb), 0.10);
  color: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.list-item.is-selected .item-icon-wrap {
  background: rgba(var(--color-accent-rgb), 0.20);
}

.item-text { flex: 1; min-width: 0; }

.item-title {
  color: var(--color-label);
  font-weight: 500;
  margin-bottom: 1px;
}

.item-subtitle {
  color: var(--color-label-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-trailing {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.item-badge {
  background: var(--color-accent);
  color: #fff;
  padding: 1px 6px;
  border-radius: 20px;
  font-weight: 600;
}

.item-chevron {
  color: var(--color-label-quaternary);
}
</style>
