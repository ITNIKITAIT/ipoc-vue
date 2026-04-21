const STORAGE_KEY = "color-mode"

export const useColorMode = () => {
  const isDark = useState<boolean>("color-mode-dark", () => false)

  const apply = (dark: boolean) => {
    if (!import.meta.client) return
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light")
  }

  const initialize = () => {
    if (!import.meta.client) return
    const stored = localStorage.getItem(STORAGE_KEY)
    const dark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches
    isDark.value = dark
    document.documentElement.classList.toggle("dark", dark)
  }

  const toggle = () => {
    isDark.value = !isDark.value
    apply(isDark.value)
  }

  return { isDark, toggle, initialize }
}
