import Theme from "vitepress/dist/client/theme-default";
import AdnyUI from "../../../adny-ui/components";
import AdnyDirective from "../../../adny-ui/directives";
import { registerComponents } from "./register-components";
export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(AdnyUI);
    app.use(AdnyDirective);
    registerComponents(app);
  },
};
