import ATab from "./src/tab.vue";
import { App } from "vue";

export { ATab };

ATab.install = function (app: App) {
  app.component(ATab.name, ATab);
};

export default {
  install(app: App): void {
    app.use(ATab as any);
  },
};
