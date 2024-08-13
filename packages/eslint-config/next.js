const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */

module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        ...[
            '@vercel/style-guide/eslint/node',
            '@vercel/style-guide/eslint/typescript',
            '@vercel/style-guide/eslint/browser',
            '@vercel/style-guide/eslint/react',
            '@vercel/style-guide/eslint/next',
            'eslint-config-turbo',
        ].map(require.resolve),
    ],
    parserOptions: {
        project: true,
    },
    globals: {
        React: true,
        JSX: true,
    },
    settings: {
        'import/resolver': {
            typescript: {
                project,
            },
            node: {
                extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    ignorePatterns: [
        'node_modules/',
        'dist/',
        '.eslintrc.js',
        '**/generated/**', // Ignores generated directories and their contents at any level
        '**/node_modules/**', // Ignores node_modules directories and their contents at any level
        '**/.next/**', // Ignores .next directories and their contents at any level],
    ],
    rules: {
        'import/no-default-export': 'off',
        camelcase: 'off',
        'no-console': 'off',
        '@typescript-eslint/naming-convention': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/no-non-null-assertion': 'off',
        'react/function-component-definition': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-redundant-type-constituents': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        'eslint-comments/no-unused-disable': 'warn',
        'jsx-a11y/no-autofocus': 'off',
        'unicorn/filename-case': [
            'error',
            { cases: { kebabCase: true, pascalCase: true, camelCase: true } },
        ],
    },
};
