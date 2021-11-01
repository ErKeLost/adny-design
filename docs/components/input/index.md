:::demo 使用 adny

```vue
<template>
  <a-input  :rules="[{ required: true, message: 'required'}, { max: 5, message: '最多只能输入五个字符'}]" placeholder="请输入文字 " v-model="value" />
  </n>
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
