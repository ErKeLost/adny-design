:::demo
```vue
<template>
  <a-btn @click="handleClick" style="width: 100px;">{{title}}</-button>
  <a-fixed-overlay 
    v-model:visible="visible" 
    backgroundClass="justify-center items-center bg-gray-50" 
    backgroundBlock
  >
    <div class="h-100 w-100" style="background: red;">hello world</div>
  </a-fixed-overlay>
</template>
<script>
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
  setup() { 
    const origin = ref();
    const visible = ref(false);
    const handleClick = () => visible.value = !visible.value;
    const title = computed(() => visible.value ? '隐藏' : '显示固定遮罩层' );
    return {
      visible,
      handleClick,
      title
    }
  },
});
</script>
```
:::
<style>
.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.h-100 {
  height: 100px;
}

.w-100 {
  width: 100px;
}

.text-white {
  color: white;
}

.bg-gray {
  background: gray;
}

.h-500 {
  height: 500px;
}

.w-full {
  width: 100%;
}

.bg-gray-50 {
  background: #00000088;
}

.text-white-50 {
  color: #ffffff88;
}

.mt-20 {
  margin-top: 20px;
}
</style>