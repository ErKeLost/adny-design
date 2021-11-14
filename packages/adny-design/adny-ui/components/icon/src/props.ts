import type { PropType } from "vue";

export const props = {
  name: {
    type: String,
  },
  size: {
    type: [Number, String],
    default: 25,
  },
  color: {
    type: String,
  },
  namespace: {
    type: String,
    default: "adny-icon",
  },
  transition: {
    type: [Number, String],
    default: 0,
  },
  onClick: {
    type: Function as PropType<(event: Event) => void>,
  },
};
