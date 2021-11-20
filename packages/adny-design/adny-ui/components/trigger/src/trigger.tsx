import type {
  PropType,
  CSSProperties,
  ComponentPublicInstance,
  Ref,
  VNode,
} from "vue";
import {
  defineComponent,
  ref,
  reactive,
  computed,
  nextTick,
  watch,
  inject,
  provide,
  withDirectives,
  Teleport,
  Transition,
  onUpdated,
  onMounted,
  onBeforeUnmount,
  vShow,
} from "vue";
import { props } from "./props";
export default defineComponent({
  name: "ATrigger",
  props,
  setup(props, ctx) {
    console.log(1213);

    return () => {};
  },
});
