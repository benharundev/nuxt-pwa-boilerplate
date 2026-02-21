/**
 * PWA Client Plugin
 * Handles iOS-specific PWA behavior:
 * - Detects standalone mode
 * - Shows "Add to Home Screen" prompt banner
 * - Announces offline/online status
 */
export default defineNuxtPlugin(() => {
    if (!import.meta.client) return

    const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true

    // Inject an `is-pwa` class so CSS can adapt for standalone mode
    if (isStandalone) {
        document.documentElement.classList.add('is-pwa')
    }

    // "Add to Home Screen" iOS prompt (only shows on Safari, not in standalone)
    const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent)
    const isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent)
    const hasPrompted = sessionStorage.getItem('a2hs-prompted')

    if (isIOS && isSafari && !isStandalone && !hasPrompted) {
        // Dispatch a custom event — the A2HS banner component listens for this
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent('show-a2hs-prompt'))
            sessionStorage.setItem('a2hs-prompted', '1')
        }, 3000) // Show after 3s
    }

    // Online/offline status classes
    const updateOnlineStatus = () => {
        document.documentElement.classList.toggle('is-offline', !navigator.onLine)
    }
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    updateOnlineStatus()
})
