:::demo
```vue
<template>
  <a-slider v-model="value" />
</template>
<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(3)

    return {
      value
    }
  }
}
</script>
```
:::