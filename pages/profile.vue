<script setup lang="ts">
definePageMeta({ title: 'Account' })

const { isDark, toggleTheme, theme } = useAppleTheme()

const user = {
  name:    'Alex Morgan',
  email:   'alex@company.io',
  role:    'Admin',
  plan:    'Pro',
  avatar:  null as string | null,
  initials:'AM',
}

const billingInfo = {
  card:    '•••• •••• •••• 4242',
  brand:   'Visa',
  expiry:  '08 / 27',
  nextBill:'Mar 1, 2026',
  amount:  '$99.00',
}

const teamMembers = [
  { name: 'Alex Morgan',   email: 'alex@company.io',  role: 'Admin',  active: true  },
  { name: 'Sarah Kim',     email: 'sarah@company.io', role: 'Member', active: true  },
  { name: 'James Liu',     email: 'james@company.io', role: 'Member', active: true  },
  { name: 'Priya Shah',    email: 'priya@company.io', role: 'Viewer', active: false },
]

const notificationSettings = [
  { id: 'billing',   label: 'Billing alerts',          enabled: ref(true)  },
  { id: 'security',  label: 'Security notifications',  enabled: ref(true)  },
  { id: 'product',   label: 'Product updates',         enabled: ref(false) },
  { id: 'digest',    label: 'Weekly digest',           enabled: ref(true)  },
]

const dangerActions = [
  { label: 'Delete workspace',   icon: 'trash-2',   color: '#FF3B30' },
  { label: 'Export all data',    icon: 'download',  color: '#FF9500' },
]
</script>

<template>
  <div class="profile-page">

    <!-- User Identity Card -->
    <div class="user-card liquid-glass">
      <div class="user-avatar">
        {{ user.initials }}
      </div>
      <div class="user-info">
        <h2 class="text-title3">{{ user.name }}</h2>
        <p class="text-callout" style="color: var(--color-label-secondary);">{{ user.email }}</p>
        <div class="user-badges">
          <span class="badge badge-role text-caption2">{{ user.role }}</span>
          <span class="badge badge-plan text-caption2">{{ user.plan }}</span>
        </div>
      </div>
      <UiGlassButton icon="pencil" variant="secondary" size="sm">Edit</UiGlassButton>
    </div>

    <!-- Appearance -->
    <section class="settings-section liquid-glass">
      <div class="settings-row">
        <div class="settings-row-label">
          <component :is="isDark ? 'lucide-moon' : 'lucide-sun'" :size="18" class="row-icon" />
          <div>
            <div class="text-subheadline" style="color: var(--color-label);">Appearance</div>
            <div class="text-caption1" style="color: var(--color-label-secondary);">{{ isDark ? 'Dark mode' : 'Light mode' }}</div>
          </div>
        </div>
        <button class="toggle-btn" :class="{ on: isDark }" @click="toggleTheme" role="switch" :aria-checked="isDark">
          <div class="toggle-thumb" />
        </button>
      </div>
    </section>

    <!-- Billing -->
    <section class="section">
      <h3 class="text-title3 section-title">Billing</h3>
      <div class="settings-group liquid-glass">
        <div class="settings-row">
          <div class="settings-row-label">
            <lucide-credit-card :size="18" class="row-icon tint-green" />
            <div>
              <div class="text-subheadline" style="color: var(--color-label);">{{ billingInfo.brand }} {{ billingInfo.card }}</div>
              <div class="text-caption1" style="color: var(--color-label-secondary);">Expires {{ billingInfo.expiry }}</div>
            </div>
          </div>
          <UiGlassButton variant="ghost" size="sm">Update</UiGlassButton>
        </div>
        <div class="apple-separator" />
        <div class="settings-row">
          <div class="settings-row-label">
            <lucide-calendar :size="18" class="row-icon tint-blue" />
            <div>
              <div class="text-subheadline" style="color: var(--color-label);">Next billing</div>
              <div class="text-caption1" style="color: var(--color-label-secondary);">{{ billingInfo.nextBill }} — {{ billingInfo.amount }}</div>
            </div>
          </div>
          <UiGlassButton variant="ghost" size="sm">Invoices</UiGlassButton>
        </div>
      </div>
    </section>

    <!-- Team Members -->
    <section class="section">
      <div class="section-head-row">
        <h3 class="text-title3 section-title">Team</h3>
        <UiGlassButton icon="user-plus" variant="primary" size="sm">Invite</UiGlassButton>
      </div>
      <div class="settings-group liquid-glass">
        <div
          v-for="(member, i) in teamMembers"
          :key="member.email"
          class="settings-row"
          :class="{ 'not-last': i < teamMembers.length - 1 }"
        >
          <div class="settings-row-label">
            <div class="member-avatar" :class="{ inactive: !member.active }">
              {{ member.name.split(' ').map(n => n[0]).join('') }}
            </div>
            <div>
              <div class="text-subheadline" :style="{ color: member.active ? 'var(--color-label)' : 'var(--color-label-secondary)' }">
                {{ member.name }}
              </div>
              <div class="text-caption1" style="color: var(--color-label-secondary);">{{ member.email }}</div>
            </div>
          </div>
          <span class="role-badge text-caption2" :class="`role-${member.role.toLowerCase()}`">
            {{ member.role }}
          </span>
        </div>
      </div>
    </section>

    <!-- Notifications -->
    <section class="section">
      <h3 class="text-title3 section-title">Notifications</h3>
      <div class="settings-group liquid-glass">
        <div
          v-for="(notif, i) in notificationSettings"
          :key="notif.id"
          class="settings-row"
          :class="{ 'not-last': i < notificationSettings.length - 1 }"
        >
          <span class="text-subheadline" style="color: var(--color-label);">{{ notif.label }}</span>
          <button
            class="toggle-btn"
            :class="{ on: notif.enabled.value }"
            @click="notif.enabled.value = !notif.enabled.value"
            role="switch"
            :aria-checked="notif.enabled.value"
          >
            <div class="toggle-thumb" />
          </button>
        </div>
      </div>
    </section>

    <!-- Danger Zone -->
    <section class="section">
      <h3 class="text-title3 section-title" style="color: #FF3B30;">Danger Zone</h3>
      <div class="settings-group liquid-glass danger-zone">
        <div
          v-for="(action, i) in dangerActions"
          :key="action.label"
          class="settings-row"
          :class="{ 'not-last': i < dangerActions.length - 1 }"
        >
          <div class="settings-row-label">
            <component :is="`lucide-${action.icon}`" :size="18" :style="{ color: action.color }" />
            <span class="text-subheadline" :style="{ color: action.color }">{{ action.label }}</span>
          </div>
          <lucide-chevron-right :size="16" style="color: var(--color-label-quaternary);" />
        </div>
      </div>
    </section>

    <!-- Sign out -->
    <div style="padding-bottom: 8px;">
      <UiGlassButton variant="destructive" size="md" icon="log-out" full-width>
        Sign Out
      </UiGlassButton>
    </div>

  </div>
