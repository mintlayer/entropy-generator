import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      // eslint-disable-next-line no-undef
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'EntropyGenerator',
      fileName: 'entropy-generator'
    },
    rollupOptions: {
      external: ['buffer', 'crypto', 'node:crypto'],
      output: {
        globals: {
          buffer: 'Buffer',
          crypto: 'crypto',
          'node:crypto': 'crypto',
        },
      },
    },
  },
})
