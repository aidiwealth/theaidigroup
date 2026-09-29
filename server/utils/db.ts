import pg from 'pg'

let pool: pg.Pool | null = null

// One pool per server process. Fails loudly if the database is not configured.
export function db(): pg.Pool {
  if (pool) return pool
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is not set')
  // sslmode=disable is for a local database only; anything else must verify the server certificate.
  const local = /[?&]sslmode=disable/.test(url)
  const ca = process.env.DATABASE_CA
  if (!local && !ca) throw new Error('DATABASE_CA is not set')
  pool = new pg.Pool({
    connectionString: url.replace(/[?&]sslmode=[^&]*/, ''),
    ssl: local ? false : { ca, rejectUnauthorized: true },
    max: 5,
    idleTimeoutMillis: 30000
  })
  pool.on('error', (err) => console.error('[db] idle client error', err))
  return pool
}
