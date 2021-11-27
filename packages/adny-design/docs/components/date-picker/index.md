:::demo
```vue
<template>
  <a-date-picker v-model="date" />
</template>
<script>
import { defineComponent, ref } from 'vue'

export default {
  setup() {
    const date = ref('2021-11-27')
    
    return {
      date
    }
  }
}
</script>
```
:::