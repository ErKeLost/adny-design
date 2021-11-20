import type { ExtractPropTypes } from "vue";

export const triggerProps = {
  container: {
    type: String,
    default: "",
    // container  idName
  },
  left: {
    type: Boolean,
    default: false,
  },
  right: {
    type: Boolean,
    default: false,
  },
  top: {
    type: Boolean,
    default: false,
  },
  bottom: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
  },
  trigger: {
    type: String,
    default: "hover",
  },
  mouseLeaveDelay: {
    type: String,
    default: "150",
  },
  mouseEnterDelay: {
    type: String,
    default: "100",
  },
} as const;

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>;
