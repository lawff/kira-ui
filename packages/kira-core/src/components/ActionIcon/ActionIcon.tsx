import React, { forwardRef } from 'react'
import type {
  DefaultProps,
  KiraColor,
  KiraNumberSize,
  PolymorphicComponentProps,
  PolymorphicRef,
  Selectors,
} from '@kira-ui/styles'
import {
  useKiraDefaultProps,
} from '@kira-ui/styles'
import { Box } from '../Box'
import type { LoaderProps } from '../Loader'
import { Loader } from '../Loader'
import type { ActionIconVariant } from './ActionIcon.styles'
import useStyles, { sizes } from './ActionIcon.styles'

export type ActionIconStylesNames = Selectors<typeof useStyles>

interface _ActionIconProps extends DefaultProps<ActionIconStylesNames> {
  /** Icon rendered inside button */
  children?: React.ReactNode

  /** Controls appearance */
  variant?: ActionIconVariant

  /** Button hover, active and icon colors from theme, defaults to gray */
  color?: KiraColor

  /** Button border-radius from theme or number to set border-radius in px */
  radius?: KiraNumberSize

  /** Predefined icon size or number to set width and height in px */
  size?: KiraNumberSize

  /** Props spread to Loader component */
  loaderProps?: LoaderProps

  /** Indicate loading state */
  loading?: boolean
}

export type ActionIconProps<C> = PolymorphicComponentProps<C, _ActionIconProps>

type ActionIconComponent = (<C = 'button'>(props: ActionIconProps<C>) => React.ReactElement) & {
  displayName?: string
}

const defaultProps: Partial<ActionIconProps<any>> = {
  color: 'gray',
  size: 'md',
  variant: 'hover',
  disabled: false,
  loading: false,
}

export const ActionIcon: ActionIconComponent = forwardRef(
  (props: ActionIconProps<'button'>, ref: PolymorphicRef<'button'>) => {
    const {
      className,
      color,
      children,
      radius,
      size,
      variant,
      disabled,
      loaderProps,
      loading,
      component,
      styles,
      classNames,
      ...others
    } = useKiraDefaultProps('ActionIcon', defaultProps, props)

    const { classes, cx, theme } = useStyles(
      { size, radius, color },
      { name: 'ActionIcon', classNames, styles },
    )
    const colors = theme.fn.variant({ color, variant: 'light' })

    const loader = (
      <Loader color={colors.color} size={theme.fn.size({ size, sizes }) - 12} {...loaderProps} />
    )

    return (
      <Box<any>
        component={component || 'button'}
        className={cx(classes[variant], classes.root, { [classes.loading]: loading }, className)}
        type="button"
        ref={ref}
        disabled={disabled || loading}
        {...others}
      >
        {loading ? loader : children}
      </Box>
    )
  },
) as any

ActionIcon.displayName = '@kira-ui/core/ActionIcon'
