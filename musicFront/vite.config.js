import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Allows the server to be accessible externally
    port: 5173        // Optional: explicitly set the port to 5173
  }
})
