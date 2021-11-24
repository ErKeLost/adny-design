// import { getHooks } from "./src/utils/hookKey";
import { clickoutside, deleteClickOutside } from "./src/v-clickoutside";
import { App } from "vue";
// import { DEFAULT_PLUGIN_OPTIONS } from "./src/options";
// const ClickOutSideDirective = (app: any) => {
//   const hooks = getHooks(app);
//   const globalOptions = { ...DEFAULT_PLUGIN_OPTIONS };
//   console.log(globalOptions);

//   app.directive(globalOptions.directive, {
//     [hooks.mounted](el: HTMLElement, { value }: any) {
//       clickoutside(el, value);
//     },
//     [hooks.updated](el: HTMLElement, { value }: any) {
//       clickoutside(el, value);
//     },
//   });
// };
const ClickOutSideDirective = {
  mounted(el: HTMLElement, { value }: any) {
    clickoutside(el, value);
  },
  updated(el: HTMLElement, { value }: any) {
    clickoutside(el, value);
  },
};

export { ClickOutSideDirective };

export default {
  title: "Lazy 懒加载",
  category: "通用",
  status: "已完成",
  install(app: App): void {
    app.directive("ClickOutSide", ClickOutSideDirective);
  },
};
