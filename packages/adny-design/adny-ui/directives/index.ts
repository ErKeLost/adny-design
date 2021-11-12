import RippleInstall, { RippleDirective } from "./ripple";
import { App } from "vue";
const installed = [RippleInstall];

export { RippleDirective };

export default {
  version: "0.0.1",
  install(app: App): void {
    installed.forEach((p) => app.use(p as any));
  },
};
