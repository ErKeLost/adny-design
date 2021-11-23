import ASkeleton from "./src/skeleton.vue";
import { App } from "vue";
ASkeleton.install = function (app: App): void {
  app.component(ASkeleton.name, ASkeleton);
};

export { ASkeleton };

export default {
  title: "Skeleton 线性进度条",
  category: "反馈",
  status: "30%",
  install(app: App): void {
    app.use(ASkeleton as any);
  },
};
