<template>
  <div class="var-back-top" :class="[show ? 'var-back-top--active' : null]" @click.stop="click">
    <slot>
      <a-btn text type="success" icon>
        <a-icon name="window-close"></a-icon>
      </a-btn>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { ABtn } from '../../button'
import { AIcon } from '../../icon'
import { props } from './props'
import { isString, easeInOutCubic, throttle, toNumber } from '../../../utils/shared'
import { getScrollTop, getScrollLeft, scrollTo } from '../../../utils/elements'
import type { Ref } from 'vue'

export default defineComponent({
  name: 'ABackTop',
  components: {
    ABtn,
    AIcon,
  },
  props,
  setup(props) {
    let element: HTMLElement | Window = window
    const show: Ref<boolean> = ref(false)

    const click = () => {
      props.onClick?.()
      const left = getScrollLeft(element as HTMLElement)

      scrollTo(element, {
        left,
        duration: props.duration,
        animation: easeInOutCubic,
      })
    }

    const scroll = () => {
      show.value = getScrollTop(element as HTMLElement) >= toNumber(props.visibilityHeight)
    }

    const throttleScroll = throttle(scroll, 200)

    const getHTMLElement = () => {
      if (!isString(props.target)) throw Error('[Varlet] BackTop: type of prop "target" should be a string')

      const el = document.querySelector(props.target)
      if (!el) throw Error('[Varlet] BackTop: "target" should be a selector')

      return el as HTMLElement
    }

    onMounted(() => {
      if (props.target) element = getHTMLElement()
      element.addEventListener('scroll', throttleScroll)
    })

    onBeforeUnmount(() => {
      element.removeEventListener('scroll', throttleScroll)
    })

    return {
      show,
      click,
    }
  },
})
</script>

<style lang="less">
@import "../../../styles/common";
@import "../../button/styles/ABtn";
@import "../../icon/styles/icon";
@import "../styles/back-top";
</style>
