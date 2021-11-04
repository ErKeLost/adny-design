<template>
  <transition name="message" @before-leave="onClose" @after-leave="$emit('destory')">
    <div :id="id" class="message" v-show="visible" :style="{ top: `${offset}px` }">{{ message }}</div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, Transition, onUnmounted } from 'vue'
export default defineComponent({
  props: {
    message: {
      type: String
    },
    duration: {
      type: Number,
      default: 2000
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

<style>
@import "../styles/message.less";
</style>