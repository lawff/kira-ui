import React, { forwardRef } from 'react'
import type {
  DefaultProps,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@kira-ui/styles'
import {
  extractSystemStyles,
} from '@kira-ui/styles'
import { _useCss } from './use/use-css'

interface _BoxProps extends DefaultProps {}

export type BoxProps<C> = PolymorphicComponentProps<C, _BoxProps>

type BoxComponent = (<C = 'div'>(props: BoxProps<C>) => React.ReactElement) & {
  displayName?: string
}

export const Box: BoxComponent = forwardRef(
  ({ className, component, style, _css, ...others }: BoxProps<'div'>, ref: PolymorphicRef<'div'>) => {
    const { systemStyles, rest } = extractSystemStyles(others)
    const Element = component || 'div'
    return (
      <Element ref={ref} className={_useCss(_css, systemStyles, className)} style={style} {...rest} />
    )
  },
) as any

Box.displayName = '@kira-ui/core/Box'
