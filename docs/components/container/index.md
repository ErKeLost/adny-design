:::demo 使用 adny

```vue
<template>
  <div class="common-layout">
    <a-container class="a-container">
      <a-header class="a-header">
        <a-app-bar />
      </a-header>
      <a-main class="a-main">Main</a-main>
    </a-container>

    <a-container class="a-container">
      <a-header class="a-header">
        <a-app-bar />
      </a-header>
      <a-main class="a-main">Main</a-main>
      <a-footer class="a-footer">Footer</a-footer>
    </a-container>

    <a-container class="a-container">
      <a-aside class="a-aside" width="200px">Aside</a-aside>
      <a-main class="a-main">Main</a-main>
    </a-container>

    <a-container class="a-container">
      <a-header class="a-header">
        <a-app-bar />
      </a-header>
      <a-container class="a-container">
        <a-aside class="a-aside" width="200px">Aside</a-aside>
        <a-main class="a-main">Main</a-main>
      </a-container>
    </a-container>

    <a-container class="a-container">
      <a-header class="a-header">
        <a-app-bar />
      </a-header>
      <a-container class="a-container">
        <a-aside class="a-aside" width="200px">Aside</a-aside>
        <a-container>
          <a-main class="a-main">Main</a-main>
          <a-footer class="a-footer">Footer</a-footer>
        </a-container>
      </a-container>
    </a-container>

    <a-container class="a-container">
      <a-aside class="a-aside" width="200px">Aside</a-aside>
      <a-container>
        <a-header class="a-header">
          <a-app-bar />
        </a-header>
        <a-main class="a-main">Main</a-main>
      </a-container>
    </a-container>

    <a-container class="a-container">
      <a-aside class="a-aside" width="200px">Aside</a-aside>
      <a-container>
        <a-header class="a-header">
          <a-app-bar />
        </a-header>
        <a-main class="a-main">Main</a-main>
        <a-footer class="a-footer">Footer</a-footer>
      </a-container>
    </a-container>
  </div>
</template>

<style>
.a-header,
.a-footer {
  background-color: #b3c0d1;
  text-align: center;
  line-height: 60px;
}

.a-aside {
  background-color: #d3dce6;
  text-align: center;
  line-height: 200px;
}

.a-main {
  background-color: #e9eef3;
  text-align: center;
  line-height: 160px;
}
.a-container {
  margin-bottom: 40px;
}

.a-container:nth-child(5) .a-aside,
.a-container:nth-child(6) .a-aside {
  line-height: 260px;
}

.a-container:nth-child(7) .a-aside {
  line-height: 320px;
}
</style>
```

:::     