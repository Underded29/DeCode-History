import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // Дозволяє використовувати describe, test, expect без імпорту
    environment: 'jsdom', // Імітує браузер
    setupFiles: './src/setupTests.js', // Файл для підключення @testing-library/jest-dom
  }
})
