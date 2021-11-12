:::demo

```vue
<template>
<a-chip closable v-if="show" @close="show = false">可关闭纸片</a-chip>
<a-chip
  closable
  icon-name="delete"
  v-if="show1"
  @close="show1 = false">
  自定义关闭图标
</a-chip>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    const show = ref(true)
    const show1= ref(true)

    return { 
      show, 
      show1 
    }
  }
}
</script>
```

:::