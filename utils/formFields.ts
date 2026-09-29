export type FieldType = 'text' | 'email' | 'url' | 'select' | 'textarea'
export interface FormField {
  name: string
  label: string
  type: FieldType
  required: boolean
  options?: string[]
  autocomplete?: string
  hint?: string
}
export type WebsiteForm = 'pitch' | 'service' | 'contact' | 'signup'

const name: FormField = { name: 'name', label: 'Your name', type: 'text', required: true, autocomplete: 'name' }
const email: FormField = { name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' }

export const FORM_FIELDS: Record<WebsiteForm, FormField[]> = {
  pitch: [
    name, email,
    { name: 'company', label: 'Company', type: 'text', required: true, autocomplete: 'organization' },
    { name: 'companyUrl', label: 'Company website', type: 'url', required: false, autocomplete: 'url' },
    { name: 'deckUrl', label: 'Link to your deck', type: 'url', required: true, hint: 'A shareable link (DocSend, Google Drive, Dropbox).' },
    { name: 'stage', label: 'Stage', type: 'select', required: true, options: ['Pre-seed', 'Seed', 'Series A', 'Other'] },
    { name: 'country', label: 'Where the team is based', type: 'text', required: true },
    { name: 'summary', label: 'What you are building, and for whom', type: 'textarea', required: true }
  ],
  service: [
    name, email,
    { name: 'company', label: 'Company (if any)', type: 'text', required: false, autocomplete: 'organization' },
    { name: 'service', label: 'What do you need?', type: 'select', required: true,
      options: ['US company formation', 'Nigeria company formation', 'Compliance and filings', 'Other'] },
    { name: 'message', label: 'Tell us more', type: 'textarea', required: true }
  ],
  contact: [
    name, email,
    { name: 'company', label: 'Organisation (optional)', type: 'text', required: false, autocomplete: 'organization' },
    { name: 'topic', label: 'Topic', type: 'select', required: true, options: ['Partnership', 'Founder', 'Client', 'Press', 'Careers', 'Other'] },
    { name: 'message', label: 'Message', type: 'textarea', required: true }
  ],
  signup: [email]
}

export const FORM_COPY: Record<WebsiteForm, { submit: string; done: string }> = {
  pitch: { submit: 'Send pitch', done: 'Thank you. We read every pitch and will reply if there is a fit.' },
  service: { submit: 'Send request', done: 'Thank you. We will be in touch about your request.' },
  contact: { submit: 'Send message', done: 'Thank you. We will get back to you soon.' },
  signup: { submit: 'Sign up', done: 'Thank you. You are on the list.' }
}
