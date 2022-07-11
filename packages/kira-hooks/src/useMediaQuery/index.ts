import { useEffect, useRef, useState } from 'react'
import type { ConfigurableWindow } from '../_configurable'
import { defaultWindow } from '../_configurable'

type MediaQueryCallback = (event: { matches: boolean; media: string }) => void

/**
 * Older versions of Safari (shipped withCatalina and before) do not support addEventListener on matchMedia
 * https://stackoverflow.com/questions/56466261/matchmedia-addlistener-marked-as-deprecated-addeventlistener-equivalent
 * */
function attachMediaListener(query: MediaQueryList, callback: MediaQueryCallback) {
  try {
    query.addEventListener('change', callback)
    return () => query.removeEventListener('change', callback)
  }
  catch (e) {
    query.addListener(callback)
    return () => query.removeListener(callback)
  }
}

function getInitialValue(query: string, initialValue?: boolean, w?: Window) {
  if (initialValue !== undefined)
    return initialValue

  if (typeof w !== 'undefined' && 'matchMedia' in w)
    return window.matchMedia(query).matches

  return false
}

/**
 * Reactive Media Query.
 *
 * @param query
 * @param options
 */
export function useMediaQuery(query: string, options: ConfigurableWindow & { initialValue?: boolean } = {}) {
  const { window = defaultWindow } = options
  const isSupported = Boolean(window && 'matchMedia' in window && typeof window!.matchMedia === 'function')
  const [matches, setMatches] = useState(getInitialValue(query, options.initialValue, window))
  const queryRef = useRef<MediaQueryList>()

  useEffect(() => {
    if (isSupported) {
      queryRef.current = window.matchMedia(query)
      // TODO: dup
      setMatches(queryRef.current.matches)
      return attachMediaListener(queryRef.current, event => setMatches(event.matches))
    }

    return undefined
  }, [query])

  return matches
}
