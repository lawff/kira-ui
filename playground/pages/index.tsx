import type { NextPage } from 'next'
import Head from 'next/head'
import { Prism } from '@kira-ui/prism'

const demoCode = `import { Text } from '@kira-ui/core'
import { useClipboard } from '@kira-ui/hooks';

function Demo() {
  return <Text>Hello</Text>
}

render(<Demo />)
`;

const deleted = { color: 'red', label: '-' };
const added = { color: 'green', label: '+' };

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>kira-ui playground</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>kira-ui</header>
      <Prism language="tsx" withLineNumbers highlightLines={{
        3: deleted,
        4: deleted,
        5: deleted,
        7: added,
        8: added,
        9: added,
      }}>{demoCode}</Prism>
      <Prism language="tsx" edit preview>{demoCode}</Prism>
    </div>
  )
}

export default Home
