if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"4d27364428f8717f4085f4bdafb38e8b"},{url:"/_next/static/6dK9JhM3RQXaVKVG-b4-x/_buildManifest.js",revision:"e0a21c7d7f93d89dce16df0231dc76f2"},{url:"/_next/static/6dK9JhM3RQXaVKVG-b4-x/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/69-a88dc7a4b3f8858b.js",revision:"6dK9JhM3RQXaVKVG-b4-x"},{url:"/_next/static/chunks/7-39fa612ffe2fdc43.js",revision:"6dK9JhM3RQXaVKVG-b4-x"},{url:"/_next/static/chunks/795d4814-2aff3a7e0340a154.js",revision:"6dK9JhM3RQXaVKVG-b4-x"},{url:"/_next/static/chunks/901-c6ff7121723aaa5f.js",revision:"6dK9JhM3RQXaVKVG-b4-x"},{url:"/_next/static/chunks/9c4e2130-7f44744243bc4351.js",revision:"6dK9JhM3RQXaVKVG-b4-x"},{url:"/_next/static/chunks/app/_not-found-c47cc8a42fc37d26.js",revision:"6dK9JhM3RQXaVKVG-b4-x"},{url:"/_next/static/chunks/app/layout-0e0ee8b006b16dd4.js",revision:"6dK9JhM3RQXaVKVG-b4-x"},{url:"/_next/static/chunks/app/menu/page-a8fe5e24d366b127.js",revision:"6dK9JhM3RQXaVKVG-b4-x"},{url:"/_next/static/chunks/app/page-92181ef7c858b2dc.js",revision:"6dK9JhM3RQXaVKVG-b4-x"},{url:"/_next/static/chunks/app/search/page-a6414c1651ec7216.js",revision:"6dK9JhM3RQXaVKVG-b4-x"},{url:"/_next/static/chunks/fd9d1056-b34e90ae3fbd908b.js",revision:"6dK9JhM3RQXaVKVG-b4-x"},{url:"/_next/static/chunks/framework-aec844d2ccbe7592.js",revision:"6dK9JhM3RQXaVKVG-b4-x"},{url:"/_next/static/chunks/main-6a8ffcde73dc61e5.js",revision:"6dK9JhM3RQXaVKVG-b4-x"},{url:"/_next/static/chunks/main-app-349f7e327685a92b.js",revision:"6dK9JhM3RQXaVKVG-b4-x"},{url:"/_next/static/chunks/pages/_app-75f6107b0260711c.js",revision:"6dK9JhM3RQXaVKVG-b4-x"},{url:"/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",revision:"6dK9JhM3RQXaVKVG-b4-x"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-4c492a825beec045.js",revision:"6dK9JhM3RQXaVKVG-b4-x"},{url:"/_next/static/css/fe057171d3abf06b.css",revision:"fe057171d3abf06b"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/aggiemenus.svg",revision:"36229b2ba3e11044c914931543a86a71"},{url:"/aggiemenus2.svg",revision:"b050d503b6bbcd1b839d12a1712be587"},{url:"/apple-touch-icon.png",revision:"8a7efebace341c7239d161c007b3ad3c"},{url:"/cowlog512.png",revision:"8006b3ec930c9f7a5b397c8202317036"},{url:"/cowlogo.png",revision:"3a2f6efb0bee7f5f95911342af524829"},{url:"/cowlogo192.png",revision:"32feea74ca44f07cf7a910c90712cf8a"},{url:"/cowlogo256.png",revision:"b9734202dd80414a2d6637ddf327e203"},{url:"/cowlogo384.png",revision:"7a085da97a3476ca7b4c448981aad0c5"},{url:"/favicon.ico",revision:"a14c1123a04d5a250fb7733e43628c5e"},{url:"/manifest.json",revision:"b8e0ef9f23e80acf536ab27e51d751f0"},{url:"/maskable_icon_x72.png",revision:"eb216ce72b1f12556dc3c2a07d065276"},{url:"/navbar.png",revision:"3b4d2de5028ca38344ba79bb68190f54"},{url:"/navbar2.png",revision:"9d2931b38d9e24c1d8601e8b9a77af7f"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
