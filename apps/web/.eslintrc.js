// /** @type {import("eslint").Linter.Config} */
// module.exports = {
//   root: true,
//   extends: ["@repo/eslint-config/next.js"],
//   parser: "@typescript-eslint/parser",
//   parserOptions: {
//     project: true,
//   },
//   settings: {
//     "import/resolver": {
//       typescript: {
//         project: "./tsconfig.json",
//       }
//     }
//   }
// };

/** @type {import("eslint").Linter.Config} */
const path = require('path');

module.exports = {
  root: true,
  extends: ['@repo/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: path.resolve(__dirname, './tsconfig.json'),
      },
    },
  },
};
