<template>
  <transition name="notification" @before-leave="onClose" @after-leave="$emit('destory')">
    <div
      :id="id"
      class="adny-notification adny-elevation--2"
      v-show="visible"
      :style="{ top: `${offset}px` }"
    >
      <div class="adny-notification-icon">
        <a-icon size="30" v-if="prefixIcon" name="checkbox-marked-circle"></a-icon>
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
          <a-icon @click="$emit('destory')" v-if="showClose" name="window-close"></a-icon>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, Transition, onUnmounted } from 'vue'
import AIcon from '../../icon'
export default defineComponent({
  components: {
    AIcon
  },
  props: {
    prefixIcon: {
      type: Boolean,
      default: true,
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
    }
  },
  emits: ['destory'],
  setup(props, { emit }) {
    const visible = ref(false)
    let timer: any = null
    const startTime = () => {
      timer = setTimeout(() => {
        visible.value = false
      }, props.duration)
    }
    onMounted(() => {
      startTime()
      visible.value = true
    })

    onUnmounted(() => {
      clearTimeout(timer)
    })
    return {
      visible,
    }
  }
})
</script>

<style scoped lang="less">
@import "../styles/notification.less";
@import "../../../styles/elevation.less";
</style>