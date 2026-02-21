import { useRouter } from 'vue-router'

const SWIPE_THRESHOLD = 60   // px — minimum swipe distance
const EDGE_ZONE = 30   // px — left edge zone where swipe starts
const SWIPE_MAX_TIME_MS = 500  // ms — max gesture duration

/**
 * useSwipeBack
 * Detects left-edge swipe gesture and triggers Vue Router go(-1).
 * Mirrors iOS UINavigationController swipe-to-back.
 *
 * @param enabled - reactive ref/boolean to conditionally enable
 */
export function useSwipeBack(enabled: Ref<boolean> | boolean = true) {
    const router = useRouter()
    const haptics = useHaptics()

    let startX = 0
    let startY = 0
    let startTime = 0
    let isTracking = false

    const { progress } = ref({ progress: 0 })

    const swipeProgress = ref(0) // 0–1 for gesture-driven animation

    const onTouchStart = (e: TouchEvent) => {
        const isEnabled = typeof enabled === 'boolean' ? enabled : enabled.value
        if (!isEnabled) return

        const touch = e.touches[0]
        if (touch.clientX > EDGE_ZONE) return // only track from edge

        startX = touch.clientX
        startY = touch.clientY
        startTime = Date.now()
        isTracking = true
    }

    const onTouchMove = (e: TouchEvent) => {
        if (!isTracking) return
        const touch = e.touches[0]
        const dx = touch.clientX - startX
        const dy = Math.abs(touch.clientY - startY)

        // Cancel if swiping vertically
        if (dy > dx * 0.7) {
            isTracking = false
            swipeProgress.value = 0
            return
        }

        // Update gesture progress (0–1)
        swipeProgress.value = Math.min(1, Math.max(0, dx / 200))
    }

    const onTouchEnd = (e: TouchEvent) => {
        if (!isTracking) return
        isTracking = false

        const touch = e.changedTouches[0]
        const dx = touch.clientX - startX
        const elapsed = Date.now() - startTime

        swipeProgress.value = 0

        if (dx >= SWIPE_THRESHOLD && elapsed <= SWIPE_MAX_TIME_MS) {
            haptics.impact('light')
            router.go(-1)
        }
    }

    const onTouchCancel = () => {
        isTracking = false
        swipeProgress.value = 0
    }

    // Attach/detach based on SSR safety
    if (import.meta.client) {
        onMounted(() => {
            document.addEventListener('touchstart', onTouchStart, { passive: true })
            document.addEventListener('touchmove', onTouchMove, { passive: true })
            document.addEventListener('touchend', onTouchEnd, { passive: true })
            document.addEventListener('touchcancel', onTouchCancel, { passive: true })
        })
        onUnmounted(() => {
            document.removeEventListener('touchstart', onTouchStart)
            document.removeEventListener('touchmove', onTouchMove)
            document.removeEventListener('touchend', onTouchEnd)
            document.removeEventListener('touchcancel', onTouchCancel)
        })
    }

    return { swipeProgress }
}
