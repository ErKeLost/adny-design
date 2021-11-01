import type { PropType } from "vue";

function fitValidator(fit: string) {
  return ["fill", "contain", "cover", "none", "scale-down"].includes(fit);
}

export const props = {
  footerPosition: {
    type: String,
    default: "left",
  },
  hover: {
    type: Boolean,
    default: false,
  },
  shaped: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  continue: {
    type: Boolean,
    default: false,
  },
  src: {
    type: String,
  },
  fit: {
    type: String as PropType<
      "fill" | "contain" | "cover" | "none" | "scale-down"
    >,
    validator: fitValidator,
    default: "cover",
  },
  height: {
    type: [String, Number],
  },
  alt: {
    type: String,
  },
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  content: {
    type: String,
  },
  elevation: {
    type: [Number, String],
  },
  onClick: {
    type: Function as PropType<(e: Event) => void>,
  },
};
