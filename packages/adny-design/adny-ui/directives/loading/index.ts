import type { App } from "vue";
import LoadingDirective from "./src/loading-directive";

export { LoadingDirective };

export default {
  title: "Loading 加载中",
  category: "通用",
  status: "已完成",
  install(app: App): void {
    app.directive("Loading", LoadingDirective);
  },
};
