(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{441:function(e,t,n){"use strict";n.r(t);n(8),n(43),n(253);var o={fetchOnServer:!0,data:function(){return{boards:[],newBoardTemplate:!1,newTitle:"",newDescription:"",newIsPublic:!0,newIsAnonym:!1,newCat:0,selected:-1,editmode:!1,catlist:[{state:this.$t("other"),abbr:0},{state:this.$t("general_reflection"),abbr:1},{state:this.$t("personal_reflection"),abbr:2},{state:this.$t("science"),abbr:3}]}},props:{user:{required:!0}},methods:{FeditMode:function(){this.editmode=!1},TeditMode:function(i){this.selected=i,this.editmode=!0},saveTitle:function(e){this._updateBoardMetadata(e.boardid,e.title,"renameboard")},saveDescription:function(e){this._updateBoardMetadata(e.boardid,e.description,"changedescription")},changePublic:function(e){this._updateBoardMetadata(e.boardid,e.public,"changepublic")},changeAnonym:function(e){this._updateBoardMetadata(e.boardid,e.anonym,"changeanonym")},changeCat:function(e){this._updateBoardMetadata(e.boardid,e.cat.abbr,"changecat")},_updateBoardMetadata:function(e,data,t){var n=this;this.$axios.post("/"+t+"/"+e,{data:data}).then((function(e){n.$notifier.showMessage({content:n.$t("done"),color:"info"})})).catch((function(e){n.$notifier.showMessage({content:n.$t("error"),color:"error"})}))},deleteBoard:function(e){var t=this;this.$axios.get("/deleteboard/"+e).then((function(n){t.editmode=!1;for(var i=0;i<t.boards.length;i++)if(t.boards[i].boardid===e){t.boards.splice(i,1);break}})).catch((function(e){t.$notifier.showMessage({content:t.$t("error"),color:"error"})}))},gotoBoard:function(e){this.$router.push("/board/"+e)},closeNewBoard:function(){this.newBoardTemplate=!1,this.newTitle="",this.newDescription="",this.newIsPublic=!0,this.newIsAnonym=!1,this.newCat=0},sumbitNewBoard:function(){var e=this;this.$axios.post("/newboard",{title:this.newTitle,description:this.newDescription,public:this.newIsPublic,anonym:this.newIsAnonym,cat:this.newCat}).then((function(t){e.boards.push({boardid:t.data.boardid,title:e.newTitle,description:e.newDescription,cat:e.newCat}),e.closeNewBoard()})).catch((function(t){e.$notifier.showMessage({content:e.$t("error"),color:"error"})}))}},mounted:function(){var e=this;this.$axios.get("/boards/"+this.user).then((function(t){console.log(t.status),e.boards=t.data})).catch((function(t){301==t.status?e.$router.push("/user/me"):e.$notifier.showMessage({content:e.$t("error"),color:"error"})}))}},r=n(74),c=n(83),l=n.n(c),d=n(391),v=n(404),h=n(394),m=n(429),f=n(423),w=n(386),_=n(437),$=n(375),x=n(434),k=n(425),y=n(435),T=n(392),B=n(443),C=n(426),V=n(486),I=n(389),M=n(414),D=n(421),component=Object(r.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card",{staticClass:"mx-auto",attrs:{"min-width":"500","max-width":"700",tile:""}},[e.editmode?n("v-card-title",[n("v-btn",{attrs:{icon:""},on:{click:function(t){return e.FeditMode()}}},[n("v-icon",[e._v("mdi-arrow-left")])],1),e._v(" "),n("h2",[e._v("\n"+e._s(e.$t("edit_properties"))+"\n    ")])],1):n("v-card-title",[n("h2",[e._v("  "+e._s(e.$t("graph_list")))])]),e._v(" "),n("v-divider"),e._v(" "),n("v-list",{attrs:{"max-height":"500"}},[n("v-list-item-group",{attrs:{color:"primary"}},[e.editmode?n("v-list-item",{attrs:{inactive:"",selectable:!1,ripple:!1}},[n("v-col",[n("v-row",{attrs:{align:"center"}},[n("v-text-field",{attrs:{counter:"",maxlength:"100",label:e.$t("title")},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.saveTitle.apply(null,arguments)}},model:{value:e.boards[e.selected].title,callback:function(t){e.$set(e.boards[e.selected],"title",t)},expression:"boards[selected].title"}}),e._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(t){return e.saveTitle(e.boards[e.selected])}}},[n("v-icon",[e._v("mdi-content-save")])],1)],1),e._v(" "),n("v-row",{attrs:{align:"center"}},[n("v-textarea",{attrs:{counter:"",maxlength:"200",label:e.$t("description")},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.saveDescription.apply(null,arguments)}},model:{value:e.boards[e.selected].description,callback:function(t){e.$set(e.boards[e.selected],"description",t)},expression:"boards[selected].description"}}),e._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(t){return e.saveDescription(e.boards[e.selected])}}},[n("v-icon",[e._v("mdi-content-save")])],1)],1),e._v(" "),n("v-row",{attrs:{align:"center"}},[n("v-btn",{attrs:{icon:""},on:{click:function(t){return e.deleteBoard(e.boards[e.selected].boardid)}}},[n("v-icon",[e._v("mdi-delete")])],1),e._v(" "),n("v-spacer"),e._v(" "),n("v-col",[n("v-row",[n("v-checkbox",{attrs:{label:e.$t("public")},on:{change:function(t){return e.changePublic(e.boards[e.selected])}},model:{value:e.boards[e.selected].public,callback:function(t){e.$set(e.boards[e.selected],"public",t)},expression:"boards[selected].public"}}),e._v(" "),n("v-spacer"),e._v(" "),n("v-checkbox",{attrs:{label:e.$t("anonym"),disabled:!e.boards[e.selected].public},on:{change:function(t){return e.changeAnonym(e.boards[e.selected])}},model:{value:e.boards[e.selected].anonym,callback:function(t){e.$set(e.boards[e.selected],"anonym",t)},expression:"boards[selected].anonym"}})],1),e._v(" "),n("v-select",{staticStyle:{width:"250px"},attrs:{items:e.catlist,"item-text":"state","item-value":"abbr",hint:e.$t("category"),"persistent-hint":"","return-object":"","single-line":""},on:{change:function(t){return e.changeCat(e.boards[e.selected])}},model:{value:e.boards[e.selected].cat,callback:function(t){e.$set(e.boards[e.selected],"cat",t)},expression:"boards[selected].cat"}})],1)],1)],1)],1):e._l(e.boards,(function(t,i){return n("v-list-item",{key:i,attrs:{fluid:""}},[n("v-list-item-content",{on:{click:function(n){return e.gotoBoard(t.boardid)}}},[n("v-list-item-title",{domProps:{textContent:e._s(t.title)}}),e._v(" "),n("v-list-item-subtitle",{domProps:{textContent:e._s(t.description)}})],1),e._v(" "),"me"==e.user?n("v-list-item-action",[n("v-btn",{attrs:{icon:""},on:{click:function(t){return e.TeditMode(i)}}},[n("v-icon",[e._v("mdi-dots-vertical")])],1)],1):e._e()],1)}))],2),e._v(" "),0==e.boards.length?n("h5",[e._v(e._s(e.$t("no_graphs")))]):e._e()],1),e._v(" "),"me"==e.user&&e.boards.length<10&&!e.newBoardTemplate&&!e.editmode?n("v-btn",{attrs:{block:""},on:{click:function(t){e.newBoardTemplate=!0}}},[n("v-icon",[e._v("mdi-plus")])],1):e._e(),e._v(" "),e.newBoardTemplate?n("form",{attrs:{"accept-charset":"UTF-8"},on:{submit:function(t){return t.preventDefault(),e.sumbitNewBoard()}}},[n("v-text-field",{attrs:{counter:"",maxlength:"100",label:e.$t("title"),outlined:"","full-width":!0,required:""},model:{value:e.newTitle,callback:function(t){e.newTitle=t},expression:"newTitle"}}),e._v(" "),n("v-textarea",{attrs:{counter:"",maxlength:"200",label:e.$t("description"),outlined:"","full-width":!0,required:""},model:{value:e.newDescription,callback:function(t){e.newDescription=t},expression:"newDescription"}}),e._v(" "),n("v-container",{attrs:{fluid:""}},[n("v-col",[n("v-row",[n("v-checkbox",{attrs:{label:e.$t("public")},model:{value:e.newIsPublic,callback:function(t){e.newIsPublic=t},expression:"newIsPublic"}}),e._v(" "),n("v-checkbox",{attrs:{label:e.$t("anonym")},model:{value:e.newIsAnonym,callback:function(t){e.newIsAnonym=t},expression:"newIsAnonym"}}),e._v(" "),n("v-spacer"),e._v(" "),n("v-select",{attrs:{required:"",items:e.catlist,"item-text":"state","item-value":"abbr",hint:e.$t("category"),"persistent-hint":"","return-object":"","single-line":"",rules:[function(e){return!!e||"Gender is required"}]},model:{value:e.newCat,callback:function(t){e.newCat=t},expression:"newCat"}})],1),e._v(" "),n("v-row",[n("v-btn",{on:{click:function(t){return e.closeNewBoard()}}},[e._v(e._s(e.$t("cancel"))+"\n    ")]),e._v(" "),n("v-spacer"),e._v(" "),n("v-btn",{attrs:{type:"submit"}},[e._v("\n        "+e._s(e.$t("submit"))+"\n      ")])],1)],1)],1)],1):e._e()],1)}),[],!1,null,null,null);t.default=component.exports;l()(component,{VBtn:d.a,VCard:v.a,VCardTitle:h.c,VCheckbox:m.a,VCol:f.a,VContainer:w.a,VDivider:_.a,VIcon:$.a,VList:x.a,VListItem:k.a,VListItemAction:y.a,VListItemContent:T.a,VListItemGroup:B.a,VListItemSubtitle:T.b,VListItemTitle:T.c,VRow:C.a,VSelect:V.a,VSpacer:I.a,VTextField:M.a,VTextarea:D.a})}}]);