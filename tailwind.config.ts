import type { Config } from 'tailwindcss'

export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            // Apple HIG Breakpoints
            screens: {
                'xs': '390px',   // iPhone 14 Pro
                'sm': '430px',   // iPhone 14 Pro Max
                'md': '744px',   // iPad mini
                'lg': '1024px',  // iPad Pro / MacBook
                'xl': '1280px',  // MacBook 13"
                '2xl': '1440px', // MacBook 16"
            },

            fontFamily: {
                // SF Pro stack — falls back to system-ui on non-Apple platforms
                sans: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"SF Pro Display"',
                    '"SF Pro Text"',
                    '"Helvetica Neue"',
                    'Arial',
                    'sans-serif',
                ],
                mono: [
                    '"SF Mono"',
                    '"Fira Code"',
                    '"Fira Mono"',
                    '"Roboto Mono"',
                    'monospace',
                ],
            },

            colors: {
                // Apple System Colors
                apple: {
                    blue: '#007AFF',
                    green: '#34C759',
                    indigo: '#5856D6',
                    orange: '#FF9500',
                    pink: '#FF2D55',
                    purple: '#AF52DE',
                    red: '#FF3B30',
                    teal: '#5AC8FA',
                    yellow: '#FFCC00',
                    // Grays
                    gray1: '#8E8E93',
                    gray2: '#AEAEB2',
                    gray3: '#C7C7CC',
                    gray4: '#D1D1D6',
                    gray5: '#E5E5EA',
                    gray6: '#F2F2F7',
                },
                // Dark mode grays
                dark: {
                    gray1: '#636366',
                    gray2: '#48484A',
                    gray3: '#3A3A3C',
                    gray4: '#2C2C2E',
                    gray5: '#1C1C1E',
                    gray6: '#000000',
                },
            },

            borderRadius: {
                'apple-sm': '8px',
                'apple': '12px',
                'apple-md': '16px',
                'apple-lg': '20px',
                'apple-xl': '28px',
            },

            boxShadow: {
                'apple-sm': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
                'apple': '0 4px 16px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)',
                'apple-md': '0 8px 24px rgba(0,0,0,0.14), 0 3px 8px rgba(0,0,0,0.10)',
                'apple-lg': '0 16px 48px rgba(0,0,0,0.16), 0 6px 16px rgba(0,0,0,0.10)',
                'apple-xl': '0 32px 80px rgba(0,0,0,0.20), 0 12px 24px rgba(0,0,0,0.12)',
                'glass': '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)',
                'glass-dark': '0 8px 32px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.06)',
            },

            spacing: {
                'safe-top': 'env(safe-area-inset-top)',
                'safe-bottom': 'env(safe-area-inset-bottom)',
                'safe-left': 'env(safe-area-inset-left)',
                'safe-right': 'env(safe-area-inset-right)',
            },

            transitionTimingFunction: {
                'apple-spring': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                'apple-snap': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                'apple-ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },

            transitionDuration: {
                '250': '250ms',
                '350': '350ms',
                '450': '450ms',
            },

            backdropBlur: {
                'apple-thin': '20px',
                'apple': '40px',
                'apple-thick': '60px',
                'apple-ultra': '80px',
            },

            zIndex: {
                'sidebar': '100',
                'navbar': '200',
                'tabbar': '300',
                'overlay': '400',
                'modal': '500',
                'toast': '600',
            },
        },
    },
    plugins: [],
} satisfies Config
