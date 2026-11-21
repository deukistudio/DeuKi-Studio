# DeuKi Education – Onboarding

Onboarding flow (mascot dialogue → questions → login) and homepage for DeuKi Education.
Plain HTML / CSS / JavaScript with no build step.

## Run

- **Quick:** double-click `index.html`.
- **Recommended (dev server):** `npx serve .` then open the printed URL. You can also use the VS Code *Live Server* extension.
- Add `#home` to the URL to jump straight to the homepage, e.g. `index.html#home`.

## Project structure

```
├── index.html                  Markup only. Links every stylesheet and script.
├── assets/images/              Web-optimised images used by the site
│   ├── icons/                  check.png, fire.png, arrow.png, lock.png
│   ├── roadmap/                intro.png, studying.png
│   └── skills/                 listening / speaking / reading / writing stickers
├── design/source-images/       Full-size originals (not loaded by the site)
├── css/
│   ├── base/                   variables (design tokens), reset
│   ├── layout/                 stage (the 960×620 canvas)
│   ├── components/             mascot, speech bubble, answer chips, continue button, login card, mascot toast
│   ├── pages/                  home, lessons, courses, progress
│   └── utilities.css           helpers + reduced-motion (loaded last)
└── js/
    ├── core/                   dom helpers, shared state, stage scaling
    ├── data/                   onboarding + lessons content (edit text / curriculum here)
    ├── services/               backend.demo.js: the account/progress API
    ├── features/               typing, answer chips, mascot, streak, lessons, levels, courses, progress, navigation, auth, onboarding
    └── main.js                 app start
```

## Conventions

- **Load order matters.** Stylesheets and scripts are listed in dependency order in `index.html`.
  The scripts are classic `defer` scripts that share one global scope (they aren't ES modules,
  so the page still works from `file://`). Add new files to `index.html` in the right place.
- **Layouts:** `#stage[data-p="N"]` controls the scene. 1–4 = onboarding, 6 = login, 7 = homepage, 8 = Khóa Học, 9 = Tiến Trình.
- **Level locking:** `js/features/levels.js`. A level unlocks once every lesson of the previous level is done
  (A1 is always open). Both the Từ Vựng buttons and the Khóa Học page use it.
- **Backend:** everything account-related goes through the `backend` object. To switch from the in-memory demo
  to Firebase, create `js/services/backend.firebase.js` with the same methods
  (`demo, register, login, checkIn, loadDone, saveDone`, plus optional `restore, logout, msg`) and swap the
  `<script>` tag in `index.html`.
- **Formatting:** Prettier (`.prettierrc`) and EditorConfig. Run `npx prettier --write "css/**/*.css" "js/**/*.js"`.
