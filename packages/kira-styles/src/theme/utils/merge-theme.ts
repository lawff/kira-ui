import type { KiraTheme, KiraThemeBase, KiraThemeOverride } from '../types'
import { attachFunctions } from '../functions/attach-functions'

export function mergeTheme(
  currentTheme: KiraThemeBase,
  themeOverride?: KiraThemeOverride,
): KiraThemeBase {
  if (!themeOverride)
    return currentTheme

  // @ts-expect-error type
  return Object.keys(currentTheme).reduce((acc, key) => {
    if (key === 'headings' && themeOverride.headings) {
      const sizes = themeOverride.headings.sizes
        ? Object.keys(currentTheme.headings.sizes).reduce((headingsAcc, h) => {
          headingsAcc[h] = {
            ...currentTheme.headings.sizes[h],
            ...themeOverride.headings.sizes[h],
          }
          return headingsAcc
        }, {} as KiraThemeBase['headings']['sizes'])
        : currentTheme.headings.sizes
      return {
        ...acc,
        headings: {
          ...currentTheme.headings,
          ...themeOverride.headings,
          sizes,
        },
      }
    }

    acc[key]
      = typeof themeOverride[key] === 'object'
        ? { ...currentTheme[key], ...themeOverride[key] }
        : typeof themeOverride[key] === 'number'
          ? themeOverride[key]
          : themeOverride[key] || currentTheme[key]
    return acc
  }, {} as KiraThemeBase)
}

export function mergeThemeWithFunctions(
  currentTheme: KiraThemeBase,
  themeOverride?: KiraThemeOverride,
): KiraTheme {
  return attachFunctions(mergeTheme(currentTheme, themeOverride))
}
