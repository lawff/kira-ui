import { useEffect } from 'react'
import type { ConfigurableWindow } from '../_configurable'
import { defaultWindow } from '../_configurable'

export interface MutationObserverOptions extends MutationObserverInit, ConfigurableWindow {}

/**
 * Watch for changes being made to the DOM tree.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver MutationObserver MDN
 * @param target
 * @param callback
 * @param options
 */
export function useMutationObserver(
  target: React.RefObject<HTMLElement> | HTMLElement,
  callback: MutationCallback,
  options: MutationObserverOptions = {},
) {
  const { window = defaultWindow, ...mutationOptions } = options
  let observer: MutationObserver | undefined
  const isSupported = window && 'MutationObserver' in window

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  useEffect(() => {
    cleanup()

    const el = target instanceof HTMLElement ? target : target.current instanceof HTMLElement ? target.current : null

    if (isSupported && window && el) {
      observer = new MutationObserver(callback)
      observer!.observe(el, mutationOptions)
    }
    return () => cleanup()
  }, [callback, mutationOptions, target])

  return {
    isSupported,
    stop: cleanup,
  }
}

export type UseMutationObserverReturn = ReturnType<typeof useMutationObserver>
