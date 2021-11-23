export const sliderProps = {
  circleValue: {
    type: String,
    default: "",
  },
  h: {
    type: Number,
    required: true,
  },
  a: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
  },
  acolor: {
    type: String,
  },
  oc: {
    type: String,
  },
};
export const colorProps = {
  hsb: {
    type: Array,
    default: () => [],
  },
  rgb: {
    type: Array,
    default: () => [],
  },
  hex: {
    type: String,
    default: "",
  },
};
