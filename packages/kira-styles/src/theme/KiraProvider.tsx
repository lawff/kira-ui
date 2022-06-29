import React, { createContext, useContext } from 'react'
import type { Options as EmotionCacheOptions } from '@emotion/cache'
import type { CSSObject } from '../tss'
import { DEFAULT_THEME } from './default-theme'
import { GlobalStyles } from './GlobalStyles'
import { KiraCssVariables } from './KiraCssVariables'
import type { KiraTheme, KiraThemeOverride } from './types'
import { mergeThemeWithFunctions } from './utils/merge-theme'
import { filterProps } from './utils/filter-props'
import { NormalizeCSS } from './NormalizeCSS'

type ProviderStyles = Record<string, Record<string, CSSObject> | ((theme: KiraTheme, params: any) => Record<string, CSSObject>)>

type ProviderClassNames = Record<string, Record<string, string>>
type KiraDefaultProps = Record<string, Record<string, any>>

interface KiraProviderContextType {
  theme: KiraTheme
  styles: ProviderStyles
  classNames: ProviderClassNames
  emotionOptions: EmotionCacheOptions
  defaultProps: KiraDefaultProps
}

const KiraProviderContext = createContext<KiraProviderContextType>({
  theme: DEFAULT_THEME,
  styles: {},
  classNames: {},
  emotionOptions: { key: 'kira-ui', prepend: true },
  defaultProps: {},
})

export function useKiraTheme() {
  return useContext(KiraProviderContext)?.theme || DEFAULT_THEME
}

export function useKiraThemeStyles(component: string) {
  const ctx = useContext(KiraProviderContext)
  return { styles: ctx.styles[component] || {}, classNames: ctx.classNames[component] || {} }
}

export function useKiraEmotionOptions(): EmotionCacheOptions {
  return useContext(KiraProviderContext)?.emotionOptions || { key: 'kira-ui', prepend: true }
}

export function useKiraDefaultProps<T extends Record<string, any>>(
  component: string,
  defaultProps: Partial<T>,
  props: T,
): T {
  const contextProps = useContext(KiraProviderContext)?.defaultProps?.[component] || {}
  return { ...defaultProps, ...contextProps, ...filterProps(props) }
}

export interface KiraProviderProps {
  theme?: KiraThemeOverride
  styles?: ProviderStyles
  classNames?: ProviderClassNames
  defaultProps?: KiraDefaultProps
  emotionOptions?: EmotionCacheOptions
  withNormalizeCSS?: boolean
  withGlobalStyles?: boolean
  withCSSVariables?: boolean
  children: React.ReactNode
  inherit?: boolean
}

export function KiraProvider({
  theme,
  styles = {},
  classNames = {},
  defaultProps = {},
  emotionOptions,
  withNormalizeCSS = false,
  withGlobalStyles = false,
  withCSSVariables = false,
  inherit = false,
  children,
}: KiraProviderProps) {
  const ctx = useContext(KiraProviderContext)
  const overrides = {
    themeOverride: inherit ? { ...ctx.theme, ...theme } : theme,
    emotionOptions: inherit ? { ...ctx.emotionOptions, ...emotionOptions } : emotionOptions,
    styles: inherit ? { ...ctx.styles, ...styles } : styles,
    classNames: inherit ? { ...ctx.classNames, ...classNames } : classNames,
    defaultProps: inherit ? { ...ctx.defaultProps, ...defaultProps } : defaultProps,
  }

  const mergedTheme = mergeThemeWithFunctions(DEFAULT_THEME, overrides.themeOverride)

  return (
    <KiraProviderContext.Provider
      value={{
        theme: mergedTheme,
        styles: overrides.styles,
        classNames: overrides.classNames,
        emotionOptions: overrides.emotionOptions,
        defaultProps: overrides.defaultProps,
      }}
    >
      {withNormalizeCSS && <NormalizeCSS />}
      {withGlobalStyles && <GlobalStyles theme={mergedTheme} />}
      {withCSSVariables && <KiraCssVariables theme={mergedTheme} />}
      {children}
    </KiraProviderContext.Provider>
  )
}

KiraProvider.displayName = '@kira-ui/core/KiraProvider'
