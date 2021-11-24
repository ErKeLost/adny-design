<template>
  <div>
    <color-canvas :hsb="hsb" @update-sb="onSv"></color-canvas>
    <slider-control
      v-model:h="hue"
      v-model:a="alpha"
      :color="hex"
      :acolor="state.value"
      :oc="state.oc"
      :circleValue="modelValue"
    ></slider-control>
    <color-control :rgb="rgba" :hex="hex" :hsb="hsb"></color-control>
    <color-block></color-block>
  </div>
</template>
<script lang="ts">
import { parseColor, ColorMode, rgb2hsb, rgb2hexstr, hsb2rgb, rgb2rgbstr, n2hex } from '../../../compsables/color'
import sliderControl from './comp/sliderControler.vue'
import colorControl from './comp/colorControler.vue'
import colorCanvas from './comp/colorCanvas.vue'
import colorBlock from './comp/colorBlock.vue'
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
    colorCanvas,
    colorBlock
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
    const hex = computed(() => {
      return rgb2hexstr(rgba.value.slice(0, 3))
    })
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
      update([...rgb, rgba.value[3]])
    }
    const hue = computed({
      set(v: number) {
        const rgb = hsb2rgb([v, hsb.value[1], hsb.value[2]])
        update([...rgb, rgba.value[3]])
      },
      get() {
        return hsb.value[0]
      }
    })
    const alpha = computed({
      set(v: number) {
        update([...rgba.value.slice(0, 3), v])
      },
      get() {
        return rgba.value[3]
      }
    })
    return {
      hue,
      alpha,
      onSv,
      hex,
      hsb,
      modelValue,
      state,
      rgba
    };
  },
});
</script>
<style lang="less">
</style>
