import Theme from "vitepress/dist/client/theme-default";
import AdnyUI from "../../../adny-ui/components";
import { registerComponents } from "./register-components";
export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(AdnyUI);
    registerComponents(app);
  },
};
