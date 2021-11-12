:::demo
```vue
<template>
<a-btn type="warning" block @click="show = true">基本使用</a-btn>
<a-dialog
  custom
  v-model:show="show"
>
  <a-card
    subtitle="123456"
    content="Greyhound divisively hello coldly wonderfully marginally far upon excluding."
    continue
    footerPosition="right"
    hover
    :radius="false"
  >
      <template #cover>
      <!-- <img src="https://w.wallhaven.cc/full/wq/wallhaven-wqd7pq.jpg" /> -->
      <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3cbf6426ff65495ab1cfcd04f195b538~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp">
    </template>
    <template #title> Card title </template>
    <template #extra> Extra Content </template>
    <template #footer>
      <a-btn  text color="#1867c0">提交</a-btn>
      <a-btn  text color="#1867c0">取消</a-btn>
    </template>
  </a-card>
</a-dialog>
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