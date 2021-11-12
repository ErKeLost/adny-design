<template>
  <footer class="adny-footer" :style="style">
    <slot></slot>
  </footer>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'AFooter',
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
</style>