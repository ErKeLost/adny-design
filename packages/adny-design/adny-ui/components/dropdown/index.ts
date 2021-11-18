import ADropDown from "./src/dropdown.vue";
import type { App } from "vue";

ADropDown.install = function (app: App): void {
  app.component(ADropDown.name, ADropDown);
};
export { ADropDown };

export default {
  title: "AForm 表单",
  category: "反馈",
  status: "30%",
  install(app: App): void {
    app.use(ADropDown as any);
  },
};
