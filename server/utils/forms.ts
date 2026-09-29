import { z } from 'zod'

const name = z.string().trim().min(2).max(120)
const email = z.string().trim().toLowerCase().email().max(200)
const short = z.string().trim().max(160)
const long = z.string().trim().min(10).max(3000)
const url = z.string().trim().url().max(400)
const base = { turnstile: z.string().min(1), website_hp: z.literal('').optional(), source: z.string().max(200).optional() }

export const FORM_SCHEMAS = {
  pitch: z.object({ ...base, name, email, company: short.min(1), companyUrl: url.or(z.literal('')).optional(),
    deckUrl: url, stage: z.enum(['Pre-seed', 'Seed', 'Series A', 'Other']), country: short.min(2), summary: long }),
  service: z.object({ ...base, name, email, company: short.optional(),
    service: z.enum(['US company formation', 'Nigeria company formation', 'Compliance and filings', 'Other']), message: long }),
  contact: z.object({ ...base, name, email, company: short.optional(),
    topic: z.enum(['Partnership', 'Founder', 'Client', 'Press', 'Careers', 'Other']), message: long }),
  signup: z.object({ ...base, email })
} as const

export type FormKind = keyof typeof FORM_SCHEMAS
export const FORM_KINDS = Object.keys(FORM_SCHEMAS) as FormKind[]

// Env var holding the team inbox for each form. Sign-ups are stored only.
export const ROUTE_ENV: Record<FormKind, string | null> = {
  pitch: 'FORMS_TO_PITCH', service: 'FORMS_TO_SERVICES', contact: 'FORMS_TO_CONTACT', signup: null
}

const LABEL: Record<FormKind, string> = { pitch: 'New pitch', service: 'Service request', contact: 'Contact message', signup: 'Email sign-up' }

export function emailText(kind: FormKind, id: string, data: Record<string, unknown>): { subject: string; text: string } {
  const who = String(data.company || data.name || data.email)
  const lines = Object.entries(data)
    .filter(([k]) => !['turnstile', 'website_hp'].includes(k))
    .map(([k, v]) => k + ': ' + String(v ?? ''))
  return {
    subject: LABEL[kind] + ' — ' + who,
    text: lines.join('\n') + '\n\nSubmission ID: ' + id + '\nStored in intake.submissions.'
  }
}
