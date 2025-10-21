# Final Project Checklist

## General
- [x] Uses a public GitHub repo.
- [x] Scaffolded using **Vite** with the `react` template (not `react-ts`, `react-swc`, or `react-swc-ts`).
- [x] Uses **NPM**.
- [x] Installs and uses dependencies: `react-router`.

---

## Coding Practices
- [ ] Neat and consistent formatting (Prettier recommended).
- [ ] Only 1 component per file unless using Styled-Components.
- [ ] Component names in **PascalCase**; filenames match component names.
- [ ] Minimize implicit type coercion.
- [ ] Favor functional approaches (e.g., `map` instead of `forEach`).
- [ ] Comments: concise, only for tricky code. Remove commented-out code/personal notes.
- [ ] Utility/helper-only files should have `.js` extension.

---

## Project Structure

### Root directory must contain:
- [x] `src/`
- [x] `.env.local.example` (example values for env vars).
- [x] `.gitignore` (includes at least):
- [x] `node_modules`
- [x] `dist`
- [x] `*.local` (covers `.env.local`)
- [x] `.DS_Store`
- [x] `index.html` (only `<head>` modifications allowed).
- [x] `package.json`
- [x] `package-lock.json`
- [x] `vite.config.js`
- [ ] `README.md` with:
  - [ ] Project title & description.
  - [ ] Details on added dependencies (esp. DOM-manipulating ones).
  - [ ] Install & run instructions.
  - [ ] API connection details (mention if credentials/services needed).

### Root directory must NOT contain:
- [x] `node_modules/`
- [x] `.env.local` or other sensitive files.
- [x] Component files except `App.jsx` and `main.jsx`.
- [x] Yarn artifacts.
- [x] `public/` (except favicon).

### Inside `src/`:
- [x] `assets/` (imagery, fonts, etc.).
- [x] `features/` (≥ 2 features).
  - If feature has >1 component → place them in a subfolder.
- [x] `pages/` (≥ 3 page components).
- [x] `shared/` (≥ 2 reusable components).
- [x] `App.css` - [moved to css/ folder]
- [x] `App.jsx`
- [x] `main.jsx`
- [x] Additional dirs allowed for organization.

---

## Data Schema
- [ ] Create ≥1 object/array of objects for state.
- [ ] Use simplest data structures possible.

---

## React Concepts
- [ ] Browser page should never refresh on user interaction.
- [ ] All components functional (no classes).
- [ ] Use only React-compatible props.
- [ ] Never mutate state.
- [ ] Components return valid JSX.
- [ ] No direct DOM manipulation (except via 3rd-party libs; note in README).
- [ ] External data communication is async.

### Must include:
- [ ] 1 component with `children` prop.
- [ ] 2 reusable components (≥2 HTML elements/subcomponents, use props).
- [ ] 4 conditionally rendered components/elements.
- [ ] 1 controlled form with ≥1 validated field.
- [ ] 2 `useEffect` calls (with cleanup if needed).
- [ ] 1 `useCallback`.
- [ ] Accurate dependency arrays in hooks.
- [ ] Arrays of rendered components use **unique keys** (not array indices).

---

## React Router
- [ ] Install `react-router`.
- [ ] Wrap `App` with `BrowserRouter` in `main.jsx`.
- [ ] Include ≥2 routes.
- [ ] Route elements use components from `pages/`.
- [ ] Wildcard route for "Not Found" page.
- [ ] Use `NavLink` for global navigation (can use `Link` elsewhere).

---

## Behavior

### Startup
- [ ] Installs without errors (except minor package updates).
- [ ] Starts without errors.
- [ ] On load: performs network request or interacts with browser storage.
- [ ] Loading status shown to user.
- [ ] Reviewers can access resources with minimal setup.
- [ ] APIs: publicly accessible (anonymous or free signup).
- [ ] If using local server:
  - [ ] Must be Node.js.
  - [ ] Runs error-free.
  - [ ] Include repo link + setup instructions in README.

### Functionality
- [ ] No uncaught errors (warnings acceptable).
- [ ] App never crashes.
- [ ] `StrictMode` enabled in `main.jsx`.
- [ ] Form inputs/labels properly associated.
- [ ] Catch & show foreseeable errors in UI.
- [ ] App supports CRUD operations:
  - [ ] Create
  - [ ] Read
  - [ ] Update
  - [ ] Delete (optional)
- [ ] Persist data via API, LocalStorage, or IndexedDB.

---

## Appearance & UX
- [ ] Styling via CSS, CSS Modules, or Styled-Components.
- [ ] No component/theming libs (exceptions for notifications with approval).
- [ ] Consistent theming/layouts across pages.
- [ ] Different font for headings vs. body text.
- [ ] Legible interface text.
- [ ] Images include descriptive `alt` text (except decorative).
- [ ] Any sounds must be mute-able in UI.
- [ ] Active `NavLink` visually distinct from inactive ones.
- [ ] Assets optimized (e.g., no oversized images).