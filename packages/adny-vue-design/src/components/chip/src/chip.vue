<template>
  <transition name="adny-fade">
    <span class="adny-chip adny--box" :class="contentClass" :style="chipStyles" v-bind="$attrs">
      <slot name="left" />

      <span :class="[`adny-chip--text-${size}`]">
        <slot />
      </span>

      <slot name="right" />

      <span v-if="closable" class="adny-chip--close" @click="onClose">
        <a-icon :name="`${iconName ? iconName : 'close-circle'}`" />
      </span>
    </span>
  </transition>
</template>

<script lang="ts">
import { AIcon } from '../../icon'
import { defineComponent, computed } from 'vue'
import { props } from './props'
import type { ComputedRef } from 'vue'

export default defineComponent({
  name: 'AChip',
  components: {
    AIcon,
  },
  inheritAttrs: false,
  props,
  setup(props) {
    const chipStyles = computed(() => {
      const { plain, textColor, color } = props

      if (plain) {
        return {
          color: textColor || color,
          borderColor: color,
        }
      }

      return {
        color: textColor,
        background: color,
      }
    })

    const contentClass: ComputedRef<Array<string | false | undefined>> = computed(() => {
      const { size, block, type, plain, round } = props

      const blockClass = block ? 'adny--flex' : 'adny--inline-flex'
      const plainTypeClass = plain ? `adny-chip--plain adny-chip--plain-${type}` : `adny-chip--${type}`
      const roundClass = round && 'adny-chip--round'

      return [`adny-chip--${size}`, blockClass, plainTypeClass, roundClass]
    })

    return {
      chipStyles,
      contentClass,
    }
  },
})
</script>

<style lang="less">
@import "../../../styles/common";
@import "../../icon/styles/icon";
@import "../styles/chip";
</style>
