import { useWindowSize, useMediaQuery } from '@vueuse/core'

export type DeviceType = 'desktop' | 'tablet' | 'mobile'

/**
 * useDeviceType
 * Detects the current device context following Apple HIG breakpoints:
 *   mobile:  < 744px
 *   tablet:  744px – 1023px
 *   desktop: ≥ 1024px
 *
 * Also exposes orientation for iPadOS layout switching.
 */
export function useDeviceType() {
    const { width } = useWindowSize()

    const isDesktop = computed(() => width.value >= 1024)
    const isTablet = computed(() => width.value >= 744 && width.value < 1024)
    const isMobile = computed(() => width.value < 744)

    const deviceType = computed<DeviceType>(() => {
        if (isDesktop.value) return 'desktop'
        if (isTablet.value) return 'tablet'
        return 'mobile'
    })

    // Orientation — relevant for iPad layout switching
    const isLandscape = useMediaQuery('(orientation: landscape)')
    const isPortrait = computed(() => !isLandscape.value)

    // iPad in landscape → show persistent sidebar
    // iPad in portrait  → show bottom tab bar
    const tabletShowSidebar = computed(
        () => isTablet.value && isLandscape.value
    )

    // Reduce motion preference
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

    return {
        width,
        isDesktop,
        isTablet,
        isMobile,
        deviceType,
        isLandscape,
        isPortrait,
        tabletShowSidebar,
        prefersReducedMotion,
    }
}
