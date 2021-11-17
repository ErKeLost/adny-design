import ABadge from "./src/badge";
import type { App } from "vue";

ABadge.install = function (app: App): void {
  app.component(ABadge.name, ABadge);
};

export { ABadge };

export default {
  title: "ABtn 按钮",
  category: "反馈",
  status: "30%",
  install(app: App): void {
    app.use(ABadge as any);
  },
};
