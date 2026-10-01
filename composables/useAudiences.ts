// "Who we work with" cards. Videos are the joinaidi.com customer-page clips.
const R2 = 'https://pub-f138f42d66b748108ebf7432c7314665.r2.dev/'

export interface Audience { tag: string; title: string; desc: string; video: string; href: string; link: string }

export const AUDIENCES: Audience[] = [
  { tag: 'Aidi Ventures', title: 'Founders building for the world', video: R2 + 'iStock-1702872444.mp4',
    desc: 'We back African and diaspora technical founders with capital and operator support.', href: '/back', link: 'Pitch us' },
  { tag: 'Aidi Wealth', title: 'Families building wealth across borders', video: R2 + 'iStock-2157298522.mp4',
    desc: 'Aidi Wealth gives diaspora and Nigerian families access to global markets.', href: 'https://joinaidi.com', link: 'Visit joinaidi.com' },
  { tag: 'Aidi Haven', title: 'Diaspora travellers and professionals', video: R2 + 'aidihaven%20(1).mp4',
    desc: 'Short-stay homes in San Jose, with Lagos and other hubs planned.', href: 'https://aidihaven.com', link: 'Visit aidihaven.com' }
]
