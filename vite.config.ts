import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: ['**/*.test.ts', '**/*.test.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'components/index': resolve(__dirname, 'src/components/index.ts'),
        'utils/index': resolve(__dirname, 'src/utils/index.ts'),
        'types/index': resolve(__dirname, 'src/types/index.ts'),
        'theme/index': resolve(__dirname, 'src/theme/index.ts'),
        'auth/index': resolve(__dirname, 'src/auth/index.ts'),
        'testing/index': resolve(__dirname, 'src/testing/index.ts'),
        'assets/index': resolve(__dirname, 'src/assets/index.ts'),
        'data/index': resolve(__dirname, 'src/data/index.ts'),
        'scripts/index': resolve(__dirname, 'src/scripts/index.ts'),
        'scripts/download-fonts': resolve(__dirname, 'src/scripts/download-fonts.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const extension = format === 'es' ? 'js' : 'cjs';
        return `${entryName}.${extension}`;
      },
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'next',
        'tailwindcss',
        /^node:/,
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        preserveModules: false,
        exports: 'named',
      },
    },
    sourcemap: true,
    minify: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@auth': path.resolve(__dirname, './src/auth'),
      '@testing': path.resolve(__dirname, './src/testing'),
    },
  },
});