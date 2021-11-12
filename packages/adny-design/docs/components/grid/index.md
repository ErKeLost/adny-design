:::demo

```vue
<template>
  <a-grid :gutter="10">
    <a-grid-item :xs="24" :sm="12" :md="8" :lg="4" :xl="24" :offset="0">
      <div class="light-green"></div>
    </a-grid-item>
    <a-grid-item :xs="24" :sm="12" :md="8" :lg="4" :xl="24" :offset="0">
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
:::demo

```vue
<template>
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