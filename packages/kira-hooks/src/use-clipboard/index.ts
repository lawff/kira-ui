import { useState } from 'react'
import { useEventListener } from '../use-event-listener'
import type { ConfigurableNavigator } from '../_configurable'
import { defaultNavigator } from '../_configurable'

export interface ClipboardOptions extends ConfigurableNavigator {
  /**
   * Enabled reading for clipboard
   *
   * @default false
   */
  read?: boolean

  /**
   * Copy source
   */
  source?: string

  /**
   * Milliseconds to reset state of `copied` ref
   *
   * @default 1500
   */
  copiedDuring?: number
}

export interface ClipboardReturn {
  isSupported: boolean
  text: string
  copied: boolean
  copy: (text?: string) => void
  reset: VoidFunction
  error: Error | null
}

export function useClipboard(options: ClipboardOptions): ClipboardReturn {
  const {
    navigator = defaultNavigator,
    read = false,
    source,
    copiedDuring = 1500,
  } = options

  const [error, setError] = useState<Error>(null)
  const [copied, setCopied] = useState(false)
  const [text, setText] = useState('')
  const [copyTimeoutId, setCopyTimeoutId] = useState(null)

  const events = ['copy', 'cut']
  const isSupported = Boolean(navigator && 'clipboard' in navigator)

  function updateText() {
    navigator!.clipboard.readText().then((value) => {
      setText(value)
    })
  }

  if (isSupported && read) {
    for (const event of events)
      useEventListener(event as keyof HTMLElementEventMap, updateText)
  }

  const handleCopyResult = (value: boolean) => {
    clearTimeout(copyTimeoutId)
    setCopyTimeoutId(setTimeout(() => setCopied(false), copiedDuring))
    setCopied(value)
  }

  const copy = (valueToCopy: string = source) => {
    if (isSupported) {
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => {
          setText(valueToCopy)
          handleCopyResult(true)
        })
        .catch(err => setError(err))
    }
    else {
      setError(new Error('useClipboard: navigator.clipboard is not supported'))
    }
  }

  const reset = () => {
    setText('')
    setCopied(false)
    setError(null)
    clearTimeout(copyTimeoutId)
  }

  return { copy, text, isSupported, reset, error, copied }
}
