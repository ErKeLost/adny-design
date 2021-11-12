<template>
  <div
    :class="[
      'adny-grid',
      `adny-grid--${span}`,
      gridItemOffsetStyle,
      `adny-grid-xs--${xs}`,
      `adny-grid-sm--${sm}`,
      `adny-grid-md--${md}`,
      `adny-grid-lg--${lg}`,
      `adny-grid-xl--${xl}`
    ]"
    :style="gutterStyle"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance, inject } from 'vue'
import { gridItemProps } from './props'
export default defineComponent({
  name: 'AGridItem',
  alias: ['AGi'],
  props: gridItemProps,
  setup(props) {
    const gutter = inject('gutter')
    const item = getCurrentInstance()
    const gridItemOffsetStyle = computed(() => {
      if (props.offset !== 0) {
        return `adny-offset--${props.offset}`
      }
    })
    const getXSclass = computed(() => {
      return `adny-grid-response-${props.xs}`
    })
    const gutterStyle = computed(() => {
      return {
        paddingLeft: `${gutter / 2}px`,
        paddingRight: `${gutter / 2}px`
      }
    })

    return {
      gridItemOffsetStyle,
      getXSclass,
      gutter,
      gutterStyle
    }
  }
})
</script>

<style lang="scss">
.adny-grid {
  display: inline-block;
  box-sizing: border-box;
}
@media only screen and (max-width: 767px) {
  @for $i from 1 through 24 {
    .adny-grid-xs--#{$i} {
      width: 100% / 24 * $i !important;
    }
  }
}
@media only screen and (min-width: 768px) {
  @for $i from 1 through 24 {
    .adny-grid-sm--#{$i} {
      width: 100% / 24 * $i !important;
    }
  }
}
@media only screen and (min-width: 992px) {
  @for $i from 1 through 24 {
    .adny-grid-md--#{$i} {
      width: 100% / 24 * $i !important;
    }
  }
}
@media only screen and (min-width: 1200px) {
  @for $i from 1 through 24 {
    .adny-grid-lg--#{$i} {
      width: 100% / 24 * $i !important;
    }
  }
}
@media only screen and (min-width: 1920px) {
  @for $i from 1 through 24 {
    .adny-grid-xl--#{$i} {
      width: 100% / 24 * $i !important;
    }
  }
}
@for $i from 1 through 24 {
  .adny-grid--#{$i} {
    width: (100% / 24 * $i);
  }
}
@for $i from 1 through 24 {
  .adny-offset--#{$i} {
    margin-left: (100% / 24 * $i);
  }
}
</style>
