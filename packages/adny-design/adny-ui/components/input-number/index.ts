import AInputNumber from "./src/input-number";

import type { App } from "vue";

AInputNumber.install = function (app: App): void {
  app.component(AInputNumber.name, AInputNumber);
};

export { AInputNumber };

export default {
  title: "AIput 输入框",
  category: "反馈",
  status: "30%",
  install(app: App): void {
    app.use(AInputNumber as any);
  },
};
