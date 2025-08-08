# Playwright Demo – Sauce Demo E2E Tests

![Node >= 22](https://img.shields.io/badge/Node-%3E%3D22.0.0-brightgreen)
![Playwright 1.54.x](https://img.shields.io/badge/Playwright-1.54.x-blue)
![License ISC](https://img.shields.io/badge/License-ISC-lightgrey)

A concise Playwright end‑to‑end test suite targeting the Sauce Demo app. It showcases multi‑project setup (desktop and mobile), storage‑state reuse for multiple users, tagging, and modern linting.

## Project Structure

```
playwright-demo/
├── src/
│   ├── fixtures/
│   │   └── users.js            # user definitions and storageState paths
│   └── modules/
├── tests/
│   ├── setup.spec.js           # generates .auth/*.json storage state
│   ├── login.spec.js           # login and negative login tests
│   └── inventory.spec.js       # inventory/cart flows per user
├── .auth/                      # generated storage states (gitignored)
├── eslint.config.js            # ESLint + Prettier config
├── playwright.config.js        # Playwright configuration
├── package.json                # scripts and dev dependencies
└── .gitignore
```

## Tooling & Packages

- @playwright/test ^1.54.2
- eslint ^9.32.0, @eslint/js, eslint-config-prettier, eslint-plugin-prettier, eslint-plugin-playwright
- prettier 3.6.2
- dotenv ^17.2.1

Node engine enforced: >= 22 (see `.npmrc` and `package.json`).

## Install

```bash
npm install
npx playwright install --with-deps
```

## Configuration

- Base URL: `https://www.saucedemo.com` (`playwright.config.js`)
- Password is read from env var `PASSWORD` (loaded via `dotenv`)
- Optional slow motion via `DEBUG=true`

Create a local `.env` (gitignored):

```
PASSWORD=secret_sauce
# DEBUG=true
```

## Running Tests

- All tests:
```bash
npm test
```

- UI mode:
```bash
npm run test:ui
```

- Happy Path tag:
```bash
npm run test:happy-path
# or
npx playwright test --grep @HappyPath
```

### Authenticated storage state
The `setup` project logs in users and writes storage state files to `.auth/`.

1) Generate storage state:
```bash
npx playwright test --project=setup
```

2) Run tests that reuse storage state (e.g., inventory):
```bash
npx playwright test -g "@Inventory"
```

User definitions live in `src/fixtures/users.js`.

## Projects
Defined in `playwright.config.js`:
- `setup` (matches `*.setup.spec.js`)
- `chromium` (Desktop Chrome)
- `Mobile Chrome` (Galaxy S9+)
- `Mobile Safari` (iPhone 14)

## Reporters
- `list`, `github`, `blob`, `html` (report saved under `playwright-report/`)

## Tags
Common tags: `@Desktop`, `@Mobile`, `@Login`, `@Inventory`, `@SauceDemo`, `@HappyPath`, `@ErrorPath`, and per‑user tags.

Examples:
```bash
# Desktop-only
npx playwright test --grep @Desktop

# Mobile tests
npx playwright test --project "Mobile Chrome"
```

## Scripts
- `test`: run tests
- `test:ui`: open Playwright UI
- `test:happy-path`: run tests tagged `@HappyPath`
- `lint`: run ESLint
- `lint-fix`: auto-fix ESLint issues

## Linting
ESLint with Prettier and Playwright plugin:
```bash
npm run lint
npm run lint-fix
```

## Notes
- `.auth/` and `.env` are gitignored. Generate `.auth` via the `setup` project.
- Ensure `PASSWORD` is set before running login tests.

## License
ISC
