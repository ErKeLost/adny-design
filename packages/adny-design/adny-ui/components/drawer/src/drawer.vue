<template>
  <teleport :to="teleport" :disabled="!teleport || disabled">
    <transition name="adny-fade" @after-enter="onOpened" @after-leave="onClosed">
      <div :class="['adny--box adny-drawer']" :style="{ zIndex: zIndex - 2 }" v-show="show">
        <div
          class="adny-drawer__overlay"
          :class="[overlayClass]"
          :style="{
            zIndex: zIndex - 1,
            ...overlayStyle
          }"
          v-if="overlay"
          @click="hidedrawer"
        ></div>
        <transition :name="transition ? transition : `adny-drawer-${position}`">
          <div
            :class="[
              fullScreen ? fullScreenClass : 'adny-drawer__content',
              'adny-elevation--3',
              `adny-drawer--${position}`
            ]"
            :style="{ zIndex }"
            v-bind="$attrs"
            v-if="show"
          >
            <div class="adny-drawer__flex" v-if="fullScreen">
              <a-icon
                v-bind="$attrs"
                class="adny-drawer__close"
                :name="closeIcon ? closeIcon : 'window-close'"
                :color="iconColor ? iconColor : 'black'"
                @click="hidedrawer"
              />
              <slot />
            </div>
            <slot v-else />
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, watch, computed } from 'vue'
import { props } from './props'
import { useLock } from '../../context/lock'
import { useZIndex } from '../../context/zIndex'
import { addRouteListener, useTeleport } from '../../../utils/components'
import AIcon from '../../icon/src/icon'
import AAppBar from '../../app-bar/src/app-bar.vue'
export default defineComponent({
  name: 'ADrawer',
  inheritAttrs: false,
  props,
  components: {
    AIcon,
    AAppBar
  },
  setup(props) {
    const { zIndex } = useZIndex(() => props.show, 3)
    const { disabled } = useTeleport()
    const fullScreenClass = computed(() => {
      const Fullclass = props.fullScreen ? 'adny-drawer__fullscreen' : null
      return Fullclass
    })
    const hidedrawer = () => {
      const { closeOnClickOverlay, onClickOverlay } = props

      onClickOverlay?.()

      if (!closeOnClickOverlay) {
        return
      }

      props['onUpdate:show']?.(false)
    }

    useLock(props, 'show', 'lockScroll')

    watch(
      () => props.show,
      (newValue: boolean) => {
        const { onOpen, onClose } = props
        newValue ? onOpen?.() : onClose?.()
      }
    )

    // internal for Dialog
    addRouteListener(() => props.onRouteChange?.())

    return {
      zIndex,
      disabled,
      hidedrawer,
      fullScreenClass
    }
  }
})
</script>

<style lang="less">
@import "../../../styles/common";
@import "../styles/drawer";
</style>
