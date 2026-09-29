# Superadmin

Internal factory app. Pick a template and which dashboard modules to include,
then generate and download a standalone project zip (website + dashboard +
backend, wired for exactly that selection). Nothing is written to disk here
beyond a temp directory that's deleted after the zip is streamed back - no
git repo, no database is touched. The person who unzips the project fills in
`backend/.env` themselves and follows the generated `README.md`.

## Setup

1. Copy `.env.example` to `.env.local` and set `SUPERADMIN_PASSWORD` and
   `SUPERADMIN_SESSION_SECRET`.
2. `npm run dev` (from the repo root: `npm run dev --workspace apps/superadmin`).
3. Sign in with the shared password at `/login`.

This app must run from inside the platform repo - it reads `templates/` and
`packages/*` directly via `@platform/scaffold-cli`. It is never itself
generated or shipped to a client.
