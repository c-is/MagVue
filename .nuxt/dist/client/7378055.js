(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{255:function(t,e,r){"use strict";r(34);var o=r(4),n=r(10);e.a={mounted:function(){this.$store.state.widgets&&this.$store.state.widgets.cursor&&this.$store.state.widgets.cursor.reset()},transition:{css:!1,mode:"out-in",leave:function(t,e){return Object(o.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,n.a.to(t.querySelector(".content"),{opacity:0,y:20,duration:.4,ease:"back"});case 2:e();case 3:case"end":return r.stop()}}),r)})))()},beforeEnter:function(t){n.a.set(t,{opacity:0});var content=t.querySelector(".content");content&&n.a.set(content,{opacity:0,y:20})},enter:function(t,e){return Object(o.a)(regeneratorRuntime.mark((function r(){var content;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(content=t.querySelector(".content"),n.a.to(t,{opacity:1,duration:.4}),!content){r.next=6;break}return r.next=5,n.a.to(content,{opacity:1,y:0,duration:.4,ease:"back"});case 5:n.a.set(content,{clearProps:"all"});case 6:e();case 7:case"end":return r.stop()}}),r)})))()}}}},284:function(t,e,r){"use strict";t.exports=function(t,e){return e||(e={}),"string"!=typeof(t=t&&t.__esModule?t.default:t)?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},286:function(t,e,r){var content=r(354);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(15).default)("017da4f2",content,!0,{sourceMap:!1})},291:function(t,e,r){"use strict";r.r(e);var o=r(2),component=Object(o.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",this._g({attrs:{width:"37",height:"15",viewBox:"0 0 37 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},this.$listeners),[e("path",{attrs:{d:"M1 2.062l17.174 11.73m.652-.297L36 1.765",stroke:"#2727FF","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}})])}),[],!1,null,null,null);e.default=component.exports},351:function(t,e,r){t.exports=r.p+"img/home-image-mobile.b235849.png"},352:function(t,e,r){t.exports=r.p+"img/home-image.2a260b6.png"},353:function(t,e,r){"use strict";var o=r(286);r.n(o).a},354:function(t,e,r){var o=r(14),n=r(284),l=r(291),d=r(366);e=o(!1);var c=n(l),m=n(d);e.push([t.i,".home[data-v-5908b254]{position:relative;display:flex;width:100%;height:100vh;overflow:hidden}@media (max-width:992px){.home[data-v-5908b254]{flex-direction:column}}@media (max-width:992px){.home__link[data-v-5908b254]{position:absolute;z-index:2;width:100%;height:auto;padding:0;line-height:2.5;background-color:transparent;box-shadow:none;opacity:0!important}}@media (max-width:992px){.home__link[data-type=industrial][data-v-5908b254]:before{content:url("+c+")}}@media (max-width:992px){.home__link[data-type=visual][data-v-5908b254]:before{content:url("+m+")}}@media (max-width:992px){.home__link[data-v-5908b254]:before{box-shadow:none;opacity:1}}@media (max-width:992px){.home__link span[data-v-5908b254]{text-indent:-9999px}}.home__image-container[data-v-5908b254]{position:fixed;top:50%;right:0;left:0;z-index:2;display:grid;grid-template-rows:repeat(12,6vw);grid-template-columns:repeat(12,minmax(auto,var(--grid-width)));grid-column-gap:var(--gutter-space);justify-content:space-between;padding:0 var(--grid-margin);margin:auto;pointer-events:none;transform:translateY(-50%);will-change:filter}@media (max-width:992px){.home__image-container[data-v-5908b254]{position:absolute;right:0!important;left:0!important;display:block;width:auto;height:auto;text-align:center}}.home__image[data-v-5908b254]{grid-row-start:4;grid-row-end:10;grid-column-start:4;grid-column-end:10;width:100%;max-width:100%;height:100%;-o-object-fit:contain;object-fit:contain}@media (max-width:992px){.home__image[data-v-5908b254]{width:auto;max-width:none;height:36vh;margin-bottom:6.1vh}}.home-category[data-v-5908b254]{display:flex;align-items:center;width:50%;height:100%;color:var(--colour-font-contrast)}.home-category--industrial[data-v-5908b254]{background-color:var(--colour-bg-secondary)}.home-category--visual[data-v-5908b254]{justify-content:flex-end;color:var(--colour-primary);text-align:right;background-color:var(--colour-bg)}@media (max-width:992px){.home-category[data-v-5908b254]{flex-direction:column;justify-content:center;width:100%;height:50%;text-align:center;@apply --grid-mobile}}.home-category__inner[data-v-5908b254]{height:9.33333333333rem;margin-bottom:10vh}@media (max-width:992px){.home-category__inner[data-v-5908b254]{position:relative;display:flex;flex-direction:column;grid-column-start:1;grid-column-end:6;height:auto;margin:0 0 6.1vh}}@media (max-width:992px){.home-category--visual .home-category__inner[data-v-5908b254]{flex-direction:column-reverse}}.home-category__title[data-v-5908b254]{font-size:var(--fsize-xxl)}@media (max-width:992px){.home-category__title[data-v-5908b254]{margin:0;font-size:var(--fsize-xxl-mobile);white-space:nowrap}}@media (max-width:442px){.home-category__title[data-v-5908b254]{font-size:var(--fsize-xl-mobile)}}",""]),t.exports=e},366:function(t,e,r){"use strict";r.r(e);var o=r(2),component=Object(o.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",this._g({attrs:{width:"66",height:"31",viewBox:"0 0 66 31",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},this.$listeners),[e("g",{attrs:{filter:"url(#arrow-up_svg__filter0_d)"}},[e("path",{attrs:{stroke:"#fff","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",d:"M57.615 22.366l-24.249-14"}})]),e("g",{attrs:{filter:"url(#arrow-up_svg__filter1_d)"}},[e("path",{attrs:{stroke:"#fff","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",d:"M32.615 8.366l-24.249 14"}})]),e("defs",[e("filter",{attrs:{id:"arrow-up_svg__filter0_d",x:"25",y:"0",width:"40.981",height:"30.732",filterUnits:"userSpaceOnUse","color-interpolation-filters":"sRGB"}},[e("feFlood",{attrs:{"flood-opacity":"0",result:"BackgroundImageFix"}}),e("feColorMatrix",{attrs:{in:"SourceAlpha",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}}),e("feOffset"),e("feGaussianBlur",{attrs:{stdDeviation:"3.5"}}),e("feColorMatrix",{attrs:{values:"0 0 0 0 0.823529 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0"}}),e("feBlend",{attrs:{in2:"BackgroundImageFix",result:"effect1_dropShadow"}}),e("feBlend",{attrs:{in:"SourceGraphic",in2:"effect1_dropShadow",result:"shape"}})],1),e("filter",{attrs:{id:"arrow-up_svg__filter1_d",x:"0",y:"0",width:"40.981",height:"30.732",filterUnits:"userSpaceOnUse","color-interpolation-filters":"sRGB"}},[e("feFlood",{attrs:{"flood-opacity":"0",result:"BackgroundImageFix"}}),e("feColorMatrix",{attrs:{in:"SourceAlpha",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}}),e("feOffset"),e("feGaussianBlur",{attrs:{stdDeviation:"3.5"}}),e("feColorMatrix",{attrs:{values:"0 0 0 0 0.823529 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0"}}),e("feBlend",{attrs:{in2:"BackgroundImageFix",result:"effect1_dropShadow"}}),e("feBlend",{attrs:{in:"SourceGraphic",in2:"effect1_dropShadow",result:"shape"}})],1)])])}),[],!1,null,null,null);e.default=component.exports},374:function(t,e,r){"use strict";r.r(e);var o={mixins:[r(255).a]},n=(r(353),r(2)),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("main",{staticClass:"main main--home",attrs:{id:"main",role:"main","data-page":"Home"}},[o("article",{staticClass:"home"},[o("section",{staticClass:"home-category home-category--industrial u-inner"},[o("div",{staticClass:"home-category__inner"},[o("h1",{staticClass:"home-category__title"},[t._v("\n          Industrial design\n        ")]),t._v(" "),o("nuxtLink",{directives:[{name:"tilt",rawName:"v-tilt"}],staticClass:"home__link button button--link js-button-standard",attrs:{to:"/industrial","data-type":"industrial","data-colour":"secondary","data-animation":"fadeUp","data-animation-mobile":"fadeDown"}},[o("span",[t._v("See industrial projects")])])],1)]),t._v(" "),o("section",{staticClass:"home-category home-category--visual u-inner"},[o("div",{staticClass:"home-category__inner"},[o("h1",{staticClass:"home-category__title"},[t._v("\n          3D/2D design\n        ")]),t._v(" "),o("nuxtLink",{directives:[{name:"tilt",rawName:"v-tilt"}],staticClass:"home__link button button--link js-button-standard",attrs:{to:"/visual","data-type":"visual","data-colour":"primary","data-animation":"fadeUp"}},[o("span",[t._v("See design projects")])])],1)])]),t._v(" "),o("div",{staticClass:"home__image-container js-anim-main-image-container"},[t.$store.state.status.isMobile?o("img",{staticClass:"home__image main-image--graphic js-anim-main-image-mobile",attrs:{id:"texture-mobile",src:r(351),alt:"Jigen"}}):o("img",{staticClass:"home__image main-image--graphic js-anim-main-image",attrs:{id:"texture",src:r(352),alt:"Jigen"}})])])}),[],!1,null,"5908b254",null);e.default=component.exports}}]);