export const props = {
  visibilityHeight: {
    type: [Number, String],
    default: 200,
  },
  duration: {
    type: Number,
    default: 300,
  },
  target: {
    type: String,
  },
  onClick: {
    type: Function,
  },
};
