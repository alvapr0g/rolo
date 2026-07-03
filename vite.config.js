import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/rolo/', // nombre del repo en GitHub Pages: alvapr0g.github.io/rolo/
  plugins: [react()],
})
