import ARadio from "./src/radio.vue";
import { App } from "vue";

export { ARadio };

ARadio.install = function (app: App) {
  app.component(ARadio.name, ARadio);
};

export default {
  install(app: App): void {
    app.use(ARadio as any);
  },
};
