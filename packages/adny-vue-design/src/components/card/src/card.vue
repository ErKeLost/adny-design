<template>
  <div
    class="adny-card"
    :class="[elevation ? `adny-elevation--${elevation}` : 'adny-elevation--2']"
    @click="onClick"
  >
    <slot name="image">
      <img
        class="adny-card__image"
        :style="{
          objectFit: fit,
          height
        }"
        :src="src"
        :alt="alt"
        v-if="src"
      />
    </slot>
    <slot name="title">
      <div class="adny-card__title" v-if="title">{{ title }}</div>
    </slot>
    <slot name="subtitle">
      <div class="adny-card__subtitle" v-if="subtitle">{{ subtitle }}</div>
    </slot>
    <slot name="description">
      <div class="adny-card__description" v-if="description">{{ description }}</div>
    </slot>
    <div class="adny-card__footer" v-if="$slots.extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { props } from './props'

export default defineComponent({
  name: 'AdnyCard',
  props,
  setup() {
    return {
    }
  },
})
</script>

<style lang="less">
@import '../../../styles/common';
@import '../../../styles/elevation';
@import '../styles/card';
</style>
