# Billora

A free invoice generator that runs in your browser. No account needed.

## Usage

1. Open the app. You start on an empty invoice with the form on the left and a preview on the right.
2. Fill in **From & To** with your details and your client's.
3. Fill in **Invoice Details**.
4. Add your **Line Items**. You can drag them to change the order.
5. Enter your bank details under **Payment Info**.
6. In **Summary**, add tax, discount or shipping and pick payment terms.
7. Click **Generate PDF**, then download, print or email it.

Your draft is saved in the browser automatically, so you can close the tab and come back later.

Want to see a finished invoice first? Use **Load Invoice → Import JSON** and pick `demo/sample-invoice.json`.

## Development

```bash
npm install
npm run dev
```

Needs Node.js 20+. The first install downloads Chromium for the PDFs, so it takes a few minutes.