import { App } from "vue";

import ACounter from "./src/counter.vue";

export { ACounter };

ACounter.install = function (app: App) {
  app.component(ACounter.name, ACounter);
};

export default {
  install(app: App) {
    app.use(ACounter as any);
  },
};
