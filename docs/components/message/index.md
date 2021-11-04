:::demo 使用 adny

```vue
<template>
  <div>
    <a-btn @click="go">按钮</a-btn>
  </div>
</template>
<script >
import {defineComponent, ref, watch } from 'vue'
export default defineComponent({
  methods: {
    go() {
      this.$message({
        message: '保存成功132132'
      })
    }
  }
})
</script>
```

:::
