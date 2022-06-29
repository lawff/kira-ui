import type { KiraThemeBase } from '../../types'

export function primaryShade(theme: KiraThemeBase) {
  return (colorScheme?: 'light' | 'dark') => {
    if (typeof theme.primaryShade === 'number')
      return theme.primaryShade

    return theme.primaryShade[colorScheme || theme.colorScheme]
  }
}
