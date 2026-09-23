import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage } from 'node:http'
import { defineConfig, type Plugin } from 'vite'

const PAGES = {
  main: 'index.html',
  terms: 'terms.html',
  executors: 'executors.html',
  notFound: '404.html',
}

const PAGE_PATHS = new Set(['/', ...Object.values(PAGES).map((file) => `/${file}`)])

function pathnameOf(req: IncomingMessage) {
  return (req.url ?? '/').split('?')[0]
}

function isBrowserNavigation(req: IncomingMessage) {
  return req.headers.accept?.includes('text/html') ?? false
}

// Mirrors vercel.json in dev: browsers can't open .lua files, and unknown routes render 404.html.
function notFoundPagePlugin(): Plugin {
  return {
    name: 'not-found-page',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (isBrowserNavigation(req) && pathnameOf(req).endsWith('.lua')) {
          res.writeHead(307, { Location: '/404' }).end()
          return
        }
        next()
      })

      return () => {
        server.middlewares.use((req, res, next) => {
          if (isBrowserNavigation(req) && !PAGE_PATHS.has(pathnameOf(req))) {
            req.url = `/${PAGES.notFound}`
            res.statusCode = 404
          }
          next()
        })
      }
    },
  }
}

export default defineConfig({
  appType: 'mpa',
  plugins: [react(), tailwindcss(), notFoundPagePlugin()],
  build: {
    rollupOptions: {
      input: PAGES,
    },
  },
})
