# Statistic 统计数值

### 何时使用

### 基本用法

:::demo

```vue
<template>
  <a-grid>
    <a-grid-item :span="12">
      <a-statistic
        title="Users Sales"
        :value="542235111"
        :value-from="5000000000"
        animation
        extra="我是erkelost"
        start
        :precision="5"
        suffix="%"
        groupSeparator=","
        :animation-duration="5000"
        :showGroupSeparator="true"
        style="position: absolute">
        <template #prefix>
          <a-icon name="aperture" />
        </template>
      </a-statistic>
        
    </a-grid-item>
    <a-grid-item :span="12">
      <a-statistic title="Account Weekly Sales (CNY)" :value="112893.99" 
        :precision="5"
       />
    </a-grid-item>
  </a-gr>
</template>
```

:::

### 在卡片中使用

在卡片中展示统计数值。
:::demo

```vue
<template>
  <a-grid :gutter="16">
    <a-grid-item :span="12">
      <a-card>
        <template #content>
          <a-statistic
            title="Growth Rate"
            :value="68.28"
            :precision="3"
            suffix="%"
            :content-style="{ color: '#3f8600' }"
          >
            <template #prefix>
              <a-icon name="arrow-up" />
            </template>
          </a-statistic>
        </template>
      </a-card>
    </a-grid-item>
    <a-grid-item :span="12">
      <a-card>
        <template #content>
          <a-statistic
            title="Decline Rate"
            :value="38.3"
            suffix="%"
            class="demo-class"
            :content-style="{ color: '#cf1322' }"
          >
            <template #prefix>
              <a-icon name="arrow-down" />
            </template>
          </a-statistic>
        </template>
      </a-card>
    </a-grid-item>
  </a-grid>
</template>
```

:::

### 数值动画

我们可以通过设置 animation 属性 开启数值动画。可以在页面加载时开始动画,也可以手动控制
:::demo

```vue
<template>
  <a-grid :gutter="16">
    <a-grid-item :span="12">
      <a-card>
        <template #content>
          <a-statistic
            title="Animation Growth Rate"
            :value="88.265"
            suffix="%"
            :content-style="{ color: '#3f8600' }"
            :value-from="0"
            :start="start"
            animation
          >
            <template #prefix>
              <a-icon name="arrow-up" />
            </template>
          </a-statistic>
        </template>
      </a-card>
    </a-grid-item>
    <a-grid-item :span="12">
      <a-card>
        <template #content>
          <a-statistic
            title="Animation Decline Rate"
            value="53.333"
            :precision="0"
            suffix="%"
            class="demo-class"
            :content-style="{ color: '#cf1322' }"
            :value-from="0"
            :start="controlStart"
            animation
          >
            <template #prefix>
              <a-icon name="aperture" />
            </template>
          </a-statistic>
          <a-btn @click="controlStart = true">Start</a-btn>
        </template>
      </a-card>
    </a-grid-item>
  </a-grid>
</template>
<script>
export default {
  data() {
    return {
      start: true,
      controlStart: false,
    };
  },
};
</script>
```

:::

### 插槽的使用

前缀和后缀插槽
:::demo

```vue
<template>
  <a-grid :gutter="16">
    <a-grid-item :span="12">
      <a-statistic
        title="Active User Number"
        :value="1128"
        :showGroupSeparator="true"
        style="margin-right: 50px"
      >
        <template #suffix>
          <a-icon name="head-notice" color="red" />
        </template>
      </a-statistic>
    </a-grid-item>
    <a-grid-item :span="12">
      <a-statistic title="Scale" value="93">
        <template #suffix>
          <span>/ 100</span>
        </template>
      </a-statistic>
    </a-grid-item>
  </a-grid>
</template>
```

:::

### A-statistic

| 参数               | 类型               | 默认     | 说明             |
| ------------------ | ------------------ | -------- | ---------------- |
| title              | `string \| v-slot` | -        | 数值的标题       |
| extra              | `string \| v-slot` | -        | 额外内容         |
| value              | `number \| string` | -        | 数值内容         |
| group-separator    | `string`           | ,        | 设置千分位标识符 |
| precision          | `number`           | -        | 设置数值精度     |
| suffix             | `string \| v-slot` | -        | 设置数值的后缀   |
| prefix             | `string \| v-slot` | -        | 设置数值的前缀   |
| title-style        | `style`            | -        | 标题样式         |
| content-style      | `style`            | -        | 内容样式         |
| animation-duration | `number`           | 2000     | 动画持续时间     |
| valueFrom          | `number`           | 0        | 动画初始值       |
| animation          | `boolean`          | false    | 是否开启动画     |
| easing             | `string`           | quartOut | 数字动画效果     |
| start              | `boolean`          | false    | 是否开始动画     |

d-statistic 事件

| 事件 | 类型 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | --------- |
|      |      |      |           |
|      |      |      |           |
|      |      |      |           |
