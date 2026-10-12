# Vishwear

Luxury catalog for the Vishwear atelier. Customers browse pieces and enquire on WhatsApp. There is no cart in this version.

**Silhouette tera signature hamara**

## Add a new piece

1. Put a portrait photo in `public/images/products/` (WebP, about 3:4, under 200KB).
2. Add one object in `src/data/products.js`. `category` must match a slug in `src/data/categories.js`.
3. Phone, address, Instagram: edit `src/data/siteConfig.js`. WhatsApp number is digits only, with country code, for example `919876543210`.
4. Commit and push to `main`. The live site updates. The QR code on the visiting card does not change.

## Run locally

```bash
npm install
npm run dev
```

## Go live on Netlify

The address that the visiting-card QR uses is:

`https://vishwear-fashion.netlify.app`

That URL stays the same. A scan always opens the latest publish.

Site ID: `4d2b7e50-8595-491c-a683-c1205163b20d`

After this folder is on `main`, connect the GitHub repo in Netlify (the build command is already in `netlify.toml`). Every later push to `main` replaces the live site. Do that only after this code is on `main` — the older empty commit would overwrite the catalog.

Optional: add GitHub secrets `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`. `.github/workflows/deploy.yml` then deploys on every push as well.

After the site exists, regenerate the card:

```bash
PYTHONPATH=.pytools python3 scripts/make_card.py https://vishwear-fashion.netlify.app
```

Print files land in `brand/`.
