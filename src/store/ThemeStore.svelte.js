export const themeStore = $state({
  isDark: false,
})

export const toggleTheme = () => {
  themeStore.isDark = !themeStore.isDark
}
