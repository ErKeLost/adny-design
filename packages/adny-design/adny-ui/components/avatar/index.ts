import AAvatar from "./src/avatar.vue";
import { App } from "vue";
export { AAvatar };

AAvatar.install = function (app: App) {
  app.component(AAvatar.name, AAvatar);
};

export default {
  install(app: App) {
    app.use(AAvatar as any);
  },
};
