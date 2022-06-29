import React from 'react'
import type { CSSObject } from '@emotion/react'
import { Global as EmotionGlobal, css } from '@emotion/react'
import { useKiraTheme } from '../theme/KiraProvider'
import type { KiraTheme } from '../theme/types'

type EmotionStyles = CSSObject | CSSObject[]

interface GlobalStylesProps {
  styles: EmotionStyles | ((theme: KiraTheme) => EmotionStyles)
}

export function Global({ styles }: GlobalStylesProps) {
  const theme = useKiraTheme()
  return <EmotionGlobal styles={css(typeof styles === 'function' ? styles(theme) : styles)} />
}
