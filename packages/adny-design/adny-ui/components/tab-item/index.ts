import ATabItem from "./src/tab-item.vue";
import { App } from "vue";

export { ATabItem };

ATabItem.install = function (app: App) {
  app.component(ATabItem.name, ATabItem);
};

export default {
  install(app: App): void {
    app.use(ATabItem as any);
  },
};
