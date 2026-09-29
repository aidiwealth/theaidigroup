// Public endpoint: validate, check Turnstile, store, then email the team.
// A stored submission is never lost if email fails; the error is recorded on the row.
export default defineEventHandler(async (event) => {
  const kind = getRouterParam(event, 'kind') as FormKind
  if (!FORM_KINDS.includes(kind)) throw createError({ statusCode: 404, statusMessage: 'Unknown form' })

  const parsed = FORM_SCHEMAS[kind].safeParse(await readBody(event))
  if (!parsed.success) {
    const fields = parsed.error.issues.map((i) => String(i.path[0]))
    throw createError({ statusCode: 422, statusMessage: 'Please check the highlighted fields', data: { fields } })
  }
  const data = parsed.data as Record<string, unknown> & { email: string; turnstile: string }

  const ip = getRequestHeader(event, 'cf-connecting-ip') || getRequestIP(event, { xForwardedFor: true })
  if (!(await verifyTurnstile(data.turnstile, ip))) {
    throw createError({ statusCode: 403, statusMessage: 'Security check failed. Please try again.' })
  }

  const { turnstile: _t, website_hp: _h, source, name, email, company, ...rest } = data
  const inserted = await db().query<{ id: string }>(
    `INSERT INTO intake.submissions (kind, name, email, company, payload, source_page)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT DO NOTHING
     RETURNING id`,
    [kind, name ?? null, email, company || null, JSON.stringify(rest), source ?? null]
  )
  // A repeat sign-up hits the unique index and returns no row: that is fine for sign-ups only.
  if (inserted.rowCount === 0) {
    if (kind === 'signup') return { ok: true }
    throw new Error('Insert into intake.submissions returned no row for kind ' + kind)
  }
  const id = inserted.rows[0].id

  const envName = ROUTE_ENV[kind]
  if (envName) {
    try {
      const to = process.env[envName]
      if (!to) throw new Error(envName + ' is not set')
      const { subject, text } = emailText(kind, id, data)
      await sendEmail({ to, subject, text, replyTo: email })
      await db().query('UPDATE intake.submissions SET email_sent_at = now() WHERE id = $1', [id])
    } catch (err) {
      console.error('[forms] email failed for submission ' + id, err)
      await db().query('UPDATE intake.submissions SET email_error = $2 WHERE id = $1', [id, String(err).slice(0, 500)])
    }
  }
  return { ok: true, id }
})
