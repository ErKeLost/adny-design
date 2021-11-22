<template>
  <div>
    <color-canvas :hsb="hsb" @update-sb="onSv"></color-canvas>
    <slider-control :circleValue="modelValue"></slider-control>
    <color-control></color-control>
  </div>
</template>
<script lang="ts">
import { parseColor, ColorMode, rgb2hsb, rgb2hexstr, hsb2rgb, rgb2rgbstr, n2hex } from '../../../compsables/color'
import sliderControl from './comp/sliderControler.vue'
import colorControl from './comp/colorControler.vue'
import colorCanvas from './comp/colorCanvas.vue'
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
} from "vue";
export default defineComponent({
  props: {
    hsb: { type: Array, default: [10, 81, 45] },
    modelValue: {
      type: String,
    },
    done: { type: Function },
    close: { type: Function },
    type: {
      type: String,
    }
  },
  emits: ['update:modelValue'],
  components: {
    sliderControl,
    colorControl,
    colorCanvas
  },
  name: "AColorPicker",
  setup(props, { emit, attrs, slots }) {
    const initColorMeta = parseColor(props.modelValue || '')
    const ecolorpicker = ref<HTMLElement>()

    const state = reactive({
      h: rgb2hsb(initColorMeta.rgba.slice(0, 3)),
      a: initColorMeta.rgba[3],
      oc: props.modelValue,
      value: props.modelValue,
      visible: false,
      cmode: initColorMeta.mode,
      sm: false
    })
    console.log(state.value);

    const onClose = () => {
      state.visible = false
      props.close?.()
    }
    const cstate = computed(() => {
      return parseColor(state.value || '')
    })
    const rgba = computed(() => {
      return cstate.value.rgba
    })
    console.log(rgba.value);


    const hsb = computed(() => {
      return rgb2hsb(rgba.value.slice(0, 3))
    })
    const modelValue = computed({
      set(v: string) {
        if (state.value === v) return
        state.value = v
        //notify
        props.done?.(v, onClose)
      },
      get() {
        return state.value as string
      }
    })
    const update = (rgba: number[]) => {
      const mode = props.type ?? cstate.value.mode
      if (mode === ColorMode.hex)
        modelValue.value = rgb2hexstr(rgba)
      else modelValue.value = rgb2rgbstr(rgba)
    }
    const onSv = (sv: Array<number>) => {
      const rgb = hsb2rgb([hsb.value[0], ...sv])
      console.log(rgb);
      update([...rgb, rgba.value[3]])
    }
    return {
      onSv,
      hsb,
      modelValue
    };
  },
});
</script>
<style lang="scss">
</style>
