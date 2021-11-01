<template>
  <div
    class="adny-input adny--box"
    :class="[disabled ? 'adny-input--disabled' : null]"
    @click="handleClick"
  >
    <div
      class="adny-input__controller"
      :class="[
        isFocus ? 'adny-input--focus' : null,
        disabled ? 'adny-input--disabled' : null,
      ]"
      :style="{
        color: isFocus ? focusColor : blurColor,
      }"
    >
      <div class="adny-input__wrap" :class="[!hint ? 'adny-input--non-hint' : null]">
        <input class="adny-input__autocomplete" v-if="type === 'password'" />
        <component
          class="adny-input__input"
          ref="el"
          autocomplete="new-password"
          :is="textarea ? 'textarea' : 'input'"
          :id="id"
          :disabled="disabled || readonly"
          :type="type"
          :value="modelValue"
          :maxlength="maxlength"
          :rows="rows"
          :class="[
            disabled ? 'adny-input--disabled' : null,
            textarea ? 'adny-input--textarea' : null,
          ]"
          :style="{
            color: textColor,
            resize: resize ? 'vertical' : 'none',
          }"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
          @change="handleChange"
        />
        <label
          :class="[
            textarea ? 'adny-input__textarea-placeholder' : 'adny-input__placeholder',
            computePlaceholderState(),
            !hint ? 'adny-input--placeholder-non-hint' : null,
          ]"
          :for="id"
        >{{ placeholder }}</label>
      </div>
    </div>

    <div
      class="adny-input__line"
      :class="[
        disabled ? 'adny-input--line-disabled' : null,
      ]"
      :style="{ background: blurColor }"
      v-if="line"
    >
      <div
        class="adny-input__dot"
        :class="[
          isFocus ? 'adny-input--spread' : null,
          disabled ? 'adny-input--line-disabled' : null,
        ]"
        :style="{ background: focusColor }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, computed, nextTick } from 'vue'
import { props } from './props'
import type { Ref, ComputedRef } from 'vue'
export default defineComponent({
  name: 'adnyInput',
  components: {
  },
  props,
  setup(props) {
    const id: Ref<string> = ref(`adny-input-${getCurrentInstance()!.uid}`)
    const el: Ref<HTMLInputElement | null> = ref(null)
    const isFocus: Ref<boolean> = ref(false)
    const maxlengthText: ComputedRef<string> = computed(() => {
      const { maxlength, modelValue } = props
      if (!maxlength) {
        return ''
      }
      return `${String(modelValue).length}/${maxlength}`
    })
    const computePlaceholderState = () => {
      const { hint, modelValue } = props
      if (!hint) {
        return 'adny-input--placeholder-hidden'
      }
      if (hint && isFocus.value) {
        return 'adny-input--placeholder-hint'
      }
    }
    const handleFocus = (e: FocusEvent) => {
      isFocus.value = true
      props.onFocus?.(e)
    }
    const handleBlur = (e: FocusEvent) => {
      isFocus.value = false
      props.onBlur?.(e)
    }
    const handleInput = (e: Event) => {
      const { value } = e.target as HTMLInputElement
      props['onUpdate:modelValue']?.(value)
      props.onInput?.(value, e)
    }
    const handleChange = (e: Event) => {
      const { value } = e.target as HTMLInputElement
      props.onChange?.(value, e)
    }
    const handleClear = () => {
      const { disabled, readonly, clearable, onClear } = props
      props['onUpdate:modelValue']?.('')
      onClear?.('')
    }
    const handleClick = (e: Event) => {
      const { disabled, onClick } = props
      onClick?.(e)
    }
    // expose
    const reset = () => {
      props['onUpdate:modelValue']?.('')
    }
    // expose
    // expose
    const focus = () => {
      ; (el.value as HTMLInputElement).focus()
    }
    // expose
    const blur = () => {
      ; (el.value as HTMLInputElement).blur()
    }
    return {
      el,
      id,
      isFocus,
      maxlengthText,
      computePlaceholderState,
      handleFocus,
      handleBlur,
      handleInput,
      handleChange,
      handleClear,
      handleClick,
      reset,
      focus,
      blur,
    }
  },
})
</script>

<style lang="less">
@import "../../../styles/common.less";
@import "../../../styles/elevation.less";
@import "../styles/input.less";
</style>
