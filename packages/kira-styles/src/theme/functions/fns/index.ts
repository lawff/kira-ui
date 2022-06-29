import { size } from './size'
import { largerThan, smallerThan } from './breakpoints'
import { rgba } from './rgba'
import { fontStyles } from './font-styles'

export const fns = {
  smallerThan,
  largerThan,
  rgba,
  size,
  fontStyles,
} as const
