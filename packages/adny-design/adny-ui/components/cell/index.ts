import ACell from "./src/cell.vue";
import { App } from "vue";
export { ACell };

ACell.install = function (app: App) {
  app.component(ACell.name, ACell);
};

export default {
  install(app: App) {
    app.use(ACell as any);
  },
};
