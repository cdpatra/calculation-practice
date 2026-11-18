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

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints. On a phone on the same Wi-Fi, use the Network address.

## Deploy

The site is a static Vite build.

**Vercel:** import the project. Framework preset Vite. Output directory `dist`. `vercel.json` already sends every route to `index.html`.

**Netlify:** build command `npm run build`, publish directory `dist`. `netlify.toml` is included.

```bash
npm run build
```
