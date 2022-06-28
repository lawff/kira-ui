import path from 'path'
import { execa } from 'execa'
import fg from 'fast-glob'
import fs from 'fs-extra'

export default async function generateDts(packagePath: string) {
  await execa('tsc', ['--project', 'tsconfig.build.json'], {
    cwd: packagePath,
  })

  const files = await fg(['lib/**/*.js'], { cwd: packagePath })

  return Promise.all(files.map(file => fs.remove(path.join(packagePath, file))))
}
