export function getRevealClassName({ observerSupported = true, reducedMotion = false } = {}) {
  return `reveal${!observerSupported || reducedMotion ? ' is-visible' : ''}`
}

export function getFaqAnswerId(businessId, index) {
  return `${businessId}-faq-answer-${index}`
}
