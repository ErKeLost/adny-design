import { App } from "vue";

import ADatePicker from "./src/date-picker.vue";

export { ADatePicker };

ADatePicker.install = function (app: App) {
  app.component(ADatePicker.name, ADatePicker);
};

export default {
  install(app: App) {
    app.use(ADatePicker as any);
  },
};
