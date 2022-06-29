import type { KiraThemeBase } from '../../types'
import type { CSSObject } from '../../../tss'

export function fontStyles(theme: KiraThemeBase) {
  return (): CSSObject => ({ fontFamily: theme.fontFamily || 'sans-serif' })
}
