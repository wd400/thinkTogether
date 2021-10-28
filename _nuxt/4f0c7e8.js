(window.webpackJsonp=window.webpackJsonp||[]).push([[24,7,11,14],{392:function(t,e,n){"use strict";n(19);e.a={required:function(t){return function(e){return e&&e.length>0||"You must input a ".concat(t)}},minLength:function(t,e){return function(n){return n&&n.length>=e||"".concat(t," must be at least ").concat(e," characters")}},maxLength:function(t,e){return function(n){return n&&n.length<=e||"".concat(t," must be less than ").concat(e," characters")}},emailFormat:function(){var t=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/;return function(e){return e&&t.test(e)||"Must be a valid email"}}}},396:function(t,e,n){"use strict";n.r(e);n(13),n(8),n(17),n(21),n(18),n(22);var r=n(2),o=(n(19),n(392));function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d={props:{destination:{type:Object,required:!0},title:{type:String,default:null},needed:{type:Boolean,default:!0}},data:function(){return l(l({show:!1},o.a),{},{rules:[]})},methods:{getTitle:function(){var t;return null!==(t=this.title)&&void 0!==t?t:this.$t("password")}},created:function(){this.rules=[this.minLength("password",8)],this.needed&&this.rules.concat(this.required("password"))}},h=n(74),f=n(83),v=n.n(f),m=n(414),component=Object(h.a)(d,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("v-text-field",{attrs:{type:t.show?"text":"password","append-icon":t.show?"mdi-eye":"mdi-eye-off",label:t.getTitle(),rules:t.rules},on:{"click:append":function(e){t.show=!t.show}},model:{value:t.destination.password,callback:function(e){t.$set(t.destination,"password",e)},expression:"destination.password"}})}),[],!1,null,null,null);e.default=component.exports;v()(component,{VTextField:m.a})},398:function(t,e,n){"use strict";n.r(e);n(13),n(8),n(17),n(21),n(18),n(22);var r=n(2),o=n(392);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var l={data:function(){return function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({valid:!1,loginInfo:{email:"",password:""}},o.a)},props:["submitForm","buttonText","hasName"]},d=l,h=n(74),f=n(83),v=n.n(f),m=n(390),w=(n(41),n(59),n(188),n(68),n(100),n(28)),_=n(118),$=n(187);function y(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function x(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var O=Object(w.a)(_.a,Object($.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},n={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=input.$watch("shouldValidate",(function(r){r&&(t.errorBag.hasOwnProperty(input._uid)||(n.valid=e(input)))})):n.valid=e(input),n},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:x({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}}),k=n(414),component=Object(h.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-form",{model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[t.hasName?n("v-text-field",{attrs:{label:t.$t("name"),rules:[t.required("name"),t.minLength("name",1)]},model:{value:t.loginInfo.name,callback:function(e){t.$set(t.loginInfo,"name",e)},expression:"loginInfo.name"}}):t._e(),t._v(" "),n("v-text-field",{attrs:{label:t.$t("email"),rules:[t.required("email"),t.emailFormat()]},model:{value:t.loginInfo.email,callback:function(e){t.$set(t.loginInfo,"email",e)},expression:"loginInfo.email"}}),t._v(" "),n("PasswordField",{attrs:{destination:t.loginInfo}}),t._v(" "),n("v-btn",{attrs:{disabled:!t.valid},on:{click:function(e){return t.submitForm(t.loginInfo)}}},[t._v(t._s(t.buttonText))])],1)}),[],!1,null,"0b9ada7b",null);e.default=component.exports;v()(component,{PasswordField:n(396).default}),v()(component,{VBtn:m.a,VForm:O,VTextField:k.a})},399:function(t,e,n){"use strict";n.r(e);n(51),n(19);var r={props:{reportType:{type:String,required:!0},id:{type:Number,required:!0},cellId:{type:Number,required:!1},callback:{required:!0}},data:function(){return{detail:null,select:null,items:[{state:this.$t("advertising"),abbr:1},{state:this.$t("spam"),abbr:2},{state:this.$t("other"),abbr:3}]}},methods:{sendReport:function(){var t=this;if(null==this.select)this.$notifier.showMessage({content:this.$t("error"),color:"error"});else{var e="report".concat(this.reportType,"/").concat(this.id);"cell"==this.reportType&&(e+="/".concat(this.cellId)),this.$axios.post(e,{reason:this.select.abbr,detail:this.detail}).then((function(e){t.$notifier.showMessage({content:t.$t("done"),color:"info"}),t.callback()})).catch((function(e){t.$notifier.showMessage({content:t.$t("error"),color:"error"})}))}}}},o=n(74),c=n(83),l=n.n(c),d=n(390),h=n(376),f=n(489),v=n(423),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-select",{attrs:{items:t.items,"item-text":"state","item-value":"abbr",label:t.$t("reason"),"persistent-hint":"","return-object":"","single-line":""},model:{value:t.select,callback:function(e){t.select=e},expression:"select"}}),t._v(" "),n("v-textarea",{attrs:{counter:"",maxlength:"100",label:t.$t("details"),outlined:"","full-width":!0,required:""},model:{value:t.detail,callback:function(e){t.detail=e},expression:"detail"}}),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){return t.sendReport()}}},[n("v-icon",[t._v("mdi-send")])],1)],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{VBtn:d.a,VIcon:h.a,VSelect:f.a,VTextarea:v.a})},431:function(t,e,n){"use strict";n.r(e);n(254);var r={data:function(){return{invitations:[]}},props:{},methods:{gotoBoard:function(t){this.$router.push("/board/"+t)},quitBoard:function(t){var e=this;this.$axios.get("/quitboard/"+t).then((function(n){for(var i=0;i<e.invitations.length;i++)if(e.invitations[i].boardid===t){e.invitations.splice(i,1);break}e.$notifier.showMessage({content:e.$t("done"),color:"info"})})).catch((function(t){e.$notifier.showMessage({content:e.$t("error"),color:"error"})}))}},mounted:function(){var t=this;this.$axios.get("/myinvitations").then((function(e){t.invitations=e.data})).catch((function(e){t.$notifier.showMessage({content:t.$t("error"),color:"error"})}))}},o=n(74),c=n(83),l=n.n(c),d=n(390),h=n(376),f=n(436),v=n(426),m=n(437),w=n(391),_=n(445),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-list",{staticClass:"overflow-y-auto",staticStyle:{"max-height":"400px","min-width":"200px"}},[n("v-list-item-title",{staticClass:"text-h6"},[t._v("\n            "+t._s(t.$t("my_invitations"))+"\n            ")]),t._v(" "),n("v-list-item-group",{attrs:{color:"primary"}},t._l(t.invitations,(function(e,i){return n("v-list-item",{key:i},[n("v-list-item-content",{on:{click:function(n){return t.gotoBoard(e.boardid)}}},[n("v-list-item-title",{domProps:{textContent:t._s(e.title)}})],1),t._v(" "),n("v-list-item-action",[n("v-btn",{attrs:{"x-small":"",icon:""},on:{click:function(n){return t.quitBoard(e.boardid)}}},[n("v-icon",[t._v("mdi-account-remove")])],1)],1)],1)})),1),t._v(" "),0==t.invitations.length?n("h5",[t._v(t._s(t.$t("no_invitations")))]):t._e()],1)],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{VBtn:d.a,VIcon:h.a,VList:f.a,VListItem:v.a,VListItemAction:m.a,VListItemContent:w.a,VListItemGroup:_.a,VListItemTitle:w.c})},443:function(t,e,n){"use strict";n.r(e);n(8),n(42),n(254);var r={fetchOnServer:!0,data:function(){return{boards:[],newBoardTemplate:!1,newTitle:"",newDescription:"",newIsPublic:!0,newIsAnonym:!1,newCat:{state:this.$t("other"),abbr:0},selected:-1,editmode:!1,catlist:[{state:this.$t("other"),abbr:0},{state:this.$t("general_reflection"),abbr:1},{state:this.$t("personal_reflection"),abbr:2},{state:this.$t("science"),abbr:3}]}},props:{user:{required:!0}},methods:{FeditMode:function(){this.editmode=!1},TeditMode:function(i){this.selected=i,this.editmode=!0},saveTitle:function(t){this._updateBoardMetadata(t.boardid,t.title,"renameboard")},saveDescription:function(t){this._updateBoardMetadata(t.boardid,t.description,"changedescription")},changePublic:function(t){this._updateBoardMetadata(t.boardid,t.public,"changepublic")},changeAnonym:function(t){this._updateBoardMetadata(t.boardid,t.anonym,"changeanonym")},changeCat:function(t){this._updateBoardMetadata(t.boardid,t.cat.abbr,"changecat")},_updateBoardMetadata:function(t,data,e){var n=this;this.$axios.post("/"+e+"/"+t,{data:data}).then((function(t){n.$notifier.showMessage({content:n.$t("done"),color:"info"})})).catch((function(t){n.$notifier.showMessage({content:n.$t("error"),color:"error"})}))},deleteBoard:function(t){var e=this;this.$axios.get("/deleteboard/"+t).then((function(n){e.editmode=!1;for(var i=0;i<e.boards.length;i++)if(e.boards[i].boardid===t){e.boards.splice(i,1);break}})).catch((function(t){e.$notifier.showMessage({content:e.$t("error"),color:"error"})}))},gotoBoard:function(t){this.$router.push("/board/"+t)},closeNewBoard:function(){this.newBoardTemplate=!1,this.newTitle="",this.newDescription="",this.newIsPublic=!0,this.newIsAnonym=!1,this.newCat={state:this.$t("other"),abbr:0}},sumbitNewBoard:function(){var t=this;this.$axios.post("/newboard",{title:this.newTitle,description:this.newDescription,public:this.newIsPublic,anonym:this.newIsAnonym,cat:this.newCat.abbr}).then((function(e){t.boards.push({boardid:e.data.boardid,title:t.newTitle,description:t.newDescription,cat:t.newCat.abbr}),t.closeNewBoard()})).catch((function(e){t.$notifier.showMessage({content:t.$t("error"),color:"error"})}))}},mounted:function(){var t=this;this.$axios.get("/boards/"+this.user).then((function(e){console.log(e.status),t.boards=e.data})).catch((function(e){301==e.response.status?t.$router.push("/user/me"):t.$notifier.showMessage({content:t.$t("error"),color:"error"})}))}},o=n(74),c=n(83),l=n.n(c),d=n(390),h=n(405),f=n(393),v=n(428),m=n(421),w=n(386),_=n(439),$=n(376),y=n(436),x=n(426),O=n(437),k=n(391),V=n(445),j=n(422),I=n(489),B=n(388),P=n(414),T=n(423),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{staticClass:"mx-auto",attrs:{"min-width":"500","max-width":"700",tile:""}},[t.editmode?n("v-card-title",[n("v-btn",{attrs:{icon:""},on:{click:function(e){return t.FeditMode()}}},[n("v-icon",[t._v("mdi-arrow-left")])],1),t._v(" "),n("h2",[t._v("\n"+t._s(t.$t("edit_properties"))+"\n    ")])],1):n("v-card-title",[n("h2",[t._v("  "+t._s(t.$t("graph_list")))])]),t._v(" "),n("v-divider"),t._v(" "),n("v-list",[n("v-list-item-group",{attrs:{color:"primary"}},[t.editmode?n("v-list-item",{attrs:{inactive:"",selectable:!1,ripple:!1}},[n("v-col",[n("v-row",{attrs:{align:"center"}},[n("v-text-field",{attrs:{counter:"",maxlength:"100",label:t.$t("title")},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.saveTitle.apply(null,arguments)}},model:{value:t.boards[t.selected].title,callback:function(e){t.$set(t.boards[t.selected],"title",e)},expression:"boards[selected].title"}}),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){return t.saveTitle(t.boards[t.selected])}}},[n("v-icon",[t._v("mdi-content-save")])],1)],1),t._v(" "),n("v-row",{attrs:{align:"center"}},[n("v-textarea",{attrs:{counter:"",maxlength:"200",label:t.$t("description")},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.saveDescription.apply(null,arguments)}},model:{value:t.boards[t.selected].description,callback:function(e){t.$set(t.boards[t.selected],"description",e)},expression:"boards[selected].description"}}),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){return t.saveDescription(t.boards[t.selected])}}},[n("v-icon",[t._v("mdi-content-save")])],1)],1),t._v(" "),n("v-row",{attrs:{align:"center"}},[n("v-btn",{attrs:{icon:""},on:{click:function(e){return t.deleteBoard(t.boards[t.selected].boardid)}}},[n("v-icon",[t._v("mdi-delete")])],1),t._v(" "),n("v-spacer"),t._v(" "),n("v-col",[n("v-row",[n("v-checkbox",{attrs:{label:t.$t("public")},on:{change:function(e){return t.changePublic(t.boards[t.selected])}},model:{value:t.boards[t.selected].public,callback:function(e){t.$set(t.boards[t.selected],"public",e)},expression:"boards[selected].public"}}),t._v(" "),n("v-spacer"),t._v(" "),n("v-checkbox",{attrs:{label:t.$t("anonym"),disabled:!t.boards[t.selected].public},on:{change:function(e){return t.changeAnonym(t.boards[t.selected])}},model:{value:t.boards[t.selected].anonym,callback:function(e){t.$set(t.boards[t.selected],"anonym",e)},expression:"boards[selected].anonym"}})],1),t._v(" "),n("v-select",{staticStyle:{width:"250px"},attrs:{items:t.catlist,"item-text":"state","item-value":"abbr",hint:t.$t("category"),"persistent-hint":"","return-object":"","single-line":""},on:{change:function(e){return t.changeCat(t.boards[t.selected])}},model:{value:t.boards[t.selected].cat,callback:function(e){t.$set(t.boards[t.selected],"cat",e)},expression:"boards[selected].cat"}})],1)],1)],1)],1):t._l(t.boards,(function(e,i){return n("v-list-item",{key:i,attrs:{fluid:""}},[n("v-list-item-content",{on:{click:function(n){return t.gotoBoard(e.boardid)}}},[n("v-list-item-title",{domProps:{textContent:t._s(e.title)}}),t._v(" "),n("v-list-item-subtitle",{domProps:{textContent:t._s(e.description)}})],1),t._v(" "),"me"==t.user?n("v-list-item-action",[n("v-btn",{attrs:{icon:""},on:{click:function(e){return t.TeditMode(i)}}},[n("v-icon",[t._v("mdi-dots-vertical")])],1)],1):t._e()],1)}))],2),t._v(" "),0==t.boards.length?n("h5",[t._v(t._s(t.$t("no_graphs")))]):t._e()],1),t._v(" "),"me"==t.user&&t.boards.length<10&&!t.newBoardTemplate&&!t.editmode?n("v-btn",{attrs:{block:""},on:{click:function(e){t.newBoardTemplate=!0}}},[n("v-icon",[t._v("mdi-plus")])],1):t._e(),t._v(" "),t.newBoardTemplate?n("form",{attrs:{"accept-charset":"UTF-8"},on:{submit:function(e){return e.preventDefault(),t.sumbitNewBoard()}}},[n("v-text-field",{attrs:{counter:"",maxlength:"100",label:t.$t("title"),outlined:"","full-width":!0,required:""},model:{value:t.newTitle,callback:function(e){t.newTitle=e},expression:"newTitle"}}),t._v(" "),n("v-textarea",{attrs:{counter:"",maxlength:"200",label:t.$t("description"),outlined:"","full-width":!0,required:""},model:{value:t.newDescription,callback:function(e){t.newDescription=e},expression:"newDescription"}}),t._v(" "),n("v-container",{attrs:{fluid:""}},[n("v-col",[n("v-row",[n("v-checkbox",{attrs:{label:t.$t("public")},model:{value:t.newIsPublic,callback:function(e){t.newIsPublic=e},expression:"newIsPublic"}}),t._v(" "),n("v-checkbox",{attrs:{label:t.$t("anonym")},model:{value:t.newIsAnonym,callback:function(e){t.newIsAnonym=e},expression:"newIsAnonym"}}),t._v(" "),n("v-spacer"),t._v(" "),n("v-select",{attrs:{required:"",items:t.catlist,"item-text":"state","item-value":"abbr",hint:t.$t("category"),"persistent-hint":"","return-object":"","single-line":"",rules:[function(t){return!!t||"Gender is required"}]},model:{value:t.newCat,callback:function(e){t.newCat=e},expression:"newCat"}})],1),t._v(" "),n("v-row",[n("v-btn",{on:{click:function(e){return t.closeNewBoard()}}},[t._v(t._s(t.$t("cancel"))+"\n    ")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{type:"submit"}},[t._v("\n        "+t._s(t.$t("submit"))+"\n      ")])],1)],1)],1)],1):t._e()],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{VBtn:d.a,VCard:h.a,VCardTitle:f.c,VCheckbox:v.a,VCol:m.a,VContainer:w.a,VDivider:_.a,VIcon:$.a,VList:y.a,VListItem:x.a,VListItemAction:O.a,VListItemContent:k.a,VListItemGroup:V.a,VListItemSubtitle:k.b,VListItemTitle:k.c,VRow:j.a,VSelect:I.a,VSpacer:B.a,VTextField:P.a,VTextarea:T.a})},444:function(t,e,n){"use strict";n.r(e);var r={props:{user:{required:!0}},data:function(){return{pseudo:"",score:0,banned:!1}},mounted:function(){var t=this;this.$axios.get("/getuserinfo/"+this.user).then((function(e){t.pseudo=e.data.pseudo,t.score=e.data.score,t.banned=e.data.banned})).catch((function(e){404==e.response.status&&(t.pseudo=t.$t("user404")),t.$notifier.showMessage({content:t.$t("error"),color:"error"})}))}},o=n(74),c=n(83),l=n.n(c),d=n(405),h=n(393),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{attrs:{"max-height":"100"}},[n("v-card-title",[t._v("\n    "+t._s(t.pseudo)+"\n    ")]),t._v(" "),t.banned?n("v-card-subtitle",[t._v("\n    "+t._s(t.$t("banned"))+"\n")]):t._e(),t._v(" "),n("v-card-text",[t._v(t._s(t.$t("score"))+": "+t._s(t.score))])],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{VCard:d.a,VCardSubtitle:h.a,VCardText:h.b,VCardTitle:h.c})},496:function(t,e,n){"use strict";n.r(e);n(51);var r=n(398),o=n(431),c={components:{UserAuthForm:r.default,MyInvitations:o.default},created:function(){if("me"==this.$route.params.user)this.$auth.loggedIn?this.userid="me":this.$router.push("/login");else{var t=Number(this.$route.params.user);isNaN(t)?this.$router.push("/"):this.userid=t}},data:function(){return{userid:0,showReport:!1}},methods:{userReported:function(){this.showReport=!1},setShowReport:function(t){this.showReport=t}}},l=n(74),d=n(83),h=n.n(d),f=n(390),v=n(421),m=n(376),w=n(422),_=n(388),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",[n("BoardList",{attrs:{user:t.userid}}),t._v(" "),n("v-spacer"),t._v(" "),n("v-col",[n("div",[n("UserInfo",{attrs:{user:t.userid}}),t._v(" "),!t.showReport&&"me"!=t.userid&&t.$auth.loggedIn?n("v-btn",{attrs:{"x-small":"",icon:""},on:{click:function(e){return t.setShowReport(!0)}}},[n("v-icon",[t._v("mdi-flag")])],1):t._e(),t._v(" "),t.showReport?n("div",[n("v-btn",{attrs:{"x-small":"",icon:""},on:{click:function(e){return t.setShowReport(!1)}}},[n("v-icon",[t._v("mdi-close")])],1),t._v(" "),n("Report",{attrs:{callback:t.userReported,reportType:"user",id:t.userid}})],1):t._e()],1),t._v(" "),"me"==t.userid?n("MyInvitations"):t._e()],1)],1)}),[],!1,null,"3d886cac",null);e.default=component.exports;h()(component,{BoardList:n(443).default,UserInfo:n(444).default,Report:n(399).default,MyInvitations:n(431).default}),h()(component,{VBtn:f.a,VCol:v.a,VIcon:m.a,VRow:w.a,VSpacer:_.a})}}]);