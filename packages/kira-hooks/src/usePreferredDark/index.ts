import { useMediaQuery } from '../useMediaQuery'
import type { ConfigurableWindow } from '../_configurable'
s
/**
 * Reactive dark theme preference.
 * @param [options]
 */
export function usePreferredDark(options?: ConfigurableWindow) {
  return useMediaQuery('(prefers-color-scheme: dark)', options)
}
