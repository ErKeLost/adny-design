import AOverlay from "./src/overlay";
import { App } from "vue";
AOverlay.install = function (app: App): void {
  app.component(AOverlay.name, AOverlay);
};

export { AOverlay };

export default {
  title: "Pagination 线性进度条",
  category: "反馈",
  status: "30%",
  install(app: App): void {
    app.use(AOverlay as any);
  },
};
