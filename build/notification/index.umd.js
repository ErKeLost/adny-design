var X=Object.defineProperty,Y=Object.defineProperties;var Z=Object.getOwnPropertyDescriptors;var $=Object.getOwnPropertySymbols;var v=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable;var V=(i,t,a)=>t in i?X(i,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):i[t]=a,N=(i,t)=>{for(var a in t||(t={}))v.call(t,a)&&V(i,a,t[a]);if($)for(var a of $(t))ee.call(t,a)&&V(i,a,t[a]);return i},S=(i,t)=>Y(i,Z(t));(function(i,t){typeof exports=="object"&&typeof module!="undefined"?t(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],t):(i=typeof globalThis!="undefined"?globalThis:i||self,t(i.index={},i.Vue))})(this,function(i,t){"use strict";const a={name:{type:String},size:{type:[Number,String]},color:{type:String},namespace:{type:String,default:"adny-icon"},transition:{type:[Number,String],default:0},onClick:{type:Function}},u=e=>e==null?0:y(e)?(e=parseFloat(e),e=Number.isNaN(e)?0:e,e):B(e)?Number(e):e,y=e=>typeof e=="string",B=e=>typeof e=="boolean",C=e=>typeof e=="number",k=e=>e?/^(http)|(\.*\/)/.test(e):!1,_=e=>y(e)&&e.endsWith("rem"),E=e=>y(e)&&e.endsWith("px")||C(e),z=e=>y(e)&&e.endsWith("%"),w=e=>y(e)&&e.endsWith("vw"),b=e=>y(e)&&e.endsWith("vh"),T=e=>{if(C(e))return e;if(E(e))return+e.replace("px","");if(w(e))return+e.replace("vw","")*window.innerWidth/100;if(b(e))return+e.replace("vh","")*window.innerHeight/100;if(_(e)){const n=+e.replace("rem",""),o=window.getComputedStyle(document.documentElement).fontSize;return n*parseFloat(o)}return y(e)?u(e):0},g=e=>{if(e!=null)return z(e)||w(e)||b(e)||_(e)?e:`${T(e)}px`};var te="",ne="",p=t.defineComponent({name:"AIcon",props:a,setup(e){const n=t.ref(""),o=t.ref(!1),r=async(s,c)=>{const{transition:h}=e;if(c==null||u(h)===0){n.value=s;return}o.value=!0,await t.nextTick(),setTimeout(()=>{c!=null&&(n.value=c),o.value=!1},u(h))};t.watch(()=>e.name,r,{immediate:!0});const m={color:e.color,transition:`all ${u(e.transition)}ms`,fontSize:g(e.size)},l={transition:`all ${u(e.transition)}ms`,width:g(e.size),height:g(e.size)};return()=>t.createVNode("div",{style:"display: inline-block"},[k(e.name)?t.createVNode("img",{onClick:e.onClick,src:n.value,style:l,class:iconClass},null):t.createVNode("i",{onClick:e.onClick,style:m,class:["adny-icon",`${e.namespace}--set`,k(e.name)?"adny-icon__image":`${e.namespace}-${n.value}`,o.value?"adny-icon--shrinking":null]},null)])}});p.install=function(e){e.component(p.name,p)};var I={title:"AIcon \u56FE\u6807",category:"\u53CD\u9988",status:"30%",install(e){e.use(p)}},oe="",A=(e,n)=>{for(const[o,r]of n)e[o]=r;return e};const W=t.defineComponent({name:"ANotification",components:{AIcon:I},props:{prefixIconColor:{type:String,default:"#000"},type:{type:String,default:"default"},prefixIcon:{type:Boolean,default:!1},title:{type:String},showClose:{type:Boolean,default:!0},message:{type:String},duration:{type:Number,default:3500},onClose:{type:Function},offset:{type:Number,default:20},id:{type:String},position:{type:String,default:"top-right"}},emits:["destory"],setup(e,{emit:n}){const o=t.ref(!1);let r=null;const m=t.ref(""),l=()=>{r=setTimeout(()=>{s()},e.duration)};function s(){o.value=!1}t.onMounted(()=>{l(),o.value=!0}),t.onUnmounted(()=>{clearTimeout(r)});const c=t.computed(()=>e.position.endsWith("right")?"right":"left"),h=t.computed(()=>e.position.startsWith("top")?"top":"bottom"),K=t.computed(()=>({[h.value]:`${e.offset}px`})),Q=t.computed(()=>({[c.value]:"10px"}));return{visible:o,horizontalClass:c,close:s,positionStyle:K,verticalStyle:Q,transitionName:m}}}),F=["id"],H={class:"adny-notification-icon"},L={class:"adny-notification--group"},P={class:"adny-notification--content"},D={key:0,class:"adny-notification--title"},M={key:1},x=["innerHTML"],U={class:"adny-notification--closeicon"};function j(e,n,o,r,m,l){const s=t.resolveComponent("a-icon");return t.openBlock(),t.createBlock(t.Transition,{name:`notification-${e.horizontalClass}`,onBeforeLeave:e.onClose,onAfterLeave:n[0]||(n[0]=c=>e.$emit("destory"))},{default:t.withCtx(()=>[t.withDirectives(t.createElementVNode("div",{id:e.id,class:t.normalizeClass(["adny-notification","adny-elevation--2",`adny-notification--${e.type}`]),style:t.normalizeStyle([e.positionStyle,e.verticalStyle])},[t.createElementVNode("div",H,[e.prefixIcon?(t.openBlock(),t.createBlock(s,{key:0,color:e.prefixIconColor,size:"30",name:"checkbox-marked-circle"},null,8,["color"])):t.createCommentVNode("v-if",!0)]),t.createElementVNode("div",L,[t.createElementVNode("div",P,[e.title?(t.openBlock(),t.createElementBlock("p",D,t.toDisplayString(e.title),1)):t.createCommentVNode("v-if",!0),e.message?(t.openBlock(),t.createElementBlock("div",M,[t.renderSlot(e.$slots,"default",{},()=>[t.createElementVNode("span",{innerHTML:e.message},null,8,x)],!0)])):t.createCommentVNode("v-if",!0)]),t.createElementVNode("div",U,[e.showClose?(t.openBlock(),t.createBlock(s,{key:0,onClick:e.close,name:"window-close"},null,8,["onClick"])):t.createCommentVNode("v-if",!0)])])],14,F),[[t.vShow,e.visible]])]),_:3},8,["name","onBeforeLeave"])}var R=A(W,[["render",j],["__scopeId","data-v-6a8f1c45"]]);const q=["info","warning","danger","success"],d=[];let O=1;const f=e=>{typeof e=="string"&&(e={message:e});let n=e.offset||0;d.forEach(c=>{n+=(c.el.offsetHeight||0)+16}),n+=16;const o="message_"+O++;let r=e.onClose,m=S(N({},e),{offset:n,id:o,onClose:()=>{G(o,r)}});const l=document.createElement("div");l.className=`container_${o}`;const s=t.createVNode(R,m);s.props.onDestory=()=>{t.render(null,l)},t.render(s,l),d.push(s),document.body.appendChild(l.firstElementChild)};function G(e,n){const o=d.findIndex(s=>{const{id:c}=s.component.props;return e===c});if(o===-1)return;const r=d[o];if(!r)return;n==null||n(r);const m=r.el.offsetHeight;d.splice(o,1);const l=d.length;if(!(l<1))for(let s=o;s<l;s++){const c=parseInt(d[s].el.style.top,10)-m-16;d[s].component.props.offset=c}}q.forEach(e=>{f[e]=(n={})=>(typeof n=="string"&&(n={message:n}),f(S(N({},n),{type:e})))}),f.install=function(e){e.config.globalProperties.$notify=f,e.component(f.name,f)};var J={title:"Notification \u901A\u77E5",category:"\u53CD\u9988",status:"30%",install(e){e.use(f)}};i.Notification=f,i.default=J,Object.defineProperty(i,"__esModule",{value:!0}),i[Symbol.toStringTag]="Module"});