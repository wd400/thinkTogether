(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{375:function(t,n,e){"use strict";var o=e(376);n.a=o.a},399:function(t,n,e){"use strict";e.d(n,"c",(function(){return y})),e.d(n,"d",(function(){return h})),e.d(n,"e",(function(){return m})),e.d(n,"f",(function(){return _})),e.d(n,"a",(function(){return w})),e.d(n,"b",(function(){return x}));e(21);var o=e(118);function r(){for(var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length,o=new Array(e>1?e-1:0),r=1;r<e;r++)o[r-1]=arguments[r];return(t=Array()).concat.apply(t,[n].concat(o))}function l(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top center 0",e=arguments.length>2?arguments[2]:void 0;return{name:t,functional:!0,props:{group:{type:Boolean,default:!1},hideOnLeave:{type:Boolean,default:!1},leaveAbsolute:{type:Boolean,default:!1},mode:{type:String,default:e},origin:{type:String,default:n}},render:function(n,e){var l="transition".concat(e.props.group?"-group":""),data={props:{name:t,mode:e.props.mode},on:{beforeEnter:function(t){t.style.transformOrigin=e.props.origin,t.style.webkitTransformOrigin=e.props.origin}}};return e.props.leaveAbsolute&&(data.on.leave=r(data.on.leave,(function(t){var n=t.offsetTop,e=t.offsetLeft,o=t.offsetWidth,r=t.offsetHeight;t._transitionInitialStyles={position:t.style.position,top:t.style.top,left:t.style.left,width:t.style.width,height:t.style.height},t.style.position="absolute",t.style.top=n+"px",t.style.left=e+"px",t.style.width=o+"px",t.style.height=r+"px"})),data.on.afterLeave=r(data.on.afterLeave,(function(t){if(t&&t._transitionInitialStyles){var n=t._transitionInitialStyles,e=n.position,o=n.top,r=n.left,l=n.width,c=n.height;delete t._transitionInitialStyles,t.style.position=e||"",t.style.top=o||"",t.style.left=r||"",t.style.width=l||"",t.style.height=c||""}}))),e.props.hideOnLeave&&(data.on.leave=r(data.on.leave,(function(t){t._initialDisplay=t.style.display,t.style.display="none"})),data.on.afterLeave=r(data.on.afterLeave,(function(t){t&&(t.style.display=t._initialDisplay||"")}))),n(l,Object(o.a)(e.data,data),e.children)}}}function c(t,n){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"in-out";return{name:t,functional:!0,props:{mode:{type:String,default:e}},render:function(e,r){return e("transition",Object(o.a)(r.data,{props:{name:t},on:n}),r.children)}}}var f=e(2),d=e(1),v=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=n?"width":"height",o="offset".concat(Object(d.x)(e));return{beforeEnter:function(t){t._parent=t.parentNode,t._initialStyle=Object(f.a)({transition:t.style.transition,overflow:t.style.overflow},e,t.style[e])},enter:function(n){var r=n._initialStyle;n.style.setProperty("transition","none","important"),n.style.overflow="hidden";var l="".concat(n[o],"px");n.style[e]="0",n.offsetHeight,n.style.transition=r.transition,t&&n._parent&&n._parent.classList.add(t),requestAnimationFrame((function(){n.style[e]=l}))},afterEnter:l,enterCancelled:l,leave:function(t){t._initialStyle=Object(f.a)({transition:"",overflow:t.style.overflow},e,t.style[e]),t.style.overflow="hidden",t.style[e]="".concat(t[o],"px"),t.offsetHeight,requestAnimationFrame((function(){return t.style[e]="0"}))},afterLeave:r,leaveCancelled:r};function r(n){t&&n._parent&&n._parent.classList.remove(t),l(n)}function l(t){var n=t._initialStyle[e];t.style.overflow=t._initialStyle.overflow,null!=n&&(t.style[e]=n),delete t._initialStyle}},y=(l("carousel-transition"),l("carousel-reverse-transition"),l("tab-transition"),l("tab-reverse-transition"),l("menu-transition"),l("fab-transition","center center","out-in")),h=(l("dialog-transition"),l("dialog-bottom-transition"),l("dialog-top-transition"),l("fade-transition")),m=l("scale-transition"),_=(l("scroll-x-transition"),l("scroll-x-reverse-transition"),l("scroll-y-transition"),l("scroll-y-reverse-transition"),l("slide-x-transition")),w=(l("slide-x-reverse-transition"),l("slide-y-transition"),l("slide-y-reverse-transition"),c("expand-transition",v())),x=c("expand-x-transition",v("",!0))},409:function(t,n,e){"use strict";var o=e(2),r=e(0);var l=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"value",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"change";return r.a.extend({name:"proxyable",model:{prop:t,event:n},props:Object(o.a)({},t,{required:!1}),data:function(){return{internalLazyValue:this[t]}},computed:{internalValue:{get:function(){return this.internalLazyValue},set:function(t){t!==this.internalLazyValue&&(this.internalLazyValue=t,this.$emit(n,t))}}},watch:Object(o.a)({},t,(function(t){this.internalLazyValue=t}))})}();n.a=l},433:function(t,n,e){"use strict";e.r(n);e(254);var o={data:function(){return{invitations:[]}},props:{},methods:{gotoBoard:function(t){this.$router.push("/board/"+t)},quitBoard:function(t){var n=this;this.$axios.get("/quitboard/"+t).then((function(e){for(var i=0;i<n.invitations.length;i++)if(n.invitations[i].boardid===t){n.invitations.splice(i,1);break}n.$notifier.showMessage({content:n.$t("done"),color:"info"})})).catch((function(t){n.$notifier.showMessage({content:n.$t("error"),color:"error"})}))}},mounted:function(){var t=this;this.$axios.get("/myinvitations").then((function(n){t.invitations=n.data})).catch((function(n){t.$notifier.showMessage({content:t.$t("error"),color:"error"})}))}},r=e(74),l=e(83),c=e.n(l),f=e(392),d=e(376),v=e(438),y=e(428),h=e(439),m=e(393),_=e(447),component=Object(r.a)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("v-list",{staticClass:"overflow-y-auto",staticStyle:{"max-height":"400px","min-width":"200px"}},[e("v-list-item-title",{staticClass:"text-h6"},[t._v("\n            "+t._s(t.$t("my_invitations"))+"\n            ")]),t._v(" "),e("v-list-item-group",{attrs:{color:"primary"}},t._l(t.invitations,(function(n,i){return e("v-list-item",{key:i},[e("v-list-item-content",{on:{click:function(e){return t.gotoBoard(n.boardid)}}},[e("v-list-item-title",{domProps:{textContent:t._s(n.title)}})],1),t._v(" "),e("v-list-item-action",[e("v-btn",{attrs:{"x-small":"",icon:""},on:{click:function(e){return t.quitBoard(n.boardid)}}},[e("v-icon",[t._v("mdi-account-remove")])],1)],1)],1)})),1),t._v(" "),0==t.invitations.length?e("h5",[t._v(t._s(t.$t("no_invitations")))]):t._e()],1)],1)}),[],!1,null,null,null);n.default=component.exports;c()(component,{VBtn:f.a,VIcon:d.a,VList:v.a,VListItem:y.a,VListItemAction:h.a,VListItemContent:m.a,VListItemGroup:_.a,VListItemTitle:m.c})}}]);