

<template>
  <div :class="['adny-grid-container', `adny-grid--${span}`]" :style="gridColsStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance, provide, ref, onMounted } from 'vue'
import { CSSProperties } from 'vue'
import { gridProps } from './props'
export default defineComponent({
  name: 'AGrid',
  props: gridProps,
  setup(props) {
    const gridColsStyle = computed<CSSProperties>(() => {
      return props.gutter ? {
        marginLeft: `(${props.gutter} / 2)px`,
        marginRight: `(${props.gutter} / 2)px`
      } : null
    })
    provide('gutter', props.gutter)
    return {
      gridColsStyle,
    }
  }
})
</script>

<style lang="scss">
.adny-grid-container {
  display: flex;
  flex-wrap: wrap;
  // display: grid;
  // grid-template-columns: repeat(auto-fill, 100px);
}
</style>