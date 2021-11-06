:::demo 使用 adny

```vue
<template>
  <div>
    <a-btn @click="go">按钮</a-btn>
    <a-btn @click="goa">按钮</a-btn>
    <a-btn @click="goaa">按钮</a-btn>
    <a-btn @click="goaaa">按钮</a-btn>
  </div>
</template>
<script >
import {defineComponent, ref, watch } from 'vue'
export default defineComponent({
  methods: {
    go() {
      this.$message({
        message: '保存成功',
        backgroundColor: 'red',
        type: 'success',
        icon: 'minus-circle-outline',
        showClose: true,
      })
    },
        goa() {
      this.$message.info({
        message: 'this. is  a  message'
      })
    },
        goaa() {
      this.$message.danger({
        message: 'this. is  a  message'
      })
    },
        goaaa() {
      this.$message.warning({
        message: 'this. is  a  message',
        showClose: true
      })
    }
  }
})
</script>
```

:::
