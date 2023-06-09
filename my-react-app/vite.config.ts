import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@modules':  path.resolve(__dirname, '..', 'backend', 'src', 'modules') 
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
})

