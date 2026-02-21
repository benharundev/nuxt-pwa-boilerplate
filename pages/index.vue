<script setup lang="ts">
/**
 * index.vue — SaaS Dashboard
 * Shows key metrics, activity feed, quick actions — SaaS-ready template.
 */
definePageMeta({
  title: 'Dashboard',
})

const { isDesktop } = useDeviceType()

// ─── Mock Data ───────────────────────────────────────────────────
const metrics = [
  {
    id: 'mrr',
    label: 'Monthly Revenue',
    value: '$24,800',
    change: '+12.5%',
    positive: true,
    icon: 'trending-up',
    tint: '#30D158',
    subtitle: 'vs last month',
  },
  {
    id: 'users',
    label: 'Active Users',
    value: '3,284',
    change: '+8.2%',
    positive: true,
    icon: 'users',
    tint: '#007AFF',
    subtitle: 'paid seats',
  },
  {
    id: 'churn',
    label: 'Churn Rate',
    value: '1.4%',
    change: '-0.3%',
    positive: true,
    icon: 'shield-check',
    tint: '#5856D6',
    subtitle: 'this month',
  },
  {
    id: 'tickets',
    label: 'Open Tickets',
    value: '17',
    change: '-5',
    positive: true,
    icon: 'life-buoy',
    tint: '#FF9500',
    subtitle: 'support queue',
  },
]

const recentActivity = [
  { id: 1, user: 'Sarah K.',  action: 'upgraded to Pro',         time: '2m ago',   icon: 'zap',          tint: '#30D158' },
  { id: 2, user: 'Alex M.',   action: 'invited 3 team members',  time: '14m ago',  icon: 'user-plus',    tint: '#007AFF' },
  { id: 3, user: 'Priya S.',  action: 'connected Slack',         time: '1h ago',   icon: 'plug',         tint: '#5856D6' },
  { id: 4, user: 'James L.',  action: 'exported CSV report',     time: '3h ago',   icon: 'file-down',    tint: '#FF9500' },
  { id: 5, user: 'Maria G.',  action: 'cancelled subscription',  time: '5h ago',   icon: 'x-circle',     tint: '#FF3B30' },
]

const quickActions = [
  { label: 'Invite User',    icon: 'user-plus',   variant: 'primary'   as const },
  { label: 'New Workspace',  icon: 'folder-plus', variant: 'secondary' as const },
  { label: 'Export Report',  icon: 'download',    variant: 'secondary' as const },
]
</script>

<template>
  <div class="dashboard">

    <!-- Welcome Header -->
    <div class="dash-header">
      <div>
        <p class="text-footnote" style="color: var(--color-label-secondary); margin-bottom: 4px;">
          Good evening,
        </p>
        <h2 class="text-title2" style="color: var(--color-label);">
          Your workspace
        </h2>
      </div>
      <div class="dash-header-actions">
        <UiGlassButton icon="bell" variant="ghost" size="sm" />
        <UiGlassButton icon="settings" variant="secondary" size="sm" />
      </div>
    </div>

    <!-- Metrics Grid -->
    <div class="metrics-grid">
      <UiLiquidGlassCard
        v-for="m in metrics"
        :key="m.id"
        :icon="m.icon"
        :title="m.value"
        :subtitle="m.label"
        :tint="m.tint"
        :depth="2"
        :animated="true"
        compact
      >
        <div class="metric-change" :class="m.positive ? 'positive' : 'negative'">
          <component
            :is="m.positive ? 'lucide-arrow-up-right' : 'lucide-arrow-down-right'"
            :size="11"
          />
          {{ m.change }} {{ m.subtitle }}
        </div>
      </UiLiquidGlassCard>
    </div>

    <!-- Quick Actions -->
    <div class="section">
      <h3 class="text-title3 section-title">Quick Actions</h3>
      <div class="quick-actions">
        <UiGlassButton
          v-for="action in quickActions"
          :key="action.label"
          :icon="action.icon"
          :variant="action.variant"
          size="md"
        >
          {{ action.label }}
        </UiGlassButton>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="section">
      <h3 class="text-title3 section-title">Recent Activity</h3>
      <div class="activity-list liquid-glass" style="border-radius: var(--radius-xl);">
        <div
          v-for="(item, i) in recentActivity"
          :key="item.id"
          class="activity-item"
          :class="{ 'last-item': i === recentActivity.length - 1 }"
        >
          <div
            class="activity-avatar"
            :style="{ background: `rgba(${hexToRgb(item.tint)}, 0.15)`, color: item.tint }"
          >
            <component :is="`lucide-${item.icon}`" :size="16" />
          </div>
          <div class="activity-text">
            <span class="text-subheadline" style="color: var(--color-label); font-weight: 600;">
              {{ item.user }}
            </span>
            <span class="text-subheadline" style="color: var(--color-label-secondary);">
              {{ ' ' }}{{ item.action }}
            </span>
          </div>
          <span class="activity-time text-caption1">{{ item.time }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
// Helper — not reactive, just utility
function hexToRgb(hex: string): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `${r}, ${g}, ${b}`
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 16px;
}

.dash-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 4px;
}

.dash-header-actions {
  display: flex;
  gap: 8px;
}

/* Metrics */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.metric-change {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: var(--text-caption1);
  font-weight: 500;
  margin-top: 4px;
}
.metric-change.positive { color: #30D158; }
.metric-change.negative { color: #FF3B30; }

/* Sections */
.section-title {
  color: var(--color-label);
  margin-bottom: 12px;
}

/* Quick actions */
.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Activity */
.activity-list {
  overflow: hidden;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  position: relative;
}

.activity-item:not(.last-item)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 56px;
  right: 0;
  height: 0.5px;
  background: var(--material-separator);
}

.activity-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-text {
  flex: 1;
  line-height: 1.4;
}

.activity-time {
  color: var(--color-label-tertiary);
  flex-shrink: 0;
}
</style>
