import Alert from "./src/alert.vue";
import { App } from "vue";
export { Alert };

Alert.install = function (app: App) {
  app.component(Alert.name, Alert);
};
export default {
  title: "Alert 导航",
  category: "反馈",
  status: "30%",
  install(app: App): void {
    app.use(Alert as any);
  },
};
