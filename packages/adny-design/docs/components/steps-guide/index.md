# steps-guide 操作指引

引导用户了解业务使用逻辑组件。

### 何时使用

业务推出新特性，或复杂的业务逻辑需要指引用户时使用。

### 基本用法
设定一组操作指引信息顺序显示。
:::demo  
```vue
<template>
  <a-btn class="step-1" @click="handleClick(0)">Step 1</a-btn>
  <a-btn class="step-2" @click="handleClick(1)">Step 2</a-btn>
  <a-btn class="step-3" @click="handleClick(2)">Step 3</a-btn>
  <a-steps-guide ref="stepRef" :steps="steps" v-model:step-index="stepIndex" :step-change="handleStepChange" @guide-close="handleGuideClose"></a-steps-guide>
</template>
<script>
  import { defineComponent, reactive, ref, onMounted } from 'vue'
  export default defineComponent({
    setup() {
      const baseSteps = [
          { title: '基础用法1', content: '业务推出新特性，或复杂的业务逻辑需要指引用户时使用。', trigger: '.step-1' },
          { title: '基础用法2', content: '业务推出新特性，或复杂的业务逻辑需要指引用户时使用。', trigger: '.step-2' },
          { title: '基础用法3', content: '业务推出新特性，或复杂的业务逻辑需要指引用户时使用。', trigger: '.step-3' }
      ], 
      positionSteps = 
          [{ title: '弹出位置 top-left',
            content: 'Steps Guide', 
            trigger: '.top-left', 
            position: 'top-left' 
          },{ title: '弹出位置 top', 
            content: 'Steps Guide', 
            trigger: '.top', 
            position: 'top' 
          },{ title: '弹出位置 top-right', 
            content: 'Steps Guide',
            trigger: '.top-right', 
            position: 'top-right'
          },
          { title: '弹出位置 right',
            content: 'Steps Guide', 
            trigger: '.right', 
            position: 'right' 
          },{ title: '弹出位置 bottom-right', 
            content: 'Steps Guide', 
            trigger: '.bottom-right', 
            position: 'bottom-right' 
          },{ title: '弹出位置 bottom', 
            content: 'Steps Guide', 
            trigger: '.bottom', 
            position: 'bottom' 
          },{ title: '弹出位置 bottom-left', 
            content: 'Steps Guide', 
            trigger: '.bottom-left', 
            position: 'bottom-left' 
          },{ title: '弹出位置 left', 
            content: 'Steps Guide', 
            trigger: '.left', 
            position: 'left' 
          }], 
            customSteps = 
              [{ title: '自定义用法',
                content: '自定义操作指引信息弹出的位置和元素。',
                trigger: '.custom-1', 
                position: {
                  leftFix: 0,
                  topFix: 0,
                  type: 'top'
                } 
              },{ 
                title: '自定义用法', 
                content: '自定义操作指引信息弹出的位置和元素。',
                trigger: '.custom-2',
                target: '.nav-links', 
                position: 'bottom'
              }]
      let steps = ref(baseSteps);
      const stepIndex = ref(0), stepRef = ref(null)
      const handleClick = index => {
        steps.value = baseSteps
        stepRef.value.setCurrentIndex(index)
      }
      const handleStepChange = (index, prevIndex) => {
        /* code */ 
        return true
      }
      const handleGuideClose = (index) => {
        const stepsLength = steps.value.length
        if(index === stepsLength - 1 && stepsLength !== 2) {
          steps.value = (stepsLength === 3 ? positionSteps : customSteps);
          stepRef.value.setCurrentIndex(0)
        }
      }
      return {
        stepRef,
        steps,
        stepIndex,
        handleClick,
        handleStepChange,
        handleGuideClose
      }
    }
  })
</script>
<style>
  .devui-btn-host {
    margin-left: 10px;
  }
</style>
```
:::