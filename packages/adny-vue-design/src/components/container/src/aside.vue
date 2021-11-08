<template>
  <aside class="adny-aside" :style="style">
    <slot></slot>
  </aside>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'AAside',
  props: {
    width: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    return {
      style: computed(() => {
        return props.width
          ? ({ width: props.width } as CSSProperties)
          : {}
      }),
    }
  },
})
</script>
<style lang="less" scoped>
@import "../styles/container.less";
</style>