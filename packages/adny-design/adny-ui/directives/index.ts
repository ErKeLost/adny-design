import RippleInstall, { RippleDirective } from "./ripple";
import LoadingInstall, { LoadingDirective } from "./loading";
import LazyInstall, { LazyDirective } from "./lazy";
import ClickOutSideInstall, { ClickOutSideDirective } from "./clickoutside";
import CopyInstall, { CopyDirective } from "./copy";
import ImagePreviewInstall, {
  ImagePreviewDirective,
} from "../components/image-preview";
import { App } from "vue";
const installed = [
  RippleInstall,
  LoadingInstall,
  LazyInstall,
  ImagePreviewInstall,
  CopyInstall,
  ClickOutSideInstall,
];

export { RippleDirective };

export default {
  version: "0.0.1",
  install(app: App): void {
    installed.forEach((p) => app.use(p as any));
  },
};
