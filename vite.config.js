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
function preloadHeroFonts() {
  return {
    name: "preload-hero-fonts",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const bundle = ctx.bundle;
        if (!bundle) return html;
        const files = Object.keys(bundle).filter((file) =>
          /onest-cyrillic-(400|600)-normal-.*\.woff2$/.test(file)
        );
        if (!files.length) return html;
        const links = files
          .map(
            (file) =>
              `<link rel="preload" href="/${file}" as="font" type="font/woff2" crossorigin>`
          )
          .join("");
        return html.replace("</head>", `${links}</head>`);
      },
    },
  };
}

export default defineConfig({
  plugins: [leadApi(), preloadHeroFonts(), react()],
  server: {
    allowedHosts: ['.trycloudflare.com'],
  },
})
