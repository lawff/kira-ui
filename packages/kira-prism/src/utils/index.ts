import React from 'react'
import * as kira from '@kira-ui/core'
import errorBoundary from './errorBoundary'
import transform from './transform'
import evalCode from './evalCode'

export const renderElementAsync: any = (
  { code = '', scope = { ...kira } },
  resultCallback,
  errorCallback,
) => {
  const render = (element) => {
    if (typeof element === 'undefined')
      errorCallback(new SyntaxError('`render` must be called with valid JSX.'))

    else
      resultCallback(errorBoundary(element, errorCallback))
  }

  if (!/render\s*\(/.test(code)) {
    return errorCallback(
      new SyntaxError('evaluations must call `render`.'),
    )
  }

  evalCode(transform(code.replaceAll(/import\s+\{[^}]+\}\s+from\s+['"]([^'"]+)['"];*/g, '')), { React, ...scope, render })
}
