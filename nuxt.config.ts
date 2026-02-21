// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },

    modules: [
        '@nuxtjs/tailwindcss',
        '@vite-pwa/nuxt',
    ],

    css: ['~/assets/css/main.css'],

    app: {
        head: {
            htmlAttrs: { lang: 'en' },
            title: 'Nuxt PWA Boilerplate',
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1, viewport-fit=cover',
                },
                { name: 'apple-mobile-web-app-capable', content: 'yes' },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
                { name: 'apple-mobile-web-app-title', content: 'Boilerplate' },
                { name: 'mobile-web-app-capable', content: 'yes' },
                { name: 'theme-color', content: '#000000', media: '(prefers-color-scheme: dark)' },
                { name: 'theme-color', content: '#f2f2f7', media: '(prefers-color-scheme: light)' },
                { name: 'description', content: 'A Nuxt 3 PWA Boilerplate with Apple HIG Unified Adaptive Layout' },
            ],
            link: [
                { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' },
                { rel: 'apple-touch-icon', sizes: '152x152', href: '/icons/apple-touch-icon-152x152.png' },
                { rel: 'apple-touch-icon', sizes: '167x167', href: '/icons/apple-touch-icon-167x167.png' },
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-touch-icon-180x180.png' },
                // iOS Splash Screens — generated via plugin
                { rel: 'apple-touch-startup-image', href: '/splashscreens/iphone5_splash.png', media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)' },
                { rel: 'apple-touch-startup-image', href: '/splashscreens/iphone6_splash.png', media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)' },
                { rel: 'apple-touch-startup-image', href: '/splashscreens/iphonex_splash.png', media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)' },
                { rel: 'apple-touch-startup-image', href: '/splashscreens/iphone14pro_splash.png', media: '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)' },
                { rel: 'apple-touch-startup-image', href: '/splashscreens/ipad_splash.png', media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)' },
                { rel: 'apple-touch-startup-image', href: '/splashscreens/ipadpro1_splash.png', media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)' },
                { rel: 'apple-touch-startup-image', href: '/splashscreens/ipadpro2_splash.png', media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)' },
            ],
        },
        pageTransition: { name: 'apple-page', mode: 'out-in' },
        layoutTransition: { name: 'apple-fade', mode: 'out-in' },
    },

    // PWA Configuration
    pwa: {
        registerType: 'autoUpdate',
        manifest: {
            name: 'Nuxt PWA Boilerplate',
            short_name: 'Boilerplate',
            description: 'Apple HIG Adaptive Layout PWA',
            theme_color: '#000000',
            background_color: '#000000',
            display: 'standalone',
            orientation: 'any',
            scope: '/',
            start_url: '/',
            icons: [
                {
                    src: '/icons/icon-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'any',
                },
                {
                    src: '/icons/icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any',
                },
                {
                    src: '/icons/icon-512x512-maskable.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable',
                },
            ],
        },
        workbox: {
            navigateFallback: '/',
            globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
            runtimeCaching: [
                {
                    urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'google-fonts-cache',
                        expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
                        cacheableResponse: { statuses: [0, 200] },
                    },
                },
            ],
        },
        client: {
            installPrompt: true,
            periodicSyncForUpdates: 3600,
        },
        devOptions: {
            enabled: true,
            suppressWarnings: true,
            navigateFallbackAllowlist: [/^\/$/],
            type: 'module',
        },
    },
})
