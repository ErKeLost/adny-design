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
      fab ? 'adny-button--float' : null,
      icon ? 'adny-button--icon' : null,
      `adny-button--${color}`
    ]"
  >
      <slot />
  </button>
</template>
    
<script lang="ts" setup>
const props = withDefaults(defineProps<{
    type?: string,
    size?: string,
    color?: string,
    elevation?: string,
    disabled?: boolean,
    text?: boolean,
    round?: boolean,
    outline?: boolean,
    block?: boolean,
    depressed?: boolean,
    fab?: boolean,
    icon?: boolean,
}>(), {
    type: 'default',
    size: 'normal',
    elevation: "2",
    text: false,
    round: false,
    outline: false,
    block: false,
    disabled: false,
    depressed: false,
    fab: false,
    icon: false,
})

</script>
<script lang="ts">
import { defineComponent } from 'vue'
import { RippleDirective } from '../../../directives/ripple'
export default defineComponent({
  directives: {
    ripple: RippleDirective
  }
})
</script>
<style lang="less">
@import '../../../styles/common';
@import '../../../styles/elevation';
@import '../styles/ABtn.less';
</style>