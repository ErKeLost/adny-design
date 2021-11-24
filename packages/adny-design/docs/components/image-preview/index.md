:::demo
```vue
<template>
  <div v-d-image-preview class="devui-image-preview-demo">
    <img v-for="src in imageList" :src="src" :key="src" />
  </div>
</template>
<script>
  import { defineComponent, ref, reactive } from 'vue'
  export default defineComponent({
    setup() {
      const _imageList = [
        'https://w.wallhaven.cc/full/pk/wallhaven-pkgk6j.jpg',
        'https://w.wallhaven.cc/full/m9/wallhaven-m9y9j1.jpg'
      ]
      const imageList = ref(_imageList)
      return {
        imageList
      }
    }
  })
</script>

<style lang="less" scoped>
.devui-image-preview-demo {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  img {
    margin: 10px;
    cursor: pointer;
  }
  .btn {
    margin: 10px;
  }
}
</style>
```
:::