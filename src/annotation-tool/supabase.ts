import type { Annotation } from './types'

// Supabase REST API via plain fetch — no package dependency needed.
// Reads credentials from Vite env vars (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).

function getConfig() {
  const env = (import.meta as unknown as { env: Record<string, string> }).env
  return { url: env.VITE_SUPABASE_URL ?? '', key: env.VITE_SUPABASE_ANON_KEY ?? '' }
}

function headers() {
  const { key } = getConfig()
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal',
  }
}

function isConfigured() {
  const { url, key } = getConfig()
  return Boolean(url && key)
}

export async function fetchAnnotations(): Promise<Annotation[]> {
  if (!isConfigured()) return []
  try {
    const { url } = getConfig()
    const res = await fetch(`${url}/rest/v1/annotations?select=*`, { headers: headers() })
    if (!res.ok) return []
    const data = (await res.json()) as Array<{
      id: string; x: number; y: number; text: string; page: string; created_at: number
    }>
    return data.map((row) => ({
      id: row.id, x: row.x, y: row.y, text: row.text, page: row.page, createdAt: row.created_at,
    }))
  } catch {
    return []
  }
}

export async function insertAnnotation(annotation: Annotation): Promise<void> {
  if (!isConfigured()) return
  try {
    const { url } = getConfig()
    await fetch(`${url}/rest/v1/annotations`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        id: annotation.id, x: annotation.x, y: annotation.y,
        text: annotation.text, page: annotation.page, created_at: annotation.createdAt,
      }),
    })
  } catch { /* silent */ }
}

export async function deleteAnnotation(id: string): Promise<void> {
  if (!isConfigured()) return
  try {
    const { url } = getConfig()
    await fetch(`${url}/rest/v1/annotations?id=eq.${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: headers(),
    })
  } catch { /* silent */ }
}
