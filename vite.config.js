import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'node:path';
import { normalizePath } from 'vite';
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    copy({
      targets: [
        {
          src: normalizePath(path.resolve(__dirname, 'node_modules/@foxitsoftware/foxit-pdf-sdk-for-web-library/lib')), 
          dest: normalizePath(path.resolve(__dirname, 'public/FoxitPDFSDKForWeb'))
        },
        {
          src: normalizePath(path.resolve(__dirname, 'node_modules/@foxitsoftware/foxit-pdf-sdk-for-web-library/server')), 
          dest: normalizePath(path.resolve(__dirname, 'public/FoxitPDFSDKForWeb'))
        }
      ],
      hook: 'buildStart'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/snapshot': 'http://localhost:3002',
    }
  }
})
