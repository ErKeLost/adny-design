import AStepsGuide from "./src/steps-guide";
import { App } from "vue";
AStepsGuide.install = function (app: App): void {
  app.component(AStepsGuide.name, AStepsGuide);
};

export { AStepsGuide };

export default {
  title: "Pagination 线性进度条",
  category: "反馈",
  status: "30%",
  install(app: App): void {
    app.use(AStepsGuide as any);
  },
};
