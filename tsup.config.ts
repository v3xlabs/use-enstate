import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts', 'src/helpers.ts'], // Adjust the entry point based on your project structure
    format: ['cjs', 'esm'], // Generate CommonJS and ECMAScript Modules bundles
    dts: true, // Generate TypeScript declaration files (*.d.ts)
    outDir: 'dist', // Output directory for the generated bundles
    sourcemap: true, // Generate sourcemaps for easier debugging
    splitting: false,
    clean: true,
    minify: true, // Optionally, enable minification
    external: ['swr'], // Mark `swr` as an external module
});
