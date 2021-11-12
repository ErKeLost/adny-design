:::demo 使用 adny

```vue
<template>
  <a-img src="https://w.wallhaven.cc/full/3z/wallhaven-3z6v6v.jpg" />
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
