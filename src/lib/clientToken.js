// Token de reserva anónima (feature 07).
// Genera un JWT firmado con HMAC-SHA256 (Web Crypto) usando la clave compartida
// VITE_CLIENT_TOKEN_SECRET. Se envía en la cabecera X-Client-Token al backend
// para ligar las reservas anónimas a este navegador (sin login).
//
// Claims: { sub: 'web-client', jti, client_version, iat, exp }

const TOKEN_STORAGE_KEY = 'beauty-session-token'
const JTI_STORAGE_KEY = 'beauty-session-jti'
const TOKEN_TTL_SECONDS = 90 * 24 * 60 * 60 // 90 días

const SECRET = import.meta.env.VITE_CLIENT_TOKEN_SECRET

// ─── base64url (sin Buffer, fijo para navegador) ──────────────────────────

function bytesToBase64Url(bytes) {
  let binary = ''
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk))
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlToBytes(str) {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const padded = b64.padEnd(b64.length + ((4 - (b64.length % 4)) % 4), '=')
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

function jsonToB64Url(obj) {
  return bytesToBase64Url(new TextEncoder().encode(JSON.stringify(obj)))
}

function b64UrlToJson(str) {
  return JSON.parse(new TextDecoder().decode(base64UrlToBytes(str)))
}

// ─── HMAC-SHA256 (Web Crypto) ─────────────────────────────────────────────

async function importKey(secret) {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
}

async function hmacSha256(data, secret) {
  const key = await importKey(secret)
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return bytesToBase64Url(new Uint8Array(sig))
}

async function signJwt(payload, secret) {
  const header = { alg: 'HS256', typ: 'JWT' }
  const headerB64 = jsonToB64Url(header)
  const payloadB64 = jsonToB64Url(payload)
  const signingInput = `${headerB64}.${payloadB64}`
  const signature = await hmacSha256(signingInput, secret)
  return `${signingInput}.${signature}`
}

// ─── jti persistente ───────────────────────────────────────────────────────

function getOrCreateJti() {
  let jti = localStorage.getItem(JTI_STORAGE_KEY)
  if (!jti) {
    jti = crypto.randomUUID()
    localStorage.setItem(JTI_STORAGE_KEY, jti)
  }
  return jti
}

function readPayloadUnsafe(token) {
  try {
    const payloadB64 = token.split('.')[1]
    return b64UrlToJson(payloadB64)
  } catch {
    return null
  }
}

// ─── API pública ────────────────────────────────────────────────────────────

async function buildToken() {
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    sub: 'web-client',
    jti: getOrCreateJti(),
    client_version: '1',
    iat: now,
    exp: now + TOKEN_TTL_SECONDS,
  }
  return signJwt(payload, SECRET)
}

// Devuelve un token válido (reusa el de localStorage si no venció; si no, lo
// firma y lo persiste).
export async function getClientToken() {
  const saved = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (saved) {
    const payload = readPayloadUnsafe(saved)
    const now = Math.floor(Date.now() / 1000)
    if (payload && payload.exp && payload.exp > now) {
      return saved
    }
  }
  const token = await buildToken()
  localStorage.setItem(TOKEN_STORAGE_KEY, token)
  return token
}
