export type JwtPayload = {
  userId?: number | string
  sub?: number | string
  exp?: number
  iat?: number
  [key: string]: unknown
}

function base64UrlDecode(input: string) {
  const pad = "=".repeat((4 - (input.length % 4)) % 4)
  const base64 = (input + pad).replace(/-/g, "+").replace(/_/g, "/")
  return atob(base64)
}

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split(".")
    if (!payload) return null
    return JSON.parse(base64UrlDecode(payload)) as JwtPayload
  } catch {
    return null
  }
}