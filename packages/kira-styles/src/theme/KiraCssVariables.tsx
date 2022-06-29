import React from 'react'
import { Global } from '@emotion/react'
import type { KiraSize, KiraTheme } from './types'

function assignSizeVariables(
  variables: Record<string, string>,
  sizes: Record<KiraSize, number | string>,
  name: string,
) {
  Object.keys(sizes).forEach((size) => {
    variables[`--kira-${name}-${size}`]
      = typeof sizes[size] === 'number' ? `${sizes[size]}px` : sizes[size]
  })
}

export function KiraCssVariables({ theme }: { theme: KiraTheme }) {
  const variables: Record<string, string> = {
    '--kira-color-white': theme.white,
    '--kira-color-black': theme.black,
    '--kira-transition-timing-function': theme.transitionTimingFunction,
    '--kira-line-height': `${theme.lineHeight}`,
    '--kira-font-family': theme.fontFamily,
    '--kira-font-family-monospace': theme.fontFamilyMonospace,
    '--kira-font-family-headings': theme.headings.fontFamily,
    '--kira-heading-font-weight': `${theme.headings.fontWeight}`,
  }

  assignSizeVariables(variables, theme.shadows, 'shadow')
  assignSizeVariables(variables, theme.fontSizes, 'font-size')
  assignSizeVariables(variables, theme.radius, 'radius')
  assignSizeVariables(variables, theme.spacing, 'spacing')

  Object.keys(theme.colors).forEach((color) => {
    theme.colors[color].forEach((shade, index) => {
      variables[`--kira-color-${color}-${index}`] = shade
    })
  })

  const headings = theme.headings.sizes

  Object.keys(headings).forEach((heading) => {
    variables[`--kira-${heading}-font-size`] = `${headings[heading].fontSize}px`
    variables[`--kira-${heading}-line-height`] = `${headings[heading].lineHeight}`
  })

  return (
    <Global
      styles={{
        ':root': variables,
      }}
    />
  )
}
