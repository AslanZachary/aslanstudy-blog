import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { XMLParser } from 'fast-xml-parser'
import TurndownService from 'turndown'

const XML_PATH = process.argv[2] || 'C:/Users/zc7h/Downloads/aslansstudy.WordPress.2026-06-19.xml'
const OUT_DIR = join(import.meta.dirname, '..', 'src', 'content', 'posts')

// Read XML
console.log('Reading XML...')
const xml = readFileSync(XML_PATH, 'utf-8')

// Parse
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  isArray: (name) => ['item', 'category'].includes(name),
})
const parsed = parser.parse(xml)

// Navigate: rss > channel > item[]
const items = parsed?.rss?.channel?.item || []
console.log(`Found ${items.length} total items`)

// Filter to published posts only
const posts = items.filter((item: any) => {
  const postType = item['wp:post_type']
  const status = item['wp:status']
  return postType === 'post' && status === 'publish'
})
console.log(`Found ${posts.length} published posts`)

// Set up Turndown
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '_',
})

// Custom rules
turndown.addRule('wordpressImages', {
  filter: (node) => {
    if (node.nodeName === 'FIGURE' && node.querySelector('img')) {
      return true
    }
    return false
  },
  replacement: (content, node) => {
    const img = node.querySelector('img')
    const src = img?.getAttribute('src') || ''
    const alt = img?.getAttribute('alt') || ''
    // Remove WordPress size suffix like ?w=1024
    const cleanSrc = src.replace(/\?w=\d+(&.*)?$/, '')
    return `\n![${alt}](${cleanSrc})\n`
  },
})

// Create main posts directory
if (!existsSync(OUT_DIR)) {
  mkdirSync(OUT_DIR, { recursive: true })
}

// Slugify helper
function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[^\x00-\x7F]/g, '') // Remove non-ASCII (Chinese chars)
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    || 'post-' + Date.now()
}

// Process each post
let imported = 0
for (const post of posts) {
  try {
    const title = (post.title || '').trim()
    const contentHtml = post['content:encoded'] || ''
    const pubDateRaw = post['wp:post_date'] || post.pubDate || ''
    const pubDate = pubDateRaw ? new Date(pubDateRaw) : new Date()

    // Categories
    const cats = (Array.isArray(post.category) ? post.category : [post.category])
      .filter((c: any) => c?.['@_domain'] === 'category' || c?.['#text'])
      .map((c: any) => c['#text'] || c)
      .filter(Boolean)

    // Convert HTML to Markdown
    let markdown = turndown.turndown(contentHtml)

    // Clean up
    markdown = markdown
      // WordPress caption shortcodes
      .replace(/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/g, '$1')
      // Other shortcodes
      .replace(/\[(\/)?embed[^\]]*\]/g, '')
      .replace(/\[(\/)?video[^\]]*\]/g, '')
      .replace(/\[(\/)?audio[^\]]*\]/g, '')
      // Multiple blank lines
      .replace(/\n{4,}/g, '\n\n\n')
      // Trailing whitespace
      .replace(/[ \t]+$/gm, '')
      .trim()

    // Generate slug from title (prefer English slug if exists in post_name)
    const wpSlug = (post['wp:post_name'] || '').trim()
    let slug = ''
    if (wpSlug) {
      // Try to decode the URL-encoded slug
      try {
        slug = decodeURIComponent(wpSlug.replace(/%([0-9a-fA-F]{2})/g, '%$1'))
      } catch {
        slug = wpSlug
      }
      // If slug is just Chinese chars URL-encoded, use pinyin fallback
      if (/^[一-鿿]+$/.test(slug) || slug.length > 60) {
        slug = slugify(title) || `post-${imported + 1}`
      }
    } else {
      slug = slugify(title) || `post-${imported + 1}`
    }

    // Ensure unique filename
    const datePrefix = pubDate.toISOString().slice(0, 10)
    let filename = `${datePrefix}-${slug.substring(0, 40)}`
    // Remove invalid chars
    filename = filename.replace(/[<>:"/\\|?*]/g, '-')

    // First line as description
    const descLine = markdown
      .replace(/^#.*$/gm, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
      .split('\n')
      .find(l => l.trim().length > 20)
      ?.trim()
      ?.slice(0, 200) || ''

    // Build frontmatter
    const frontmatter = [
      '---',
      `title: "${title.replace(/"/g, '\\"')}"`,
      `pubDate: ${datePrefix}`,
      `categories: [${cats.map((c: string) => `"${c}"`).join(', ')}]`,
      `description: "${descLine.replace(/"/g, '\\"')}"`,
      '---',
      '',
      markdown,
      '',
    ].join('\n')

    const outPath = join(OUT_DIR, `${filename}.md`)
    writeFileSync(outPath, frontmatter, 'utf-8')
    console.log(`  ✓ [${imported + 1}/${posts.length}] ${title} → ${filename}.md`)
    imported++
  } catch (err) {
    console.error(`  ✗ Error processing "${post.title}":`, err)
  }
}

console.log(`\n✅ Done! Imported ${imported} posts to ${OUT_DIR}`)
