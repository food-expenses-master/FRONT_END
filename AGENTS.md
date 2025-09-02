# Repository Guidelines

## Project Structure & Module Organization
- Source: `src/` using Next.js App Router.
  - Pages/Routes: `src/app/**/page.tsx`, layout at `src/app/layout.tsx`.
  - UI: `src/components/` (reusable React components).
  - Hooks: `src/hooks/` (e.g., `useAuth`, `useScrollInfo`).
  - Data/Types: `src/data/`.
  - Utilities: `src/utils/` and `src/lib/` (Firebase, auth, server helpers).
- Static assets: `public/` (icons, images, PWA files).
- Config: `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `.prettierrc`.

## Build, Test, and Development Commands
- `npm run dev`: Start local dev server (Turbopack) at `http://localhost:3000`.
- `npm run build`: Production build.
- `npm run start`: Serve production build.
- `npm run lint`: Run Next.js/ESLint checks.

Tip: Prefer `npm` (lockfile present). Yarn users may map to `yarn dev`, etc.

## Coding Style & Naming Conventions
- TypeScript, strict mode; path alias `@/*` (see `tsconfig.json`).
- Formatting: Prettier enforced (2 spaces, single quotes, no semicolons, `trailingComma: es5`, `printWidth: 80`).
- Components: PascalCase `ComponentName.tsx`; hooks: `useXxx.ts` (camelCase exports).
- Files live under `src/`; App Router components go under `src/app` with `page.tsx` and `layout.tsx`.
- Styling: Tailwind CSS (`src/app/globals.css` loaded globally).

## Testing Guidelines
- Linting is required: `npm run lint` must pass before PRs.
- No test runner configured yet; prefer adding React Testing Library (unit) and Playwright (e2e) in future.
- Keep functions pure where possible and colocate tests beside files as `*.test.ts(x)` when added.

## Commit & Pull Request Guidelines
- Commits: Imperative, concise subjects; group related changes. Example: `feat(auth): add Firebase session middleware`.
- PRs: Small, focused; include description, linked issues, and screenshots/GIFs for UI changes.
- Validation: Run `npm run lint` and `npm run build` locally before opening a PR.

## Security & Configuration Tips
- Secrets: Use `.env.local` (ignored by Git). Do not commit keys.
- Auth: `middleware.ts` protects `/protected/**` using `__session` cookie and Firebase Admin; avoid logging sensitive data.
- PWA: Managed via `next.config.ts` (`next-pwa`); verify icons under `public/icons/`.
