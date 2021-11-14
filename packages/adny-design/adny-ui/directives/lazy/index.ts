import type { App } from "vue";
import LazyDirective from "./src/lazy-directive";

export { LazyDirective };

export default {
  title: "Lazy 懒加载",
  category: "通用",
  status: "已完成",
  install(app: App): void {
    app.directive("Lazy", LazyDirective);
  },
};
