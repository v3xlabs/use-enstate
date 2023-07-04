import { defineConfig } from 'tsup';

export default defineConfig({
    entryPoints: ['src/index.ts'], // Adjust the entry point based on your project structure
    format: ['cjs', 'esm'], // Generate CommonJS and ECMAScript Modules bundles
    dts: true, // Generate TypeScript declaration files (*.d.ts)
    outDir: 'dist', // Output directory for the generated bundles
    minify: true, // Optionally, enable minification
    sourcemap: true, // Generate sourcemaps for easier debugging
});
