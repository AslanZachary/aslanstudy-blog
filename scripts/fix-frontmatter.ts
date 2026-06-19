import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const POSTS_DIR = join(import.meta.dirname, '..', 'src', 'content', 'posts')

// Escape a string for use in YAML double-quoted strings
function yamlEscape(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    // Remove characters that could break YAML parsing in some contexts
    .replace(/\r/g, '')
}

const files = readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
let fixed = 0

for (const file of files) {
  const path = join(POSTS_DIR, file)
  const content = readFileSync(path, 'utf-8')

  // Check if this file has the old format
  if (!content.startsWith('---\ntitle:')) continue

  // Extract frontmatter
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) continue

  const [, fm, body] = match

  // Parse simple key: value pairs
  const lines = fm.split('\n')
  const fields: Record<string, string> = {}
  let currentKey = ''
  for (const line of lines) {
    const keyMatch = line.match(/^(\w+):\s*(.*)/)
    if (keyMatch) {
      currentKey = keyMatch[1]
      fields[currentKey] = keyMatch[2]
    }
  }

  if (!fields.title || !fields.pubDate) continue

  // Rebuild with safe escaping
  const title = fields.title.replace(/^"/, '').replace(/"$/, '')
  const desc = (fields.description || '')
    .replace(/^"/, '').replace(/"$/, '')
    .replace(/\\\[/g, '[').replace(/\\\]/g, ']')
    .replace(/\\\*/g, '*')

  const catsMatch = fm.match(/categories:\s*\[(.*?)\]/)
  const cats = catsMatch ? catsMatch[1] : ''

  const newFm = [
    '---',
    `title: "${yamlEscape(title)}"`,
    `pubDate: ${fields.pubDate}`,
    `categories: [${cats}]`,
    `description: "${yamlEscape(desc)}"`,
    '---',
    '',
    body.trimEnd(),
    '',
  ].join('\n')

  if (newFm !== content) {
    writeFileSync(path, newFm, 'utf-8')
    fixed++
    console.log(`  Fixed: ${file}`)
  }
}

console.log(`\nFixed ${fixed} files`)
