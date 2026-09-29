// Verifies a Cloudflare Turnstile token. Returns false for a failed challenge; throws if misconfigured.
export async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET
  if (!secret) throw new Error('TURNSTILE_SECRET is not set')
  const form = new URLSearchParams({ secret, response: token })
  if (ip) form.set('remoteip', ip)
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form })
  if (!res.ok) throw new Error('Turnstile verify HTTP ' + res.status)
  const data = await res.json() as { success: boolean }
  return data.success === true
}
