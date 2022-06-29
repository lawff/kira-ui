import type { KiraNumberSize, KiraThemeBase } from '../../types'
import { size } from './size'

export function largerThan(theme: KiraThemeBase) {
  return (breakpoint: KiraNumberSize) =>
    `@media (min-width: ${size({ size: breakpoint, sizes: theme.breakpoints }) + 1}px)`
}

export function smallerThan(theme: KiraThemeBase) {
  return (breakpoint: KiraNumberSize) =>
    `@media (max-width: ${size({ size: breakpoint, sizes: theme.breakpoints })}px)`
}
