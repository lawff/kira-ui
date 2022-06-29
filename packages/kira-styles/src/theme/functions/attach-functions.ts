import type { KiraTheme, KiraThemeBase } from '../types'
import { fns } from './fns'

export function attachFunctions(themeBase: KiraThemeBase): KiraTheme {
  return {
    ...themeBase,
    fn: {
      largerThan: fns.largerThan(themeBase),
      smallerThan: fns.smallerThan(themeBase),
      rgba: fns.rgba,
      size: fns.size,
      fontStyles: fns.fontStyles(themeBase),
    },
  }
}
