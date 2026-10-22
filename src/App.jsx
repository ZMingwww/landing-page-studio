import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Check, ChevronDown, Clock3, Droplets, Facebook, Home, Instagram, Layers, Menu, MessageCircle, Phone, Receipt, Settings2, Sparkles, Star, X, Wrench } from 'lucide-react'
import { getBusinessConfig, getVisibleNavItems } from './config/businessConfig'
import { themeConfig } from './config/themeConfig'
import { getFaqAnswerId, getRevealClassName } from './utils/animation'
import { getCarouselState, getClosestSnapIndex, getPaginationState } from './utils/carousel'
import { buildWhatsAppUrl, getBusinessWhatsAppMessage } from './utils/whatsapp'

const icons = { sparkles: Sparkles, droplets: Droplets, wrench: Wrench, receipt: Receipt, home: Home, 'message-circle': MessageCircle, layers: Layers, 'settings-2': Settings2 }

function useBusiness() {
  const demoMode = import.meta.env.DEV || import.meta.env.VITE_DEMO_MODE === 'true'
  const configuredBusinessId = import.meta.env.VITE_BUSINESS_ID || 'aircondpro'
  const [id, setId] = useState(() => demoMode ? new URLSearchParams(window.location.search).get('business') || 'aircondpro' : configuredBusinessId)
  const business = getBusinessConfig(id)
  useEffect(() => {
    const theme = themeConfig[business.id] ?? themeConfig.aircondpro
    Object.entries(theme.colors).forEach(([key, value]) => document.documentElement.style.setProperty(`--${key}`, value))
    document.title = business.seo.title
    const setMeta = (selector, attributes, content) => { const meta = document.querySelector(selector) || document.head.appendChild(Object.assign(document.createElement('meta'), attributes)); meta.setAttribute('content', content) }
    setMeta('meta[name="description"]', { name: 'description' }, business.seo.description)
    setMeta('meta[property="og:title"]', { property: 'og:title' }, business.seo.title)
    setMeta('meta[property="og:description"]', { property: 'og:description' }, business.seo.description)
    setMeta('meta[property="og:type"]', { property: 'og:type' }, 'website')
    document.querySelector('link[rel="canonical"]')?.remove()
    if (business.seo.canonicalUrl) { const link = document.createElement('link'); link.rel = 'canonical'; link.href = business.seo.canonicalUrl; document.head.appendChild(link) }
    if (demoMode) {
      const hash = window.location.hash
      window.history.replaceState({}, '', `?business=${business.id}${hash}`)
      if (hash) window.requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView())
    }
  }, [business, demoMode])
  return { business, setId, demoMode }
}

function useActiveSection(navItems) {
  const [activeSection, setActiveSection] = useState(() => window.location.hash.slice(1) || navItems[0]?.href.slice(1) || '')
  useEffect(() => {
    const ids = navItems.map(item => item.href.slice(1))
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean)
    if (!sections.length || !('IntersectionObserver' in window)) return undefined
    const headerOffset = window.matchMedia('(max-width: 680px)').matches ? 84 : 92
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]) setActiveSection(visible[0].target.id)
    }, { rootMargin: `-${headerOffset}px 0px -55% 0px`, threshold: [0.1, 0.4, 0.7] })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [navItems])
  return [activeSection, setActiveSection]
}

