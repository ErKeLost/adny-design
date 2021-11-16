import { createApp, ref, defineComponent } from "vue";
import ASpin from "../../../../components/spin/src/spinner.vue";

export const createrippleElement = (): HTMLElement => {
  const LoadingElement = document.createElement("div");
  LoadingElement.style.display = "block";
  return LoadingElement;
};
