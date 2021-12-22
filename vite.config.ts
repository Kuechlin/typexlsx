import path from 'path';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import pgk from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [visualizer()],
    build: {
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, 'src', 'typexlsx.ts'),
            name: pgk.name,
            fileName: (format) => `typexlsx.${format}.js`,
        },
    },
});
