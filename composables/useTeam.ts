// Our team: the aidiwealth.com About page team plus Aidi Ventures' General Partner.
// Only list people who have agreed to appear on this site.
const R2 = 'https://pub-f138f42d66b748108ebf7432c7314665.r2.dev/'

export interface Member { id: string; name: string; role: string; photo: string; bio: string; focus: string }

const ALL_MEMBERS: Member[] = [
  { id: 'emmanuel', name: 'Emmanuel Gbolade', role: 'Founder', photo: R2 + 'emma-1.png',
    bio: 'Emmanuel leads the group\'s overall vision across infrastructure, capital strategy, and global expansion. As a founder and operator building across Silicon Valley and emerging markets, he brings deep experience in scaling technology platforms and structuring cross-border financial systems for institutions and families.',
    focus: 'Business Strategy · Venture & Capital Markets' },
  { id: 'deborah', name: 'Deborah Gbolade', role: 'Founder & Managing Director', photo: R2 + 'may-1.png',
    bio: 'Deborah leads Aidi as Managing Partner, overseeing the firm\'s strategic direction across wealth management, venture advisory, and product development. With deep roots in both Silicon Valley and emerging markets, she brings a unique perspective on cross-border wealth creation for global professionals and families.',
    focus: 'Business advisory · Aidi Haven · Aidi Ventures' },
  { id: 'kayode', name: 'Olukayode (Kayode) Afolabi', role: 'General Partner, Aidi Ventures', photo: R2 + 'IMG_6083.jpeg',
    bio: 'Kayode brings 12+ years in capital raising and investor relations. As co-founder and Managing Partner of Elveden Capital in London, he has helped raise £15.5 million of equity and development finance. Earlier, as Director of DFS Africa, he led transaction sourcing for the Development Finance Summit in Lagos, where about US$2.3 billion of transactions were presented to institutional investors, and ran Deal Rooms in Nairobi, Johannesburg and Abu Dhabi.',
    focus: 'Capital Raising · Investor Relations · Deal Origination' },
  { id: 'mayowa', name: 'Mayowa Iroju, CFA®', role: 'Partner & Head of Wealth Management, Aidi Wealth', photo: R2 + 'mayowa-1.png',
    bio: 'Mayowa leads wealth management at Aidi Wealth, the group\'s fintech company, where he oversees multi-asset portfolio strategy, USD-denominated investments and cross-border planning for Aidi Wealth\'s clients. Aidi Wealth\'s services and disclosures are on aidiwealth.com.',
    focus: 'Aidi Wealth · Portfolio strategy' },
  { id: 'kofo', name: 'Kofo Lawal', role: 'General Counsel', photo: R2 + 'kofo-3.png',
    bio: 'Kofo is General Counsel of The Aidi Group. She leads legal across the group and guides companies in Africa through entity structuring, company formation and cross-border compliance under US and Nigerian law.',
    focus: 'Entity structuring · Cross-border law · Compliance' },
  { id: 'tolulope', name: 'Tolulope Obademi', role: 'Head of Operations, Aidi Ventures', photo: R2 + 'tolu-2.png',
    bio: 'Tolulope drives operational excellence across the Aidi platform — from client onboarding and compliance to product delivery and partner coordination. She ensures every client touchpoint reflects Aidi\'s commitment to precision and trust.',
    focus: 'Operations · Client Experience · Compliance' },
  { id: 'desola', name: 'Desola Adedoyin', role: 'Associate, Aidi Ventures', photo: R2 + 'dess-3.png',
    bio: 'Desola supports Aidi\'s startup advisory and private markets portfolio — helping founders raise capital, build investor-ready materials, and navigate early-stage growth. She is closely involved in deal sourcing and portfolio company acceleration across Africa and the diaspora.',
    focus: 'Startup Advisory · Private Markets · Deal Sourcing' },
  { id: 'grant', name: 'Grant Ter-Avanesyan, CFP®', role: 'External Wealth Adviser', photo: R2 + 'grant.png',
    bio: 'Grant advises The Aidi Group on its own wealth and investment strategy as an external adviser. He is the founder and Chief Investment Officer of Grant Private Wealth Management, with decades of experience in portfolio construction, fiduciary advice and long-term financial planning.',
    focus: 'Group wealth strategy · Financial planning' },
  { id: 'sarah', name: 'Sarah Mana, Esq', role: 'External Regulatory Counsel', photo: R2 + 'sara.png',
    bio: 'Sara is a Partner at Aidi, leading legal strategy and regulatory infrastructure across the firm\'s wealth, venture, and platform operations. A dual-qualified lawyer in New York and England & Wales, she specializes in fund structuring, cross-border compliance, and building legal frameworks for scalable financial platforms.',
    focus: 'Regulatory counsel · Fund structuring' }
]

// Profiles switched off on the site (kept here so they can be turned back on).
export const HIDDEN_MEMBERS = ['emmanuel']
export const TEAM: Member[] = ALL_MEMBERS.filter((m) => !HIDDEN_MEMBERS.includes(m.id))
