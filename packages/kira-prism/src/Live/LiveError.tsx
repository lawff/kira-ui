import React from 'react'

export function LiveError({ error }: { error: string }) {
  return error ? <pre >{error}</pre> : null
}
