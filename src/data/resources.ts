export interface Resource {
  title: string
  description?: string
  category: 'books' | 'audio' | 'video'
  filename: string
  filetype: string
  size?: string
  date?: string
  /** Blob URL from Vercel Blob storage. If not set, falls back to /resources/<category>/<filename> */
  url?: string
}

export const resources: Resource[] = [
  {
    title: '李洁人访谈 EP1-6',
    description: '李洁人牧师访谈系列全集（EP1-EP6），下载 TXT 文件后打开即可获取资源链接。',
    category: 'video',
    filename: 'quark1.txt',
    filetype: 'TXT',
    date: '2026-07-04',
  },
]

/** Map category to its subdirectory and display label */
export const categoryMeta: Record<Resource['category'], { label: string; icon: string; dir: string }> = {
  books: { label: 'Books · 书籍', icon: 'i-mdi-book-open-page-variant', dir: 'books' },
  audio: { label: 'Audio · 音频', icon: 'i-mdi-music', dir: 'audio' },
  video: { label: 'Video · 视频', icon: 'i-mdi-video', dir: 'video' },
}

/** File type to icon mapping */
export const fileTypeIcon: Record<string, string> = {
  PDF: 'i-mdi-file-pdf-box',
  EPUB: 'i-mdi-book-open',
  MP3: 'i-mdi-file-music',
  MP4: 'i-mdi-file-video',
  TXT: 'i-mdi-text-box',
  other: 'i-mdi-file-download',
}
