# Cards（卡片）

### ACard 组件是一个可用于从面板到静态图像的多功能组件。组件有许多帮助程序组件来尽可能简单地进行标记。

### Tips : 所有属性都可以作用于插槽

## 基本使用 (Base Use)

:::demo

```vue
<template>
  <a-card
    title=" Adny Design"
    subtitle="鲁迅"
    content="勇者愤怒，抽刃向更强者；怯者愤怒，却抽刃向更弱者。不可救药的民族中，一定有许多英雄，专向孩子们瞪眼。这些孱头们"
    continue
    footerPosition="right"
  >
  </a-card>
</template>
```

:::

## 自定义操作 (Custom)

:::demo

```vue
<template>
  <a-card width="500px">
    <template #cover>
      <a-img
        src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6b3a4120c9044578d9cafa0083c3f48~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp"
      />
    </template>
    <template #title>王小波</template>
    <template #extra>
      <a-btn icon text-color="#fbafba">
        <a-icon name="menu1" />
      </a-btn>
    </template>
    <template #content>
      我认为每个人都是有本质的。像我的本质就是流氓，土匪。如果放到合适的地方就大放光彩，可是在城市里做个市民。在学校里做个教员就很不合适了。
    </template>
    <template #footer>
      <a-btn text text-color="#1867c0" style="margin-right: 15px;">提交</a-btn>
      <a-btn text text-color="#1867c0">取消</a-btn>
    </template>
  </a-card>
</template>
```

:::

## 带文字的媒体

使用布局系统，我们可以在背景中的任何位置添加自定义文本。底部介绍文字

:::demo

```vue
<template>
  <a-card>
    <template #cover>
      <a-img src="https://w.wallhaven.cc/full/28/wallhaven-2828w6.jpg" />
    </template>
    <template #mediaTitle>
      <span style="font-weight: bold; font-size: 25px; color:white"
        >Where there is a will, there is a way.</span
      >
    </template>
    <template #title>王小波</template>
    <template #extra>
      <a-btn icon text type="warning">
        <a-icon name="menu1" />
      </a-btn>
    </template>
    <template #content>
      我认为每个人都是有本质的。像我的本质就是流氓，土匪。如果放到合适的地方就大放光彩，可是在城市里做个市民。在学校里做个教员就很不合适了。
    </template>
    <template #footer>
      <a-btn text text-color="#1867c0" style="margin-right: 15px;">提交</a-btn>
      <a-btn text text-color="#1867c0">取消</a-btn>
    </template>
  </a-card>
</template>
```

:::

## 带文字的媒体 其他情况 我们可以 使用 其他组件布局 灵活使用

使用布局系统，我们可以在背景中的任何位置添加自定义文本。

:::demo

```vue
<template>
  <a-card>
    <template #cover>
      <a-img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3cbf6426ff65495ab1cfcd04f195b538~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp" />
      </a-img>
    </template>
    <template #title>王小波</template>
    <template #extra>
      <a-btn icon text type="warning">
        <a-icon name="menu1" />
      </a-btn>
    </template>
    <template #content>
      我认为每个人都是有本质的。像我的本质就是流氓，土匪。如果放到合适的地方就大放光彩，可是在城市里做个市民。在学校里做个教员就很不合适了。
    </template>
    <template #footer>
      <a-btn text text-color="#1867c0" style="margin-right: 15px;">提交</a-btn>
      <a-btn text text-color="#1867c0">取消</a-btn>
    </template>
  </a-card>
</template>
```

:::

## 纯色卡片 (ColorFull Card)

纯纯的

:::demo

```vue
<template>
  <a-card color="#ff6b81">
    <template #title>
      <span style="color: white"> 王小波 </span>
    </template>
    <template #extra>
      <a-btn icon text>
        <a-icon name="menu1" />
      </a-btn>
    </template>
    <template #content>
      <span style="color: white">
        我认为每个人都是有本质的。像我的本质就是流氓，土匪。如果放到合适的地方就大放光彩，可是在城市里做个市民。在学校里做个教员就很不合适了。</span
      >
    </template>
    <template #footer>
      <a-btn text text-color="#fff" style="margin-right: 15px;">提交</a-btn>
      <a-btn text text-color="#fff">取消</a-btn>
    </template>
  </a-card>
</template>
<style></style>
```

:::

## 布局卡片

使用不同 Components 搭配出好看的 layout

:::demo

```vue
<template>
  <a-card>
    <template #cover>
      <img
        src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78cdd31a6a8a428297289b9d87e38a78~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp"
      />
    </template>
    <template #title>王小波</template>
    <template #extra>
      <a-btn icon text type="warning">
        <a-icon name="menu1" />
      </a-btn>
    </template>
    <template #content>
      我认为每个人都是有本质的。像我的本质就是流氓，土匪。如果放到合适的地方就大放光彩，可是在城市里做个市民。在学校里做个教员就很不合适了。
    </template>
    <template #footer>
      <a-btn text text-color="#1867c0" style="margin-right: 15px;">提交</a-btn>
      <a-btn text text-color="#1867c0">取消</a-btn>
    </template>
  </a-card>
</template>
```

:::

### Card API


| 参数           | 类型               | 默认                                             | 可选值                             | 说明                          |
| -------------- | ------------------ | ------------------------------------------------ | ---------------------------------- | ----------------------------- |
| color          | `String`           | `CssProperies`                                   | ``                                 | 卡片背景颜色， 适用于纯色卡片 |
| mediaTitle     | `String`           | ``                                               | ``                                 | 卡片媒体标题 作用于背景图之下 |
| radius         | `Boolean`          | `false`                                          | `true \| false`                    | 卡片是否带有圆角              |
| footerPosition | `String`           | `left`                                           | `left \| right \| center`          | 卡片底部位置                  |
| hover          | `Boolean`          | `false`                                          | `true \| false`                    | 设置hover 状态 卡片海拔高度   |
| shaped         | `Boolean`          | `false`                                          | `true \| false`                    | 设置按钮为块级按钮            |
| disabled       | `Boolean`          | `false`                                          | `true \| false`                    | outline 外边框                |
| continue       | `Boolean`          | `false`                                          | `true \| false`                    | 文本样式                      |
| src            | `String`           | ``                                               | ``                                 | 卡片图片src                   |
| elevation      | `Boolean`          | `2`                                              | `0~24`                             | 海拔效果                      |
| height         | `String \| Number` | `null`                                           | `CssProperties`                    | 背景颜色                      |
| fit            | `String`           | `cover \| fill \| contain \| none \| scale-down` | `large \| small \| mini \| normal` | 按钮大小                      |
| subtitle       | `String`           | ``                                               | ``                                 | 卡片二级标题                  |
| content        | `String`           | ``                                               | ``                        卡片内容 |
| onClick        | `Function`         | ``                                               | ``                                 | 点击事件                      |