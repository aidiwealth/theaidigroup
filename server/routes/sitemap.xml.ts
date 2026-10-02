import { serverQueryContent } from '#content/server'

// Sitemap: main pages plus every Insights article. Prerendered at build time.
const SITE = 'https://theaidigroup.com'
const PAGES = ['/', '/about', '/ethos', '/back', '/host', '/insights', '/careers', '/legal']

export default defineEventHandler(async (event) => {
  const docs = await serverQueryContent(event).only(['_path']).find()
  const articles = docs.map((d) => String(d._path)).filter((p) => p.startsWith('/insights/')).sort()
  const urls = [...PAGES, ...articles].map((p) => '  <url><loc>' + SITE + p + '</loc></url>').join('\n')
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '\n</urlset>\n'
})
