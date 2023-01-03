import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'EntropyGenerator',
      fileName: 'entropy-generator'
    },
    rollupOptions: {
      external: ['buffer'],
      output: {
        globals: {
          buffer: 'Buffer',
        },
      },
    },
  },
})
