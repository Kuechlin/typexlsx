import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/typexlsx/',
    build: {
        outDir: path.resolve(__dirname, 'build'),
    },
});
