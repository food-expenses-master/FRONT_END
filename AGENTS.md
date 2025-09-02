# Repository Guidelines

## Project Structure & Module Organization
- Source lives in `src/` using Next.js App Router.
  - Routes: `src/app/**/page.tsx`, global layout at `src/app/layout.tsx`.
  - UI components: `src/components/` (reusable, PascalCase files).
  - Hooks: `src/hooks/` (e.g., `useAuth.ts`, `useScrollInfo.ts`).
  - Data & types: `src/data/`.
  - Utilities: `src/utils/` and `src/lib/` (Firebase, auth, server helpers).
- Static assets: `public/` (icons, images, PWA files).
- Config: `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `.prettierrc`, `tsconfig.json`.

## Build, Test, and Development Commands
- `npm run dev`: Start local dev server (Turbopack) at `http://localhost:3000`.
- `npm run build`: Create optimized production build.
- `npm run start`: Serve the production build.
- `npm run lint`: Run Next.js/ESLint checks (must pass before PRs).

## Coding Style & Naming Conventions
- Language: TypeScript in strict mode; path alias `@/*` (see `tsconfig.json`).
- Formatting: Prettier enforced — 2 spaces, single quotes, no semicolons, `trailingComma: es5`, `printWidth: 80`.
- Components: PascalCase files (e.g., `Button.tsx`); hooks: `useXxx.ts` with camelCase exports.
- Styling: Tailwind CSS via `src/app/globals.css`.
- Example import: `import Button from '@/components/Button'`.

## Testing Guidelines
- Linting required: `npm run lint` must pass.
- No test runner configured yet. Prefer React Testing Library (unit) and Playwright (e2e) later.
- When adding tests, colocate as `*.test.ts`/`*.test.tsx` beside source files.

## Commit & Pull Request Guidelines
- Commits: Imperative, concise subjects using scopes where helpful.
  - Example: `feat(auth): add Firebase session middleware`.
- PRs: Small and focused; include description, linked issues, and screenshots/GIFs for UI changes.
- Validation before PR: run `npm run lint` and `npm run build` locally.

## Security & Configuration Tips
- Secrets: Use `.env.local` (git-ignored). Never commit keys.
- Auth: `middleware.ts` protects `/protected/**` using `__session` cookie and Firebase Admin. Avoid logging sensitive data.
- PWA: Managed via `next.config.ts` (`next-pwa`); verify icons under `public/icons/`.