</template>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 16px;
}

/* User card */
.user-card {
  border-radius: var(--radius-xl);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 20px;
  background: linear-gradient(135deg, #007AFF, #5856D6);
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  letter-spacing: -0.5px;
  box-shadow: 0 4px 16px rgba(0,122,255,0.35);
}

.user-info { flex: 1; min-width: 0; }
.user-info h2 { color: var(--color-label); }

.user-badges {
  display: flex;
  gap: 6px;
  margin-top: 6px;
}

.badge {
  padding: 2px 8px;
  border-radius: 20px;
  font-weight: 600;
}
.badge-role {
  background: rgba(var(--color-accent-rgb), 0.12);
  color: var(--color-accent);
}
.badge-plan {
  background: rgba(48, 209, 88, 0.12);
  color: #30D158;
}

/* Settings groups */
.settings-section,
.settings-group {
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  position: relative;
}

.not-last::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 54px;
  right: 0;
  height: 0.5px;
  background: var(--material-separator);
}

.settings-row-label {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.row-icon { color: var(--color-label-secondary); flex-shrink: 0; }
.tint-green { color: #30D158; }
.tint-blue  { color: #007AFF; }

/* Toggle */
.toggle-btn {
  width: 48px;
  height: 28px;
  border-radius: 14px;
  background: var(--material-bg-thin);
  border: 1.5px solid var(--material-border);
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  transition: background 0.25s ease, border-color 0.25s ease;
  padding: 0;
}
.toggle-btn.on {
  background: var(--color-accent);
  border-color: transparent;
}
.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.25);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toggle-btn.on .toggle-thumb {
  transform: translateX(20px);
}

/* Member */
.member-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(var(--color-accent-rgb), 0.14);
  color: var(--color-accent);
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.member-avatar.inactive {
  background: var(--material-bg-thin);
  color: var(--color-label-tertiary);
}

.role-badge {
  padding: 2px 8px;
  border-radius: 20px;
  font-weight: 600;
  flex-shrink: 0;
}
.role-admin  { background: rgba(var(--color-accent-rgb), 0.12); color: var(--color-accent); }
.role-member { background: rgba(48,209,88,0.12);   color: #30D158; }
.role-viewer { background: var(--material-bg-thin); color: var(--color-label-secondary); }

/* Sections */
.section-title { color: var(--color-label); margin-bottom: 10px; }
.section-head-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }

.danger-zone {
  border: 1px solid rgba(255, 59, 48, 0.20) !important;
}
</style>
