import ASpin from "./src/spinner.vue";
import { App } from "vue";

export { ASpin };

ASpin.install = function (app: App) {
  app.component(ASpin.name, ASpin);
};

export default {
  install(app: App): void {
    app.use(ASpin as any);
  },
};
