import ACheckboxGroup from "./src/checkbox-group.vue";

import { App } from "vue";

export { ACheckboxGroup };

ACheckboxGroup.install = function (app: App) {
  app.component(ACheckboxGroup.name, ACheckboxGroup);
};

export default {
  install(app: App) {
    app.use(ACheckboxGroup as any);
  },
};
