# Billora

A free invoice generator that runs in the browser. You fill in a guided form, the invoice updates beside it as you type, and the server turns it into a real PDF. There is no account and no database.

## What it is

Billora is for freelancers and small studios who need a clean invoice without signing up for an accounting product. The editor has two panes: a narrow form on the left and the invoice on the right at true A4 proportions.

The form is a five-step wizard:

1. **From & To**: your details and your client's.
2. **Invoice Details**: the invoice itself, in any of 170+ currencies.
3. **Line Items**: drag and drop to reorder.
4. **Payment Info**: bank details printed on the invoice.
5. **Summary**: tax, discount and shipping (percentage or fixed), payment terms (Due on receipt, Net 15/30/60), total in words and a signature you can draw, type or upload.

Each step shows a completion check. The current step is kept in the URL, so a reload brings you back to it, and clicking part of the preview jumps to the field behind it.

When you're happy with it, click **Generate PDF**. You can download it, print it, open it in a new tab or email it to your client. You can also export the invoice as JSON, CSV or XML and import JSON back.

Your draft autosaves as you go ("Saved · just now"), and you can keep saved invoices and an address book of senders and clients to reuse later.

**See a finished invoice:** open the **⋯** menu next to *Generate PDF*, choose **Load Invoice → Import JSON** and pick `demo/sample-invoice.json`. It loads a three-line design-studio invoice (USD 11,800 subtotal, 8.5% tax, Net 30) on the Sidebar template.

The editor has a light and dark theme. The invoice preview keeps its own colors in both, because that is what gets printed. On phones, the preview sits behind a **Preview** button and the main actions move to a bottom bar.

## Templates

Thirteen layouts, all previewed in a gallery with your own invoice data. The same React layouts are used for the preview and the PDF, so what you see is what you get.

| # | Template | # | Template |
| --- | --- | --- | --- |
| 1 | Classic | 8 | Two-Tone |
| 2 | Modern | 9 | Bordered |
| 3 | Sidebar | 10 | Left Rail |
| 4 | Bold Header | 11 | Statement |
| 5 | Minimal | 12 | Corner |
| 6 | Letterhead | 13 | Column |
| 7 | Compact | | |

Every template takes the same options:

| Option | Choices |
| --- | --- |
| Accent color | Presets or any hex value |
| Typeface | Four fonts |
| Density | Three settings |

How a template becomes a PDF: the server renders the chosen layout to HTML, inlines a prebuilt stylesheet and prints it with headless Chromium, with the fonts embedded. Identical invoices come from an in-memory cache, so downloading the same invoice again is instant.

## Privacy

- **Your data stays on your device.** The draft, saved invoices and the address book of senders and clients are kept in IndexedDB in your browser.
- **Encrypted at rest.** Everything is encrypted with AES-GCM. The key is generated as non-extractable, so it can't be copied out of the site. This protects against someone reading your browser profile from disk; it does not protect against a script injected into the page.
- **The server keeps nothing.** Invoice data is sent only to render a PDF, export a file or send an email, and nothing is stored after the request.
- **Inputs are checked.** Every request is size-capped (4 MB) and validated against the same zod schema the form uses.

## Languages

The interface and the PDF are available in four languages, each on its own route:

| Language | Route |
| --- | --- |
| English | `/en` (default) |
| French | `/fr` |
| Italian | `/it` |
| Spanish | `/es` |

You can pick from 170+ currencies in any language. The PDF fonts cover accented characters, and the test suite checks that French, Italian and Spanish invoices render with the right fonts.

Translations are managed with next-intl. The message files live in `i18n/locales/`, one per language.

## Develop

You need Node.js 20 or newer and npm. No Docker or database.

```bash
git clone <your-fork-url> billora
cd billora
npm install
npm run dev
```

The first `npm install` downloads Chromium for Puppeteer and takes a few minutes. Open http://localhost:3000 and you are redirected to `/en`.

Optional settings go in `.env.local`:

| Name | Use |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata and sitemap |
| `NODEMAILER_EMAIL` | Gmail address that sends invoices |
| `NODEMAILER_PW` | Gmail App Password (not your account password) |
| `GOOGLE_SC_VERIFICATION` | Google Search Console token |

Without the email settings, everything works except **Send to mail**.

Useful commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server (rebuilds the PDF stylesheet first) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npx tsc --noEmit` | Typecheck |
| `npm run test:e2e` | Playwright tests against a production build |
| `npm run test:e2e:ui` | The same tests in Playwright's UI mode |
| `npm run build:pdf-css` | Rebuild only the stylesheet inlined into PDFs |
| `npm run analyze` | Production build with the bundle analyzer |

Before the first test run, install the browser:

```bash
npx playwright install --with-deps chromium
```

The tests run in a desktop and a mobile viewport and check the real PDF output: every template fits one A4 page, logos reach the PDF and concurrent generations work.

Where to find things:

```
app/[locale]/             editor page, guide page, locale layout
app/api/invoice/          generate, send, export, warm
app/components/invoice/   wizard form, steps, preview, action bar
app/components/templates/ the 13 invoice layouts and the email template
contexts/                 invoice, wizard, charges, signature, theme, translation
services/invoice/         PDF generation and cache, export, email
lib/                      zod schemas, secure storage, wizard steps
i18n/locales/             en, fr, it, es
demo/sample-invoice.json  the sample invoice
```

Built with Next.js 15.3, React 18.2, TypeScript 5, Tailwind CSS 3 with shadcn/ui, React Hook Form and zod, next-intl, Puppeteer 24 and Nodemailer.

## Build & deploy

```bash
npm run build
npm start
```

`npm run build` rebuilds the PDF stylesheet first, just like `dev`. A warm-up endpoint (`GET /api/invoice/warm`) launches Chromium before the first click.

- **Vercel or Netlify** work as is. On serverless the app switches to `puppeteer-core` with `@sparticuz/chromium` automatically. Set `NEXT_PUBLIC_SITE_URL`, and the two `NODEMAILER_*` variables if you want email. PDF generation is CPU-heavy, so give the function enough memory.
- **Docker:** a `Dockerfile` is included, but the image can't generate PDFs yet because pruning dev dependencies removes the full `puppeteer` package.
- The email rate limiter lives in memory, so with several instances each one counts on its own.