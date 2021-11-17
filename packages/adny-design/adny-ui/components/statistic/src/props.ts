import { PropType } from "vue";
export const props = {
  title: {
    type: String,
    default: "",
  },
  value: {
    type: Number,
    default: null,
  },
  prefix: {
    type: String,
  },
  suffix: {
    type: String,
  },
  titleStyle: {
    type: Object,
    default: () => {},
  },
  contentStyle: {
    type: Object,
    default: () => {},
  },
};
