<template>
  <div class="ph-color-predef">
    <span
      class="ph-color-predef-item"
      v-for="(c,i) in colors || []"
      :key="i"
      :style="{ backgroundColor: c }"
      @click="$emit('pre-click', c)"
    ></span>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  name: 'colorBlock',
  props: {
    colors: Array as PropType<Array<string>>
  }
})
</script>
<style lang="less">
.ph-color-predef {
  height: var(--ph-c-predef);
  gap: var(--ph-c-predef-item-gap);
  grid-template-columns: repeat(9, var(--ph-c-predef-item));
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  overflow: auto;
  .ph-color-predef-item {
    width: var(--ph-c-predef-item);
    height: var(--ph-c-predef-item);
    border-radius: 2px;
    position: relative;
    cursor: pointer;
    &:after {
      border-radius: inherit;
      position: absolute;
      width: 100%;
      height: 100%;
      border: 1px solid var(--ph-c-reverse);
    }
    &:hover:after {
      content: "";
    }
  }
}
</style>