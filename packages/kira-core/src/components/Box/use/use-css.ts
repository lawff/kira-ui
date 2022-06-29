import type {
  KiraStyleSystemProps,
  KiraTheme,
  _Css,
} from '@kira-ui/styles'
import {
  useCss,
  useKiraTheme,
} from '@kira-ui/styles'
import { getSystemStyles } from './get-system-styles'

function extractSx(sx: _Css, theme: KiraTheme) {
  return typeof sx === 'function' ? sx(theme) : sx
}

export function _useCss(sx: _Css | _Css[], systemProps: KiraStyleSystemProps, className: string) {
  const theme = useKiraTheme()
  const { css, cx } = useCss()

  if (Array.isArray(sx)) {
    return cx(
      className,
      css(getSystemStyles(systemProps, theme)),
      sx.map(partial => css(extractSx(partial, theme))),
    )
  }

  return cx(className, css(extractSx(sx, theme)), css(getSystemStyles(systemProps, theme)))
}
