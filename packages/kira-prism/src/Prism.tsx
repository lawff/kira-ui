import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { useEditable } from 'use-editable'
import type {
  DefaultProps,
  Selectors,
} from '@kira-ui/core'
import {
  ActionIcon,
  Box,
  ScrollArea,
  useKiraDefaultProps,
  useKiraTheme,
} from '@kira-ui/core'
import { useClipboard } from '@kira-ui/hooks'
import { LivePreview } from './Live/LivePreview'
import { LiveError } from './Live/LiveError'
import { renderElementAsync } from './utils'
import { CopyIcon } from './CopyIcon'
import { getPrismTheme } from './prism-theme'
import type { PrismSharedProps } from './types'
import useStyles from './Prism.styles'

export type PrismStylesNames = Selectors<typeof useStyles>

export interface PrismProps
  extends DefaultProps<PrismStylesNames>,
  PrismSharedProps,
  Omit<React.ComponentPropsWithRef<'div'>, 'children'> {}

type PrismComponent = ((props: PrismProps) => React.ReactElement) & {
  displayName: string
}

const prismDefaultProps: Partial<PrismProps> = {
  noCopy: false,
  edit: false,
  preview: false,
  copyLabel: 'Copy code',
  copiedLabel: 'Copied',
  withLineNumbers: false,
  trim: true,
  highlightLines: {},
  scrollAreaComponent: ScrollArea,
}

export const Prism: PrismComponent = forwardRef<HTMLDivElement, PrismProps>(
  (props: PrismProps, ref) => {
    const {
      className,
      children,
      language,
      noCopy,
      classNames,
      styles,
      copyLabel,
      copiedLabel,
      withLineNumbers,
      highlightLines,
      scrollAreaComponent: ScrollAreaComponent,
      colorScheme,
      trim,
      edit,
      preview,
      ...others
    } = useKiraDefaultProps('Prism', prismDefaultProps, props)
    const sourceCode = trim && typeof children === 'string' ? children.trim() : children

    // 代码编辑
    const editorRef = useRef(null)
    const [code, setCode] = useState(sourceCode || '')
    const [codeState, setCodeState] = useState({
      error: undefined,
      element: undefined,
    })
    const onError = error => setCodeState({ error: error.toString(), element: null })

    useEffect(() => {
      if (preview)
        transpileAsync(code).catch(onError)
    }, [code])

    const onEditableChange = useCallback((_code) => {
      setCode(_code.slice(0, -1))
    }, [])

    useEditable(editorRef, onEditableChange, {
      disabled: !edit || withLineNumbers || (highlightLines && Object.keys(highlightLines).length > 0),
      indentation: 2,
    })

    function transpileAsync(newCode) {
      const errorCallback = (error) => {
        setCodeState({ error: error.toString(), element: undefined })
      }

      try {
        const transformResult = newCode

        return Promise.resolve(transformResult)
          .then((transformedCode) => {
            const renderElement = element =>
              setCodeState({ error: undefined, element })

            // Transpilation arguments
            const input = {
              code: transformedCode,
            }

            renderElementAsync(input, renderElement, errorCallback)
          })
          .catch(errorCallback)
      }
      catch (e) {
        errorCallback(e)
        return Promise.resolve()
      }
    }

    const maxLineSize = code.split('\n').length.toString().length

    const theme = useKiraTheme()
    const clipboard = useClipboard({
      read: true,
      source: 'kira',
    })
    const { classes, cx } = useStyles(
      {
        colorScheme: colorScheme || theme.colorScheme,
        native: ScrollAreaComponent !== ScrollArea,
        maxLineSize,
      },
      { classNames, styles, name: 'Prism' },
    )

    return (
      <Box className={cx(classes.root, className)} ref={ref} {...others}>
        {!noCopy && (
          <ActionIcon
            className={classes.copy}
            aria-label={clipboard.copied ? copiedLabel : copyLabel}
            onClick={() => clipboard.copy(code)}
          >
            <CopyIcon copied={clipboard.copied} />
          </ActionIcon>
        )}

        <Highlight
          {...defaultProps}
          theme={getPrismTheme(theme, colorScheme || theme.colorScheme)}
          code={code}
          language={language}
        >
          {({
            className: inheritedClassName,
            style: inheritedStyle,
            tokens,
            getLineProps,
            getTokenProps,
          }) => (
            <ScrollAreaComponent className={classes.scrollArea} dir="ltr">
              <pre
                className={cx(classes.code, inheritedClassName)}
                style={inheritedStyle}
                dir="ltr"
                ref={editorRef}
                spellCheck="false"
              >
                {tokens
                  .map((line, index) => {
                    if (
                      index === tokens.length - 1
                      && line.length === 1
                      && line[0].content === '\n'
                    )
                      return null

                    const lineNumber = index + 1
                    const lineProps = getLineProps({ line, key: `line-${index}` })
                    const shouldHighlight = lineNumber in highlightLines
                    const lineColor
                      = theme.colorScheme === 'dark'
                        ? theme.fn.rgba(
                          theme.fn.themeColor(highlightLines[lineNumber]?.color, 9),
                          0.25,
                        )
                        : theme.fn.themeColor(highlightLines[lineNumber]?.color, 0)

                    return (
                      // eslint-disable-next-line react/jsx-key
                      <div
                        {...lineProps}
                        className={cx(classes.line, lineProps.className)}
                        style={{ ...(shouldHighlight ? { backgroundColor: lineColor } : null) }}
                      >
                        {withLineNumbers && (
                          <div
                            className={classes.lineNumber}
                            style={{
                              color: shouldHighlight
                                ? theme.fn.themeColor(
                                  highlightLines[lineNumber]?.color,
                                  theme.colorScheme === 'dark' ? 5 : 8,
                                )
                                : undefined,
                            }}
                          >
                            {highlightLines[lineNumber]?.label || lineNumber}
                          </div>
                        )}

                        <div className={classes.lineContent}>
                          {line
                            .filter(token => !token.empty)
                            .map((token, key) => {
                              const tokenProps = getTokenProps({ token, key: `token-${key}` })
                              return (
                              // eslint-disable-next-line react/jsx-key
                                <span
                                  {...tokenProps}
                                  style={{
                                    ...tokenProps.style,
                                    color: shouldHighlight
                                      ? theme.fn.themeColor(
                                        highlightLines[lineNumber]?.color,
                                        theme.colorScheme === 'dark' ? 5 : 8,
                                      )
                                      : (tokenProps?.style?.color as string),
                                  }}
                                />
                              )
                            })}
                          {'\n'}
                        </div>
                      </div>
                    )
                  })
                  .filter(Boolean)}
              </pre>
            </ScrollAreaComponent>
          )}
        </Highlight>
        {!codeState.error && <LivePreview element={codeState.element}></LivePreview>}
        <LiveError error={codeState.error} />
      </Box>
    )
  },
) as any

Prism.displayName = '@kira-ui/prism/Prism'
