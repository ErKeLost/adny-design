:::demo
```vue
<template>
  <a-checkbox v-model="value">当前的值: {{ value }}</a-checkbox>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(false)

    return {
      value
    }
  }
}
</script>
```
:::