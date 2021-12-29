# steps-guide 操作指引

引导用户了解业务使用逻辑组件。

### 何时使用

业务推出新特性，或复杂的业务逻辑需要指引用户时使用。

### 基本用法
设定一组操作指引信息顺序显示。
:::demo  
```vue
<template>
  <a-btn  class="bottom">Custom Position</a-btn>
  <a-btn  class="bottom">Custom Target</a-btn>
  <a-steps-guide ref="stepsRef" :steps="customSteps" :showDots="false" :showClose="false"></a-steps-guide>
</template>
<script>
import { defineComponent, reactive, ref, onMounted } from 'vue'
export default defineComponent({
  setup() {
    const customSteps = reactive([
        { title: '自定义用法',
          content: '自定义操作指引信息弹出的位置和元素。',
          trigger: '.custom-1', 
          position: {
            leftFix: 0,
            topFix: 0,
            type: 'top'
          } },
        { 
          title: '自定义用法', 
          content: '自定义操作指引信息弹出的位置和元素。',
          trigger: '.custom-2',
          target: '.nav-links', 
          position: 'bottom'
        },
    ]);
    const stepsRef = ref(null)
    onMounted(() => {
      stepsRef.value.closeGuide('custom')
    })
    return {
      customSteps,
      stepsRef
    }
  }
})
</script>
```
:::