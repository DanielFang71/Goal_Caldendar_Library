import { execSync } from 'node:child_process'
import { mkdirSync, copyFileSync } from 'node:fs'

execSync('tsup src/index.ts --format esm,cjs --dts --out-dir dist --clean', { stdio: 'inherit' })
mkdirSync('dist', { recursive: true })
copyFileSync('src/style.css', 'dist/style.css')
copyFileSync('src/modern.css', 'dist/modern.css')
