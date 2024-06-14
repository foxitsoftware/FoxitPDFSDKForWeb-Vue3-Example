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
        },
        messageSyncServiceWorker: {
            options:{
                scope: '/FoxitPDFSDKForWeb/lib/'
            }
        }
      },
      renderTo: '#pdf-ui',
      appearance: UIExtension.appearances.adaptive,
      fragments: [],
      addons: UIExtension.PDFViewCtrl.DeviceInfo.isMobile ?
          '/FoxitPDFSDKForWeb/lib/uix-addons/allInOne.mobile.js':
          '/FoxitPDFSDKForWeb/lib/uix-addons/allInOne.js'
    });

    pdfui.openPDFByHttpRangeRequest({
      range: {
        url: '/FoxitPDFSDKforWeb_DemoGuide.pdf',
      }
    }, {fileName: 'FoxitPDFSDKforWeb_DemoGuide.pdf'});
  });
</script>

<template>
  <div>
    <div class="fv__ui-nav">
      <div class="fv__ui-nav-logo">
        <i class="fv__icon-logo"></i>
      </div>
    </div>
    <div id="pdf-ui"></div>
  </div>
</template>

<style scoped>
#pdf-ui {
  top: 40px;
  bottom: 0;
  position: absolute;
  width: 100vw;
}
</style>
