import type { CSSProperties } from 'react'
import type { VariantInput, VariantOutput } from '../functions/fns/variant'
import type { CSSObject } from '../../tss'
import type { KiraNumberSize, KiraSize, KiraSizes } from './KiraSize'
import type { DeepPartial } from './DeepPartial'
import type { KiraThemeColors } from './KiraColor'
import type { ColorScheme } from './ColorScheme'

export type LoaderType = 'bars' | 'oval' | 'dots'
export type KiraThemeOther = Record<string, any>

export interface HeadingStyle {
  fontSize: CSSProperties['fontSize']
  lineHeight: CSSProperties['lineHeight']
}

type Shade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface KiraPrimaryShade {
  light: Shade
  dark: Shade
}

interface KiraThemeFunctions {
  fontStyles(): any
  focusStyles(): any
  cover(offset?: number | string): any
  themeColor(color: string, shade: number, primaryFallback?: boolean): string
  rgba(color: string, alpha: number): string
  size(props: { size: string | number; sizes: Record<string, any> }): any
  linearGradient(deg: number, ...colors: string[]): string
  radialGradient(...colors: string[]): string
  smallerThan(breakpoint: KiraNumberSize): string
  largerThan(breakpoint: KiraNumberSize): string
  lighten(color: string, alpha: number): string
  darken(color: string, alpha: number): string
  radius(size: KiraNumberSize | (string & {})): string | number
  variant(payload: VariantInput): VariantOutput
  primaryShade(colorScheme?: ColorScheme): Shade
  hover(hoverStyle: CSSObject): any
}

export interface KiraTheme {
  dir: 'ltr' | 'rtl'
  primaryShade: Shade | KiraPrimaryShade
  focusRing: 'auto' | 'always' | 'never'
  defaultRadius: KiraNumberSize | (string & {})
  loader: LoaderType
  dateFormat: string
  colorScheme: ColorScheme
  white: string
  black: string
  colors: KiraThemeColors
  fontFamily: CSSProperties['fontFamily']
  lineHeight: CSSProperties['lineHeight']
  transitionTimingFunction: CSSProperties['transitionTimingFunction']
  fontFamilyMonospace: CSSProperties['fontFamily']
  primaryColor: keyof KiraThemeColors

  fontSizes: KiraSizes
  radius: KiraSizes
  spacing: KiraSizes
  breakpoints: KiraSizes
  shadows: Record<KiraSize, string>

  headings: {
    fontFamily: CSSProperties['fontFamily']
    fontWeight: CSSProperties['fontWeight']
    sizes: {
      h1: HeadingStyle
      h2: HeadingStyle
      h3: HeadingStyle
      h4: HeadingStyle
      h5: HeadingStyle
      h6: HeadingStyle
    }
  }

  // TODO: add more functions
  fn: Partial<KiraThemeFunctions>
  other: KiraThemeOther

  datesLocale: string
}

export type KiraThemeBase = Omit<KiraTheme, 'fn'>
export type KiraThemeOverride = DeepPartial<Omit<KiraThemeBase, 'fn' | 'other'>> & {
  other?: KiraThemeOther
}
