import type { EmotionCache, Options } from '@emotion/cache'
import createCache from '@emotion/cache'
import { useKiraEmotionOptions } from '../theme/KiraProvider'

const defaultCacheOptions: Options = {
  key: 'kira-ui',
  prepend: true,
}

export const { getCache } = (() => {
  let cache: EmotionCache
  let _key = defaultCacheOptions.key

  function _getCache(options?: Options) {
    if (cache === undefined || _key !== options?.key) {
      _key = options?.key || 'kira-ui'
      cache = createCache(options?.key ? options : defaultCacheOptions)
    }

    return cache
  }

  return { getCache: _getCache }
})()

export function useEmotionCache() {
  const options = useKiraEmotionOptions()
  return getCache(options)
}
