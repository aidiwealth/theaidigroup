// Our team: the joinaidi.com About page team plus Aidi Ventures' General Partner.
// Only list people who have agreed to appear on this site.
const R2 = 'https://pub-f138f42d66b748108ebf7432c7314665.r2.dev/'

export interface Member { id: string; name: string; role: string; photo: string; bio: string; focus: string }

export const TEAM: Member[] = [
  { id: 'emmanuel', name: 'Emmanuel Gbolade', role: 'Founder', photo: R2 + 'emma-1.png',
    bio: 'Emmanuel leads the group\'s overall vision across infrastructure, capital strategy, and global expansion. As a founder and operator building across Silicon Valley and emerging markets, he brings deep experience in scaling technology platforms and structuring cross-border financial systems for institutions and families.',
    focus: 'Business Strategy · Venture & Capital Markets' },
  { id: 'deborah', name: 'Deborah Gbolade', role: 'Founder & Managing Director', photo: R2 + 'may-1.png',
    bio: 'Deborah leads Aidi as Managing Partner, overseeing the firm\'s strategic direction across wealth management, venture advisory, and product development. With deep roots in both Silicon Valley and emerging markets, she brings a unique perspective on cross-border wealth creation for global professionals and families.',
    focus: 'Strategy · Wealth Management · Operations' },
  { id: 'kayode', name: 'Olukayode (Kayode) Afolabi', role: 'General Partner, Aidi Ventures', photo: R2 + 'IMG_6083.jpeg',
    bio: 'Kayode brings 12+ years in capital raising and investor relations. As co-founder and Managing Partner of Elveden Capital in London, he has helped raise £15.5 million of equity and development finance. Earlier, as Director of DFS Africa, he led transaction sourcing for the Development Finance Summit in Lagos, where about US$2.3 billion of transactions were presented to institutional investors, and ran Deal Rooms in Nairobi, Johannesburg and Abu Dhabi.',
    focus: 'Capital Raising · Investor Relations · Deal Origination' },
  { id: 'mayowa', name: 'Mayowa Iroju, CFA®', role: 'Partner & Head of Wealth Management, Aidi Wealth', photo: R2 + 'mayowa-1.png',
    bio: 'Mayowa leads wealth management services at Aidi, helping high-earning professionals and diaspora families structure and grow their financial portfolios. He specialises in multi-asset allocation strategies, USD-denominated investments, and cross-border financial planning.',
    focus: 'Wealth Management · Portfolio Strategy · Diaspora Finance' },
  { id: 'kofo', name: 'Kofo Lawal', role: 'General Counsel', photo: R2 + 'kofo-3.png',
    bio: 'Kofo heads the legal function at Aidi, guiding clients through entity structuring, LLC formation, trust setup, and cross-border regulatory compliance. Her expertise spans both U.S. and Nigerian legal frameworks, making her essential for diaspora and multinational clients.',
    focus: 'Entity Structuring · Cross-border Law · Compliance' },
  { id: 'tolulope', name: 'Tolulope Obademi', role: 'Head of Operations, Aidi Ventures', photo: R2 + 'tolu-2.png',
    bio: 'Tolulope drives operational excellence across the Aidi platform — from client onboarding and compliance to product delivery and partner coordination. She ensures every client touchpoint reflects Aidi\'s commitment to precision and trust.',
    focus: 'Operations · Client Experience · Compliance' },
  { id: 'desola', name: 'Desola Adedoyin', role: 'Associate, Aidi Ventures', photo: R2 + 'dess-3.png',
    bio: 'Desola supports Aidi\'s startup advisory and private markets portfolio — helping founders raise capital, build investor-ready materials, and navigate early-stage growth. She is closely involved in deal sourcing and portfolio company acceleration across Africa and the diaspora.',
    focus: 'Startup Advisory · Private Markets · Deal Sourcing' },
  { id: 'grant', name: 'Grant Ter-Avanesyan, CFP®', role: 'Wealth Adviser', photo: R2 + 'grant.png',
    bio: 'Grant is a Partner at Aidi, leading wealth advisory and investment strategy for high-net-worth individuals and families. As Founder and Chief Investment Officer of Grant Private Wealth Management, he brings decades of experience in portfolio construction, fiduciary advisory, and long-term financial planning.',
    focus: 'Wealth Management · Financial Planning' },
  { id: 'sarah', name: 'Sarah Mana, Esq', role: 'External Counsel, Legal & Regulatory', photo: R2 + 'sara.png',
    bio: 'Sara is a Partner at Aidi, leading legal strategy and regulatory infrastructure across the firm\'s wealth, venture, and platform operations. A dual-qualified lawyer in New York and England & Wales, she specializes in fund structuring, cross-border compliance, and building legal frameworks for scalable financial platforms.',
    focus: 'Legal & Compliance Strategy · Fund Structuring' }
]
