// The Aidi Group's companies by sector. Edit copy, links and videos here.
// Order matters: the first three show on the home page; the rest appear under "View more".
const R2 = 'https://pub-f138f42d66b748108ebf7432c7314665.r2.dev/'

export type Group = 'fintech' | 'investment' | 'telecoms' | 'realestate' | 'markets'

export interface Sector {
  key: string
  group: Group
  sector: string
  company: string
  affiliated?: boolean
  icon: string // inner SVG for a 24x24 stroke icon
  pill: string
  headline: string
  body: string
  video: string // '' shows a plain navy panel
  href: string // '' hides the link
  cta: string
}

export const GROUPS: { key: 'all' | Group; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'fintech', label: 'Fintech' },
  { key: 'investment', label: 'Investment' },
  { key: 'telecoms', label: 'AI & Telecoms' },
  { key: 'realestate', label: 'Real Estate' },
  { key: 'markets', label: 'Public Markets' }
]

export const SECTORS: Sector[] = [
  {
    key: 'aidi-wealth', group: 'fintech', sector: 'Fintech', company: 'Aidi Wealth',
    icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    pill: 'Cross-border wealth access for the African diaspora and Nigerians.',
    headline: 'Wealth access, across borders.',
    body: 'Aidi Wealth helps the African diaspora in the US and Nigerians reach global markets from one AI-guided platform. Its services and disclosures live on joinaidi.com.',
    video: R2 + 'iStock-1319885802.mp4', href: 'https://joinaidi.com', cta: 'Visit joinaidi.com'
  },
  {
    key: 'aidi-ventures', group: 'investment', sector: 'Investment', company: 'Aidi Ventures',
    icon: '<path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>',
    pill: 'Backing exceptional African and diaspora founders building for the world.',
    headline: 'Backing founders who build for the world.',
    body: 'Aidi Ventures invests in exceptional African and diaspora technical founders, and gives them operator support alongside capital.',
    video: R2 + 'aidi-n2.mp4', href: 'https://aidiventures.com', cta: 'Visit aidiventures.com'
  },
  {
    key: 'telroi', group: 'telecoms', sector: 'AI & Telecoms', company: 'Telroi',
    icon: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>',
    pill: 'AI-native voice infrastructure for businesses.',
    headline: 'Infrastructure for how businesses talk.',
    body: 'Telroi builds AI-native voice infrastructure that lets businesses answer, route and understand every call, across the US and Africa.',
    video: R2 + 'iStock-1796562885.mp4', href: 'https://telroi.ai', cta: 'Visit telroi.ai'
  },
  {
    key: 'aidi-haven', group: 'realestate', sector: 'Real Estate', company: 'Aidi Haven',
    icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    pill: 'Short-stay homes for professionals, founders and diaspora travellers.',
    headline: 'A home base for people on the move.',
    body: 'Aidi Haven operates short-stay homes in San Jose for professionals, founders and diaspora travellers, with Lagos and other hubs planned.',
    video: R2 + 'iStock-2224470421.mp4', href: 'https://aidihaven.com', cta: 'Visit aidihaven.com'
  },
  {
    key: 'termii', group: 'telecoms', sector: 'AI & Telecoms', company: 'Termii', affiliated: true,
    icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    pill: 'Customer communications for businesses across Africa.',
    headline: 'How African businesses reach their customers.',
    body: 'Termii is a customer communications platform that helps businesses across Africa verify, notify and engage their customers at scale.',
    video: R2 + 'iStock-2214616155.mp4', href: 'https://termii.com', cta: 'Visit termii.com'
  },
  {
    key: 'sotel', group: 'telecoms', sector: 'AI & Telecoms', company: 'Siu Telecoms (Sotel)', affiliated: true,
    icon: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
    pill: 'A licensed mobile virtual network operator in Nigeria.',
    headline: 'Connectivity for a mobile-first market.',
    body: 'Siu Telecoms, trading as Sotel, is a licensed mobile virtual network operator in Nigeria, offering mobile data and eSIM connectivity.',
    video: R2 + 'iStock-2154873996.mp4', href: 'https://sotel.com', cta: 'Visit sotel.com'
  },
  {
    key: 'public-markets', group: 'markets', sector: 'Public Markets', company: 'AI & Energy on the NGX or US Market',
    icon: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    pill: 'Long-term positions in listed AI and energy companies.',
    headline: 'Long-term positions in AI & energy.',
    body: 'Alongside the businesses we build, we hold private long-term positions in listed energy companies on the Nigerian Exchange (NGX) or US public markets.',
    video: R2 + 'iStock-1317499354.mp4', href: '', cta: ''
  }
]

export const HERO_VIDEOS = [
  { src: R2 + 'iStock-1480311246.mp4', caption: 'Intelligence and Connectivity' },
  { src: R2 + 'iStock-2180538267.mp4', caption: 'Access to capital' },
  { src: R2 + 'iStock-900310256.mp4', caption: 'Preserving wealth' }
]
