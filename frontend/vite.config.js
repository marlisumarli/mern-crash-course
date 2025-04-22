import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/mern-app/',
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
            }
        }
    }
})
