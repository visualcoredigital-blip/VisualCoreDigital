import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Necesario para Docker
    watch: {
      usePolling: true, // Esto es el equivalente al "-L" de nodemon para el Front
    },
    port: 5173
  }
})
