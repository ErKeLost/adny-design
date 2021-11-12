import ASticky from "./src/sticky.vue";
import { App } from "vue";

export { ASticky };
ASticky.install = function (app: App) {
  app.component(ASticky.name, ASticky);
};

export default {
  install(app: App) {
    app.use(ASticky as any);
  },
};
