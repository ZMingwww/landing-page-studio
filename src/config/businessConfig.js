const shared = {
  logo: { image: '', icon: 'sparkles', mark: 'L', text: '', tagline: '' },
  nav: [
    { label: 'Services', href: '#services', section: 'services', visible: true },
    { label: 'Pricing', href: '#pricing', section: 'pricing', visible: true },
    { label: 'How it works', href: '#process', section: 'process', visible: true },
    { label: 'FAQ', href: '#faq', section: 'faq', visible: true },
    { label: 'Contact', href: '#contact', section: 'contact', visible: true },
  ],
  sections: { services: true, pricing: true, benefits: true, process: true, areas: true, faq: true, contact: true },
  cta: {
    primaryLabel: 'Get a Free Quote',
    primaryMessage: 'Hi, I would like a free quote for your services.',
    messages: {
      general: 'Hi {business}, I would like to enquire about your services.',
      hero: 'Hi {business}, I would like a free quote for your services.',
      floating: 'Hi {business}, I would like a free quote for your services.',
      service: 'Hi {business}, I would like to enquire about {service}.',
      pricing: 'Hi {business}, I would like a quote for the {package} package.',
      contact: 'Hi {business}, I would like a free quote for your services.',
    },
  },
  contact: { phone: '+60123456789', whatsapp: '012-345 6789', email: 'hello@example.com', hours: 'Mon-Sat, 9:00am-6:00pm', mapsUrl: '', serviceArea: '' },
  social: { instagram: '', facebook: '' },
  legalLinks: [],
  seo: { title: 'Localist - Thoughtful service, right at your doorstep', description: 'A polished local service landing page template for Malaysian small businesses.', canonicalUrl: '' },
}

const aircondContent = {
  heroNote: 'Clear pricing. Careful service. A cooler first step.', heroCaption: 'Care, from the first clean',
  servicesEyebrow: 'Aircond services', servicesTitle: 'Clean, comfortable air starts here.', servicesLinkLabel: 'Ask about your unit',
  pricingEyebrow: 'Sample starting points', pricingTitle: 'Choose the right clean for your space.', pricingDescription: 'Clear package options make it easier to choose a starting point and request a tailored quote.', pricingNote: 'Demo pricing shown for illustration. Confirm the final quote for your unit and location.',
  benefitsEyebrow: 'The AircondPro standard', benefitsTitle: 'A cooler home, without the guesswork.', benefitsDescription: 'Practical care, clear communication and a tidy finish from the first message to the final check.', benefitsCtaLabel: 'Talk to AircondPro',
  processEyebrow: 'How it works', processTitle: 'A simple path from hello to sorted.', processDescription: 'No complicated forms or awkward handoffs. Just a few clear steps to get your aircond back on track.',
  areasEyebrow: 'Where we work', areasTitle: 'Close to the homes and businesses we serve.',
  faqEyebrow: 'Questions, answered', faqTitle: 'A little more clarity before you book.', faqDescription: 'Keep the useful details in one easy place before your service visit.',
  contactEyebrow: 'Ready for a fresher room?', contactTitle: 'Get a free quote for aircond cleaning in KL or Selangor.', contactDescription: 'Tell us your location, number of units and what you need. We will help you find the right place to start.',
}

const aircondMessages = {
  ...shared.cta.messages,
  general: 'Hi AircondPro, I would like to enquire about your aircond services.',
  hero: 'Hi AircondPro, I would like a free quote for aircond cleaning in KL and Selangor.',
  floating: 'Hi AircondPro, I would like a free quote for aircond cleaning in KL and Selangor.',
  service: 'Hi AircondPro, I would like to enquire about {service}.',
  pricing: 'Hi AircondPro, I would like a quote for the {package} package.',
  contact: 'Hi AircondPro, I would like a free quote for aircond cleaning in KL and Selangor.',
}

const detailingContent = {
  heroNote: 'Clear packages. Careful finish. A better drive.', heroCaption: 'A fresh finish, wherever you park',
  servicesEyebrow: 'Detailing services', servicesTitle: 'A cleaner car starts with the right detail.', servicesLinkLabel: 'Ask about your car',
  pricingEyebrow: 'Illustrative packages', pricingTitle: 'Choose the detail your car needs.', pricingDescription: 'Example packages make it easier to compare a quick refresh with a more complete interior and exterior reset.', pricingNote: 'Illustrative demo pricing only. Replace with confirmed package rates before launch.',
  benefitsEyebrow: 'The Shine & Go standard', benefitsTitle: 'The little details make the difference.', benefitsDescription: 'A polished service experience, from the first WhatsApp message to the moment you get back behind the wheel.', benefitsCtaLabel: 'Talk to Shine & Go',
  processEyebrow: 'How it works', processTitle: 'A simple path to a cleaner drive.', processDescription: 'Share a few details, choose your package and let us take care of the finish.',
  areasEyebrow: 'Where we work', areasTitle: 'Detailing that fits around your day.',
  faqEyebrow: 'Questions, answered', faqTitle: 'Everything you need before booking.', faqDescription: 'Keep the useful details in one easy place before your detailing appointment.',
  contactEyebrow: 'Ready for a cleaner drive?', contactTitle: 'Get a free quote for your car detail.', contactDescription: 'Tell us your car type, location and the finish you have in mind. We will help you choose the right package.',
}

