import APagination from "./src/pagination.vue";
import { App } from "vue";
APagination.install = function (app: App): void {
  app.component(APagination.name, APagination);
};

export { APagination };

export default {
  title: "Pagination 线性进度条",
  category: "反馈",
  status: "30%",
  install(app: App): void {
    app.use(APagination as any);
  },
};
