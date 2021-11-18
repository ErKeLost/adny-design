:::demo
```vue
<template>
  <a-avatar type="primary" size="62">
    <span>AD</span>
  </a-avatar>
  <a-badge :dot="dot" color="#ff5252" position="top-right">
    <a-avatar type="primary" size="62">
      <img src="https://w.wallhaven.cc/full/pk/wallhaven-pkgk6j.jpg" />
    </a-avatar>
  </a-badge>
  <a-badge color="#ff5252" position="top-right" icon="lock1">
    <a-btn type="danger" @click="dot = !dot">Lock Account</a-btn>
  </a-badge>
  <a-dropdown :offset-x="-72" style="margin-top:200px;"  alignment="bottom" v-model:show="bottom">
      <a-badge :dot="dot" color="#ff5252"  position="top-right">
        <a-avatar type="primary" size="52" @click="bottom = true">
          <img src="https://w.wallhaven.cc/full/pk/wallhaven-pkgk6j.jpg" />
        </a-avatar>
      </a-badge>
    <template #menu>
      <div class="cell-list">
        <a-cell>菜单项</a-cell>
        <a-cell>菜单项</a-cell>
        <a-cell>菜单项</a-cell>
      </div>
    </template>
  </a-dropdown>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup(props) {
    const dot = ref(false)
        const top = ref(false)
    const bottom = ref(false)

    return { 
      top,
      bottom,
      dot
    }
  }
})
</script>
<style>
.cell-list {
  width: 300px;
}
</style>
```
:::