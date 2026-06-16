# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

```
gym-planner
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ favicon.svg
├─ README.md
├─ server
│  ├─ generated
│  │  └─ prisma
│  │     ├─ browser.ts
│  │     ├─ client.ts
│  │     ├─ commonInputTypes.ts
│  │     ├─ enums.ts
│  │     ├─ internal
│  │     │  ├─ class.ts
│  │     │  ├─ prismaNamespace.ts
│  │     │  └─ prismaNamespaceBrowser.ts
│  │     ├─ models
│  │     │  ├─ training_plans.ts
│  │     │  └─ user_profiles.ts
│  │     └─ models.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ prisma
│  │  ├─ migrations
│  │  │  ├─ 20260604225003_init
│  │  │  │  └─ migration.sql
│  │  │  ├─ 20260606202343_plans
│  │  │  │  └─ migration.sql
│  │  │  ├─ 20260606203142_add_created_at
│  │  │  │  └─ migration.sql
│  │  │  ├─ 20260606214222_rename_plan_json
│  │  │  │  └─ migration.sql
│  │  │  └─ migration_lock.toml
│  │  └─ schema.prisma
│  ├─ prisma.config.ts
│  ├─ src
│  │  ├─ index.ts
│  │  ├─ lib
│  │  │  ├─ ai.ts
│  │  │  └─ prisma.ts
│  │  └─ routes
│  │     ├─ plan.ts
│  │     └─ profile.ts
│  ├─ tsconfig.json
│  └─ types
│     └─ index.ts
├─ src
│  ├─ App.tsx
│  ├─ assets
│  ├─ components
│  │  ├─ layout
│  │  │  └─ Navbar.tsx
│  │  ├─ plan
│  │  │  └─ PlanDisplay.tsx
│  │  └─ ui
│  │     ├─ Button.tsx
│  │     ├─ Card.tsx
│  │     ├─ Input.tsx
│  │     ├─ Select.tsx
│  │     └─ Textarea.tsx
│  ├─ context
│  │  └─ AuthContext.tsx
│  ├─ dal
│  │  └─ options.ts
│  ├─ index.css
│  ├─ lib
│  │  ├─ api.ts
│  │  └─ auth.ts
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ Account.tsx
│  │  ├─ Auth.tsx
│  │  ├─ Home.tsx
│  │  ├─ OnBoarding.tsx
│  │  └─ Profile.tsx
│  └─ types
│     └─ index.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```