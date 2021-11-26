import type { App } from "vue";
import CopyDirective from "./src/copy-directive";

export { CopyDirective };

export default {
  title: "Lazy 懒加载",
  category: "通用",
  status: "已完成",
  install(app: App): void {
    app.directive("copy", CopyDirective);
  },
};
