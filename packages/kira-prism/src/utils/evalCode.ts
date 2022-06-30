const evalCode = (code, scope) => {
  const scopeKeys = Object.keys(scope)
  const scopeValues = scopeKeys.map(key => scope[key])
  // eslint-disable-next-line no-new-func
  return new Function(...scopeKeys, code)(...scopeValues)
}

export default evalCode
