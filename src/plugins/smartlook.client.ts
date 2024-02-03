import { onLoad } from '#imports';

/*
export default defineNuxtPlugin({
  name: 'smartlook',
  parallel: true,
  enforce: 'post',
  hooks: {
    'app:created': {
      const nuxtApp = useNuxtApp();
      useNuxtApp.window.smartlook ||
        (function (d) {
          var o = (smartlook = function () {
              o.api.push(arguments);
            }),
            h = d.getElementsByTagName('head')[0];
          var script = document.createElement('script');
          o.api = new Array();
          script.async = true;
          script.type = 'text/javascript';
          script.src = 'https://web-sdk.smartlook.com/recorder.js';
          h.appendChild(c);
        })(document);

      smartlook('init', '3d8cc3fad36fd64fa8461c440815b246c3b75961', {
        region: 'eu',
      });
    }
  }
});
*/

export default defineNuxtPlugin((nuxtApp) => {
  const { smartlookId } = useRuntimeConfig().public;

  useHead({
    script: [
      {
        hid: 'smartlook',
        children: 'window.smartlook||(function(d) { var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName("head")[0]; var c=d.createElement("script");o.api=new Array();c.async=true;c.type="text/javascript"; c.charset="utf-8";c.src="https://web-sdk.smartlook.com/recorder.js";h.appendChild(c); })(document); smartlook("init", ' + smartlookId + ', { region: REGION });', async: true,
      },
    ],
  });
});
