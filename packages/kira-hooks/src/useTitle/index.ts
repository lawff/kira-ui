import { useEffect, useState } from 'react'
import { isString } from '../utils'
import type { ConfigurableDocument } from '../_configurable'
import { defaultDocument } from '../_configurable'
import { useMutationObserver } from '../useMutationObserver'

export interface UseTitleOptions extends ConfigurableDocument {
  /**
   * Observe `document.title` changes using MutationObserve
   *
   * @default false
   */
  observe?: boolean
  /**
   * The template string to parse the title (e.g., '%s | My Website')
   *
   * @default '%s'
   */
  titleTemplate?: string
}

/**
 * Reactive document title.
 *
 * @param newTitle
 * @param options
 */
export function useTitle(
  newTitle: string | null | undefined = null,
  options: UseTitleOptions = {},
) {
  const {
    document = defaultDocument,
    observe = false,
    titleTemplate = '%s',
  } = options
  const [title, setTitle] = useState(newTitle ?? document?.title ?? null)

  useEffect(() => {
    if (isString(title) && document)
      document.title = titleTemplate.replace('%s', title)
  }, [title])

  if (observe && document) {
    useMutationObserver(
      document.head?.querySelector('title'),
      () => {
        if (document && document.title !== title)
          setTitle(document.title)
      },
      { childList: true },
    )
  }

  return {
    title: titleTemplate.replace('%s', title),
    setTitle,
  }
}

export type UseTitleReturn = ReturnType<typeof useTitle>
