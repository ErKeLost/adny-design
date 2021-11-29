import Theme from "vitepress/dist/client/theme-default";
import AdnyUI from "../../../adny-ui/components";
import AdnyDirective from "../../../adny-ui/directives";
import Demo from "vitepress-theme-demoblock/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/components/DemoBlock.vue";
import "vitepress-theme-demoblock/theme/styles/index.css";
import { insertBaiduScript } from "./insert-baidu-script";
export default {
  ...Theme,
  enhanceApp({ app }) {
    app.component("Demo", Demo);
    app.component("DemoBlock", DemoBlock);
    app.use(AdnyUI);
    app.use(AdnyDirective);
    insertBaiduScript();
  },
};
