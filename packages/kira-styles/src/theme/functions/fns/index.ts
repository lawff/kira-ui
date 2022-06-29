import { size } from './size'
import { largerThan, smallerThan } from './breakpoints'
import { rgba } from './rgba'
import { fontStyles } from './font-styles'
import { variant } from './variant'
import { focusStyles } from './focus-styles'
import { hover } from './hover'
import { themeColor } from './theme-color'
import { radius } from './radius'

export const fns = {
  smallerThan,
  largerThan,
  rgba,
  size,
  fontStyles,
  variant,
  focusStyles,
  hover,
  themeColor,
  radius,
} as const
