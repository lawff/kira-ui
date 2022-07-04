import React, { forwardRef } from 'react'
import type { DefaultProps } from '@kira-ui/styles'
import { useKiraDefaultProps } from '@kira-ui/styles'
import { Box } from '../../Box'
import { useGridContext } from '../Grid.context'
import useStyles from './Col.styles'

export interface ColProps extends DefaultProps, React.ComponentPropsWithoutRef<'div'> {
  /** Default col span */
  span?: number

  /** Column left offset */
  offset?: number

  /** Column left offset at (min-width: theme.breakpoints.xs) */
  offsetXs?: number

  /** Column left offset at (min-width: theme.breakpoints.sm) */
  offsetSm?: number

  /** Column left offset at (min-width: theme.breakpoints.md) */
  offsetMd?: number

  /** Column left offset at (min-width: theme.breakpoints.lg) */
  offsetLg?: number

  /** Column left offset at (min-width: theme.breakpoints.xl) */
  offsetXl?: number

  /** Col span at (min-width: theme.breakpoints.xs) */
  xs?: number

  /** Col span at (min-width: theme.breakpoints.sm) */
  sm?: number

  /** Col span at (min-width: theme.breakpoints.md) */
  md?: number

  /** Col span at (min-width: theme.breakpoints.lg) */
  lg?: number

  /** Col span at (min-width: theme.breakpoints.xl) */
  xl?: number
}

const defaultProps: Partial<ColProps> = {
  offset: 0,
  offsetXs: 0,
  offsetSm: 0,
  offsetMd: 0,
  offsetLg: 0,
  offsetXl: 0,
}

function isValidSpan(span: number) {
  return typeof span === 'number' && span > 0 && span % 1 === 0
}

export const Col = forwardRef<HTMLDivElement, ColProps>((props: ColProps, ref) => {
  const {
    children,
    span,
    offset,
    offsetXs,
    offsetSm,
    offsetMd,
    offsetLg,
    offsetXl,
    xs,
    sm,
    md,
    lg,
    xl,
    className,
    classNames,
    styles,
    // id,
    ...others
  } = useKiraDefaultProps('Col', defaultProps, props)

  const { columns, gutter, grow } = useGridContext('Grid.Col')
  const colSpan = span || columns
  const { classes, cx } = useStyles(
    {
      gutter,
      offset,
      offsetXs,
      offsetSm,
      offsetMd,
      offsetLg,
      offsetXl,
      xs,
      sm,
      md,
      lg,
      xl,
      grow,
      columns,
      span: colSpan,
    },
    { classNames, styles, name: 'Col' },
  )

  if (!isValidSpan(colSpan) || colSpan > columns)
    return null

  return (
    <Box className={cx(classes.root, className)} ref={ref} {...others}>
      {children}
    </Box>
  )
})

Col.displayName = '@kira-ui/core/Col'
