import ATrigger from "./src/trigger.vue";
import { App } from "vue";

export { ATrigger };

ATrigger.install = function (app: App) {
  app.component(ATrigger.name, ATrigger);
};

export default {
  install(app: App): void {
    app.use(ATrigger as any);
  },
};
