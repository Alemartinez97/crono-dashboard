# Crono Dashboard

Dashboard built with **React + TypeScript + Vite**, using Tailwind CSS, Redux Toolkit, TanStack Query, and SWR.

## Prerequisites

Before getting started, make sure you have installed:

- **Node.js** 20.x or higher ([download](https://nodejs.org/))
- **npm** 10.x or higher (bundled with Node.js)

You can check your versions with:

```bash
node --version
npm --version
```

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd crono-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running the project

### Development mode

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

By default, the app runs at [http://localhost:5173](http://localhost:5173).

### Production build

Generate an optimized production build:

```bash
npm run build
```

The compiled files are emitted to the `dist/` directory.

### Preview the build

Serve the production build locally to preview it:

```bash
npm run preview
```

### Lint

Run ESLint across the project:

```bash
npm run lint
```

## Project structure

```
crono-dashboard/
├── public/              # Static assets
├── src/
│   ├── api/             # API clients and calls
│   ├── assets/          # Images, fonts, and resources
│   ├── components/      # Reusable components
│   ├── hooks/           # Custom hooks
│   ├── pages/           # Pages / views
│   ├── providers/       # Context providers
│   ├── store/           # Redux store and slices
│   ├── styles/          # Global styles
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Root component
│   └── main.tsx         # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) as bundler and dev server
- [Tailwind CSS 4](https://tailwindcss.com/) for styling
- [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/) for global state
- [TanStack Query](https://tanstack.com/query) and [SWR](https://swr.vercel.app/) for data fetching
- [Lucide React](https://lucide.dev/) for icons

## Import alias

The project has the `@` alias configured to point to `src/`, so you can import like this:

```ts
import { Button } from '@/components/Button'
```
