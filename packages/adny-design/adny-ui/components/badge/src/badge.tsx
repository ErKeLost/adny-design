import { defineComponent, Transition, computed } from "vue";
import type { ComputedRef } from "vue";
import { props } from "./props";
import { toNumber } from "../../../utils/shared";
import { AIcon } from "../../icon";
import "../../../styles/common.less";
import "../styles/badge.less";
export default defineComponent({
  name: "ABadge",
  props,
  components: {
    AIcon,
  },
  inheritAttrs: false,
  setup(props, ctx) {
    const badgeClass = ["var-badge"];
    const badgeTransition = "var-badge-fade";
    const contentClass: ComputedRef<Array<string | false | undefined>> =
      computed(() => {
        const { type, position, dot, icon } = props;
        const positionBasic =
          ctx.slots.default?.() && `var-badge__position var-badge--${position}`;
        const dotClass = dot && "var-badge__dot";
        const positionClass = getPositionClass();
        const iconClass = icon && "var-badge__icon";
        return [
          `var-badge--${type}`,
          positionBasic,
          dotClass,
          positionClass,
          iconClass,
          "var-badge__content",
        ];
      });
    const values: ComputedRef<string | number> = computed(() => {
      const { dot, value, maxValue } = props;
      if (dot) return "";
      if (
        value !== undefined &&
        maxValue !== undefined &&
        toNumber(value) > maxValue
      ) {
        return `${maxValue}+`;
      }

      return value;
    });

    const getPositionClass = (): string | undefined => {
      const { position, dot } = props;
      if (dot && position.includes("bottom-right"))
        return "var-badge__dot--right";
      if (dot && position.includes("top-right"))
        return "var-badge__dot--top-right";
      if (dot && position.includes("bottom-left"))
        return "var-badge__dot--left";
      if (dot && position.includes("top-left"))
        return "var-badge__dot--top-left";
    };

    return () => {
      return (
        <div class={badgeClass}>
          <Transition name={badgeTransition}>
            {props.value > 0 ? (
              <span
                class={contentClass.value}
                style={{ background: props.color }}
              >
                {props.icon && !props.dot ? (
                  <a-icon size="12" name={props.icon}></a-icon>
                ) : (
                  <span>{values.value}</span>
                )}
              </span>
            ) : null}
          </Transition>
          {ctx.slots.default ? ctx.slots.default() : null}
        </div>
      );
    };
  },
});
