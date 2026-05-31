---
name: git-standards
description: >
    Branch and commit message standards guardian for the WKCH sighthound CMS project.
    Activate whenever a git branch is being created or a commit is being made.
    Validates branch names against the type/WKCH-ticket-slug pattern and commit messages
    against the Conventional Commits specification. Surfaces a warning and a corrected
    suggestion whenever a violation is detected — never silently let a bad name through.
---

# Git Standards Guardian

Enforces branch naming and commit message conventions for the WKCH project.
Runs passively alongside git operations — only speaks up when a violation is found.

---

## Branch naming convention

Pattern: `<type>/WKCH-<number>-<slug>`

### Allowed types

| Type         | Use for                                      |
| ------------ | -------------------------------------------- |
| `feat`       | New feature or page                          |
| `fix`        | Bug fix                                      |
| `chore`      | Maintenance, deps, config, tooling           |
| `docs`       | Documentation only                           |
| `style`      | Formatting, CSS, no logic change             |
| `refactor`   | Code restructure without behaviour change    |
| `test`       | Adding or updating tests                     |
| `release`    | Release preparation                          |

### Rules

- Must start with one of the allowed types above.
- Must include a WKCH ticket number: `WKCH-<digits>`.
- Slug after the ticket number is lowercase kebab-case, no spaces or uppercase.
- Examples of **valid** names:
  - `feat/WKCH-12-breed-detail-page`
  - `fix/WKCH-34-cms-oauth-callback`
  - `chore/WKCH-99-update-deps`
- Examples of **invalid** names:
  - `feature/breed-page` — wrong prefix, missing ticket
  - `fix-cms-auth` — missing type prefix and ticket
  - `WKCH-12-breed-page` — missing type prefix
  - `feat/breed-page` — missing ticket number

### When a branch name violates the convention

Emit a warning **before** running the `git checkout -b` or `git switch -c` command:

---

⚠️ **Branch name doesn't match the WKCH convention**

**Given:** `<branch-name>`
**Expected pattern:** `<type>/WKCH-<number>-<slug>`

**Suggested name:** `<corrected-branch-name>`

Do you want me to use the corrected name, or proceed with the original?

---

Wait for confirmation before creating the branch.

---

## Commit message convention

Format: `<type>(<optional-scope>): <short description>`

Follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Allowed types (same set as branches)

`feat` · `fix` · `chore` · `docs` · `style` · `refactor` · `test` · `perf` · `ci` · `build` · `revert`

### Rules

1. **Type** — one of the allowed types above, lowercase.
2. **Scope** — optional, in parentheses, lowercase: `(cms)`, `(auth)`, `(breeds)`.
3. **Description** — imperative mood, lowercase first letter, no trailing period, max ~72 chars.
4. **Body** — optional, separated by a blank line; explains *why*, not *what*.
5. **Breaking change** — append `!` after type/scope, or add `BREAKING CHANGE:` in body footer.

### Examples of valid commit messages

```
feat: add greyhound breed detail page
fix(auth): correct OAuth callback URL for Cloudflare Worker
chore(deps): update Next.js to 14.2
docs: add environment variable reference to README
refactor(cms): extract collection config to separate file
feat!: redesign breed index — breaks existing URL slugs
```

### Examples of invalid commit messages

```
WIP                          ← too short / no type
fixed stuff                  ← no type prefix
Add breed page               ← capital letter after type (missing type prefix)
feat: Add breed page.        ← capital A and trailing period
update dependencies          ← no type prefix
```

### When a commit message violates the convention

Emit a warning **before** running the `git commit` command:

---

⚠️ **Commit message doesn't match the Conventional Commits format**

**Given:** `<original message>`
**Issue:** `<brief explanation of what's wrong>`

**Suggested message:** `<corrected message>`

Do you want me to use the corrected message, or proceed with the original?

---

Wait for confirmation before committing.

---

## Behaviour summary

| Moment                              | Action                                          |
| ----------------------------------- | ----------------------------------------------- |
| Before `git checkout -b` / `switch -c` | Validate branch name; warn + suggest if wrong   |
| Before `git commit -m`              | Validate commit message; warn + suggest if wrong |
| After a valid operation             | Say nothing — don't confirm every good name      |
| User overrides the suggestion       | Respect it; proceed with original               |

The goal is to catch mistakes early without slowing down the workflow for correctly formed names.
