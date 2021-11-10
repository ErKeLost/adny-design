:::demo
```vue
<template>
<a-btn type="warning" block @click="show = true">基本使用</a-btn>
<a-dialog
  title="兰亭序"
  message="兰亭临帖 行书如行云流水"
  v-model:show="show"
/>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const show = ref(false)

    return {
      show,
    }
  }
}
</script>
```
:::