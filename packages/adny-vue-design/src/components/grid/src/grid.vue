

<template>
  <div class="adny-grid-container" :style="gridColsStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { CSSProperties } from 'vue'
import { gridProps } from './props'
export default defineComponent({
  name: 'AGrid',
  props: gridProps,
  setup(props) {
    const gridColsStyle = computed<CSSProperties>(() => {
      return props.cols || props.xGap || props.yGap ? {
        gridTemplateColumns: `repeat(${props.cols}, minmax(0, 1fr))`,
        gap: `${props.yGap}px ${props.xGap}px`
      } : null
    })
    console.log(props.xGap);
    console.log(gridColsStyle.value);

    return {
      gridColsStyle
    }
  }
})
</script>

<style lang="less">
.adny-grid-container {
  display: grid;
  grid-template-rows: repeat(3, 33.33%);
}
</style>