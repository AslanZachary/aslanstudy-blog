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

/**
 * Resource library data.
 * To add a resource:
 * 1. Upload the file to Vercel Blob: node scripts/upload-to-blob.mjs
 * 2. Copy the blob URL and add an entry below
 */
export const resources: Resource[] = [
  // Books
  // {
  //   title: 'Example Book',
  //   description: 'A great read about a topic.',
  //   category: 'books',
  //   filename: 'example-book.pdf',
  //   filetype: 'PDF',
  //   size: '2.3 MB',
  //   date: '2026-07-01',
  //   url: '',
  // },
  // Audio
  // {
  //   title: 'Example Audio',
  //   description: 'A lecture recording.',
  //   category: 'audio',
  //   filename: 'lecture-01.mp3',
  //   filetype: 'MP3',
  //   size: '45 MB',
  //   date: '2026-06-15',
  //   url: '',
  // },
  // Video
  {
    title: '李潔人牧師訪談 EP1｜世俗化正在改變教會？年輕人流失的真正原因揭開！',
    description: '宗教改革後的世俗化浪潮如何改變教會面貌，年輕人為何大量流失。',
    category: 'video',
    filename: '李潔人牧師訪談EP1｜世俗化正在改變教會？年輕人流失的真正原因揭開！｜宗教改革後的世俗化.mp4',
    filetype: 'MP4',
    size: '170.3 MB',
    date: '2026-07-04',
    url: 'https://qstjtlhz41yvyjtz.public.blob.vercel-storage.com/video/%E6%9D%8E%E6%BD%94%E4%BA%BA%E7%89%A7%E5%B8%AB%E8%A8%AA%E8%AB%87EP1%EF%BD%9C%E4%B8%96%E4%BF%97%E5%8C%96%E6%AD%A3%E5%9C%A8%E6%94%B9%E8%AE%8A%E6%95%99%E6%9C%83%EF%BC%9F%E5%B9%B4%E8%BC%95%E4%BA%BA%E6%B5%81%E5%A4%B1%E7%9A%84%E7%9C%9F%E6%AD%A3%E5%8E%9F%E5%9B%A0%E6%8F%AD%E9%96%8B%EF%BC%81%EF%BD%9C%E5%AE%97%E6%95%99%E6%94%B9%E9%9D%A9%E5%BE%8C%E7%9A%84%E4%B8%96%E4%BF%97%E5%8C%96.mp4',
  },
  {
    title: '李潔人牧師訪談 EP2｜信仰還是生意？',
    description: '当信仰变成文化：美国世俗化背后的真相，从"以上帝为中心"到"以人为中心"，教会如何在世俗化与商业化夹缝中寻找出路？',
    category: 'video',
    filename: '李潔人牧師訪談EP2｜信仰還是生意？｜当信仰变成文化：美国世俗化背后的真相｜从"以上帝为中心"到"以人为中心"，教会如何在世俗化与商业化夹缝中寻找出路？.mp4',
    filetype: 'MP4',
    size: '155.1 MB',
    date: '2026-07-04',
    url: 'https://qstjtlhz41yvyjtz.public.blob.vercel-storage.com/video/%E6%9D%8E%E6%BD%94%E4%BA%BA%E7%89%A7%E5%B8%AB%E8%A8%AA%E8%AB%87EP2%EF%BD%9C%E4%BF%A1%E4%BB%B0%E9%82%84%E6%98%AF%E7%94%9F%E6%84%8F%EF%BC%9F%EF%BD%9C%E5%BD%93%E4%BF%A1%E4%BB%B0%E5%8F%98%E6%88%90%E6%96%87%E5%8C%96%EF%BC%9A%E7%BE%8E%E5%9B%BD%E4%B8%96%E4%BF%97%E5%8C%96%E8%83%8C%E5%90%8E%E7%9A%84%E7%9C%9F%E7%9B%B8%EF%BD%9C%E4%BB%8E%E2%80%9C%E4%BB%A5%E4%B8%8A%E5%B8%9D%E4%B8%BA%E4%B8%AD%E5%BF%83%E2%80%9D%E5%88%B0%E2%80%9C%E4%BB%A5%E4%BA%BA%E4%B8%BA%E4%B8%AD%E5%BF%83%E2%80%9D%EF%BC%8C%E6%95%99%E4%BC%9A%E5%A6%82%E4%BD%95%E5%9C%A8%E4%B8%96%E4%BF%97%E5%8C%96%E4%B8%8E%E5%95%86%E4%B8%9A%E5%8C%96%E5%A4%B9%E7%BC%9D%E4%B8%AD%E5%AF%BB%E6%89%BE%E5%87%BA%E8%B7%AF%EF%BC%9F.mp4',
  },
  {
    title: '李潔人牧師訪談 EP3｜當信仰變成了消費？',
    description: '當神跡變成包裝、敬拜變成體驗、牧師變成IP，教會正在失去什麼？為什麼教會越來越火，卻越來越不像教會？',
    category: 'video',
    filename: '李潔人牧師訪談EP3｜當信仰變成了消費？｜當神跡變成包裝、敬拜變成體驗、牧師變成IP，教會正在失去什麼？｜為什麼教會越來越火，卻越來越不像教會？.mp4',
    filetype: 'MP4',
    size: '132.7 MB',
    date: '2026-07-04',
    url: 'https://qstjtlhz41yvyjtz.public.blob.vercel-storage.com/video/%E6%9D%8E%E6%BD%94%E4%BA%BA%E7%89%A7%E5%B8%AB%E8%A8%AA%E8%AB%87EP3%EF%BD%9C%E7%95%B6%E4%BF%A1%E4%BB%B0%E8%AE%8A%E6%88%90%E4%BA%86%E6%B6%88%E8%B2%BB%EF%BC%9F%EF%BD%9C%E7%95%B6%E7%A5%9E%E8%B7%A1%E8%AE%8A%E6%88%90%E5%8C%85%E8%A3%9D%E3%80%81%E6%95%AC%E6%8B%9C%E8%AE%8A%E6%88%90%E9%AB%94%E9%A9%97%E3%80%81%E7%89%A7%E5%B8%AB%E8%AE%8A%E6%88%90IP%EF%BC%8C%E6%95%99%E6%9C%83%E6%AD%A3%E5%9C%A8%E5%A4%B1%E5%8E%BB%E4%BB%80%E9%BA%BC%EF%BC%9F%EF%BD%9C%E7%82%BA%E4%BB%80%E9%BA%BC%E6%95%99%E6%9C%83%E8%B6%8A%E4%BE%86%E8%B6%8A%E7%81%AB%EF%BC%8C%E5%8D%BB%E8%B6%8A%E4%BE%86%E8%B6%8A%E4%B8%8D%E5%83%8F%E6%95%99%E6%9C%83%EF%BC%9F.mp4',
  },
  {
    title: '李潔人牧師訪談 EP4｜為什麼華人教會總在重蹈覆轍？',
    description: '接班失敗、家長制盛行、成功神學蔓延——問題究竟出在哪裡？',
    category: 'video',
    filename: '李潔人牧師訪談EP4｜為什麼華人教會總在重蹈覆轍？｜接班失敗、家長制盛行、成功神學蔓延，問題究竟出在哪裡？.mp4',
    filetype: 'MP4',
    size: '112.2 MB',
    date: '2026-07-04',
    url: 'https://qstjtlhz41yvyjtz.public.blob.vercel-storage.com/video/%E6%9D%8E%E6%BD%94%E4%BA%BA%E7%89%A7%E5%B8%AB%E8%A8%AA%E8%AB%87EP4%EF%BD%9C%E7%82%BA%E4%BB%80%E9%BA%BC%E8%8F%AF%E4%BA%BA%E6%95%99%E6%9C%83%E7%B8%BD%E5%9C%A8%E9%87%8D%E8%B9%88%E8%A6%86%E8%BD%8D%EF%BC%9F%EF%BD%9C%E6%8E%A5%E7%8F%AD%E5%A4%B1%E6%95%97%E3%80%81%E5%AE%B6%E9%95%B7%E5%88%B6%E7%9B%9B%E8%A1%8C%E3%80%81%E6%88%90%E5%8A%9F%E7%A5%9E%E5%AD%B8%E8%94%93%E5%BB%B6%EF%BC%8C%E5%95%8F%E9%A1%8C%E7%A9%B6%E7%AB%9F%E5%87%BA%E5%9C%A8%E5%93%AA%E8%A3%A1%EF%BC%9F.mp4',
  },
  {
    title: '李潔人牧師訪談 EP5｜當名牧接連跌倒：教會真正的危機才剛開始',
    description: '為什麼越成功的牧師，越容易陷入權力、金錢與情慾的試探？當教會開始崇拜名氣、規模與影響力時，我們是否已經偏離了基督？',
    category: 'video',
    filename: '李潔人牧師訪談EP5｜當名牧接連跌倒：教會真正的危機才剛開始｜為什麼越成功的牧師，越容易陷入權力、金錢與情慾的試探？當教會開始崇拜名氣、規模與影響力時，我們是否已經偏離了基督？.mp4',
    filetype: 'MP4',
    size: '155.6 MB',
    date: '2026-07-04',
    url: 'https://qstjtlhz41yvyjtz.public.blob.vercel-storage.com/video/%E6%9D%8E%E6%BD%94%E4%BA%BA%E7%89%A7%E5%B8%AB%E8%A8%AA%E8%AB%87EP5%EF%BD%9C%E7%95%B6%E5%90%8D%E7%89%A7%E6%8E%A5%E9%80%A3%E8%B7%8C%E5%80%92%EF%BC%9A%E6%95%99%E6%9C%83%E7%9C%9F%E6%AD%A3%E7%9A%84%E5%8D%B1%E6%A9%9F%E6%89%8D%E5%89%9B%E9%96%8B%E5%A7%8B%EF%BD%9C%E7%82%BA%E4%BB%80%E9%BA%BC%E8%B6%8A%E6%88%90%E5%8A%9F%E7%9A%84%E7%89%A7%E5%B8%AB%EF%BC%8C%E8%B6%8A%E5%AE%B9%E6%98%93%E9%99%B7%E5%85%A5%E6%AC%8A%E5%8A%9B%E3%80%81%E9%87%91%E9%8C%A2%E8%88%87%E6%83%85%E6%85%BE%E7%9A%84%E8%A9%A6%E6%8E%A2%EF%BC%9F%E7%95%B6%E6%95%99%E6%9C%83%E9%96%8B%E5%A7%8B%E5%B4%87%E6%8B%9C%E5%90%8D%E6%B0%A3%E3%80%81%E8%A6%8F%E6%A8%A1%E8%88%87%E5%BD%B1%E9%9F%BF%E5%8A%9B%E6%99%82%EF%BC%8C%E6%88%91%E5%80%91%E6%98%AF%E5%90%A6%E5%B7%B2%E7%B6%93%E5%81%8F%E9%9B%A2%E4%BA%86%E5%9F%BA%E7%9D%A3%EF%BC%9F.mp4',
  },
  // EP6 pending — Vercel Blob Hobby plan quota (1GB) exceeded.
  // Upgrade plan or delete some older blobs to make room, then upload EP6.
  // {
  //   title: '李潔人牧師訪談 EP6｜教會最難發現的問題，竟然不是異端！',
  //   description: '真正滲透教會的，不一定是假教導，而是人人都習以為常的世界價值觀。',
  //   category: 'video',
  //   filename: '李潔人牧師訪談EP6｜教會最難發現的問題，竟然不是異端！真正滲透教會的，不一定是假教導，而是人人都習以為常的世界價值觀.mp4',
  //   filetype: 'MP4',
  //   size: '105.4 MB',
  //   date: '2026-07-04',
  // },
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
  other: 'i-mdi-file-download',
}
