(window.webpackJsonp=window.webpackJsonp||[]).push([[17,8,9,11,12,14,16],{388:function(t,e,n){"use strict";n(19);e.a={required:function(t){return function(e){return e&&e.length>0||"You must input a ".concat(t)}},minLength:function(t,e){return function(n){return n&&n.length>=e||"".concat(t," must be at least ").concat(e," characters")}},maxLength:function(t,e){return function(n){return n&&n.length<=e||"".concat(t," must be less than ").concat(e," characters")}},emailFormat:function(){var t=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/;return function(e){return e&&t.test(e)||"Must be a valid email"}}}},391:function(t,e,n){"use strict";n.r(e);n(12),n(8),n(17),n(21),n(18),n(22);var o=n(2),r=(n(19),n(388));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d={props:{destination:{type:Object,required:!0},title:{type:String,default:null},needed:{type:Boolean,default:!0}},data:function(){return c(c({show:!1},r.a),{},{rules:[]})},methods:{getTitle:function(){var t;return null!==(t=this.title)&&void 0!==t?t:this.$t("password")}},created:function(){this.rules=[this.minLength("password",8),this.maxLength("password",30)],this.needed&&this.rules.concat(this.required("password"))}},h=n(74),v=n(83),f=n.n(v),m=n(416),component=Object(h.a)(d,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("v-text-field",{attrs:{type:t.show?"text":"password","append-icon":t.show?"mdi-eye":"mdi-eye-off",label:t.getTitle(),rules:t.rules},on:{"click:append":function(e){t.show=!t.show}},model:{value:t.destination.password,callback:function(e){t.$set(t.destination,"password",e)},expression:"destination.password"}})}),[],!1,null,null,null);e.default=component.exports;f()(component,{VTextField:m.a})},393:function(t,e,n){"use strict";n.r(e);n(12),n(8),n(17),n(21),n(18),n(22);var o=n(2),r=n(388);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var c={data:function(){return function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({valid:!1,loginInfo:{email:"",password:""}},r.a)},props:["submitForm","buttonText","hasName"]},d=c,h=n(74),v=n(83),f=n.n(v),m=n(386),_=(n(41),n(59),n(186),n(68),n(100),n(28)),w=n(118),x=n(185);function y(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function $(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var O=Object(_.a)(w.a,Object(x.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},n={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=input.$watch("shouldValidate",(function(o){o&&(t.errorBag.hasOwnProperty(input._uid)||(n.valid=e(input)))})):n.valid=e(input),n},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:$({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}}),k=n(416),component=Object(h.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-form",{model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[t.hasName?n("v-text-field",{attrs:{label:t.$t("name"),rules:[t.required("name"),t.minLength("name",1),t.maxLength("name",30)]},model:{value:t.loginInfo.name,callback:function(e){t.$set(t.loginInfo,"name",e)},expression:"loginInfo.name"}}):t._e(),t._v(" "),n("v-text-field",{attrs:{label:t.$t("email"),rules:[t.required("email"),t.emailFormat()]},model:{value:t.loginInfo.email,callback:function(e){t.$set(t.loginInfo,"email",e)},expression:"loginInfo.email"}}),t._v(" "),n("PasswordField",{attrs:{destination:t.loginInfo}}),t._v(" "),n("v-btn",{attrs:{disabled:!t.valid},on:{click:function(e){return t.submitForm(t.loginInfo)}}},[t._v(t._s(t.buttonText))])],1)}),[],!1,null,"062259f4",null);e.default=component.exports;f()(component,{PasswordField:n(391).default}),f()(component,{VBtn:m.a,VForm:O,VTextField:k.a})},394:function(t,e,n){"use strict";n.r(e);n(51),n(19);var o={props:{reportType:{type:String,required:!0},id:{type:Number,required:!0},cellId:{type:Number,required:!1},callback:{required:!0}},data:function(){return{detail:null,select:null,items:[{state:this.$t("advertising"),abbr:1},{state:this.$t("spam"),abbr:2},{state:this.$t("other"),abbr:3}]}},methods:{sendReport:function(){var t=this;if(null==this.select)this.$notifier.showMessage({content:this.$t("error"),color:"error"});else{var e="report".concat(this.reportType,"/").concat(this.id);"cell"==this.reportType&&(e+="/".concat(this.cellId)),this.$axios.post(e,{reason:this.select.abbr,detail:this.detail}).then((function(e){t.$notifier.showMessage({content:t.$t("done"),color:"info"}),t.callback()})).catch((function(e){t.$notifier.showMessage({content:t.$t("error"),color:"error"})}))}}}},r=n(74),l=n(83),c=n.n(l),d=n(386),h=n(372),v=n(481),f=n(434),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-select",{attrs:{items:t.items,"item-text":"state","item-value":"abbr",label:t.$t("reason"),"persistent-hint":"","return-object":"","single-line":""},model:{value:t.select,callback:function(e){t.select=e},expression:"select"}}),t._v(" "),n("v-textarea",{attrs:{counter:"",maxlength:"100",label:t.$t("details"),outlined:"","full-width":!0,required:""},model:{value:t.detail,callback:function(e){t.detail=e},expression:"detail"}}),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){return t.sendReport()}}},[n("v-icon",[t._v("mdi-send")])],1)],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VBtn:d.a,VIcon:h.a,VSelect:v.a,VTextarea:f.a})},399:function(t,e,n){var content=n(400);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(31).default)("12a190a6",content,!0,{sourceMap:!1})},400:function(t,e,n){var o=n(30)(!1);o.push([t.i,".v-input--checkbox.v-input--indeterminate.v-input--is-disabled{opacity:.6}.v-input--checkbox.v-input--dense{margin-top:4px}",""]),t.exports=o},401:function(t,e,n){var content=n(402);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(31).default)("2e2bc7da",content,!0,{sourceMap:!1})},402:function(t,e,n){var o=n(30)(!1);o.push([t.i,'.theme--light.v-input--selection-controls.v-input--is-disabled:not(.v-input--indeterminate) .v-icon{color:rgba(0,0,0,.26)!important}.theme--dark.v-input--selection-controls.v-input--is-disabled:not(.v-input--indeterminate) .v-icon{color:hsla(0,0%,100%,.3)!important}.v-input--selection-controls{margin-top:16px;padding-top:4px}.v-input--selection-controls>.v-input__append-outer,.v-input--selection-controls>.v-input__prepend-outer{margin-top:0;margin-bottom:0}.v-input--selection-controls:not(.v-input--hide-details)>.v-input__slot{margin-bottom:12px}.v-input--selection-controls .v-input__slot,.v-input--selection-controls .v-radio{cursor:pointer}.v-input--selection-controls .v-input__slot>.v-label,.v-input--selection-controls .v-radio>.v-label{align-items:center;display:inline-flex;flex:1 1 auto;height:auto}.v-input--selection-controls__input{color:inherit;display:inline-flex;flex:0 0 auto;height:24px;position:relative;transition:.3s cubic-bezier(.25,.8,.5,1);transition-property:transform;width:24px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-input--selection-controls__input .v-icon{width:100%}.v-application--is-ltr .v-input--selection-controls__input{margin-right:8px}.v-application--is-rtl .v-input--selection-controls__input{margin-left:8px}.v-input--selection-controls__input input[role=checkbox],.v-input--selection-controls__input input[role=radio],.v-input--selection-controls__input input[role=switch]{position:absolute;opacity:0;width:100%;height:100%;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-input--selection-controls__input+.v-label{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-input--selection-controls__ripple{border-radius:50%;cursor:pointer;height:34px;position:absolute;transition:inherit;width:34px;left:-12px;top:calc(50% - 24px);margin:7px}.v-input--selection-controls__ripple:before{border-radius:inherit;bottom:0;content:"";position:absolute;opacity:.2;left:0;right:0;top:0;transform-origin:center center;transform:scale(.2);transition:inherit}.v-input--selection-controls__ripple>.v-ripple__container{transform:scale(1.2)}.v-input--selection-controls.v-input--dense .v-input--selection-controls__ripple{width:28px;height:28px;left:-9px}.v-input--selection-controls.v-input--dense:not(.v-input--switch) .v-input--selection-controls__ripple{top:calc(50% - 21px)}.v-input--selection-controls.v-input{flex:0 1 auto}.v-input--selection-controls.v-input--is-focused .v-input--selection-controls__ripple:before,.v-input--selection-controls .v-radio--is-focused .v-input--selection-controls__ripple:before{background:currentColor;transform:scale(1.2)}.v-input--selection-controls__input:hover .v-input--selection-controls__ripple:before{background:currentColor;transform:scale(1.2);transition:none}',""]),t.exports=o},415:function(t,e,n){"use strict";n.r(e);n(51),n(19);var o={props:{boardId:{type:Number,required:!0},cellId:{type:Number,required:!1},callback:{required:!0}},data:function(){return{suggestion:"",isAnonym:!1}},methods:{sendSuggestion:function(){var t=this;this.$axios.post("/makesuggestion/".concat(this.boardId,"/").concat(this.cellId),{anonym:this.isAnonym,suggestion:this.suggestion}).then((function(e){t.$notifier.showMessage({content:t.$t("done"),color:"info"}),t.callback()})).catch((function(e){t.$notifier.showMessage({content:t.$t("error"),color:"error"})}))}}},r=n(74),l=n(83),c=n.n(l),d=n(386),h=n(426),v=n(372),f=n(434),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-textarea",{attrs:{counter:"",maxlength:"100",label:t.$t("suggestion"),outlined:"","full-width":!0,required:""},model:{value:t.suggestion,callback:function(e){t.suggestion=e},expression:"suggestion"}}),t._v(" "),n("v-checkbox",{attrs:{label:t.$t("anonym")},model:{value:t.isAnonym,callback:function(e){t.isAnonym=e},expression:"isAnonym"}}),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){return t.sendSuggestion()}}},[n("v-icon",[t._v("mdi-send")])],1)],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VBtn:d.a,VCheckbox:h.a,VIcon:v.a,VTextarea:f.a})},426:function(t,e,n){"use strict";n(12),n(8),n(17),n(21),n(18),n(22);var o=n(85),r=n(2),l=(n(13),n(63),n(399),n(401),n(371)),c=n(392),d=n(184),h=n(0).a.extend({name:"rippleable",directives:{ripple:d.a},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var data=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(data.staticClass="v-input--selection-controls__ripple",data.directives=data.directives||[],data.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",data)):null}}}),v=n(403),f=n(28);function m(t){t.preventDefault()}var _=Object(f.a)(c.a,h,v.a).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,input=this.internalValue;return this.isMultiple?!!Array.isArray(input)&&input.some((function(n){return t.valueComparator(n,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,input):Boolean(input):this.valueComparator(input,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var label=c.a.options.methods.genLabel.call(this);return label?(label.data.on={click:m},label):label},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:m},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,input=this.internalValue;if(this.isMultiple){Array.isArray(input)||(input=[]);var n=input.length;(input=input.filter((function(n){return!t.valueComparator(n,e)}))).length===n&&input.push(e)}else input=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(input,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(input,e)?null:e:!input;this.validate(!0,input),this.internalValue=input,this.hasColor=input}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}}),w=["title"];function x(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function y(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?x(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):x(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=_.extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return y(y({},c.a.options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(t){var e=this;this.$nextTick((function(){return e.inputIndeterminate=t}))},inputIndeterminate:function(t){this.$emit("update:indeterminate",t)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){var t=this.attrs$,e=(t.title,Object(o.a)(t,w));return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(l.a,this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",y(y({},e),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},435:function(t,e,n){"use strict";n.r(e);n(51);var o={props:{xml:{type:String,required:!0},editmode:{type:Boolean,required:!0},boardId:{type:Number,required:!0},gotoCell:{type:Object,required:!0}},data:function(){return{loaded:!1,showReport:!1,reportCell:null,cellId:null,showSuggestion:!1}},methods:{FshowSuggestion:function(){this.showSuggestion=!1},FshowReport:function(){this.showReport=!1},closeSuggestion:function(){this.showSuggestion=!1},cellReported:function(){this.showReport=!1},saveCallback:function(t){var e=this;this.$axios.post("/updateboardcontent/"+this.boardId,{xml:t}).then((function(t){e.$notifier.showMessage({content:e.$t("saved"),color:"info"})})).catch((function(t){e.$notifier.showMessage({content:e.$t("error"),color:"error"})}))},reportCallback:function(t){this.cellId=parseInt(t),this.showReport=!0},suggestCallback:function(t){this.cellId=parseInt(t),this.showSuggestion=!0}},destroyed:function(){this.gotoCell.quit()},created:function(){var t=document.createElement("script");t.src="mxgraph/mxClient.js";var e,n=this.xml,o=this.editmode,r=this.saveCallback,l=this.reportCallback,c=this.suggestCallback,d=this.$auth.loggedIn,h=this.gotoCell;e=this.editmode?"mxgraph/examples/editors/config/diagrameditor.xml":"mxgraph/examples/editors/config/simplediagrameditor.xml",t.onload=function(){var t=document.createElement("script");t.src="mxgraph/examples/editors/js/app.js",document.head.appendChild(t),t.onload=function(){createEditor(e,n,o,r,l,c,h,d)}},document.head.appendChild(t)}},r=n(74),l=n(83),c=n.n(l),d=n(386),h=n(372),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("body",[n("div",{staticStyle:{"background-color":"white"},attrs:{id:"page"}},[n("div",{staticStyle:{width:"100%","padding-top":"8px","padding-bottom":"8px","padding-left":"16px"},attrs:{id:"mainActions"}},[t.editmode?n("v-btn",{attrs:{"x-small":"",id:"OrganicLayout"}},[t._v(t._s(t.$t("organic_layout")))]):t._e(),t._v(" "),t.editmode?n("v-btn",{attrs:{"x-small":"",id:"cut"}},[t._v(t._s(t.$t("cut")))]):t._e(),t._v(" "),t.editmode?n("v-btn",{attrs:{"x-small":"",id:"copy"}},[t._v(t._s(t.$t("copy")))]):t._e(),t._v(" "),t.editmode?n("v-btn",{attrs:{"x-small":"",id:"paste"}},[t._v(t._s(t.$t("paste")))]):t._e(),t._v(" "),t.editmode?n("v-btn",{attrs:{"x-small":"",id:"delete"}},[t._v(t._s(t.$t("delete")))]):t._e(),t._v(" "),t.editmode?n("v-btn",{attrs:{"x-small":"",id:"undo"}},[t._v(t._s(t.$t("undo")))]):t._e(),t._v(" "),t.editmode?n("v-btn",{attrs:{"x-small":"",id:"redo"}},[t._v(t._s(t.$t("redo")))]):t._e(),t._v(" "),n("v-btn",{attrs:{"x-small":"",id:"print"}},[t._v(t._s(t.$t("print")))]),t._v(" "),n("v-btn",{attrs:{"x-small":"",id:"show"}},[t._v(t._s(t.$t("show")))])],1),t._v(" "),n("table",{attrs:{border:"0",width:"width:100%"}},[n("tr",[n("td",{staticStyle:{width:"16px"},attrs:{id:"toolbar",valign:"top"}}),t._v(" "),n("td",{staticStyle:{"border-width":"1px","border-style":"solid","border-color":"black"},attrs:{valign:"top"}},[n("div",{staticStyle:{"z-index":"1",position:"absolute",overflow:"hidden",width:"160px",height:"120px",background:"transparent","border-style":"solid","border-color":"lightgray"},attrs:{id:"outlineContainer"}}),t._v(" "),n("div",{staticStyle:{position:"relative",height:"580px",width:"784px",overflow:"hidden",cursor:"default"},attrs:{id:"graph",tabindex:"-1"}},[n("center",{staticStyle:{"padding-top":"230px"},attrs:{id:"splash"}},[n("img",{attrs:{src:"images/loading.gif"}})])],1)])])]),t._v(" "),n("div",{staticStyle:{"padding-left":"16px"}},[n("v-btn",{attrs:{"x-small":"",id:"zoomIn"}},[t._v(t._s(t.$t("zoomIn")))]),t._v(" "),n("v-btn",{attrs:{"x-small":"",id:"zoomOut"}},[t._v(t._s(t.$t("zoomOut")))]),t._v(" "),n("v-btn",{attrs:{"x-small":"",id:"actualSize"}},[t._v(t._s(t.$t("actualSize")))]),t._v(" "),n("v-btn",{attrs:{"x-small":"",id:"fit"}},[t._v(t._s(t.$t("fit")))]),t._v(" "),t.editmode?n("v-btn",{attrs:{id:"saveid"}},[n("v-icon",[t._v("mdi-content-save")])],1):t._e()],1)]),t._v(" "),t.showSuggestion?n("div",{attrs:{gotoCell:t.gotoCell}},[n("v-btn",{on:{click:function(e){return t.FshowSuggestion()}}},[n("v-icon",[t._v("mdi-close")])],1),t._v(" "),n("Suggest",{attrs:{callback:t.closeSuggestion,cellId:t.cellId,boardId:t.boardId}})],1):t._e(),t._v(" "),t.showReport?n("div",[n("v-btn",{attrs:{icon:""},on:{click:function(e){return t.FshowReport()}}},[n("v-icon",[t._v("mdi-close")])],1),t._v(" "),n("Report",{attrs:{callback:t.cellReported,reportType:"cell",cellId:t.cellId,id:t.boardId}})],1):t._e()])}),[],!1,null,null,null);e.default=component.exports;c()(component,{Suggest:n(415).default,Report:n(394).default}),c()(component,{VBtn:d.a,VIcon:h.a})},436:function(t,e,n){"use strict";n.r(e);n(51),n(252);var o={data:function(){return{suggestionScore:0,suggestions:[],selected:null,showReport:!1}},props:{boardId:{required:!0,type:Number},gotoCell:{type:Object,required:!0}},methods:{TshowReport:function(){this.showReport=!0},FshowReport:function(){this.showReport=!1},gotoUser:function(t){this.$router.push("/user/"+user)},suggestionReported:function(){this.suggestions.splice(this.selected,1),this.showReport=!1,0==this.suggestions.length?(this.selected=null,this.gotoCell.function(null)):(this.selected=Math.max(0,Math.min(this.selected,this.suggestions.length-1)),this.gotoCell.function(this.suggestions[this.selected].cellid))},rateSuggestion:function(){var t=this;this.$axios.post("/ratesuggestion/".concat(this.suggestions[this.selected].suggestionid),{rating:this.suggestionScore/10}).then((function(e){t.$notifier.showMessage({content:t.$t("done"),color:"info"}),t.suggestionReported()})).catch((function(e){t.$notifier.showMessage({content:t.$t("error"),color:"error"})}))}},mounted:function(){var t=this;this.$axios.get("/viewsuggestions/"+this.boardId).then((function(e){t.suggestions=e.data})).catch((function(e){t.$notifier.showMessage({content:t.$t("error"),color:"error"})}))}},r=n(74),l=n(83),c=n.n(l),d=n(386),h=n(417),v=n(422),f=n(372),m=n(431),_=n(419),w=n(432),x=n(387),y=n(440),$=n(420),O=n(479),k=n(384),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-list",{staticClass:"overflow-y-auto",staticStyle:{"max-height":"400px","min-width":"200px"}},[n("v-list-item-title",{staticClass:"text-h6"},[t._v("\n            "+t._s(t.$t("suggestions"))+"\n            ")]),t._v(" "),n("v-list-item-group",{attrs:{color:"primary"},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[n("div",t._l(t.suggestions,(function(e,i){return n("v-list-item",{key:i},[n("v-list-item-content",{on:{click:function(n){return t.gotoCell.function(e.cellid)}}},[n("v-list-item-title",{domProps:{textContent:t._s(e.suggestion)}})],1),t._v(" "),null!=e.author?n("v-list-item-action",[n("v-btn",{attrs:{icon:"",icon:""},on:{click:function(n){return t.gotoUser(e.author)}}},[n("v-icon",[t._v("mdi-account")])],1)],1):t._e()],1)})),1)]),t._v(" "),0==t.suggestions.length?n("h5",[t._v(t._s(t.$t("no_suggestions")))]):t._e()],1),t._v(" "),t.showReport||null!=t.selected?n("v-divider"):t._e(),t._v(" "),n("div",[t.showReport||null==t.selected?t._e():n("v-btn",{attrs:{"x-small":"",icon:""},on:{click:function(e){return t.TshowReport()}}},[n("v-icon",[t._v("mdi-flag")])],1),t._v(" "),t.showReport?n("div",[n("v-btn",{attrs:{"x-small":""},on:{click:function(e){return t.FshowReport()}}},[n("v-icon",[t._v("mdi-close")])],1),t._v(" "),n("Report",{attrs:{callback:t.suggestionReported,reportType:"suggestion",id:t.suggestions[t.selected].suggestionid}})],1):t._e()],1),t._v(" "),null!=t.selected?n("form",{attrs:{"accept-charset":"UTF-8"},on:{submit:function(e){return e.preventDefault(),t.rateSuggestion()}}},[n("v-col",[n("v-row",[n("h5",[t._v(t._s(t.$t("useless")))]),t._v(" "),n("v-spacer"),t._v(" "),n("h5",[t._v(t._s(t.$t("amazing")))])],1),t._v(" "),n("v-slider",{attrs:{step:"20","tick-size":"5",ticks:"always"},model:{value:t.suggestionScore,callback:function(e){t.suggestionScore=e},expression:"suggestionScore"}}),t._v(" "),n("v-btn",{attrs:{type:"submit",icon:""}},[n("v-icon",[t._v("mdi-send")])],1)],1)],1):t._e()],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{Report:n(394).default}),c()(component,{VBtn:d.a,VCol:h.a,VDivider:v.a,VIcon:f.a,VList:m.a,VListItem:_.a,VListItemAction:w.a,VListItemContent:x.a,VListItemGroup:y.a,VListItemTitle:x.c,VRow:$.a,VSlider:O.a,VSpacer:k.a})},437:function(t,e,n){"use strict";n.r(e);n(51),n(19),n(252);var o={data:function(){return{invited:[],newPseudo:null}},props:{boardid:{required:!0,type:Number}},methods:{gotoUser:function(t){this.$router.push("/user/"+t)},invite:function(){var t=this;this.$axios.post("/invite/".concat(this.boardid),{pseudo:this.newPseudo}).then((function(e){t.invited.push({userid:e.data.userid,pseudo:t.newPseudo}),t.newPseudo=null,t.$notifier.showMessage({content:t.$t("done"),color:"info"})})).catch((function(e){t.$notifier.showMessage({content:t.$t("error"),color:"error"})}))},uninvite:function(t){var e=this;this.$axios.get("/uninvite/".concat(this.boardid,"/").concat(t)).then((function(n){for(var i=0;i<e.invited.length;i++)if(e.invited[i].userid===t){e.invited.splice(i,1);break}e.$notifier.showMessage({content:e.$t("done"),color:"info"})})).catch((function(t){e.$notifier.showMessage({content:e.$t("error"),color:"error"})}))}},mounted:function(){var t=this;this.$axios.get("/listinvited/".concat(this.boardid)).then((function(e){t.invited=e.data})).catch((function(e){t.$notifier.showMessage({content:t.$t("error"),color:"error"})}))}},r=n(74),l=n(83),c=n.n(l),d=n(386),h=n(372),v=n(431),f=n(419),m=n(432),_=n(387),w=n(440),x=n(416),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-list",{staticClass:"overflow-y-auto"},[n("v-list-item-title",{staticClass:"text-h6"},[t._v("\n            "+t._s(t.$t("invited"))+"\n            ")]),t._v(" "),n("v-list-item-group",{attrs:{color:"primary"}},[n("div",t._l(t.invited,(function(e,i){return n("v-list-item",{key:i},[n("v-list-item-content",{on:{click:function(n){return t.gotoUser(e.userid)}}},[n("v-list-item-title",{domProps:{textContent:t._s(e.pseudo)}})],1),t._v(" "),n("v-list-item-action",[n("v-btn",{attrs:{icon:"","x-small":""},on:{click:function(n){return t.uninvite(e.userid)}}},[n("v-icon",[t._v("mdi-account-remove")])],1)],1)],1)})),1),t._v(" "),n("v-text-field",{attrs:{label:t.$t("new_pseudo")},model:{value:t.newPseudo,callback:function(e){t.newPseudo=e},expression:"newPseudo"}}),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){return t.invite()}}},[n("v-icon",[t._v("mdi-account-plus")])],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VBtn:d.a,VIcon:h.a,VList:v.a,VListItem:f.a,VListItemAction:m.a,VListItemContent:_.a,VListItemGroup:w.a,VListItemTitle:_.c,VTextField:x.a})},487:function(t,e,n){"use strict";n.r(e);n(51),n(8),n(42);var o={components:{UserAuthForm:n(393).default},created:function(){if("random"==this.$route.params.board)this.boardId="random";else{var t=Number(this.$route.params.board);isNaN(t)?this.$router.push("/"):this.boardId=t}},data:function(){return{isauthor:null,xml:null,owned:null,userid:null,title:null,description:null,boardid:null,showReport:!1,gotoCell:{},loaded:!1}},mounted:function(){var t=this;this.$axios.get("/board/"+this.boardId).then((function(e){t.owned=e.data.owned,t.userid=e.data.userid,t.title=e.data.title,t.description=e.data.description,t.xml=e.data.xml,"random"==t.boardId&&(t.boardId=e.data.boardid,history.replaceState({},null,"#/board/"+e.data.boardid),t.loaded=!0)})).catch((function(e){t.$notifier.showMessage({content:t.$t("error"),color:"error"})}))},methods:{TShowReport:function(){this.showReport=!0},FShowReport:function(){this.showReport=!1},gotoUser:function(){this.owned?this.$router.push("/user/me"):this.$router.push("/user/"+this.userid)},boardReported:function(){this.showReport=!1}}},r=n(74),l=n(83),c=n.n(l),d=n(386),h=n(417),v=n(372),f=n(420),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",{attrs:{align:"stretch"}},[n("div",[n("client-only",[null!=t.xml&&null!=t.owned?n("XmlViewer",{attrs:{gotoCell:t.gotoCell,boardId:t.boardId,editmode:t.owned,xml:t.xml}}):t._e()],1),t._v(" "),n("h5",[t._v("  "+t._s(t.$t("right_click_tips"))+" ")]),t._v(" "),t.$auth.loggedIn?t._e():n("h5",[t._v("("+t._s(t.$t("need_login"))+")")])],1),t._v(" "),n("br"),t._v(" "),n("v-col",[n("v-col",[t.owned||null==t.userid?t._e():n("v-btn",{attrs:{"x-small":"",icon:""},on:{click:function(e){return t.gotoUser()}}},[n("v-icon",[t._v("mdi-account")])],1),t._v(" "),n("h3",[t._v(" "+t._s(t.title))]),t._v(" "),null!=t.userid?n("h4"):t._e(),t._v(" "),n("h4",[t._v("\n               "+t._s(t.description)+"\n           ")]),t._v(" "),!t.owned&&!t.showReport&&t.$auth.loggedIn&&t.loaded?n("v-btn",{attrs:{"x-small":""},on:{click:function(e){return t.TShowReport()}}},[n("v-icon",[t._v("mdi-flag")])],1):t._e(),t._v(" "),t.showReport?n("div",[n("v-btn",{attrs:{"x-small":"",icon:""},on:{click:function(e){return t.FShowReport()}}},[n("v-icon",[t._v("mdi-close")])],1),t._v(" "),n("Report",{attrs:{callback:t.boardReported,reportType:"board",id:t.boardId}})],1):t._e()],1),t._v(" "),n("br"),t._v(" "),t.owned?n("ListSuggestion",{attrs:{gotoCell:t.gotoCell,boardId:t.boardId}}):t._e(),t._v(" "),n("br"),t._v(" "),t.owned?n("InvitedList",{attrs:{boardid:t.boardId}}):t._e()],1)],1)}),[],!1,null,"dcb38fc4",null);e.default=component.exports;c()(component,{XmlViewer:n(435).default,Report:n(394).default,ListSuggestion:n(436).default,InvitedList:n(437).default}),c()(component,{VBtn:d.a,VCol:h.a,VIcon:v.a,VRow:f.a})}}]);