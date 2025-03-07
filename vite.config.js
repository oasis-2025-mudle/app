import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/oasis-2025-charles-beta/app/",
  plugins: [react()],
});
