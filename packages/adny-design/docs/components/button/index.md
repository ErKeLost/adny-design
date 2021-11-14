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
  <a-btn size="large" type="primary" block>按钮</a-btn>
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
      <a-btn depressed type="primary">Primary</a-btn>
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
      <a-btn fab text type="warning">
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

## Icon (图标)

图标可以被用作按钮的主要内容。

:::demo

```vue
<template>
  <a-cell style="fontSize: 20px; fontWeight: 600;">BigSize</a-cell>
  <a-grid>
    <a-grid-item :span="6">
      <a-btn icon color="#fbafba">
        <a-icon size="35" name="heart" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn icon color="#fabfab">
        <a-icon size="35" name="minus-circle-outline" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn icon color="#afbafb">
        <a-icon size="35" name="refresh" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn icon color="#fdcb6e">
        <a-icon size="35" name="checkbox-marked" />
      </a-btn>
    </a-grid-item>
  </a-grid>
    <a-cell style="marginTop: 50px;fontSize: 20px; fontWeight: 600;"
    >Large</a-cell
  >
  <a-grid>
    <a-grid-item :span="6">
      <a-btn icon color="#fbafba">
        <a-icon name="heart" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn icon color="#fabfab">
        <a-icon name="minus-circle-outline" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn icon color="#afbafb">
        <a-icon name="refresh" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn icon color="#fdcb6e">
        <a-icon name="checkbox-marked" />
      </a-btn>
    </a-grid-item>
  </a-grid>
  <a-cell style="marginTop: 50px;fontSize: 20px; fontWeight: 600;"
    >Disabled</a-cell
  >
  <a-grid>
    <a-grid-item :span="6">
      <a-btn icon color="#fbafba">
        <a-icon name="heart" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn icon color="#fabfab">
        <a-icon name="minus-circle-outline" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn icon color="#afbafb">
        <a-icon name="refresh" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn icon color="#fdcb6e">
        <a-icon name="checkbox-marked" />
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
      <a-btn outline text icon color="#afbafb">
        <a-icon name="map-marker-radius" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn outline text icon color="#fdcb6e">
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
      <a-btn text icon color="#afbafb">
        <a-icon name="bluetooth" />
      </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn text icon color="#fdcb6e">
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
      <a-btn outline round text color="#afbafb"> DESIGN </a-btn>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-btn outline text round color="#fd79a8"> ERKELOST </a-btn>
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
      <a-btn size="normal" outline round text color="#afbafb">
        Normal Button
      </a-btn>
    </a-grid-item>
    <a-grid-item>
      <a-btn size="large" outline text round color="#fd79a8">
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
