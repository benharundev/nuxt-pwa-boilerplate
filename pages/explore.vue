<script setup lang="ts">
definePageMeta({ title: 'Analytics' })

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$29',
    desc: 'For indie hackers and small teams',
    tint: '#5856D6',
    features: ['Up to 5 seats', '10GB storage', 'Core analytics', 'Email support'],
    current: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$99',
    desc: 'For growing teams that need more power',
    tint: '#007AFF',
    features: ['Up to 25 seats', '100GB storage', 'Advanced analytics', 'Priority support', 'Custom domains'],
    current: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For large-scale orgs with custom needs',
    tint: '#FF9500',
    features: ['Unlimited seats', 'Unlimited storage', 'SLA guarantee', 'Dedicated CSM', 'SSO / SAML'],
    current: false,
  },
]

const usageStats = [
  { label: 'API Calls',   used: 84_200,  total: 100_000, unit: '',   tint: '#007AFF' },
  { label: 'Storage',     used: 42,       total: 100,     unit: 'GB', tint: '#30D158' },
  { label: 'Seats Used',  used: 18,       total: 25,      unit: '',   tint: '#5856D6' },
  { label: 'Automations', used: 7,        total: 20,      unit: '',   tint: '#FF9500' },
]

const integrations = [
  { name: 'Slack',      icon: 'message-square', connected: true,  tint: '#5856D6' },
  { name: 'GitHub',     icon: 'github',          connected: true,  tint: '#1C1C1E' },
  { name: 'Stripe',     icon: 'credit-card',     connected: false, tint: '#30D158' },
  { name: 'Zapier',     icon: 'zap',             connected: false, tint: '#FF9500' },
  { name: 'Notion',     icon: 'file-text',       connected: false, tint: '#8E8E93' },
  { name: 'Jira',       icon: 'trello',          connected: false, tint: '#007AFF' },
]

function pct(used: number, total: number) {
  return Math.min(100, Math.round((used / total) * 100))
}

function formatNum(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}
</script>

<template>
  <div class="explore-page">

    <!-- Usage Overview -->
    <section class="section">
      <div class="section-head">
        <h3 class="text-title3">Usage This Month</h3>
        <span class="text-footnote" style="color: var(--color-label-secondary);">Resets Feb 28</span>
      </div>
      <div class="usage-grid liquid-glass">
        <div
          v-for="stat in usageStats"
          :key="stat.label"
          class="usage-item"
        >
          <div class="usage-row">
            <span class="text-subheadline usage-label">{{ stat.label }}</span>
            <span class="text-footnote" style="color: var(--color-label-secondary);">
              {{ formatNum(stat.used) }} / {{ formatNum(stat.total) }}{{ stat.unit }}
            </span>
          </div>
          <div class="usage-track">
            <div
              class="usage-fill"
              :style="{
                width: pct(stat.used, stat.total) + '%',
                background: stat.tint,
                boxShadow: `0 0 8px ${stat.tint}55`,
              }"
            />
          </div>
          <span
            class="text-caption2"
            :style="{ color: pct(stat.used, stat.total) > 80 ? '#FF3B30' : 'var(--color-label-secondary)' }"
          >
            {{ pct(stat.used, stat.total) }}% used
          </span>
        </div>
      </div>
    </section>

    <!-- Pricing Plans -->
    <section class="section">
      <h3 class="text-title3 section-head">Plans</h3>
      <div class="plans-grid">
        <div
          v-for="plan in plans"
          :key="plan.id"
          class="plan-card liquid-glass apple-hover"
          :class="{ 'plan-current': plan.current }"
          :style="plan.current ? `--plan-tint: ${plan.tint}` : ''"
        >
          <!-- Current badge -->
          <div v-if="plan.current" class="plan-badge text-caption2">
            Current Plan
          </div>

          <div class="plan-head">
            <h4 class="text-title3" :style="{ color: plan.tint }">{{ plan.name }}</h4>
            <div class="plan-price">
              <span class="text-large-title">{{ plan.price }}</span>
              <span v-if="plan.price !== 'Custom'" class="text-subheadline" style="color: var(--color-label-secondary);">/mo</span>
            </div>
            <p class="text-footnote plan-desc">{{ plan.desc }}</p>
          </div>

          <ul class="plan-features">
            <li
              v-for="feat in plan.features"
              :key="feat"
              class="plan-feature text-callout"
            >
              <lucide-check :size="14" :style="{ color: plan.tint }" />
              {{ feat }}
            </li>
          </ul>

          <UiGlassButton
            :variant="plan.current ? 'secondary' : 'primary'"
            size="md"
            :full-width="true"
            :style="plan.current ? '' : `--color-accent: ${plan.tint}; --color-accent-rgb: 0,122,255`"
          >
            {{ plan.current ? 'Manage Plan' : plan.price === 'Custom' ? 'Contact Sales' : 'Upgrade' }}
          </UiGlassButton>
        </div>
      </div>
    </section>

    <!-- Integrations -->
    <section class="section">
      <h3 class="text-title3 section-head">Integrations</h3>
      <div class="integrations-grid">
        <UiLiquidGlassCard
          v-for="int in integrations"
          :key="int.name"
          :icon="int.icon"
          :title="int.name"
          :subtitle="int.connected ? 'Connected' : 'Not connected'"
          :tint="int.connected ? int.tint : 'var(--color-label-quaternary)'"
          :depth="1"
          :animated="true"
          compact
        />
      </div>
    </section>

  </div>
</template>

<style scoped>
.explore-page {
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 16px;
}

.section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 8px;
}
.section-head h3 { color: var(--color-label); }

/* Usage */
.usage-grid {
  border-radius: var(--radius-xl);
  overflow: hidden;
}
.usage-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  border-bottom: 0.5px solid var(--material-separator);
}
.usage-item:last-child { border-bottom: none; }

.usage-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.usage-label { color: var(--color-label); font-weight: 500; }

.usage-track {
  width: 100%;
  height: 6px;
  background: var(--material-bg-thin);
  border-radius: 3px;
  overflow: hidden;
}
.usage-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Plans */
.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}
.plan-card {
  border-radius: var(--radius-xl);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  overflow: hidden;
}
.plan-current {
  border-color: rgba(var(--color-accent-rgb), 0.30) !important;
  box-shadow: 0 0 0 1.5px rgba(var(--color-accent-rgb), 0.25),
              0 8px 24px rgba(0,0,0,0.12);
}

.plan-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(var(--color-accent-rgb), 0.14);
  color: var(--color-accent);
  padding: 3px 8px;
  border-radius: 20px;
  font-weight: 600;
}

.plan-head { display: flex; flex-direction: column; gap: 4px; }
.plan-price { display: flex; align-items: baseline; gap: 4px; margin-top: 4px; }
.plan-price .text-large-title { color: var(--color-label); }
.plan-desc { color: var(--color-label-secondary); margin-top: 4px; }

.plan-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}
.plan-feature {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-label);
}

/* Integrations */
.integrations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
}
</style>
