<template>
  <div
    class="var-image var--box"
    :style="{
      width: toSizeUnit(width),
      height: toSizeUnit(height),
      'border-radius': toSizeUnit(radius),
    }"
    :class="[!block ? 'var--inline-block' : null]"
  >
    <img
      class="var-image__image"
      :alt="alt"
      :lazy-error="error"
      :lazy-loading="loading"
      :style="{ objectFit: fit }"
      v-if="lazy"
      @load="handleLoad"
      @error="handleError"
      @click="onClick"
    />

    <img
      class="var-image__image"
      :alt="alt"
      :style="{ objectFit: fit }"
      :src="src"
      v-else
      @load="handleLoad"
      @error="handleError"
      @click="onClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { props } from './props'
import { toSizeUnit } from '../../../utils/elements'
// import type { LazyHTMLElement } from '../lazy'

export default defineComponent({
  name: 'VarImage',
  props,
  setup(props) {
    const handleLoad = (e: Event) => {
      // const el: LazyHTMLElement = e.currentTarget as LazyHTMLElement
      // const { lazy, onLoad, onError } = props

      // if (lazy) {
      //   el._lazy.state === 'success' && onLoad?.(e)
      //   el._lazy.state === 'error' && onError?.(e)
      // } else {
      //   onLoad?.(e)
      // }
    }

    const handleError = (e: Event) => {
      const { lazy, onError } = props

      !lazy && onError?.(e)
    }

    return {
      toSizeUnit,
      handleLoad,
      handleError,
    }
  },
})
</script>

<style lang="less">
@import "../../../styles/common";
@import "../styles/images";
</style>
