import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: path.resolve(__dirname, 'build'),
        base: '/typexlsx/',
    },
});
