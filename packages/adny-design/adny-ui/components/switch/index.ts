import ASwitch from "./src/switch.vue";
import { App } from "vue";

export { ASwitch };

ASwitch.install = function (app: App) {
  app.component(ASwitch.name, ASwitch);
};

export default {
  install(app: App): void {
    app.use(ASwitch as any);
  },
};
