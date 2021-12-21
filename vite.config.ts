import path from 'path';
import { defineConfig } from 'vite';
import pgk from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src', 'typexlsx.ts'),
            name: pgk.name,
            fileName: (format) => `typexlsx.${format}.js`,
        },
    },
});
