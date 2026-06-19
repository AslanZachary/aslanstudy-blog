import type { UserConfig } from '~/types'

export const userConfig: Partial<UserConfig> = {
  site: {
    title: '斯兰书房',
    subtitle: '唯恩唯信，荣归上主',
    author: '斯兰',
    description: '一处长期写作与整理思想的空间 — AslanStudy',
    website: 'https://aslanstudy.com',
    pageSize: 8,
    socialLinks: [
      { name: 'email', href: 'mailto:aslanzacharyx@gmail.com' },
      { name: 'rss', href: '/atom.xml' },
    ],
    navLinks: [
      { name: 'Home', href: '/' },
      { name: 'Posts', href: '/' },
      { name: 'Archive', href: '/archive' },
      { name: 'Categories', href: '/categories' },
      { name: 'Stats', href: '/stats' },
      { name: 'About', href: '/about' },
    ],
    categoryMap: [],
    footer: [
      '© %year <a target="_blank" href="%website">斯兰 Aslan</a>',
      'Theme <a target="_blank" href="https://github.com/Moeyua/astro-theme-typography">Typography</a> by <a target="_blank" href="https://moeyua.com">Moeyua</a>',
      'Proudly published with <a target="_blank" href="https://astro.build/">Astro</a>',
    ],
  },
  appearance: {
    theme: 'system',
    locale: 'zh-cn',
  },
  seo: {
    twitter: '',
  },
  rss: {
    fullText: true,
  },
  analytics: {
    googleAnalyticsId: '',
    umamiAnalyticsId: '',
  },
}
