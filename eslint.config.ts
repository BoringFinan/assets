import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import type { TSESLint } from '@typescript-eslint/utils';

export default tseslint.config(
    {
      ignores: [
        'dist',
        'node_modules',
        'coverage',
        '*.config.ts',
        '*.config.js',
        'eslint.config.ts',
        '*.tsbuildinfo',
        'index.d.ts'
      ],
    },  
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': [
        'warn',
        { allow: ['warn', 'error'] }
      ],
    },
    settings: {
      react: { version: 'detect' },
    },
  }
);
