(function(n,e){typeof exports=="object"&&typeof module!="undefined"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(n=typeof globalThis!="undefined"?globalThis:n||self,e(n.index={},n.Vue))})(this,function(n,e){"use strict";const s={errorMessage:{type:String,default:""},maxlengthText:{type:String,default:""}};var p="",l=(t,r)=>{for(const[a,i]of r)t[a]=i;return t};const d=e.defineComponent({name:"AFormDetail",props:s}),f={key:0,class:"var-form-details"},c={class:"var-form-details__message"},m={class:"var-form-details__length"};function u(t,r,a,i,y,g){return e.openBlock(),e.createBlock(e.Transition,{name:"var-form-details"},{default:e.withCtx(()=>[t.errorMessage||t.maxlengthText?(e.openBlock(),e.createElementBlock("div",f,[e.createElementVNode("div",c,e.toDisplayString(t.errorMessage),1),e.createElementVNode("div",m,e.toDisplayString(t.maxlengthText),1)])):e.createCommentVNode("v-if",!0)]),_:1})}var o=l(d,[["render",u]]);o.install=function(t){t.component(o.name,o)};var _={title:"AdnyFormDetail \u6821\u9A8C\u8868\u5355",category:"\u53CD\u9988",status:"30%",install(t){t.use(o)}};n.AdnyFormDetail=o,n.default=_,Object.defineProperty(n,"__esModule",{value:!0}),n[Symbol.toStringTag]="Module"});
