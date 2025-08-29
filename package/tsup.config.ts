// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: false, // Disable sourcemaps for production
  clean: true,
  external: ['react', 'react-dom'],
  tsconfig: './tsconfig.app.json',
  minify: true, // Enable minification
  treeshake: true, // Enable tree shaking
  splitting: false, // Disable splitting for single entry
  target: 'es2020', // Target modern browsers for smaller bundles
  esbuildOptions(options) {
    options.drop = ['console', 'debugger']; // Remove console logs in production
  },
});
