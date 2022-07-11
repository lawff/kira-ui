import { useEffect, useState } from 'react'
import type { Awaitable, StorageLike } from '../utils'
import type { ConfigurableWindow } from '../_configurable'
import { defaultWindow } from '../_configurable'
import { useEventListener } from '../use-event-listener'
import { guessSerializerType } from './guess'

export interface Serializer<T> {
  read(raw: string): T
  write(value: T): string
}

export interface SerializerAsync<T> {
  read(raw: string): Awaitable<T>
  write(value: T): Awaitable<string>
}

export const StorageSerializers: Record<'boolean' | 'object' | 'number' | 'any' | 'string' | 'map' | 'set' | 'date', Serializer<any>> = {
  boolean: {
    read: (v: any) => v === 'true',
    write: (v: any) => String(v),
  },
  object: {
    read: (v: any) => JSON.parse(v),
    write: (v: any) => JSON.stringify(v),
  },
  number: {
    read: (v: any) => Number.parseFloat(v),
    write: (v: any) => String(v),
  },
  any: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
  string: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
  map: {
    read: (v: any) => new Map(JSON.parse(v)),
    write: (v: any) => JSON.stringify(Array.from((v as Map<any, any>).entries())),
  },
  set: {
    read: (v: any) => new Set(JSON.parse(v)),
    write: (v: any) => JSON.stringify(Array.from(v as Set<any>)),
  },
  date: {
    read: (v: any) => new Date(v),
    write: (v: any) => v.toISOString(),
  },
}

export interface StorageOptions<T> extends ConfigurableWindow {

  /**
   * Listen to storage changes, useful for multiple tabs application
   *
   * @default true
   */
  listenToStorageChanges?: boolean

  /**
   * Write the default value to the storage when it does not exist
   *
   * @default true
   */
  writeDefaults?: boolean

  /**
   * Custom data serialization
   */
  serializer?: Serializer<T>

  /**
   * On error callback
   *
   * Default log error to `console.error`
   */
  onError?: (error: unknown) => void

}

/**
 * Reactive LocalStorage/SessionStorage.
 *
 * @param key
 * @param initialValue
 * @param storage
 * @param options
 */
export function useStorage<T extends(string | number | boolean | object | null)>(
  key: string,
  initialValue: T,
  storage: StorageLike | undefined,
  options: StorageOptions<T> = {},
) {
  const {
    listenToStorageChanges = true,
    writeDefaults = true,
    window = defaultWindow,
    onError = (e) => {
      console.error(e)
    },
  } = options
  const [data, setData] = useState<T>(initialValue)

  if (!storage) {
    try {
      storage = defaultWindow?.localStorage
    }
    catch (e) {
      onError(e)
    }
  }

  if (!storage)
    return data

  const rawInit: T = initialValue
  const type = guessSerializerType<T>(rawInit)
  const serializer = options.serializer ?? StorageSerializers[type]

  if (window && listenToStorageChanges)
    useEventListener('storage' as keyof HTMLElementEventMap, update, window)

  useEffect(() => {
    write(data)
  }, [data])

  return { data, setStorage: setData }

  function write(v: unknown) {
    try {
      if (v == null)
        storage!.removeItem(key)
      else
        storage!.setItem(key, serializer.write(v))
    }
    catch (e) {
      onError(e)
    }
  }

  function read(event?: StorageEvent) {
    if (event && event.key !== key)
      return

    try {
      const rawValue = event
        ? event.newValue
        : storage!.getItem(key)

      if (rawValue == null) {
        if (writeDefaults && rawInit !== null)
          storage!.setItem(key, serializer.write(rawInit))
        return rawInit
      }
      else if (typeof rawValue !== 'string') {
        return rawValue
      }
      else {
        return serializer.read(rawValue)
      }
    }
    catch (e) {
      onError(e)
    }
  }

  function update(event?: StorageEvent) {
    if (event && event.key !== key)
      return

    setData(read(event))
  }
}
