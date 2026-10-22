export function normalizeMalaysianNumber(input) {
  const digits = String(input ?? '').replace(/\D/g, '')
  if (digits.startsWith('60')) return digits
  if (digits.startsWith('0')) return `60${digits.slice(1)}`
  return `60${digits}`
}

export function buildWhatsAppUrl(phone, message = '') {
  const number = normalizeMalaysianNumber(phone)
  const query = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${number}${query}`
}

export function getWhatsAppEnquiryMessage(businessName) {
  return `Hi, I would like to enquire about ${businessName}.`
}

export function getBusinessWhatsAppMessage(business, type = 'general', values = {}) {
  const messages = business?.cta?.messages ?? {}
  const template = messages[type] ?? business?.cta?.primaryMessage ?? getWhatsAppEnquiryMessage(business?.businessName)
  return template.replace(/\{(business|service|package)\}/g, (_, key) => values[key] ?? business?.businessName ?? '')
}
