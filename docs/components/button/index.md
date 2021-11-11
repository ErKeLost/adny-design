:::demo 使用 adny

```vue
<template>
  <div class="a-btn">
    <a-btn elevation="5" size="large" type="primary" block>按钮</a-btn>
  </div>
  <div class="a-btn">
    <a-btn>CLICK ME</a-btn>
  </div>
  <div class="a-btn">
    <a-btn disabled>DISABLED</a-btn>
  </div>
  <div class="a-btn">
    <a-btn text outline color="#fbafba">SUCCESS</a-btn>
  </div>
  <div class="a-btn">
    <a-btn text color="#ff6347">SUCCESS</a-btn>
    <a-btn text type="primary">SUCCESS</a-btn>
    <a-btn text type="success">SUCCESS</a-btn>
    <a-btn text type="warning">SUCCESS</a-btn>
  </div>  <div class="a-btn">
    <a-btn elevation="12" type="primary">DANGER</a-btn>
  </div>
  <div class="a-btn">
    <a-btn round type="info">INFO</a-btn>
  </div>
  <div class="a-btn">
    <a-btn round depressed type="info">没有阴影的</a-btn>
  </div>
  <div class="a-btn">
    <a-btn tite elevation="12" type="success">DANGER</a-btn>
  </div>
</template>
<style>
.a-btn {
  margin: 10px;
}
</style>
```

:::
