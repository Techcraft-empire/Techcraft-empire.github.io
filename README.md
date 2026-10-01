# TechCraft Empire

Static company website and fictional Sela Kopi café portfolio demo.

## Deployment

The existing GitHub Pages repository is `Techcraft-empire/Techcraft-empire.github.io`, serving the `main` branch root. No build step, framework, environment variable, database or package install is required. Keep `.nojekyll` at the root.

- Company: `https://techcraft-empire.github.io/`
- Project brief: `https://techcraft-empire.github.io/brief.html`
- Café homepage: `https://techcraft-empire.github.io/sela-kopi/`
- Café menu: `https://techcraft-empire.github.io/sela-kopi/menu.html`
- Café visit / enquiry: `https://techcraft-empire.github.io/sela-kopi/visit.html`
- Existing separate barber demo: `https://techcraft-empire.github.io/ruang-gunting-demo/`

The barber repository is not replaced. Existing company anchors `#atas`, `#servis`, `#contoh`, `#cara-kerja` and `#hubungi` remain supported.

## Structure

- `index.html`, `brief.html` — company pages.
- `assets/company.css`, `assets/company.js` — company visual system and brief generator.
- `assets/mark.svg` — code-native TC mark.
- `assets/*-preview.svg` — self-contained, illustrated previews using project assets; these are not browser screenshots.
- `assets/company-preview.jpg` — Open Graph brand artwork.
- `assets/fonts/` — self-hosted Manrope and DM Serif Display, with their OFL licences.
- `sela-kopi/index.html`, `menu.html`, `visit.html` — café pages.
- `sela-kopi/assets/cafe.css`, `cafe.js` — café styling and interaction logic.
- `sela-kopi/assets/*.webp` — optimised local imagery in 720px and 1440px variants.

Edit the HTML files directly. Navigation and footers are deliberately explicit in each static page. Keep shared café navigation consistent when editing them.

## Functionality and disclosure

The company brief generator prepares a local text summary that visitors can copy or download. It does **not** send enquiries. An approved official contact destination is still needed to add direct company contact. No number from the user's personal profile has been published.

Sela Kopi is a fictional café, consistently labelled as a portfolio concept. No real address, phone number, business registration, customer relationship, reviews or testimonials are used. Its menu and operating hours are illustrative. No `LocalBusiness` structured data claims it is a real place.

Café booking controls prepare a WhatsApp-style enquiry **preview only**. No WhatsApp recipient is assigned, no message is transmitted and no reservation or payment is made. Dates are checked using the Asia/Kuala_Lumpur timezone. Tuesdays and past times cannot be selected for a valid enquiry. No personal information is requested, stored or sent. Both form flows use text values rather than injecting user input as HTML.

No analytics, cookies, remote fonts, third-party image dependencies or backend calls are used. Images have alt text, intrinsic dimensions and local fallbacks/backgrounds; lower-page images are lazy-loaded. Menu content remains readable without JavaScript. Responsive navigation, labels, visible focus states, a skip link, native form validation, dialog focus handling and reduced-motion styles are included.

## Asset origins

Café imagery was created for this fictional project using the built-in image generation tool, then resized and encoded as WebP. Original files remain in the authoring workspace:

- `generated_images/exec-4c78e53a-05e0-45eb-bb1c-836de3386703.png`
- `generated_images/exec-5c609fb4-2e53-40d3-9e02-fd1f8106c0ca.png`

Prompt 1: Editorial photograph of a cream ceramic flat white and kaya butter sourdough toast on an olive plate, honey-coloured wooden café table, tropical Malaysian morning light, natural textures, no people, text or branding.

Prompt 2: Intimate fictional Malaysian shophouse café interior, cream plaster, honey-toned wooden furniture, olive bench, sunlight and tropical greenery, unbranded espresso machine, no people or business signage.

The barber preview uses the image already present in the user's Ruang Gunting project and mirrors that project's existing identity. Font sources: Google Fonts, Manrope and DM Serif Display, redistributed under the included SIL Open Font Licence files.

## Checks before release

Source, paths, linked local assets, HTML semantics and JavaScript syntax can be checked offline. Browser rendering and responsive interactions must still be reviewed in a permitted preview or deployed environment before marking the release fully verified. Do not describe offline DOM checks as visual/browser testing.