const detailingMessages = {
  ...shared.cta.messages,
  general: 'Hi Shine & Go Auto Detailing, I would like to enquire about your detailing services.',
  hero: 'Hi Shine & Go Auto Detailing, I would like a free quote for car detailing in KL and Selangor.',
  floating: 'Hi Shine & Go Auto Detailing, I would like a free quote for car detailing in KL and Selangor.',
  service: 'Hi Shine & Go Auto Detailing, I would like to enquire about {service}.',
  pricing: 'Hi Shine & Go Auto Detailing, I would like a quote for the {package} package.',
  contact: 'Hi Shine & Go Auto Detailing, I would like a free quote for car detailing in KL and Selangor.',
}

export const businessConfigs = {
  aircondpro: {
    ...shared, id: 'aircondpro', businessName: 'AircondPro', tagline: 'Cooler rooms. Clearer days.', industry: 'Air-conditioning care',
    logo: { ...shared.logo, icon: 'droplets', text: 'AircondPro', tagline: 'Aircond care' },
    contact: { ...shared.contact, serviceArea: 'Kuala Lumpur and Selangor' },
    description: 'Reliable aircond cleaning and maintenance for homes and small businesses across Kuala Lumpur and Selangor.',
    hero: { headline: 'Aircond cleaning in KL and Selangor, done properly.', description: 'Keep your space cool, comfortable and running smoothly with careful, no-fuss aircond care from a team that respects your home.', image: '/images/aircondpro-hero.png', alt: 'Aircond technician inspecting a wall-mounted split air-conditioner in a bright home.' },
    content: aircondContent,
    cta: { ...shared.cta, primaryLabel: 'Get a Free Quote', primaryMessage: aircondMessages.hero, messages: aircondMessages },
    services: [
      { icon: 'sparkles', name: 'Normal Aircond Cleaning', description: 'A thorough clean for everyday dust, odour and reduced airflow.', price: 'From RM60 / unit' },
      { icon: 'droplets', name: 'Chemical Wash', description: 'A deeper clean for built-up grime, stubborn smells and neglected units.', price: 'From RM120 / unit' },
      { icon: 'wrench', name: 'Aircond Maintenance', description: 'Practical checks to help your unit stay efficient between cleans.', price: 'From RM80 / unit' },
    ],
    pricing: [
      { name: 'Fresh Start', price: 'RM60', unit: '/ unit', description: 'For regular upkeep and a more comfortable room.', features: ['Indoor unit cleaning', 'Basic airflow check', 'Before and after care notes'] },
      { name: 'Deep Refresh', price: 'RM120', unit: '/ unit', description: 'A deeper clean for units that need extra attention.', features: ['Chemical wash process', 'Indoor and outdoor inspection', 'Care recommendations'], highlighted: true },
      { name: 'Home Reset', price: 'RM220', unit: '/ 2 units', description: 'A simple reset for the rooms you use most.', features: ['Two-unit service', 'Priority appointment request', 'Follow-up care guidance'] },
    ],
    benefits: [
      { title: 'Clear, upfront pricing', description: 'Simple example packages help you understand the starting point before you enquire.', icon: 'receipt' },
      { title: 'Careful in your space', description: 'Respectful service, tidy work areas and practical recommendations without the hard sell.', icon: 'home' },
      { title: 'Easy to arrange', description: 'Tell us what you need on WhatsApp and we will help you find a suitable slot.', icon: 'message-circle' },
    ],
    process: [
      { step: '01', title: 'Contact us', description: 'Send a quick message with your location and what your unit needs.' },
      { step: '02', title: 'Choose a service', description: 'We will help you understand the right starting option for your space.' },
      { step: '03', title: 'Arrange a visit', description: 'Pick a convenient day and time for the service.' },
      { step: '04', title: 'Enjoy the difference', description: 'We clean up, share the care notes and leave your space comfortable.' },
    ],
    areas: ['Kuala Lumpur', 'Petaling Jaya', 'Subang Jaya', 'Shah Alam', 'Puchong', 'Ampang'],
    faq: [
      { question: 'How long does a service usually take?', answer: 'A standard single-unit clean usually takes around 45-60 minutes. A chemical wash or multi-unit visit can take longer depending on condition and access.' },
      { question: 'Do I need to prepare anything before you arrive?', answer: 'Please keep the area around the indoor unit reasonably clear. We will bring the equipment and protect the immediate work area during the service.' },
      { question: 'Are the prices on this page final?', answer: 'These are clearly labelled sample starting prices for this demo template. A real business can replace them with its own pricing or hide the pricing section entirely.' },
      { question: 'How do I enquire?', answer: 'Tap any WhatsApp button and send your preferred service, location and number of units. The business can then confirm availability and the right quotation.' },
    ],
    seo: { title: 'AircondPro - Aircond cleaning in KL and Selangor', description: 'Aircond cleaning and maintenance for homes and small businesses across Kuala Lumpur and Selangor.', canonicalUrl: '' },
  },
  generic: {
    ...shared, id: 'generic', businessName: 'Shine & Go Auto Detailing', tagline: 'A cleaner drive, every time.', industry: 'Mobile car detailing',
    logo: { ...shared.logo, icon: 'layers', text: 'Shine & Go', tagline: 'Auto detailing' },
    contact: { ...shared.contact, serviceArea: 'Kuala Lumpur and Selangor' },
    description: 'Thoughtful interior and exterior car detailing for busy drivers across Kuala Lumpur and Selangor.',
    hero: { headline: 'Car detailing in KL and Selangor, brought to your driveway.', description: 'Give your car the reset it deserves with careful detailing, clear package options and a team that makes booking feel easy.', image: '/images/detailing-hero.svg', alt: 'Illustrated car detailing scene with a polished car, cloth and detailing tools.' },
    content: detailingContent,
    cta: { ...shared.cta, primaryLabel: 'Get a Free Quote', primaryMessage: detailingMessages.hero, messages: detailingMessages },
    services: [
      { image: '/images/detailing-service.svg', name: 'Exterior Refresh', description: 'A careful wash, wheel clean and finish for a brighter everyday drive.', price: 'Sample from RM80' },
      { icon: 'sparkles', name: 'Interior Deep Clean', description: 'A focused reset for seats, mats, dashboard and the details you notice most.', price: 'Sample from RM150' },
      { icon: 'layers', name: 'Full Detail', description: 'A more complete interior and exterior service when your car needs a proper reset.', price: 'Enquire for a sample quote' },
    ],
    pricing: [
      { name: 'Quick Refresh', price: 'RM80', unit: 'sample / car', description: 'A lighter exterior reset for regular upkeep.', features: ['Exterior wash', 'Wheel and tyre clean', 'Quick finish check'] },
      { name: 'Signature Detail', price: 'RM180', unit: 'sample / car', description: 'A balanced interior and exterior refresh.', features: ['Exterior refresh', 'Interior vacuum and wipe-down', 'Glass and trim finish'], highlighted: true },
      { name: 'Full Reset', price: 'RM280', unit: 'sample / car', description: 'A deeper clean for cars ready for a full refresh.', features: ['Full interior clean', 'Exterior detail and protection', 'Care recommendations'] },
    ],
    benefits: [
      { title: 'Clear package choices', description: 'Compare a quick refresh with a more complete detail before you send a message.', icon: 'receipt' },
      { title: 'Careful with every finish', description: 'Thoughtful work across the surfaces you touch, see and rely on every day.', icon: 'sparkles' },
      { title: 'Easy to arrange', description: 'Tell us your car type and location on WhatsApp and we will help with the next step.', icon: 'message-circle' },
    ],
    process: [
      { step: '01', title: 'Tell us about your car', description: 'Share your car type, location and the finish you have in mind.' },
      { step: '02', title: 'Choose a package', description: 'We will help you find the right starting option for your car.' },
      { step: '03', title: 'Pick a time and place', description: 'Arrange a mobile visit at a convenient time and suitable location.' },
      { step: '04', title: 'Enjoy the clean', description: 'We take care of the detail and leave you with a fresher drive.' },
    ],
    areas: ['Kuala Lumpur', 'Petaling Jaya', 'Subang Jaya', 'Shah Alam'],
    faq: [
      { question: 'What should I share when I enquire?', answer: 'Send your car make or size, location and the package or type of finish you are considering. We can then confirm the best option.' },
      { question: 'Can mobile detailing be done at my home?', answer: 'Yes, where there is a suitable shaded or accessible space. Share your location and we can help confirm the setup.' },
      { question: 'Are the prices on this page final?', answer: 'These are illustrative sample prices for this demo template, not a live offer. A real business can replace them with confirmed package rates.' },
      { question: 'How do I book?', answer: 'Tap any WhatsApp button and tell us your car type, location and preferred package. We will reply with availability and the next step.' },
    ],
    seo: { title: 'Shine & Go Auto Detailing - Car detailing in KL and Selangor', description: 'Illustrative car detailing services for drivers across Kuala Lumpur and Selangor.', canonicalUrl: '' },
  },
}

export function getBusinessConfig(id = 'aircondpro') { return businessConfigs[id] ?? businessConfigs.aircondpro }

export function getVisibleNavItems(business) {
  return business.nav.filter(item => {
    if (!item.visible || business.sections[item.section] === false) return false
    const content = business[item.section === 'process' ? 'process' : item.section]
    return item.section === 'contact' || (Array.isArray(content) && content.length > 0)
  })
}
