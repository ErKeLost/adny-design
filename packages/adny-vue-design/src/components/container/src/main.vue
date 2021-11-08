<template>
  <main class="adny-main">
    <slot></slot>
  </main>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AMain',
})
</script>
<style lang="less" scoped>
@import "../styles/container.less";
</style>