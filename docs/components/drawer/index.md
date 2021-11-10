:::demo
```vue
<template>
<a-btn 
  class="mt-10"
  type="warning"
  
  @click="center = true"
>
  居中弹出
</a-btn>
<a-btn
  class="mt-10"
  type="primary"
  
  @click="bottom = true"
>
  下方弹出
</a-btn>
<a-btn
  class="mt-10"
  type="primary"
   
  @click="top = true"
>
  上方弹出
</a-btn>
<a-btn 
  class="mt-10" 
  type="primary"
  
  @click="left = true"
>
  左侧弹出
</a-btn>
<a-btn 
  class="mt-10" 
  type="primary"
   
  @click="right = true"
>
  右侧弹出
</a-btn>

<a-drawer v-model:show="center">
  <div class="block">
    素胚勾勒出青花笔锋浓转淡, 
    瓶身描绘的牡丹一如你初妆, 
    冉冉檀香透过窗心事我了然, 
    宣纸上走笔至此搁一半。
  </div>
</a-drawer>

<a-drawer position="bottom" v-model:show="bottom">
  <div class="block">
    素胚勾勒出青花笔锋浓转淡, 
    瓶身描绘的牡丹一如你初妆, 
    冉冉檀香透过窗心事我了然, 
    宣纸上走笔至此搁一半。
  </div>
</a-drawer>

<a-drawer position="top" v-model:show="top">
  <div class="block">
    素胚勾勒出青花笔锋浓转淡, 
    瓶身描绘的牡丹一如你初妆, 
    冉冉檀香透过窗心事我了然, 
    宣纸上走笔至此搁一半。
  </div>
</a-drawer>

<a-drawer position="left" v-model:show="left">
  <div class="block">
    素胚勾勒出青花笔锋浓转淡, 
    瓶身描绘的牡丹一如你初妆,
    冉冉檀香透过窗心事我了然, 
    宣纸上走笔至此搁一半。
  </div>
</a-drawer>

<a-drawer position="right" v-model:show="right">
  <div class="block">
    素胚勾勒出青花笔锋浓转淡, 
    瓶身描绘的牡丹一如你初妆, 
    冉冉檀香透过窗心事我了然, 
    宣纸上走笔至此搁一半。
  </div>
</a-drawer>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    const center = ref(false)
    const top = ref(false)
    const bottom = ref(false)
    const left = ref(false)
    const right = ref(false)

    return {
      center,
      top,
      bottom,
      left,
      right
    }
  }
}
</script>
<style scoped lang="less">
.mt-10 {
  margin-top: 10px;
}

.block {
  padding: 20px 24px;
  width: 250px;
  color: #555;
}
</style>
```
:::