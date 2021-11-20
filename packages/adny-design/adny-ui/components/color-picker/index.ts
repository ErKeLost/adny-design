import { App } from "vue";

import AColorPicker from "./src/color-picker.vue";

export { AColorPicker };

AColorPicker.install = function (app: App) {
  app.component(AColorPicker.name, AColorPicker);
};

export default {
  install(app: App) {
    app.use(AColorPicker as any);
  },
};
