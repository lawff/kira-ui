import type { NextPage } from 'next'
import Head from 'next/head'
import { Prism } from '@kira-ui/prism'

const demoCode = `import { Text } from '@kira-ui/core';

function Demo() {
  return <Text>Hello</Text>
}`;

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>kira-ui playground</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>kira-ui</header>
      <Prism language="tsx">{demoCode}</Prism>
    </div>
  )
}

export default Home
