import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { GET as handleAuthRequest } from './api/auth.ts'

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

async function sendAuthResponse(req: IncomingMessage, res: ServerResponse) {
  const response = handleAuthRequest(new Request(`http://localhost${req.url}`))
  res.writeHead(response.status, Object.fromEntries(response.headers))
  res.end(await response.text())
}

// Mirrors vercel.json in dev: browsers can't open .lua files, /auth runs api/auth.ts, and unknown routes render 404.html.
function notFoundPagePlugin(): Plugin {
  return {
    name: 'not-found-page',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (isBrowserNavigation(req) && pathnameOf(req).endsWith('.lua')) {
          res.writeHead(307, { Location: '/404' }).end()
          return
        }
        if (pathnameOf(req) === '/auth') {
          void sendAuthResponse(req, res)
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

export default defineConfig(({ mode }) => {
  // Server-only: LICENSE isn't exposed to client code (only VITE_ vars are).
  // Assigning undefined to process.env stores the string "undefined", so only set a real value.
  const { LICENSE } = loadEnv(mode, process.cwd(), 'LICENSE')
  if (LICENSE) process.env.LICENSE = LICENSE

  return {
    appType: 'mpa',
    plugins: [react(), tailwindcss(), notFoundPagePlugin()],
    build: {
      rollupOptions: {
        input: PAGES,
      },
    },
  }
})
