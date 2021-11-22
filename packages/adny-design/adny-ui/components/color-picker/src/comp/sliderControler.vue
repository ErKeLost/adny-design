<template>
  <div class="adny-slider">
    <a-avatar :color="avatarColor"></a-avatar>

    <div class="adny-slider-container">
      <a-slider
        track-color="linear-gradient(90deg,red,#fffc00 16.667%,#01b407 33.333%,#00eaff 50%,#000390 66.667%,#ff00c6 83.333%,red)"
        thumb-color="#DADADAFF"
        label-visible="never"
        active-color="transparent"
        track-height="10"
        v-model="value"
      />
      <a-slider
        label-visible="never"
        class="adny-alpha-color"
        active-color="transparent"
        thumb-color="#DADADAFF"
        track-height="10"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { ASlider } from '../../../slider'
import { AAvatar } from '../../../avatar'
import { sliderProps } from '../props'
import { hsb2rgb, rgb2hexstr } from "../../../../compsables/color";

export default defineComponent({
  components: {
    ASlider,
    AAvatar
  },
  name: 'sliderControl',
  props: sliderProps,
  setup(props, ctx) {

    const value = ref(0)
    const sliderAlpha = computed(() => {
      return rgb2hexstr(hsb2rgb([80, 100, 100]))
    })
    const avatarColor = ref('')
    console.log(props.circleValue);

    watch(() => props.circleValue, (newValue, oldValue) => {
      console.log(newValue);
      avatarColor.value = newValue
    }, {
      immediate: true,
    })
    return {
      value,
      avatarColor,
      sliderAlpha
    }
  }
})
</script>
<style lang="less">
.adny-alpha-color {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbC1ydWxlPSJub256ZXJvIiBmaWxsPSJub25lIj48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMCAwaDE1djE1SDB6Ii8+PHBhdGggZmlsbD0iI0U2RTZFNiIgZD0iTTAgMGg3LjV2Ny41SDB6TTcuNSA3LjVIMTVWMTVINy41eiIvPjwvZz48L3N2Zz4=");
  background-position: center;
  &:before {
    content: "";
    position: absolute;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(90deg, transparent, v-bind(sliderAlpha));
  }
}
.adny-slider {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-container {
    width: 90%;
  }
}
</style>