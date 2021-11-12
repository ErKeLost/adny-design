var q=Object.defineProperty,O=Object.defineProperties;var G=Object.getOwnPropertyDescriptors;var $=Object.getOwnPropertySymbols;var J=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable;var V=(i,n,l)=>n in i?q(i,n,{enumerable:!0,configurable:!0,writable:!0,value:l}):i[n]=l,h=(i,n)=>{for(var l in n||(n={}))J.call(n,l)&&V(i,l,n[l]);if($)for(var l of $(n))K.call(n,l)&&V(i,l,n[l]);return i},C=(i,n)=>O(i,G(n));(function(i,n){typeof exports=="object"&&typeof module!="undefined"?n(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],n):(i=typeof globalThis!="undefined"?globalThis:i||self,n(i.index={},i.Vue))})(this,function(i,n){"use strict";const l={name:{type:String},size:{type:[Number,String]},color:{type:String},namespace:{type:String,default:"adny-icon"},transition:{type:[Number,String],default:0},onClick:{type:Function}},y=e=>e==null?0:u(e)?(e=parseFloat(e),e=Number.isNaN(e)?0:e,e):z(e)?Number(e):e,u=e=>typeof e=="string",z=e=>typeof e=="boolean",_=e=>typeof e=="number",S=e=>e?/^(http)|(\.*\/)/.test(e):!1,w=e=>u(e)&&e.endsWith("rem"),E=e=>u(e)&&e.endsWith("px")||_(e),T=e=>u(e)&&e.endsWith("%"),N=e=>u(e)&&e.endsWith("vw"),k=e=>u(e)&&e.endsWith("vh"),A=e=>{if(_(e))return e;if(E(e))return+e.replace("px","");if(N(e))return+e.replace("vw","")*window.innerWidth/100;if(k(e))return+e.replace("vh","")*window.innerHeight/100;if(w(e)){const t=+e.replace("rem",""),o=window.getComputedStyle(document.documentElement).fontSize;return t*parseFloat(o)}return u(e)?y(e):0},p=e=>{if(e!=null)return T(e)||N(e)||k(e)||w(e)?e:`${A(e)}px`};var Q="",X="",g=n.defineComponent({name:"AIcon",props:l,setup(e){const t=n.ref(""),o=n.ref(!1),r=async(s,a)=>{const{transition:b}=e;if(a==null||y(b)===0){t.value=s;return}o.value=!0,await n.nextTick(),setTimeout(()=>{a!=null&&(t.value=a),o.value=!1},y(b))};n.watch(()=>e.name,r,{immediate:!0});const f={color:e.color,transition:`all ${y(e.transition)}ms`,fontSize:p(e.size)},c={transition:`all ${y(e.transition)}ms`,width:p(e.size),height:p(e.size)};return()=>n.createVNode("div",{style:"display: inline-block"},[S(e.name)?n.createVNode("img",{onClick:e.onClick,src:t.value,style:c,class:iconClass},null):n.createVNode("i",{onClick:e.onClick,style:f,class:["adny-icon",`${e.namespace}--set`,S(e.name)?"adny-icon__image":`${e.namespace}-${t.value}`,o.value?"adny-icon--shrinking":null]},null)])}});g.install=function(e){e.component(g.name,g)};var B={title:"AIcon \u56FE\u6807",category:"\u53CD\u9988",status:"30%",install(e){e.use(g)}},Y="",M=(e,t)=>{for(const[o,r]of t)e[o]=r;return e};const I=n.defineComponent({name:"AMesssage",components:{AIcon:B},props:{showClose:{type:Boolean,default:!1},backgroundColor:{type:String},icon:{type:String},type:{type:String,default:"default"},message:{type:String},duration:{type:Number,default:3500},onClose:{type:Function},offset:{type:Number,default:20},id:{type:String}},emits:["destory"],setup(e,{emit:t}){const o=n.ref(!1);let r=null;const f=()=>{r=setTimeout(()=>{c()},e.duration)};function c(){o.value=!1}n.onMounted(()=>{f(),o.value=!0}),n.onUnmounted(()=>{clearTimeout(r)});const s=n.computed(()=>{switch(e.type){case"success":return"check-circle-outline";case"info":return"information-outline";case"danger":return"alert-triangle";case"warning":return"warning"}});return{visible:o,iconName:s,close:c}}}),D=["id"],F={class:"adny-message--flex"},W={style:{display:"flex"}},P={style:{margin:"0 15px"}};function x(e,t,o,r,f,c){const s=n.resolveComponent("a-icon");return n.openBlock(),n.createBlock(n.Transition,{name:"message",onBeforeLeave:e.onClose,onAfterLeave:t[0]||(t[0]=a=>e.$emit("destory"))},{default:n.withCtx(()=>{var a;return[n.withDirectives(n.createElementVNode("div",{class:n.normalizeClass(["adny-message adny-elevation--2",[e.type?`adny-message__${e.type}`:null]]),id:e.id,style:n.normalizeStyle({top:`${e.offset}px`,backgroundColor:e.backgroundColor})},[n.createElementVNode("div",F,[n.createElementVNode("div",W,[n.createVNode(s,{name:(a=e.icon)!=null?a:e.iconName},null,8,["name"]),n.createElementVNode("p",P,n.toDisplayString(e.message),1)]),e.showClose?(n.openBlock(),n.createBlock(s,{key:0,onClick:e.close,name:"window-close"},null,8,["onClick"])):n.createCommentVNode("v-if",!0)])],14,D),[[n.vShow,e.visible]])]}),_:1},8,["onBeforeLeave"])}var H=M(I,[["render",x],["__scopeId","data-v-8a9a840e"]]);const L=["success","info","warning","danger"],d=[];let U=1;const m=e=>{typeof e=="string"&&(e={message:e});let t=e.offset||20;d.forEach(a=>{t+=(a.el.offsetHeight||0)+16}),t+=16;const o="message_"+U++;let r=e.onClose,f=C(h({},e),{offset:t,id:o,onClose:()=>{j(o,r)}});const c=document.createElement("div");c.className=`container_${o}`;const s=n.createVNode(H,f);s.props.onDestory=()=>{n.render(null,c)},n.render(s,c),d.push(s),document.body.appendChild(c.firstElementChild)};function j(e,t){const o=d.findIndex(s=>{const{id:a}=s.component.props;return e===a});if(o===-1)return;const r=d[o];if(!r)return;t==null||t(r);const f=r.el.offsetHeight;d.splice(o,1);const c=d.length;if(!(c<1))for(let s=o;s<c;s++){const a=parseInt(d[s].el.style.top,10)-f-16;d[s].component.props.offset=a}}L.forEach(e=>{m[e]=(t={})=>(typeof t=="string"&&(t={message:t}),m(C(h({},t),{type:e})))}),m.install=function(e){e.config.globalProperties.$message=m,e.component(m.name,m)};var R={title:"Message \u5168\u5C40\u63D0\u793A",category:"\u53CD\u9988",status:"30%",install(e){e.use(m)}};i.Message=m,i.default=R,Object.defineProperty(i,"__esModule",{value:!0}),i[Symbol.toStringTag]="Module"});
