import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'pub/**',
      'docs/assets/**',
      'server.js',
      'src/calendar.js',
      'src/legacy-calendar-proto.js',
      'src/legacy-calendar-proto.ts',
    ],
  },
  {
    rules: {
      // keep it light; we mainly want CI guardrails
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]
