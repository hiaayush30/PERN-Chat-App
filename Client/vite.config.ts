import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server:{
    proxy:{
      '/api':{  // Intercepts requests starting with `/api`
        target:'http://localhost:3000', // Redirects them to this backend server
        changeOrigin:true
      }
    }
  }
})
