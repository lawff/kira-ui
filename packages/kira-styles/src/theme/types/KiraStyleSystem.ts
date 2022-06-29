import type { KiraNumberSize } from './KiraSize'

type KiraStyleSystemValue = KiraNumberSize | (string & {})

export interface KiraStyleSystemProps {
  m?: KiraStyleSystemValue
  my?: KiraStyleSystemValue
  mx?: KiraStyleSystemValue
  mt?: KiraStyleSystemValue
  mb?: KiraStyleSystemValue
  ml?: KiraStyleSystemValue
  mr?: KiraStyleSystemValue

  p?: KiraStyleSystemValue
  py?: KiraStyleSystemValue
  px?: KiraStyleSystemValue
  pt?: KiraStyleSystemValue
  pb?: KiraStyleSystemValue
  pl?: KiraStyleSystemValue
  pr?: KiraStyleSystemValue
}

export type KiraStyleSystemSize = keyof KiraStyleSystemProps
