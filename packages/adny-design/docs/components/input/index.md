# Inputs（输入框）
AInput 组件为您提供了一个基线来创建您自己的自定义输入。 它包含一个预留/附加的空档，消息和一个默认的空档。 _建议_扩展该组件，但它可以作为一个独立组件使用


## 基本使用 (Base)
:::demo

```vue
<template>
  <a-input  :rules="[{ required: true, message: 'required'}, { max: 5, message: '最多只能输入五个字符'}]" placeholder="请输入文字 " v-model="value" />
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
