interface SendArgs { to: string; subject: string; text: string; replyTo?: string }

// Sends through the Resend API. Throws on any failure so the caller can record it.
export async function sendEmail({ to, subject, text, replyTo }: SendArgs): Promise<string> {
  const key = process.env.RESEND_API_KEY
  const from = process.env.FORMS_FROM
  if (!key || !from) throw new Error('RESEND_API_KEY or FORMS_FROM is not set')
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: to.split(',').map((s) => s.trim()), subject, text, reply_to: replyTo })
  })
  const body = await res.json().catch(() => ({})) as { id?: string; message?: string }
  if (!res.ok || !body.id) throw new Error('Resend ' + res.status + ': ' + (body.message || 'no id returned'))
  return body.id
}
