import AInput from "./src/input";

import type { App } from "vue";

AInput.install = function (app: App): void {
  app.component(AInput.name, AInput);
};

export { AInput };

export default {
  title: "AIput 输入框",
  category: "反馈",
  status: "30%",
  install(app: App): void {
    app.use(AInput as any);
  },
};
