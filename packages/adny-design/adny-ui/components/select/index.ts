import ASelect from "./src/select.vue";
import { App } from "vue";

export { ASelect };

ASelect.install = function (app: App) {
  app.component(ASelect.name, ASelect);
};

export default {
  install(app: App): void {
    app.use(ASelect as any);
  },
};
