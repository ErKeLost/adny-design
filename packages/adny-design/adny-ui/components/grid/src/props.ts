const gridItemProps = {
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  },
  xs: {
    type: Number || Object,
    default: 0
  },
  sm: {
    type: Number || Object,
    default: 0
  },
  md: {
    type: Number || Object,
    default: 0
  },
  lg: {
    type: Number || Object,
    default: 0
  },
  xl: {
    type: Number || Object,
    default: 0
  }
}

const gridProps = {
  span: {
    type: Number,
    default: 24
  },
  yGap: {
    type: Number,
    default: 0
  },
  gutter: {
    type: Number,
    default: 0
  }
}

export { gridProps, gridItemProps }
