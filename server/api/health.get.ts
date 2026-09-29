// Health check: reports missing configuration and whether the database answers.
const REQUIRED = ['DATABASE_URL', 'RESEND_API_KEY', 'FORMS_FROM', 'FORMS_TO_PITCH', 'FORMS_TO_SERVICES', 'FORMS_TO_CONTACT', 'TURNSTILE_SECRET']

export default defineEventHandler(async (event) => {
  const missing = REQUIRED.filter((k) => !process.env[k])
  let database = 'ok'
  try {
    await db().query('SELECT 1 FROM intake.submissions LIMIT 1')
  } catch (err) {
    console.error('[health] database check failed', err)
    database = 'error'
  }
  if (missing.length) console.error('[health] missing configuration: ' + missing.join(', '))
  const ok = missing.length === 0 && database === 'ok'
  setResponseStatus(event, ok ? 200 : 503)
  return { ok, database, missingConfig: missing.length }
})
