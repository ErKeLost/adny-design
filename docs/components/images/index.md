:::demo 使用 adny

```vue
<template>
  <a-img />
</template>
<script >
import {defineComponent, ref, watch } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('')
    watch(() => value.value, (ne) => {
    })
    return {
      value
    }
  }
})
</script>
```

:::
