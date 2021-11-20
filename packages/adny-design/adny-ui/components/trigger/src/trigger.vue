<template>
  <div class="adny-trigger">
    <slot></slot>
    <!-- <teleport :to="container || 'body'"> -->
    <transition name="adny-trigger-fade">
      <div class="adny-trigger-content">
        <slot name="content"></slot>
      </div>
    </transition>
    <!-- </teleport> -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { triggerProps } from './props'
export default defineComponent({
  name: 'ATrigger',
  props: triggerProps,
  setup(props) {
    return {

    }
  }
})
</script>

<style lang="less" scoped>
@import "../styles/trigger.less";
</style>