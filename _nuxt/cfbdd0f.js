(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{399:function(t,e,o){"use strict";o.r(e);o(41),o(21);var n={props:{reportType:{type:String,required:!0},id:{type:Number,required:!0},cellId:{type:Number,required:!1},callback:{required:!0}},data:function(){return{detail:null,select:null,items:[{state:this.$t("advertising"),abbr:1},{state:this.$t("spam"),abbr:2},{state:this.$t("other"),abbr:3}]}},methods:{sendReport:function(){var t=this;if(null==this.select)this.$notifier.showMessage({content:this.$t("error"),color:"error"});else{var e="report".concat(this.reportType,"/").concat(this.id);"cell"==this.reportType&&(e+="/".concat(this.cellId)),this.$axios.post(e,{reason:this.select.abbr,detail:this.detail}).then((function(e){t.$notifier.showMessage({content:t.$t("done"),color:"info"}),t.callback()})).catch((function(e){t.$notifier.showMessage({content:t.$t("error"),color:"error"})}))}}}},r=o(74),l=o(83),c=o.n(l),d=o(391),h=o(375),v=o(486),f=o(421),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("v-select",{attrs:{items:t.items,"item-text":"state","item-value":"abbr",label:t.$t("reason"),"persistent-hint":"","return-object":"","single-line":""},model:{value:t.select,callback:function(e){t.select=e},expression:"select"}}),t._v(" "),o("v-textarea",{attrs:{counter:"",maxlength:"100",label:t.$t("details"),outlined:"","full-width":!0,required:""},model:{value:t.detail,callback:function(e){t.detail=e},expression:"detail"}}),t._v(" "),o("v-btn",{attrs:{icon:""},on:{click:function(e){return t.sendReport()}}},[o("v-icon",[t._v("mdi-send")])],1)],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VBtn:d.a,VIcon:h.a,VSelect:v.a,VTextarea:f.a})},439:function(t,e,o){"use strict";o.r(e);o(41),o(253);var n={data:function(){return{suggestionScore:0,suggestions:[],selected:null,showReport:!1}},props:{boardId:{required:!0,type:Number},gotoCell:{type:Object,required:!0}},methods:{TshowReport:function(){this.showReport=!0},FshowReport:function(){this.showReport=!1},gotoUser:function(t){this.$router.push("/user/"+user)},suggestionReported:function(){this.suggestions.splice(this.selected,1),this.showReport=!1,0==this.suggestions.length?(this.selected=null,this.gotoCell.function(null)):(this.selected=Math.max(0,Math.min(this.selected,this.suggestions.length-1)),this.gotoCell.function(this.suggestions[this.selected].cellid))},rateSuggestion:function(){var t=this;this.$axios.post("/ratesuggestion/".concat(this.suggestions[this.selected].suggestionid),{rating:this.suggestionScore/10}).then((function(e){t.$notifier.showMessage({content:t.$t("done"),color:"info"}),t.suggestionReported()})).catch((function(e){t.$notifier.showMessage({content:t.$t("error"),color:"error"})}))}},mounted:function(){var t=this;this.$axios.get("/viewsuggestions/"+this.boardId).then((function(e){t.suggestions=e.data})).catch((function(e){t.$notifier.showMessage({content:t.$t("error"),color:"error"})}))}},r=o(74),l=o(83),c=o.n(l),d=o(391),h=o(423),v=o(437),f=o(375),m=o(434),_=o(425),w=o(435),$=o(392),x=o(443),R=o(426),k=o(484),V=o(389),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("v-list",{staticClass:"overflow-y-auto",staticStyle:{"max-height":"400px","min-width":"200px"}},[o("v-list-item-title",{staticClass:"text-h6"},[t._v("\n            "+t._s(t.$t("suggestions"))+"\n            ")]),t._v(" "),o("v-list-item-group",{attrs:{color:"primary"},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[o("div",t._l(t.suggestions,(function(e,i){return o("v-list-item",{key:i},[o("v-list-item-content",{on:{click:function(o){return t.gotoCell.function(e.cellid)}}},[o("v-list-item-title",{domProps:{textContent:t._s(e.suggestion)}})],1),t._v(" "),null!=e.author?o("v-list-item-action",[o("v-btn",{attrs:{icon:"",icon:""},on:{click:function(o){return t.gotoUser(e.author)}}},[o("v-icon",[t._v("mdi-account")])],1)],1):t._e()],1)})),1)]),t._v(" "),0==t.suggestions.length?o("h5",[t._v(t._s(t.$t("no_suggestions")))]):t._e()],1),t._v(" "),t.showReport||null!=t.selected?o("v-divider"):t._e(),t._v(" "),o("div",[t.showReport||null==t.selected?t._e():o("v-btn",{attrs:{"x-small":"",icon:""},on:{click:function(e){return t.TshowReport()}}},[o("v-icon",[t._v("mdi-flag")])],1),t._v(" "),t.showReport?o("div",[o("v-btn",{attrs:{"x-small":""},on:{click:function(e){return t.FshowReport()}}},[o("v-icon",[t._v("mdi-close")])],1),t._v(" "),o("Report",{attrs:{callback:t.suggestionReported,reportType:"suggestion",id:t.suggestions[t.selected].suggestionid}})],1):t._e()],1),t._v(" "),null!=t.selected?o("form",{attrs:{"accept-charset":"UTF-8"},on:{submit:function(e){return e.preventDefault(),t.rateSuggestion()}}},[o("v-col",[o("v-row",[o("h5",[t._v(t._s(t.$t("useless")))]),t._v(" "),o("v-spacer"),t._v(" "),o("h5",[t._v(t._s(t.$t("amazing")))])],1),t._v(" "),o("v-slider",{attrs:{step:"20","tick-size":"5",ticks:"always"},model:{value:t.suggestionScore,callback:function(e){t.suggestionScore=e},expression:"suggestionScore"}}),t._v(" "),o("v-btn",{attrs:{type:"submit",icon:""}},[o("v-icon",[t._v("mdi-send")])],1)],1)],1):t._e()],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{Report:o(399).default}),c()(component,{VBtn:d.a,VCol:h.a,VDivider:v.a,VIcon:f.a,VList:m.a,VListItem:_.a,VListItemAction:w.a,VListItemContent:$.a,VListItemGroup:x.a,VListItemTitle:$.c,VRow:R.a,VSlider:k.a,VSpacer:V.a})}}]);