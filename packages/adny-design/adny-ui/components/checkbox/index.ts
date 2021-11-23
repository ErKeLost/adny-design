import ACheckbox from "./src/checkbox.vue";

import { App } from "vue";

export { ACheckbox };

ACheckbox.install = function (app: App) {
  app.component(ACheckbox.name, ACheckbox);
};

export default {
  install(app: App) {
    app.use(ACheckbox as any);
  },
};
