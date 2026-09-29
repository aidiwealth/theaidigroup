// composables/useBrandData.ts
// Single source of truth for the portfolio brand cards and side modals.
// Update copy here; the components consume this directly.

export interface BrandMetric {
  label: string
  value: string
  featured?: boolean
}

export interface BrandSection {
  title: string
  body: string
}

export interface BrandLink {
  label: string
  url: string
}

export interface Brand {
  key: BrandKey
  color: string
  eyebrow: string
  name: string
  tagline: string
  metrics: BrandMetric[]
  sections: BrandSection[]
  link: BrandLink | null
  signature: string // may contain <em> tags
}

export type BrandKey = 'telroi' | 'termii' | 'sotel'

export const BRAND_DATA: Record<BrandKey, Brand> = {
  telroi: {
    key: 'telroi',
    color: '#2da7c3',
    eyebrow: 'A wholly-owned operating company of The Telroi Group.',
    name: 'Telroi',
    tagline:
      'AI-native voice and communications infrastructure for operators and enterprises shaping the next decade of communication.',
    metrics: [
      { label: 'Category', value: 'Voice & AI', featured: true },
      { label: 'Reach', value: 'Multi-market' }
    ],
    sections: [
      {
        title: 'Position',
        body: 'Telroi.ai builds voice and AI-native communications infrastructure for operators and enterprises across multiple markets — anchored by carrier integrations, aggregation expertise, and operator-grade reliability. Wholly-owned by The Telroi Group.'
      }
    ],
    link: { label: 'Visit telroi.ai', url: 'https://telroi.ai' },
    signature: 'A wholly-owned operating company of <em>The Telroi Group</em>.'
  },
  termii: {
    key: 'termii',
    color: '#34a873',
    eyebrow: 'A portfolio company. Telroi holds a strategic interest.',
    name: 'Termii',
    tagline:
      'Messaging and customer authentication infrastructure powering financial institutions, fintechs, and enterprises across global markets.',
    metrics: [
      { label: 'Category', value: 'Financial Messaging', featured: true },
      { label: 'Reach', value: 'Multi-market' }
    ],
    sections: [
      {
        title: 'Position',
        body: 'Termii powers OTP delivery, customer messaging, and conversational authentication for banks, fintechs, and large enterprises — with deep operator integrations across African markets and an expanding footprint into North American and other global financial corridors.'
      }
    ],
    link: { label: 'Visit termii.com', url: 'https://termii.com' },
    signature:
      'Operated independently by its founders and leadership team. <em>The Telroi Group</em> holds a strategic interest.'
  },
  sotel: {
    key: 'sotel',
    color: '#13B1A4',
    eyebrow: 'The trading brand of Siu Telecoms. A portfolio company.',
    name: 'Sotel',
    tagline:
      'Mobile connectivity and last-mile telecom services delivering coverage where it matters most.',
    metrics: [
      { label: 'Category', value: 'Mobile Connectivity', featured: true },
      { label: 'Reach', value: 'Regional' }
    ],
    sections: [
      {
        title: 'Position',
        body: 'Sotel delivers consumer mobile connectivity and last-mile telecom services across underserved corridors — anchored by carrier partnerships and operator-grade infrastructure that reaches the places others overlook.'
      }
    ],
    link: { label: 'Visit sotel.com', url: 'https://sotel.com' },
    signature:
      'Sotel is the trading brand of <em>Siu Telecoms</em>, operated independently by its leadership team. Held by <em>The Telroi Group</em> through its strategic interest in Siu Telecoms.'
  }
}

// Reactive global state for the currently-open modal
const openBrand = ref<BrandKey | null>(null)

export const useBrandModal = () => {
  const isOpen = computed(() => openBrand.value !== null)
  const current = computed<Brand | null>(() =>
    openBrand.value ? BRAND_DATA[openBrand.value] : null
  )

  function open(key: BrandKey) {
    openBrand.value = key
    if (process.client) {
      document.body.classList.add('modal-open')
    }
  }

  function close() {
    openBrand.value = null
    if (process.client) {
      document.body.classList.remove('modal-open')
    }
  }

  return { isOpen, current, open, close }
}

export const useBrandData = () => ({ BRAND_DATA })
