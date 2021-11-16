import type { Directive } from "vue";
import { watch } from "vue";
import { createApp, ref, defineComponent, getCurrentInstance } from "vue";
import ASpin from "../../../components/spin/src/spinner.vue";
import { createrippleElement } from "./utils/createElement";

// const div = document.createElement("div");
let loadingCtor = null;
let loadingElement = null;
interface Spinner {
  loadingTip: string;
  prop: string;
}
const LoadingDirective: Directive = {
  beforeMount(el, binding) {
    loadingCtor = createApp(ASpin).mount(createrippleElement());
    loadingElement = loadingCtor.$el;
  },
  mounted(el: HTMLElement, binding) {
    binding.value ?? console.log(binding.value);
    removeClass(loadingElement, (loadingCtor as any).spinnerColor);
    el.style.position = "relative";
    if (binding.value) {
      append(el);
    }
  },
  updated(el: HTMLElement, binding) {
    console.log(binding.value);

    if (binding.value !== binding.oldValue) {
      // 判断true 到 false  还是 false 到true
      binding.value ? append(el) : remove(el);
    }
    if (binding.modifiers.fullscreen) {
      addClass(loadingElement, "fullscreen");
      removeClass(loadingElement, "element");
    } else {
      addClass(loadingElement, "element");
      removeClass(loadingElement, "fullscreen");
    }
  },
  unmounted(el: HTMLElement, binding) {
    el ?? remove(el);
  },
};
function append(el: HTMLElement) {
  el.appendChild(loadingElement);
}
function remove(el: HTMLElement) {
  el.removeChild(loadingElement);
}
function addClass(el: HTMLElement, className: any) {
  if (!el.classList.contains(className)) {
    el.classList.add(className);
  }
}

function removeClass(el: HTMLElement, className: any) {
  el.classList.remove(className);
}
export default LoadingDirective;
// 2021.8.27 未解之谜
// ;(loadingCtor as any).loadingTip = binding.value.tip
// const result = {
//   set(obj: Spinner, prop: any, value: any) {
//     obj.loadingTip = value
//     return true
//   }
// }
// const obj: any = new Proxy(loadingCtor, result)
// obj.loadingTip = binding.value.tip
