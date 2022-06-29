import type React from 'react'
import type { KiraColor } from '@kira-ui/styles'

export interface LoaderProps extends React.ComponentPropsWithoutRef<'svg'> {
  size: number
  color: KiraColor
}
