<template>
  <transition
    :name="`notification-${horizontalClass}`"
    @before-leave="onClose"
    @after-leave="$emit('destory')"
  >
    <div
      :id="id"
      :class="['adny-notification', 'adny-elevation--2', `adny-notification--${type}`]"
      :style="[positionStyle, verticalStyle]"
      v-show="visible"
    >
      <div class="adny-notification-icon">
        <a-icon :color="prefixIconColor" size="30" v-if="prefixIcon" name="checkbox-marked-circle"></a-icon>
      </div>
      <div class="adny-notification--group">
        <div class="adny-notification--content">
          <p class="adny-notification--title" v-if="title">{{ title }}</p>
          <div v-if="message">
            <slot>
              <span v-html="message"></span>
            </slot>
          </div>
        </div>
        <div class="adny-notification--closeicon">
          <a-icon @click="close" v-if="showClose" name="window-close"></a-icon>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, Transition, onUnmounted } from 'vue'
import { AIcon } from '../../icon'
export default defineComponent({
  name: 'ANotification',
  components: {
    AIcon
  },
  props: {
    prefixIconColor: {
      type: String,
      default: "#000"
    },
    type: {
      type: String,
      default: "default"
    },
    prefixIcon: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String
    },
    showClose: {
      type: Boolean,
      default: true
    },
    message: {
      type: String
    },
    duration: {
      type: Number,
      default: 3500
    },
    onClose: {
      type: Function
    },
    offset: {
      type: Number,
      default: 20
    },
    id: {
      type: String
    },
    position: {
      type: String,
      default: 'top-right'
    }
  },
  emits: ['destory'],
  setup(props, { emit }) {
    const visible = ref(false)
    let timer: any = null
    const transitionName = ref('')
    const startTime = () => {
      timer = setTimeout(() => {
        close()
      }, props.duration)
    }
    function close() {
      visible.value = false
    }
    onMounted(() => {
      startTime()
      visible.value = true
    })

    onUnmounted(() => {
      clearTimeout(timer)
    })
    const horizontalClass = computed(() =>
      props.position.endsWith('right') ? 'right' : 'left'
    )

    const verticalProperty = computed(() =>
      props.position.startsWith('top') ? 'top' : 'bottom'
    )
    const positionStyle = computed(() => {
      return {
        [verticalProperty.value]: `${props.offset}px`
      }
    })
    const verticalStyle = computed(() => {
      return {
        [horizontalClass.value]: `10px`
      }
    })
    return {
      visible,
      horizontalClass,
      close,
      positionStyle,
      verticalStyle,
      transitionName
    }
  }
})
</script>

<style scoped lang="less">
@import "../styles/notification.less";
@import "../../../styles/elevation.less";
</style>