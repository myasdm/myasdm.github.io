# Architecture rules

- Discover articles from `src/content/posts/*.md` using Vite raw imports and YAML frontmatter; publishing an article must not require editing an index.
- Keep personal facts, contact details, cases, and career entries in `src/data/profile.ts`; derive the career overview from cases to prevent duplicate maintenance.
- Use one app-level language provider and a shared editorial layout so language choice and navigation remain consistent between pages.
- Use hash-based routing for static GitHub Pages hosting so article and case URLs work on direct visits without server rewrites.
- Keep generated editorial opinions distinct from resume-backed field notes; unpublished or unverified material must use `draft: true`.
- Define visual colors and typography centrally in global CSS; page components use semantic tokens and the shared Button.
