:::demo

```vue
<template>
  <a-spin spinnerType="fulling">
    <a-card continue>
      <template #cover>
        <a-img
          src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6b3a4120c9044578d9cafa0083c3f48~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp"
        />
      </template>
      <template #title>王小波</template>
      <template #extra>
        <a-btn icon color="#fbafba">
          <a-icon name="menu1" />
        </a-btn>
      </template>
      <template #content>
        我认为每个人都是有本质的。像我的本质就是流氓，土匪。如果放到合适的地方就大放光彩，可是在城市里做个市民。在学校里做个教员就很不合适了。
      </template>
      <template #footer>
        <a-btn text color="#1867c0" style="margin-right: 15px;">提交</a-btn>
        <a-btn text color="#1867c0">取消</a-btn>
      </template>
    </a-card>
  </a-spin>
</template>
```

:::
