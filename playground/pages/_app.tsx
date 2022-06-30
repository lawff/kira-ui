import type { AppProps } from 'next/app'
import { KiraProvider } from '@kira-ui/core'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <KiraProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
    >
      <Component {...pageProps} />
    </KiraProvider>
  )
}

export default MyApp
