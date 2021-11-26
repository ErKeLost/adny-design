<template>
  <transition name="message" @before-leave="onClose" @after-leave="$emit('destory')">
    <div
      class="adny-message adny-elevation--2"
      :id="id"
      v-show="visible"
      :style="{ top: `${offset}px`, backgroundColor }"
      :class="[
        type ? `adny-message__${type}` : null,
      ]"
    >
      <div class="adny-message--flex">
        <div style="display: flex; align-items: center; justify-content: center">
          <a-icon :name="icon ?? iconName"></a-icon>
          <p style="margin: 0 15px">{{ message }}</p>
        </div>
        <a-icon v-if="showClose" @click="close" name="window-close"></a-icon>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, Transition, onUnmounted } from 'vue'
import { AIcon } from '../../icon'
export default defineComponent({
  name: 'AMesssage',
  components: {
    AIcon
  },
  props: {
    showClose: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
    },
    icon: {
      type: String,
    },
    type: {
      type: String,
      default: "default"
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
    const iconName = computed(() => {
      switch (props.type) {
        case 'success':
          return 'check-circle-outline';
        case 'info':
          return 'information-outline';
        case 'danger':
          return 'alert-triangle';
        case 'warning':
          return 'warning'
      }
    })
    return {
      visible,
      iconName,
      close
    }
  }
})
</script>

<style lang="less" scoped>
@import "../styles/message.less";
@import "../../../styles/elevation.less";
</style>