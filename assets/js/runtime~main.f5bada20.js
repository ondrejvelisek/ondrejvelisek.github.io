(()=>{"use strict";var e,t,r,o,a,c={},n={};function i(e){var t=n[e];if(void 0!==t)return t.exports;var r=n[e]={id:e,loaded:!1,exports:{}};return c[e].call(r.exports,r,r.exports,i),r.loaded=!0,r.exports}i.m=c,i.c=n,e=[],i.O=(t,r,o,a)=>{if(!r){var c=1/0;for(u=0;u<e.length;u++){r=e[u][0],o=e[u][1],a=e[u][2];for(var n=!0,f=0;f<r.length;f++)(!1&a||c>=a)&&Object.keys(i.O).every((e=>i.O[e](r[f])))?r.splice(f--,1):(n=!1,a<c&&(c=a));if(n){e.splice(u--,1);var d=o();void 0!==d&&(t=d)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[r,o,a]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},r=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(e,o){if(1&o&&(e=this(e)),8&o)return e;if("object"==typeof e&&e){if(4&o&&e.__esModule)return e;if(16&o&&"function"==typeof e.then)return e}var a=Object.create(null);i.r(a);var c={};t=t||[null,r({}),r([]),r(r)];for(var n=2&o&&e;"object"==typeof n&&!~t.indexOf(n);n=r(n))Object.getOwnPropertyNames(n).forEach((t=>c[t]=()=>e[t]));return c.default=()=>e,i.d(a,c),a},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((t,r)=>(i.f[r](e,t),t)),[])),i.u=e=>"assets/js/"+({13:"5db06913",29:"290b4d58",140:"3b2c478b",235:"a7456010",249:"ccc49370",255:"83c548be",381:"7d1c6188",434:"1a1424c7",472:"814f3328",596:"9192b420",643:"a6aa9e1f",674:"e2b5916c",711:"9e4087bc",858:"36994c47",903:"acecf23e",920:"15932559"}[e]||e)+"."+{13:"b79920a6",29:"5fe28abd",43:"18d0ac0f",140:"ea5e4a9a",235:"9187598e",249:"4dd973f8",255:"96e8e04e",381:"0dddb7b1",434:"99286e0f",472:"32840bb6",596:"028168b1",643:"788158bd",674:"237910b2",711:"fa2b8d01",758:"56ae214e",777:"82925203",858:"9a2a8261",903:"dc73ffa9",920:"e9bbc4bc"}[e]+".js",i.miniCssF=e=>{},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o={},a="@torrta/docs:",i.l=(e,t,r,c)=>{if(o[e])o[e].push(t);else{var n,f;if(void 0!==r)for(var d=document.getElementsByTagName("script"),u=0;u<d.length;u++){var l=d[u];if(l.getAttribute("src")==e||l.getAttribute("data-webpack")==a+r){n=l;break}}n||(f=!0,(n=document.createElement("script")).charset="utf-8",n.timeout=120,i.nc&&n.setAttribute("nonce",i.nc),n.setAttribute("data-webpack",a+r),n.src=e),o[e]=[t];var s=(t,r)=>{n.onerror=n.onload=null,clearTimeout(b);var a=o[e];if(delete o[e],n.parentNode&&n.parentNode.removeChild(n),a&&a.forEach((e=>e(r))),t)return t(r)},b=setTimeout(s.bind(null,void 0,{type:"timeout",target:n}),12e4);n.onerror=s.bind(null,n.onerror),n.onload=s.bind(null,n.onload),f&&document.head.appendChild(n)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.p="/",i.gca=function(e){return e={15932559:"920","5db06913":"13","290b4d58":"29","3b2c478b":"140",a7456010:"235",ccc49370:"249","83c548be":"255","7d1c6188":"381","1a1424c7":"434","814f3328":"472","9192b420":"596",a6aa9e1f:"643",e2b5916c:"674","9e4087bc":"711","36994c47":"858",acecf23e:"903"}[e]||e,i.p+i.u(e)},(()=>{var e={354:0,869:0};i.f.j=(t,r)=>{var o=i.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else if(/^(354|869)$/.test(t))e[t]=0;else{var a=new Promise(((r,a)=>o=e[t]=[r,a]));r.push(o[2]=a);var c=i.p+i.u(t),n=new Error;i.l(c,(r=>{if(i.o(e,t)&&(0!==(o=e[t])&&(e[t]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),c=r&&r.target&&r.target.src;n.message="Loading chunk "+t+" failed.\n("+a+": "+c+")",n.name="ChunkLoadError",n.type=a,n.request=c,o[1](n)}}),"chunk-"+t,t)}},i.O.j=t=>0===e[t];var t=(t,r)=>{var o,a,c=r[0],n=r[1],f=r[2],d=0;if(c.some((t=>0!==e[t]))){for(o in n)i.o(n,o)&&(i.m[o]=n[o]);if(f)var u=f(i)}for(t&&t(r);d<c.length;d++)a=c[d],i.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return i.O(u)},r=self.webpackChunk_torrta_docs=self.webpackChunk_torrta_docs||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})()})();