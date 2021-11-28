# Inputs（输入框）
AInput 组件为您提供了一个基线来创建您自己的自定义输入。 它包含一个预留/附加的空档，消息和一个默认的空档。 _建议_扩展该组件，但它可以作为一个独立组件使用


## 基本使用 (Base)
:::demo

```vue
<template>
  <a-input  :rules="[{ required: true, message: 'required'}, { max: 5, message: '最多只能输入五个字符'}]" placeholder="请输入文字 " v-model="value" />
</template>
<script >
import {defineComponent, ref, watch } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('')
    watch(() => value.value, (ne) => {
    })
    return {
      value
    }
  }
})
</script>
```

:::

## 朴素模式 (Plain)

:::demo

```vue
<template>
  <a-input 
  :hint="false" 
  :line="false" 
  placeholder="请输入文本"
  v-model="value"
/>
</template>
<script >
import {defineComponent, ref, watch } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('')
    watch(() => value.value, (ne) => {
    })
    return {
      value
    }
  }
})
</script>
```

:::


## 文本区域 (TextArea)

:::demo

```vue
<template>
  <a-input placeholder="请输入文本" :rules="[{ required: true, message: 'required'}]" textarea v-model="value" />
</template>
<script >
import {defineComponent, ref, watch } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('')
    watch(() => value.value, (ne) => {
    })
    return {
      value
    }
  }
})
</script>
```

:::



## 最大长度 (MaxLength)

:::demo

```vue
<template>
  <a-input placeholder="请输入文本" :maxlength="10" v-model="value" />
</template>
<script >
import {defineComponent, ref, watch } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('')
    watch(() => value.value, (ne) => {
    })
    return {
      value
    }
  }
})
</script>
```

:::

## 禁用 (Disabled)

:::demo

```vue
<template>
  <a-input placeholder="请输入文本" disabled v-model="value" />
</template>
<script >
import {defineComponent, ref, watch } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('')
    watch(() => value.value, (ne) => {
    })
    return {
      value
    }
  }
})
</script>
```

:::

## 只读属性 (Readonly)

:::demo

```vue
<template>
  <a-input placeholder="请输入文本" readonly v-model="value" />
</template>
<script >
import {defineComponent, ref, watch } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('')
    watch(() => value.value, (ne) => {
    })
    return {
      value
    }
  }
})
</script>
```

:::

## 是否可以清除 (clearAbled)

:::demo

```vue
<template>
  <a-input placeholder="请输入文本" clearable v-model="value" />
</template>
<script >
import {defineComponent, ref, watch } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('')
    watch(() => value.value, (ne) => {
    })
    return {
      value
    }
  }
})
</script>
```

:::

## 显示图标 (Icon)

:::demo

```vue
<template>
  <a-input placeholder="请输入文本" v-model="value">
    <template #prefix>
      <a-icon name="plus"/>
    </template>
    <template #suffix>
      <a-icon name="minus"/>
    </template>
  </a-input>
</template>
<script >
import {defineComponent, ref, watch } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('')
    watch(() => value.value, (ne) => {
    })
    return {
      value
    }
  }
})
</script>
```

:::


### Input API


| 参数             | 类型               | 默认      | 可选值                                                          | 说明                           |
| ---------------- | ------------------ | --------- | --------------------------------------------------------------- | ------------------------------ |
| text-center      | `Boolean`          | `false`   | `true \| false`                                                 | input 文本居中                 |
| placeholder      | `String`           | ``        | ``                                                              | input 占位符                   |
| v-model          | `String`           | ``        | ``                                                              | 双向绑定                       |
| success          | `Boolean`          | `false`   | `true \| false`                                                 | 卡片是否带有圆角               |
| error            | `String`           | `left`    | `left \| right \| center`                                       | 卡片底部位置                   |
| prop             | `Boolean`          | `false`   | `true \| false`                                                 | 设置hover 状态 卡片海拔高度    |
| type             | `String`           | `text`    | `text \| password \| number`                                    | 输入框类型                     |
| textarea         | `Boolean`          | `false`   | `true \| false`                                                 | 设置input 为文本域             |
| rows             | `string \| number` | `8`       | ``                                                              | input TextArea文本的显示行数   |
| line             | `Boolean`          | `true`    | `true \| false`                                                 | 是否显示分割线                 |
| hint             | `Boolean`          | `true`    | `true \| false`                                                 | 是否使用占位符作为提示         |
| text-color       | `String`           | ``        |                                                                 | 文字颜色                       |
| focusColor       | `String`           | `8`       | ``                                                              | 聚焦时的主要颜色               |
| blurColor        | `String`           | ``        | ``                                                              | 失焦时的主要颜色               |
| maxlength        | `Number \| string` | ``        | ``                                                              | 最大长度                       |
| disabled         | `String`           | `text`    | `text \| textarea`                                              | 禁用                           |
| readonly         | `Boolean`          | `false`   | `true \| false`                                                 | 只读                           |
| clearable        | `String`           | `8`       | ``                                                              | 显示移除全部文本按钮           |
| resize           | `String`           | ``        | ``                                                              | Textarea是否可以拖动调整尺寸   |
| validate-trigger | `String`           | `onInput` | `onFocus \|onBlur \| onChange \| onClick \| onClear \| onInput` | 触发验证的时机                 |
| rules            | `Array`            | ``        | `text \| textarea`                                              | 验证规则  遵循async-valiadator |
| onBlur           | `Function`         | ``        |                                                                 |                                |
| onClick          | `Function`         | `8`       | ``                                                              |                                |
| onClear          | `Function`         | ``        | ``                                                              |                                |
| onInput          | `Function`         | `text`    |                                                                 |                                |
| onChange         | `Function`         | `false`   |                                                                 |                                |

