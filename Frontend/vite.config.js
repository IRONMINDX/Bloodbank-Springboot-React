import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  cacheDir: join(tmpdir(), 'blood-bank-vite-cache'),
  publicDir: false,
  build: {
    outDir: join(tmpdir(), 'blood-bank-dist'),
    emptyOutDir: true,
  },
})
