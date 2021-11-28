export type valueType = string | number

export const separator = (SeparatorString: string, groupSeparator: string): string => {
  const res = SeparatorString.replace(/\d+/, function (n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + groupSeparator
    })
  })
  return res
}

export const isHasDot = (value: number): boolean => {
  if (!isNaN(value)) {
    return (value + '').indexOf('.') !== -1
  }
}

export const analysisValueType = (
  value: valueType,
  groupSeparator: string,
  splitPrecisionNumber: number
): string => {
  if (typeof value === 'number') {
    return isHasDot(value)
      ? separator(value.toString(), groupSeparator)
      : separator(value.toFixed(splitPrecisionNumber).toString(), groupSeparator)
  } else {
    return value
  }
}
