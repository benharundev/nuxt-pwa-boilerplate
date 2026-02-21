/**
 * useHaptics
 * Simulates Apple-style haptic feedback patterns using the Web Vibration API.
 * Gracefully degrades on platforms that don't support vibration.
 */

type HapticStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
type HapticNotification = 'success' | 'warning' | 'error'
type HapticImpact = 'selection'

const VIBRATION_PATTERNS = {
    // UIImpactFeedbackGenerator styles
    light: [10],
    medium: [18],
    heavy: [30],
    rigid: [8, 5, 8],
    soft: [15, 10],

    // UINotificationFeedbackGenerator
    success: [15, 80, 15],
    warning: [20, 60, 30],
    error: [30, 50, 30, 50, 60],

    // UISelectionFeedbackGenerator
    selection: [5],
}

export function useHaptics() {
    const isSupported = computed(() =>
        import.meta.client && 'vibrate' in navigator
    )

    const vibrate = (pattern: number | number[]) => {
        if (!isSupported.value) return
        navigator.vibrate(pattern)
    }

    const impact = (style: HapticStyle = 'medium') => {
        vibrate(VIBRATION_PATTERNS[style])
    }

    const notification = (type: HapticNotification = 'success') => {
        vibrate(VIBRATION_PATTERNS[type])
    }

    const selection = () => {
        vibrate(VIBRATION_PATTERNS.selection)
    }

    const cancel = () => {
        if (!isSupported.value) return
        navigator.vibrate(0)
    }

    return {
        isSupported,
        impact,
        notification,
        selection,
        cancel,
    }
}
