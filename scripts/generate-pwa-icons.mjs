import { accessSync } from 'node:fs'
import { constants } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, 'public/icon-source.png')

accessSync(source, constants.R_OK)

const targets = [
  { file: 'public/apple-touch-icon.png', size: 180 },
  { file: 'public/pwa-192x192.png', size: 192 },
  { file: 'public/pwa-512x512.png', size: 512 },
  { file: 'public/maskable-512x512.png', size: 512 },
]

const pipeline = sharp(source).ensureAlpha()

for (const { file, size } of targets) {
  await pipeline.clone().resize(size, size, { fit: 'cover' }).png().toFile(join(root, file))
}

console.log('PWA icons written from public/icon-source.png')