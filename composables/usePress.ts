// composables/usePress.ts
// Press coverage data. The featured item appears in the prominent card;
// items in `list` appear in the compact tabular list below.

export interface PressItem {
  date: string
  headline: string
  outlet: string
  url: string
}

export interface FeaturedPressItem extends PressItem {
  excerpt: string
  meta: string // e.g. "Featured"
}

export const FEATURED_PRESS: FeaturedPressItem = {
  date: 'May 2026',
  meta: 'Featured',
  outlet: 'Financial Times',
  headline:
    "Termii ranks #1 in Media & Telecoms on FT's Africa's Fastest-Growing Companies — for the second consecutive year.",
  excerpt:
    "The Financial Times' annual ranking recognises 130 high-growth businesses across the African continent — Termii has topped the Media & Telecoms category two years running, signalling sustained category leadership and operator-grade scale.",
  url: 'https://techcabal.com/2026/05/15/termii-ranks-1-in-fts-fastest-growing-companies-in-media-and-telecoms/'
}

export const PRESS_LIST: PressItem[] = [
  {
    date: '2025',
    headline:
      'Termii launches global eSIM API service for seamless data roaming across 180 countries',
    outlet: 'Punch',
    url: 'https://punchng.com/termii-launches-global-esim-api-service-in-partnership-with-siu-telecoms-for-seamless-data-roaming-across-180-countries/'
  },
  {
    date: 'Jun 2025',
    headline:
      'Sotel delivers instant global data in 180 countries with affordable eSIM plans',
    outlet: 'TechCabal',
    url: 'https://techcabal.com/2025/06/17/sotel-delivers-instant-global-data-in-180-countries-with-affordable-esim-plans/'
  },
  {
    date: '2025',
    headline: "Termii tops Financial Times' Africa's Fastest-Growing Companies list",
    outlet: 'Financial Times',
    url: 'https://punchng.com/termii-tops-financial-times-africas-fastest-growing-companies-list/'
  },
  {
    date: 'Jun 2023',
    headline: 'Termii raises $3.65M to expand into Francophone African markets',
    outlet: 'TechCrunch',
    url: 'https://techcrunch.com/2023/06/12/nigerias-termii-to-launch-mobile-app-and-scale-customer-engagement-business-with-new-funding/'
  },
  {
    date: 'Mar 2021',
    headline: 'Termii raises $1.4M seed led by Future Africa and Kepple Africa Ventures',
    outlet: 'TechCrunch',
    url: 'https://techcrunch.com/2021/03/19/nigerias-termii-raises-1-4m-seed-led-by-future-africa-and-kepple-africa-ventures/'
  }
]

export const usePress = () => ({
  featured: FEATURED_PRESS,
  list: PRESS_LIST
})
