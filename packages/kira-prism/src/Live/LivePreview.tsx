import { Box } from '@kira-ui/core'
import React from 'react'

interface LivePreviewProps {
  children?: React.ReactNode
  element?: any
}

export function LivePreview({ children, element: Element }: LivePreviewProps) {
  return (
    <Box>
      {Element && <Element />}
      {children}
    </Box>
  )
}

LivePreview.displayName = '@kira-ui/prism/LivePreview'
