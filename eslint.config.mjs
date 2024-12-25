import {FlatCompat} from '@eslint/eslintrc';
import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import regexpPlugin from 'eslint-plugin-regexp';
import unicornPlugin from 'eslint-plugin-unicorn';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import gts from 'gts';
import path from 'path';
import tseslint from 'typescript-eslint';
import {fileURLToPath} from 'url';

// Mimic CommonJS variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Translate ESLintRC-style configs into flat configs
const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: eslint.configs.recommended,
});

export default tseslint.config(
  // Register plugins
  {
    plugins: {
      ['@typescript-eslint']: tseslint.plugin,
      ['import']: importPlugin,
      ['jest']: jestPlugin,
      ['jsdoc']: jsdocPlugin,
      ['perfectionist']: perfectionistPlugin,
      ['regexp']: regexpPlugin,
      ['unicorn']: unicornPlugin,
    },

    settings: {
      perfectionist: {
        order: 'asc',
        partitionByComment: true,
        type: 'natural',
      },
    },
  },

  {
    // config with just ignores is the replacement for `.eslintignore`
    ignores: [
      '**/.prettierrc.js',
      '**/jest.config.js',

      '**/build/**',
      '**/dist/**',
      '**/node_modules/**',

      '**/coverage/**',
      '**/fixtures/**',
      '**/__snapshots__/**',
    ],
  },

  // Extends ...
  ...compat.config(gts),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  jsdocPlugin.configs['flat/recommended-typescript'],
  regexpPlugin.configs['flat/recommended'],

  // Base config
  {
    languageOptions: {
      globals: {
        ...globals.es2023,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },

    linterOptions: {reportUnusedDisableDirectives: 'error'},

    rules: {
      //
      // eslint-plugin-import
      //
      // enforces consistent type specifier style for named imports
      'import/consistent-type-specifier-style': 'error',
      // disallow non-import statements appearing before import statements
      'import/first': 'error',
      // Require a newline after the last import/require in a group
      'import/newline-after-import': 'error',
      // Forbid import of modules using absolute paths
      'import/no-absolute-path': 'error',
      // disallow AMD require/define
      'import/no-amd': 'error',
      // forbid default exports - we want to standardize on named exports so that imported names are consistent
      'import/no-default-export': 'error',
      // disallow imports from duplicate paths
      'import/no-duplicates': 'error',
      // Forbid the use of extraneous packages
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: true,
        },
      ],
      // Forbid mutable exports
      'import/no-mutable-exports': 'error',
      // Prevent importing the default as if it were named
      'import/no-named-default': 'error',
      // Prohibit named exports
      'import/no-named-export': 'off', // we want everything to be a named export
      // Forbid a module from importing itself
      'import/no-self-import': 'error',
      // Require modules with a single export to use a default export
      'import/prefer-default-export': 'off', // we want everything to be named

      //
      // eslint-plugin-perfectionist
      //
      'perfectionist/sort-imports': 'error',

      //
      // eslint-plugin-unicorn
      //
      'unicorn/no-length-as-slice-end': 'error',
      'unicorn/no-lonely-if': 'error',
      'unicorn/no-single-promise-in-promise-methods': 'error',
      'unicorn/no-typeof-undefined': 'error',
      'unicorn/no-useless-spread': 'error',
      'unicorn/prefer-array-some': 'error',
      'unicorn/prefer-export-from': 'error',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/prefer-regexp-test': 'error',
      'unicorn/prefer-spread': 'error',
      'unicorn/prefer-string-replace-all': 'error',
      'unicorn/prefer-structured-clone': 'error',
    },
  },

  prettierPlugin,
);
