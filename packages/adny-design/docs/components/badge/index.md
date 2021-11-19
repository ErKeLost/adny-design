# Badges（徽章）

a-badge 组件上覆或订阅一个像头像的图标或内容上的文本来突出显示用户的信息或只是提请注意某个特定元素。 徽章中的内容通常包含数字或图标。

:::demo

```vue
<template>
  <a-grid>
    <a-grid-item :span="6">
      <a-badge bordered color="#ff5252" position="top-right" icon="lock1">
        <a-btn type="danger">Lock Account</a-btn>
      </a-badge>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-badge bordered color="#ff5252" position="top-right">
        <a-avatar>
          <img src="https://w.wallhaven.cc/full/m9/wallhaven-m9y9j1.jpg" />
        </a-avatar>
      </a-badge>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-badge bordered color="#ff5252" position="top-right" dot>
        <a-avatar>
          <img src="https://w.wallhaven.cc/full/m9/wallhaven-m9y9j1.jpg" />
        </a-avatar>
      </a-badge>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-badge bordered color="#ff5252" position="top-right" icon="music1">
        <a-avatar>
          <img src="https://w.wallhaven.cc/full/m9/wallhaven-m9y9j1.jpg" />
        </a-avatar>
      </a-badge>
    </a-grid-item>
  </a-grid>
</template>
```

:::

## 动态通知
你可以将徽章与动态内容合并，以创建通知系统之类的东西。
:::demo

```vue
<template>
  <a-grid>
    <a-grid-item :span="6">
      <a-badge bordered color="#4caf50" position="top-right" icon="lock1">
        <a-btn type="success" @click="value++">Lock Account</a-btn>
      </a-badge>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-badge bordered color="#ff5252" position="top-right" icon="lock1">
        <a-btn type="danger" @click="value--">Lock Account</a-btn>
      </a-badge>
    </a-grid-item>
    <a-grid-item :span="6" :offset="6">
      <a-badge bordered color="#ff5252" position="top-right" :value="value">
        <a-avatar>
          <img src="https://w.wallhaven.cc/full/m9/wallhaven-m9y9j1.jpg" />
        </a-avatar>
      </a-badge>
    </a-grid-item>
  </a-grid>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const value = ref(0)
    return {
      value
    }
  }
})
</script>
```

:::

## 鼠标悬停显示
你可以用可见性控制做很多事情，例如，在鼠标悬停时显示徽章。

:::demo

```vue
<template>
  <a-grid>
    <a-grid-item :span="6">
      <a-badge bordered hover color="#ff5252" position="top-left" :value="value">
        <a-avatar>
          <img src="https://w.wallhaven.cc/full/m9/wallhaven-m9y9j1.jpg" />
        </a-avatar>
      </a-badge>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-badge bordered hover color="#ff5252" position="top-right" :value="value">
        <a-avatar>
          <img src="https://w.wallhaven.cc/full/m9/wallhaven-m9y9j1.jpg" />
        </a-avatar>
      </a-badge>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-badge bordered hover color="#ff5252" position="bottom-right" :value="value">
        <a-avatar>
          <img src="https://w.wallhaven.cc/full/m9/wallhaven-m9y9j1.jpg" />
        </a-avatar>
      </a-badge>
    </a-grid-item>
    <a-grid-item :span="6">
      <a-badge bordered hover color="#ff5252" position="bottom-left" :value="value">
        <a-avatar>
          <img src="https://w.wallhaven.cc/full/m9/wallhaven-m9y9j1.jpg" />
        </a-avatar>
      </a-badge>
    </a-grid-item>
  </a-grid>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const value = ref(0)
    return {
      value
    }
  }
})
</script>
```

:::

## 标签页
徽章有助于以各种方式向用户传递信息。


:::demo
```vue
<template>
<a-tabs
  elevation
  color="#2979ff"
  active-color="#fff"
  inactive-color="hsla(0, 0%, 100%, .6)"
  v-model:active="active"
>
  <a-tab>
    <a-badge overlay dot type="danger">
      选项1
    </a-badge>
  </a-tab>
  <a-tab>
    <a-badge overlay color="#4caf50">
      <span>
        选项2
      </span>
    </a-badge>
  </a-tab>
  <a-tab>
    <a-badge overlay icon="bluetooth" type="primary">
      选项3
    </a-badge>
  </a-tab>
</a-tabs>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    const active = ref('选项1')

    return { active }
  }
}
</script>
```
:::