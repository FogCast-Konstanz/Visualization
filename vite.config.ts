import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react()
    ],
    server: {
        watch: {
            usePolling: true,
        },
    },
    build: {
        outDir: 'dist',
        target: 'esnext',
        // Optimize chunk splitting for better caching
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    plotly: ['plotly.js', 'react-plotly.js'],
                    ui: ['@chakra-ui/react', '@emotion/react', '@emotion/styled'],
                    utils: ['axios', 'react-router-dom', 'react-i18next']
                }
            }
        },
        // Enable source maps only in development
        sourcemap: false,
        // Optimize CSS
        cssCodeSplit: true,
        // Increase chunk size warning limit
        chunkSizeWarningLimit: 1000
    },
    // Optimize dependency pre-bundling
    optimizeDeps: {
        include: ['react', 'react-dom', 'plotly.js', '@chakra-ui/react'],
        exclude: ['three']
    }
})