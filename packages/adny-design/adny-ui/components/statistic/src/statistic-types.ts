import type { PropType, ExtractPropTypes, CSSProperties } from 'vue'

export const statisticProps = {
  title: {
    type: String,
    default: ''
  },
  value: {
    type: [Number, String]
  },
  prefix: {
    type: String
  },
  suffix: {
    type: String
  },
  precision: {
    type: Number
  },
  groupSeparator: {
    type: String,
    default: ','
  },
  titleStyle: {
    type: Object as PropType<CSSProperties>
  },
  contentStyle: {
    type: Object as PropType<CSSProperties>
  },
  animationDuration: {
    type: Number,
    default: 2000
  },
  valueFrom: {
    type: Number,
    default: 0
  },
  animation: {
    type: Boolean,
    default: false
  },
  start: {
    type: Boolean,
    default: false
  }
} as const

export type StatisticProps = ExtractPropTypes<typeof statisticProps>
