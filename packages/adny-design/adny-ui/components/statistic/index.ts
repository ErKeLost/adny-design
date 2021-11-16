import AStatistic from "./src/statistic";
import { App } from "vue";

export { AStatistic };

AStatistic.install = function (app: App) {
  app.component(AStatistic.name, AStatistic);
};

export default {
  install(app: App): void {
    app.use(AStatistic as any);
  },
};
