import type { PropType, ExtractPropTypes } from "vue";
export type positionType = PropType<
  "top-left" | "top-right" | "bottom-left" | "bottom-right"
>;

export const props = {
  overlay: {
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
  },
  position: {
    type: String as positionType,
    default: "top-right",
  },
  dot: {
    type: Boolean,
    default: false,
  },
  maxValue: {
    type: Number,
    default: 99,
  },
  color: {
    type: String,
    default: "",
  },
  value: {
    type: Number,
    default: 99,
  },
  type: {
    type: String,
    default: "",
  },
  hover: {
    type: Boolean,
    default: false,
  },
};
