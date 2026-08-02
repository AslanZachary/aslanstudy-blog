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
  // ── 薛华全集 (Francis Schaeffer Complete Works) ──
  {
    title: '薛华全集01：基督徒的哲学文化观',
    description: '薛华（Francis Schaeffer）全集第一卷 — 基督徒的哲学文化观。',
    category: 'books',
    filename: '薛华全集01-基督徒的哲学文化观.epub',
    filetype: 'EPUB',
    size: '1.2 MB',
    url: 'https://qstjtlhz41yvyjtz.public.blob.vercel-storage.com/books/%E8%96%9B%E5%8D%8E%E5%85%A8%E9%9B%8601-%E5%9F%BA%E7%9D%A3%E5%BE%92%E7%9A%84%E5%93%B2%E5%AD%A6%E6%96%87%E5%8C%96%E8%A7%82.epub',
  },
  {
    title: '薛华全集01：基督徒的哲学文化观',
    description: '薛华（Francis Schaeffer）全集第一卷 — 基督徒的哲学文化观。',
    category: 'books',
    filename: '薛华全集01-基督徒的哲学文化观.pdf',
    filetype: 'PDF',
    size: '4.9 MB',
    url: 'https://qstjtlhz41yvyjtz.public.blob.vercel-storage.com/books/%E8%96%9B%E5%8D%8E%E5%85%A8%E9%9B%8601-%E5%9F%BA%E7%9D%A3%E5%BE%92%E7%9A%84%E5%93%B2%E5%AD%A6%E6%96%87%E5%8C%96%E8%A7%82.pdf',
  },
  {
    title: '薛华全集02：基督徒的圣经真理观',
    description: '薛华（Francis Schaeffer）全集第二卷 — 基督徒的圣经真理观。',
    category: 'books',
    filename: '薛华全集02-基督徒的圣经真理观.epub',
    filetype: 'EPUB',
    size: '0.9 MB',
    url: 'https://qstjtlhz41yvyjtz.public.blob.vercel-storage.com/books/%E8%96%9B%E5%8D%8E%E5%85%A8%E9%9B%8602-%E5%9F%BA%E7%9D%A3%E5%BE%92%E7%9A%84%E5%9C%A3%E7%BB%8F%E7%9C%9F%E7%90%86%E8%A7%82.epub',
  },
  {
    title: '薛华全集02：基督徒的圣经真理观',
    description: '薛华（Francis Schaeffer）全集第二卷 — 基督徒的圣经真理观。',
    category: 'books',
    filename: '薛华全集02-基督徒的圣经真理观.pdf',
    filetype: 'PDF',
    size: '4.2 MB',
    url: 'https://qstjtlhz41yvyjtz.public.blob.vercel-storage.com/books/%E8%96%9B%E5%8D%8E%E5%85%A8%E9%9B%8602-%E5%9F%BA%E7%9D%A3%E5%BE%92%E7%9A%84%E5%9C%A3%E7%BB%8F%E7%9C%9F%E7%90%86%E8%A7%82.pdf',
  },
  {
    title: '薛华全集03：基督徒的属灵观',
    description: '薛华（Francis Schaeffer）全集第三卷 — 基督徒的属灵观。',
    category: 'books',
    filename: '薛华全集03-基督徒的属灵观.epub',
    filetype: 'EPUB',
    size: '0.9 MB',
    url: 'https://qstjtlhz41yvyjtz.public.blob.vercel-storage.com/books/%E8%96%9B%E5%8D%8E%E5%85%A8%E9%9B%8603-%E5%9F%BA%E7%9D%A3%E5%BE%92%E7%9A%84%E5%B1%9E%E7%81%B5%E8%A7%82.epub',
  },
  {
    title: '薛华全集03：基督徒的属灵观',
    description: '薛华（Francis Schaeffer）全集第三卷 — 基督徒的属灵观。',
    category: 'books',
    filename: '薛华全集03-基督徒的属灵观.pdf',
    filetype: 'PDF',
    size: '4.2 MB',
    url: 'https://qstjtlhz41yvyjtz.public.blob.vercel-storage.com/books/%E8%96%9B%E5%8D%8E%E5%85%A8%E9%9B%8603-%E5%9F%BA%E7%9D%A3%E5%BE%92%E7%9A%84%E5%B1%9E%E7%81%B5%E8%A7%82.pdf',
  },
  {
    title: '薛华全集04：基督徒的教会观',
    description: '薛华（Francis Schaeffer）全集第四卷 — 基督徒的教会观。',
    category: 'books',
    filename: '薛华全集04-基督徒的教会观.epub',
    filetype: 'EPUB',
    size: '0.9 MB',
    url: 'https://qstjtlhz41yvyjtz.public.blob.vercel-storage.com/books/%E8%96%9B%E5%8D%8E%E5%85%A8%E9%9B%8604-%E5%9F%BA%E7%9D%A3%E5%BE%92%E7%9A%84%E6%95%99%E4%BC%9A%E8%A7%82.epub',
  },
  {
    title: '薛华全集04：基督徒的教会观',
    description: '薛华（Francis Schaeffer）全集第四卷 — 基督徒的教会观。',
    category: 'books',
    filename: '薛华全集04-基督徒的教会观.pdf',
    filetype: 'PDF',
    size: '4.6 MB',
    url: 'https://qstjtlhz41yvyjtz.public.blob.vercel-storage.com/books/%E8%96%9B%E5%8D%8E%E5%85%A8%E9%9B%8604-%E5%9F%BA%E7%9D%A3%E5%BE%92%E7%9A%84%E6%95%99%E4%BC%9A%E8%A7%82.pdf',
  },
  {
    title: '薛华全集05：基督徒的西方世界观',
    description: '薛华（Francis Schaeffer）全集第五卷 — 基督徒的西方世界观。',
    category: 'books',
    filename: '薛华全集05-基督徒的西方世界观.epub',
    filetype: 'EPUB',
    size: '1.2 MB',
    url: 'https://qstjtlhz41yvyjtz.public.blob.vercel-storage.com/books/%E8%96%9B%E5%8D%8E%E5%85%A8%E9%9B%8605-%E5%9F%BA%E7%9D%A3%E5%BE%92%E7%9A%84%E8%A5%BF%E6%96%B9%E4%B8%96%E7%95%8C%E8%A7%82.epub',
  },
  {
    title: '薛华全集05：基督徒的西方世界观',
    description: '薛华（Francis Schaeffer）全集第五卷 — 基督徒的西方世界观。',
    category: 'books',
    filename: '薛华全集05-基督徒的西方世界观.pdf',
    filetype: 'PDF',
    size: '4.4 MB',
    url: 'https://qstjtlhz41yvyjtz.public.blob.vercel-storage.com/books/%E8%96%9B%E5%8D%8E%E5%85%A8%E9%9B%8605-%E5%9F%BA%E7%9D%A3%E5%BE%92%E7%9A%84%E8%A5%BF%E6%96%B9%E4%B8%96%E7%95%8C%E8%A7%82.pdf',
  },
  // ── Video ──
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
