# FoxitPDFSDK for Web Example - Vue3

These guides are divided into two parts:

- [Part 1: How to run this example](#part-1-how-to-run-this-example)
- [Part 2: How to use FoxitPDFSDK for Web in Vue3](#part-2-how-to-use-foxitpdfsdk-for-web-in-vue3)

## Prerequisites

- [Node.js](https://nodejs.org/en) and [npm](https://docs.npmjs.com/getting-started)
- @foxitsoftware/foxit-pdf-sdk-for-web-library >= 9.0.0

## Part 1: How to run this example

### 1. Clone the repository:
```shell
git clone git@github.com:foxitsoftware/FoxitPDFSDKForWeb-Vue3-Example.git vue3-websdk
```
### 2. Enter the directory and run npm install:
```shell
cd vue3-websdk
npm install
```
### 3. Update the licenseSN and licenseKey values in `vue3-websdk/src/App.vue` with your own licenseSN and licenseKey that you received from sales.
### 4. Run project.
```shell
npm run dev
```
### 5. Start snapshot serve.
Navigate to `vue3-websdk/public/FoxitPDFSDKForWeb/server/snapshot`, and execute:
```shell
npm install
npm run start
```

## Part 2: How to use FoxitPDFSDK for Web in Vue3

### 1. Create project.
Execute the command `npm init vue@latest` and follow the wizard to complete the setup:
- Project name: -> vue3-websdk
- Add TypeScript? -> No
- Add JSX Support? -> No
- Add Vue Router for Single Page Application development? -> No
- Add Pinia for state management? -> No
- Add Vitest for Unit testing? -> No
- Add Cypress for both Unit and End-to-End testing? -> No
- Add ESLint for code quality? -> No
- Add Prettier for code formatting? -> No
### 2. Install dependence.
```shell
cd vue3-websdk
npm install
npm install @foxitsoftware/foxit-pdf-sdk-for-web-library
npm install -D rollup-plugin-copy
```
### 3. Update `vue3-websdk/src/App.vue` to follow.
```vue
<script setup>
import '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.css';
import * as UIExtension from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.full.js';
import preloadJrWorker from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/preload-jr-worker.js';
import {onMounted} from 'vue';

onMounted(() => {
  const licenseSN = 'xxx';
  const licenseKey = 'xxx';

  const readyWorker = preloadJrWorker({
    workerPath: '/FoxitPDFSDKForWeb/lib/',
    enginePath: '../lib/jr-engine/gsdk',
    fontPath: 'http://webpdf.foxitsoftware.com/webfonts/',
    licenseSN: licenseSN,
    licenseKey: licenseKey
  });

  const PDFUI = UIExtension.PDFUI;
  const pdfui = new PDFUI({
    viewerOptions: {
      libPath: '/FoxitPDFSDKForWeb/lib',
      jr: {
        readyWorker: readyWorker
      }
    },
    renderTo: '#pdf-ui',
    appearance: UIExtension.appearances.adaptive,
    fragments: [],
    addons: UIExtension.PDFViewCtrl.DeviceInfo.isMobile ?
        '/FoxitPDFSDKForWeb/lib/uix-addons/allInOne.mobile.js':
        '/FoxitPDFSDKForWeb/lib/uix-addons/allInOne.js'
  });
});
</script>

<template>
  <div class="fv__ui-nav">
    <div class="fv__ui-nav-logo">
      <i class="fv__icon-logo"></i>
    </div>
  </div>
  <div id="pdf-ui"></div>
</template>

<style scoped>
#pdf-ui {
  top: 40px;
  bottom: 0;
  position: absolute;
  width: 100vw;
}
</style>

```
### 4. Update the licenseSN and licenseKey values in `vue3-websdk/src/App.vue` with your own licenseSN and licenseKey that you received from sales.
### 5. Update `vue3-websdk/vite.config.js` to follow.
```js
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
```
### 6. Update `vue3-websdk/src/main.js` to remove Vue3 default style:
```diff
- import './assets/main.css'
+ // import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```
### 7. Run project.
```shell
npm run dev
```
### 8. Start snapshot serve.
Navigate to `vue3-websdk/public/FoxitPDFSDKForWeb/server/snapshot`, and execute:
```shell
npm install
npm run start
```
