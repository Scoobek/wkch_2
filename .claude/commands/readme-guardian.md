---
name: readme-guardian
description: >
    Passive README watchdog for Wojciech's WKCH sighthound breeds project (Next.js + Decap CMS).
    Activate this skill during ANY coding session on that project. After each meaningful change —
    new feature, new dependency, new config, new env variable, new route, CMS schema change,
    deployment step, or architectural decision — check whether the change should be reflected in
    the README. If yes, immediately surface a short notification + copy-paste snippet the user
    can drop into README.md. The skill also tracks which README sections still need to be written
    from scratch (since there is no README yet). Always trigger this skill when the conversation
    involves the WKCH / sighthound breeds project codebase, even if the user doesn't mention
    README explicitly.
---

# README Guardian

A passive, parallel watchdog skill for the WKCH sighthound-breeds project.
It runs alongside coding work and notifies Wojciech whenever something built
or changed should be documented in the README.

---

## Core behaviour

After **every meaningful code change** in the session, silently evaluate:

> "Would a new developer need to know about this to set up, understand, or
> contribute to the project?"

If **yes** → emit a notification block (see format below).
If **no** → say nothing, keep working.

Do not wait to be asked. The check is automatic and silent — only speak up when
a notification is warranted.

---

## What counts as a README-worthy change

Trigger a notification when ANY of the following happens:

| Category                   | Examples                                                                               |
| -------------------------- | -------------------------------------------------------------------------------------- |
| **Setup / install**        | New dependency added to `package.json`, Node version requirement, pnpm/npm/yarn switch |
| **Environment variables**  | New `.env` key, change in required vars, link to where to get a value                  |
| **Configuration files**    | `next.config.js`, `tailwind.config`, `decap-cms/config.yml` changes                    |
| **CMS schema**             | New collection, new field type, new widget, editorial workflow changes                 |
| **Routing / pages**        | New Next.js page, dynamic route, API route, middleware                                 |
| **Auth / OAuth**           | Cloudflare Worker proxy, GitHub OAuth app, any auth flow                               |
| **Deployment**             | Hosting provider, build command, FTP deploy, CI/CD step                                |
| **Architecture decisions** | Why a library was chosen, a pattern introduced, a constraint discovered                |
| **Scripts**                | New `package.json` script, what it does, when to run it                                |
| **Known issues / gotchas** | A hosting quirk (e.g. nazwa.pl ignoring cache headers), a workaround applied           |

---

## Notification format

When a notification is warranted, append this block **at the end of your normal response** — never interrupt the coding answer:

---

📋 **README update suggested**

**Section:** `<section name, e.g. "Environment Variables" / "Getting Started" / "CMS Configuration">`
**Reason:** One sentence explaining what changed and why it belongs in the README.

**Snippet:**

```markdown
<ready-to-paste markdown the user can copy directly into README.md>
```

---

Keep snippets **concise and practical** — written for a developer who clones the repo cold.
No fluff, no repetition of what's already in the notification reason.

---

## README structure to build toward

Since there is no README yet, track which sections have been suggested over the
course of the session. Mentally maintain this checklist and mention missing
critical sections if they remain uncovered after significant progress:

-   [ ] Project overview (what the site is, who it's for)
-   [ ] Tech stack (Next.js, Decap CMS, hosting)
-   [ ] Prerequisites (Node version, package manager)
-   [ ] Getting started / local dev setup
-   [ ] Environment variables
-   [ ] CMS configuration & content editing
-   [ ] Deployment
-   [ ] Known issues / gotchas

If the session ends (user says goodbye / wraps up) and critical sections are
still uncovered, offer a **README skeleton** — a full empty-section template
the user can populate later.

---

## Tone & language

-   Notifications are brief: reason + snippet, nothing more.
-   English only (README will be in English for international contributors).
-   Snippets use real values where known, `YOUR_VALUE_HERE` placeholders where not.
-   Never block the coding flow — the README note is always appended, never prepended.
