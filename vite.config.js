import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { handleLead } from './server/lead.js'

function leadApi() {
  const middleware = async (req, res, next) => {
    try {
      if (await handleLead(req, res)) return
      next()
    } catch (error) {
      next(error)
    }
  }
  return {
    name: 'lead-api',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [leadApi(), react()],
  server: {
    allowedHosts: ['.trycloudflare.com'],
  },
})
