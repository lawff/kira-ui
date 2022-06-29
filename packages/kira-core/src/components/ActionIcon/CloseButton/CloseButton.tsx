import React, { forwardRef } from 'react'
import { useKiraTheme } from '@kira-ui/styles'
import type { ActionIconProps } from '../ActionIcon'
import { ActionIcon } from '../ActionIcon'
import { CloseIcon } from './CloseIcon'

export interface CloseButtonProps extends Omit<ActionIconProps<'button'>, 'children'> {
  /** Width and height of cross icon */
  iconSize?: number
}

const iconSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
}

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ iconSize, size = 'md', ...others }: CloseButtonProps, ref) => {
    const theme = useKiraTheme()
    const _iconSize = iconSize || theme.fn.size({ size, sizes: iconSizes })

    return (
      <ActionIcon size={size} ref={ref} {...others}>
        <CloseIcon width={_iconSize} height={_iconSize} />
      </ActionIcon>
    )
  },
)

CloseButton.displayName = '@kira-ui/core/CloseButton'
