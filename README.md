# Dave Brown — The Natty King

Static site. No build step, no framework, just HTML/CSS.

## Files
- `index.html` — the page
- `css/styles.css` — all styling
- `js/gallery.js` — the photo carousel and click-to-enlarge lightbox
- `assets/logo.png` — logo (transparent PNG, has its own baked-in smoke)
- `assets/hero-photo.jpg` — competition photo, background for the top of the page
- `assets/gallery/gallery-01.jpg` through `gallery-32.jpg` — the "Who Is Dave Brown" photo carousel

## Before you deploy

1. **Formspree**: create a form at formspree.io using **thenattykingdb@gmail.com**
   as the destination, copy the form ID, and replace
   `REPLACE_WITH_YOUR_FORM_ID` in `index.html` (in the `<form action=...>` line)
   with your real ID. Test a submission once it's live. No email address is
   shown anywhere on the page, the contact form is the only path in.
2. **YouTube**: nav and footer already link to
   `https://www.youtube.com/@TheNattyKingDB`. If the handle ever changes,
   search `TheNattyKingDB` in `index.html` to update both spots.

## Managing the gallery

There's no admin login, it's just files. To add, remove, or reorder photos:

1. Drop new images into `assets/gallery/` (JPGs, roughly 1200-1400px on the
   long edge keeps load times reasonable, no need for full camera-res files).
2. Name them `gallery-01.jpg`, `gallery-02.jpg`, etc., in the order you want
   them to appear.
3. Open `js/gallery.js` and update the `images` array at the top so it lists
   the same filenames in the same order.
4. Push to GitHub, Vercel redeploys automatically.

The carousel auto-advances every 5 seconds, the arrows and dots let visitors
jump around manually, and clicking the photo opens it full-size.

## Deploy with GitHub + Vercel

1. Create a new GitHub repo (e.g. `dave-brown-site`) and push these files to it:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. In Vercel, click "Add New Project," import that GitHub repo, and deploy.
   No build settings needed, it's static HTML.
3. In the Vercel project's Domains tab, add `thedavebrown.website`.
4. Vercel will give you DNS records (usually an A record or CNAME). Add those
   at your domain registrar. Propagation can take a few minutes to a few hours.

## Notes on the credential strip

The stats in the strip (IDPFA World Champion, USAPL National Champion, 2025
Arnold Festival Masters Champion, OC Bodybuilding Pro Champion, M275kg World
Record) are confirmed accurate as of Aug 2026. If any competition results,
years, or federation names change, update them directly in `index.html`
inside the `.strip` section.
