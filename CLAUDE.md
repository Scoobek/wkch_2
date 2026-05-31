# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

CMS for a dog breed association covering all sighthound breeds (KChP project). Built with Next.js and Decap CMS.

## Stack

- **Framework:** Next.js
- **CMS:** Decap CMS
- **Package manager:** npm

## Commands

```bash
npm install       # install dependencies
npm run dev       # start local dev server
npm run build     # production build
npm run start     # run production build locally
npm run cms       # start Decap local backend proxy (port 8081)
```

## Local CMS development

Run both servers in separate terminals:
- `npm run dev` — Next.js (port 3000)
- `npm run cms` — Decap local proxy (port 8081)

Then open `http://localhost:3000/admin/`.

## Notes

- Decap CMS config lives in `public/admin/config.yml`
- CMS collections define the content schema for news articles
- `local_backend: true` is set in `config.yml` for local development — **remove it before deploying to production**