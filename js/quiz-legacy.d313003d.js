(self["webpackChunkquiz_app"]=self["webpackChunkquiz_app"]||[]).push([[541],{8033:function(r,t,e){"use strict";e.r(t),e.d(t,{default:function(){return l}});var n=function(){var r=this,t=r.$createElement,e=r._self._c||t;return e("section",[e("base-card",[e("h1",[r._v("The Quiz")]),e("p",[r._v("Try not to lose...")]),e("transition",{attrs:{name:"quiz-route",mode:"out-in"}},[e("router-view",{key:r.$route.fullPath})],1)],1)],1)},o=[],i=e(3019),u=(e(4916),e(5306),e(629)),c={props:{id:{type:String,required:!0}},computed:(0,i.Z)({},(0,u.rn)("quiz",["sortedQuestions"])),created:function(){0===this.sortedQuestions.length&&this.$router.replace("/quiz-setup")}},a=c,f=e(1001),s=(0,f.Z)(a,n,o,!1,null,"83099974",null),l=s.exports},1530:function(r,t,e){"use strict";var n=e(8710).charAt;r.exports=function(r,t,e){return t+(e?n(r,t).length:1)}},8533:function(r,t,e){"use strict";var n=e(2092).forEach,o=e(9341),i=o("forEach");r.exports=i?[].forEach:function(r){return n(this,r,arguments.length>1?arguments[1]:void 0)}},7007:function(r,t,e){"use strict";e(4916);var n=e(1702),o=e(1320),i=e(2261),u=e(7293),c=e(5112),a=e(8880),f=c("species"),s=RegExp.prototype;r.exports=function(r,t,e,l){var v=c(r),p=!u((function(){var t={};return t[v]=function(){return 7},7!=""[r](t)})),h=p&&!u((function(){var t=!1,e=/a/;return"split"===r&&(e={},e.constructor={},e.constructor[f]=function(){return e},e.flags="",e[v]=/./[v]),e.exec=function(){return t=!0,null},e[v](""),!t}));if(!p||!h||e){var d=n(/./[v]),g=t(v,""[r],(function(r,t,e,o,u){var c=n(r),a=t.exec;return a===i||a===s.exec?p&&!u?{done:!0,value:d(t,e,o)}:{done:!0,value:c(e,t,o)}:{done:!1}}));o(String.prototype,r,g[0]),o(s,v,g[1])}l&&a(s[v],"sham",!0)}},647:function(r,t,e){var n=e(1702),o=e(7908),i=Math.floor,u=n("".charAt),c=n("".replace),a=n("".slice),f=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,s=/\$([$&'`]|\d{1,2})/g;r.exports=function(r,t,e,n,l,v){var p=e+r.length,h=n.length,d=s;return void 0!==l&&(l=o(l),d=f),c(v,d,(function(o,c){var f;switch(u(c,0)){case"$":return"$";case"&":return r;case"`":return a(t,0,e);case"'":return a(t,p);case"<":f=l[a(c,1,-1)];break;default:var s=+c;if(0===s)return o;if(s>h){var v=i(s/10);return 0===v?o:v<=h?void 0===n[v-1]?u(c,1):n[v-1]+u(c,1):o}f=n[s-1]}return void 0===f?"":f}))}},7651:function(r,t,e){var n=e(7854),o=e(6916),i=e(9670),u=e(614),c=e(4326),a=e(2261),f=n.TypeError;r.exports=function(r,t){var e=r.exec;if(u(e)){var n=o(e,r,t);return null!==n&&i(n),n}if("RegExp"===c(r))return o(a,r,t);throw f("RegExp#exec called on incompatible receiver")}},7327:function(r,t,e){"use strict";var n=e(2109),o=e(2092).filter,i=e(1194),u=i("filter");n({target:"Array",proto:!0,forced:!u},{filter:function(r){return o(this,r,arguments.length>1?arguments[1]:void 0)}})},5003:function(r,t,e){var n=e(2109),o=e(7293),i=e(5656),u=e(1236).f,c=e(9781),a=o((function(){u(1)})),f=!c||a;n({target:"Object",stat:!0,forced:f,sham:!c},{getOwnPropertyDescriptor:function(r,t){return u(i(r),t)}})},9337:function(r,t,e){var n=e(2109),o=e(9781),i=e(3887),u=e(5656),c=e(1236),a=e(6135);n({target:"Object",stat:!0,sham:!o},{getOwnPropertyDescriptors:function(r){var t,e,n=u(r),o=c.f,f=i(n),s={},l=0;while(f.length>l)e=o(n,t=f[l++]),void 0!==e&&a(s,t,e);return s}})},7941:function(r,t,e){var n=e(2109),o=e(7908),i=e(1956),u=e(7293),c=u((function(){i(1)}));n({target:"Object",stat:!0,forced:c},{keys:function(r){return i(o(r))}})},5306:function(r,t,e){"use strict";var n=e(2104),o=e(6916),i=e(1702),u=e(7007),c=e(7293),a=e(9670),f=e(614),s=e(9303),l=e(7466),v=e(1340),p=e(4488),h=e(1530),d=e(8173),g=e(647),b=e(7651),y=e(5112),O=y("replace"),x=Math.max,w=Math.min,$=i([].concat),j=i([].push),m=i("".indexOf),E=i("".slice),P=function(r){return void 0===r?r:String(r)},k=function(){return"$0"==="a".replace(/./,"$0")}(),q=function(){return!!/./[O]&&""===/./[O]("a","$0")}(),z=!c((function(){var r=/./;return r.exec=function(){var r=[];return r.groups={a:"7"},r},"7"!=="".replace(r,"$<a>")}));u("replace",(function(r,t,e){var i=q?"$":"$0";return[function(r,e){var n=p(this),i=void 0==r?void 0:d(r,O);return i?o(i,r,n,e):o(t,v(n),r,e)},function(r,o){var u=a(this),c=v(r);if("string"==typeof o&&-1===m(o,i)&&-1===m(o,"$<")){var p=e(t,u,c,o);if(p.done)return p.value}var d=f(o);d||(o=v(o));var y=u.global;if(y){var O=u.unicode;u.lastIndex=0}var k=[];while(1){var q=b(u,c);if(null===q)break;if(j(k,q),!y)break;var z=v(q[0]);""===z&&(u.lastIndex=h(c,l(u.lastIndex),O))}for(var D="",_=0,S=0;S<k.length;S++){q=k[S];for(var A=v(q[0]),I=x(w(s(q.index),c.length),0),M=[],Q=1;Q<q.length;Q++)j(M,P(q[Q]));var R=q.groups;if(d){var T=$([A],M,I,c);void 0!==R&&j(T,R);var Z=v(n(o,void 0,T))}else Z=g(A,c,I,M,R,o);I>=_&&(D+=E(c,_,I)+Z,_=I+A.length)}return D+E(c,_)}]}),!z||!k||q)},4747:function(r,t,e){var n=e(7854),o=e(8324),i=e(8509),u=e(8533),c=e(8880),a=function(r){if(r&&r.forEach!==u)try{c(r,"forEach",u)}catch(t){r.forEach=u}};for(var f in o)o[f]&&a(n[f]&&n[f].prototype);a(i)},3019:function(r,t,e){"use strict";e.d(t,{Z:function(){return i}});e(7941),e(2526),e(7327),e(1539),e(5003),e(4747),e(9337);function n(r,t,e){return t in r?Object.defineProperty(r,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):r[t]=e,r}function o(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function i(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?o(Object(e),!0).forEach((function(t){n(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):o(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}}}]);
//# sourceMappingURL=quiz-legacy.d313003d.js.map