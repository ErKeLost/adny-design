:::demo
```vue
<template>
  <a-carousel class="swipe" :autoplay="5000">
  <a-carousel-item>
    <img class="swipe-item" src="https://w.wallhaven.cc/full/9m/wallhaven-9m9p1x.png">
  </a-carousel-item>
  <a-carousel-item>
    <img class="swipe-item" src="https://w.wallhaven.cc/full/9m/wallhaven-9m9jl1.jpg">
  </a-carousel-item>
  <a-carousel-item>
    <img class="swipe-item" src="https://w.wallhaven.cc/full/28/wallhaven-2828w6.jpg">
  </a-carousel-item>
</a-carousel>
</template>
<style>
.swipe-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.swipe {
  height: 360px;
}
</style>
```
:::