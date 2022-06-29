import React, { forwardRef } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
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
      ...others
    } = useKiraDefaultProps('Prism', prismDefaultProps, props)
    const code = trim && typeof children === 'string' ? children.trim() : children
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
                    const lineProps = getLineProps({ line, key: index })
                    const shouldHighlight = lineNumber in highlightLines
                    const lineColor
                      = theme.colorScheme === 'dark'
                        ? theme.fn.rgba(
                          theme.fn.themeColor(highlightLines[lineNumber]?.color, 9),
                          0.25,
                        )
                        : theme.fn.themeColor(highlightLines[lineNumber]?.color, 0)

                    return (
                      <div
                        key={index}
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
                          {line.map((token, key) => {
                            const tokenProps = getTokenProps({ token, key })
                            return (
                              <span
                                key={key}
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
                        </div>
                      </div>
                    )
                  })
                  .filter(Boolean)}
              </pre>
            </ScrollAreaComponent>
          )}
        </Highlight>
      </Box>
    )
  },
) as any

Prism.displayName = '@kira-ui/prism/Prism'
