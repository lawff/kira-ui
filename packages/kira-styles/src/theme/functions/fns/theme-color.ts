import type { KiraThemeBase } from '../../types'

export function themeColor(theme: KiraThemeBase) {
  return (color: string, shade: number, primaryFallback = true) => {
    const primaryShades = theme.colors[theme.primaryColor]
    return color in theme.colors
      ? theme.colors[color][shade]
      : primaryFallback
        ? primaryShades[shade]
        : color
  }
}
