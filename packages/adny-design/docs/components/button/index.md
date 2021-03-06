# Button 按钮

### ABtn （按钮）组件采 Material Design 设计主题风格，

### 使用

最简单的按钮包含大写文本、轻微的仰角、悬停效果和单击时的波纹效果。

### 属性

## Block (块级按钮)

添加 block 属性，按钮将延占满可用的宽度。

:::demo

```vue
<template>
  <a-btn size="large" type="primary" block>
    <div style="color: #fba">
      块级按钮
    </div>
  </a-btn>
</template>
```

:::

## Depressed （凹陷）

按下按钮仍保持其背景色，但没有框阴影。

:::demo

```vue
<template>
  <a-grid>
    <a-grid-item :span="6">
      <a-btn color="#fba" text-color="#000" type="primary">Primary</a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn depressed type="success">Success</a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn depressed type="warning">Warning</a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn depressed type="danger">Danger</a-btn>
    </a-grid-item>
  </a-grid>
</template>
```

:::

## Fab (浮动)

多做用于 图标 按钮 提示交互

:::demo

```vue
<template>
  <a-grid>
    <a-grid-item :span="6">
      <a-btn fab type="primary">
        <a-icon name="sunrise" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn fab type="success">
        <a-icon name="cloud-off" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn fab text outline type="warning">
        <a-icon name="cloud-rain" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn fab text type="danger">
        <a-icon name="cloud-snow" />
      </a-btn>
    </a-grid-item>
  </a-grid>
</template>
```

:::

## Loading (加载)

多做用于 图标 按钮 提示交互

:::demo

```vue
<template>
  <a-grid>
    <a-grid-item :span="6">
      <a-btn :loading="load" type="primary">
        <a-icon name="sunrise" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn :loading="load" type="success">
        <a-icon name="cloud-off" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn :loading="load" text outline type="warning">
        <a-icon name="cloud-rain" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn :loading="load" text type="danger" @click="load = !load">
        加载
      </a-btn>
    </a-grid-item>
  </a-grid>
</template>
<script lang="ts">
export default {
  data() {
    return {
      load: false
    }
  }
}
</script>
```

:::

## Icon (图标)

图标可以被用作按钮的主要内容。

:::demo

```vue
<template>
  <a-cell style="fontSize: 20px; fontWeight: 600;">BigSize</a-cell>
  <a-grid>
    <a-grid-item :span="6">
      <a-btn icon text-color="#fbafba">
        <a-icon size="35" name="arrow-left-circle" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn icon text-color="#fabfab">
        <a-icon size="35" name="at-sign" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn icon text-color="#afbafb">
        <a-icon size="35" name="book-open" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn icon text-color="#fdcb6e">
        <a-icon size="26" name="camera-off" />
      </a-btn>
    </a-grid-item>
  </a-grid>
  <a-cell style="marginTop: 50px;fontSize: 20px; fontWeight: 600;"
    >Large</a-cell
  >
  <a-grid>
    <a-grid-item :span="6">
      <a-btn icon text-color="#fbafba">
        <a-icon name="chrome" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn icon text-color="#fabfab">
        <a-icon name="coffee" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn icon type="warning">
        <a-icon name="download-cloud" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn text-color="red" icon>
        <a-icon name="feather" />
      </a-btn>
    </a-grid-item>
  </a-grid>
  <a-cell style="marginTop: 50px;fontSize: 20px; fontWeight: 600;"
    >Disabled</a-cell
  >
  <a-grid>
    <a-grid-item :span="6">
      <a-btn disabled icon text-color="#fbafba">
        <a-icon name="github1" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn disabled icon text-color="#fabfab">
        <a-icon name="gitlab1" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn disabled icon text-color="#afbafb">
        <a-icon name="instagram" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn disabled icon text-color="#fdcb6e">
        <a-icon name="life-buoy" />
      </a-btn>
    </a-grid-item>
  </a-grid>
</template>
```

:::

## Outline (轮廓)

添加 outlined 属性，按钮的边框颜色将继承自当前应用的按钮颜色。

:::demo

