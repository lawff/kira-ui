import { useEffect } from 'react'
import { noop } from '../utils/is'
import { defaultWindow } from '../_configurable'

/**
 * React hook to manage browser event listeners
 *
 * @param event the event name
 * @param listener the event handler function to execute
 * @param target the dom to execute against (defaults to `window`)
 * @param options the event listener options
 *
 * @returns a function to remove the event listener
 */

export function useEventListener<K extends keyof HTMLElementEventMap>(
  event: K,
  listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
  target?: EventTarget,
  options?: boolean | AddEventListenerOptions,
) {
  useEffect(() => {
    const targetRef = target || defaultWindow

    if (!listener)
      return noop
    targetRef.addEventListener(event, listener, options)
    return () => targetRef.removeEventListener(event, listener, options)
  }, [listener, options, target, event])

  return () => {
    const targetRef = target || defaultWindow
    targetRef.removeEventListener(event, listener, options)
  }
}
