export interface Resource {
  title: string
  description?: string
  category: 'books' | 'audio' | 'video'
  filename: string
  filetype: string
  size?: string
  date?: string
}

/**
 * Resource library data.
 * To add a resource:
 * 1. Place the file in public/resources/<category>/<filename>
 * 2. Add an entry to the array below with matching category and filename
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
  },
  {
    title: '李潔人牧師訪談 EP2｜信仰還是生意？',
    description: '当信仰变成文化：美国世俗化背后的真相，从"以上帝为中心"到"以人为中心"，教会如何在世俗化与商业化夹缝中寻找出路？',
    category: 'video',
    filename: '李潔人牧師訪談EP2｜信仰還是生意？｜当信仰变成文化：美国世俗化背后的真相｜从"以上帝为中心"到"以人为中心"，教会如何在世俗化与商业化夹缝中寻找出路？.mp4',
    filetype: 'MP4',
    size: '155.1 MB',
    date: '2026-07-04',
  },
  {
    title: '李潔人牧師訪談 EP3｜當信仰變成了消費？',
    description: '當神跡變成包裝、敬拜變成體驗、牧師變成IP，教會正在失去什麼？為什麼教會越來越火，卻越來越不像教會？',
    category: 'video',
    filename: '李潔人牧師訪談EP3｜當信仰變成了消費？｜當神跡變成包裝、敬拜變成體驗、牧師變成IP，教會正在失去什麼？｜為什麼教會越來越火，卻越來越不像教會？.mp4',
    filetype: 'MP4',
    size: '132.7 MB',
    date: '2026-07-04',
  },
  {
    title: '李潔人牧師訪談 EP4｜為什麼華人教會總在重蹈覆轍？',
    description: '接班失敗、家長制盛行、成功神學蔓延——問題究竟出在哪裡？',
    category: 'video',
    filename: '李潔人牧師訪談EP4｜為什麼華人教會總在重蹈覆轍？｜接班失敗、家長制盛行、成功神學蔓延，問題究竟出在哪裡？.mp4',
    filetype: 'MP4',
    size: '112.2 MB',
    date: '2026-07-04',
  },
  {
    title: '李潔人牧師訪談 EP5｜當名牧接連跌倒：教會真正的危機才剛開始',
    description: '為什麼越成功的牧師，越容易陷入權力、金錢與情慾的試探？當教會開始崇拜名氣、規模與影響力時，我們是否已經偏離了基督？',
    category: 'video',
    filename: '李潔人牧師訪談EP5｜當名牧接連跌倒：教會真正的危機才剛開始｜為什麼越成功的牧師，越容易陷入權力、金錢與情慾的試探？當教會開始崇拜名氣、規模與影響力時，我們是否已經偏離了基督？.mp4',
    filetype: 'MP4',
    size: '155.6 MB',
    date: '2026-07-04',
  },
  {
    title: '李潔人牧師訪談 EP6｜教會最難發現的問題，竟然不是異端！',
    description: '真正滲透教會的，不一定是假教導，而是人人都習以為常的世界價值觀。',
    category: 'video',
    filename: '李潔人牧師訪談EP6｜教會最難發現的問題，竟然不是異端！真正滲透教會的，不一定是假教導，而是人人都習以為常的世界價值觀.mp4',
    filetype: 'MP4',
    size: '105.4 MB',
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
  other: 'i-mdi-file-download',
}
