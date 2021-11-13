# Cards（卡片）

### ACard 组件是一个可用于从面板到静态图像的多功能组件。组件有许多帮助程序组件来尽可能简单地进行标记。

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
  <a-card continue>
    <template #cover>
      <img src="https://w.wallhaven.cc/full/28/wallhaven-2828w6.jpg" />
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
      <a-btn text color="#1867c0">提交</a-btn>
      <a-btn text color="#1867c0">取消</a-btn>
    </template>
  </a-card>
</template>
```

:::

## 带文字的媒体
使用布局系统，我们可以在背景中的任何位置添加自定义文本。

:::demo

```vue
<template>
  <a-card continue>
    <template #cover>
      <img src="https://w.wallhaven.cc/full/28/wallhaven-2828w6.jpg" />
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
      <a-btn text color="#1867c0">提交</a-btn>
      <a-btn text color="#1867c0">取消</a-btn>
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
  <a-card continue>
    <template #cover>
      <img src="https://w.wallhaven.cc/full/28/wallhaven-2828w6.jpg" />
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
      <a-btn text color="#1867c0">提交</a-btn>
      <a-btn text color="#1867c0">取消</a-btn>
    </template>
  </a-card>
</template>
```

:::

## 布局卡片
使用不同Components 搭配出好看的 layout

:::demo

```vue
<template>
  <a-card continue>
    <template #cover>
      <img src="https://w.wallhaven.cc/full/28/wallhaven-2828w6.jpg" />
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
      <a-btn text color="#1867c0">提交</a-btn>
      <a-btn text color="#1867c0">取消</a-btn>
    </template>
  </a-card>
</template>
```

:::