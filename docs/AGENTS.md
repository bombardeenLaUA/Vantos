# AGENTS.md

## Cursor Cloud specific instructions

**Vantos** is a stateless, client-side Next.js 14 financial strategy suite (Spanish market). There are no databases, no backend APIs, and no external services required.

### Services

| Service | Command | Port |
|---------|---------|------|
| Dev server | `npm run dev` | 3000 |

### Key commands

See `package.json` scripts. Summary:

- **Lint:** `npm run lint` (ESLint with next/core-web-vitals + next/typescript)
- **Test:** `npx vitest run` (use `run` flag; bare `npm test` starts watch mode)
- **Build:** `npm run build`
- **Dev:** `npm run dev` (starts on port 3000)

### Notes

- The app stores all state in URL search params — no database or auth needed.
- Financial calculations use `decimal.js` in `lib/finance.ts`; test coverage is in `lib/finance.test.ts`.
- Pre-existing lint warnings exist in `components/MortgageCalculator.tsx` (unused variable, missing hook deps); these are known and non-blocking.
- `next.config.mjs` ignores ESLint errors and TypeScript errors during builds (`ignoreDuringBuilds` / `ignoreBuildErrors`).