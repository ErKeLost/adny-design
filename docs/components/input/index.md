
:::demo 使用 adny

```vue
<template>
  <a-input error @click="go" @focus="a" placeholder="请输入文本" v-model="value" />
  </n>
  <a-input textColor="#fba" maxlength="15" textarea placeholder="请输入文本" />
</template>
<script >
import {defineComponent, ref, watch } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('')
    const go = () => {
    }
    const a = () => {
    }
    watch(() => value.value, (ne) => {
      console.log(ne , 456456)
    })
    return {
      go,
      a,
      value
    }
  }
})
</script>
```

:::
