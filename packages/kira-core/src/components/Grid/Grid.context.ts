import type { KiraNumberSize } from '@kira-ui/styles'
import { createUseContext } from '../../utils'

interface GridContextValue {
  gutter: KiraNumberSize
  grow: boolean
  columns: number
}

export const [GridProvider, useGridContext] = createUseContext<GridContextValue>(null)
