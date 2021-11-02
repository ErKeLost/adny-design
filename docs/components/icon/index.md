:::demo 使用 adny

```vue
<template>
<a-icon name="checkbox-marked-circle" />
<a-icon 
  color="#fba"
  :name="name" 
  :transition="300" 
  :size="30" 
  @click="toggle"
/>
</template>
<script >
import {defineComponent, ref, watch } from 'vue'
export default defineComponent({
  setup() {
    const name = ref('star-outline')
    
    const toggle = () => {
      if (name.value === 'star-outline') {
        name.value = 'information'
      } else {
        name.value = 'star-outline'
      }
    }
    return {
      name,
      toggle
    }
  }
})
</script>
```

:::
