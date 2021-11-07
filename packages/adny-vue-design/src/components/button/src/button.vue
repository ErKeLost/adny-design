<template>
  <button
    class="adny-button adny--box"
    v-ripple="{ disabled }"
    :class="[
      `adny-button--${size}`,
      block ? 'adny--flex adny-button--block' : 'adny--inline-flex',
      disabled ? 'adny-button--disabled' : null,
      text ? `adny-button--text-${type}` : `adny-button--${type}`,
      text ? 'adny-button--text' : `adny-elevation--${elevation}`,
      text && disabled ? 'adny-button--text-disabled' : null,
      round ? 'adny-button--round' : null,
      outline ? 'adny-button--outline' : null,
      depressed ? 'adny-button--depressed' : null,
      fab && size === 'large' ? 'adny-button--float-large' : null,
      fab && size === 'small' ? 'adny-button--float-small' : null,
      fab && size === 'mini' ? 'adny-button--float-mini' : null,
      fab && size === 'normal' ? 'adny-button--float-normal' : null,
      icon ? 'adny-button--icon' : null,
      tite ? 'adny-button--tite' : null,
    ]"
    :style="{ color }"
  >
    <slot />
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { RippleDirective } from '../../../directives/ripple'
export default defineComponent({
  name: 'ABtn',
  directives: {
    ripple: RippleDirective
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'normal'
    },
    color: {
      type: String
    },
    elevation: {
      type: String,
      default: '2'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    depressed: {
      type: Boolean,
      default: false
    },
    fab: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    },
    tite: {
      type: Boolean,
      default: false
    }
  }
})
</script>
<style lang="less">
@import "../../../styles/common";
@import "../../../styles/elevation";
@import "../styles/ABtn.less";
</style>