import type { KiraTheme } from '../theme'
import { useKiraTheme, useKiraThemeStyles } from '../theme/KiraProvider'
import type { CSSObject } from './types'
import { fromEntries } from './utils/from-entries'
import { useCss } from './use-css'
import { mergeClassNames } from './utils/merge-class-names'

export interface UseStylesOptions<Key extends string> {
  classNames?: Partial<Record<Key, string>>
  styles?:
  | Partial<Record<Key, CSSObject>>
  | ((theme: KiraTheme) => Partial<Record<Key, CSSObject>>)
  name: string
}

export function createStyles<Key extends string = string, Params = void>(
  getCssObjectOrCssObject:
  | ((
    theme: KiraTheme,
    params: Params,
    createRef: (refName: string) => string
  ) => Record<Key, CSSObject>)
  | Record<Key, CSSObject>,
) {
  const getCssObject
    = typeof getCssObjectOrCssObject === 'function'
      ? getCssObjectOrCssObject
      : () => getCssObjectOrCssObject

  function useStyles(params: Params, options?: UseStylesOptions<Key>) {
    const theme = useKiraTheme()
    const { styles: themeStyles, classNames: themeClassNames } = useKiraThemeStyles(
      options?.name,
    )

    const { css, cx } = useCss()

    function createRef(refName: string) {
      return `__kira-ui-ref-${refName || ''}`
    }

    const cssObject = getCssObject(theme, params, createRef)

    const _styles
      = typeof options?.styles === 'function' ? options?.styles(theme) : options?.styles || {}
    const _themeStyles
      = typeof themeStyles === 'function' ? themeStyles(theme, params || {}) : themeStyles || {}

    const classes = fromEntries(
      Object.keys(cssObject).map((key) => {
        const mergedStyles = cx(css(cssObject[key]), css(_themeStyles[key]), css(_styles[key]))
        return [key, mergedStyles]
      }),
    ) as Record<Key, string>

    return {
      classes: mergeClassNames(cx, classes, themeClassNames, options?.classNames, options?.name),
      cx,
      theme,
    }
  }

  return useStyles
}
