import ATabs from "./src/tabs.vue";
import { App } from "vue";

export { ATabs };

ATabs.install = function (app: App) {
  app.component(ATabs.name, ATabs);
};

export default {
  install(app: App): void {
    app.use(ATabs as any);
  },
};
