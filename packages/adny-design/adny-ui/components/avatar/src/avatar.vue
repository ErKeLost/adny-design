<template>
  <div class="adny-avatar" :class="avatarClass" :style="avatarStyle" @click="onClick">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { props } from './props'
export default defineComponent({
  name: 'AAvatar',
  props,
  setup(props, ctx) {
    const avatarClass = computed(() => {
      const color = `adny-avatar-${props.type}`
      console.log(props.color);
      return [
        props.color !== null ? null : color,
      ]
    })
    const avatarStyle = computed(() => {
      return {
        backgroundColor: props.color,
        height: `${props.size}px`,
        width: `${props.size}px`,
        maxWidth: `${props.size}px`
      }
    })
    return {
      avatarStyle,
      avatarClass
    }
  }
})
</script>
<style lang="less">
@import "../styles/avatar.less";
</style>