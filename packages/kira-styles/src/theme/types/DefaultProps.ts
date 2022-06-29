import type { CSSProperties } from 'react'
import type { CSSObject } from '../../tss'
import type { KiraStyleSystemProps } from './KiraStyleSystem'
import type { KiraTheme } from './KiraTheme'

export type _Css = CSSObject | ((theme: KiraTheme) => CSSObject)

export interface DefaultProps<T extends string = never> extends KiraStyleSystemProps {
  className?: string
  style?: CSSProperties
  _css?: _Css | (_Css | undefined)[]
  classNames?: Partial<Record<T, string>>
  styles?: Partial<Record<T, CSSObject>> | ((theme: KiraTheme) => Partial<Record<T, CSSObject>>)
}
