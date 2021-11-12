:::demo 使用 adny

```vue
<template>
  <div>
    <a-btn @click="goaaaa">按钮</a-btn>
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
      this.$notify.info({
        message: '外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的',
        title: '我是标题1',
        duration: 1000,
      })
    },
        goa() {
      this.$notify.success({
        prefixIconColor: '#fab',
        message: '外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的',
        title: '我是标题1',
        duration: 3000,
        position: 'top-left',
        showClose: false
      })
    },
        goaa() {
      this.$notify.danger({
        message: '外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的',
        title: '我是标题1',
        duration: 5000,
      })
    },
        goaaa() {
      this.$notify.warning({
        message: '外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的',
        title: '我是标题1'
      })
    },
    goaaaa() {
      this.$notify({
        message: '外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的外婆是哦的骄傲扣税的',
        title: '我是标题1'
      })
    },
  }
})
</script>
```

:::
