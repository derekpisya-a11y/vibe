# Neverlose — independent website concept

A responsive Russian-language presentation website with a black, white and purple palette, animated M9 Doppler artwork, accessible information dialogs, game tabs, and FAQ.

## Development

Use Node.js 22.12+ or 24 and npm. From the existing checkout (cloud tasks are already isolated; a Git worktree is unnecessary):

```sh
cd /workspace/vibe
npm ci
npm run dev -- --port 5173
```

The project config places the npm cache in `/tmp/vibe-npm-cache`, which is writable in the cloud environment. No API keys or other services are required. Fonts and images are served locally.

## Production build

```sh
npm run build
npm run preview -- --port 4173
```

The `dist/` directory contains the static site and can be deployed to a static hosting provider. Deployment is not part of this repository's setup.

For an offline browser copy, run `npm run build:offline`. This creates `neverlose-demo.html` and `neverlose-demo.zip`. Download the ZIP, extract it, and open the HTML file in a regular browser. The file contains the code, fonts, and artwork in one document; it needs no local server.

## Content and assets

This is an independent visual concept, not the official Neverlose site. External product links point to https://neverlose.cc/. It does not process payments, distribute software, or claim current CS:GO product availability. Historical dates, safety guarantees, user counts and pricing are intentionally not invented.

Asset sources and notes are recorded in `ASSETS.md`.

## Verification

`npm run build` checks the production bundle. Browser verification covers dialogs (including keyboard close and focus restoration), game tabs, FAQ, knife animation control, mobile navigation, reduced motion and narrow viewport overflow.
