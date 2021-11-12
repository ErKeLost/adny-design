var W=Object.defineProperty;var L=Object.getOwnPropertySymbols;var X=Object.prototype.hasOwnProperty,Y=Object.prototype.propertyIsEnumerable;var k=(a,l,s)=>l in a?W(a,l,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[l]=s,b=(a,l)=>{for(var s in l||(l={}))X.call(l,s)&&k(a,s,l[s]);if(L)for(var s of L(l))Y.call(l,s)&&k(a,s,l[s]);return a};(function(a,l){typeof exports=="object"&&typeof module!="undefined"?l(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],l):(a=typeof globalThis!="undefined"?globalThis:a||self,l(a.index={},a.Vue))})(this,function(a,l){"use strict";const s={directive:"ripple",color:"currentColor",initialOpacity:.2,finalOpacity:.5,duration:.2,easing:"ease-in-out",delayTime:75,disabled:!1},R=({borderTopLeftRadius:e,borderTopRightRadius:t,borderBottomLeftRadius:o,borderBottomRightRadius:i})=>{const n=document.createElement("div");return n.style.top="0",n.style.left="0",n.style.width="100%",n.style.height="100%",n.style.position="absolute",n.style.borderRadius=`${e} ${t} ${i} ${o}`,n.style.overflow="hidden",n.style.pointerEvents="none",n.style.webkitMaskImage="-webkit-radial-gradient(white, black)",n},T=(e,t,o,i)=>{const n=document.createElement("div");return n.style.position="absolute",n.style.width=`${o}px`,n.style.height=`${o}px`,n.style.top=`${t}px`,n.style.left=`${e}px`,n.style.background=i.color,n.style.borderRadius="50%",n.style.opacity=`${i.initialOpacity}`,n.style.transform="translate(-50%,-50%) scale(0)",n.style.transition=`transform ${i.duration}s ${i.easing}, opacity ${i.duration}s ${i.easing}`,n};function f(e,t,o,i){const n=e-o,r=t-i;return Math.sqrt(n*n+r*r)}function M(e,t,{width:o,height:i}){const n=f(e,t,0,0),r=f(e,t,o,0),p=f(e,t,0,i),d=f(e,t,o,i);return Math.max(n,r,p,d)}const S=({x:e,y:t},{top:o,left:i})=>({x:e-i,y:t-o}),v="vRippleCountInternal";function w(e){const t=g(e);C(e,t+1)}function O(e){const t=g(e);C(e,t-1)}function C(e,t){e.dataset[v]=t.toString()}function g(e){var t;return parseInt((t=e.dataset[v])!=null?t:"0",10)}function z(e){delete e.dataset[v]}const P=2.05,A=(e,t,o)=>{const i=t.getBoundingClientRect(),n=window.getComputedStyle(t),{x:r,y:p}=S(e,i),d=P*M(r,p,i),m=R(n),y=T(r,p,d,o);w(t);let E="";n.position==="static"&&(t.style.position&&(E=t.style.position),t.style.position="relative"),m.appendChild(y),t.appendChild(m);let h=!1;const u=G=>{typeof G!="undefined"&&(document.removeEventListener("pointerup",u),document.removeEventListener("pointercancel",u)),h?j():h=!0},j=()=>{y.style.transition="opacity 150ms linear",y.style.opacity="0",setTimeout(()=>{m.remove(),O(t),g(t)===0&&(z(t),t.style.position=E)},150)};document.addEventListener("pointerup",u),document.addEventListener("pointercancel",u);const V=setTimeout(()=>{document.removeEventListener("pointercancel",$),requestAnimationFrame(()=>{y.style.transform="translate(-50%,-50%) scale(1)",y.style.opacity=`${o.finalOpacity}`,setTimeout(()=>u(),o.duration*1e3)})},o.delayTime),$=()=>{clearTimeout(V),m.remove(),document.removeEventListener("pointerup",u),document.removeEventListener("pointercancel",u),document.removeEventListener("pointercancel",$)};document.addEventListener("pointercancel",$)},B=new WeakMap,D=b({},s);var I={mounted(e,t){var o;B.set(e,(o=t.value)!=null?o:{}),e.addEventListener("pointerdown",i=>{const n=B.get(e);t.value.disabled||n!==!1&&A(i,e,b(b({},D),n))})},updated(e,t){var o;B.set(e,(o=t.value)!=null?o:{})}},H="",U=(e,t)=>{for(const[o,i]of t)e[o]=i;return e};const N=l.defineComponent({name:"ABtn",directives:{ripple:I},props:{type:{type:String,default:"default"},size:{type:String,default:"normal"},color:{type:String},elevation:{type:String,default:"2"},disabled:{type:Boolean,default:!1},text:{type:Boolean,default:!1},round:{type:Boolean,default:!1},outline:{type:Boolean,default:!1},block:{type:Boolean,default:!1},depressed:{type:Boolean,default:!1},fab:{type:Boolean,default:!1},icon:{type:Boolean,default:!1},tite:{type:Boolean,default:!1}},setup(e){const t=l.ref(null),o=l.computed(()=>({backgroundColor:"currentColor"}));return l.onMounted(()=>{}),{textBgColor:o,btn:t,changeBg:()=>{t.value.style.backgroundColor=`${e.color}30`},moveBg:()=>{t.value.style.backgroundColor=""}}}});function q(e,t,o,i,n,r){const p=l.resolveDirective("ripple");return l.withDirectives((l.openBlock(),l.createElementBlock("button",{ref:"btn",id:"btn",class:l.normalizeClass(["adny-button adny--box",[`adny-button--${e.size}`,e.block?"adny--flex adny-button--block":"adny--inline-flex",e.disabled?"adny-button--disabled":null,e.text?`adny-button--text-${e.type}`:`adny-button--${e.type}`,e.text?"adny-button--text":`adny-elevation--${e.elevation}`,e.text&&e.disabled?"adny-button--text-disabled":null,e.round?"adny-button--round":null,e.outline?"adny-button--outline":null,e.depressed?"adny-button--depressed":null,e.fab&&e.size==="large"?"adny-button--float-large":null,e.fab&&e.size==="small"?"adny-button--float-small":null,e.fab&&e.size==="mini"?"adny-button--float-mini":null,e.fab&&e.size==="normal"?"adny-button--float-normal":null,e.icon?"adny-button--icon":null,e.tite?"adny-button--tite":null,e.text?`adny-button--${e.type}__hover`:null]]),onMousemove:t[0]||(t[0]=(...d)=>e.changeBg&&e.changeBg(...d)),onMouseleave:t[1]||(t[1]=(...d)=>e.moveBg&&e.moveBg(...d)),style:l.normalizeStyle({color:e.color})},[l.renderSlot(e.$slots,"default")],38)),[[p,{disabled:e.disabled}]])}var c=U(N,[["render",q]]);c.install=function(e){e.component(c.name,c)};var F={title:"ABtn \u6309\u94AE",category:"\u53CD\u9988",status:"30%",install(e){e.use(c)}};a.ABtn=c,a.default=F,Object.defineProperty(a,"__esModule",{value:!0}),a[Symbol.toStringTag]="Module"});