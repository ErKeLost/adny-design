import ASpace from "./src/space";
import { App } from "vue";
ASpace.install = function (app: App): void {
  app.component(ASpace.name, ASpace);
};

export { ASpace };

export default {
  title: "ProgressLinear 线性进度条",
  category: "反馈",
  status: "30%",
  install(app: App): void {
    app.use(ASpace as any);
  },
};
