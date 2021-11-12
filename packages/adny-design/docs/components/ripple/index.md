:::demo

```vue

<template>
  <div class="ripple-button">
    <div class="ripple-htmlElement" v-ripple="{ duration: 0.5 }">
      HTML元素 中使用 v-ripple
    </div>
  </div>
</template>
<style scoped>
.ripple-button {
  display: flex;
}
</style>
```

:::
:::demo
```vue
<template>
  <ul>
    <li
      v-for="item in [
        { color: '#409EFF', text: '这是一条 Primary 涟漪' },
        { color: '#67C23A', text: '这是一条 Success 涟漪' },
        { color: '#E6A23C', text: '这是一条 Warning 涟漪' },
        { color: '#F56C6C', text: '这是一条 Danger 涟漪' },
        { color: '#909399', text: '这是一条 Info 涟漪' },
      ]"
      :style="{ color: item.color }"
    >
      <div class="ripple-changeTextColor" v-ripple="{ duration: 0.39 }">
        {{ item.text }}
      </div>
    </li>
  </ul>
</template>
```
:::

:::demo
```vue
<template>
  <ul>
    <li
      v-for="(item, index) in [
        { color: '#409EFF', text: '这是一条 Primary 涟漪' },
        { color: '#67C23A', text: '这是一条 Success 涟漪' },
        { color: '#E6A23C', text: '这是一条 Warning 涟漪' },
        { color: '#F56C6C', text: '这是一条 Danger 涟漪' },
        { color: '#909399', text: '这是一条 Info 涟漪' },
      ]"
      :style="{ color: item.color }"
    >
      <div
        class="ripple-changeTextColor"
        v-ripple="{ duration: 0.39, color: `${item.color.slice(0, 4)}` }"
      >
        {{ item.text }}
      </div>
    </li>
  </ul>
</template>
```
:::