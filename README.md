# SSC Calculation Practice

A plain, phone-friendly site for SSC calculation speed. Questions never run out.

## Practice

- **Addition** — two numbers, or a chain such as 12 + 23 + 32 + 42 + 13. Choose 1–4 digits and 2–8 numbers.
- **Subtraction** — two numbers, answer always positive.
- **Multiplication** — pick a number from 2 to 20 or 25. Every question uses it: 23 × 12, 322 × 12, 12312 × 12. Choose 2, 3, 4 or 5 digits, or a mix.
- **Division** — same idea. Pick 12 and every question divides exactly by 12.
- **Tables** — read tables 1–20, then practice them.
- **Squares** — 1–50, read or recall.
- **Cubes** — 1–30, read or recall.

Scores stay in the browser on that phone. There is an on-screen keypad, so you do not need the phone keyboard.

## English Notes

Add markdown files to the `english-notes/` folder (e.g. `tenses.md`). Each file appears on the home page under **English Notes**; the label matches the file name without `.md`. Rebuild or restart dev so Vite picks up new files.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints. On a phone on the same Wi-Fi, use the Network address.

## Install on your phone (PWA)

After you deploy over **HTTPS** (Vercel, Netlify, etc.), open the site in Chrome (Android) or Safari (iPhone):

- **Android:** menu → **Install app** or **Add to Home screen**
- **iPhone:** Share → **Add to Home Screen**

The app opens full screen and caches the UI for faster loads. Install prompts need a production build (`npm run build`), not `npm run dev`.

## Deploy

The site is a static Vite build.

**Vercel:** import the project. Framework preset Vite. Output directory `dist`. `vercel.json` already sends every route to `index.html`.

**Netlify:** build command `npm run build`, publish directory `dist`. `netlify.toml` is included.

```bash
npm run build
```
