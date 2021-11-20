<template>
  <div class="ph-color-sv" :style="svStyle" ref="esv" @click="onClick">
    <div class="ph-color-sv-handler" :style="style"></div>
  </div>
</template>
<script lang="ts">
import { hsb2rgb, rgb2hexstr } from "../../../compsables/color";
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
    hsb: { type: Array },
  },
  name: "AColorPicker",
  setup(props, { emit, attrs, slots }) {
    const esv = ref<HTMLElement>();
    const state = reactive({
      svw: 1,
      svh: 1,
      moving: false,
    });
    const svStyle = computed(() => {
      return {
        "--ph-c-sv-bg": rgb2hexstr(hsb2rgb([props.hsb[0], 100, 100])),
      };
    });
    const style = computed(() => {
      const tx = (props.hsb[1] * state.svw) / 100,
        ty = ((100 - props.hsb[2]) * state.svh) / 100;
      return {
        transform: `translate3d(${tx}px,${ty}px,0)`,
      };
    });
    const update = (x: number, y: number) => {
      const s = (x * 100) / state.svw,
        b = ((state.svh - y) * 100) / state.svh;
      emit("update-sb", [s, b]);
    };
    const onTouchmove = (
      e: Event,
      meta: { tx: number; ty: number; end: boolean }
    ) => {
      state.moving = !meta.end;
      const x = Math.min(state.svw, Math.max(0, meta.tx)),
        y = Math.min(state.svh, Math.max(0, meta.ty));
      update(x, y);
    };
    const onClick = (e: PointerEvent) => {
      if (!esv.value) return;
      const { clientX, clientY } = e;
      const { left, top } = esv.value.getBoundingClientRect();
      update(clientX - left, clientY - top);
    };
    onMounted(() => {
      nextTick(() => {
        if (!esv.value) return;
        state.svw = esv.value.offsetWidth;
        state.svh = esv.value.offsetHeight;
      });
    });
    return {
      onClick,
      onTouchmove,
      update,
      style,
      svStyle,
      esv,
      state,
    };
  },
});
</script>
<style lang="scss">
.ph-color-sv {
  --ph-c-w: 230px;
  --ph-c-bg: var(--ph-bg-4);
  --ph-c-primary: var(--ph-primary);
  --ph-c-bd: var(--ph-bd);
  --ph-c-bg-d1: var(--ph-bg-a15);
  --ph-c-bar: 38px;
  --ph-c-sv: 150px;
  --ph-c-ha: 52px;
  --ph-c-modebar: 25px;
  --ph-c-input: 38px;
  --ph-c-predef: 60px;
  --ph-c-predef-item: 14px;
  --ph-c-predef-item-gap: 10px;
  --ph-c-pv-w: 28px; //预览大小
  --ph-c-sv-bg: transparent;
  height: var(--ph-c-sv);
  position: relative;
  background-image: var(--ph-c-alpha-bg);
  cursor: pointer;
  overflow: hidden;
  &:before,
  &:after {
    width: 100%;
    height: 100%;
    content: "";
    position: absolute;
  }
  &:before {
    background-image: linear-gradient(
      90deg,
      rgb(255, 255, 255) 0%,
      var(--ph-c-sv-bg) 100%
    );
  }
  &:after {
    background-image: linear-gradient(180deg, transparent, #000);
  }
  .ph-color-sv-handler {
    border: 1px solid var(--ph-c-white);
    border-radius: 50%;
    width: 10px;
    height: 10px;
    position: absolute;
    background-color: transparent;
    transition: transform 0.15s ease;
    left: -5px;
    top: -5px;
    z-index: 1;
    &[active="true"] {
      transition: none;
    }
  }
}
</style>
