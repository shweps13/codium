# Final Project Checklist

## General
- [x] Uses a public GitHub repo.
- [x] Scaffolded using **Vite** with the `react` template (not `react-ts`, `react-swc`, or `react-swc-ts`).
- [x] Uses **NPM**.
- [x] Installs and uses dependencies: `react-router`.

---

## Coding Practices
- [x] Neat and consistent formatting (Prettier recommended).
- [x] Only 1 component per file unless using Styled-Components.
- [x] Component names in **PascalCase**; filenames match component names.
- [x] Minimize implicit type coercion.
- [x] Favor functional approaches (e.g., `map` instead of `forEach`).
- [x] Comments: concise, only for tricky code. Remove commented-out code/personal notes.
- [x] Utility/helper-only files should have `.js` extension.

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
- [x] Create ≥1 object/array of objects for state.
  - [x] [Dashboard.jsx has a useState with files array]
  - [x] [AuthProvider.jsx has a useState with currentUser data]
  - [x] [ToastProvider.jsx has a useState with toast objects data]
- [x] Use simplest data structures possible.
  - [x] [I do have a fileData inside of fileService.js which is structure for user 'file']

---

## React Concepts
- [x] Browser page should never refresh on user interaction.
- [x] All components functional (no classes).
- [x] Use only React-compatible props.
- [x] Never mutate state.
- [x] Components return valid JSX.
- [x] No direct DOM manipulation (except via 3rd-party libs; note in README).
- [x] External data communication is async.

### Must include:
- [x] 1 component with `children` prop.
  - [x] [frontend/src/contexts/ToastProvider.jsx]
- [x] 2 reusable components (≥2 HTML elements/subcomponents, use props).
  - [x] [frontend/src/components/FileCard.jsx]
  - [x] [frontend/src/components/Editor.jsx]
- [x] 4 conditionally rendered components/elements.
  - [x] [frontend/src/pages/Dashboard.jsx]
  - [x] [frontend/src/shared/Header.jsx]
  - [x] [frontend/src/components/Editor.jsx]
- [x] 1 controlled form with ≥1 validated field.
  - [x] [Sign In modal has simple field validation (provided by html: type="email", type="password")]
  - [x] [Custom validation at "Create New File" modal]
- [x] 2 `useEffect` calls (with cleanup if needed).
  - [x] [frontend/src/components/Editor.jsx]
  - [x] [frontend/src/pages/Dashboard.jsx]
- [x] 1 `useCallback`.
  - [x] [frontend/src/pages/Dashboard.jsx]
- [x] Accurate dependency arrays in hooks.
  - [x] [useEffect/useCallback hooks has necessary/empty dependancy arrays]
- [x] Arrays of rendered components use **unique keys** (not array indices).
  - [x] [FileCard component inside of Dashboard.jsx uses unique keys with IDs provided by Firebase]

---

## React Router
- [x] Install `react-router`.
- [o] Wrap `App` with `BrowserRouter` in `main.jsx`.
  - [x] [BrowserRouter implemented in App.jsx in order to keep main.jsx clean]
- [x] Include ≥2 routes.
  - [x] ["/dashboard"]
  - [x] ["/editor"]
- [x] Route elements use components from `pages/`.
- [x] Wildcard route for "Not Found" page.
- [x] Use `NavLink` for global navigation (can use `Link` elsewhere).

---

## Behavior

### Startup
- [ ] Installs without errors (except minor package updates).
- [x] Starts without errors.
- [x] On load: performs network request or interacts with browser storage.
- [x] Loading status shown to user.
- [ ] Reviewers can access resources with minimal setup.
- [x] APIs: publicly accessible (anonymous or free signup).
- [x] If using local server:
  - [x] Must be Node.js.
  - [x] Runs error-free.
  - [ ] Include repo link + setup instructions in README.

### Functionality
- [x] No uncaught errors (warnings acceptable).
- [x] App never crashes.
- [x] `StrictMode` enabled in `main.jsx`.
- [x] Form inputs/labels properly associated.
  - [x] [Inputs for modals contan correct labels]
- [x] Catch & show foreseeable errors in UI.
  - [x] [ToastContext implemented]
- [x] App supports CRUD operations:
  - [x] Create [New file]
  - [x] Read [List of files]
  - [x] Update [Save editing results]
  - [x] Delete [Delet file]
    - [x] [File service located at frontend/src/services/fileService.js]
- [x] Persist data via API, LocalStorage, or IndexedDB. 
  - [x] [Firestore implemented]

---

## Appearance & UX
- [x] Styling via CSS, CSS Modules, or Styled-Components.
- [x] No component/theming libs (exceptions for notifications with approval).
  - [x] Only two separate Radix components - Notifications (@radix-ui/react-toast) and Modal (@radix-ui/react-dialog).
- [x] Consistent theming/layouts across pages.
- [x] Different font for headings vs. body text.
  - [x] [Inter for headers]
- [x] Legible interface text.
- [x] Images include descriptive `alt` text (except decorative).
- [x] Any sounds must be mute-able in UI.
- [x] Active `NavLink` visually distinct from inactive ones.
  - [x] [Implemented button navigation controll]
- [x] Assets optimized (e.g., no oversized images).
  - [x] [Used svg instead of png/jpeg]