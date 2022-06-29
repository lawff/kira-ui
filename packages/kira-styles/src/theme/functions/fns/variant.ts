import type { KiraColor, KiraGradient } from '../../types'

export interface VariantInput {
  variant: 'filled' | 'light' | 'outline' | 'default' | 'gradient' | 'white' | 'subtle'
  color?: KiraColor
  gradient?: KiraGradient
}

export interface VariantOutput {
  border: string
  background: string
  color: string
  hover: string
}
