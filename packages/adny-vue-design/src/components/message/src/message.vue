<template>
  <transition name="message" @before-leave="onClose" @after-leave="$emit('destory')">
    <div
      class="adny-message adny-elevation--2"
      :id="id"
      v-show="visible"
      :style="{ top: `${offset}px` }"
      :class="[
        type ? `adny-message__${type}` : null,
      ]"
    >
      <div class="adny-message--flex">
        <div style="display: flex">
          <a-icon :name="iconName"></a-icon>
          <p style="margin: 0 15px">{{ message }}</p>
        </div>
        <a-icon @click="close" name="window-close"></a-icon>
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
    type: {
      type: String,
      default: "info"
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