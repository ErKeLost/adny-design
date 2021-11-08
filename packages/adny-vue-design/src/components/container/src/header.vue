<template>
  <header class="adny-header" :style="style">
    <slot></slot>
  </header>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'AHeader',
  props: {
    height: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    return {
      style: computed(
        () =>
          (props.height
            ? {
              height: props.height,
            }
            : {}) as CSSProperties
      ),
    }
  },
})
</script>
<style lang="less" scoped>
@import "../styles/container.less";
@import "../../../styles/adny.less";
</style>