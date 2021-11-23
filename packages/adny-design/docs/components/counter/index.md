:::demo
```vue
<template>
<a-counter v-model="value"/>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(0)

    return { value }
  }
}
</script>
```
:::