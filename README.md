# ⚛️ React + TypeScript + Vite Starter

This template provides a minimal and fast setup to get **React** working with **Vite** using **TypeScript**, **HMR (Hot Module Replacement)**, and **ESLint** integration.

## 🚀 Features

- ✅ React with TypeScript
- ⚡️ Vite for fast development and build
- 🔁 HMR (Hot Module Replacement) out of the box
- 🧹 ESLint with extensible configuration

## 🔌 Official Plugins

You can choose from two official Vite plugins for React:

- [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)  
  Uses [**Babel**](https://babeljs.io/) for Fast Refresh.

- [`@vitejs/plugin-react-swc`](https://github.com/vitejs/vite-plugin-react-swc)  
  Uses [**SWC**](https://swc.rs/) for Fast Refresh (faster builds).

---

## 📏 Expanding ESLint Configuration

For production-grade applications, we recommend enhancing your ESLint configuration to support **type-aware linting**.

### 1. Configure `parserOptions` for TypeScript

```ts
// eslint.config.js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})


# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
