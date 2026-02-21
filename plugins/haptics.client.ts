/**
 * Haptics Plugin — registers $haptics globally
 */
import { useHaptics } from '~/composables/useHaptics'

export default defineNuxtPlugin((nuxtApp) => {
    const haptics = useHaptics()
    return {
        provide: {
            haptics,
        },
    }
})
