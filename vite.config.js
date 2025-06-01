import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'https://guilhermeleitao2002.github.io/movie-dashboard/'
})