<template>
  <div class="adny-tooltip">
    <slot name="host"></slot>
    <div class="adny-tooltip-tooltips">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { tooltipProps } from './props'
export default defineComponent({
  name: 'ATooltip',
  props: tooltipProps,
  setup(props) {
    return {

    }
  }
})
</script>

<style lang="less">
@import "../styles/tooltip.less";
</style>