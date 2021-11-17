import type { PropType, ExtractPropTypes } from "vue";
export type positionType = PropType<
  "top-left" | "top-right" | "bottom-left" | "bottom-right"
>;

export const props = {
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
    default: 0,
  },
  type: {
    type: String,
    default: "",
  },
};
