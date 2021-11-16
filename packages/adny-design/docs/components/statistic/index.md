:::demo
```vue
<template>
  <a-statistic style="margin-left: 50px" :content-style="{ color: '#fba' }" :title-style="{ color: 'red' }" title="安东尼娅" :value="999666" suffix="安东尼娅">
    <template #prefix>
      <span>I love You</span>
    </template>
  </a-statistic>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {

  }
})
</script>
```

:::