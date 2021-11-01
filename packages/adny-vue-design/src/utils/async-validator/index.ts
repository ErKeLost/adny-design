import { ref } from 'vue'
import Schema from 'async-validator'
import { isEmpty, isArray } from '../common'
export function useValidate() {
  const errorMessage = ref('')
  const validate = async (rules, value) => {
    if (!isArray(rules) || !rules.length) {
      return true
    }
    const descriptor = {
      inputValidator: rules
    }
    const data = {
      inputValidator: value
    }
    const validator = new Schema(descriptor)
    validator.validate(data)
      .then(() => {
        errorMessage.value = ''

      }, ({ err, fields }) => {
        errorMessage.value = fields.inputValidator[0].message || null
      })
  }
  const validateOfTrigger = async <T>(validateTrigger: T[], trigger: T, rules: any, value: any) => {
    if (validateTrigger.includes(trigger)) {
      ; (await validate(rules, value)) && (errorMessage.value = '')
    }
  }
  const resetValidation = () => {
    errorMessage.value = ''
  }
  return { validate, errorMessage, validateOfTrigger, resetValidation }
}