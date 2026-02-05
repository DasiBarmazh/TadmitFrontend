const GOOGLE_MAPS_BASE_URL = 'https://www.google.com/maps/search/?api=1'
const WHATSAPP_BASE_URL = 'https://wa.me/'
const ISRAEL_COUNTRY_CODE = '972'

export function getGoogleMapsUrl(address: string): string {
  return `${GOOGLE_MAPS_BASE_URL}&query=${encodeURIComponent(address)}`
}

export function getWhatsAppUrl(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  const number =
    digits.startsWith('0')
      ? ISRAEL_COUNTRY_CODE + digits.slice(1)
      : digits.length === 9
        ? ISRAEL_COUNTRY_CODE + digits
        : digits
  return `${WHATSAPP_BASE_URL}${number}`
}

export function getMailtoUrl(email: string): string {
  const trimmed = email.trim()
  const open = trimmed.indexOf('<')
  const close = trimmed.indexOf('>')
  const addressOnly =
    open !== -1 && close > open
      ? trimmed.slice(open + 1, close).trim()
      : trimmed.replace(/[<>]/g, '')
  return `mailto:${addressOnly}`
}
