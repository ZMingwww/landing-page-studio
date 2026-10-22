# landing-page-studio

A reusable, static React + Vite landing-page template for Malaysian small businesses. AircondPro and Shine & Go Auto Detailing are demonstration configurations; they are content inside the template, not the project identity.

## Stack

React, Vite, JavaScript/JSX, Tailwind CSS v4, Lucide React and Vitest. There is no backend, database, authentication, CMS or paid service dependency.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints. In local development, the business switcher in the header renders both examples. For a hosted demo build, set `VITE_DEMO_MODE=true`; client production builds keep the selector hidden and can select one configured business with `VITE_BUSINESS_ID`:

- `?business=aircondpro`
- `?business=generic`
- `VITE_BUSINESS_ID=aircondpro` or `VITE_BUSINESS_ID=generic`

## Customise a client

Open `src/config/businessConfig.js` and duplicate the `generic` object with a new key. Change the business name, logo text/mark, tagline, hero copy/image, content labels, services, prices, benefits, process, areas, FAQs, contact details, WhatsApp message templates, social links and SEO metadata. The React components do not need to change.

Use `sections` flags and empty arrays to hide optional content cleanly. For example, set `sections.pricing` to `false` or `pricing` to `[]` to remove pricing. Optional email, map and social links are only rendered when configured.

Change a business theme in `src/config/themeConfig.js`. The CSS variables are applied at runtime from the selected business id.

### Images and logo

Place client images in `public/images/` and reference them from the selected config, for example `/images/client-hero.jpg`. Keep descriptive `alt` text in the hero config. Service cards support either an `image` or a configured Lucide `icon`.

### WhatsApp

Set `contact.whatsapp` to a Malaysian number in any common format. `src/utils/whatsapp.js` normalizes it to a single `60` country code and URL-encodes context-specific prefilled messages. The app uses ordinary click-to-chat links; it does not use the WhatsApp Business API.

### SEO and deployment

Set `seo.title`, `seo.description`, and an optional real `seo.canonicalUrl` in the business config. The app updates the page title, description and canonical link when the selected business changes. `public/robots.txt`, `public/sitemap.xml` and `public/favicon.svg` are included as static starter assets; replace the example domain before a real deployment. Add LocalBusiness structured data only when accurate real business details are available.

For Cloudflare Pages:

1. Build command: `npm run build`
2. Output directory: `dist`
3. Connect the repository from the client's own Git provider account.
4. Add the client's domain in the client's own Cloudflare account.

Transfer the repository and hosting ownership to the client accounts before handoff. This project does not deploy or create external accounts automatically.

## Validation

```bash
npm test
npm run lint
npm run build
```
