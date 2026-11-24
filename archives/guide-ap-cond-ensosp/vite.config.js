import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // Vite sert index.html pour toute route inconnue dès que appType vaut 'spa'
  // (le défaut) : /emulator n'a donc pas besoin de réécriture côté serveur.
  // `historyApiFallback` n'existe pas dans Vite — c'est une option webpack.
  appType: 'spa',
  server: {
    port: 5173,
    // Sans strictPort, un autre projet occupant 5173 ferait basculer Vite sur
    // 5174 en silence : on ouvrirait alors l'app d'à côté, et sa page 404.
    strictPort: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Guide AP COND ENSOSP',
        short_name: 'AP COND',
        description:
          "Guide de poche de l'adjoint pédagogique conduite — plateau technique ENSOSP",
        lang: 'fr',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#0f172a',
        theme_color: '#dc2626',
        categories: ['education', 'productivity', 'utilities'],
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // L'application est entièrement statique : tout le shell part en précache,
        // ce qui la rend consultable sans réseau sur le plateau.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        // /emulator est une route cliente : elle doit répondre hors ligne aussi.
        navigateFallback: 'index.html',
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
})
