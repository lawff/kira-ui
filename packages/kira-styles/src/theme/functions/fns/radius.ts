import type { KiraNumberSize, KiraThemeBase } from '../../types'

export function radius(theme: KiraThemeBase) {
  return (size: KiraNumberSize | (string & {})): string | number => {
    if (typeof size === 'number')
      return size

    const defaultRadius
      = typeof theme.defaultRadius === 'number'
        ? theme.defaultRadius
        : theme.radius[theme.defaultRadius] || theme.defaultRadius

    return theme.radius[size] || size || defaultRadius
  }
}
