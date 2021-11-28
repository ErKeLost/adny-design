import ATable from "./src/table.vue";
import { App } from "vue";

export { ATable };

ATable.install = function (app: App) {
  app.component(ATable.name, ATable);
};

export default {
  install(app: App): void {
    app.use(ATable as any);
  },
};
