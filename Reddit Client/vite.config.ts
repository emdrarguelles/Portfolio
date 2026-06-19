import react from "@vitejs/plugin-react"
import * as path from "node:path"
import { defineConfig } from "vitest/config"
import packageJson from "./package.json" with { type: "json" }
import { handleRedditRequest } from "./lib/redditProxy.js"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },

  plugins: [
    react(),
    {
      name: "reddit-rss-proxy",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url?.startsWith("/api")) {
            next()
            return
          }

          try {
            const url = new URL(req.url, "http://localhost")
            const redditPath = url.pathname.replace(/^\/api/, "")
            const data = await handleRedditRequest(redditPath, url.search)

            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(data))
          } catch (error) {
            const message =
              error instanceof Error ? error.message : "Internal proxy error"
            const status = message.includes("429") ? 429 : 502

            res.statusCode = status
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ error: message }))
          }
        })
      },
    },
  ],

  test: {
    root: import.meta.dirname,
    name: packageJson.name,
    environment: "jsdom",

    typecheck: {
      enabled: true,
      tsconfig: path.join(import.meta.dirname, "tsconfig.json"),
    },

    globals: true,
    watch: false,
    setupFiles: ["./src/setupTests.ts"],
  },
})


