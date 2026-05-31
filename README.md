# WKCH — Sighthound Breeds Association CMS

Website and CMS for the Polish Sighthound Club (Wybieralny Klub Charta w Polsce), covering all sighthound breeds. Built with Next.js and Decap CMS.

## Tech stack

-   [Next.js](https://nextjs.org/) (App Router, static export)
-   TypeScript
-   CSS Modules
-   [Decap CMS](https://decapcms.org/)

## Getting started

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build → out/
npm start      # run production build locally
```

## CMS

Content is managed via [Decap CMS](https://decapcms.org/) at `/admin/`.

-   **Backend:** GitHub (requires a logged-in GitHub account with repo access)
-   **Collections:** News & Articles (`content/news/`)
-   **Media uploads:** `public/images/uploads/`

To run the CMS locally, use a proxy server — see [Decap local backend docs](https://decapcms.org/docs/local-backend/).
