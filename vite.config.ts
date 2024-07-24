import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: [
      'src/**/*.test.ts',
      'src/**/*.test.tsx',
      'src/**/*.spec.ts',
      'src/**/*.spec.tsx'
    ],
    exclude: ['**/node_modules/**', '**/dist/**', '**/build/**'],
    setupFiles: 'src/setupTests.ts',
    mockReset: true
  }
});
