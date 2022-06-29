import type { KiraTheme, KiraThemeBase } from '../types'
import { fns } from './fns'

export function attachFunctions(themeBase: KiraThemeBase): KiraTheme {
  return {
    ...themeBase,
    fn: {
      largerThan: fns.largerThan(themeBase),
      smallerThan: fns.smallerThan(themeBase),
      themeColor: fns.themeColor(themeBase),
      radius: fns.radius(themeBase),
      rgba: fns.rgba,
      size: fns.size,
      fontStyles: fns.fontStyles(themeBase),
      variant: fns.variant(themeBase),
      focusStyles: fns.focusStyles(themeBase),
      hover: fns.hover,
    },
  }
}