function useReveal(contentKey) {
  const supportsObserver = typeof window !== 'undefined' && 'IntersectionObserver' in window
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const revealClassName = getRevealClassName({ observerSupported: supportsObserver, reducedMotion })
  useEffect(() => {
    document.documentElement.classList.add('js')
    const elements = document.querySelectorAll('.reveal:not(.is-visible)')
    if (!elements.length) return undefined
    if (!supportsObserver || reducedMotion) {
      elements.forEach(element => element.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    elements.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [contentKey, supportsObserver, reducedMotion])
  return revealClassName
}

function Icon({ name, size = 20 }) { const Component = icons[name] || Sparkles; return <Component size={size} strokeWidth={1.8} /> }
function WhatsAppButton({ business, children = business.cta.primaryLabel, message = business.cta.primaryMessage, className = '' }) { if (!business.contact.whatsapp) return null; return <a className={`button button-primary ${className}`} href={buildWhatsAppUrl(business.contact.whatsapp, message)} target="_blank" rel="noreferrer"><MessageCircle size={18} />{children}</a> }
function FloatingWhatsAppButton({ business }) { if (!business.contact.whatsapp) return null; const label = `Get a free quote from ${business.businessName} on WhatsApp`; return <a className="floating-whatsapp" href={buildWhatsAppUrl(business.contact.whatsapp, getBusinessWhatsAppMessage(business, 'floating'))} target="_blank" rel="noreferrer" aria-label={label} title={label}><MessageCircle size={25} strokeWidth={2} /><span className="floating-whatsapp-tooltip" role="tooltip">Get a free quote</span></a> }
function Brand({ business, compact = false }) { return <div className={`brand ${compact ? 'brand-compact' : ''}`}><a className="brand-link" href="#top" aria-label={`${business.businessName} home`}><span className="brand-mark">{business.logo.image ? <img src={business.logo.image} alt="" /> : <Icon name={business.logo.icon} size={18} />}</span><span className="brand-copy"><strong>{business.businessName}</strong>{business.logo.tagline && <small>{business.logo.tagline}</small>}</span></a></div> }
function SectionHeading({ eyebrow, title, description, align = 'left' }) { return <div className={`section-heading reveal ${align === 'center' ? 'text-center' : ''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div> }

function ScrollRail({ children, className, label }) {
  const viewportRef = useRef(null)
  const [scrollState, setScrollState] = useState({ isScrollable: false, canScrollPrev: false, canScrollNext: false })
  const [snapPositions, setSnapPositions] = useState([])
  const [activeSnap, setActiveSnap] = useState(0)
  const measureRail = () => {
    const viewport = viewportRef.current
    if (!viewport) return
    setScrollState(getCarouselState(viewport))
    const track = viewport.querySelector('.carousel-track')
    const cards = track?.firstElementChild ? [...track.firstElementChild.children] : []
    const trackStart = track?.getBoundingClientRect().left ?? 0
    const snapOffsets = cards.map(card => card.getBoundingClientRect().left - trackStart + viewport.scrollLeft)
    const pagination = getPaginationState({ snapOffsets, maxScrollLeft: Math.max(0, viewport.scrollWidth - viewport.clientWidth) })
    setScrollState(current => ({ ...current, isScrollable: pagination.isScrollable }))
    setSnapPositions(pagination.positions)
    setActiveSnap(getClosestSnapIndex(viewport.scrollLeft, pagination.positions))
  }
  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return undefined
    measureRail()
    viewport.addEventListener('scroll', measureRail, { passive: true })
    window.addEventListener('resize', measureRail)
    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(measureRail) : null
    resizeObserver?.observe(viewport)
    resizeObserver?.observe(viewport.querySelector('.carousel-track') ?? viewport)
    return () => {
      viewport.removeEventListener('scroll', measureRail)
      window.removeEventListener('resize', measureRail)
      resizeObserver?.disconnect()
    }
  }, [children])
  const scrollToSnap = index => {
    const viewport = viewportRef.current
    const target = snapPositions[index]
    if (!viewport || target === undefined) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    viewport.scrollTo({ left: target, behavior: reducedMotion ? 'auto' : 'smooth' })
  }
  const handleKeyDown = event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); scrollToSnap(Math.max(0, activeSnap - 1)) }
    if (event.key === 'ArrowRight') { event.preventDefault(); scrollToSnap(Math.min(snapPositions.length - 1, activeSnap + 1)) }
  }
  return <div className={`carousel-shell ${className}`}>
    <div className="carousel-viewport" ref={viewportRef} tabIndex="0" role="region" aria-label={label} onKeyDown={handleKeyDown}>
      <div className="carousel-track">{children}</div>
    </div>
    {scrollState.isScrollable && snapPositions.length > 0 && <div className="carousel-pagination" role="group" aria-label={`${label} pagination`}>{snapPositions.map((_, index) => <button type="button" className={`carousel-dot ${activeSnap === index ? 'is-active' : ''}`} aria-label={`Go to ${label.toLowerCase()} position ${index + 1} of ${snapPositions.length}`} aria-current={activeSnap === index ? 'true' : undefined} key={index} onClick={() => scrollToSnap(index)} />)}</div>}
  </div>
}

function Navbar({ business, setId }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef(null)
  const wasOpen = useRef(false)
  const demoMode = import.meta.env.DEV || import.meta.env.VITE_DEMO_MODE === 'true'
  const navItems = useMemo(() => getVisibleNavItems(business), [business])
  const [activeSection, setActiveSection] = useActiveSection(navItems)
  useEffect(() => { const update = () => setScrolled(window.scrollY > 12); update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update) }, [])
  useEffect(() => { if (wasOpen.current && !open) menuButtonRef.current?.focus(); wasOpen.current = open }, [open])
  useEffect(() => { const onKeyDown = event => { if (event.key === 'Escape' && open) setOpen(false) }; window.addEventListener('keydown', onKeyDown); return () => window.removeEventListener('keydown', onKeyDown) }, [open])
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}><div className="container nav-wrap"><Brand business={business} compact /><nav id="primary-navigation" className={`desktop-nav ${open ? 'mobile-open' : ''}`} aria-label="Primary navigation">{navItems.map(item => { const sectionId = item.href.slice(1); return <a className={activeSection === sectionId ? 'active' : ''} aria-current={activeSection === sectionId ? 'location' : undefined} key={item.href} href={item.href} onClick={() => { setActiveSection(sectionId); setOpen(false) }}>{item.label}</a> })}{demoMode && <div className="mobile-menu-tools"><label htmlFor="mobile-business-switcher">Demo business</label><select id="mobile-business-switcher" className="business-switcher" aria-label="Choose demo business" value={business.id} onChange={e => setId(e.target.value)}><option value="aircondpro">AircondPro demo</option><option value="generic">Shine &amp; Go demo</option></select></div>}</nav><div className="nav-actions">{demoMode ? <select className="business-switcher desktop-business-switcher" aria-label="Choose demo business" value={business.id} onChange={e => setId(e.target.value)}><option value="aircondpro">AircondPro demo</option><option value="generic">Shine &amp; Go demo</option></select> : null}<WhatsAppButton business={business} className="header-cta" message={getBusinessWhatsAppMessage(business, 'hero')}>Get a Free Quote</WhatsAppButton><button ref={menuButtonRef} className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-controls="primary-navigation" aria-expanded={open} onClick={() => setOpen(value => !value)}>{open ? <X /> : <Menu />}</button></div></div></header>
}

function Hero({ business }) { return <section className="hero" id="top"><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow hero-entrance hero-entrance-1">{business.industry}</p><h1 className="hero-entrance hero-entrance-2">{business.hero.headline}</h1><p className="hero-description hero-entrance hero-entrance-3">{business.hero.description}</p><div className="hero-actions hero-entrance hero-entrance-4"><WhatsAppButton business={business} message={getBusinessWhatsAppMessage(business, 'hero')}>Get a Free Quote</WhatsAppButton><a className="button button-secondary" href="#services">Explore services <ArrowRight size={17} /></a></div><div className="hero-note hero-entrance hero-entrance-5"><span className="avatar-stack"><i>*</i><i>+</i><i>*</i></span><span>{business.content.heroNote}</span></div></div><div className="hero-media hero-entrance hero-entrance-3"><img src={business.hero.image} alt={business.hero.alt} /><div className="media-caption"><span className="caption-dot"></span><span>{business.content.heroCaption}</span></div></div></div></section> }

function Services({ business }) { if (!business.sections.services || !business.services?.length) return null; return <section className="section services-section" id="services"><div className="container"><div className="section-topline"><SectionHeading eyebrow={business.content.servicesEyebrow} title={business.content.servicesTitle} description={business.description} /><a className="text-link reveal" href="#contact">{business.content.servicesLinkLabel} <ArrowRight size={16} /></a></div><ScrollRail className="services-carousel" label={`${business.businessName} services`}><div className="service-grid">{business.services.map((service, index) => <article className="service-card reveal" key={service.name}><div className="card-number">0{index + 1}</div>{service.image ? <img className="service-image" src={service.image} alt="" /> : <div className="icon-box"><Icon name={service.icon} /></div>}<h3>{service.name}</h3><p>{service.description}</p><div className="service-footer"><span>{service.price}</span><a className="service-cta" href={buildWhatsAppUrl(business.contact.whatsapp, getBusinessWhatsAppMessage(business, 'service', { service: service.name }))} aria-label={`Enquire about ${service.name}`}>Enquire <ArrowRight size={16} /></a></div></article>)}</div></ScrollRail></div></section> }

function Pricing({ business }) { if (!business.sections.pricing || !business.pricing?.length) return null; return <section className="section pricing-section" id="pricing"><div className="container"><SectionHeading eyebrow={business.content.pricingEyebrow} title={business.content.pricingTitle} description={business.content.pricingDescription} align="center" /><p className="pricing-note reveal">{business.content.pricingNote}</p><ScrollRail className="pricing-carousel" label={`${business.businessName} pricing`}><div className="pricing-grid">{business.pricing.map((plan) => <article className={`pricing-card reveal ${plan.highlighted ? 'featured' : ''}`} key={plan.name}>{plan.highlighted && <div className="featured-label"><Star size={13} fill="currentColor" /> Most popular</div>}<div className="pricing-card-top"><h3>{plan.name}</h3><p>{plan.description}</p></div><div className="price"><strong>{plan.price}</strong><span>{plan.unit}</span></div><ul>{plan.features.map(feature => <li key={feature}><Check size={16} />{feature}</li>)}</ul><WhatsAppButton business={business} message={getBusinessWhatsAppMessage(business, 'pricing', { package: plan.name })}>Ask about {plan.name}</WhatsAppButton></article>)}</div></ScrollRail></div></section> }

function Benefits({ business }) { if (!business.sections.benefits || !business.benefits?.length) return null; return <section className="section benefits-section"><div className="container benefits-grid"><div><SectionHeading eyebrow={business.content.benefitsEyebrow} title={business.content.benefitsTitle} description={business.content.benefitsDescription} /><a className="button button-dark reveal" href="#contact">{business.content.benefitsCtaLabel} <ArrowRight size={17} /></a></div><div className="benefit-list">{business.benefits.map((benefit, index) => <div className="benefit-row reveal" key={benefit.title}><span className="benefit-index">0{index + 1}</span><div className="benefit-icon"><Icon name={benefit.icon} size={19} /></div><div><h3>{benefit.title}</h3><p>{benefit.description}</p></div></div>)}</div></div></section> }
function Process({ business }) { if (!business.sections.process || !business.process?.length) return null; return <section className="section process-section" id="process"><div className="container"><SectionHeading eyebrow={business.content.processEyebrow} title={business.content.processTitle} description={business.content.processDescription} /><div className="process-list">{business.process.map(item => <div className="process-item reveal" key={item.step}><span>{item.step}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></div>)}</div></div></section> }
function Areas({ business }) { if (!business.sections.areas || !business.areas?.length) return null; return <section className="area-band"><div className="container area-inner"><div className="reveal"><p className="eyebrow">{business.content.areasEyebrow}</p><h2>{business.content.areasTitle}</h2></div><div className="areas-list reveal">{business.areas.map(area => <span key={area}>{area}</span>)}</div></div></section> }
function FAQ({ business }) { const [active, setActive] = useState(0); if (!business.sections.faq || !business.faq?.length) return null; return <section className="section faq-section" id="faq"><div className="container faq-grid"><SectionHeading eyebrow={business.content.faqEyebrow} title={business.content.faqTitle} description={business.content.faqDescription} /><div className="faq-list reveal">{business.faq.map((item, index) => { const answerId = getFaqAnswerId(business.id, index); const isOpen = active === index; return <div className={`faq-item ${isOpen ? 'open' : ''}`} key={item.question}><button id={`${answerId}-toggle`} aria-expanded={isOpen} aria-controls={answerId} onClick={() => setActive(isOpen ? -1 : index)}><span>{item.question}</span><ChevronDown size={18} /></button><div className="faq-answer" id={answerId} role="region" aria-labelledby={`${answerId}-toggle`}><p>{item.answer}</p></div></div> })}</div></div></section> }
function Contact({ business }) { if (!business.sections.contact) return null; return <section className="contact-section" id="contact"><div className="container contact-grid"><div className="reveal"><p className="eyebrow">{business.content.contactEyebrow}</p><h2>{business.content.contactTitle}</h2><p>{business.content.contactDescription}</p><WhatsAppButton business={business} message={getBusinessWhatsAppMessage(business, 'contact')}>Get a Free Quote</WhatsAppButton></div><div className="contact-details reveal"><div><MessageCircle size={18} /><span><small>WhatsApp</small><a href={buildWhatsAppUrl(business.contact.whatsapp, getBusinessWhatsAppMessage(business, 'contact'))} target="_blank" rel="noreferrer">{business.contact.whatsapp}</a></span></div><div><Phone size={18} /><span><small>Phone</small><a href={`tel:${business.contact.phone}`}>{business.contact.phone}</a></span></div>{business.contact.email && <div><Receipt size={18} /><span><small>Email</small><a href={`mailto:${business.contact.email}`}>{business.contact.email}</a></span></div>}<div><Clock3 size={18} /><span><small>Hours</small><strong>{business.contact.hours}</strong></span></div></div></div></section> }
function Footer({ business, demoMode }) { const quickLinks = getVisibleNavItems(business).filter(item => ['services', 'pricing', 'faq', 'contact'].includes(item.section)); const contact = business.contact; return <footer><div className="container footer-grid"><div className="footer-identity"><Brand business={business} /><p>{business.description || business.tagline}</p><div className="socials">{business.social.instagram && <a href={business.social.instagram} aria-label="Instagram"><Instagram size={18} /></a>}{business.social.facebook && <a href={business.social.facebook} aria-label="Facebook"><Facebook size={18} /></a>}</div></div><div className="footer-column"><p className="footer-label">Quick links</p><nav aria-label="Footer navigation">{quickLinks.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav></div><div className="footer-column footer-contact"><p className="footer-label">Contact</p>{contact.whatsapp && <a href={buildWhatsAppUrl(contact.whatsapp, getBusinessWhatsAppMessage(business, 'contact'))}><MessageCircle size={16} /><span>{contact.whatsapp}</span></a>}{contact.phone && <a href={`tel:${contact.phone}`}><Phone size={16} /><span>{contact.phone}</span></a>}{contact.email && <a href={`mailto:${contact.email}`}><Receipt size={16} /><span>{contact.email}</span></a>}{contact.serviceArea && <span className="footer-detail"><Home size={16} /><span>{contact.serviceArea}</span></span>}</div></div><div className="container footer-bottom"><span>Copyright {new Date().getFullYear()} {business.businessName}.</span><div className="footer-legal">{business.legalLinks?.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}{demoMode && <span>Demo content</span>}</div></div></footer> }

export default function App() { const { business, setId, demoMode } = useBusiness(); useReveal(business.id); return <><Navbar business={business} setId={setId} /><main><Hero business={business} /><Services business={business} /><Pricing business={business} /><Benefits business={business} /><Process business={business} /><Areas business={business} /><FAQ business={business} /><Contact business={business} /></main><Footer business={business} demoMode={demoMode} /><FloatingWhatsAppButton business={business} /></> }
