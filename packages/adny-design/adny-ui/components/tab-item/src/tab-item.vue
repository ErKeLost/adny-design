<template>
  <a-carousel-item
    class="var-tab-item"
    var-tab-item-cover
    :class="[!current && 'var-tab-item--inactive']"
  >
    <slot v-if="initSlot" />
  </a-carousel-item>
</template>

<script lang="ts">
import ACarouselItem from '../../carousel-item/src/carousel-item.vue'
import { defineComponent, ref, computed } from 'vue'
import { useTabsItems } from './provide'
import { props } from './props'
import type { Ref, ComputedRef } from 'vue'
import type { TabItemProvider } from './provide'

export default defineComponent({
  name: 'ATabItem',
  components: {
    ACarouselItem,
  },
  props,
  setup(props) {
    const current: Ref<boolean> = ref(false)
    const initSlot: Ref<boolean> = ref(false)
    const name: ComputedRef<string | number | undefined> = computed(() => props.name)
    const { index, bindTabsItems } = useTabsItems()

    const setCurrent = (value: boolean) => {
      if (!initSlot.value && value) {
        initSlot.value = true
      }

      current.value = value
    }

    const tabItemProvider: TabItemProvider = {
      index,
      name,
      setCurrent,
    }

    bindTabsItems(tabItemProvider)

    return {
      current,
      initSlot,
    }
  },
})
</script>

<style lang="less">
@import "../../../styles/common";
@import "../../carousel-item/styles/carousel-item";
@import "../styles/tab-item";
</style>
