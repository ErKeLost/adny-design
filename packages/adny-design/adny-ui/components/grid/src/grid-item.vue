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

<style lang="less">
.adny-grid {
  display: inline-block;
  box-sizing: border-box;
}
each(range(24), {
    .adny-grid--@{value} {
    width: (100% / 24 * @value);
  }
  .adny-offset--@{value} {
    margin-left: (100% / 24 * @value);
  }
})

@media only screen and (min-width: 768px) {
    each(range(24), {
    .adny-grid-sm--@{value} {
      width: calc(100% / 24 * @value) !important;
    }
  })
}
@media only screen and (max-width: 767px) {
    each(range(24), {
    .adny-grid-xs--@{value} {
      width: calc(100% / 24 * @value) !important;
    }
  })
}
@media only screen and (min-width: 992px) {
    each(range(24), {
    .adny-grid-md--@{value} {
      width: calc(100% / 24 * @value) !important;
    }
  })
}
@media only screen and (min-width: 1920px) {
    each(range(24), {
    .adny-grid-xl--@{value} {
      width: calc(100% / 24 * @value) !important;
    }
  })
}
@media only screen and (min-width: 1200px) {
    each(range(24), {
    .adny-grid-lg--@{value} {
      width: calc(100% / 24 * @value) !important;
    }
  })
}
</style>
