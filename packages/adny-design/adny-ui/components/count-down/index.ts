import { App } from "vue";

import CountDown from "./src/count-down.vue";

export { CountDown };

CountDown.install = function (app: App) {
  app.component(CountDown.name, CountDown);
};

export default {
  install(app: App) {
    app.use(CountDown as any);
  },
};
