:::demo
```vue
<template>
  <a-slider v-model="value" label-visible="never" />
  <a-slider v-model="value1" />
  <a-slider v-model="value2" label-visible="always" />
</template>
<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(3)
    const value1 = ref(3)
    const value2 = ref(3)

    return {
      value,
      value1,
      value2
    }
  }
}
</script>
```
:::