import ABackTop from "./src/back-top.vue";
import { App } from "vue";
export { ABackTop };

ABackTop.install = function (app: App) {
  app.component(ABackTop.name, ABackTop);
};

export default {
  install(app: App) {
    app.use(ABackTop as any);
  },
};
