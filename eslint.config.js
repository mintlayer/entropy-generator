import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Node.js globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      'semi': ['error', 'never'],
      'quotes': ['error', 'single', { allowTemplateLiterals: true }],
      'no-const-assign': 'error',
      'no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-new-object': 'error',
      'no-array-constructor': 'error',
      'no-eval': 'error',
      'no-trailing-spaces': 'error',
      'max-params': ['error', 4],
      'max-depth': ['error', 3],
      'eol-last': ['error', 'always'],
    },
  },
]
