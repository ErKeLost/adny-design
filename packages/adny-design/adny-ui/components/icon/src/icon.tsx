import { defineComponent, ref, nextTick, watch } from "vue";
import { props } from "./props";
import { isURL, toNumber } from "../../../utils/shared";
import { toSizeUnit } from "../../../utils/elements";
import type { Ref } from "vue";
import "../../../styles/common.less";
import "../styles/icon.less";
export default defineComponent({
  name: "AIcon",
  props,
  setup(props) {
    const name: Ref<string | undefined> = ref("");
    const shrinking: Ref<boolean> = ref(false);

    const changeIcon = async (
      newIconName: string | undefined,
      oldIconName: string | undefined
    ) => {
      const { transition } = props;
      if (oldIconName == null || toNumber(transition) === 0) {
        name.value = newIconName;
        return;
      }
      shrinking.value = true;

      await nextTick();
      setTimeout(() => {
        oldIconName != null && (name.value = oldIconName);
        shrinking.value = false;
      }, toNumber(transition));
    };
    watch(() => props.name, changeIcon, { immediate: true });
    const handleClick = (e: MouseEvent) => {
      props.onClick && props.onClick(e);
    };
    const iconiStyle = {
      color: props.color,
      transition: `all ${toNumber(props.transition)}ms`,
      fontSize: toSizeUnit(props.size),
    };
    const iconImgStyle = {
      transition: `all ${toNumber(props.transition)}ms`,
      width: toSizeUnit(props.size),
      height: toSizeUnit(props.size),
    };
    return () => {
      return (
        <div style="display: inline-flex; justify-content: center; align-items: center">
          {isURL(props.name) ? (
            <img
              onClick={props.onClick}
              src={name.value}
              style={iconImgStyle}
              class={iconClass}
            />
          ) : (
            <i
              onClick={props.onClick}
              style={iconiStyle}
              class={[
                "adny-icon",
                `${props.namespace}--set`,
                isURL(props.name)
                  ? "adny-icon__image"
                  : `${props.namespace}-${name.value}`,
                shrinking.value ? "adny-icon--shrinking" : null,
              ]}
            ></i>
          )}
        </div>
      );
    };
  },
});
