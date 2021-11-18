import ATooltip from "./src/tooltip.vue";
import { App } from "vue";

export { ATooltip };

ATooltip.install = function (app: App) {
  app.component(ATooltip.name, ATooltip);
};

export default {
  install(app: App): void {
    app.use(ATooltip as any);
  },
};
