# Billora

### Installation

You need Node.js 20 or newer and npm. No Docker or database.

```bash
git clone <your-fork-url> billora
cd billora
npm install
npm run dev
```

`npm install` downloads Chromium for Puppeteer, so the first install takes a few minutes. Then open http://localhost:3000.

#### Scripts

- `npm run dev` - development server (rebuilds the PDF stylesheet first)
- `npm run build` - production build
- `npm start` - production server
- `npm run build:pdf-css` - rebuild only the PDF stylesheet
- `npm run lint` - ESLint
- `npm run format` / `npm run format:check` - Prettier
- `npm run test:e2e` - Playwright tests against a production build
- `npm run test:e2e:ui` - same tests in UI mode
- `npm run analyze` - build with the bundle analyzer
- `npx tsc --noEmit` - typecheck

##### Environment variables

Put these in `.env.local`. All of them are optional.

- `NEXT_PUBLIC_SITE_URL` - canonical origin for metadata, sitemap and robots
- `NODEMAILER_EMAIL` - Gmail address that sends invoices
- `NODEMAILER_PW` - a Gmail App Password, not the account password
- `GOOGLE_SC_VERIFICATION` - Google Search Console token

Without the email variables, **Send to mail** returns an error. Everything else works.

## About

Billora is a free invoice generator for freelancers and small studios. You fill in a guided form, watch a live A4 preview update as you type, and download a real PDF rendered on the server with headless Chromium. There is no account and no database.

## How to use it

1. Fill in **From & To**.
2. Fill in **Invoice Details**.
3. Add **Line Items** (drag to reorder).
4. Add **Payment Info**.
5. Finish the **Summary**: tax, discount and shipping as a percentage or a fixed amount, payment terms (Due on receipt, Net 15/30/60) and a signature.
6. Pick one of the thirteen templates, an accent color, a typeface and a density.
7. Click **Generate PDF**. Download it, print it, preview it in a new tab or email it.

The current step is kept in the URL, so a reload brings you back to the same place. You can also export the invoice as JSON, CSV or XML, and import JSON back.

### Your data

Your draft, saved invoices and address book are stored in your browser in IndexedDB, encrypted with AES-GCM. Invoice data only leaves your machine while a PDF is rendered or an email is sent.

# Supported languages

Billora's interface and its PDFs are available in four languages. Each language has its own route prefix, and opening the root URL redirects you to `/en`.

### English

- Route: `/en`
- Interface: translated
- PDF output: translated
- Messages: `i18n/locales/` (en)

### French

- Route: `/fr`
- Interface: translated
- PDF output: translated
- Messages: `i18n/locales/` (fr)
- Accented characters are covered by the embedded PDF fonts

### Italian

- Route: `/it`
- Interface: translated
- PDF output: translated
- Messages: `i18n/locales/` (it)
- Accented characters are covered by the embedded PDF fonts

### Spanish

- Route: `/es`
- Interface: translated
- PDF output: translated
- Messages: `i18n/locales/` (es)
- Accented characters are covered by the embedded PDF fonts

### Currencies

More than 170 currencies can be used on an invoice, in every language.

### Notes on translation

Translations are handled by next-intl with locale-prefixed routes. The Playwright suite checks that accented locales render with the right fonts in the PDF.

## Testing

```bash
npx playwright install --with-deps chromium
npm run test:e2e
```

Tests run against a production build in a desktop and a mobile viewport.

#### Deployment

Works on Vercel or Netlify as is. A Dockerfile is included but PDF generation does not work in the image yet.

# Acknowledgements

Billora would not exist without these open-source projects. Thank you to everyone who maintains them:

- **Next.js** and **React**, for the app and the route handlers
- **TypeScript**, for one invoice type shared by the form, preview and API
- **Tailwind CSS**, for styling
- **shadcn/ui** and **Radix UI**, for accessible dialogs, menus and popovers
- **lucide-react**, for icons
- **next-themes**, for the light and dark toggle
- **dnd-kit**, for drag-and-drop line items
- **React Hook Form** and **zod**, for forms and validation on both sides
- **next-intl**, for the four languages
- **Puppeteer**, **puppeteer-core** and **@sparticuz/chromium**, for real PDFs locally and on serverless
- **Nodemailer** and **React Email**, for sending invoices
- **@json2csv/node** and **xml2js**, for CSV and XML export
- **Playwright**, for the end-to-end tests
- **ESLint** and **Prettier**, for keeping the code tidy