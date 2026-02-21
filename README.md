# Nuxt PWA Boilerplate — Apple HIG Adaptive Layout

A production-grade Nuxt 3 SaaS starter with a **Unified Adaptive Layout** that seamlessly shifts between:
- 🖥 **macOS Desktop** — 3-column (Sidebar / Content List / Detail)
- 📱 **iPadOS Tablet** — Persistent sidebar (landscape) or bottom tab bar (portrait)
- 📲 **iOS Mobile** — Liquid Glass bottom tab bar + swipe-to-back

Built for SaaS products that need to feel native on every platform.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Nuxt 3 |
| PWA | `@vite-pwa/nuxt` |
| Styling | Tailwind CSS + CSS Variables |
| Icons | `lucide-vue-next` |
| Utilities | `@vueuse/core` |

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## Structure

```
├── assets/css/
│   ├── main.css          # Entry — imports all CSS modules
│   ├── materials.css     # Apple UltraThin → Chrome + Liquid Glass
│   ├── typography.css    # Dynamic Type scale (body → large title)
│   ├── safe-areas.css    # env(safe-area-inset-*) utilities
│   └── transitions.css   # Page / tab / sidebar animations
│
├── composables/
│   ├── useDeviceType.ts  # desktop / tablet / mobile detection
│   ├── useAppleTheme.ts  # dark/light mode + persistence
│   ├── useHaptics.ts     # Web Vibration API (impact, notification)
│   └── useSwipeBack.ts   # Left-edge swipe → router.go(-1)
│
├── components/
│   ├── layout/
│   │   ├── DesktopLayout.vue  # macOS 3-column
│   │   ├── TabletLayout.vue   # iPadOS adaptive
│   │   └── MobileLayout.vue   # iOS Liquid Glass
│   └── ui/
│       ├── LiquidGlassCard.vue  # Apple depth + shimmer
│       ├── BottomTabBar.vue     # glassmorphism tab bar
│       ├── GlassButton.vue      # primary/secondary/destructive
│       └── ContentList.vue      # macOS list panel
│
├── layouts/default.vue   # Adaptive layout switcher
├── pages/
│   ├── index.vue         # SaaS Dashboard
│   ├── explore.vue       # Analytics / Plans / Integrations
│   └── profile.vue       # Account & Settings
│
└── plugins/
    ├── pwa.client.ts     # iOS Add-to-Home-Screen + standalone detect
    └── haptics.client.ts # $haptics global
```

## Apple Materials

```css
.material-ultrathin  /* Sidebars — blur(20px) */
.material-thin       /* Toolbars — blur(30px) */
.material-regular    /* Cards — blur(40px)    */
.material-thick      /* Nav bars — blur(60px) */
.material-chrome     /* Tab bars — blur(80px) */
.liquid-glass        /* Multi-layer depth card */
```

## PWA / iOS Configuration

- `display: standalone` — full-screen on "Add to Home Screen"
- `viewport-fit=cover` — respects Dynamic Island / notch
- Apple splash screens (6 device sizes) pre-configured in `nuxt.config.ts`
- `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style` set

## License

MIT