```vue
<template>
  <a-grid>
    <a-grid-item :span="6">
      <a-btn text outline type="success">Success</a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn text outline type="danger">Danger</a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn text icon text-color="#afbafb">
        <a-icon name="map-marker-radius" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn outline text icon text-color="#fdcb6e">
        <a-icon name="bell-outline" />
      </a-btn>
    </a-grid-item>
  </a-grid>
</template>
```

:::

## Text (朴实)

应用 Text 属性， 按钮将会有较低的基准不透明度, 以响应 hover(悬停) 和 focus(聚焦) 事件。

:::demo

```vue
<template>
  <a-grid>
    <a-grid-item :span="6">
      <a-btn text type="success">Success</a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn text type="warning">ADNY</a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn text icon text-color="#afbafb">
        <a-icon name="bluetooth" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn text icon text-color="#fdcb6e">
        <a-icon name="anchor" />
      </a-btn>
    </a-grid-item>
  </a-grid>
</template>
```

:::

## Rounded (圆角)

圆形按钮的行为与常规按钮相同，但具有圆形边缘。

:::demo

```vue
<template>
  <a-grid>
    <a-grid-item :span="6">
      <a-btn text outline round type="success">Success</a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn text outline round type="warning">ADNY</a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn outline round text text-color="#afbafb"> DESIGN </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn outline text round text-color="#fd79a8"> ERKELOST </a-btn>
    </a-grid-item>
  </a-grid>
</template>
```

:::

## Size (大小)

可以为按钮提供不同的大小选项，以适应多种场景。
:::demo

```vue
<template>
  <a-grid>
    <a-grid-item>
      <a-btn size="small" text outline type="success"
        >Extra small Button
      </a-btn>
    </a-grid-item>
    <a-grid-item>
      <a-btn size="small" text outline round type="warning">Small Button</a-btn>
    </a-grid-item>
    <a-grid-item>
      <a-btn size="normal" outline round text text-color="#afbafb">
        Normal Button
      </a-btn>
    </a-grid-item>
    <a-grid-item>
      <a-btn size="large" outline text round text-color="#fd79a8">
        Large Button
      </a-btn>
    </a-grid-item>
  </a-grid>
</template>
```

:::

## Tile (正方形)

平铺按钮的行为与常规按钮相同，但没有边框半径。

:::demo

```vue
<template>
  <a-grid>
    <a-grid-item :span="6">
      <a-btn tile type="primary">Primary</a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn tile type="success">Success</a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn tile type="warning">Warning</a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn tile type="danger">Danger</a-btn>
    </a-grid-item>
  </a-grid>
</template>
```

:::
### Button API


| 参数        | 类型      | 默认     | 可选值                             | 说明                     |
| ----------- | --------- | -------- | ---------------------------------- | ------------------------ |
| tile        | `Boolean` | `false`  | `true \| false`                    | 正方形按钮               |
| round       | `Boolean` | `false`  | `true \| false`                    | 圆角按钮                 |
| icon        | `Boolean` | `false`  | `true \| false`                    | 图片透明按钮             |
| fab         | `Boolean` | `false`  | `true \| false`                    | 浮动 作用于 单个交互     |
| depressed   | `Boolean` | `false`  | `true \| false`                    | 凹陷 移除海拔高度效果    |
| block       | `Boolean` | `false`  | `true \| false`                    | 设置按钮为块级按钮       |
| outline     | `Boolean` | `false`  | `true \| false`                    | outline 外边框           |
| text        | `Boolean` | `false`  | `true \| false`                    | 文本样式                 |
| disabled    | `Boolean` | `false`  | `true \| false`                    | 禁用按钮                 |
| elevation   | `Boolean` | `2`      | `0~24`                             | 海拔效果                 |
| color       | `String`  | `null`   | `CssProperties`                    | 背景颜色                 |
| size        | `String`  | `normal` | `large \| small \| mini \| normal` | 按钮大小                 |
| loading     | `Boolean` | `false`  | `true \| false`                    | 是否开启loading 加载模式 |
| loadingType | `String`  | `circle` | `circle \|`                        | 文本颜色                 |
| loadingSize | `String`  | `normal` | `large \| small \| mini \| normal` | loading加载 模式大小     |