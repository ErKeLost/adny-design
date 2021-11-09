:::demo

```vue
<template>
  <a-grid :cols="4" :x-gap="50">
    <a-grid-item>
      <div class="light-green"></div>
    </a-grid-item>
    <a-grid-item>
      <div class="green"></div>
    </a-grid-item>
    <a-grid-item>
      <div class="light-green"></div>
    </a-grid-item>
    <a-grid-item>
      <div class="green"></div>
    </a-grid-item>
  </a-grid>
</template>
<style>
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
}
</style>
```
:::