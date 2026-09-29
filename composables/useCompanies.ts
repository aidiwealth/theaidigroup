// Company cards: edit copy here. Drop media into assets/companies/<slug>/
// as poster.webp (or .jpg/.png) and optionally clip.mp4 / clip.webm; no code change needed.

export type Pillar = 'Build' | 'Back' | 'Bridge' | 'Host'
export type Mark = 'termii' | 'telroi' | 'sotel' | 'aidi'

export interface Company {
  slug: string
  name: string
  pillar: Pillar
  mark: Mark
  blurb: string
  href: string // '' hides the Read more link
  alt: string
  featured: boolean
}

export interface CompanyMedia {
  poster: string | null
  mp4: string | null
  webm: string | null
}

export const PILLARS: Pillar[] = ['Build', 'Back', 'Bridge', 'Host']

export const COMPANIES: Company[] = [
  { slug: 'termii', name: 'Termii', pillar: 'Build', mark: 'termii', featured: true, href: 'https://termii.com',
    blurb: 'A customer communications platform helping businesses across Africa reach their customers.',
    alt: 'The Termii team at work' },
  { slug: 'telroi', name: 'Telroi', pillar: 'Build', mark: 'telroi', featured: true, href: 'https://telroi.ai',
    blurb: 'AI-native voice infrastructure that lets businesses answer, route and understand every call.',
    alt: 'The Telroi voice console' },
  { slug: 'sotel', name: 'Sotel', pillar: 'Build', mark: 'sotel', featured: false, href: 'https://sotel.com',
    blurb: 'Siu Telecoms, trading as Sotel: a licensed mobile virtual network operator in Nigeria.',
    alt: 'A Sotel eSIM being activated on a phone' },
  { slug: 'aidi-ventures', name: 'Aidi Ventures', pillar: 'Back', mark: 'aidi', featured: true, href: '/back',
    blurb: 'A venture firm backing exceptional African and diaspora founders building for the world.',
    alt: 'Founders at work' },
  { slug: 'aidi-wealth', name: 'Aidi Wealth', pillar: 'Bridge', mark: 'aidi', featured: false, href: 'https://joinaidi.com',
    blurb: 'Cross-border wealth access for the African diaspora and Nigerians, on joinaidi.com.',
    alt: 'The Aidi app' },
  { slug: 'aidi-haven', name: 'Aidi Haven', pillar: 'Host', mark: 'aidi', featured: false, href: '/host',
    blurb: 'Short-stay homes for professionals, founders and diaspora travellers, operated in San Jose.',
    alt: 'A living room in an Aidi Haven home' }
]

const files = import.meta.glob('../assets/companies/*/*.{webp,jpg,jpeg,png,avif,mp4,webm}', {
  eager: true, query: '?url', import: 'default'
}) as Record<string, string>

export function companyMedia(slug: string): CompanyMedia {
  const media: CompanyMedia = { poster: null, mp4: null, webm: null }
  for (const [path, url] of Object.entries(files)) {
    const m = path.match(/companies\/([^/]+)\/(poster|clip)\.(\w+)$/)
    if (!m || m[1] !== slug) continue
    if (m[2] === 'poster') media.poster = url
    else if (m[3] === 'mp4') media.mp4 = url
    else if (m[3] === 'webm') media.webm = url
  }
  return media
}
