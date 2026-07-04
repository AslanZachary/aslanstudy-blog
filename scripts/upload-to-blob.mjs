/**
 * Upload resource files to Vercel Blob storage.
 *
 * Prerequisites:
 * 1. Create a Blob store in your Vercel dashboard:
 *    https://vercel.com/aslanstudy/aslanstudy-blog/stores/blob
 * 2. Copy the BLOB_READ_WRITE_TOKEN
 * 3. Add it to .env.local: BLOB_READ_WRITE_TOKEN="..."
 *
 * Usage: node scripts/upload-to-blob.mjs
 */

import { put, list } from '@vercel/blob'
import { readFileSync, existsSync } from 'fs'
import { readdir } from 'fs/promises'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')

// Load .env.local (Node 21+)
const envPath = resolve(rootDir, '.env.local')
if (existsSync(envPath)) {
  process.loadEnvFile(envPath)
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('❌ BLOB_READ_WRITE_TOKEN not found in .env.local')
  console.error('   Get it from: https://vercel.com/aslanstudy/aslanstudy-blog/stores/blob')
  process.exit(1)
}

const RESOURCES_DIR = resolve(rootDir, 'public', 'resources')
const CATEGORIES = ['books', 'audio', 'video']

async function uploadCategory(category) {
  const dir = resolve(RESOURCES_DIR, category)
  const files = await readdir(dir).catch(() => [])

  const results = []
  for (const file of files) {
    if (file === '.gitkeep') continue
    const filePath = resolve(dir, file)

    console.log(`  Uploading: ${file} ...`)
    const blob = await put(`${category}/${file}`, readFileSync(filePath), {
      access: 'public',
      addRandomSuffix: false,
    })
    console.log(`  ✅ ${blob.url}`)
    console.log(`     ${(blob.size / 1024 / 1024).toFixed(1)} MB`)

    results.push({
      category,
      filename: file,
      url: blob.url,
      size: blob.size,
      contentType: blob.contentType,
    })
  }
  return results
}

async function main() {
  console.log('📦 Uploading resources to Vercel Blob...\n')

  let allResults = []
  for (const cat of CATEGORIES) {
    console.log(`📁 ${cat}/`)
    const results = await uploadCategory(cat)
    allResults = allResults.concat(results)
    if (results.length === 0) console.log('   (empty)\n')
    else console.log()
  }

  console.log('━'.repeat(60))
  console.log(`\n✅ Uploaded ${allResults.length} files total.\n`)

  if (allResults.length > 0) {
    console.log('📋 Blob URLs (copy these into src/data/resources.ts):\n')
    for (const r of allResults) {
      console.log(`  ${r.filename}`)
      console.log(`  → ${r.url}\n`)
    }
  }
}

main().catch((err) => {
  console.error('❌ Upload failed:', err.message)
  process.exit(1)
})
