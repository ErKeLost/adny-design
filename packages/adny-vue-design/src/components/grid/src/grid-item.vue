
<template>
  <div class="adny-grid-item-container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { gridItemProps } from './props'
export default defineComponent({
  name: 'AGridItem',
  alias: ['AGi'],
  props: gridItemProps,
  setup() {

    return {

    }
  }
})
</script>

<style lang="less">
.adny-grid-item-container {
}
</style>