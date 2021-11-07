import { defineComponent, ref, computed, nextTick, watch, inject, getCurrentInstance } from 'vue'
import { AdnyFormDetail } from '../../form-details'
import { props } from './props'
import { isEmpty } from '../../../utils/common'
import { useValidate } from '../../../utils/async-validator'
import '../../../styles/common.less'
import '../../../styles/elevation.less'
import '../styles/input.less'
export default defineComponent({
  name: 'AInput',
  props,
  components: {
    AdnyFormDetail
  },
  setup(props, { emit, slots }) {
    const inputInstance = getCurrentInstance()
    const injectFormItem = inject('name', ref({}))
    const { resetValidation, validateOfTrigger, errorMessage } = useValidate()

    const validateWithTrigger = (trigger) => {
      nextTick(() => {
        const { validateTrigger, rules, modelValue } = props
        validateOfTrigger(validateTrigger, trigger, rules, modelValue)
      })
    }
    const isInputValue = ref(false)
    const isFocus = ref(false)
    const maxlengthText = computed(() => {
      const { maxlength, modelValue } = props
      if (!maxlength) {
        return ''
      }
      if (isEmpty(modelValue)) {
        return `0 / ${maxlength}`
      }
      return `${String(modelValue).length}/${maxlength}`
    })
    const handleClick = (event: MouseEvent) => {
      const { disabled, onClick } = props
      if (disabled) return
      onClick?.(event)
    }
    const handleFocus = (e: FocusEvent) => {
      isFocus.value = true
      props.onFocus?.(e)
      validateWithTrigger('onFocus')
    }
    const handleBlur = (e: FocusEvent) => {
      isFocus.value = false
      props.onBlur?.(e)
      validateWithTrigger('onBlur')
    }
    const reset = () => {
      props['onUpdate:modelValue']?.('')
      resetValidation()
    }
    const handleInput = (e: Event) => {
      const { value } = e.target as HTMLInputElement
      if (!isEmpty(value)) {
        isInputValue.value = true
      }
      props['onUpdate:modelValue']?.(value)
      props.onInput?.(value, e)
      validateWithTrigger('onInput')
      inputInstance?.parent?.exposed?.validator()
    }
    const handleInputChange = (e: Event) => {
      const { value } = e.target as HTMLInputElement
      props.onChange?.(value, e)
      validateWithTrigger('onChange')
    }

    return () => {
      return (
        <div
          class={[
            'adny-input',
            'adny--box',
            props.error ? 'adny-input--error' : null,
            props.success ? 'adny-input--success' : null,
            props.disabled ? `adny-input--disabled` : null
          ]}
          onClick={handleClick}
        >
          <div
            style={{
              color:
                props.error || errorMessage.value
                  ? isFocus.value
                    ? props.focusColor
                    : props.blurColor
                  : null
            }}
            class={[
              'adny-input__controller',
              isFocus.value ? 'adny-input--focus' : null,
              props.error || errorMessage.value ? 'adny-input--error' : null,
              props.success && !errorMessage.value ? 'adny-input--success' : null
            ]}
          >
            <div class={['adny-input__wrap', !props.hint ? 'adny-input--non-hint' : null]}>
              {props.type === 'password' ? (
                <input type={props.type} class="adny-input__autocomplate" />
              ) : null}
              {props.textarea ? (
                <textarea
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  autocomplete="new-password"
                  onInput={handleInput}
                  onChange={handleInputChange}
                  value={props.modelValue}
                  maxlength={props.maxlength}
                  disabled={props.disabled || props.readonly}
                  rows={props.rows}
                  class={[
                    'adny-input__input',
                    props.textarea ? 'adny-input--textarea' : null,
                    props.disabled ? 'adny-input--disabled' : null,
                    props.error || errorMessage.value ? 'adny-input--caret-error' : null,
                    props.success && !errorMessage.value ? 'adny-input--caret-success' : null
                  ]}
                  style={{
                    color: props.textColor,
                    caretColor: !props.error || errorMessage.value ? props.focusColor : null,
                    resize: props.resize ? 'vertical' : 'none'
                  }}
                />
              ) : (
                <input
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onInput={handleInput}
                  onChange={handleInputChange}
                  value={props.modelValue}
                  id={injectFormItem}
                  name={injectFormItem}
                  maxlength={props.maxlength}
                  disabled={props.disabled || props.readonly}
                  type={props.type}
                  class={[
                    'adny-input__input',
                    props.textarea ? 'adny-input--textarea' : null,
                    props.disabled ? 'adny-input--disabled' : null,
                    props.error ? 'adny-input--caret-error' : null,
                    props.success && !errorMessage.value ? 'adny-input--caret-success' : null
                  ]}
                  style={{
                    color: props.textColor,
                    caretColor: !props.error ? props.focusColor : null,
                    resize: props.resize ? 'vertical' : 'none'
                  }}
                />
              )}
              <label
                style={{
                  color: props.focusColor
                }}
                class={[
                  props.textarea ? 'adny-input__textarea-placeholder' : 'adny-input__placeholder',
                  !props.hint && (!isEmpty(props.modelValue) || isInputValue.value === true)
                    ? 'adny-input--placeholder-hidden'
                    : null,
                  props.hint && (!isEmpty(props.modelValue) || isFocus.value)
                    ? 'adny-input--placeholder-hint'
                    : null,
                  !props.hint ? 'adny-input--placeholder-non-hint' : null
                ]}
              >
                {props.placeholder}
              </label>
            </div>
          </div>
          {props.line ? (
            <div
              style={{
                background: !errorMessage.value ? props.blurColor : null
              }}
              class={[
                'adny-input__line',
                props.disabled ? 'adny-input--line-disabled' : null,
                errorMessage.value || props.error ? 'var-input--line-error' : null,
                props.success && !errorMessage.value ? 'adny-input--line-success' : null
              ]}
            >
              <div
                class={[
                  'adny-input__dot',
                  isFocus.value ? 'adny-input--spread' : null,
                  props.disabled ? 'adny-input--line-disabled' : null,
                  props.error || errorMessage.value ? 'adny-input--line-error' : null,
                  props.success && !errorMessage.value ? 'adny-input--line-success' : null
                ]}
                style={{
                  background: errorMessage.value ? props.focusColor : null
                }}
              ></div>
            </div>
          ) : null}
          {props.rules ? (
            <adny-form-detail
              error-message={errorMessage.value}
              maxlength-text={maxlengthText.value}
            />
          ) : null}
        </div>
      )
    }
  }
})
