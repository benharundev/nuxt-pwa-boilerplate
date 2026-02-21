/**
 * useAppleTheme
 * Manages light/dark mode with system preference detection.
 * Persists user choice to localStorage and applies `.dark` class on <html>.
 */
export function useAppleTheme() {
    const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

    const storedTheme = import.meta.client
        ? localStorage.getItem('apple-theme') as 'dark' | 'light' | null
        : null

    const isDark = ref<boolean>(
        storedTheme !== null
            ? storedTheme === 'dark'
            : prefersDark.value
    )

    // Sync to <html> class and localStorage
    const applyTheme = (dark: boolean) => {
        if (!import.meta.client) return
        const html = document.documentElement
        if (dark) {
            html.classList.add('dark')
        } else {
            html.classList.remove('dark')
        }
        localStorage.setItem('apple-theme', dark ? 'dark' : 'light')
    }

    // Watch for changes
    watch(isDark, (val) => applyTheme(val), { immediate: true })

    // Follow system changes if user hasn't set a preference
    watch(prefersDark, (val) => {
        if (!localStorage.getItem('apple-theme')) {
            isDark.value = val
        }
    })

    const toggleTheme = () => {
        isDark.value = !isDark.value
    }

    const setLight = () => { isDark.value = false }
    const setDark = () => { isDark.value = true }
    const setSystem = () => {
        localStorage.removeItem('apple-theme')
        isDark.value = prefersDark.value
    }

    const theme = computed(() => isDark.value ? 'dark' : 'light')

    return { isDark, theme, toggleTheme, setLight, setDark, setSystem }
}
