import type { OutputOptions, RollupOptions } from 'rollup'
import { rollup } from 'rollup'

export default async function compile(config: RollupOptions) {
  const build = await rollup(config)
  const outputs: OutputOptions[] = Array.isArray(config.output) ? config.output : [config.output]

  return Promise.all(outputs.map(output => build.write(output)))
}
