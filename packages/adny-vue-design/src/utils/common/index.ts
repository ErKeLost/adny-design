import { ref } from 'vue'

// 判断value 是否 为空  ？ ：
export const isEmpty = (val: unknown) => {
  return val === undefined || val === null || val === '' || (Array.isArray(val) && !val.length)
}

// 判断是否为数组
export const isArray = (val: unknown): val is Array<any> => Array.isArray(val)


// 验证函数

export function useValidation() {
  const errorMessage = ref('')

  const validate = async (rules, value, apis) => {
    if (!isArray(rules) || !rules.length) {
      return true
    }
    const resArr = await Promise.all(rules.map((rule) => rule(value, apis)))
    return !resArr.some((res) => {
      if (res !== true) {
        errorMessage.value = String(res)
        return true
      }
      return false
    })
  }
  const resetValidation = () => {
    errorMessage.value = ''
  }

  const validateWithTrigger = async <T>(validateTrigger: T[], trigger: T, rules: any, value: any, apis?: any) => {
    if (validateTrigger.includes(trigger)) {
      ; (await validate(rules, value, apis)) && (errorMessage.value = '')
    }
  }
  return {
    errorMessage,
    validate,
    resetValidation,
    validateWithTrigger,
  }
}