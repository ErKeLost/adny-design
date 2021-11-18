:::demo
```vue
<template>
<div class="block">
  <a-dropdown v-model:show="top">
    <a-btn type="primary" @click="top = true">顶部对齐</a-btn>

    <template #menu>
      <div class="cell-list">
        <a-cell>菜单项</a-cell>
        <a-cell>菜单项</a-cell>
        <a-cell>菜单项</a-cell>
      </div>
    </template>
  </a-dropdown>
</div>

<div class="block-mt">
  <a-dropdown alignment="bottom" v-model:show="bottom">
    <a-btn type="primary" @click="bottom = true">底部对齐</a-btn>

    <template #menu>
      <div class="cell-list">
        <a-cell>菜单项</a-cell>
        <a-cell>菜单项</a-cell>
        <a-cell>菜单项</a-cell>
      </div>
    </template>
  </a-dropdown>
</div>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    const top = ref(false)
    const bottom = ref(false)

    return { 
      top,
      bottom
    }
  }
}
</script>
<style>
.block {
  display: flex;
  justify-content: space-between;
}

.block-mt {
  margin-top: 130px;
}

.cell-list {
  background: #fff;
}
</style>
```
:::