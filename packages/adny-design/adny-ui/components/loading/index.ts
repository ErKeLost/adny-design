import ALoading from "./src/loading.vue";

import type { App } from "vue";

ALoading.install = function (app: App): void {
  app.component(ALoading.name, ALoading);
};

export { ALoading };

export default {
  title: "AIput 输入框",
  category: "反馈",
  status: "30%",
  install(app: App): void {
    app.use(ALoading as any);
  },
};
