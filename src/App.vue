<script setup>
  import '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.css';
  import * as UIExtension from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.full.js';
  import preloadJrWorker from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/preload-jr-worker.js';
  import {onMounted} from 'vue';
  
  onMounted(() => {
    const licenseSN = 'eW+ClDOpetMn7F/uqJWKhcUFFOc+lwzymA7+kQ3sNUd9FT+HUiSSzA==';
    const licenseKey = 'PjwcmTSwMV6sbxteo9dUmPnl4dDL7RBsIdhQtVrCDwKL7oKzVbgK2Vw3gcObwQBsvOaH5mJnlqXFpLW+ILD056J5r6//UzG1pD6ZQWKiItcPWzXHB8zCr8/E5snANGsRk39TLChpU4IIGK22gGQ++xUjMBhH7smskJvWwiHeb5ppNbKIPcXO3bRcT7WSfAdLhgnPUIsvbYmn7fgh/LBx2I8IiBI7kc4wH5W+BV2HxfYLDIhnEQSyWjhg2pxBvfwtN1lELuMiPkVb4hS0PwCojNKkFn05xBR1SZXnYSB8PKVoxBBesY8bRa/ZcyiEZpoysf1ifd37RzqLmSR/H8GGTpp5DJwqJkVf8rdjgSeWfmJU18kVqfHF66sOss/NKhMIXUQzB7vzXEle0Ux+vIJ1gcA1OMsN7XSdvcsPek/5qchrhzsT7ZThlgKGKn2krRQqS5HmWvzZCFhmMwgAZEH+1pO+FcH/PEs1TUxeUhUfdRsDmlL+/KGH351vQLX0Vfk8GSXCcIjdpRnbgK42/Hc8xKI1BdP+C4Xnitx2FSHPQ5JfmsnCzqcSBY7ZrwRvPoGkmFc0O+NWVycqwPqtkbx56zKIZNj66PdgTHumSGrXfpQ0odXQafmCEkFBWqufMA2tiEY73vgeTLJhDAd5KjqsdI04FB0YM9T/ol5SEu9RUe/Jr9Lzn2FNJec+eml6U4oRyGOiQB6V56FE3cbx+BJIl7E03mmScUNz6EVfWvz6EOd20fZe5vEH77IEMnVrhuD3EQDXFOod0JBdDJN9WFrefdex+IWhtnCstnOZoYpa3+N9uzHeuq9j5TPd10W3iql+LVgwJGkSsYYAskcX+3LxGhtZLK4VRj35qx/rgb9AxQn8yHRq1Zi3Ev4zEIQoKaIgXmsjBkdpuyEGPjWNtTMjKYHd1yGd+DR4zmb1zS01VEGBYRB59mhTvMdxC8Rmdcw42xBt24+quXZXIqsWauPOU2xEZhC+mTsqFJ1FZOq1oflHUtCXhFbBcovj8SuYuaFAZ8dt7QXIW8qb4UCT21YqasS0izM0NbstLl8OOo5LTPz5Jx4xNZmaxXRYyY3PcduVwvGpcTcNrelmL0sv4MqklpPvUO9UTMvjbPy4pwxTWfTDgN2uCgtY8TItICZVlMG4pc/kYalLcXRw29WW9DwpWmunTfRIFr6zwJI1f4Q0lL2LyxlMbCHXsxD3tLOzTRz10nL2RMuP7XdeXalymZXu60mtwvpiHpG41c4z+lj7jz6V/pJl';

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

    pdfui.openPDFByHttpRangeRequest({
      range: {
        url: '/FoxitPDFSDKforWeb_DemoGuide.pdf',
      }
    }, {fileName: 'FoxitPDFSDKforWeb_DemoGuide.pdf'});
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
