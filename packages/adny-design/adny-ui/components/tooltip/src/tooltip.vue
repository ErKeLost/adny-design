<template>
  <div class="adny-tooltip">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { props } from './props'
export default defineComponent({
  name: 'ATooltip',
  props,
  setup(props) {
    return {

    }
  }
})
</script>
<style lang="less">
@import "../styles/tooltip";
</style>