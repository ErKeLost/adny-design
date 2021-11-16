:::demo
```vue
<template>
  <a-countdown :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
      setup() {
      const time = ref(Date.parse("2022/1/31") - Date.now())

      return {
        time
      }
    }
})
</script>
```

:::