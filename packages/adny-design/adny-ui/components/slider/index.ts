import ASlider from "./src/slider.vue";
import { App } from "vue";

export { ASlider };

ASlider.install = function (app: App) {
  app.component(ASlider.name, ASlider);
};

export default {
  install(app: App): void {
    app.use(ASlider as any);
  },
};
