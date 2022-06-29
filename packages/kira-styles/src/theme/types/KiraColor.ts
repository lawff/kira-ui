import type { Tuple } from './Tuple'

export type DefaultKiraColor =
  | 'dark'
  | 'gray'
  | 'red'
  | 'pink'
  | 'grape'
  | 'violet'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'green'
  | 'lime'
  | 'yellow'
  | 'orange'
  | 'teal'
  | (string & {})

export interface KiraThemeColorsOverride {}

export type KiraThemeColors = KiraThemeColorsOverride extends {
  colors: Record<infer CustomColors, Tuple<string, 10>>
}
  ? Record<CustomColors, Tuple<string, 10>>
  : Record<DefaultKiraColor, Tuple<string, 10>>

export type KiraColor = keyof KiraThemeColors
