:::demo

```vue
<template>
  <a-btn v-loading.fullscreen="fullscreenLoading" type="primary" @click="openFullScreen1"
    >全局loading</a-btn
  >
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const fullscreenLoading = ref(false)
    const openFullScreen1 = () => {
      fullscreenLoading.value = true
      setTimeout(() => {
        fullscreenLoading.value = false
      }, 5000)
    }
    return {
      fullscreenLoading,
      openFullScreen1,
    }
  },
})
</script>
```

:::
